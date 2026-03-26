const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, authorize } = require('../middleware/auth');
const { logger } = require('../utils/logger');

const prisma = new PrismaClient();
const router = express.Router();

// ============================================
// Public Course Endpoints
// ============================================

/**
 * GET /api/v1/courses
 * List all published courses
 */
router.get('/', async (req, res) => {
  try {
    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where: { status: 'PUBLISHED' },
        include: {
          chapters: {
            select: {
              id: true,
              title: true,
              order: true,
              lessons: {
                select: {
                  id: true,
                  title: true,
                  duration: true,
                  isFree: true,
                  order: true
                },
                orderBy: { order: 'asc' }
              }
            },
            orderBy: { order: 'asc' }
          }
        },
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.course.count({ where: { status: 'PUBLISHED' } })
    ]);

    res.json({
      success: true,
      data: courses,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    logger.error('List courses error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to list courses.'
      }
    });
  }
});

/**
 * GET /api/v1/courses/:slug
 * Get course details by slug
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        chapters: {
          select: {
            id: true,
            title: true,
            description: true,
            order: true,
            lessons: {
              select: {
                id: true,
                title: true,
                description: true,
                duration: true,
                isFree: true,
                order: true
              },
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COURSE_NOT_FOUND',
          message: 'Course not found.'
        }
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    logger.error('Get course error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get course.'
      }
    });
  }
});

// ============================================
// Authenticated User Endpoints
// ============================================

/**
 * GET /api/v1/courses/my
 * Get enrolled courses for current user
 */
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user.id },
      include: {
        course: {
          include: {
            chapters: {
              select: {
                id: true,
                title: true,
                lessons: {
                  select: { id: true, title: true },
                  orderBy: { order: 'asc' }
                }
              },
              orderBy: { order: 'asc' }
            }
          }
        },
        progress: {
          select: {
            progressPercent: true,
            completedAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: enrollments.map(e => ({
        ...e,
        course: {
          ...e.course,
          progress: e.progress
        }
      }))
    });
  } catch (error) {
    logger.error('Get my courses error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get enrolled courses.'
      }
    });
  }
});

/**
 * POST /api/v1/courses/:id/enroll
 * Enroll in a course (after purchase)
 */
router.post('/:id/enroll', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id },
      select: { id: true, status: true }
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COURSE_NOT_FOUND',
          message: 'Course not found.'
        }
      });
    }

    if (course.status !== 'PUBLISHED') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'COURSE_NOT_AVAILABLE',
          message: 'Course is not available for enrollment.'
        }
      });
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: req.user.id,
          courseId: id
        }
      }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ALREADY_ENROLLED',
          message: 'Already enrolled in this course.'
        }
      });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: req.user.id,
        courseId: id,
        status: 'ACTIVE'
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        }
      }
    });

    // Create progress record
    await prisma.courseProgress.create({
      data: {
        userId: req.user.id,
        courseId: id,
        enrollmentId: enrollment.id,
        progressPercent: 0
      }
    });

    logger.info('User enrolled in course', {
      userId: req.user.id,
      courseId: id,
      enrollmentId: enrollment.id
    });

    res.json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    logger.error('Enroll course error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to enroll in course.'
      }
    });
  }
});

// ============================================
// Admin Course Management
// ============================================

/**
 * POST /api/v1/courses
 * Create a new course (admin only)
 */
router.post('/', authMiddleware, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, description, slug, price, originalPrice, thumbnail } = req.body;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        slug,
        price: parseFloat(price),
        originalPrice: parseFloat(originalPrice),
        thumbnail,
        status: 'DRAFT'
      }
    });

    logger.info('Course created', { courseId: course.id, adminId: req.user.id });

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    logger.error('Create course error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to create course.'
      }
    });
  }
});

/**
 * PATCH /api/v1/courses/:id
 * Update a course (admin only)
 */
router.patch('/:id', authMiddleware, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, originalPrice, thumbnail, status } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (price) updateData.price = parseFloat(price);
    if (originalPrice) updateData.originalPrice = parseFloat(originalPrice);
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
    if (status) updateData.status = status;

    const course = await prisma.course.update({
      where: { id },
      data: updateData
    });

    logger.info('Course updated', { courseId: course.id, adminId: req.user.id });

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COURSE_NOT_FOUND',
          message: 'Course not found.'
        }
      });
    }
    logger.error('Update course error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update course.'
      }
    });
  }
});

module.exports = router;
