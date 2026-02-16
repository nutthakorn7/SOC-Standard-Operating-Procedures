# Analyst Training Checklist

> **Purpose**: Structured 8-week onboarding program for new SOC analysts. Ensures comprehensive coverage of tools, processes, and procedures before production rotation.

---

**Analyst Name**: ____________________
**Start Date**: YYYY-MM-DD
**Mentor**: ____________________
**SOC Manager**: ____________________
**Target Completion**: 8 weeks

---

## Week 1: Environment & Access

| # | Task | Resource | Done |
|:---:|:---|:---|:---:|
| 1.1 | Receive laptop, badge, credentials | IT Ops | ☐ |
| 1.2 | Complete security clearance / NDA | HR + Legal | ☐ |
| 1.3 | Access provisioned: SIEM, EDR, SOAR, Ticketing | IAM Team | ☐ |
| 1.4 | Read: [System Activation](../10_Training_Onboarding/System_Activation.en.md) | Self-study | ☐ |
| 1.5 | Read: [Data Governance Policy](../07_Compliance_Privacy/Data_Governance_Policy.en.md) | Self-study | ☐ |
| 1.6 | Read: [Change Management (RFC)](../06_Operations_Management/Change_Management.en.md) | Self-study | ☐ |
| 1.7 | Tour: SOC facility, war room, escalation phones | Mentor | ☐ |

**✅ Checkpoint**: Successfully navigated SIEM Dashboard, can locate alert queue.
**Mentor Signature**: ________ **Date**: ________

---

## Week 2: SOC Operations

| # | Task | Resource | Done |
|:---:|:---|:---|:---:|
| 2.1 | Read: [Shift Handoff Standard](../06_Operations_Management/Shift_Handoff.en.md) | Self-study | ☐ |
| 2.2 | Read: [Escalation Matrix](Escalation_Matrix.en.md) | Self-study | ☐ |
| 2.3 | Read: [SOC Metrics & KPIs](../06_Operations_Management/SOC_Metrics.en.md) | Self-study | ☐ |
| 2.4 | Read: [SOC Communication SOP](../06_Operations_Management/SOC_Communication.en.md) | Self-study | ☐ |
| 2.5 | Shadow: Observe 2 complete shift handoffs | Shift Lead | ☐ |
| 2.6 | Practice: Complete a shift handover log (mock) | Mentor | ☐ |

**✅ Checkpoint**: Explain shift handoff process, identify escalation contacts.
**Mentor Signature**: ________ **Date**: ________

---

## Week 3: Incident Response Framework

| # | Task | Resource | Done |
|:---:|:---|:---|:---:|
| 3.1 | Read: [IR Framework (NIST)](../05_Incident_Response/Framework.en.md) | Self-study | ☐ |
| 3.2 | Read: [Severity Matrix](../05_Incident_Response/Severity_Matrix.en.md) | Self-study | ☐ |
| 3.3 | Read: [Incident Classification](../05_Incident_Response/Incident_Classification.en.md) | Self-study | ☐ |
| 3.4 | Review: [Incident Report Template](../templates/incident_report.en.md) | Self-study | ☐ |
| 3.5 | Shadow: Observe Tier 2 handling a real incident | Tier 2 Analyst | ☐ |
| 3.6 | Study: RACI matrix — know who does what | Self-study | ☐ |

**✅ Checkpoint**: Explain the 6 IR phases and containment decision criteria for Critical vs High severity.
**Mentor Signature**: ________ **Date**: ________

---

## Week 4: Playbooks (Core Set)

| # | Task | Resource | Done |
|:---:|:---|:---|:---:|
| 4.1 | Read: [PB-01 Phishing](../05_Incident_Response/Playbooks/Phishing.en.md) | Self-study | ☐ |
| 4.2 | Read: [PB-02 Ransomware](../05_Incident_Response/Playbooks/Ransomware.en.md) | Self-study | ☐ |
| 4.3 | Read: [PB-03 Malware Infection](../05_Incident_Response/Playbooks/Malware_Infection.en.md) | Self-study | ☐ |
| 4.4 | Read: [PB-04 Account Compromise](../05_Incident_Response/Playbooks/Account_Compromise.en.md) | Self-study | ☐ |
| 4.5 | Read: [PB-05 BEC](../05_Incident_Response/Playbooks/BEC.en.md) | Self-study | ☐ |
| 4.6 | Walk-through: Execute phishing playbook on a mock alert | Mentor | ☐ |
| 4.7 | Walk-through: Execute malware playbook on a mock alert | Mentor | ☐ |

**✅ Checkpoint**: Explain the "Containment" step for Ransomware; demonstrate phishing triage on mock alert.
**Mentor Signature**: ________ **Date**: ________

---

## Week 5: Detection & Threat Intelligence

| # | Task | Resource | Done |
|:---:|:---|:---|:---:|
| 5.1 | Read: [Content Management Lifecycle](../03_User_Guides/Content_Management.en.md) | Self-study | ☐ |
| 5.2 | Read: [Threat Intelligence Lifecycle](../06_Operations_Management/Threat_Intelligence_Lifecycle.en.md) | Self-study | ☐ |
| 5.3 | Review: Sigma Rules Library (browse 10 rules) | Self-study | ☐ |
| 5.4 | Read: [Log Source Matrix](../06_Operations_Management/Log_Source_Matrix.en.md) | Self-study | ☐ |
| 5.5 | Practice: Write a basic SIEM correlation search | Mentor | ☐ |
| 5.6 | Practice: Enrich an IoC using VirusTotal and URLScan | Mentor | ☐ |

**✅ Checkpoint**: Explain logic of `proc_office_spawn_powershell.yml` Sigma rule; demonstrate IoC enrichment.
**Mentor Signature**: ________ **Date**: ________

---

## Week 6: Compliance & Data Handling

| # | Task | Resource | Done |
|:---:|:---|:---|:---:|
| 6.1 | Read: [PDPA Compliance](../07_Compliance_Privacy/PDPA_Compliance.en.md) | Self-study | ☐ |
| 6.2 | Read: [Data Handling Protocol](../06_Operations_Management/Data_Handling_Protocol.en.md) | Self-study | ☐ |
| 6.3 | Read: [Evidence Handling](../05_Incident_Response/Forensic_Investigation.en.md) | Self-study | ☐ |
| 6.4 | Quiz: Data classification — what is PII, what requires notification? | Mentor | ☐ |

**✅ Checkpoint**: Correctly classify 5 data scenarios by PDPA requirements.
**Mentor Signature**: ________ **Date**: ________

---

## Week 7: Simulation & Testing

| # | Task | Resource | Done |
|:---:|:---|:---|:---:|
| 7.1 | Read: [Simulation Guide](../09_Simulation_Testing/Simulation_Guide.en.md) | Self-study | ☐ |
| 7.2 | Read: [Atomic Test Map](../09_Simulation_Testing/Atomic_Test_Map.en.md) | Self-study | ☐ |
| 7.3 | Execute: Atomic Red Team Test (T1059.001 — PowerShell) | Lab | ☐ |
| 7.4 | Execute: Atomic Red Team Test (T1566.001 — Spearphishing) | Lab | ☐ |
| 7.5 | Verify: Confirm SIEM detected both simulations | Lab | ☐ |
| 7.6 | Participate: Tabletop exercise (IR scenario) | SOC Team | ☐ |

**✅ Checkpoint**: Successfully executed 2 Atomic tests, verified detection in SIEM, participated in tabletop.
**Mentor Signature**: ________ **Date**: ________

---

## Week 8: Validation & Graduation

| # | Task | Resource | Done |
|:---:|:---|:---|:---:|
| 8.1 | Handle: 5 real alerts independently (with mentor oversight) | Production | ☐ |
| 8.2 | Submit: Mock Incident Report (full lifecycle) | Template | ☐ |
| 8.3 | Complete: Written assessment (30 questions) | SOC Manager | ☐ |
| 8.4 | Complete: Practical assessment (mock triage + escalation) | SOC Manager | ☐ |
| 8.5 | Conduct: 1 shift handoff as incoming lead (supervised) | Shift Lead | ☐ |

**✅ Final Assessment**:

| Criteria | Score | Pass/Fail |
|:---|:---:|:---:|
| Written Assessment (≥ 80%) | ____/100 | ☐ |
| Practical Assessment (≥ 80%) | ____/100 | ☐ |
| Mock Incident Report Quality | ____/5 | ☐ |
| Mentor Recommendation | Yes/No | ☐ |

**🎓 Final Sign-off**: Ready for Production Rotation.

| Role | Name | Signature | Date |
|:---|:---|:---|:---|
| Analyst | | | |
| Mentor | | | |
| SOC Manager | | | |

---

## Recommended Certifications

| Certification | Provider | Level | Recommended Timeline |
|:---|:---|:---|:---|
| CompTIA Security+ | CompTIA | Entry | Before start |
| CompTIA CySA+ | CompTIA | Intermediate | Within 6 months |
| GIAC GSOC | SANS | Intermediate | Within 1 year |
| SC-200 | Microsoft | Intermediate | Within 6 months |
| BTL1 | Security Blue Team | Entry–Intermediate | Within 6 months |

---

## Related Documents

- [Analyst Onboarding Path](Analyst_Onboarding_Path.en.md) — Detailed onboarding roadmap
- [SOC Team Structure](../06_Operations_Management/SOC_Team_Structure.en.md) — Roles and career paths
- [Simulation Guide](../09_Simulation_Testing/Simulation_Guide.en.md) — Lab exercises
- [Incident Report Template](../templates/incident_report.en.md) — Report format

## References

- [SANS SOC Analyst Training](https://www.sans.org/cyber-security-courses/)
- [CompTIA CySA+ Certification](https://www.comptia.org/certifications/cybersecurity-analyst)
- [MITRE ATT&CK Training](https://attack.mitre.org/resources/training/)
- [Security Blue Team BTL1](https://www.securityblue.team/)
