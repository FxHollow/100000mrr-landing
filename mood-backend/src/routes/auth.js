// 认证路由

const express = require('express');
const router = express.Router();

const authService = require('../services/authService');
const { authMiddleware } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { logger } = require('../utils/logger');
const schemas = require('../schemas/auth');

/**
 * POST /api/v1/auth/register
 * 用户注册
 */
router.post('/register', validate(schemas.RegisterSchema), async (req, res) => {
  try {
    const { email, password, name, phone } = req.validatedData;
    const result = await authService.register({ email, password, name, phone });

    logger.info('用户注册成功', { userId: result.user.id, email });

    res.status(201).json({
      success: true,
      data: {
        user: result.user,
        token: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      },
    });
  } catch (err) {
    throw err;
  }
});

/**
 * POST /api/v1/auth/login
 * 用户登录
 */
router.post('/login', validate(schemas.LoginSchema), async (req, res) => {
  try {
    const { email, password } = req.validatedData;
    const result = await authService.login({ email, password });

    logger.info('用户登录成功', { userId: result.user.id, email });

    res.status(200).json({
      success: true,
      data: {
        user: result.user,
        token: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      },
    });
  } catch (err) {
    throw err;
  }
});

/**
 * POST /api/v1/auth/refresh
 * 刷新 token
 */
router.post('/refresh', validate(schemas.RefreshTokenSchema), async (req, res) => {
  try {
    const { refreshToken } = req.validatedData;
    const result = await authService.refreshToken(refreshToken);

    res.status(200).json({
      success: true,
      data: {
        token: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      },
    });
  } catch (err) {
    throw err;
  }
});

/**
 * POST /api/v1/auth/logout
 * 用户登出
 */
router.post('/logout', authMiddleware, async (req, res) => {
  // JWT 无状态，登出由客户端处理（删除本地 token）
  // 如需黑名单机制，可在此将 token 加入 Redis 黑名单
  res.status(200).json({
    success: true,
    data: { message: '已登出' },
  });
});

/**
 * GET /api/v1/auth/me
 * 获取当前用户信息
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    throw err;
  }
});

/**
 * PATCH /api/v1/auth/me
 * 更新当前用户信息
 */
router.patch('/me', authMiddleware, validate(schemas.UpdateProfileSchema), async (req, res) => {
  try {
    const user = await authService.updateProfile(req.user.id, req.validatedData);

    logger.info('用户信息更新', { userId: req.user.id });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
