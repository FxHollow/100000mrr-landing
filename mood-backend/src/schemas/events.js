// 关系事件相关 Zod Schema

const { z } = require('zod');

// 事件类型枚举
const RelationshipEventTypeEnum = z.enum([
  // 正面事件
  'POSITIVE_CONVERSATION',
  'DATE_NIGHT',
  'GIFT_RECEIVED',
  'SUPPORT_RECEIVED',
  'MAKING_UP',
  'INTIMACY',
  'SHARED_ACTIVITY',
  // 负面事件
  'ARGUMENT',
  'COLD_WAR',
  'CRITICISM',
  'DISAPPOINTMENT',
  'BETRAYAL',
  'BREAKUP_THOUGHT',
  // 日常
  'DAILY_INTERACTION',
  'CHECK_IN',
  'CONFLICT_RESOLUTION',
  'OTHER',
]);

// 关系类型枚举
const TargetRelationshipEnum = z.enum([
  'PARTNER',
  'SPOUSE',
  'PARENT',
  'CHILD',
  'SIBLING',
  'FRIEND',
  'COLLEAGUE',
  'BOSS',
  'OTHER',
]);

// 事件结果枚举
const EventOutcomeEnum = z.enum([
  'POSITIVE',
  'NEUTRAL',
  'NEGATIVE',
  'UNRESOLVED',
  'RESOLVED',
  'ESCALATED',
]);

// 创建关系事件 schema
const CreateEventSchema = z.object({
  eventType: RelationshipEventTypeEnum,
  targetPerson: z.string().max(100).optional(),
  relationship: TargetRelationshipEnum.optional(),
  description: z.string().min(1, '请输入事件描述').max(2000, '描述不能超过 2000 字符'),
  outcome: EventOutcomeEnum.optional(),
  severity: z.number().min(1).max(5).default(3),
  moodAtEvent: z.number().min(1).max(10).optional(),
  durationMinutes: z.number().min(1).optional(),
  eventTime: z.string().transform((s) => new Date(s)),
});

// 更新关系事件 schema
const UpdateEventSchema = z.object({
  eventType: RelationshipEventTypeEnum.optional(),
  targetPerson: z.string().max(100).optional(),
  relationship: TargetRelationshipEnum.optional(),
  description: z.string().max(2000).optional(),
  outcome: EventOutcomeEnum.optional(),
  severity: z.number().min(1).max(5).optional(),
  moodAtEvent: z.number().min(1).max(10).optional(),
  durationMinutes: z.number().min(1).optional(),
  eventTime: z.string().transform((s) => new Date(s)).optional(),
});

// 查询参数 schema
const EventListQuerySchema = z.object({
  eventType: z.string().optional(),
  outcome: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  limit: z.string().transform((s) => parseInt(s, 10)).default('20'),
  cursor: z.string().optional(),
});

// URL 参数 schema
const EventIdParamsSchema = z.object({
  id: z.string().uuid('无效的事件 ID'),
});

module.exports = {
  RelationshipEventTypeEnum,
  TargetRelationshipEnum,
  EventOutcomeEnum,
  CreateEventSchema,
  UpdateEventSchema,
  EventListQuerySchema,
  EventIdParamsSchema,
};
