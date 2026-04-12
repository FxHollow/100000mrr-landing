// 通知路由

const express = require('express');
const router = express.Router();

const notificationService = require('../services/notificationService');
const { authMiddleware } = require('../middleware/auth');
const { validate, validateQuery, validateParams } = require('../middleware/validate');
const schemas = require('../schemas/notifications');
const { logger } = require('../utils/logger');

// 所有路由都需要认证
router.use(authMiddleware);

/**
 * GET /api/v1/notifications
 * 获取通知列表
 */
router.get('/', validateQuery(schemas.NotificationListQuerySchema), async (req, res, next) => {
  try {
    const result = await notificationService.getNotifications(
      req.user.id,
      req.validatedQuery
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/notifications/unread-count
 * 获取未读通知数量
 */
router.get('/unread-count', async (req, res, next) => {
  try {
    const count = await notificationService.getUnreadCount(req.user.id);

    res.status(200).json({
      success: true,
      data: { count },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/v1/notifications/:id/read
 * 标记通知为已读
 */
router.patch(
  '/:id/read',
  validateParams(schemas.NotificationIdParamsSchema),
  async (req, res, next) => {
    try {
      const notification = await notificationService.markAsRead(
        req.user.id,
        req.validatedParams.id
      );

      res.status(200).json({
        success: true,
        data: notification,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PATCH /api/v1/notifications/read-all
 * 批量标记为已读
 */
router.patch('/read-all', async (req, res, next) => {
  try {
    const result = await notificationService.markAllAsRead(req.user.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/v1/notifications/:id
 * 删除通知
 */
router.delete(
  '/:id',
  validateParams(schemas.NotificationIdParamsSchema),
  async (req, res, next) => {
    try {
      await notificationService.deleteNotification(req.user.id, req.validatedParams.id);

      res.status(200).json({
        success: true,
        data: { message: '已删除' },
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
