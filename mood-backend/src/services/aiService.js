// AI 分析服务 - 使用 Claude API

const { anthropic, prompts } = require('../config/ai');
const { prisma } = require('../config/database');
const { AppError } = require('../middleware/error');
const { logger } = require('../utils/logger');

/**
 * 分析情绪趋势
 */
async function analyzeMood(entries) {
  if (entries.length === 0) {
    return {
      trend: 'insufficient_data',
      averageMood: 0,
      insights: ['数据不足，请继续记录情绪日记'],
      riskLevel: 'LOW',
      recommendations: ['建议每天记录情绪，至少积累 7 天数据以获得有意义的分析'],
    };
  }

  // 构建分析 prompt
  const entriesData = entries.map((e) => ({
    date: e.entryTime,
    score: e.moodScore,
    emotions: e.emotions,
    trigger: e.trigger,
    thoughts: e.thoughts,
  }));

  const prompt = `${prompts.moodAnalysis}
${JSON.stringify(entriesData, null, 2)}

请严格按照 JSON 格式输出分析结果，不要包含其他文字。`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
      system: '你是一位专业的心理健康分析师。请分析用户的情绪数据并提供有洞察的建议。输出必须是有效的 JSON 格式。',
    });

    const content = response.content[0].text;
    const result = parseJsonResponse(content);

    // 保存分析结果
    await prisma.aIAnalysis.create({
      data: {
        userId: entries[0].userId,
        analysisType: 'MOOD_TREND',
        result: result,
        confidence: calculateConfidence(entries.length),
        riskLevel: result.riskLevel || 'LOW',
        recommendations: result.recommendations?.join('\n') || '',
      },
    });

    logger.info('情绪分析完成', {
      userId: entries[0].userId,
      entryCount: entries.length,
      riskLevel: result.riskLevel,
    });

    return result;
  } catch (err) {
    logger.error('情绪分析失败:', err);
    throw new AppError('AI_SERVICE_ERROR', 'AI 分析服务暂时不可用', 503);
  }
}

/**
 * 分析关系健康度
 */
async function analyzeRelationship(events) {
  if (events.length === 0) {
    return {
      healthScore: 0,
      conflictRisk: 'insufficient_data',
      patterns: ['数据不足，请继续记录关系事件'],
      recommendations: ['建议记录与伴侣/家人的互动事件，至少积累 5 个事件以获得有意义的分析'],
    };
  }

  const eventsData = events.map((e) => ({
    date: e.eventTime,
    type: e.eventType,
    outcome: e.outcome,
    severity: e.severity,
    mood: e.moodAtEvent,
  }));

  const prompt = `${prompts.relationshipAnalysis}
${JSON.stringify(eventsData, null, 2)}

请严格按照 JSON 格式输出分析结果，不要包含其他文字。`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
      system: '你是一位专业的关系咨询师。请分析用户的关系数据并提供专业的改善建议。输出必须是有效的 JSON 格式。',
    });

    const content = response.content[0].text;
    const result = parseJsonResponse(content);

    // 保存分析结果
    await prisma.aIAnalysis.create({
      data: {
        userId: events[0].userId,
        analysisType: 'RELATIONSHIP_HEALTH',
        result: result,
        confidence: calculateConfidence(events.length),
        riskLevel: mapConflictRiskToRiskLevel(result.conflictRisk),
        recommendations: result.recommendations?.join('\n') || '',
      },
    });

    logger.info('关系分析完成', {
      userId: events[0].userId,
      eventCount: events.length,
      healthScore: result.healthScore,
    });

    return result;
  } catch (err) {
    logger.error('关系分析失败:', err);
    throw new AppError('AI_SERVICE_ERROR', 'AI 分析服务暂时不可用', 503);
  }
}

/**
 * 预测冲突风险
 */
async function predictConflict(entries, events) {
  const data = {
    recentMoods: entries?.slice(-14).map((e) => ({
      date: e.entryTime,
      score: e.moodScore,
      emotions: e.emotions,
    })) || [],
    recentEvents: events?.slice(-14).map((e) => ({
      date: e.eventTime,
      type: e.eventType,
      outcome: e.outcome,
      severity: e.severity,
    })) || [],
  };

  if (data.recentMoods.length === 0 && data.recentEvents.length === 0) {
    return {
      level: 'insufficient_data',
      probability: 0,
      factors: ['数据不足，无法预测'],
      suggestions: ['请继续记录情绪和关系事件，积累更多数据后可以提供预测'],
    };
  }

  const prompt = `你是一位关系冲突预测专家。请分析以下用户数据，预测未来 7 天内发生关系冲突（争吵、冷战等）的风险。

输出 JSON 格式：
{
  "level": "LOW|MEDIUM|HIGH|CRITICAL",
  "probability": 0-1 之间的数字,
  "factors": ["风险因素 1", "风险因素 2", ...],
  "suggestions": ["建议 1", "建议 2", ...]
}

分析维度：
1. 情绪变化趋势（连续下降表示风险增加）
2. 负面事件频率和严重度
3. 未解决的冲突事件
4. 沟通质量变化

用户数据：
${JSON.stringify(data, null, 2)}

请严格按照 JSON 格式输出，不要包含其他文字。`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
      system: '你是一位专业的关系冲突预测专家，基于心理学研究和数据分析提供预测。输出必须是有效的 JSON 格式。',
    });

    const content = response.content[0].text;
    const result = parseJsonResponse(content);

    // 保存预测结果
    await prisma.aIAnalysis.create({
      data: {
        userId: entries?.[0]?.userId || events?.[0]?.userId,
        analysisType: 'CONFLICT_PREDICTION',
        result: result,
        confidence: calculateConfidence(
          (entries?.length || 0) + (events?.length || 0)
        ),
        riskLevel: result.level || 'LOW',
        alertFlag: result.level === 'HIGH' || result.level === 'CRITICAL',
        recommendations: result.suggestions?.join('\n') || '',
      },
    });

    logger.info('冲突预测完成', {
      userId: entries?.[0]?.userId || events?.[0]?.userId,
      riskLevel: result.level,
      probability: result.probability,
    });

    return result;
  } catch (err) {
    logger.error('冲突预测失败:', err);
    throw new AppError('AI_SERVICE_ERROR', 'AI 预测服务暂时不可用', 503);
  }
}

/**
 * 获取历史分析记录
 */
async function getAnalysisHistory(userId, analysisType, limit = 10) {
  const where = { userId };
  if (analysisType) {
    where.analysisType = analysisType;
  }

  return prisma.aIAnalysis.findMany({
    where,
    take: limit,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      analysisType: true,
      result: true,
      riskLevel: true,
      alertFlag: true,
      recommendations: true,
      createdAt: true,
    },
  });
}

/**
 * 解析 AI 返回的 JSON 响应
 */
function parseJsonResponse(content) {
  try {
    // 尝试提取 JSON（AI 可能返回额外的文字）
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(content);
  } catch (err) {
    logger.error('解析 AI 响应失败:', { content, error: err.message });
    return {
      insights: ['分析完成，但格式解析失败'],
      riskLevel: 'LOW',
      recommendations: ['请稍后重试或联系技术支持'],
    };
  }
}

/**
 * 根据数据量计算置信度
 */
function calculateConfidence(dataPoints) {
  if (dataPoints >= 30) return 0.9;
  if (dataPoints >= 14) return 0.75;
  if (dataPoints >= 7) return 0.6;
  if (dataPoints >= 3) return 0.4;
  return 0.2;
}

/**
 * 将冲突风险映射到标准风险等级
 */
function mapConflictRiskToRiskLevel(conflictRisk) {
  const map = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    CRITICAL: 'CRITICAL',
    insufficient_data: 'LOW',
  };
  return map[conflictRisk] || 'LOW';
}

module.exports = {
  analyzeMood,
  analyzeRelationship,
  predictConflict,
  getAnalysisHistory,
};
