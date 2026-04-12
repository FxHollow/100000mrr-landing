# 情绪管理应用后端 API

**版本**: 0.1.0  
**创建日期**: 2026-04-12  
**设计者**: 后端工程师 - 100000MRR

---

## 快速开始

### 前置条件

- Node.js 20+
- PostgreSQL 15+
- Redis 7+ (可选，用于缓存)

### 开发环境设置

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置环境变量**
   ```bash
   cp .env.example .env
   # 编辑 .env 配置数据库等
   ```

3. **启动 PostgreSQL (Docker)**
   ```bash
   docker run -d \
     --name mood-app-db \
     -e POSTGRES_PASSWORD=postgres \
     -e POSTGRES_DB=mood_app \
     -p 5432:5432 \
     postgres:15
   ```

4. **生成 Prisma 客户端**
   ```bash
   npm run db:generate
   ```

5. **运行数据库迁移**
   ```bash
   npm run db:migrate
   ```

6. **启动开发服务器**
   ```bash
   npm run dev
   ```

7. **验证健康状态**
   ```bash
   curl http://localhost:3001/health
   ```

---

## 项目结构

```
mood-backend/
├── src/
│   ├── index.js              # 入口文件
│   ├── config/
│   │   ├── database.js       # Prisma 客户端
│   │   ├── redis.js          # Redis 客户端
│   │   └── ai.js             # AI 服务配置
│   ├── middleware/
│   │   ├── auth.js           # JWT 认证
│   │   ├── error.js          # 错误处理
│   │   └── validate.js       # Zod 验证
│   ├── routes/
│   │   ├── auth.js           # 认证路由
│   │   ├── mood.js           # 情绪日记路由
│   │   └── events.js         # 关系事件路由
│   ├── services/
│   │   ├── authService.js    # 认证服务
│   │   ├── moodService.js    # 情绪日记服务
│   │   └── eventService.js   # 关系事件服务
│   ├── schemas/
│   │   ├── auth.js           # 认证验证
│   │   ├── mood.js           # 情绪验证
│   │   └── events.js         # 事件验证
│   └── utils/
│       └── logger.js         # 日志工具
├── prisma/
│   ├── schema.prisma         # 数据库 schema
│   └── seed.js               # 种子数据
├── tests/
├── logs/
├── package.json
└── README.md
```

---

## API 接口

### 认证模块 (`/api/v1/auth`)

| 方法 | 端点 | 描述 | 认证 |
|------|------|------|------|
| POST | `/register` | 用户注册 | - |
| POST | `/login` | 用户登录 | - |
| POST | `/refresh` | 刷新 token | - |
| POST | `/logout` | 用户登出 | ✅ |
| GET | `/me` | 获取用户信息 | ✅ |
| PATCH | `/me` | 更新用户信息 | ✅ |

### 情绪日记模块 (`/api/v1/mood`)

| 方法 | 端点 | 描述 | 认证 |
|------|------|------|------|
| GET | `/entries` | 获取列表 | ✅ |
| POST | `/entries` | 创建日记 | ✅ |
| GET | `/entries/:id` | 获取详情 | ✅ |
| PATCH | `/entries/:id` | 更新日记 | ✅ |
| DELETE | `/entries/:id` | 删除日记 | ✅ |
| GET | `/trends` | 情绪趋势 | ✅ |
| GET | `/stats` | 用户统计 | ✅ |

### 关系事件模块 (`/api/v1/events`)

| 方法 | 端点 | 描述 | 认证 |
|------|------|------|------|
| GET | `/` | 获取列表 | ✅ |
| POST | `/` | 创建事件 | ✅ |
| GET | `/:id` | 获取详情 | ✅ |
| PATCH | `/:id` | 更新事件 | ✅ |
| DELETE | `/:id` | 删除事件 | ✅ |
| GET | `/stats` | 事件统计 | ✅ |

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 运行时 | Node.js 20 LTS |
| 框架 | Express.js |
| 数据库 | PostgreSQL 15 |
| ORM | Prisma |
| 缓存 | Redis |
| 认证 | JWT + bcrypt |
| 验证 | Zod |
| 日志 | Winston |
| AI | Claude API |

---

## 环境变量

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `NODE_ENV` | 运行环境 | `development` |
| `PORT` | 服务端口 | `3001` |
| `DATABASE_URL` | PostgreSQL 连接串 | - |
| `REDIS_HOST` | Redis 主机 | `localhost` |
| `JWT_SECRET` | JWT 密钥 | - |
| `ANTHROPIC_API_KEY` | Claude API 密钥 | - |

---

## 开发命令

| 命令 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run start` | 启动生产服务器 |
| `npm run test` | 运行测试 |
| `npm run lint` | 运行 ESLint |
| `npm run db:generate` | 生成 Prisma 客户端 |
| `npm run db:migrate` | 运行迁移 |
| `npm run db:studio` | 打开 Prisma Studio |

---

*创建日期：2026-04-12*
