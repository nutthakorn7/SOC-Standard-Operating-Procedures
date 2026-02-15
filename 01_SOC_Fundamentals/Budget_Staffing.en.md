# SOC Budget & Staffing Guide

> **Document ID:** BUD-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Audience:** CISO, IT Director, Finance, SOC Manager

---

## How to Use This Guide

This guide helps you build a business case for your SOC with realistic cost estimates, staffing models, and ROI calculations. Adjust numbers to your local market and organization size.

---

## Part 1: Staffing Models

### Model A: Minimal SOC (8×5 Coverage)

```
Mon–Fri, 08:00–17:00 only
After-hours: MSSP or on-call rotation

┌─────────────────────────────┐
│      SOC Manager (1)        │ ← Part-time if small org
├─────────────────────────────┤
│   T1 Analyst (1)  │  T1 (1) │ ← 2 analysts, alternate shifts
├─────────────────────────────┤
│   MSSP (after-hours)        │ ← Outsource nights/weekends
└─────────────────────────────┘

Headcount: 2–3 people
Best for: < 500 employees, low-risk industry
```

### Model B: Extended SOC (16×5 Coverage)

```
Mon–Fri, 07:00–23:00 (two shifts)
After-hours: MSSP or on-call

        Morning Shift (07–15)    Evening Shift (15–23)
       ┌──────────────────┐    ┌──────────────────┐
       │ T1 Analyst (1)   │    │ T1 Analyst (1)   │
       │ T2 Analyst (1)   │    │ T1 Analyst (1)   │
       └──────────────────┘    └──────────────────┘
                 │
         SOC Manager (1) ← Day shift, oversees both
         Detection Eng (1) ← Day shift, creates rules

Headcount: 5–6 people
Best for: 500–2,000 employees, moderate risk
```

### Model C: Full 24×7 SOC

```
24/7/365 coverage (three shifts + weekends)

  Day (08–16)      Swing (16–00)     Night (00–08)
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ T1 (1)       │  │ T1 (1)       │  │ T1 (1)       │
│ T2 (1)       │  │ T2 (1)       │  │ T1 (1)       │
└──────────────┘  └──────────────┘  └──────────────┘
       │
 SOC Manager (1) ─── IR Lead (1)
 Detection Eng (1) ─── Threat Intel (1)
 Forensic Analyst (1)

Headcount: 10–15 people (including backfills for PTO/sick)
Best for: 2,000+ employees, regulated industry
```

### Staffing Calculator

```
Minimum analysts for 24/7 = 5.25 FTE per seat

Formula:
  365 days × 24 hours = 8,760 hours/year
  1 FTE ≈ 1,670 working hours/year (after PTO, training, sick leave)
  8,760 ÷ 1,670 = 5.25 FTE per 24/7 seat

For 2 concurrent analysts 24/7:
  5.25 × 2 = 10.5 FTE → hire 11 analysts minimum
```

---

## Part 2: Role Definitions & Salary Ranges

### Thailand Market (2025–2026)

| Role | Level | Salary Range (฿/month) | Total Cost (฿/year) |
|:---|:---:|:---:|:---:|
| SOC Analyst T1 (Junior) | Entry | 25,000–45,000 | 300K–540K |
| SOC Analyst T1 (1–2 yrs) | Junior | 35,000–60,000 | 420K–720K |
| SOC Analyst T2 (3–5 yrs) | Mid | 50,000–80,000 | 600K–960K |
| SOC Analyst T3 / IR (5+ yrs) | Senior | 70,000–120,000 | 840K–1.44M |
| Detection Engineer | Mid-Senior | 60,000–100,000 | 720K–1.2M |
| Threat Intelligence Analyst | Mid | 50,000–90,000 | 600K–1.08M |
| Forensic Analyst | Mid-Senior | 60,000–100,000 | 720K–1.2M |
| SOC Manager | Senior | 80,000–150,000 | 960K–1.8M |
| CISO | Executive | 150,000–350,000 | 1.8M–4.2M |

> **Note:** Add 15–25% for benefits (SSO, health insurance, provident fund, bonuses).

### International Market (USD Reference)

| Role | US Market | UK Market | Singapore |
|:---|:---:|:---:|:---:|
| T1 Analyst | $55–75K | £30–45K | S$48–72K |
| T2 Analyst | $75–110K | £45–70K | S$72–108K |
| SOC Manager | $120–180K | £75–120K | S$120–180K |

---

## Part 3: Budget Templates

### Budget A: Minimal SOC (Open-Source Stack)

| Category | Item | Year 1 (฿) | Year 2+ (฿) |
|:---|:---|:---:|:---:|
| **Staff** | SOC Manager (0.5 FTE) | 480K–900K | 500K–950K |
| | T1 Analyst × 2 | 600K–1.08M | 640K–1.15M |
| **Subtotal Staff** | | **1.08M–1.98M** | **1.14M–2.1M** |
| **Technology** | SIEM (Wazuh — self-hosted) | 0 | 0 |
| | Server hardware / Cloud VMs | 200K–500K | 100K–300K |
| | EDR (Wazuh Agent) | 0 | 0 |
| | Ticketing (TheHive) | 0 | 0 |
| | TI (MISP) | 0 | 0 |
| **Subtotal Technology** | | **200K–500K** | **100K–300K** |
| **Services** | MSSP (after-hours) | 600K–1.2M | 600K–1.2M |
| | Internet / connectivity | 60K–120K | 60K–120K |
| **Subtotal Services** | | **660K–1.32M** | **660K–1.32M** |
| **Training** | Certs + courses (2 people) | 100K–300K | 100K–300K |
| **Contingency** | 10% buffer | 200K–400K | 200K–400K |
| **GRAND TOTAL** | | **2.24M–4.5M** | **2.2M–4.42M** |

### Budget B: Mid-Range SOC (Commercial + Open-Source)

| Category | Item | Year 1 (฿) | Year 2+ (฿) |
|:---|:---|:---:|:---:|
| **Staff** | SOC Manager | 960K–1.8M | 1.0M–1.9M |
| | T1 Analyst × 2 | 840K–1.44M | 900K–1.5M |
| | T2 Analyst × 1 | 600K–960K | 640K–1.0M |
| | Detection Engineer × 1 | 720K–1.2M | 760K–1.3M |
| **Subtotal Staff** | | **3.12M–5.4M** | **3.3M–5.7M** |
| **Technology** | SIEM (Elastic/Sentinel) | 1M–3M | 1M–3M |
| | EDR (Defender/CrowdStrike) | 1M–3M | 1M–3M |
| | Vuln Scanner | 500K–1M | 500K–1M |
| | SOAR | 0–1M | 0–1M |
| **Subtotal Technology** | | **2.5M–8M** | **2.5M–8M** |
| **Services** | MSSP (night shift) | 1M–2M | 1M–2M |
| **Training** | Certs + SANS (4 people) | 400K–800K | 300K–600K |
| **Contingency** | 10% buffer | 700K–1.6M | 700K–1.6M |
| **GRAND TOTAL** | | **7.72M–17.8M** | **7.8M–17.9M** |

### Budget C: Enterprise 24/7 SOC

| Category | Item | Year 1 (฿) |
|:---|:---|:---:|
| **Staff** (10–15 FTE) | All roles | 10M–25M |
| **Technology** | Enterprise stack | 5M–15M |
| **Services** | Consulting, TI feeds | 2M–5M |
| **Training** | SANS, vendor certs | 1M–3M |
| **Facility** | SOC room, monitors | 500K–2M |
| **Contingency** | 10% | 2M–5M |
| **GRAND TOTAL** | | **20.5M–55M** |

---

## Part 4: ROI & Business Case

### Cost of NOT Having a SOC

| Risk | Average Cost per Incident |
|:---|:---:|
| Data breach (ASEAN average) | ฿85–120M ($2.5–3.5M) |
| Ransomware (mid-size org) | ฿10–50M ($300K–1.5M) |
| BEC / wire fraud | ฿3–15M ($100K–500K) |
| Regulatory fine (PDPA) | Up to ฿5M per offense |
| Reputation damage | Unquantifiable |
| Business downtime (per hour) | ฿100K–1M+ |

### ROI Formula

```
ROI = (Risk Reduced - SOC Cost) / SOC Cost × 100%

Example:
  Without SOC: 2 incidents/year × ฿20M average = ฿40M risk
  With SOC (95% detection): 0.1 incidents/year = ฿2M risk
  SOC Cost: ฿8M/year

  Risk Reduced = ฿40M - ฿2M = ฿38M
  ROI = (฿38M - ฿8M) / ฿8M × 100% = 375%
```

### One-Page Business Case Template

```
EXECUTIVE SUMMARY
━━━━━━━━━━━━━━━━━━
Problem:    [Organization] has no dedicated security monitoring.
            Average breach cost in our industry: ฿___M
            Current annual security incidents: ___

Proposal:   Build a [Model A/B/C] SOC
            Estimated cost: ฿___M/year
            Expected risk reduction: ____%

ROI:        ___% return in year 1
            Breakeven after ___ months

Comparison:
┌──────────────────┬────────────┬────────────┬────────────┐
│                  │  Option A  │  Option B  │  Option C  │
│                  │  Minimal   │  Mid-Range │  Enterprise│
├──────────────────┼────────────┼────────────┼────────────┤
│ Annual Cost      │ ฿2–5M     │ ฿8–18M    │ ฿20–55M   │
│ Coverage         │ 8×5        │ 16×5       │ 24×7       │
│ Detection Rate   │ ~60%       │ ~85%       │ ~95%       │
│ MTTR             │ < 8 hrs    │ < 4 hrs    │ < 1 hr     │
│ PDPA Compliance  │ Partial    │ Full       │ Full       │
└──────────────────┴────────────┴────────────┴────────────┘

Recommendation: [Option B] provides optimal balance of cost and coverage.

APPROVAL
□ Approved    □ Revision needed    □ Rejected

Signed: ___________________ Date: ___________
```

---

## Part 5: Hiring Timeline

| Week | Activity |
|:---:|:---|
| 1–2 | Write job descriptions, post on JobThai/LinkedIn/TopDev |
| 3–4 | Screen resumes, schedule interviews |
| 5–6 | Technical interviews (use [Interview Guide](../05_Incident_Response/Interview_Guide.en.md)) |
| 7 | Offers extended |
| 8–9 | Notice period (Thai standard: 30 days) |
| 10–12 | Onboarding + training (use [Training Path](Analyst_Training_Path.en.md)) |

### Where to Post (Thailand)

| Platform | Cost | Best For |
|:---|:---|:---|
| JobThai | ฿3–8K/post | Thai market, entry-level |
| LinkedIn | ฿15–30K/post | Mid-senior, international |
| TopDev | ฿5–10K/post | Tech talent |
| University job fairs | Free–฿20K | Fresh graduates |
| Cybersecurity communities | Free | Passionate candidates |
| SANS/THCert events | Free | Specialized talent |

---

## Related Documents

- [SOC Building Roadmap](SOC_Building_Roadmap.en.md)
- [SOC Team Structure](../06_Operations_Management/SOC_Team_Structure.en.md)
- [Interview Guide](../05_Incident_Response/Interview_Guide.en.md)
- [Analyst Training Path](Analyst_Training_Path.en.md)
- [SLA Template](../06_Operations_Management/SLA_Template.en.md)
