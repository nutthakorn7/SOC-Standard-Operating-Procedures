# Compliance Mapping — SOC Playbooks × Frameworks

> **Document ID:** COMP-MAP-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Owner:** SOC Manager / Compliance Officer  

---

## Purpose

This document maps all **30 SOC Playbooks**, **33 Sigma Detection Rules**, and key SOC operational controls to three major compliance frameworks:

- **ISO/IEC 27001:2022** — Information Security Management System
- **NIST Cybersecurity Framework (CSF) 2.0** — Identify, Protect, Detect, Respond, Recover
- **PCI DSS v4.0** — Payment Card Industry Data Security Standard

Use this mapping for **audit preparation**, **gap analysis**, and **demonstrating SOC coverage** to auditors and regulators.

---

## Playbook → Framework Mapping

### PB-01 to PB-10 (Core Playbooks)

| Playbook | ISO 27001:2022 | NIST CSF 2.0 | PCI DSS v4.0 |
|:---|:---|:---|:---|
| **PB-01** Phishing | A.5.23 (Information security for cloud), A.8.7 (Malware protection) | DE.AE-2, DE.AE-3, RS.AN-1, RS.MI-1 | 5.3, 12.10.5 |
| **PB-02** Ransomware | A.8.7 (Malware protection), A.8.13 (Information backup), A.8.14 (Redundancy) | DE.AE-3, RS.MI-1, RS.MI-2, RC.RP-1 | 5.2, 5.3, 12.10.5 |
| **PB-03** Malware Infection | A.8.7 (Malware protection), A.8.23 (Web filtering) | DE.CM-4, DE.AE-3, RS.MI-1 | 5.2, 5.3, 11.5.1 |
| **PB-04** Brute Force | A.8.5 (Secure authentication), A.5.17 (Authentication info) | DE.CM-1, DE.AE-2, PR.AC-7 | 8.2.4, 8.3.4, 10.7 |
| **PB-05** Account Compromise | A.5.16 (Identity management), A.8.5 (Secure authentication) | DE.AE-3, RS.AN-1, PR.AC-1 | 8.2, 8.3, 10.6.1 |
| **PB-06** Impossible Travel | A.8.5 (Secure authentication), A.8.15 (Logging) | DE.AE-2, DE.AE-5, RS.AN-1 | 10.6.1, 10.7 |
| **PB-07** Privilege Escalation | A.8.2 (Privileged access rights), A.8.18 (Use of privileged utility) | DE.CM-3, DE.AE-3, PR.AC-4 | 7.1, 7.2, 10.2.1 |
| **PB-08** Data Exfiltration | A.8.12 (Data leakage prevention), A.8.10 (Information deletion) | DE.AE-3, DE.CM-7, RS.MI-1 | 3.4, 10.6.1, 12.10.5 |
| **PB-09** DDoS Attack | A.8.20 (Network security), A.8.22 (Segregation of networks) | DE.AE-1, RS.MI-1, RS.MI-2 | 11.5.1, 12.10.5 |
| **PB-10** Web App Attack | A.8.26 (Application security requirements), A.8.28 (Secure coding) | DE.CM-6, DE.AE-3, RS.MI-1 | 6.2, 6.4, 11.5.1 |

### PB-11 to PB-20 (Advanced Playbooks)

| Playbook | ISO 27001:2022 | NIST CSF 2.0 | PCI DSS v4.0 |
|:---|:---|:---|:---|
| **PB-11** Suspicious Script | A.8.7 (Malware protection), A.8.19 (Installation of software) | DE.CM-4, DE.AE-3, RS.AN-1 | 5.3, 11.5.1 |
| **PB-12** Lateral Movement | A.8.22 (Segregation of networks), A.8.20 (Network security) | DE.CM-1, DE.CM-7, RS.MI-1 | 1.3, 11.4, 11.5.1 |
| **PB-13** C2 Communication | A.8.20 (Network security), A.8.23 (Web filtering) | DE.CM-1, DE.AE-2, RS.AN-1 | 1.3, 10.6.1, 11.5.1 |
| **PB-14** Insider Threat | A.5.9 (Inventory of information), A.6.1 (Screening) | DE.CM-3, DE.AE-5, RS.AN-1 | 7.1, 7.2, 10.2.1 |
| **PB-15** Rogue Admin | A.8.2 (Privileged access rights), A.5.18 (Access rights) | DE.CM-3, DE.AE-3, PR.AC-4 | 7.1, 7.2, 10.2.1 |
| **PB-16** Cloud IAM Anomaly | A.5.23 (Cloud services), A.8.2 (Privileged access rights) | DE.AE-2, DE.CM-3, PR.AC-4 | 7.1, 8.3, 10.6.1 |
| **PB-17** Business Email Compromise | A.5.14 (Information transfer), A.8.7 (Malware protection) | DE.AE-3, RS.AN-1, RS.MI-1 | 5.3, 12.10.5 |
| **PB-18** Exploit | A.8.8 (Technical vulnerability management), A.8.28 (Secure coding) | DE.CM-8, DE.AE-3, RS.MI-1 | 6.3.3, 11.3, 11.5.1 |
| **PB-19** Lost/Stolen Device | A.7.9 (Security of assets off-premises), A.8.1 (User endpoint devices) | RS.MI-1, RS.AN-1, PR.DS-3 | 9.4, 9.5, 12.10.5 |
| **PB-20** Log Clearing | A.8.15 (Logging), A.8.17 (Clock synchronization) | DE.CM-3, DE.AE-5, PR.PT-1 | 10.3, 10.5, 10.7 |

### PB-21 to PB-25 (New Playbooks)

| Playbook | ISO 27001:2022 | NIST CSF 2.0 | PCI DSS v4.0 |
|:---|:---|:---|:---|
| **PB-21** Supply Chain Attack | A.5.21 (ICT supply chain), A.5.22 (Supplier monitoring) | ID.SC-1, ID.SC-2, DE.CM-6, RS.MI-1 | 6.3.2, 12.8, 12.9 |
| **PB-22** API Abuse | A.8.26 (Application security), A.8.25 (Secure development lifecycle) | DE.CM-6, DE.AE-2, PR.AC-7 | 6.2, 6.4, 11.5.1 |
| **PB-23** Cryptomining | A.8.7 (Malware protection), A.8.20 (Network security) | DE.CM-4, DE.AE-3, RS.MI-1 | 5.2, 5.3, 11.5.1 |
| **PB-24** DNS Tunneling | A.8.20 (Network security), A.8.23 (Web filtering) | DE.CM-1, DE.AE-2, RS.MI-1 | 1.3, 10.6.1, 11.5.1 |
| **PB-25** Zero-Day Exploit | A.8.8 (Vulnerability management), A.5.7 (Threat intelligence) | DE.CM-8, RS.AN-5, RS.MI-1 | 6.3.3, 11.3, 12.10.5 |

### PB-26 to PB-30 (Coverage Expansion)

| Playbook | ISO 27001:2022 | NIST CSF 2.0 | PCI DSS v4.0 |
|:---|:---|:---|:---|
| **PB-26** MFA Bypass / Token Theft | A.8.5 (Secure authentication), A.5.17 (Authentication info) | DE.AE-2, DE.CM-3, PR.AC-7 | 8.3, 8.4, 8.5 |
| **PB-27** Cloud Storage Exposure | A.5.23 (Cloud services), A.8.10 (Information deletion) | DE.CM-7, RS.MI-1, PR.DS-1 | 3.4, 3.5, 10.6.1 |
| **PB-28** Mobile Device Compromise | A.8.1 (User endpoint devices), A.7.9 (Off-premises assets) | DE.CM-4, RS.MI-1, PR.AC-3 | 9.4, 9.5, 12.3 |
| **PB-29** Shadow IT | A.5.23 (Cloud services), A.8.23 (Web filtering) | DE.CM-7, ID.AM-2, PR.AC-4 | 6.4, 12.8, 12.10.5 |
| **PB-30** OT/ICS Incident | A.8.20 (Network security), A.8.22 (Network segregation) | DE.CM-1, RS.RP-1, PR.AC-5 | 1.3, 11.4, 11.5.1 |

---

## SOC Operational Controls Mapping

| SOC Control | ISO 27001:2022 | NIST CSF 2.0 | PCI DSS v4.0 |
|:---|:---|:---|:---|
| **24/7 SOC Monitoring** | A.8.16 (Monitoring activities) | DE.CM-1, DE.CM-6, DE.CM-7 | 10.6.1, 10.6.3, 12.10 |
| **Incident Response Framework** | A.5.24 (IR planning), A.5.26 (Response to incidents) | RS.RP-1, RS.CO-1, RS.AN-1 | 12.10.1, 12.10.2 |
| **Severity Classification (P1–P4)** | A.5.25 (Assessment of incidents) | RS.AN-4, RS.CO-3 | 12.10.1, 12.10.4 |
| **Escalation Procedures** | A.5.26 (Response to incidents) | RS.CO-2, RS.CO-4, RS.RP-1 | 12.10.1, 12.10.6 |
| **Shift Handover Process** | A.5.37 (Documented operating procedures) | PR.IP-9, RS.CO-1 | 12.10.2 |
| **Detection Rules (Sigma)** | A.8.16 (Monitoring activities) | DE.CM-1, DE.DP-2, DE.DP-5 | 10.6.1, 11.5.1 |
| **MITRE ATT&CK Mapping** | A.5.7 (Threat intelligence) | ID.RA-2, DE.AE-1 | 12.10.5 |
| **Post-Incident Review** | A.5.27 (Learning from incidents) | RS.IM-1, RS.IM-2 | 12.10.6 |
| **Log Retention (≥1 year)** | A.8.15 (Logging) | PR.PT-1, DE.CM-3 | 10.5, 10.7 |
| **Vulnerability Management** | A.8.8 (Technical vulnerability management) | DE.CM-8, ID.RA-1 | 6.3.3, 11.3 |
| **Access Control / IAM** | A.8.2, A.8.3, A.5.15 | PR.AC-1, PR.AC-4 | 7.1, 7.2, 8.2 |
| **Security Awareness Training** | A.6.3 (Information security awareness) | PR.AT-1, PR.AT-2 | 12.6.1, 12.6.2 |
| **Data Classification** | A.5.12 (Classification of information) | ID.AM-5, PR.DS-1 | 3.2, 3.4, 9.6 |
| **Backup & Recovery** | A.8.13 (Information backup) | PR.IP-4, RC.RP-1 | 12.10.1 |

---

## Framework Coverage Summary

### ISO 27001:2022 Coverage

| Annex A Domain | Controls Covered | Key Controls |
|:---|:---:|:---|
| A.5 Organizational | 12 / 37 | A.5.7, A.5.12, A.5.21, A.5.24–A.5.27 |
| A.6 People | 2 / 8 | A.6.1, A.6.3 |
| A.7 Physical | 1 / 14 | A.7.9 |
| A.8 Technological | 18 / 34 | A.8.2, A.8.5, A.8.7, A.8.8, A.8.12, A.8.15, A.8.16, A.8.20 |

### NIST CSF 2.0 Coverage

| Function | Categories Covered | SOC Coverage Level |
|:---|:---:|:---|
| **Identify (ID)** | ID.AM, ID.RA, ID.SC | 🟡 Partial — asset inventory & supply chain |
| **Protect (PR)** | PR.AC, PR.AT, PR.DS, PR.IP, PR.PT | 🟡 Partial — access control & training |
| **Detect (DE)** | DE.AE, DE.CM, DE.DP | 🟢 Strong — 28 Sigma rules + monitoring |
| **Respond (RS)** | RS.RP, RS.CO, RS.AN, RS.MI, RS.IM | 🟢 Strong — 30 playbooks + severity matrix |
| **Recover (RC)** | RC.RP, RC.IM, RC.CO | 🟡 Partial — backup & communication |

### PCI DSS v4.0 Coverage

| Requirement | SOC Coverage |
|:---|:---|
| Req 1 — Network Security Controls | 🟢 PB-12, PB-13, PB-24 |
| Req 3 — Protect Stored Account Data | 🟡 PB-08, Data Classification |
| Req 5 — Malware Protection | 🟢 PB-01, PB-02, PB-03, PB-23 |
| Req 6 — Secure Development | 🟢 PB-10, PB-18, PB-21, PB-22, PB-25 |
| Req 7 — Restrict Access | 🟢 PB-07, PB-14, PB-15, PB-16 |
| Req 8 — Identify Users | 🟢 PB-04, PB-05, PB-06 |
| Req 9 — Physical Access | 🟡 PB-19 |
| Req 10 — Log & Monitor | 🟢 28 Sigma rules + SOC monitoring |
| Req 11 — Test Security | 🟢 Detection rules + simulation guide |
| Req 12 — Security Policies | 🟢 IR framework + severity matrix |

---

## Audit Quick Reference

### For ISO 27001 Auditors

> "Show me your incident response procedures."  
→ [IR Framework](../05_Incident_Response/Framework.en.md) + [Severity Matrix](../05_Incident_Response/Severity_Matrix.en.md) + any Playbook (PB-01 to PB-30)

> "Show me your monitoring and detection capabilities."  
→ [Detection Rules Index](../07_Detection_Rules/README.md) (33 Sigma rules) + [MITRE ATT&CK Heatmap](../tools/mitre_attack_heatmap.html)

> "Show me evidence of incident learning."  
→ [Post-Incident Review section](../05_Incident_Response/Framework.en.md) in all playbooks

### For PCI DSS QSA

> "Requirement 10.6.1 — Daily log reviews?"  
→ [SOC Metrics & KPIs](../06_Operations_Management/SOC_Metrics.en.md) + 24/7 monitoring procedures

> "Requirement 12.10.1 — Incident response plan?"  
→ [IR Framework](../05_Incident_Response/Framework.en.md) + [Severity Matrix](../05_Incident_Response/Severity_Matrix.en.md)

> "Requirement 11.5.1 — Intrusion detection?"  
→ [33 Sigma Detection Rules](../07_Detection_Rules/README.md) with MITRE ATT&CK mapping

---

## Related Documents

- [IR Framework](../05_Incident_Response/Framework.en.md)
- [Severity Matrix](../05_Incident_Response/Severity_Matrix.en.md)
- [Detection Rules Index](../07_Detection_Rules/README.md)
- [MITRE ATT&CK Heatmap](../tools/mitre_attack_heatmap.html)
- [SOC Maturity Scorer](../tools/soc_maturity_scorer.html)

## References

- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [PCI DSS v4.0](https://www.pcisecuritystandards.org/document_library/)
- [MITRE ATT&CK Framework](https://attack.mitre.org/)
