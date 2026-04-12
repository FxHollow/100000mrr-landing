// 情绪管理应用 API - 入口文件

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const { logger } = require('./utils/logger');
const { notFoundHandler, errorHandler } = require('./middleware/error');

// 路由
const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
const eventRoutes = require('./routes/events');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 3001;
const API_VERSION = 'v1';

// 信任代理（用于限流）
app.set('trust proxy', 1);

// 中间件
app.use(helmet()); // 安全头
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', credentials: true }));
app.use(compression()); // Gzip 压缩
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 全局限流
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: '请求过于频繁，请稍后再试',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(`/api/${API_VERSION}`, limiter);

// 请求日志
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
    },
  });
});

// API 路由
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/mood`, moodRoutes);
app.use(`/api/${API_VERSION}/events`, eventRoutes);
app.use(`/api/${API_VERSION}/ai`, aiRoutes);

// API 信息
app.get(`/api/${API_VERSION}`, (req, res) => {
  res.json({
    success: true,
    data: {
      name: '情绪管理应用 API',
      version: API_VERSION,
      endpoints: {
        health: '/health',
        auth: {
          register: `POST /api/${API_VERSION}/auth/register`,
          login: `POST /api/${API_VERSION}/auth/login`,
          me: `GET /api/${API_VERSION}/auth/me`,
          refresh: `POST /api/${API_VERSION}/auth/refresh`,
          logout: `POST /api/${API_VERSION}/auth/logout`,
        },
        mood: {
          list: `GET /api/${API_VERSION}/mood/entries`,
          create: `POST /api/${API_VERSION}/mood/entries`,
          trends: `GET /api/${API_VERSION}/mood/trends`,
          stats: `GET /api/${API_VERSION}/mood/stats`,
        },
        events: {
          list: `GET /api/${API_VERSION}/events`,
          stats: `GET /api/${API_VERSION}/events/stats`,
        },
        ai: {
          analyze: `POST /api/${API_VERSION}/ai/analyze`,
          predictions: `GET /api/${API_VERSION}/ai/predictions`,
          history: `GET /api/${API_VERSION}/ai/history`,
          alerts: `GET /api/${API_VERSION}/ai/alerts`,
        },
      },
    },
  });
});

// 404 处理
app.use(notFoundHandler);

// 全局错误处理
app.use(errorHandler);

// 启动服务器
app.listen(PORT, () => {
  logger.info(`服务器启动于端口 ${PORT}，环境：${process.env.NODE_ENV || 'development'}`);
  logger.info(`健康检查：http://localhost:${PORT}/health`);
  logger.info(`API: http://localhost:${PORT}/api/${API_VERSION}`);
});

module.exports = app;
