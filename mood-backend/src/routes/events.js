// 关系事件路由

const express = require('express');
const router = express.Router();

const eventService = require('../services/eventService');
const { authMiddleware } = require('../middleware/auth');
const { validate, validateQuery, validateParams } = require('../middleware/validate');
const schemas = require('../schemas/events');

// 所有路由都需要认证
router.use(authMiddleware);

/**
 * POST /api/v1/events
 * 创建关系事件
 */
router.post('/', validate(schemas.CreateEventSchema), async (req, res) => {
  const event = await eventService.createEvent(req.user.id, req.validatedData);

  res.status(201).json({
    success: true,
    data: event,
  });
});

/**
 * GET /api/v1/events
 * 获取关系事件列表
 */
router.get('/', validateQuery(schemas.EventListQuerySchema), async (req, res) => {
  const result = await eventService.getEvents(req.user.id, req.validatedQuery);

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * GET /api/v1/events/:id
 * 获取单个关系事件
 */
router.get('/:id', validateParams(schemas.EventIdParamsSchema), async (req, res) => {
  const event = await eventService.getEventById(req.user.id, req.validatedParams.id);

  res.status(200).json({
    success: true,
    data: event,
  });
});

/**
 * PATCH /api/v1/events/:id
 * 更新关系事件
 */
router.patch(
  '/:id',
  validateParams(schemas.EventIdParamsSchema),
  validate(schemas.UpdateEventSchema),
  async (req, res) => {
    const event = await eventService.updateEvent(
      req.user.id,
      req.validatedParams.id,
      req.validatedData
    );

    res.status(200).json({
      success: true,
      data: event,
    });
  }
);

/**
 * DELETE /api/v1/events/:id
 * 删除关系事件
 */
router.delete('/:id', validateParams(schemas.EventIdParamsSchema), async (req, res) => {
  await eventService.deleteEvent(req.user.id, req.validatedParams.id);

  res.status(200).json({
    success: true,
    data: { message: '已删除' },
  });
});

/**
 * GET /api/v1/events/stats
 * 获取关系事件统计
 */
router.get('/stats', async (req, res) => {
  const stats = await eventService.getEventStats(req.user.id);

  res.status(200).json({
    success: true,
    data: stats,
  });
});

module.exports = router;
