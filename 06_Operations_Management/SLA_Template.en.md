# SOC Service Level Agreement (SLA) Template

> **Document ID:** SLA-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Between:** [SOC Team] and [Business Unit / Management]

---

## Purpose

This SLA defines the expected service levels for the Security Operations Center, including response times, escalation procedures, and reporting commitments. This template can be customized for your organization.

---

## Scope of Services

The SOC provides the following services:

| Service | Coverage | Description |
|:---|:---:|:---|
| Security Monitoring | 24/7 or 8/5 | Continuous monitoring of security alerts |
| Incident Response | 24/7 or 8/5 | Investigation and response to security incidents |
| Threat Intelligence | Business hours | Threat landscape monitoring and IOC management |
| Vulnerability Alerts | Business hours | Notification of critical vulnerabilities |
| Compliance Monitoring | Business hours | Regulatory compliance monitoring |
| Reporting | Monthly | Operational reports and metrics |

> ⚠️ **Out of Scope:** Penetration testing, application development security review, physical security, IT helpdesk.

---

## Incident Severity Classification

| Severity | Definition | Examples |
|:---|:---|:---|
| **P1 — Critical** | Active attack, data breach, business disruption | Ransomware, active data exfiltration, production down |
| **P2 — High** | Confirmed compromise, potential data breach | Account takeover, malware execution, lateral movement |
| **P3 — Medium** | Suspicious activity requiring investigation | Brute force attempts, policy violation, anomalous behavior |
| **P4 — Low** | Informational, minor policy violation | Failed scans, low-risk alerts, misconfigurations |

---

## Response Time SLA

### Initial Response Time

| Severity | Response Time | Escalation Time | Resolution Target |
|:---:|:---:|:---:|:---:|
| **P1 — Critical** | ≤ 15 minutes | ≤ 30 minutes | ≤ 4 hours (containment) |
| **P2 — High** | ≤ 30 minutes | ≤ 2 hours | ≤ 8 hours |
| **P3 — Medium** | ≤ 4 hours | ≤ 8 hours | ≤ 3 business days |
| **P4 — Low** | ≤ 8 hours | N/A | ≤ 5 business days |

### Definition of Terms

- **Response Time:** Time from alert detection to first analyst action
- **Escalation Time:** Time from detection to notifying the appropriate management
- **Resolution Target:** Time from detection to containment/resolution (best effort)

### SLA Clock Rules

- P1/P2: Clock runs **24/7** (no pause for weekends)
- P3/P4: Clock runs **business hours** only (Mon–Fri 08:00–17:00)
- Clock pauses when: waiting for customer input, approved maintenance window

---

## Escalation Matrix

| Level | Who | When | Contact |
|:---:|:---|:---|:---|
| **L1** | SOC Analyst (T1) | All alerts | [SOC hotline / Slack] |
| **L2** | Senior Analyst (T2) | T1 can't resolve in 30 min | [Name, phone] |
| **L3** | IR Lead / SOC Manager | P1/P2 incidents | [Name, phone] |
| **L4** | CISO / CTO | Data breach, business impact | [Name, phone] |
| **L5** | CEO / Board | Regulatory notification required | [Name, phone] |

---

## Reporting Commitments

| Report | Frequency | Audience | Delivery |
|:---|:---:|:---|:---|
| Incident Notification | Real-time (P1/P2) | Management | Slack/email |
| Shift Handoff | Every shift | SOC team | Shared document |
| Weekly Summary | Weekly | SOC Manager | Email |
| Monthly SOC Report | Monthly | CISO, Management | Presentation + PDF |
| Quarterly Executive Brief | Quarterly | Board / Executive team | Presentation |

### Monthly Report Contents

```
1. Executive Summary
2. Incidents by Severity (P1/P2/P3/P4 counts)
3. MTTD / MTTR Trends
4. Top 10 Alert Categories
5. SLA Compliance %
6. Notable Incidents Summary
7. Detection Coverage Update
8. Recommendations
```

---

## Key Performance Indicators (KPIs)

| KPI | Target | Measurement |
|:---|:---:|:---|
| SLA Compliance (P1 response) | ≥ 95% | % of P1s responded within 15 min |
| SLA Compliance (P2 response) | ≥ 90% | % of P2s responded within 30 min |
| MTTD | ≤ 1 hour | Average time to detect incidents |
| MTTR | ≤ 4 hours | Average time to respond/contain |
| False Positive Rate | ≤ 40% | % of alerts that are not true threats |
| Alert Closure Rate | ≥ 95% | % of alerts processed within SLA |
| Analyst Utilization | 60–80% | Optimal workload balance |

---

## Availability & Maintenance

| Item | Commitment |
|:---|:---|
| SIEM availability | ≥ 99.5% uptime |
| Planned maintenance | 4-hour window, monthly, with 48h notice |
| Emergency maintenance | Justified, SOC remains operational |
| Failover | Backup analyst on-call if primary unavailable |

---

## Review & Amendments

| Item | Frequency |
|:---|:---|
| SLA review | Annually (or after major incident) |
| KPI targets review | Semi-annually |
| Contact information | Quarterly |
| Services scope | Annually |

---

## Signatures

```
SOC Manager:         _________________________ Date: ___________
CISO:                _________________________ Date: ___________
Business Unit Head:  _________________________ Date: ___________
```

---

## SLA Penalty / Credit Structure

### For Internal SOC

| SLA Breach | Impact | Escalation |
|:---|:---|:---|
| P1 MTTR > 4 hours | Incident review required | Auto-escalate to CISO |
| P2 MTTR > 8 hours | Post-mortem required | SOC Manager review |
| SLA compliance < 90% (monthly) | Improvement plan required | CISO + SOC Manager meeting |
| SLA compliance < 80% (monthly) | Staffing/tooling review | Board notification |

### For MSSP Contract

| SLA Level | Credit | Trigger |
|:---|:---|:---|
| Monthly SLA 95-99% | No penalty | Target met |
| Monthly SLA 90-94.9% | 5% monthly fee credit | Warning |
| Monthly SLA 85-89.9% | 10% monthly fee credit | Improvement plan |
| Monthly SLA < 85% | 20% credit + contract review | Remediation |
| P1 missed 3x in quarter | Contract termination right | Breach |

## Quarterly SLA Review Agenda

```markdown
## SLA Review Meeting — Q[X] 20XX

### Attendees
- SOC Manager, CISO, [MSSP rep if applicable]

### Agenda
1. **SLA Performance Summary** (10 min)
   - Overall SLA compliance rate
   - Breakdown by severity (P1/P2/P3/P4)
   - Trend vs. previous quarter

2. **SLA Breaches Analysis** (15 min)
   - List of all breaches with root cause
   - Patterns or recurring issues
   - Corrective actions taken

3. **KPI Deep Dive** (10 min)
   - MTTD / MTTR trends
   - Alert volume and FP rate trends
   - Staffing utilization

4. **Improvement Actions** (10 min)
   - Status of previous quarter's actions
   - New improvement proposals
   - Resource requests

5. **SLA Target Review** (5 min)
   - Are current targets appropriate?
   - Proposed adjustments for next quarter
```

## Related Documents

- [Severity Matrix](../05_Incident_Response/Severity_Matrix.en.md)
- [SOC Metrics](../06_Operations_Management/SOC_Metrics.en.md)
- [Communication Templates](../05_Incident_Response/Communication_Templates.en.md)
- [SOC Team Structure](../06_Operations_Management/SOC_Team_Structure.en.md)
