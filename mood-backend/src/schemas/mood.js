// 情绪日记相关 Zod Schema

const { z } = require('zod');

// 情绪类型枚举
const EmotionTypeEnum = z.enum([
  // 正面情绪
  'HAPPY',
  'EXCITED',
  'GRATEFUL',
  'CALM',
  'CONFIDENT',
  'HOPEFUL',
  // 负面情绪
  'SAD',
  'ANGRY',
  'ANXIOUS',
  'FRUSTRATED',
  'LONELY',
  'JEALOUS',
  'GUILT',
  'SHAME',
  'FEAR',
  'OVERWHELMED',
  // 中性
  'NEUTRAL',
  'TIRED',
  'BORED',
]);

// 创建情绪日记 schema
const CreateMoodEntrySchema = z.object({
  moodScore: z.number().min(1, '最低 1 分').max(10, '最高 10 分'),
  emotions: z.array(EmotionTypeEnum).min(1, '至少选择一个情绪'),
  trigger: z.string().max(500).optional(),
  physicalSensations: z.string().max(500).optional(),
  thoughts: z.string().max(1000).optional(),
  behaviors: z.string().max(500).optional(),
  intensity: z.number().min(1).max(5).default(3),
  entryTime: z.string().transform((s) => new Date(s)),
});

// 更新情绪日记 schema
const UpdateMoodEntrySchema = z.object({
  moodScore: z.number().min(1).max(10).optional(),
  emotions: z.array(EmotionTypeEnum).optional(),
  trigger: z.string().max(500).optional(),
  physicalSensations: z.string().max(500).optional(),
  thoughts: z.string().max(1000).optional(),
  behaviors: z.string().max(500).optional(),
  intensity: z.number().min(1).max(5).optional(),
  entryTime: z.string().transform((s) => new Date(s)).optional(),
});

// 查询参数 schema
const MoodEntryListQuerySchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  limit: z.string().transform((s) => parseInt(s, 10)).default('20'),
  cursor: z.string().optional(),
});

// URL 参数 schema
const MoodEntryIdParamsSchema = z.object({
  id: z.string().uuid('无效的情绪日记 ID'),
});

// 情绪趋势查询 schema
const MoodTrendQuerySchema = z.object({
  period: z.enum(['week', 'month', 'year']).default('week'),
});

module.exports = {
  EmotionTypeEnum,
  CreateMoodEntrySchema,
  UpdateMoodEntrySchema,
  MoodEntryListQuerySchema,
  MoodEntryIdParamsSchema,
  MoodTrendQuerySchema,
};
