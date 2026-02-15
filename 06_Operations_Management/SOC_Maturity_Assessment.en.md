# SOC Maturity Assessment

**Document ID**: OPS-SOP-015
**Version**: 1.0
**Classification**: Internal
**Last Updated**: 2026-02-15

> A **self-assessment tool** to measure SOC capability maturity across 10 domains. Use quarterly to track progress, identify gaps, plan investments, and report to leadership. Based on SOC-CMM (SOC Capability Maturity Model) principles.

---

## Maturity Levels

| Level | Name | Description |
|:---:|:---|:---|
| **0** | Non-existent | No capability, no awareness |
| **1** | Initial | Ad-hoc, reactive, person-dependent, undocumented |
| **2** | Managed | Basic processes defined, partially documented, inconsistently followed |
| **3** | Defined | Standardized processes, documented SOPs, consistently followed |
| **4** | Quantitative | Metrics-driven, KPIs tracked, continuous measurement |
| **5** | Optimizing | Continuous improvement, automated, industry-leading |

```mermaid
graph LR
    L0[0 Non-existent] --> L1[1 Initial]
    L1 --> L2[2 Managed]
    L2 --> L3[3 Defined]
    L3 --> L4[4 Quantitative]
    L4 --> L5[5 Optimizing]

    style L0 fill:#dc2626,color:#fff
    style L1 fill:#f97316,color:#fff
    style L2 fill:#eab308,color:#000
    style L3 fill:#22c55e,color:#fff
    style L4 fill:#3b82f6,color:#fff
    style L5 fill:#8b5cf6,color:#fff
```

---

## Assessment Domains

### Domain 1: People & Organization

| # | Capability | Level 1 | Level 3 | Level 5 | Current | Target |
|:---:|:---|:---|:---|:---|:---:|:---:|
| 1.1 | **Staffing** | Understaffed, single shift | 24×7 coverage, defined tiers | Flexible model, cross-trained | __/5 | __/5 |
| 1.2 | **Roles & responsibilities** | Informal, unclear | Documented, RACI defined | Dynamic, skill-based routing | __/5 | __/5 |
| 1.3 | **Training program** | No formal training | Annual training plan, certs tracked | CTF, purple team, career paths | __/5 | __/5 |
| 1.4 | **Knowledge management** | Tribal knowledge | Wiki, runbooks documented | Searchable KB, auto-suggestions | __/5 | __/5 |
| 1.5 | **Analyst retention** | High turnover (> 30%) | Moderate (15–30%) | Low (< 15%), clear growth path | __/5 | __/5 |

**Domain Score**: \_\_/25

---

### Domain 2: Process & Procedures

| # | Capability | Level 1 | Level 3 | Level 5 | Current | Target |
|:---:|:---|:---|:---|:---|:---:|:---:|
| 2.1 | **Alert triage process** | Ad-hoc, no standard | Documented runbook | Automated triage + ML scoring | __/5 | __/5 |
| 2.2 | **Incident response** | Reactive, no playbooks | 15+ playbooks, exercised annually | 30+ playbooks, automated response | __/5 | __/5 |
| 2.3 | **Escalation procedures** | Informal, person-dependent | Documented matrix, SLAs defined | Auto-escalation, SOAR-integrated | __/5 | __/5 |
| 2.4 | **Change management** | No change process | CAB reviews, documented changes | Automated CI/CD for detection | __/5 | __/5 |
| 2.5 | **Shift handoff** | Verbal only | Standardized template | Automated handoff with context | __/5 | __/5 |

**Domain Score**: \_\_/25

---

### Domain 3: Technology & Tools

| # | Capability | Level 1 | Level 3 | Level 5 | Current | Target |
|:---:|:---|:---|:---|:---|:---:|:---:|
| 3.1 | **SIEM** | Basic deployment, limited rules | Tuned rules, 80%+ log sources | Full ATT&CK coverage, ML models | __/5 | __/5 |
| 3.2 | **EDR** | Antivirus only | EDR deployed, alerts in SIEM | XDR with auto-containment | __/5 | __/5 |
| 3.3 | **SOAR** | No automation | Basic playbooks (5+) | Full automation catalog (30+) | __/5 | __/5 |
| 3.4 | **Threat intelligence** | No TI feeds | 3+ feeds integrated, IOC matching | TI platform, automated hunting | __/5 | __/5 |
| 3.5 | **Ticketing system** | Email/spreadsheet | Dedicated ticketing, SLA tracking | Integrated ITSM + SOAR | __/5 | __/5 |

**Domain Score**: \_\_/25

---

### Domain 4: Detection Engineering

| # | Capability | Level 1 | Level 3 | Level 5 | Current | Target |
|:---:|:---|:---|:---|:---|:---:|:---:|
| 4.1 | **Detection rules** | Vendor defaults only | Custom rules, tested | DaC pipeline, version-controlled | __/5 | __/5 |
| 4.2 | **ATT&CK coverage** | < 20% techniques | 40–60% techniques | > 80% techniques | __/5 | __/5 |
| 4.3 | **False positive management** | > 50% FP rate | < 30% FP rate, tuning process | < 10% FP, auto-tuning | __/5 | __/5 |
| 4.4 | **Detection testing** | No testing | Annual purple team | Continuous BAS + automated testing | __/5 | __/5 |
| 4.5 | **Rule lifecycle** | No lifecycle | Create/review/retire process | Metrics-driven, auto-deprecation | __/5 | __/5 |

**Domain Score**: \_\_/25

---

### Domain 5: Log Management & Visibility

| # | Capability | Level 1 | Level 3 | Level 5 | Current | Target |
|:---:|:---|:---|:---|:---|:---:|:---:|
| 5.1 | **Log source coverage** | < 30% of assets | 60–80% of assets | > 95% of assets | __/5 | __/5 |
| 5.2 | **Log quality** | Raw, unparsed | Parsed, normalized | Enriched, correlated | __/5 | __/5 |
| 5.3 | **Retention** | < 30 days | 90–180 days | 1+ year, tiered storage | __/5 | __/5 |
| 5.4 | **Log source health** | No monitoring | Manual checks | Automated health alerts | __/5 | __/5 |
| 5.5 | **Cloud visibility** | No cloud logs | Basic cloud logs (IAM, network) | Full cloud trail + CSPM | __/5 | __/5 |

**Domain Score**: \_\_/25

---

### Domain 6: Incident Response

| # | Capability | Level 1 | Level 3 | Level 5 | Current | Target |
|:---:|:---|:---|:---|:---|:---:|:---:|
| 6.1 | **Response time (MTTR)** | > 4 hours | 1–4 hours | < 30 minutes | __/5 | __/5 |
| 6.2 | **Containment capability** | Manual, slow | Semi-automated | Fully automated containment | __/5 | __/5 |
| 6.3 | **Forensics capability** | None | Basic (disk, logs) | Full (memory, network, malware RE) | __/5 | __/5 |
| 6.4 | **Communication** | Ad-hoc notifications | Templates, stakeholder matrix | Automated notification workflows | __/5 | __/5 |
| 6.5 | **Post-incident review** | None | Lessons learned per P1/P2 | Systematic, metrics-tracked | __/5 | __/5 |

**Domain Score**: \_\_/25

---

### Domain 7: Threat Intelligence

| # | Capability | Level 1 | Level 3 | Level 5 | Current | Target |
|:---:|:---|:---|:---|:---|:---:|:---:|
| 7.1 | **TI consumption** | No TI feeds | Multiple feeds, auto-ingested | TIP with scoring, prioritization | __/5 | __/5 |
| 7.2 | **TI production** | No internal TI | IOCs from incidents shared | Full TI reports, industry sharing | __/5 | __/5 |
| 7.3 | **Threat hunting** | No hunting | Quarterly hunts, hypothesis-based | Continuous, automated hunting | __/5 | __/5 |
| 7.4 | **TI integration** | Manual lookups | Auto-enrichment in SIEM | TI drives detection + response | __/5 | __/5 |
| 7.5 | **Threat landscape** | No awareness | Quarterly reports | Real-time landscape dashboard | __/5 | __/5 |

**Domain Score**: \_\_/25

---

### Domain 8: Metrics & Reporting

| # | Capability | Level 1 | Level 3 | Level 5 | Current | Target |
|:---:|:---|:---|:---|:---|:---:|:---:|
| 8.1 | **KPI tracking** | None | Monthly KPI report | Real-time dashboard | __/5 | __/5 |
| 8.2 | **SLA measurement** | No SLAs | SLAs defined and measured | Automated SLA tracking + alerts | __/5 | __/5 |
| 8.3 | **Executive reporting** | Ad-hoc | Monthly report template | Automated dashboards, board-ready | __/5 | __/5 |
| 8.4 | **Trend analysis** | No trend data | 6-month trends | Predictive analytics | __/5 | __/5 |
| 8.5 | **Benchmarking** | No benchmarks | Internal benchmarks | Industry benchmarks (peers) | __/5 | __/5 |

**Domain Score**: \_\_/25

---

### Domain 9: Compliance & Governance

| # | Capability | Level 1 | Level 3 | Level 5 | Current | Target |
|:---:|:---|:---|:---|:---|:---:|:---:|
| 9.1 | **Regulatory compliance** | Unknown status | Mapped to frameworks | Continuous compliance monitoring | __/5 | __/5 |
| 9.2 | **Audit readiness** | Not audit-ready | Evidence collected, matrices ready | Always-on audit evidence | __/5 | __/5 |
| 9.3 | **Data privacy** | No PDPA awareness | PDPA procedures documented | Automated PII detection + response | __/5 | __/5 |
| 9.4 | **Policy enforcement** | No enforcement | Periodic reviews | Real-time policy monitoring | __/5 | __/5 |
| 9.5 | **Risk management** | No risk tracking | Risk register maintained | Dynamic risk scoring | __/5 | __/5 |

**Domain Score**: \_\_/25

---

### Domain 10: Automation & Orchestration

| # | Capability | Level 1 | Level 3 | Level 5 | Current | Target |
|:---:|:---|:---|:---|:---|:---:|:---:|
| 10.1 | **Alert enrichment** | Manual lookups | Auto-enrichment (50%+ alerts) | Full auto-enrichment + scoring | __/5 | __/5 |
| 10.2 | **Playbook automation** | No automation | 10+ SOAR playbooks | 30+ playbooks, self-healing | __/5 | __/5 |
| 10.3 | **Automated response** | None | Auto-contain for P1 (with approval) | Full auto-response (most scenarios) | __/5 | __/5 |
| 10.4 | **Integration maturity** | Siloed tools | Basic API integrations | Fully orchestrated tool ecosystem | __/5 | __/5 |
| 10.5 | **AI/ML adoption** | None | Anomaly detection prototypes | Production ML models, analyst assist | __/5 | __/5 |

**Domain Score**: \_\_/25

---

## Summary Scorecard

| # | Domain | Score | Max | % | Level |
|:---:|:---|:---:|:---:|:---:|:---:|
| 1 | People & Organization | _____ | 25 | ___% | L_ |
| 2 | Process & Procedures | _____ | 25 | ___% | L_ |
| 3 | Technology & Tools | _____ | 25 | ___% | L_ |
| 4 | Detection Engineering | _____ | 25 | ___% | L_ |
| 5 | Log Management & Visibility | _____ | 25 | ___% | L_ |
| 6 | Incident Response | _____ | 25 | ___% | L_ |
| 7 | Threat Intelligence | _____ | 25 | ___% | L_ |
| 8 | Metrics & Reporting | _____ | 25 | ___% | L_ |
| 9 | Compliance & Governance | _____ | 25 | ___% | L_ |
| 10 | Automation & Orchestration | _____ | 25 | ___% | L_ |
| | **TOTAL** | **_____** | **250** | **___%** | **L_** |

### Level Interpretation

| Score Range | Overall Level | Interpretation |
|:---:|:---:|:---|
| 0–50 (0–20%) | **Level 1** | Initial — Major gaps, reactive posture |
| 51–100 (21–40%) | **Level 2** | Managed — Basic capabilities, significant improvement needed |
| 101–150 (41–60%) | **Level 3** | Defined — Solid foundation, room for optimization |
| 151–200 (61–80%) | **Level 4** | Quantitative — Metrics-driven, maturing well |
| 201–250 (81–100%) | **Level 5** | Optimizing — Industry-leading, continuous improvement |

---

## Radar Chart Template

```mermaid
---
config:
  radar:
    axisLabelFontSize: 12
---
radar-beta
  axis People, Process, Technology, Detection, "Log Mgmt", IR, TI, Metrics, Compliance, Automation
  curve "Current" { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 }
  curve "Target" { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 }
```

> Replace zeros with actual percentage scores (0–100).

---

## Improvement Roadmap

### Quick Wins (0–3 months)

| Gap | Domain | Current | Target | Action | Effort |
|:---|:---:|:---:|:---:|:---|:---:|
| ______________ | _____ | L_ | L_ | ________________________ | ___ days |
| ______________ | _____ | L_ | L_ | ________________________ | ___ days |

### Medium-Term (3–6 months)

| Gap | Domain | Current | Target | Action | Effort |
|:---|:---:|:---:|:---:|:---|:---:|
| ______________ | _____ | L_ | L_ | ________________________ | ___ weeks |
| ______________ | _____ | L_ | L_ | ________________________ | ___ weeks |

### Strategic (6–12 months)

| Gap | Domain | Current | Target | Action | Effort | Budget |
|:---|:---:|:---:|:---:|:---|:---:|:---:|
| ______________ | _____ | L_ | L_ | ________________________ | ___ months | $_____ |

---

## Assessment Schedule

| Activity | Frequency | Participants | Output |
|:---|:---:|:---|:---|
| Full maturity assessment | Quarterly | SOC Manager, Team Leads, CISO | Scorecard + roadmap |
| Domain deep-dive | Monthly (rotating) | Domain leads | Domain improvement plan |
| Benchmark comparison | Annually | External assessor | Industry comparison report |
| Board presentation | Semi-annually | CISO | Executive maturity summary |

---

## Related Documents

-   [SOC Metrics & KPIs](SOC_Metrics.en.md) — Performance measurement
-   [KPI Dashboard Template](KPI_Dashboard_Template.en.md) — Monthly reporting
-   [SOC Automation Catalog](SOC_Automation_Catalog.en.md) — Automation maturity
-   [Log Source Matrix](Log_Source_Matrix.en.md) — Data source coverage
-   [Compliance Mapping](../10_Compliance/Compliance_Mapping.en.md) — Framework compliance
-   [Third-Party Risk](Third_Party_Risk.en.md) — Vendor risk management
-   [Threat Landscape Report](Threat_Landscape_Report.en.md) — Threat awareness
