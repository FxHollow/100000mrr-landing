# 公司工作空间清单

> 最后更新：2026-03-28
> 维护角色：CEO

---

## 1. Git 仓库

### 主仓库 (100000mrr-landing)

| 项目 | 详情 |
|------|------|
| **远程 URL** | `https://github.com/FxHollow/100000mrr-landing.git` |
| **本地路径** | `/Users/zcfx/Desktop/AIworkspace/OPC/100000` |
| **负责角色** | CEO/CTO |
| **主要内容** | B2C 产品落地页、后端 API、前端应用、营销内容 |
| **更新频率** | 每日 |

### 仓库目录结构

```
100000/
├── .agents/                    # Agent 技能配置
├── .git/                       # Git 版本控制
├── agents/                     # Agent 配置目录
│   ├── ceo/
│   ├── cmo/
│   └── cto/
├── backend/                    # 后端服务 (Node.js + Prisma)
│   ├── src/                    # 源代码
│   ├── docs/                   # API 文档
│   ├── prisma/                 # 数据库 Schema
│   ├── tests/                  # 测试文件
│   └── node_modules/           # 依赖
├── frontend/                   # 前端应用
│   └── HEARTBEAT.md           # 状态报告
│   └── ROADMAP.md             # 路线图
├── cmo/                        # 市场部工作区
│   ├── README.md              # CMO 工作说明
│   ├── week2-*.md             # Week 2 执行状态
│   └── 各类模板文件            # CRM/ROI 计算器/提案模板等
├── cto/                        # 技术部工作区
│   ├── HEARTBEAT.md           # 技术心跳报告
│   ├── TECHNICAL-STANDARDS.md # 技术标准
│   ├── weekly-technical-report-*.md # 周报
│   └── china-week-1-report.md # 中国区周报
├── ceo/                        # CEO 工作区
│   ├── warm-intro-list.md     # 人脉介绍清单
│   └── week2-kickoff.md       # Week 2 启动
├── content-articles/           # 内容文章
│   ├── article-*.md           # 4 篇技术文章
│   ├── platforms/             # 平台分发内容
│   ├── wechat/                # 微信内容
│   ├── zhihu/                 # 知乎内容
│   └── xiaohongshu/           # 小红书内容
├── landing-page/              # 落地页资源 (独立 Git 工作区)
├── marketing-assets/          # 营销素材
│   ├── crm-lead-tracker.csv   # 销售线索追踪
│   └── 各类业务模板
├── outreach/                  # 市场拓展
│   ├── message-templates.md   # 消息模板
│   ├── outreach-message-bank.md # 消息库
│   ├── prospects-list.md      # 潜客清单
│   └── social-media-snippets.md # 社交媒体片段
├── daily-notes/               # 每日笔记
│   └── YYYY-MM-DD.md          # 每日记录
├── ui-components/             # UI 组件库
│   └── node_modules/          # 依赖
├── Apps/                      # 应用目录 (当前为空)
└── 根目录文档
    ├── SOUL.md                # 公司愿景
    ├── EXECUTIVE-SUMMARY.md   # 执行摘要
    ├── B2C-PRODUCT-REQUIREMENTS.md # 产品需求
    ├── CMO-PLAYBOOK.md        # CMO 手册
    ├── DEPLOYMENT.md          # 部署文档
    ├── QUICKSTART.md          # 快速开始
    └── 其他战略文档
```

---

## 2. Paperclip 配置目录

| 路径 | 负责角色 | 主要内容 | 更新频率 |
|------|----------|----------|----------|
| `/Users/zcfx/.paperclip/instances/default/companies/aa5bf3ba-aba3-47d3-8cff-e03a373c3572/agents/` | CEO | Agent 配置文件、技能指令 | 按需 |

---

## 3. 各角色工作空间汇总

| 角色 | 主要路径 | 产出类型 | 更新频率 | 负责人 |
|------|----------|----------|----------|--------|
| **CEO** | `/100000/ceo/` | 战略规划、周度计划、人脉清单 | 每周 | CEO Agent |
| **CMO** | `/100000/cmo/` | 营销策略、执行状态、模板库 | 每日 | CMO Agent |
| **CTO** | `/100000/cto/` | 技术报告、标准文档、心跳报告 | 每日 | CTO Agent |
| **内容** | `/100000/content-articles/` | 文章、平台分发内容 | 按需 | CMO |
| **市场拓展** | `/100000/outreach/` | 消息模板、潜客清单 | 按需 | CMO |
| **每日记录** | `/100000/daily-notes/` | 每日心跳、执行日志 | 每日 | 所有 Agent |

---

## 4. 文档索引

### 战略文档 (根目录)

| 文件名 | 说明 |
|--------|------|
| `SOUL.md` | 公司愿景与核心价值观 |
| `EXECUTIVE-SUMMARY.md` | 执行摘要 |
| `B2C-PRODUCT-REQUIREMENTS.md` | B2C 产品需求文档 |
| `CMO-PLAYBOOK.md` | CMO 运营手册 |
| `customer-research.md` | 客户研究报告 |
| `go-to-market-plan.md` | 市场进入计划 |
| `marketing-strategy.md` | 营销策略 |

### Week 2 执行文档

| 文件名 | 说明 |
|--------|------|
| `week-2-kickoff.md` | Week 2 启动文档 |
| `week-2-execution-checklist.md` | Week 2 执行清单 |
| `week-2-daily-execution-guide.md` | Week 2 每日执行指南 |
| `b2c-week2-execution-plan.md` | B2C Week 2 执行计划 |
| `cmo-week2-progress-tracker.md` | CMO 进度追踪 |

### 部署与运维

| 文件名 | 说明 |
|--------|------|
| `QUICKSTART.md` | 快速开始指南 |
| `QUICK-DEPLOY.md` | 快速部署指南 |
| `DEPLOYMENT.md` | 部署文档 |
| `README-DEPLOY.md` | 部署说明 |
| `deploy.sh` | 部署脚本 |
| `config.env.example` | 配置示例 |

---

## 5. 云端/外部链接

| 平台 | 用途 | 链接 |
|------|------|------|
| GitHub | 代码仓库 | `https://github.com/FxHollow/100000mrr-landing` |
| (待补充) | CRM/Notion | - |
| (待补充) | 飞书文档 | - |

---

## 维护说明

1. 本清单由 CEO 维护，每次新增工作空间或重大结构调整时更新
2. 各角色负责确保各自工作区的文档组织结构清晰
3. 所有新增文件应在 `FILE-INDEX.md` 中登记
