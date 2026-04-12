// 情绪日记服务

const { prisma } = require('../config/database');
const { AppError } = require('../middleware/error');
const { logger } = require('../utils/logger');

/**
 * 创建情绪日记
 */
async function createMoodEntry(userId, data) {
  return prisma.moodEntry.create({
    data: {
      userId,
      ...data,
    },
    select: {
      id: true,
      moodScore: true,
      emotions: true,
      trigger: true,
      physicalSensations: true,
      thoughts: true,
      behaviors: true,
      intensity: true,
      entryTime: true,
      createdAt: true,
    },
  });
}

/**
 * 获取情绪日记列表
 */
async function getMoodEntries(userId, { startDate, endDate, limit, cursor }) {
  const where = { userId };

  if (startDate) {
    where.entryTime = { ...where.entryTime, gte: new Date(startDate) };
  }
  if (endDate) {
    where.entryTime = { ...where.entryTime, lte: new Date(endDate) };
  }

  const entries = await prisma.moodEntry.findMany({
    where,
    take: limit + 1, // 多取一个用于判断是否有下一页
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { entryTime: 'desc' },
    select: {
      id: true,
      moodScore: true,
      emotions: true,
      intensity: true,
      trigger: true,
      entryTime: true,
    },
  });

  let nextCursor = null;
  if (entries.length > limit) {
    const nextItem = entries.pop();
    nextCursor = nextItem.id;
  }

  return {
    entries: entries.map((e) => ({
      ...e,
      entryTime: e.entryTime.toISOString(),
    })),
    nextCursor,
  };
}

/**
 * 获取单条情绪日记
 */
async function getMoodEntryById(userId, id) {
  const entry = await prisma.moodEntry.findFirst({
    where: { id, userId },
    select: {
      id: true,
      moodScore: true,
      emotions: true,
      trigger: true,
      physicalSensations: true,
      thoughts: true,
      behaviors: true,
      intensity: true,
      entryTime: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!entry) {
    throw new AppError('NOT_FOUND', '情绪日记不存在', 404);
  }

  return entry;
}

/**
 * 更新情绪日记
 */
async function updateMoodEntry(userId, id, data) {
  const entry = await prisma.moodEntry.findFirst({
    where: { id, userId },
  });

  if (!entry) {
    throw new AppError('NOT_FOUND', '情绪日记不存在', 404);
  }

  return prisma.moodEntry.update({
    where: { id },
    data,
    select: {
      id: true,
      moodScore: true,
      emotions: true,
      trigger: true,
      physicalSensations: true,
      thoughts: true,
      behaviors: true,
      intensity: true,
      entryTime: true,
      updatedAt: true,
    },
  });
}

/**
 * 删除情绪日记
 */
async function deleteMoodEntry(userId, id) {
  const entry = await prisma.moodEntry.findFirst({
    where: { id, userId },
  });

  if (!entry) {
    throw new AppError('NOT_FOUND', '情绪日记不存在', 404);
  }

  await prisma.moodEntry.delete({ where: { id } });
  return { success: true };
}

/**
 * 获取情绪趋势分析
 */
async function getMoodTrends(userId, period) {
  const now = new Date();
  let startDate;

  switch (period) {
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case 'year':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  // 获取时间段内的情绪日记
  const entries = await prisma.moodEntry.findMany({
    where: {
      userId,
      entryTime: { gte: startDate },
    },
    orderBy: { entryTime: 'asc' },
    select: {
      moodScore: true,
      emotions: true,
      entryTime: true,
    },
  });

  if (entries.length === 0) {
    return {
      period,
      averageMood: 0,
      trend: 'insufficient_data',
      dailyMoods: [],
      topEmotions: [],
      totalEntries: 0,
    };
  }

  // 计算平均情绪
  const averageMood =
    entries.reduce((sum, e) => sum + e.moodScore, 0) / entries.length;

  // 按日期分组
  const dailyMap = new Map();
  for (const entry of entries) {
    const date = entry.entryTime.toISOString().split('T')[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, { date, scores: [], count: 0 });
    }
    dailyMap.get(date).scores.push(entry.moodScore);
    dailyMap.get(date).count++;
  }

  const dailyMoods = Array.from(dailyMap.values()).map((d) => ({
    date: d.date,
    score: Math.round((d.scores.reduce((a, b) => a + b, 0) / d.count) * 10) / 10,
  }));

  // 判断趋势（简单线性回归）
  let trend = 'stable';
  if (dailyMoods.length >= 3) {
    const firstHalf = dailyMoods.slice(0, Math.floor(dailyMoods.length / 2));
    const secondHalf = dailyMoods.slice(Math.floor(dailyMoods.length / 2));
    const firstAvg = firstHalf.reduce((s, d) => s + d.score, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((s, d) => s + d.score, 0) / secondHalf.length;

    if (secondAvg - firstAvg > 0.5) trend = 'improving';
    else if (firstAvg - secondAvg > 0.5) trend = 'declining';
  }

  // 统计最常见情绪
  const emotionCount = new Map();
  for (const entry of entries) {
    for (const emotion of entry.emotions) {
      emotionCount.set(emotion, (emotionCount.get(emotion) || 0) + 1);
    }
  }

  const topEmotions = Array.from(emotionCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([emotion, count]) => ({ emotion, count }));

  return {
    period,
    averageMood: Math.round(averageMood * 10) / 10,
    trend,
    dailyMoods,
    topEmotions,
    totalEntries: entries.length,
  };
}

/**
 * 获取用户统计摘要
 */
async function getUserStats(userId) {
  const totalEntries = await prisma.moodEntry.count({
    where: { userId },
  });

  const lastEntry = await prisma.moodEntry.findFirst({
    where: { userId },
    orderBy: { entryTime: 'desc' },
    select: { entryTime: true },
  });

  // 计算连续记录天数（streak）
  const recentEntries = await prisma.moodEntry.findMany({
    where: { userId },
    orderBy: { entryTime: 'desc' },
    take: 100,
    select: { entryTime: true },
  });

  let streakDays = 0;
  if (recentEntries.length > 0) {
    const today = new Date().toISOString().split('T')[0];
    let currentDate = new Date(today);

    for (let i = 0; i < recentEntries.length; i++) {
      const entryDate = recentEntries[i].entryTime.toISOString().split('T')[0];
      const expectedDate = currentDate.toISOString().split('T')[0];

      if (entryDate === expectedDate) {
        streakDays++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (entryDate < expectedDate) {
        break;
      }
    }
  }

  return {
    totalEntries,
    streakDays,
    lastEntryAt: lastEntry?.entryTime.toISOString() || null,
  };
}

module.exports = {
  createMoodEntry,
  getMoodEntries,
  getMoodEntryById,
  updateMoodEntry,
  deleteMoodEntry,
  getMoodTrends,
  getUserStats,
};
