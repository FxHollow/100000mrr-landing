// 关系事件服务

const { prisma } = require('../config/database');
const { AppError } = require('../middleware/error');

/**
 * 创建关系事件
 */
async function createEvent(userId, data) {
  return prisma.relationshipEvent.create({
    data: {
      userId,
      ...data,
    },
    select: {
      id: true,
      eventType: true,
      targetPerson: true,
      relationship: true,
      description: true,
      outcome: true,
      severity: true,
      moodAtEvent: true,
      durationMinutes: true,
      eventTime: true,
      createdAt: true,
    },
  });
}

/**
 * 获取关系事件列表
 */
async function getEvents(userId, { eventType, outcome, startDate, endDate, limit, cursor }) {
  const where = { userId };

  if (eventType) {
    where.eventType = eventType;
  }
  if (outcome) {
    where.outcome = outcome;
  }
  if (startDate) {
    where.eventTime = { ...where.eventTime, gte: new Date(startDate) };
  }
  if (endDate) {
    where.eventTime = { ...where.eventTime, lte: new Date(endDate) };
  }

  const events = await prisma.relationshipEvent.findMany({
    where,
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { eventTime: 'desc' },
    select: {
      id: true,
      eventType: true,
      targetPerson: true,
      relationship: true,
      outcome: true,
      severity: true,
      moodAtEvent: true,
      eventTime: true,
    },
  });

  let nextCursor = null;
  if (events.length > limit) {
    const nextItem = events.pop();
    nextCursor = nextItem.id;
  }

  return {
    events: events.map((e) => ({
      ...e,
      eventTime: e.eventTime.toISOString(),
    })),
    nextCursor,
  };
}

/**
 * 获取单个关系事件
 */
async function getEventById(userId, id) {
  const event = await prisma.relationshipEvent.findFirst({
    where: { id, userId },
  });

  if (!event) {
    throw new AppError('NOT_FOUND', '事件不存在', 404);
  }

  return event;
}

/**
 * 更新关系事件
 */
async function updateEvent(userId, id, data) {
  const event = await prisma.relationshipEvent.findFirst({
    where: { id, userId },
  });

  if (!event) {
    throw new AppError('NOT_FOUND', '事件不存在', 404);
  }

  return prisma.relationshipEvent.update({
    where: { id },
    data,
    select: {
      id: true,
      eventType: true,
      targetPerson: true,
      relationship: true,
      description: true,
      outcome: true,
      severity: true,
      moodAtEvent: true,
      durationMinutes: true,
      eventTime: true,
      updatedAt: true,
    },
  });
}

/**
 * 删除关系事件
 */
async function deleteEvent(userId, id) {
  const event = await prisma.relationshipEvent.findFirst({
    where: { id, userId },
  });

  if (!event) {
    throw new AppError('NOT_FOUND', '事件不存在', 404);
  }

  await prisma.relationshipEvent.delete({ where: { id } });
  return { success: true };
}

/**
 * 获取关系事件统计
 */
async function getEventStats(userId) {
  const allEvents = await prisma.relationshipEvent.findMany({
    where: { userId },
    select: {
      eventType: true,
      outcome: true,
      severity: true,
    },
  });

  const totalEvents = allEvents.length;
  const positiveEvents = allEvents.filter(
    (e) =>
      e.eventType.startsWith('POSITIVE') ||
      e.eventType === 'MAKING_UP' ||
      e.eventType === 'CONFLICT_RESOLUTION'
  ).length;
  const negativeEvents = allEvents.filter(
    (e) =>
      e.eventType === 'ARGUMENT' ||
      e.eventType === 'COLD_WAR' ||
      e.eventType === 'CRITICISM' ||
      e.eventType === 'DISAPPOINTMENT'
  ).length;

  // 解决率 = RESOLVED / (ARGUMENT + COLD_WAR)
  const conflictEvents = allEvents.filter(
    (e) => e.eventType === 'ARGUMENT' || e.eventType === 'COLD_WAR'
  );
  const resolvedCount = allEvents.filter((e) => e.outcome === 'RESOLVED').length;
  const conflictResolutionRate =
    conflictEvents.length > 0 ? resolvedCount / conflictEvents.length : 0;

  // 平均严重度
  const averageSeverity =
    allEvents.length > 0
      ? allEvents.reduce((sum, e) => sum + e.severity, 0) / allEvents.length
      : 0;

  return {
    totalEvents,
    positiveEvents,
    negativeEvents,
    conflictResolutionRate: Math.round(conflictResolutionRate * 100) / 100,
    averageSeverity: Math.round(averageSeverity * 10) / 10,
  };
}

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventStats,
};
