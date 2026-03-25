# AI Integration ROI Calculator

## Excel/Google Sheets Template Structure

---

## Sheet 1: Current State Analysis

### Input Section

| A | B | C |
|---|---|---|
| **Current Process Costs** | | |
| Number of employees | [input] | |
| Average hourly rate (RMB) | [input] | |
| Hours per week on manual tasks | [input] | |
| Weekly labor cost | `=B2*B3*B4` | |
| Monthly labor cost | `=B5*4.33` | |
| | | |
| **Overtime Costs** | | |
| Average overtime hours/week | [input] | |
| Overtime hourly rate | [input] | |
| Weekly overtime cost | `=B9*B10` | |
| Monthly overtime cost | `=B11*4.33` | |
| | | |
| **Lost Opportunity Costs** | | |
| Estimated lost sales/month (slow response) | [input] | |
| Customer churn due to poor service | [input] | |
| Total lost opportunity | `=B15+B16` | |
| | | |
| **Turnover Costs** | | |
| Employees leaving per year | [input] | |
| Cost per hire (recruiting + training) | [input] | |
| Annual turnover cost | `=B20*B21` | |
| Monthly turnover cost | `=B22/12` | |

### Summary: Current Monthly Cost

| Metric | Formula |
|--------|---------|
| **Total Current Monthly Cost** | `=B6+B12+B17+B23` |

---

## Sheet 2: AI Solution Costs

### Input Section

| A | B |
|---|---|
| **AI Model Costs** | |
| Selected model | [dropdown: DeepSeek/Qianwen/Kimi/etc] |
| Estimated tokens/month | [input] |
| Cost per 1K tokens | [auto-fill based on model] |
| Monthly API cost | `=B4*B5/1000` |
| | |
| **Platform/Integration Costs** | |
| Hosting/platform fee | [input] |
| Integration development (one-time) | [input] |
| Monthly maintenance | [input] |
| | |
| **Training & Change Management** | |
| Team training hours | [input] |
| Training cost (one-time) | [input] |

### Summary: AI Monthly Cost

| Metric | Formula |
|--------|---------|
| **Recurring Monthly Cost** | `=B6+B11+B12` |
| **One-time Setup Cost** | `=B10+B16` |

---

## Sheet 3: ROI Analysis

### Monthly Savings Calculation

| A | B | C |
|---|---|---|
| **Time Savings** | | |
| Current monthly labor cost | `=Sheet1!B6` | |
| Expected reduction % | [input, e.g., 70%] | |
| Monthly labor savings | `=B3*B4` | |
| | | |
| **Overtime Savings** | `=Sheet1!B12` | |
| Expected reduction % | [input, e.g., 80%] | |
| Monthly overtime savings | `=B7*B8` | |
| | | |
| **Recovered Sales** | | |
| Current lost sales | `=Sheet1!B15` | |
| Expected recovery % | [input, e.g., 50%] | |
| Monthly recovered sales | `=B12*B13` | |
| | | |
| **Reduced Turnover** | | |
| Current monthly turnover | `=Sheet1!B23` | |
| Expected reduction % | [input, e.g., 50%] | |
| Monthly turnover savings | `=B17*B18` | |

### ROI Summary

| Metric | Formula | Result |
|--------|---------|--------|
| **Total Monthly Savings** | `=B5+B10+B15+B20` | ¥___ |
| **AI Monthly Cost** | `=Sheet2!B19` | ¥___ |
| **Net Monthly Benefit** | `=B23-B24` | ¥___ |
| | | |
| **One-time Setup Cost** | `=Sheet2!B20` | ¥___ |
| **Payback Period (months)** | `=B27/B25` | ___ months |
| | | |
| **Annual Net Benefit** | `=B25*12` | ¥___ |
| **3-Year Net Benefit** | `=B25*36-B27` | ¥___ |
| | | |
| **ROI (%)** | `=(B25*12-B27)/B27*100` | ___% |

---

## Sheet 4: Sensitivity Analysis

### Best Case / Base Case / Worst Case

| Scenario | Labor Savings % | Recovery % | Payback | 3-Year NPV |
|----------|-----------------|------------|---------|------------|
| **Best Case** | 85% | 70% | [calc] | [calc] |
| **Base Case** | 70% | 50% | [calc] | [calc] |
| **Worst Case** | 50% | 30% | [calc] | [calc] |

### Break-Even Analysis

| Metric | Value |
|--------|-------|
| Break-even month | [calc: when cumulative benefits > costs] |
| Minimum savings needed for positive ROI | [calc] |

---

## Sheet 5: Industry Benchmarks

### Reference Data (Pre-filled)

| Industry | Avg Time Savings | Avg Cost Savings | Typical Payback |
|----------|-----------------|------------------|-----------------|
| E-commerce (customer service) | 70-85% | 60-80% | 2-4 weeks |
| B2B SaaS (document automation) | 80-90% | 50-70% | 3-6 weeks |
| Manufacturing (inventory) | 40-60% | 30-50% | 6-10 weeks |
| Professional services (research) | 60-75% | 40-60% | 4-8 weeks |

### Model Cost Reference

| Model | Cost per 1M tokens | Best For |
|-------|-------------------|----------|
| DeepSeek | ¥4,000 | Cost-sensitive, high volume |
| 通义千问 | ¥8,000 | Balanced performance/cost |
| Kimi | ¥12,000 | Long context documents |
| GPT-4 | ~¥210,000 | Complex reasoning (global) |
| Claude 4 | ~¥360,000 | Long context, safety |

---

## Sheet 6: Visual Dashboard

### Charts to Include

1. **Before/After Cost Comparison** (Column chart)
2. **Cumulative Benefits Over Time** (Line chart)
3. **Payback Period Visualization** (Area chart)
4. **ROI by Scenario** (Bar chart)

### Key Metrics Display

```
┌─────────────────────────────────────────────────────────┐
│                    ROI DASHBOARD                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Current Monthly Cost:          ¥115,000              │
│   AI Solution Monthly Cost:      ¥5,000                │
│   Net Monthly Benefit:           ¥65,000               │
│                                                         │
│   Payback Period:                3 weeks               │
│   First Year ROI:                1,560%                │
│   3-Year Net Benefit:            ¥2,340,000            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Quick Start Guide

### How to Use This Calculator

1. **Fill in Sheet 1 (Current State)**
   - Enter your current process costs
   - Be honest about lost opportunities
   - Include all hidden costs (turnover, training)

2. **Fill in Sheet 2 (AI Costs)**
   - Select your model from dropdown
   - Estimate volume based on your usage
   - Include all implementation costs

3. **Review Sheet 3 (ROI Analysis)**
   - Auto-calculated savings and payback
   - Adjust assumptions if needed
   - Use for business case presentations

4. **Check Sheet 4 (Sensitivity)**
   - Understand best/worst case scenarios
   - Build conservative estimates for stakeholders

5. **Reference Sheet 5 (Benchmarks)**
   - Compare your projections to industry norms
   - Validate your assumptions

---

## Example Calculation

### E-commerce Customer Service Automation

**Inputs:**
- 5 customer service reps @ ¥8,000/month = ¥40,000
- Overtime: ¥15,000/month
- Lost sales: ¥50,000/month
- Turnover: ¥10,000/month
- **Current total: ¥115,000/month**

**AI Solution:**
- DeepSeek API: ¥3,000/month
- Platform: ¥2,000/month
- Setup: ¥15,000 (one-time)
- **AI total: ¥5,000/month recurring**

**Results:**
- Monthly savings: ¥65,000
- Payback: 3 weeks
- First year ROI: 1,560%
- 3-year benefit: ¥2.3M

---

## Download Formats

- **Google Sheets**: [Link to template]
- **Excel**: [Download .xlsx]
- **PDF Summary**: [Download for presentations]

---

*Created: 2026-03-26*
*Owner: CMO - 100000MRR*
*Version: 1.0*
