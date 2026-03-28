# CMO Marketing Playbook - 100000MRR

## 营销实战手册

**版本**: 1.0
**创建**: 2026-03-26
**状态**: ✅ Week 2 Ready to Execute

---

## 快速导航

| 章节 | 用途 | 文件路径 |
|------|------|----------|
| 1. Landing Page | 客户落地页 | `landing-page/` |
| 2. 内容库 | 4 篇文章 + 多平台版本 | `content-articles/` |
| 3. 外联工具 | 消息模板 + prospects | `outreach/` |
| 4. 销售流程 | Discovery call + Proposal | `marketing-assets/` |
| 5. 执行指南 | Week 2 每日计划 | `week-2-*` |

---

## 1. Landing Page

### 文件清单
- `index.html` - 主页面 (含百度统计)
- `deploy.sh` - 自动部署脚本
- `DEPLOYMENT.md` - 完整部署指南
- `QUICK-DEPLOY.md` - 3 分钟快速部署
- `README-DEPLOY.md` - 分步骤指南

### 部署方式

**GitHub Pages (推荐)**
```bash
cd landing-page
git remote add origin git@github.com:USERNAME/100000mrr-landing.git
git push -u origin main
```

**Vercel (最快)**
```bash
cd landing-page
vercel --prod
```

**Netlify (最简单)**
- 访问 app.netlify.com/drop
- 拖拽 landing-page 文件夹

### 待配置
- [ ] 替换 `YOUR_BAIDU_ID` 为实际统计 ID
- [ ] 替换微信联系方式
- [ ] 测试所有链接

---

## 2. 内容库

### 4 篇核心文章

| # | 标题 | 字数 | 状态 |
|---|------|------|------|
| 1 | 5 个 AI 集成实战案例 | ~3,500 | ✅ 完成 |
| 2 | LLM 选型指南 | ~5,000 | ✅ 完成 |
| 3 | AI 客服案例复盘 | ~5,000 | ✅ 完成 |
| 4 | AI 实施检查清单 | ~4,000 | ✅ 完成 |

### 平台适配版本

| 平台 | 文章 1 | 文章 2 | 文章 3 | 文章 4 |
|------|--------|--------|--------|--------|
| 知乎 | ✅ | 🟡 | 🟡 | 🟡 |
| 掘金 | ✅ | 🟡 | - | - |
| 公众号 | ✅ | ✅ | ✅ | ✅ |
| 小红书 | ✅ | ✅ | ✅ | - |

**文件位置**:
- 全文：`content-articles/article-*.md`
- 知乎/掘金：`content-articles/platforms/`
- 微信格式：`content-articles/wechat/`

### 发布检查清单
- [ ] 选择标题 (A/B 测试)
- [ ] 添加 5-8 个标签
- [ ] 上传封面图
- [ ] 发布后 2 小时内回复评论

---

## 3. 外联工具

### Prospects 名单 (20 个)

**分类**:
| 类别 | 数量 | 优先级 |
|------|------|--------|
| Warm Network | 5 | High |
| WeChat Groups | 5 | Medium |
| Content Leads | 5 | Medium |
| Referrals | 3 | High |
| Cold Outreach | 2 | Low |

**文件**: `outreach/prospects-list.md`

### 消息模板 (15+)

**分类**:
| 类型 | 模板 | 用途 |
|------|------|------|
| Warm Outreach | W1-W3 | 前同事/老客户/活动认识 |
| WeChat Group | G1-G3 | 群内首次接触/回复问题 |
| Follow-Up | F1-F3 | 首次/二次/温和收尾 |
| Call Booking | B1-B3 | 邀请/确认/会后跟进 |
| Proposal | P1-P2 | 发送方案/跟进 |
| Referral | R1-R2 | 请求转介绍 |
| Cold | C1 | 冷启动 |

**文件**: `outreach/outreach-message-bank.md`

### 发送时机

| 消息类型 | 最佳时间 |
|----------|----------|
| Warm outreach | 周二 - 周四 10-11 点 |
| 群内分享 | 周二/四 晚上 8-9 点 |
| Follow-up | 发送后 2-3 天 |

---

## 4. 销售流程

### Discovery Call (30 分钟)

**流程**:
```
0-2 min   开场白 + 设定预期
2-12 min  了解现状 (5 个核心问题)
12-22 min 方案介绍 + 案例展示
22-28 min 下一步建议
28-30 min 确认 + 感谢
```

**关键问题**:
1. 贵公司的主要业务是什么？
2. 当前最大的运营挑战是什么？
3. 现在用什么工具/流程处理？
4. 之前试过 AI 方案吗？效果如何？
5. 预算和决策流程是怎样的？

**文件**: `marketing-assets/discovery-call-script.md`

### Proposal 方案书

**结构**:
1. 执行摘要
2. 项目背景
3. 解决方案
4. 实施计划 (4 周)
5. 投资预算
6. 预期收益 + ROI
7. 关于我们
8. 下一步

**定价参考**:
| 类型 | 周期 | 价格 |
|------|------|------|
| 客服自动化 | 4 周 | ¥30-50k |
| 文档生成 | 3 周 | ¥20-35k |
| 数据分析 | 6 周 | ¥50-80k |
| 定制集成 | 6-8 周 | ¥80-150k |

**文件**: `marketing-assets/proposal-template.md`

---

## 5. CRM 系统

### 设置方式

**Notion (推荐)**
- 创建 Database
- 添加 17 个字段
- 创建 4 个 Views

**Google Sheets**
- 导入 CSV 模板
- 设置条件格式
- 创建公式

**字段**:
| 字段 | 类型 | 说明 |
|------|------|------|
| ID | Text | L001, L002... |
| Name | Text | 联系人 |
| Company | Text | 公司 |
| Source | Select | 来源渠道 |
| ICP Fit | Select | High/Med/Low |
| Status | Select | Pipeline 阶段 |
| Value Score | Formula | 自动优先级 |

**文件**: `marketing-assets/crm-notion-setup.md`

### Pipeline 阶段

```
New → Contacted → Responded → Call Booked → Call Done → Proposal → Won/Lost
```

---

## 6. Week 2 执行计划

### Day-by-Day

| 日期 | 主题 | 关键动作 | 成功标准 |
|------|------|----------|----------|
| 4/1 | Launch | 部署 LP, 发布知乎 + 掘金 | 内容上线 |
| 4/2 | Community | 加入 5 个群，小红书 #1 | 社群存在 |
| 4/3 | Outreach | 发送 5 条 warm outreach | 5 条发送 |
| 4/4 | Outreach | 发送第二批 5 条 | 10 条完成 |
| 4/5 | Calls | 进行 discovery calls | 1-2 电话 |
| 4/6 | Light | 数据分析 | 周报完成 |
| 4/7 | Review | 周度回顾 + 计划 | Week 3 计划 |

### 核心指标

| Metric | 目标 |
|--------|------|
| Landing page 访客 | 100 |
| 文章总阅读量 | 500 |
| Outreach 发送 | 20 |
| 回复数 | 5 (25%) |
| 电话安排 | 2-3 |
| 电话完成 | 2 |
| Proposals 发送 | 1 |
| 新 Leads | 10 |

**文件**: `week-2-daily-execution-guide.md`

---

## 7. 周报模板

### 快速填报 (5 分钟版)

1. **核心数字** (1 分钟)
   - Outreach 发送：[数字]
   - 回复：[数字]
   - 电话：[数字]

2. **最大亮点** (1 分钟)
   - [本周最大成果]

3. **最大挑战** (1 分钟)
   - [最大困难]

4. **需要 CEO 做什么** (1 分钟)
   - [具体请求]

5. **下周目标** (1 分钟)
   - [1-2 个目标]

**文件**: `marketing-assets/weekly-ceo-report-week2-template.md`

---

## 完整文件清单 (34 个)

### Landing Page (5)
- [x] index.html
- [x] deploy.sh
- [x] DEPLOYMENT.md
- [x] QUICK-DEPLOY.md
- [x] README-DEPLOY.md

### Sales Assets (10)
- [x] service-one-pager.md
- [x] roi-calculator-template.md
- [x] analytics-framework.md
- [x] simple-crm-template.md
- [x] crm-lead-tracker.csv
- [x] crm-notion-setup.md
- [x] weekly-ceo-report-template.md
- [x] weekly-ceo-report-week2-template.md
- [x] discovery-call-script.md
- [x] proposal-template.md

### Content Articles (10)
- [x] article-1-ai-integration-wins.md
- [x] article-2-llm-selection-guide.md
- [x] article-3-case-study.md
- [x] article-4-implementation-checklist.md
- [x] wechat/article-1-wechat-format.md
- [x] wechat/article-2-wechat-format.md
- [x] wechat/article-3-wechat-format.md
- [x] platforms/zhihu-article-1.md
- [x] platforms/juejin-article-1.md
- [x] content-distribution-checklist.md

### Outreach (5)
- [x] wechat-groups-research.md
- [x] prospects-list.md
- [x] message-templates.md
- [x] social-media-snippets.md
- [x] outreach-message-bank.md

### Planning (4)
- [x] week-2-execution-checklist.md
- [x] week-2-daily-execution-guide.md
- [x] week-2-kickoff.md
- [x] daily-notes/*

---

## 快速启动指南

### Day 1 启动序列

```
09:00 - 部署 Landing Page (3 分钟)
        cd landing-page && vercel --prod

09:30 - 发布知乎文章 1
        访问 zhihu.com → 写文章 → 粘贴 zhihu-article-1.md

10:30 - 发布掘金文章 1
        访问 juejin.cn → 创作中心 → 粘贴 juejin-article-1.md

14:00 - 加入 2-3 个微信群
        搜索：电商老板群、AI 应用交流群

20:00 - 检查首日数据 + 回复评论
        知乎后台、掘金后台
```

### 需要 CEO/CTO 支持

| 需求 | Owner | 紧急度 |
|------|-------|--------|
| Warm intro 名单 (5-10 个) | CEO/CTO | 高 |
| WeChat 公众号 license | CEO | 中 |

---

## 成功心态

- **行动 > 完美**: 先发布，再优化
- **量化一切**: 无法衡量就无法改进
- **快速迭代**: 每周调整策略
- **长期主义**: 品牌建设需要时间

---

**Week 2 准备状态**: ✅ Complete
**启动日期**: Apr 1, 2026
**目标**: 20 outreach → 5 responses → 2-3 calls → 1 proposal

**Let's execute! 🚀**

---

*Created: 2026-03-26*
*CMO - 100000MRR*
*Version: 1.0*
