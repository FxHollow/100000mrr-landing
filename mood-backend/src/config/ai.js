// Claude AI 服务配置

const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 情绪分析 prompt 模板
const MOOD_ANALYSIS_PROMPT = `
你是一位专业的心理健康分析师。请分析用户的情绪日记数据，输出 JSON 格式的分析结果。

输出格式要求：
{
  "trend": "improving|stable|declining",
  "averageMood": 数字 (1-10),
  "insights": ["洞察 1", "洞察 2", ...],
  "riskLevel": "LOW|MEDIUM|HIGH|CRITICAL",
  "recommendations": ["建议 1", "建议 2", ...]
}

分析维度：
1. 情绪变化趋势（对比历史数据）
2. 主要情绪触发因素
3. 潜在风险信号
4. 可行的干预建议

用户数据：
`;

// 关系事件分析 prompt 模板
const RELATIONSHIP_ANALYSIS_PROMPT = `
你是一位关系咨询师。请分析用户的关系事件数据，输出 JSON 格式的分析结果。

输出格式要求：
{
  "healthScore": 数字 (1-10),
  "conflictRisk": "LOW|MEDIUM|HIGH",
  "patterns": ["模式 1", "模式 2", ...],
  "recommendations": ["建议 1", "建议 2", ...]
}

分析维度：
1. 关系健康度评估
2. 冲突模式识别
3. 沟通质量分析
4. 改善建议

用户数据：
`;

module.exports = {
  anthropic,
  prompts: {
    moodAnalysis: MOOD_ANALYSIS_PROMPT,
    relationshipAnalysis: RELATIONSHIP_ANALYSIS_PROMPT,
  },
};
