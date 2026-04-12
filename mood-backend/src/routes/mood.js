// 情绪日记路由

const express = require('express');
const router = express.Router();

const moodService = require('../services/moodService');
const { authMiddleware } = require('../middleware/auth');
const { validate, validateQuery, validateParams } = require('../middleware/validate');
const schemas = require('../schemas/mood');

// 所有路由都需要认证
router.use(authMiddleware);

/**
 * POST /api/v1/mood/entries
 * 创建情绪日记
 */
router.post('/entries', validate(schemas.CreateMoodEntrySchema), async (req, res) => {
  const entry = await moodService.createMoodEntry(req.user.id, req.validatedData);

  res.status(201).json({
    success: true,
    data: entry,
  });
});

/**
 * GET /api/v1/mood/entries
 * 获取情绪日记列表
 */
router.get('/entries', validateQuery(schemas.MoodEntryListQuerySchema), async (req, res) => {
  const result = await moodService.getMoodEntries(req.user.id, req.validatedQuery);

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * GET /api/v1/mood/entries/:id
 * 获取单条情绪日记
 */
router.get('/entries/:id', validateParams(schemas.MoodEntryIdParamsSchema), async (req, res) => {
  const entry = await moodService.getMoodEntryById(req.user.id, req.validatedParams.id);

  res.status(200).json({
    success: true,
    data: entry,
  });
});

/**
 * PATCH /api/v1/mood/entries/:id
 * 更新情绪日记
 */
router.patch(
  '/entries/:id',
  validateParams(schemas.MoodEntryIdParamsSchema),
  validate(schemas.UpdateMoodEntrySchema),
  async (req, res) => {
    const entry = await moodService.updateMoodEntry(
      req.user.id,
      req.validatedParams.id,
      req.validatedData
    );

    res.status(200).json({
      success: true,
      data: entry,
    });
  }
);

/**
 * DELETE /api/v1/mood/entries/:id
 * 删除情绪日记
 */
router.delete('/entries/:id', validateParams(schemas.MoodEntryIdParamsSchema), async (req, res) => {
  await moodService.deleteMoodEntry(req.user.id, req.validatedParams.id);

  res.status(200).json({
    success: true,
    data: { message: '已删除' },
  });
});

/**
 * GET /api/v1/mood/trends
 * 获取情绪趋势分析
 */
router.get('/trends', validateQuery(schemas.MoodTrendQuerySchema), async (req, res) => {
  const trends = await moodService.getMoodTrends(req.user.id, req.validatedQuery.period);

  res.status(200).json({
    success: true,
    data: trends,
  });
});

/**
 * GET /api/v1/mood/stats
 * 获取用户统计摘要
 */
router.get('/stats', async (req, res) => {
  const stats = await moodService.getUserStats(req.user.id);

  res.status(200).json({
    success: true,
    data: stats,
  });
});

module.exports = router;
