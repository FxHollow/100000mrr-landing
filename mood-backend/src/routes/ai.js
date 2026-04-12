// AI 分析路由

const express = require('express');
const router = express.Router();

const aiService = require('../services/aiService');
const moodService = require('../services/moodService');
const eventService = require('../services/eventService');
const { authMiddleware } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const schemas = require('../schemas/ai');
const { logger } = require('../utils/logger');
const { prisma } = require('../config/database');

// 所有路由都需要认证
router.use(authMiddleware);

/**
 * POST /api/v1/ai/analyze
 * 执行 AI 分析
 */
router.post('/analyze', async (req, res, next) => {
  try {
    const { analysisType } = req.body;

    let result;

    switch (analysisType) {
      case 'MOOD_TREND': {
        // 获取用户最近的情绪日记
        const entries = await moodService.getMoodEntries(req.user.id, {
          limit: 30,
        });
        // 添加 userId 以便 AI 服务保存结果
        entries.entries.forEach((e) => {
          e.userId = req.user.id;
        });
        result = await aiService.analyzeMood(entries.entries);
        break;
      }

      case 'RELATIONSHIP_HEALTH': {
        // 获取用户最近的关系事件
        const events = await eventService.getEvents(req.user.id, {
          limit: 30,
        });
        events.events.forEach((e) => {
          e.userId = req.user.id;
        });
        result = await aiService.analyzeRelationship(events.events);
        break;
      }

      case 'CONFLICT_PREDICTION': {
        // 获取情绪日记和关系事件
        const entriesResult = await moodService.getMoodEntries(req.user.id, {
          limit: 14,
        });
        const eventsResult = await eventService.getEvents(req.user.id, {
          limit: 14,
        });

        entriesResult.entries.forEach((e) => {
          e.userId = req.user.id;
        });
        eventsResult.events.forEach((e) => {
          e.userId = req.user.id;
        });

        result = await aiService.predictConflict(
          entriesResult.entries,
          eventsResult.events
        );
        break;
      }

      default:
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_ANALYSIS_TYPE',
            message: `不支持的分析类型：${analysisType}`,
          },
        });
    }

    logger.info('AI 分析完成', {
      userId: req.user.id,
      analysisType,
      riskLevel: result.riskLevel || result.level,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/ai/predictions
 * 获取最新预测结果
 */
router.get('/predictions', async (req, res) => {
  try {
    const predictions = await aiService.getAnalysisHistory(
      req.user.id,
      'CONFLICT_PREDICTION',
      1
    );

    res.status(200).json({
      success: true,
      data: predictions[0] || null,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/ai/history
 * 获取 AI 分析历史
 */
router.get('/history', async (req, res, next) => {
  try {
    const { type, limit } = req.query;
    const history = await aiService.getAnalysisHistory(
      req.user.id,
      type,
      parseInt(limit) || 10
    );

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/ai/alerts
 * 获取未读预警（高风险/严重风险）
 */
router.get('/alerts', async (req, res, next) => {
  try {
    const alerts = await prisma.aIAnalysis.findMany({
      where: {
        userId: req.user.id,
        alertFlag: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        analysisType: true,
        riskLevel: true,
        result: true,
        recommendations: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      data: alerts,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
