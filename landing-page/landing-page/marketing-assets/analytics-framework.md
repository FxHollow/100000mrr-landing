# Marketing Analytics & Tracking Framework

## Overview

Track what matters: **leads, conversions, and revenue** — not vanity metrics.

---

## Core Metrics Dashboard

### Weekly Tracking Sheet

| Week | Dates | Website Visitors | Article Views | WeChat Followers | Leads | Calls Booked | Deals Closed | Revenue |
|------|-------|------------------|---------------|------------------|-------|--------------|--------------|---------|
| 1 | Mar 25-31 | - | - | - | - | - | - | - |
| 2 | Apr 1-7 | | | | | | | |
| 3 | Apr 8-14 | | | | | | | |
| 4 | Apr 15-21 | | | | | | | |
| **Target** | - | 500 | 1,000 | 100 | 20 | 5 | 2 | ¥50k |

---

## Conversion Funnel

```
                    MARKETING FUNNEL
═══════════════════════════════════════════════════════════

     AWARENESS              CONSIDERATION         CONVERSION
         ↓                       ↓                     ↓
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Article Views  │ →  │  Landing Page   │ →  │  Lead Capture   │
│  Social Reach   │    │  Time on Page   │    │  Email/WeChat   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                      │                      │
         │                      │                      │
         ↓                      ↓                      ↓
     1,000                    500                    25
    (100%)                   (50%)                   (5%)

         ↓                      ↓                      ↓
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Lead Nurturing │ →  │  Discovery Call  │ →  │  Proposal Sent  │
│   Content Follow │    │  Qualification   │    │  Negotiation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                      │                      │
         │                      │                      │
         ↓                      ↓                      ↓
       20                      5                      2
      (4%)                   (1%)                 (0.4%)

         ↓
┌─────────────────┐
│    DEAL CLOSED  │
│   Revenue ¥¥¥   │
└─────────────────┘
         │
         ↓
        1-2
      (0.1%)

═══════════════════════════════════════════════════════════
```

### Funnel Benchmarks

| Stage | Target Rate | Industry Average |
|-------|-------------|------------------|
| Visitor → Landing Page | 50% | 30-40% |
| Landing Page → Lead | 5% | 2-5% |
| Lead → Call Booked | 25% | 15-25% |
| Call → Proposal | 80% | 60-80% |
| Proposal → Close | 40% | 25-40% |
| **Overall: Visitor → Customer** | **0.4%** | 0.1-0.5% |

---

## Tracking Setup

### 1. Website Analytics

**Option A: Google Analytics 4**
```
<!-- Add to landing-page/index.html before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Option B: Umami (Privacy-focused, China-friendly)**
- Self-hosted alternative
- Works well in China
- GDPR compliant

**Option C: 百度统计 (Baidu Analytics)**
- Best for China domestic traffic
- Required for Baidu SEO
- https://tongji.baidu.com

**Events to Track:**
- Page views (all pages)
- CTA button clicks
- Form submissions
- File downloads (one-pager PDF)
- Time on page
- Bounce rate

---

### 2. Lead Capture Tracking

**Simple Spreadsheet Structure:**

| Date | Lead Name | Company | Source | Contact | Status | Notes |
|------|-----------|---------|--------|---------|--------|-------|
| | | | WeChat/Article/Landing | | New/Contacted/Call/Proposal/Won-Lost | |

**CRM Options:**
- **HubSpot Free**: Good for startups, integrates with everything
- **Airtable**: Flexible, easy to customize
- **Notion**: Simple, already using for docs
- **金数据**: China-specific, WeChat integration

---

### 3. Content Performance

**Article Metrics to Track:**

| Article | Views | Avg Read Time | Shares | Leads Generated |
|---------|-------|---------------|--------|-----------------|
| Article 1 (AI Wins) | | | | |
| Article 2 (LLM Guide) | | | | |
| Article 3 (Case Study) | | | | |

**WeChat Official Account Metrics:**
- Open rate (target: 15-25%)
- Read completion rate (target: 40-60%)
- Share rate (target: 3-5%)
- Follow rate from article (target: 2-5%)

---

### 4. Outreach Tracking

**Weekly Outreach Log:**

| Week | Prospects Contacted | Responses | Calls Booked | Calls Completed | Proposals | Deals |
|------|---------------------|-----------|--------------|-----------------|-----------|-------|
| 2 | 10 | | | | | |
| 3 | 10 | | | | | |
| 4 | - | | | | | |
| **Target** | 20 | 5 (25%) | 5 | 4 | 2 | 1-2 |

---

## Weekly Reporting Template

### CMO Weekly Report to CEO

```
═══════════════════════════════════════════════════════
CMO WEEKLY REPORT - Week [X]
Dates: [YYYY-MM-DD to YYYY-MM-DD]
═══════════════════════════════════════════════════════

📊 KEY METRICS

Metric          | Target | Actual | Status
----------------|--------|--------|--------
Leads Generated | 5      | __     | 🟡
Calls Booked    | 2      | __     | 🟡
Deals Closed    | 0.5    | __     | 🟡
Revenue         | ¥12.5k | __     | 🟡

📈 FUNNEL HEALTH

- Website visitors: ___ (trend: ↑↓→)
- Conversion rate: ___% (target: 5%)
- CAC (estimated): ¥___ (target: <¥200)

✅ COMPLETED THIS WEEK

1. [ ]
2. [ ]
3. [ ]

🎯 NEXT WEEK PRIORITIES

1. [ ]
2. [ ]
3. [ ]

🚧 BLOCKERS / NEEDS

- [Any support needed from CEO/CTO]

💡 INSIGHTS / LEARNINGS

- [What's working]
- [What's not working]
- [Pivot decisions]

═══════════════════════════════════════════════════════
```

---

## Revenue Attribution

### Multi-Touch Attribution Model

For deals that close, track the full journey:

| Touchpoint | Weight | Example |
|------------|--------|---------|
| First touch (awareness) | 20% | Read Article 1 |
| Middle touches | 40% | Visited landing page, downloaded PDF |
| Last touch (conversion) | 40% | Booked call, sent proposal |

**Example:**
- ¥50,000 deal closed
- Customer journey: Article 1 → Landing Page → WeChat → Call → Proposal → Close
- Attribution:
  - Article 1: ¥10,000 (20%)
  - Landing Page: ¥10,000 (20%)
  - WeChat nurture: ¥10,000 (20%)
  - Sales call: ¥20,000 (40%)

---

## Tools & Budget

| Tool | Purpose | Cost (Monthly) |
|------|---------|----------------|
| Google Analytics / 百度统计 | Website analytics | Free |
| HubSpot Free | CRM | Free |
| 金数据 | Forms (China) | ¥200 |
| Canva Pro | Graphics | ¥100 |
| 秀米 / 135 编辑器 | WeChat formatting | ¥50 |
| **Total** | | **~¥350/month** |

---

## Success Triggers

### When to Celebrate 🎉
- First 100 website visitors
- First 10 leads
- First discovery call booked
- First deal closed
- First ¥10k month
- First ¥50k month

### When to Pivot ⚠️
- 4 weeks with zero leads → Review content/channel
- 10+ calls with zero proposals → Review qualification
- 5+ proposals with zero closes → Review pricing/offering
- CAC > ¥500 → Review channel mix

---

## Monthly Review Questions

1. **Which channel drove the most qualified leads?**
2. **Which content piece had highest conversion?**
3. **What's our actual CAC vs. target?**
4. **What's the sales cycle length?**
5. **Which ICP converted best?**
6. **What should we double down on?**
7. **What should we stop doing?**

---

*Created: 2026-03-26*
*Owner: CMO - 100000MRR*
*Version: 1.0*
