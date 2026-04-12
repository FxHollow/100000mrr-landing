# 技术栈推荐

**项目**: 情绪管理应用 MVP  
**创建日期**: 2026-04-12  
**设计者**: 后端工程师

---

## 1. 推荐技术栈总览

```
┌─────────────────────────────────────────────────────────┐
│                      前端层                              │
│  React Native (iOS/Android) 或 微信小程序                │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                      网关层                              │
│  Nginx (反向代理 + SSL + 限流)                          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    应用服务层                            │
│  Node.js 20 + Express.js                                │
│  ├── 认证服务 (JWT + bcrypt)                            │
│  ├── 业务逻辑服务                                        │
│  └── AI 集成服务 (Claude API)                           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                     数据层                               │
│  PostgreSQL 15 (主数据) + Redis 7 (缓存)                │
│  └── Prisma ORM                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   基础设施层                             │
│  阿里云 ECS + RDS + OSS + CDN                           │
└─────────────────────────────────────────────────────────┘
```

---

## 2. 详细技术选型

### 2.1 后端运行时

**推荐**: Node.js 20 LTS

**理由**:
- 团队已有技术积累（现有 B2C 后端基于 Node.js）
- 生态丰富，NPM 包齐全
- 异步 I/O 适合高并发场景
- 与前端代码复用（TypeScript）

**版本要求**: `>=20.0.0`

**替代方案**: Python 3.11 + FastAPI
- 优点：AI/ML 生态好
- 缺点：团队需要学习成本

---

### 2.2 Web 框架

**推荐**: Express.js 4.x

**理由**:
- 现有项目已使用
- 中间件生态完善
- 学习成本低

**核心中间件**:
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const app = express();
app.use(helmet());           // 安全头
app.use(cors());             // CORS
app.use(compression());      // Gzip 压缩
app.use(rateLimit({...}));   // 限流
```

**替代方案**: Fastify
- 优点：性能更好（快 2-3 倍）
- 缺点：生态相对较小

---

### 2.3 数据库

**推荐**: PostgreSQL 15+

**理由**:
- 支持复杂查询
- JSONB 字段支持（适合存储 AI 分析结果）
- 扩展性强（GIS、全文检索）
- 现有团队熟悉

**核心扩展**:
```sql
-- 启用常用扩展
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- 模糊查询
CREATE EXTENSION IF NOT EXISTS "btree_gin"; -- GIN 索引
```

**连接池**: 使用 Prisma 内置连接池
- 开发环境：5-10 连接
- 生产环境：20-50 连接（根据 ECS 规格调整）

---

### 2.4 ORM

**推荐**: Prisma 5.x

**理由**:
- 类型安全（自动生成 TypeScript 类型）
- 迁移管理友好
- 开发体验好

**使用示例**:
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 创建情绪日记
const entry = await prisma.moodEntry.create({
  data: {
    userId: 'uuid',
    moodScore: 7,
    emotions: ['HAPPY', 'GRATEFUL'],
    entryTime: new Date()
  }
});

// 查询用户近 7 天情绪
const entries = await prisma.moodEntry.findMany({
  where: {
    userId: 'uuid',
    entryTime: {
      gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
  },
  orderBy: { entryTime: 'desc' }
});
```

---

### 2.5 缓存

**推荐**: Redis 7+

**使用场景**:
1. Session 存储（JWT blacklist）
2. 热点数据缓存（用户统计）
3. 分布式锁
4. 消息队列（简单场景）

**集成方式**:
```javascript
const Redis = require('ioredis');
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASSWORD
});

// 缓存用户统计数据（5 分钟）
async function getUserStats(userId) {
  const cacheKey = `stats:${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const stats = await calculateStats(userId);
  await redis.setex(cacheKey, 300, JSON.stringify(stats));
  return stats;
}
```

---

### 2.6 认证/授权

**推荐**: JWT + bcrypt

**token 策略**:
- Access Token: 15 分钟有效期
- Refresh Token: 7 天有效期
- 存储：客户端存储（LocalStorage/Keychain）

**集成库**:
```bash
npm install jsonwebtoken bcryptjs
```

**实现示例**:
```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 密码哈希
const hashedPassword = await bcrypt.hash(password, 12);

// 生成 token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

// 验证 token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

---

### 2.7 验证

**推荐**: Zod

**理由**:
- TypeScript 友好
- 运行时验证
- 错误信息清晰

**使用示例**:
```typescript
import { z } from 'zod';

const CreateMoodEntrySchema = z.object({
  moodScore: z.number().min(1).max(10),
  emotions: z.array(z.enum(['HAPPY', 'SAD', 'ANGRY', 'ANXIOUS'])),
  trigger: z.string().optional(),
  intensity: z.number().min(1).max(5).default(3),
  entryTime: z.string().transform(s => new Date(s))
});

// 在路由中使用
app.post('/mood/entries', async (req, res) => {
  const validated = CreateMoodEntrySchema.parse(req.body);
  // ...处理业务
});
```

---

### 2.8 AI 集成

**推荐**: @anthropic-ai/sdk

**集成示例**:
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function analyzeMood(entries: MoodEntry[]) {
  const prompt = `
分析以下用户情绪数据，输出 JSON 格式：
{
  "trend": "improving|stable|declining",
  "insights": string[],
  "riskLevel": "LOW|MEDIUM|HIGH",
  "recommendations": string[]
}

数据：${JSON.stringify(entries)}
`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }]
  });

  return JSON.parse(response.content[0].text);
}
```

---

### 2.9 日志

**推荐**: Winston

**配置示例**:
```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

// 使用
logger.info('用户登录', { userId: '123', ip: req.ip });
logger.error('数据库错误', { error: err.message });
```

---

### 2.10 测试

**推荐**: Jest + Supertest

**配置**:
```bash
npm install --save-dev jest supertest @types/jest
```

**测试示例**:
```typescript
import request from 'supertest';
import app from '../src/app';

describe('POST /api/v1/mood/entries', () => {
  it('应该成功创建情绪日记', async () => {
    const token = generateTestToken();
    const response = await request(app)
      .post('/api/v1/mood/entries')
      .set('Authorization', `Bearer ${token}`)
      .send({
        moodScore: 7,
        emotions: ['HAPPY'],
        entryTime: new Date().toISOString()
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
```

---

## 3. 项目结构

```
backend/
├── src/
│   ├── index.js              # 入口文件
│   ├── config/
│   │   ├── database.js       # 数据库配置
│   │   ├── redis.js          # Redis 配置
│   │   └── ai.js             # AI 服务配置
│   ├── middleware/
│   │   ├── auth.js           # JWT 认证中间件
│   │   ├── error.js          # 错误处理中间件
│   │   └── validate.js       # Zod 验证中间件
│   ├── routes/
│   │   ├── auth.js           # 认证路由
│   │   ├── users.js          # 用户路由
│   │   ├── mood.js           # 情绪日记路由
│   │   ├── events.js         # 关系事件路由
│   │   ├── ai.js             # AI 分析路由
│   │   └── notifications.js  # 通知路由
│   ├── services/
│   │   ├── authService.js    # 认证服务
│   │   ├── moodService.js    # 情绪日记服务
│   │   ├── eventService.js   # 关系事件服务
│   │   └── aiService.js      # AI 分析服务
│   ├── models/               # Prisma models (自动生成)
│   ├── utils/
│   │   ├── logger.js         # 日志工具
│   │   ├── jwt.js            # JWT 工具
│   │   └── helpers.js        # 辅助函数
│   └── schemas/
│       ├── auth.js           # 认证相关 schema
│       ├── mood.js           # 情绪相关 schema
│       └── event.js          # 事件相关 schema
├── prisma/
│   ├── schema.prisma         # 数据库 schema
│   ├── migrations/           # 迁移文件
│   └── seed.js               # 种子数据
├── tests/
│   ├── auth.test.js
│   ├── mood.test.js
│   └── event.test.js
├── logs/
├── package.json
└── README.md
```

---

## 4. 环境变量

```bash
# 服务器
NODE_ENV=production
PORT=3000

# 数据库
DATABASE_URL=postgresql://user:pass@localhost:5432/mood_app

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key_at_least_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# AI 服务
ANTHROPIC_API_KEY=sk-ant-...

# 微信
WECHAT_APPID=wx...
WECHAT_MCHID=1234567890
WECHAT_KEY=your_wechat_key

# 日志
LOG_LEVEL=info

# 阿里云（短信）
ALIYUN_ACCESS_KEY=your_access_key
ALIYUN_SECRET=your_secret
```

---

## 5. 开发工作流

### 5.1 本地开发

```bash
# 1. 克隆项目
git clone <repo>
cd backend

# 2. 安装依赖
npm install

# 3. 配置环境
cp .env.example .env
# 编辑 .env 配置数据库等

# 4. 启动 PostgreSQL（Docker）
docker run -d \
  --name mood-app-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mood_app \
  -p 5432:5432 \
  postgres:15

# 5. 运行迁移
npm run db:migrate

# 6. 启动开发服务器
npm run dev

# 7. 访问健康检查
curl http://localhost:3000/health
```

### 5.2 部署流程

```bash
# 1. 构建
npm run build  # 如有 TypeScript

# 2. 运行迁移
npm run db:migrate:prod

# 3. 启动生产服务
npm run start
```

### 5.3 Git 工作流

```
main (保护分支)
  ↑
staging (预发布)
  ↑
feature/* (功能分支)
```

1. 功能开发在 `feature/*` 分支
2. 完成后提 PR 到 `staging`
3. 测试通过后合并到 `main`
4. `main` 分支自动部署生产

---

## 6. 性能优化建议

### 6.1 数据库

```sql
-- 常用索引
CREATE INDEX idx_mood_entry_user_time ON "MoodEntry" ("userId", "entryTime");
CREATE INDEX idx_event_user_time ON "RelationshipEvent" ("userId", "eventTime");
CREATE INDEX idx_notification_user_read ON "Notification" ("userId", "isRead");

-- 分区表（数据量大时）
-- 按月分区存储情绪日记
```

### 6.2 缓存策略

| 数据类型 | 缓存策略 | TTL |
|----------|----------|-----|
| 用户信息 | LRU 缓存 | 5 分钟 |
| 情绪统计 | 预计算 + 缓存 | 1 小时 |
| AI 分析结果 | 预计算 + 缓存 | 24 小时 |
| Session | Redis | 7 天 |

### 6.3 API 限流

```javascript
// 通用限流
app.use('/api/v1', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100 // 100 请求
}));

// 认证接口更严格限流
app.use('/api/v1/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10
}));
```

---

## 7. 安全建议

### 7.1 输入验证
- 所有用户输入使用 Zod 验证
- SQL 注入防护（Prisma 参数化）
- XSS 防护（输出编码）

### 7.2 认证安全
- 密码强度要求（最少 8 位，含大小写数字）
- 失败登录限流
- Token 轮转机制

### 7.3 数据安全
- 敏感字段加密存储
- HTTPS 强制
- 定期备份

### 7.4 审计日志
```typescript
// 记录敏感操作
logger.info('用户数据导出', {
  userId: user.id,
  action: 'EXPORT_DATA',
  timestamp: new Date(),
  ip: req.ip
});
```

---

## 8. 依赖清单 (package.json)

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "express-rate-limit": "^7.1.5",
    "@prisma/client": "^5.7.0",
    "ioredis": "^5.3.2",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "zod": "^3.22.4",
    "winston": "^3.11.0",
    "@anthropic-ai/sdk": "^0.27.0",
    "dotenv": "^16.3.1",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "prisma": "^5.7.0",
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "@types/node": "^20.10.0",
    "@types/jest": "^29.5.11",
    "eslint": "^8.55.0"
  }
}
```

---

## 9. 总结

### MVP 阶段优先级

| 优先级 | 技术组件 | 说明 |
|--------|----------|------|
| P0 | Node.js + Express + Prisma | 核心框架 |
| P0 | PostgreSQL | 数据库 |
| P0 | JWT + bcrypt | 认证系统 |
| P1 | Redis | 缓存 |
| P1 | Claude API | AI 分析 |
| P1 | Winston | 日志 |
| P2 | Jest + Supertest | 测试 |
| P2 | Sentry | 错误监控 |

### 技术债务管理

1. **先实现再优化**：MVP 阶段快速验证
2. **定期重构**：每迭代一次回顾技术债务
3. **监控驱动**：根据监控数据做性能优化

---

*创建日期：2026-04-12*
*后端工程师 - 100000MRR*
