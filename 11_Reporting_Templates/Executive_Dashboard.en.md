# SOC Executive Dashboard Template

> **Document ID:** EXEC-DASH-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Owner:** SOC Manager  
> **Audience:** CISO, VP Security, C-Suite, Board

---

## Purpose

This template defines the metrics and visualizations for a SOC executive dashboard. Designed to communicate SOC value and posture to non-technical leadership in a concise, visual format.

---

## Dashboard Layout

```
┌──────────────────────────────────────────────────────────┐
│  🛡️ SOC Executive Dashboard — [Month Year]               │
├──────────────┬──────────────┬──────────────┬─────────────┤
│  Total       │  Incidents   │  MTTD        │  MTTR       │
│  Alerts      │  Handled     │  (Detect)    │  (Respond)  │
│  ████        │  ████        │  ████        │  ████       │
│  vs last mo. │  vs last mo. │  vs last mo. │ vs last mo. │
├──────────────┴──────────────┴──────────────┴─────────────┤
│  📊 Alert Trend (30 days)                                │
│  ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁▂▃▄▅▆▇█▇▆▅▄▃▂▁                        │
├──────────────────────────┬───────────────────────────────┤
│  🎯 Severity Breakdown   │  📈 Top 5 Alert Categories    │
│  P1: ██░░░  3            │  1. Phishing        150      │
│  P2: ████░  8            │  2. Brute Force      89      │
│  P3: ██████ 42           │  3. Malware          67      │
│  P4: ██████ 120          │  4. Suspicious Login 45      │
│                          │  5. Data Exfil       23      │
├──────────────────────────┴───────────────────────────────┤
│  🗺️ MITRE ATT&CK Coverage    │  SLA Compliance            │
│  [Heatmap visualization]      │  P1: ✅ 100% met           │
│                               │  P2: ✅ 95% met            │
│                               │  P3: ⚠️ 87% met           │
└──────────────────────────┴────────────────────────────────┘
```

---

## Metrics Definitions

### Tier 1: KPIs (Always Show)

| Metric | Definition | Target | How to Present |
|:---|:---|:---:|:---|
| **Total Alerts** | Alerts ingested in period | — | Number + % change from last period |
| **Incidents Handled** | Alerts escalated to incidents | — | Number + trend arrow |
| **MTTD** (Mean Time to Detect) | Time from attack start to SOC detection | ≤ 60 min | Number + green/red indicator |
| **MTTR** (Mean Time to Respond) | Time from detection to containment | ≤ 4 hrs | Number + green/red indicator |
| **SLA Compliance** | % incidents meeting SLA by severity | ≥ 95% | % per severity level |
| **False Positive Rate** | % alerts confirmed as false positive | ≤ 30% | % + trend |

### Tier 2: Operational Insights (Show when available)

| Metric | Definition | Target |
|:---|:---|:---:|
| **Alert-to-Incident Ratio** | % of alerts that become real incidents | 10–30% |
| **Escalation Rate** | % incidents escalated from T1 to T2 | 20–40% |
| **Reopened Incidents** | Incidents reopened after close | ≤ 5% |
| **Automation Rate** | % alerts handled by SOAR (no human touch) | ≥ 40% |
| **Coverage Hours** | SOC operational hours / total hours | 24/7 = 100% |

### Tier 3: Strategic (Monthly/Quarterly)

| Metric | Definition | Target |
|:---|:---|:---:|
| **MITRE ATT&CK Coverage** | % of relevant techniques with detection rules | ≥ 70% |
| **Detection Rule Count** | Active detection rules | Growing |
| **Log Source Coverage** | % of critical assets sending logs | ≥ 95% |
| **Threat Intel Indicators** | Active IOCs in watchlists | Growing |
| **Cost per Incident** | Total SOC cost ÷ incidents handled | Declining |
| **Staff Utilization** | Active work time ÷ total shift time | 60–80% |

---

## Monthly Executive Summary Template

```markdown
# SOC Monthly Report — [Month Year]

## Key Highlights
- ✅ [Top achievement — e.g., "Detected and contained ransomware attempt in 22 minutes"]
- ⚠️ [Notable concern — e.g., "Phishing attempts increased 34% month-over-month"]
- 🔄 [Improvement — e.g., "New SOAR playbook reduced MTTR for brute force by 60%"]

## By the Numbers
| Metric | This Month | Last Month | Trend |
|:---|:---:|:---:|:---:|
| Total Alerts | 4,521 | 4,102 | ↑ 10% |
| Confirmed Incidents | 173 | 156 | ↑ 11% |
| MTTD | 38 min | 45 min | ✅ ↓ |
| MTTR | 3.2 hrs | 4.1 hrs | ✅ ↓ |
| SLA Compliance | 96% | 93% | ✅ ↑ |
| FP Rate | 22% | 28% | ✅ ↓ |

## Notable Incidents
| Date | ID | Type | Severity | Impact | Resolution |
|:---|:---|:---|:---:|:---|:---|
| MM-DD | INC-001 | Ransomware | P1 | 0 systems lost | Isolated in 22 min |

## Recommendations
1. [Budget/tool request if any]
2. [Staffing recommendation if any]
3. [Process improvement planned]

## Next Month Focus
- [ ] [Key initiative 1]
- [ ] [Key initiative 2]
```

---

## Presentation Tips

```
📊 Executive Dashboard Best Practices:
1. Lead with business impact, not technical details
2. Use RED/AMBER/GREEN indicators — executives scan, don't read
3. Always show trends (up/down vs last period)
4. Keep to 1 page / 1 screen — less is more
5. Highlight wins AND risks — balanced view builds trust
6. Prepare 3 talking points before any meeting
7. Have drill-down data ready but don't show it unless asked
8. Translate "alerts" into "business risk prevented"
```

---

## Related Documents

- [SOC Metrics & KPIs](SOC_Metrics.en.md)
- [Monthly SOC Report Template](../11_Reporting_Templates/Monthly_SOC_Report.en.md)
- [Quarterly Business Review](../11_Reporting_Templates/Quarterly_Business_Review.en.md)
- [SLA Template](SLA_Template.en.md)
