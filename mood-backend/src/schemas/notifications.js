// 通知相关 Zod Schema

const { z } = require('zod');

// 通知类型枚举
const NotificationTypeEnum = z.enum([
  'MOOD_CHECK_IN',        // 情绪签到提醒
  'PATTERN_ALERT',        // 模式预警
  'RELATIONSHIP_RISK',    // 关系风险预警
  'INTERVENTION_TIP',     // 干预建议
  'POSITIVE_REMINDER',    // 积极提醒
  'ACHIEVEMENT',          // 成就通知
  'SYSTEM',               // 系统通知
]);

// 创建通知 schema（内部使用）
const CreateNotificationSchema = z.object({
  type: NotificationTypeEnum,
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  isRead: z.boolean().default(false),
});

// 批量创建通知 schema
const BatchCreateNotificationSchema = z.object({
  userIds: z.array(z.string().uuid()),
  type: NotificationTypeEnum,
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
});

// 更新通知 schema
const UpdateNotificationSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  message: z.string().min(1).max(500).optional(),
  isRead: z.boolean().optional(),
});

// 查询参数 schema
const NotificationListQuerySchema = z.object({
  type: z.string().optional(),
  isRead: z.string().transform((s) => {
    if (s === 'true') return true;
    if (s === 'false') return false;
    return undefined;
  }).optional(),
  limit: z.string().transform((s) => parseInt(s, 10)).default('20'),
  cursor: z.string().optional(),
});

// URL 参数 schema
const NotificationIdParamsSchema = z.object({
  id: z.string().uuid('无效的通知 ID'),
});

module.exports = {
  NotificationTypeEnum,
  CreateNotificationSchema,
  BatchCreateNotificationSchema,
  UpdateNotificationSchema,
  NotificationListQuerySchema,
  NotificationIdParamsSchema,
};
