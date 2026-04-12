// 定时任务调度器

const cron = require('node-cron');
const { prisma } = require('./config/database');
const notificationService = require('./services/notificationService');
const { logger } = require('./utils/logger');

// 存储定时任务引用
const jobs = [];

/**
 * 初始化所有定时任务
 */
function initScheduler() {
  logger.info('初始化定时任务调度器...');

  // 每日情绪签到提醒 - 每天早上 9 点
  const moodCheckInJob = cron.schedule(
    '0 9 * * *',
    async () => {
      logger.info('执行每日情绪签到提醒任务...');
      await sendDailyMoodCheckIn();
    },
    { timezone: 'Asia/Shanghai' }
  );
  jobs.push(moodCheckInJob);

  // 每周情绪报告 - 每周一早上 9 点
  const weeklyReportJob = cron.schedule(
    '0 9 * * 1',
    async () => {
      logger.info('执行每周情绪报告任务...');
      await sendWeeklyReport();
    },
    { timezone: 'Asia/Shanghai' }
  );
  jobs.push(weeklyReportJob);

  // 清理过期通知 - 每天凌晨 2 点
  const cleanupJob = cron.schedule(
    '0 2 * * *',
    async () => {
      logger.info('执行清理过期通知任务...');
      await notificationService.cleanupExpiredNotifications();
    },
    { timezone: 'Asia/Shanghai' }
  );
  jobs.push(cleanupJob);

  logger.info(`已启动 ${jobs.length} 个定时任务`);
}

/**
 * 发送每日情绪签到提醒
 */
async function sendDailyMoodCheckIn() {
  try {
    // 获取所有活跃用户（最近 7 天有登录的）
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const activeUsers = await prisma.user.findMany({
      where: {
        lastLoginAt: { gte: sevenDaysAgo },
      },
      select: { id: true, email: true, phone: true },
    });

    let sentCount = 0;
    for (const user of activeUsers) {
      try {
        await notificationService.sendMoodCheckInReminder(user.id);
        sentCount++;
      } catch (err) {
        logger.error('发送签到提醒失败:', { userId: user.id, error: err.message });
      }
    }

    logger.info('每日情绪签到提醒完成', { sentCount, totalUsers: activeUsers.length });
  } catch (err) {
    logger.error('每日情绪签到提醒任务失败:', err);
  }
}

/**
 * 发送每周情绪报告
 */
async function sendWeeklyReport() {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const activeUsers = await prisma.user.findMany({
      where: {
        lastLoginAt: { gte: sevenDaysAgo },
      },
      select: { id: true, email: true },
    });

    for (const user of activeUsers) {
      try {
        // 获取用户本周情绪数据
        const entries = await prisma.moodEntry.findMany({
          where: {
            userId: user.id,
            entryTime: { gte: sevenDaysAgo },
          },
          select: { moodScore: true, emotions: true },
        });

        if (entries.length === 0) continue;

        // 计算平均情绪
        const avgMood =
          entries.reduce((sum, e) => sum + e.moodScore, 0) / entries.length;

        // 统计最常见情绪
        const emotionCount = new Map();
        for (const entry of entries) {
          for (const emotion of entry.emotions) {
            emotionCount.set(emotion, (emotionCount.get(emotion) || 0) + 1);
          }
        }
        const topEmotion = Array.from(emotionCount.entries())
          .sort((a, b) => b[1] - a[1])[0]?.[0];

        // 创建周报告知
        await notificationService.createNotification(user.id, {
          type: 'SYSTEM',
          title: '📊 本周情绪报告',
          message: `本周你记录了 ${entries.length} 次情绪，平均得分 ${avgMood.toFixed(1)} 分，主要情绪是 ${topEmotion || '未知'}。继续保持自我觉察！`,
        });
      } catch (err) {
        logger.error('发送周报失败:', { userId: user.id, error: err.message });
      }
    }

    logger.info('每周情绪报告完成', { totalUsers: activeUsers.length });
  } catch (err) {
    logger.error('每周情绪报告任务失败:', err);
  }
}

/**
 * 停止所有定时任务
 */
function stopScheduler() {
  jobs.forEach((job) => job.stop());
  jobs.length = 0;
  logger.info('已停止所有定时任务');
}

module.exports = {
  initScheduler,
  stopScheduler,
};
