// 全局错误处理中间件

const { logger } = require('../utils/logger');

// 自定义错误类
class AppError extends Error {
  constructor(code, message, statusCode = 500, details = null) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 404 处理
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Cannot ${req.method} ${req.path}`,
    },
  });
}

// 全局错误处理
function errorHandler(err, req, res, next) {
  // 默认错误信息
  let statusCode = err.statusCode || 500;
  let code = err.code || 'INTERNAL_ERROR';
  let message = err.message || '内部服务器错误';
  let details = err.details || null;

  // 生产环境隐藏详细错误
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    message = '服务器内部错误';
    details = null;
  }

  // 记录错误
  logger.error('未处理错误:', {
    code,
    message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details,
    },
  });
}

// Zod 验证错误处理
function handleZodError(err, res) {
  const details = err.errors.map((e) => ({
    field: e.path.join('.'),
    message: e.message,
  }));

  return res.status(400).json({
    success: false,
    error: {
      code: 'VALIDATION_ERROR',
      message: '请求参数验证失败',
      details,
    },
  });
}

// Prisma 错误处理
function handlePrismaError(err, res) {
  const prismaErrorCode = err.code;

  const errorMap = {
    P2002: { code: 'CONFLICT', message: '资源已存在', statusCode: 409 },
    P2025: { code: 'NOT_FOUND', message: '资源不存在', statusCode: 404 },
    P2003: { code: 'FOREIGN_KEY_ERROR', message: '外键约束失败', statusCode: 400 },
    P2011: { code: 'NULL_CONSTRAINT_ERROR', message: '字段不能为空', statusCode: 400 },
  };

  const mapped = errorMap[prismaErrorCode] || {
    code: 'DATABASE_ERROR',
    message: '数据库错误',
    statusCode: 500,
  };

  return res.status(mapped.statusCode).json({
    success: false,
    error: {
      code: mapped.code,
      message: mapped.message,
    },
  });
}

module.exports = {
  AppError,
  notFoundHandler,
  errorHandler,
  handleZodError,
  handlePrismaError,
};
