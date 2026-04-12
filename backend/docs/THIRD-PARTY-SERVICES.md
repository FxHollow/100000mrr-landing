# 第三方服务选型建议

**项目**: 情绪管理应用 MVP  
**创建日期**: 2026-04-12  
**设计者**: 后端工程师

---

## 1. AI/LLM 服务

### 推荐方案：Claude API (Anthropic)

**理由**:
- 优秀的中文理解能力
- 强大的情感分析能力
- 较长上下文窗口（适合分析用户历史数据）
- 合理的定价

**集成方式**:
```javascript
const anthropic = require('@anthropic-ai/sdk');

const client = new anthropic.Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// 情绪分析 prompt 示例
const prompt = `
分析以下用户情绪日记，识别：
1. 主要情绪状态
2. 潜在触发因素
3. 建议的干预措施

日记内容：${moodEntry}
`;
```

**成本估算**:
- 输入：$3/1M tokens
- 输出：$15/1M tokens
- MVP 阶段预计：¥2000-5000/月

### 备选方案

| 服务商 | 优点 | 缺点 | 推荐度 |
|--------|------|------|--------|
| Claude (Anthropic) | 情感分析强，中文好 | 需境外支付 | ⭐⭐⭐⭐⭐ |
| 文心一言 (百度) | 国内部署，合规 | 情感分析一般 | ⭐⭐⭐⭐ |
| 通义千问 (阿里) | 国内部署，API 友好 | 专业度稍逊 | ⭐⭐⭐⭐ |
| GPT-4 (OpenAI) | 综合能力强 | 需境外支付，敏感 | ⭐⭐⭐ |

---

## 2. 推送通知服务

### 方案 A：微信模板消息（推荐）

**适用场景**: 国内用户，已有微信公众号/服务号

**优点**:
- 用户覆盖率高
- 打开率高
- 免费

**缺点**:
- 需要公众号资质
- 模板需审核

**集成方式**:
```javascript
// 微信公众号 API
const accessToken = await getAccessToken();
await fetch(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`, {
  method: 'POST',
  body: JSON.stringify({
    touser: user.openid,
    template_id: 'templateId',
    data: {
      title: { value: '今天的情绪如何？' },
      reminder: { value: '花一分钟记录一下吧~' }
    }
  })
});
```

### 方案 B：短信服务

**推荐服务商**: 阿里云短信 / 腾讯云短信

**成本**:
- 阿里云：约 ¥0.045/条
- 月活 1000 用户，日均推送：¥1500/月

**集成方式**:
```javascript
const OSS = require('aliyun-sdk');
const sms = new OSS.SMS({
  accessKeyId: process.env.ALIYUN_ACCESS_KEY,
  secretAccessKey: process.env.ALIYUN_SECRET,
  smsVersion: '2015-05-28'
});

await sms.sendSms({
  PhoneNumbers: user.phone,
  SignName: '情绪小助手',
  TemplateCode: 'SMS_123456789',
  TemplateParam: JSON.stringify({ mood: '今天心情如何？' })
}).promise();
```

### 方案 C：极光推送 / 个推

**适用场景**: 有独立 App

**优点**:
- 支持 iOS/Android
- 免费额度充足

**推荐**: 极光推送 (JPush)
- 免费额度：100 万设备
- 到达率：95%+

---

## 3. 数据统计/埋点

### 方案 A：百度统计（推荐 MVP 阶段）

**优点**:
- 免费
- 国内访问快
- 功能足够

**集成**:
```html
<!-- 网页端 -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?YOUR_SITE_ID";
  document.head.appendChild(hm);
})();
</script>
```

### 方案 B：神策数据 / GrowingIO

**适用场景**: 精细化运营阶段

**优点**:
- 用户行为分析强大
- 漏斗分析
- 用户分群

**成本**:
- 神策：¥10 万+/年（私有部署）
- 适合月活 1 万 + 阶段

### 方案 C：自建埋点（推荐中长期）

**技术栈**: 
- ClickHouse + Superset
- 成本低，数据可控

---

## 4. 云服务/部署

### 方案 A：阿里云（推荐）

**MVP 配置**:
| 资源 | 配置 | 月成本 |
|------|------|--------|
| ECS | 2 核 4G | ¥120 |
| RDS PostgreSQL | 2 核 4G 100GB | ¥280 |
| Redis | 主从版 2GB | ¥60 |
| OSS | 100GB 存储 | ¥20 |
| CDN | 100GB 流量 | ¥15 |
| **合计** | | **¥495/月** |

**优点**:
- 国内访问快
- 合规性好
- 生态完整

### 方案 B：腾讯云

**对比**: 与阿里云价格接近，游戏/社交场景有优势

### 方案 C：Vercel + Supabase（快速原型）

**适用**: 快速验证阶段

**成本**:
- Vercel: 免费 → $20/月
- Supabase: 免费 → $25/月

**优点**:
- 部署极简
- 自带数据库和 Auth

**缺点**:
- 国内访问慢
- 不适合生产

---

## 5. 支付集成

### 微信支付（必选）

**接入方式**:
1. 注册微信支付商户（需营业执照）
2. 接入 Native 支付 / JSAPI 支付
3. 费率：0.6%

**集成库**:
```bash
npm install tenpay
```

```javascript
const tenpay = require('tenpay');
const config = {
  appid: process.env.WECHAT_APPID,
  mchid: process.env.WECHAT_MCHID,
  key: process.env.WECHAT_KEY
};
const api = tenpay(config);

// 创建订单
const order = await api.getPayParams({
  out_trade_no: orderNumber,
  total_fee: amount, // 分
  spbill_create_ip: req.ip,
  notify_url: 'https://api.xxx.com/webhook/wechat'
});
```

### 支付宝（必选）

**接入方式**:
1. 注册支付宝商户
2. 接入电脑网站支付 / 手机网站支付
3. 费率：0.6%

**集成库**:
```bash
npm install alipay-sdk
```

---

## 6. 监控/告警

### 方案 A：Sentry（推荐）

**适用**: 错误追踪

**成本**:
- 免费：5 万错误/月
- Team: $26/月

**集成**:
```bash
npm install @sentry/node
```

```javascript
const Sentry = require('@sentry/node');
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1
});
```

### 方案 B：Prometheus + Grafana（自建）

**适用**: 完整监控体系

**成本**: 
- 服务器：¥100/月
- 运维成本：中

---

## 7. 日志服务

### 方案 A：Winston + 文件（MVP 推荐）

```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});
```

**成本**: 免费

### 方案 B：ELK Stack（生产推荐）

**组件**:
- Elasticsearch: 存储
- Logstash: 收集
- Kibana: 可视化

**成本**: 
- 自建：¥200/月（服务器）
- 云：¥500+/月

---

## 8. 成本汇总

### MVP 阶段（0-1000 用户）

| 服务 | 月成本 (¥) | 优先级 |
|------|------------|--------|
| 阿里云 ECS | 120 | 必选 |
| 阿里云 RDS | 280 | 必选 |
| 阿里云 Redis | 60 | 可选 |
| Claude API | 3000 | 必选 |
| 微信/支付宝 | 按交易量 | 必选 |
| 短信推送 | 500 | 可选 |
| Sentry | 0 | 必选 |
| **合计（不含支付）** | **¥4,000/月** | |

### 增长阶段（1000-10000 用户）

| 服务 | 月成本 (¥) | 说明 |
|------|------------|------|
| 云服务器（升级） | 500 | 4 核 8G |
| 数据库（升级） | 600 | 4 核 8G 500GB |
| Redis | 150 | 4GB |
| Claude API | 15000 | 用量增加 |
| 短信推送 | 3000 | 活跃用户增加 |
| ELK 日志 | 500 | 生产监控 |
| **合计** | **¥20,000/月** | |

---

## 9. 推荐技术栈总结

### 后端核心
- **运行时**: Node.js 20 LTS
- **框架**: Express.js
- **数据库**: PostgreSQL 15
- **ORM**: Prisma
- **缓存**: Redis 7

### AI 集成
- **首选**: Claude API (Anthropic)
- **备选**: 文心一言（国内合规）

### 推送
- **首选**: 微信模板消息
- **备选**: 阿里云短信

### 部署
- **首选**: 阿里云（ECS + RDS + OSS）
- **快速原型**: Vercel + Supabase

### 监控
- **错误**: Sentry
- **日志**: Winston → ELK
- **性能**: 阿里云监控

---

## 10. 合规事项

### 心理健康服务特殊要求

1. **数据安全**:
   - 等保 2.0 二级以上
   - 个人信息保护法合规
   - 用户数据加密存储

2. **资质要求**:
   - ICP 许可证
   - 心理咨询相关资质（与顾问合作）
   - 用户知情同意书

3. **内容审核**:
   - AI 生成内容审核机制
   - 危机干预预案
   - 专业服务边界声明
