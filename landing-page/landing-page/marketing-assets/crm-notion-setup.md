# CRM Lead Tracker - Notion Setup Guide

## 快速搭建指南

### 方式 1：Notion Database（推荐）

**1. 创建新 Database**
- 在 Notion 中新建页面
- 选择 "Table" 或 "Database"
- 命名为 "100000MRR CRM - Lead Pipeline"

**2. 添加以下字段（Properties）**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| ID | Title | 自动编号：L001, L002... |
| Date Added | Date | 添加日期 |
| Name | Text | 联系人姓名 |
| Company | Text | 公司名称 |
| Role | Text | 职位 |
| Contact Info | Text | 微信/邮箱/电话 |
| Source | Select | WeChat/知乎/小红书/Referral/Landing Page/掘金/V2EX |
| ICP Fit | Select | High / Medium / Low |
| Industry | Select | E-commerce / Manufacturing / SaaS / Agency / Other |
| Estimated Budget | Select | <30k / 30-80k / 80k+ / Unknown |
| Pain Point | Text | 主要痛点 |
| Status | Status | New → Contacted → Responded → Call Booked → Call Done → Proposal → Won/Lost |
| Last Contact | Date | 最后一次联系日期 |
| Next Action | Text | 下一步行动 |
| Next Action Date | Date | 下一步行动日期 |
| Notes | Text | 对话记录 |
| Value Score | Formula | 自动优先级评分 |

**3. Value Score 公式**

```
// Notion Formula 2.0
if(prop("ICP Fit") == "High", 3, if(prop("ICP Fit") == "Medium", 2, 1)) +
if(prop("Estimated Budget") == "80k+", 3, if(prop("Estimated Budget") == "30-80k", 2, 1)) +
if(prop("Status") == "Call Booked", 3, if(prop("Status") == "Responded", 2, if(prop("Status") == "Contacted", 1, 0)))
```

**4. 创建 Views**

| View 名称 | Filter | Sort |
|----------|--------|------|
| 🔴 Follow Up Today | Next Action Date = Today | Value Score (Desc) |
| 🔥 Hot Leads | Value Score >= 7 AND Status != Won | Value Score (Desc) |
| ⏰ Stale Leads | Last Contact < 5 days ago AND Status != Won/Lost | Last Contact (Asc) |
| 📊 This Week | Date Added >= Start of Week | Date Added (Desc) |
| 📋 By Status | Group by Status | Value Score (Desc) |

---

### 方式 2：Google Sheets

**1. 创建新 Spreadsheet**
- 访问：https://sheets.google.com
- 创建 "100000MRR CRM - Lead Pipeline"

**2. Sheet 1: Lead Pipeline**

在 A1-Q1 添加表头：
```
ID | Date Added | Name | Company | Role | Contact Info | Source | ICP Fit | Industry | Est. Budget | Pain Point | Status | Last Contact | Next Action | Next Action Date | Notes | Value Score
```

**3. Value Score 公式（Q2 单元格）**

```excel
=IF(H2="High",3,IF(H2="Medium",2,1)) + IF(J2="80k+",3,IF(J2="30-80k",2,1)) + IF(L2="Call Booked",3,IF(L2="Responded",2,IF(L2="Contacted",1,0)))
```

**4. 条件格式**

- Value Score >= 7: 绿色背景
- Value Score 4-6: 黄色背景
- Value Score <= 3: 红色背景
- Last Contact > 5 days: 橙色背景

**5. Sheet 2: Outreach Log**

| Date | Lead ID | Lead Name | Message Type | Channel | Sent By | Response? | Notes |
|------|---------|-----------|--------------|---------|---------|-----------|-------|

**6. Sheet 3: Weekly Metrics**

| Metric | Formula |
|--------|---------|
| New Leads This Week | `=COUNTIF(B:B,">="&TODAY()-7)` |
| Contacted | `=COUNTIF(L:L,"Contacted")` |
| Responded | `=COUNTIF(L:L,"Responded")` |
| Calls Booked | `=COUNTIF(L:L,"Call Booked")` |
| Proposals Sent | `=COUNTIF(L:L,"Proposal Sent")` |
| Deals Won | `=COUNTIF(L:L,"Won")` |

---

## 日常工作流

### 每日早晨（10 分钟）
1. 打开 CRM
2. 查看 "Follow Up Today" view
3. 发送计划的跟进消息
4. 更新每个 lead 的 Next Action

### 每日结束（5 分钟）
1. 记录新增 lead
2. 更新 status 变化
3. 添加对话笔记
4. 设置明天的 Next Action 日期

### 周五回顾（30 分钟）
1. 检查 Weekly Metrics
2. 计算转化率
3. 识别瓶颈
4. 调整下周外联策略

---

## 快速开始：添加前 5 个 Lead

建议从以下来源添加初始 lead：

1. **Warm intros** - 请 CEO/CTO 提供 3-5 个 warm intro
2. **WeChat contacts** - 从现有微信联系人中筛选
3. **Previous conversations** - 过去 6 个月聊过的潜在客户

示例数据：

```
L001 | 2026-04-01 | 王总 | 杭州电商公司 | CEO | wechat: wangzong | Warm | High | E-commerce | 30-80k | 客服成本高 | New | - | Send intro message | 2026-04-01 | CEO intro | 8
L002 | 2026-04-01 | 李经理 | 深圳分销 | 运营总监 | 知乎 | 知乎 | Medium | Distribution | Unknown | 效率低 | New | - | Send case study | 2026-04-01 | 看了文章私信 | 5
```

---

## 隐私和合规

⚠️ **中国个人信息保护法（PIPL）合规提示**

1. **同意**：仅添加明确同意接收商务联系的人
2. **目的**：仅用于合法商务沟通
3. **保留**：12 个月无联系后删除
4. **安全**：如含敏感数据，设置密码保护
5. **退出**：提供 "不再联系" 选项

---

*Created: 2026-03-26*
*Owner: CMO - 100000MRR*
*Version: 1.0*
