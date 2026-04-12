// Redis 客户端配置

const Redis = require('ioredis');

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => {
    if (times > 3) {
      console.warn('[Redis] 连接重试失败，使用内存降级方案');
      return null;
    }
    return Math.min(times * 50, 2000);
  },
};

const redis = new Redis(redisConfig);

redis.on('connect', () => {
  console.log('[Redis] 连接成功');
});

redis.on('error', (err) => {
  console.error('[Redis] 连接错误:', err.message);
});

// 优雅关闭
process.on('beforeExit', () => {
  redis.quit();
});

module.exports = { redis };
