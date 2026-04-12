// AI 分析相关 Zod Schema

const { z } = require('zod');

// 分析类型枚举
const AnalysisTypeEnum = z.enum([
  'MOOD_TREND',         // 情绪趋势分析
  'TRIGGER_PATTERN',    // 触发因素模式
  'RELATIONSHIP_HEALTH', // 关系健康度
  'CONFLICT_PREDICTION', // 冲突预测
  'INTERVENTION_SUGGESTION', // 干预建议
]);

// 情绪分析请求 schema
const MoodAnalysisRequestSchema = z.object({
  analysisType: z.literal('MOOD_TREND'),
  entries: z.array(z.object({
    moodScore: z.number().min(1).max(10),
    emotions: z.array(z.string()),
    trigger: z.string().optional(),
    thoughts: z.string().optional(),
    entryTime: z.string(),
  })).min(1, '至少需要一条情绪记录'),
});

// 关系分析请求 schema
const RelationshipAnalysisRequestSchema = z.object({
  analysisType: z.literal('RELATIONSHIP_HEALTH'),
  events: z.array(z.object({
    eventType: z.string(),
    outcome: z.string().optional(),
    severity: z.number().min(1).max(5),
    moodAtEvent: z.number().min(1).max(10).optional(),
    eventTime: z.string(),
  })).min(1, '至少需要一个关系事件'),
});

// 冲突预测请求 schema
const ConflictPredictionRequestSchema = z.object({
  analysisType: z.literal('CONFLICT_PREDICTION'),
  entries: z.array(z.object({
    moodScore: z.number().min(1).max(10),
    emotions: z.array(z.string()),
    entryTime: z.string(),
  })).optional(),
  events: z.array(z.object({
    eventType: z.string(),
    outcome: z.string().optional(),
    severity: z.number().min(1).max(5),
    eventTime: z.string(),
  })).optional(),
});

// 通用分析请求 schema（用于路由验证）
const AnalyzeRequestSchema = z.object({
  analysisType: AnalysisTypeEnum,
  data: z.record(z.any()),
});

// 分析响应 schema（用于验证 AI 返回）
const AnalysisResponseSchema = z.object({
  trend: z.string().optional(),
  averageMood: z.number().optional(),
  healthScore: z.number().optional(),
  conflictRisk: z.string().optional(),
  probability: z.number().optional(),
  insights: z.array(z.string()),
  patterns: z.array(z.string()).optional(),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  recommendations: z.array(z.string()),
  factors: z.array(z.string()).optional(),
  suggestions: z.array(z.string()).optional(),
});

module.exports = {
  AnalysisTypeEnum,
  MoodAnalysisRequestSchema,
  RelationshipAnalysisRequestSchema,
  ConflictPredictionRequestSchema,
  AnalyzeRequestSchema,
  AnalysisResponseSchema,
};
