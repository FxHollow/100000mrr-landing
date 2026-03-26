require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { logger } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later.'
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Auth rate limiting (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts, please try again later.'
    }
  }
});

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to API routes
app.use(`/api/${API_VERSION}`, limiter);

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Health check endpoint (not rate limited)
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

// API routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');

app.use(`/api/${API_VERSION}/auth`, authLimiter, authRoutes);
app.use(`/api/${API_VERSION}/users`, usersRoutes);
app.use(`/api/${API_VERSION}/courses`, coursesRoutes);

// API info endpoint
app.get(`/api/${API_VERSION}`, (req, res) => {
  res.json({
    success: true,
    data: {
      message: '100000MRR API - B2C Platform',
      version: API_VERSION,
      endpoints: {
        health: '/health',
        auth: {
          register: `POST /api/${API_VERSION}/auth/register`,
          login: `POST /api/${API_VERSION}/auth/login`,
          profile: `GET /api/${API_VERSION}/auth/me`,
          refresh: `POST /api/${API_VERSION}/auth/refresh`,
          logout: `POST /api/${API_VERSION}/auth/logout`
        },
        users: {
          list: `GET /api/${API_VERSION}/users (admin)`,
          get: `GET /api/${API_VERSION}/users/:id (admin)`,
          update: `PATCH /api/${API_VERSION}/users/:id (admin)`,
          delete: `DELETE /api/${API_VERSION}/users/:id (super admin)`
        },
        courses: {
          list: `GET /api/${API_VERSION}/courses (public)`,
          details: `GET /api/${API_VERSION}/courses/:slug (public)`,
          myCourses: `GET /api/${API_VERSION}/courses/my (auth)`,
          enroll: `POST /api/${API_VERSION}/courses/:id/enroll (auth)`,
          create: `POST /api/${API_VERSION}/courses (admin)`,
          update: `PATCH /api/${API_VERSION}/courses/:id (admin)`
        }
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Cannot ${req.method} ${req.path}`
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    }
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
  logger.info(`API: http://localhost:${PORT}/api/${API_VERSION}`);
});

module.exports = app;
