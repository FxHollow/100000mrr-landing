# 情绪管理应用 API 接口文档

**版本**: v1.0.0  
**创建日期**: 2026-04-12  
**设计者**: 后端工程师

---

## API 概览

| 模块 | 基础路径 | 描述 |
|------|----------|------|
| 认证 | `/api/v1/auth` | 用户注册、登录、 token 管理 |
| 用户 | `/api/v1/users` | 用户信息、画像管理 |
| 情绪日记 | `/api/v1/mood` | 情绪记录 CRUD |
| 关系事件 | `/api/v1/events` | 关系事件记录 |
| AI 分析 | `/api/v1/ai` | AI 分析结果、预警 |
| 通知 | `/api/v1/notifications` | 推送通知管理 |
| 订阅 | `/api/v1/subscription` | 会员订阅管理 |

---

## 认证模块 (Auth)

### POST /api/v1/auth/register
用户注册

**请求体**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "张三",
  "phone": "+8613800138000"
}
```

**响应 (201)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "张三"
    },
    "token": "jwt_token_here"
  }
}
```

### POST /api/v1/auth/login
用户登录

**请求体**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**响应 (200)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "张三",
      "relationshipStatus": "DATING"
    },
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

### POST /api/v1/auth/refresh
刷新 token

**请求体**:
```json
{
  "refreshToken": "refresh_token_here"
}
```

### POST /api/v1/auth/logout
用户登出

**Headers**: `Authorization: Bearer <token>`

---

## 用户模块 (Users)

### GET /api/v1/users/me
获取当前用户信息

**Headers**: `Authorization: Bearer <token>`

**响应 (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "张三",
    "avatar": "https://...",
    "gender": "MALE",
    "age": 28,
    "relationshipStatus": "DATING",
    "subscription": {
      "plan": "PREMIUM",
      "status": "ACTIVE",
      "endDate": "2026-05-12T00:00:00Z"
    }
  }
}
```

### PATCH /api/v1/users/me
更新用户信息

**请求体**:
```json
{
  "name": "李四",
  "age": 29,
  "relationshipStatus": "ENGAGED"
}
```

### GET /api/v1/users/me/stats
获取用户统计摘要

**响应 (200)**:
```json
{
  "success": true,
  "data": {
    "totalMoodEntries": 45,
    "totalEvents": 12,
    "averageMoodScore": 6.5,
    "streakDays": 7,
    "lastEntryAt": "2026-04-11T20:00:00Z"
  }
}
```

---

## 情绪日记模块 (Mood)

### GET /api/v1/mood/entries
获取情绪日记列表

**查询参数**:
- `startDate`: 开始日期 (ISO 8601)
- `endDate`: 结束日期 (ISO 8601)
- `limit`: 每页数量 (default: 20)
- `cursor`: 游标分页

**响应 (200)**:
```json
{
  "success": true,
  "data": {
    "entries": [
      {
        "id": "uuid",
        "moodScore": 7,
        "emotions": ["HAPPY", "GRATEFUL"],
        "intensity": 3,
        "trigger": "今天完成了重要项目",
        "entryTime": "2026-04-11T20:00:00Z"
      }
    ],
    "nextCursor": "cursor_value"
  }
}
```

### POST /api/v1/mood/entries
创建情绪日记

**请求体**:
```json
{
  "moodScore": 7,
  "emotions": ["HAPPY", "CONFIDENT"],
  "trigger": "今天完成了重要项目",
  "physicalSensations": "感觉轻松",
  "thoughts": "努力是有回报的",
  "behaviors": "想要庆祝一下",
  "intensity": 4,
  "entryTime": "2026-04-11T20:00:00Z"
}
```

### GET /api/v1/mood/entries/:id
获取单条情绪日记

### PATCH /api/v1/mood/entries/:id
更新情绪日记

**请求体**:
```json
{
  "moodScore": 8,
  "thoughts": "更新后的想法"
}
```

### DELETE /api/v1/mood/entries/:id
删除情绪日记

### GET /api/v1/mood/trends
获取情绪趋势分析

**查询参数**:
- `period`: `week` | `month` | `year`

**响应 (200)**:
```json
{
  "success": true,
  "data": {
    "period": "week",
    "averageMood": 6.8,
    "trend": "improving",
    "dailyMoods": [
      {"date": "2026-04-05", "score": 6},
      {"date": "2026-04-06", "score": 7},
      {"date": "2026-04-07", "score": 5},
      {"date": "2026-04-08", "score": 8},
      {"date": "2026-04-09", "score": 7},
      {"date": "2026-04-10", "score": 6},
      {"date": "2026-04-11", "score": 8}
    ],
    "topEmotions": [
      {"emotion": "HAPPY", "count": 12},
      {"emotion": "ANXIOUS", "count": 8},
      {"emotion": "CALM", "count": 6}
    ]
  }
}
```

---

## 关系事件模块 (Events)

### GET /api/v1/events
获取关系事件列表

**查询参数**:
- `eventType`: 事件类型过滤
- `outcome`: 结果过滤
- `startDate`, `endDate`: 日期范围

### POST /api/v1/events
创建关系事件

**请求体**:
```json
{
  "eventType": "ARGUMENT",
  "targetPerson": "伴侣",
  "relationship": "PARTNER",
  "description": "因为家务分配问题发生了争执",
  "outcome": "UNRESOLVED",
  "severity": 4,
  "moodAtEvent": 3,
  "durationMinutes": 30,
  "eventTime": "2026-04-11T19:00:00Z"
}
```

### PATCH /api/v1/events/:id
更新关系事件

### DELETE /api/v1/events/:id
删除关系事件

### GET /api/v1/events/stats
获取关系事件统计

**响应 (200)**:
```json
{
  "success": true,
  "data": {
    "totalEvents": 24,
    "positiveEvents": 15,
    "negativeEvents": 9,
    "conflictResolutionRate": 0.67,
    "averageSeverity": 2.8
  }
}
```

---

## AI 分析模块 (AI)

### GET /api/v1/ai/analyses
获取 AI 分析历史

**查询参数**:
- `type`: 分析类型过滤
- `limit`: 默认 10

### POST /api/v1/ai/analyze
请求 AI 分析

**请求体**:
```json
{
  "analysisType": "MOOD_TREND",
  "data": {
    "moodEntries": [...],
    "events": [...]
  }
}
```

**响应 (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "analysisType": "MOOD_TREND",
    "result": {
      "trend": "stable_with_minor_fluctuations",
      "insights": ["周末情绪普遍较高", "工作日午后易焦虑"],
      "confidence": 0.85
    },
    "riskLevel": "LOW",
    "recommendations": [
      "尝试在工作日安排短暂休息",
      "周末保持当前活动模式"
    ]
  }
}
```

### GET /api/v1/ai/predictions
获取预测报告（冲突预警）

**响应 (200)**:
```json
{
  "success": true,
  "data": {
    "conflictRisk": {
      "level": "MEDIUM",
      "probability": 0.65,
      "factors": [
        "连续 3 天情绪下降",
        "过去 48 小时有未解决的争吵",
        "沟通频率降低 40%"
      ],
      "suggestions": [
        "主动安排一次轻松的活动",
        "表达关心，避免指责性语言",
        "练习积极倾听技巧"
      ]
    }
  }
}
```

---

## 通知模块 (Notifications)

### GET /api/v1/notifications
获取通知列表

**响应 (200)**:
```json
{
  "success": true,
  "data": {
    "unreadCount": 3,
    "notifications": [
      {
        "id": "uuid",
        "type": "MOOD_CHECK_IN",
        "title": "今天的情绪如何？",
        "message": "花一分钟记录一下此刻的感受吧",
        "isRead": false,
        "createdAt": "2026-04-12T09:00:00Z"
      }
    ]
  }
}
```

### PATCH /api/v1/notifications/:id/read
标记通知为已读

### DELETE /api/v1/notifications/:id
删除通知

---

## 订阅模块 (Subscription)

### GET /api/v1/subscription
获取订阅信息

### POST /api/v1/subscription/upgrade
升级订阅计划

**请求体**:
```json
{
  "plan": "PREMIUM",
  "paymentMethod": "WECHAT_PAY"
}
```

### POST /api/v1/subscription/cancel
取消订阅

### GET /api/v1/subscription/plans
获取订阅方案

**响应 (200)**:
```json
{
  "success": true,
  "data": {
    "plans": [
      {
        "id": "free",
        "name": "免费版",
        "price": 0,
        "features": [
          "每日情绪记录",
          "基础统计分析",
          "7 天历史记录"
        ]
      },
      {
        "id": "premium",
        "name": "高级版",
        "price": 99,
        "currency": "CNY",
        "billing": "monthly",
        "features": [
          "无限历史记录",
          "AI 情绪分析",
          "关系事件预测",
          "个性化干预建议",
          "导出报告"
        ]
      }
    ]
  }
}
```

---

## 错误响应格式

**4xx 错误**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求验证失败",
    "details": [
      {"field": "email", "message": "邮箱格式不正确"}
    ]
  }
}
```

**5xx 错误**:
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "服务器内部错误"
  }
}
```

---

## 常见错误码

| 错误码 | HTTP 状态码 | 描述 |
|--------|------------|------|
| `VALIDATION_ERROR` | 400 | 请求参数验证失败 |
| `UNAUTHORIZED` | 401 | 未认证或 token 过期 |
| `FORBIDDEN` | 403 | 无权限访问 |
| `NOT_FOUND` | 404 | 资源不存在 |
| `CONFLICT` | 409 | 资源冲突 |
| `RATE_LIMIT_EXCEEDED` | 429 | 请求频率超限 |
| `INTERNAL_ERROR` | 500 | 服务器内部错误 |

---

## 安全考虑

1. **认证**: 所有用户相关接口需要 JWT token
2. **速率限制**: 
   - 通用接口：100 请求/15 分钟
   - 认证接口：10 请求/15 分钟
3. **数据加密**: 
   - 密码 bcrypt 哈希
   - 敏感字段 AES 加密存储
4. **审计日志**: 记录敏感操作

---

## 数据隐私保护

1. **心理健康数据特殊保护**
   - 加密存储所有情绪日记和关系事件
   - 访问日志审计
   - 支持用户数据导出和删除

2. **合规要求**
   - 遵循《个人信息保护法》
   - 用户同意书
   - 数据最小化原则
