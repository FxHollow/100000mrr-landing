# Simple CRM - Lead Tracking Template

## 客户外联追踪表

---

## Quick Start

Copy this structure into:
- **Google Sheets** (recommended for collaboration)
- **Notion Database** (if using Notion for everything)
- **Airtable** (if you want nicer UI)
- **Excel** (offline option)

---

## Sheet Structure

### Sheet 1: Lead Pipeline

| Column | Field | Type | Notes |
|--------|-------|------|-------|
| A | ID | Text | Auto: L001, L002... |
| B | Date Added | Date | When lead entered system |
| C | Name | Text | Contact person name |
| D | Company | Text | Company name |
| E | Role | Text | Job title |
| F | Contact Info | Text | WeChat/Email/Phone |
| G | Source | Dropdown | WeChat/知乎/小红书/Referral/Landing Page/etc |
| H | ICP Fit | Dropdown | High/Medium/Low |
| I | Industry | Text | E-commerce/Manufacturing/SaaS/etc |
| J | Estimated Budget | Dropdown | <30k/30-80k/80k+/Unknown |
| K | Pain Point | Text | Main challenge they face |
| L | Status | Dropdown | See pipeline stages below |
| M | Last Contact Date | Date | Most recent interaction |
| N | Next Action | Text | What to do next |
| O | Next Action Date | Date | When to follow up |
| P | Notes | Text | All conversation notes |
| Q | Value Score | Formula | Auto-calculated priority |

---

## Pipeline Stages (Status Column)

### Stage Definitions

| Stage | Definition | Action Required |
|-------|------------|-----------------|
| **New** | Just added to CRM, no contact yet | Send initial outreach |
| **Contacted** | First message sent, awaiting response | Wait 2-3 days, then follow up |
| **Responded** | Prospect replied, showing interest | Engage, qualify, book call |
| **Call Booked** | Discovery call scheduled | Prepare for call |
| **Call Completed** | Call done, evaluating fit | Send proposal or disqualify |
| **Proposal Sent** | Formal proposal delivered | Follow up in 2-3 days |
| **Negotiation** | Discussing terms, pricing | Address objections, close |
| **Won** | Deal closed! 🎉 | Onboard client |
| **Lost** | Not proceeding | Log reason, nurture for future |
| **Nurture** | Not ready now, stay in touch | Monthly check-ins |

---

## Formulas

### Value Score (Column Q)

Auto-prioritize leads based on fit and readiness:

```excel
=IF(H2="High",3,IF(H2="Medium",2,1)) + IF(J2="80k+",3,IF(J2="30-80k",2,1)) + IF(L2="Call Booked",3,IF(L2="Responded",2,IF(L2="Contacted",1,0)))
```

This gives:
- High ICP + High Budget + Call Booked = 9 (priority)
- Low ICP + Unknown Budget + New = 1 (low priority)

### Days Since Last Contact (Helper Column)

```excel
=TODAY() - M2
```

Use this to identify leads needing follow-up (>3 days = yellow, >7 days = red)

---

## Sheet 2: Outreach Log

Track every outbound message:

| Date | Lead ID | Lead Name | Message Type | Channel | Sent By | Response? | Notes |
|------|---------|-----------|--------------|---------|---------|-----------|-------|
| 4/1 | L001 | 张三 | Warm outreach | WeChat | CMO | Yes | Replied same day |
| 4/1 | L002 | 李四 | Group intro | WeChat | CMO | No | No reply yet |

---

## Sheet 3: Weekly Metrics

Auto-summary of pipeline health:

| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| New Leads | =COUNTIF(B:B,">="&TODAY()-7) | ... | ... |
| Contacted | =COUNTIF(L:L,"Contacted") | ... | ... |
| Responded | =COUNTIF(L:L,"Responded") | ... | ... |
| Calls Booked | =COUNTIF(L:L,"Call Booked") | ... | ... |
| Proposals Sent | =COUNTIF(L:L,"Proposal Sent") | ... | ... |
| Deals Won | =COUNTIF(L:L,"Won") | ... | ... |
| Conversion Rate | =(Won/New)*100 | ... | ... |

---

## Sheet 4: Content Attribution

Track which content drives leads:

| Lead ID | First Touchpoint | Content Viewed | Lead Score | Converted? |
|---------|-----------------|----------------|------------|------------|
| L001 | Article 1 | Landing Page | 7 | Yes |
| L002 | 知乎 | Article 2 | 5 | No |

---

## Views/Filters to Create

### 1. "Follow Up Today"
Filter: `Next Action Date = TODAY()`

Shows all leads needing action today.

### 2. "Hot Leads"
Filter: `Value Score >= 7` AND `Status != Won/Lost`

Shows highest-priority active leads.

### 3. "Stale Leads"
Filter: `Days Since Last Contact > 5` AND `Status NOT IN (Won, Lost, Nurture)`

Shows leads at risk of going cold.

### 4. "This Week's New Leads"
Filter: `Date Added >= Start of Week`

Shows weekly lead generation performance.

---

## Daily Workflow

### Morning (10 min)
1. Open CRM
2. Check "Follow Up Today" view
3. Send scheduled follow-ups
4. Update Next Action for each

### End of Day (5 min)
1. Log any new leads
2. Update Status changes
3. Add conversation notes
4. Set Next Action dates

### Weekly Review (30 min, Friday)
1. Review Weekly Metrics sheet
2. Calculate conversion rates
3. Identify bottlenecks
4. Adjust outreach strategy

---

## Sample Data (First 5 Leads)

| ID | Name | Company | Source | ICP | Status | Next Action |
|----|------|---------|--------|-----|--------|-------------|
| L001 | 王总 | 杭州电商 | Warm | High | Call Booked | Call on 4/3 |
| L002 | 李经理 | 深圳分销 | 知乎 | Medium | Responded | Send case study |
| L003 | 张总 | 宁波制造 | Referral | High | New | Send intro message |
| L004 | 陈总 | 北京 SaaS | 掘金 | Medium | Contacted | Follow up 4/4 |
| L005 | 刘经理 | 上海服务 | Landing Page | Low | New | Qualify first |

---

## Integration Options

### If Using Notion
- Create as Notion Database
- Use Notion's native reminders
- Link to meeting notes pages

### If Using Google Sheets
- Set up email notifications for stale leads
- Share with CEO for visibility
- Use conditional formatting for status colors

### If Using Airtable
- Set up automated reminders
- Create form for landing page lead capture
- Use Airbase for mobile access

---

## Privacy & Compliance

⚠️ **Important for China operations:**

1. **Consent**: Only add contacts who have given explicit permission
2. **Purpose**: Use only for legitimate business communication
3. **Retention**: Remove leads after 12 months of no contact
4. **Security**: Password-protect spreadsheet if sensitive data
5. **PIPL**: Comply with China's Personal Information Protection Law

---

*Created: 2026-03-28*
*Owner: CMO - 100000MRR*
*Version: 1.0*
