// 通知服务

const { prisma } = require('../config/database');
const { AppError } = require('../middleware/error');
const { logger } = require('../utils/logger');

/**
 * 创建通知
 */
async function createNotification(userId, data) {
  return prisma.notification.create({
    data: {
      userId,
      ...data,
    },
  });
}

/**
 * 批量创建通知
 */
async function createBatchNotifications(userIds, data) {
  const notifications = [];
  for (const userId of userIds) {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId,
          ...data,
        },
      });
      notifications.push(notification);
    } catch (err) {
      logger.error('批量创建通知失败:', { userId, error: err.message });
    }
  }
  return notifications;
}

/**
 * 获取通知列表
 */
async function getNotifications(userId, { type, isRead, limit, cursor }) {
  const where = { userId };

  if (type) {
    where.type = type;
  }
  if (isRead !== undefined) {
    where.isRead = isRead;
  }

  const notifications = await prisma.notification.findMany({
    where,
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
  });

  let nextCursor = null;
  if (notifications.length > limit) {
    const nextItem = notifications.pop();
    nextCursor = nextItem.id;
  }

  return {
    notifications: notifications.map((n) => ({
      ...n,
      createdAt: n.createdAt.toISOString(),
    })),
    nextCursor,
  };
}

/**
 * 获取未读通知数量
 */
async function getUnreadCount(userId) {
  return prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });
}

/**
 * 标记通知为已读
 */
async function markAsRead(userId, id) {
  const notification = await prisma.notification.findFirst({
    where: { id, userId },
  });

  if (!notification) {
    throw new AppError('NOT_FOUND', '通知不存在', 404);
  }

  return prisma.notification.update({
    where: { id },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });
}

/**
 * 批量标记为已读
 */
async function markAllAsRead(userId) {
  const result = await prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });

  return { updated: result.count };
}

/**
 * 删除通知
 */
async function deleteNotification(userId, id) {
  const notification = await prisma.notification.findFirst({
    where: { id, userId },
  });

  if (!notification) {
    throw new AppError('NOT_FOUND', '通知不存在', 404);
  }

  await prisma.notification.delete({ where: { id } });
  return { success: true };
}

/**
 * 发送情绪签到提醒
 */
async function sendMoodCheckInReminder(userId) {
  return createNotification(userId, {
    type: 'MOOD_CHECK_IN',
    title: '今天的情绪如何？',
    message: '花一分钟记录一下此刻的感受吧，持续的情绪记录能帮助你更好地了解自己。',
  });
}

/**
 * 发送风险预警
 */
async function sendRiskAlert(userId, riskLevel, message) {
  const title =
    riskLevel === 'CRITICAL'
      ? '⚠️ 严重风险预警'
      : riskLevel === 'HIGH'
      ? '⚠️ 高风险提醒'
      : '📊 风险提醒';

  return createNotification(userId, {
    type: 'RELATIONSHIP_RISK',
    title,
    message,
  });
}

/**
 * 发送成就通知
 */
async function sendAchievement(userId, title, message) {
  return createNotification(userId, {
    type: 'ACHIEVEMENT',
    title,
    message,
  });
}

/**
 * 清理过期通知（超过 30 天）
 */
async function cleanupExpiredNotifications() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const result = await prisma.notification.deleteMany({
    where: {
      createdAt: { lt: thirtyDaysAgo },
      isRead: true,
    },
  });

  logger.info('清理过期通知完成', { deletedCount: result.count });
  return { deletedCount: result.count };
}

module.exports = {
  createNotification,
  createBatchNotifications,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  sendMoodCheckInReminder,
  sendRiskAlert,
  sendAchievement,
  cleanupExpiredNotifications,
};
