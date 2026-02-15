# SOC Analyst Training Path — From Zero to Competent

> **Document ID:** TRAIN-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Audience:** New Analysts, SOC Managers, HR/L&D

---

## Training Philosophy

```
"You don't need a degree in cybersecurity to be a great SOC analyst.
 You need curiosity, discipline, and the right training path."
```

This guide provides a **structured 6-month curriculum** to take someone from IT basics to a competent SOC Tier 1 analyst, and a **12-month advanced path** to Tier 2.

---

## Prerequisites Assessment

Before starting, the candidate should be able to:

| Skill | Required Level | How to Test |
|:---|:---|:---|
| Basic computer literacy | Can use CLI | "Open terminal, navigate to a folder" |
| English reading | Intermediate | Security docs are mostly English |
| Willingness to learn | High | Interview for motivation |

If the candidate lacks these basics, add 4 weeks of pre-training (see Appendix).

---

## Phase 1: Foundations (Month 1–2)

### Month 1: IT & Networking Foundations

| Week | Topic | Resources | Hands-On Lab |
|:---:|:---|:---|:---|
| 1 | **Networking basics** — OSI model, TCP/IP, DNS, DHCP, NAT | CompTIA Network+ study guide, Professor Messer (YouTube) | Set up a home lab with VirtualBox |
| 2 | **Linux fundamentals** — File system, CLI, permissions, services | TryHackMe "Linux Fundamentals" (free) | Navigate Linux, find files, read logs |
| 3 | **Windows fundamentals** — AD basics, Event Viewer, services, registry | TryHackMe "Windows Fundamentals" (free) | Read Windows Event Logs, find services |
| 4 | **Network tools** — Wireshark, nmap, tcpdump, netstat | Wireshark official tutorials | Capture traffic, identify protocols |

**Assessment:** Written quiz + hands-on: "Given these packet captures, what happened?"

### Month 2: Security Foundations

| Week | Topic | Resources | Hands-On Lab |
|:---:|:---|:---|:---|
| 5 | **Security concepts** — CIA triad, authentication, encryption, hashing | CompTIA Security+ study guide | Hash a file, encrypt/decrypt with GPG |
| 6 | **Common attacks** — Phishing, malware types, social engineering | MITRE ATT&CK overview, TryHackMe "Intro to Cyber Security" | Analyze a phishing email header |
| 7 | **Vulnerability basics** — CVE, CVSS, patch management | NIST NVD, CVE.org | Look up a CVE, calculate CVSS score |
| 8 | **Security architecture** — Firewalls, IDS/IPS, DMZ, VPN | Network diagrams, TryHackMe "Network Security" | Draw your org's network diagram |

**Assessment:** CompTIA Security+ practice exam (target: >75%)

---

## Phase 2: SOC-Specific Skills (Month 3–4)

### Month 3: SIEM & Log Analysis

| Week | Topic | Resources | Hands-On Lab |
|:---:|:---|:---|:---|
| 9 | **SIEM fundamentals** — What is SIEM, how it works, data flow | Vendor training (Wazuh/Elastic/Splunk free courses) | Install Wazuh on a VM |
| 10 | **Log analysis** — Windows logs (4624/4625/4688), Linux logs, syslog | TryHackMe "SOC Level 1" path | Investigate 10 real-format log entries |
| 11 | **Search & query** — KQL, Lucene, SPL, regex basics | SIEM vendor documentation | Write 10 queries: find failed logins, process creation |
| 12 | **Dashboard & visualization** — Build a SOC dashboard | Wazuh/Kibana dashboard tutorial | Create a dashboard with 5 panels |

**Assessment:** "Given this SIEM data, find the brute force attack and document the timeline."

### Month 4: Alert Triage & Investigation

| Week | Topic | Resources | Hands-On Lab |
|:---:|:---|:---|:---|
| 13 | **Alert triage** — Severity classification, true vs false positive | [Severity Matrix](../05_Incident_Response/Severity_Matrix.en.md), [Tier 1 Runbook](../05_Incident_Response/Tier1_Runbook.en.md) | Triage 20 sample alerts |
| 14 | **IOC enrichment** — VirusTotal, AbuseIPDB, URLhaus, Shodan | LetsDefend.io free labs | Enrich 10 IOCs using free tools |
| 15 | **MITRE ATT&CK** — Tactics, techniques, procedures mapping | ATT&CK Navigator (online) | Map 5 alerts to ATT&CK techniques |
| 16 | **Ticket writing** — Proper documentation, evidence preservation | [Communication Templates](../05_Incident_Response/Communication_Templates.en.md) | Write 5 incident tickets from sample data |

**Assessment:** Full alert-to-ticket exercise — 10 alerts, complete triage pipeline.

---

## Phase 3: Incident Response (Month 5–6)

### Month 5: IR Process & Playbooks

| Week | Topic | Resources | Hands-On Lab |
|:---:|:---|:---|:---|
| 17 | **IR framework** — Preparation, Detection, Containment, Eradication, Recovery, Lessons | [IR Framework](../05_Incident_Response/Framework.en.md) | Walk through the IR framework with a scenario |
| 18 | **Playbook drills** — PB-01 to PB-05 (Phishing, Ransomware, Malware, Brute Force, Account) | [Playbooks](../05_Incident_Response/Playbooks/) | Execute each playbook step-by-step with simulated data |
| 19 | **Containment actions** — Isolate host, block IP, disable account, reset password | EDR/SIEM documentation | Practice containment in lab environment |
| 20 | **Evidence handling** — Order of volatility, chain of custody, screenshots | [Evidence Collection](../05_Incident_Response/Evidence_Collection.en.md) | Collect evidence from a compromised VM |

### Month 6: Advanced Topics & Certification

| Week | Topic | Resources | Hands-On Lab |
|:---:|:---|:---|:---|
| 21 | **Threat intelligence** — IOC management, TI feeds, MISP basics | [TI Lifecycle](../06_Operations_Management/Threat_Intelligence_Lifecycle.en.md) | Add IOCs to a TI platform |
| 22 | **Tabletop exercise** — Participate in a group exercise | [Tabletop Exercises](../05_Incident_Response/Tabletop_Exercises.en.md) | Join a tabletop as a player |
| 23 | **Cert prep** — CompTIA Security+ / CySA+ / SC-900 | Practice exams | Take 3 practice exams |
| 24 | **Final assessment** — Full scenario test | Internal SOC team | Solo handle a multi-stage incident simulation |

**Final Assessment:** Complete a 2-hour scenario: detect, triage, investigate, contain, document, and debrief. Score using [Tabletop Scoring Rubric](../05_Incident_Response/Tabletop_Exercises.en.md).

---

## Phase 4: Tier 2 Advanced Path (Month 7–12)

| Month | Focus | Key Skills |
|:---:|:---|:---|
| 7 | **Deep Windows forensics** | Memory analysis (Volatility), registry forensics, prefetch, shimcache |
| 8 | **Network forensics** | Zeek logs, full PCAP analysis, C2 detection patterns |
| 9 | **Malware analysis (basic)** | Static analysis, sandbox usage, YARA rule writing |
| 10 | **Cloud security** | AWS CloudTrail, Azure AD, M365 investigation |
| 11 | **Detection engineering** | Sigma rule writing, tuning, coverage gap analysis |
| 12 | **Threat hunting** | Hypothesis-driven hunting, data analysis, reporting |

### Recommended T2 Certifications

| Cert | Cost | Focus |
|:---|:---:|:---|
| CompTIA CySA+ | ~฿12K | SOC analyst skills |
| BTL1 (Blue Team Level 1) | ~฿15K | Hands-on blue team |
| SC-200 (Microsoft) | ~฿8K | Sentinel/Defender |
| SANS GCIH | ~฿200K | Incident handling (gold standard) |
| SANS GCFA | ~฿200K | Advanced forensics |

---

## Free Training Resources (Curated)

| Resource | What You Learn | Cost | Level |
|:---|:---|:---:|:---:|
| [TryHackMe](https://tryhackme.com) | SOC Level 1 & 2 paths | Free tier | Beginner–Mid |
| [LetsDefend](https://letsdefend.io) | SOC analyst simulation | Free tier | Beginner |
| [CyberDefenders](https://cyberdefenders.org) | Blue team challenges | Free | Mid–Advanced |
| [SANS Webcasts](https://sans.org/webcasts) | Expert sessions | Free | All |
| [Malware Traffic Analysis](https://malware-traffic-analysis.net) | PCAP analysis exercises | Free | Mid |
| [Blue Team Labs Online](https://blueteamlabs.online) | IR investigations | Free tier | Mid |
| [AttackIQ Academy](https://academy.attackiq.com) | MITRE ATT&CK courses | Free | Beginner–Mid |
| [Splunk Free Training](https://education.splunk.com) | Splunk fundamentals | Free | Beginner |
| [Elastic Training](https://elastic.co/training) | Elastic/Kibana | Free | Beginner |
| **This Repository** | Real SOPs, playbooks, rules | Free | All |

---

## Training Tracking Template

### Individual Progress Card

```
Analyst Name: ____________________
Start Date: ____________________
Assigned Mentor: ____________________

Phase 1: Foundations
  □ Week 1:  Networking      [    /5  ]  Date: ________
  □ Week 2:  Linux           [    /5  ]  Date: ________
  □ Week 3:  Windows         [    /5  ]  Date: ________
  □ Week 4:  Network Tools   [    /5  ]  Date: ________
  □ Week 5:  Security Concepts[    /5  ]  Date: ________
  □ Week 6:  Common Attacks   [    /5  ]  Date: ________
  □ Week 7:  Vulnerabilities  [    /5  ]  Date: ________
  □ Week 8:  Security Arch    [    /5  ]  Date: ________
  ✎ Phase 1 Assessment: [    /100  ]  Pass: □ Yes □ No

Phase 2: SOC Skills
  □ Week 9:  SIEM Fundamentals[    /5  ]  Date: ________
  □ Week 10: Log Analysis     [    /5  ]  Date: ________
  □ Week 11: Search & Query   [    /5  ]  Date: ________
  □ Week 12: Dashboards       [    /5  ]  Date: ________
  □ Week 13: Alert Triage     [    /5  ]  Date: ________
  □ Week 14: IOC Enrichment   [    /5  ]  Date: ________
  □ Week 15: MITRE ATT&CK    [    /5  ]  Date: ________
  □ Week 16: Ticket Writing   [    /5  ]  Date: ________
  ✎ Phase 2 Assessment: [    /100  ]  Pass: □ Yes □ No

Phase 3: IR
  □ Week 17-20: Playbooks & Evidence  [    /5  ]
  □ Week 21-24: TI, TTX, Cert prep   [    /5  ]
  ✎ Final Assessment: [    /100  ]  Pass: □ Yes □ No
  ✎ Certification: __________________  Date: ________

Ready for Independent Work: □ Yes □ No
  Signed by SOC Manager: __________________
  Date: __________________
```

---

## Manager's Quarterly Training Budget

| Item | Per Person | 3 Analysts |
|:---|:---:|:---:|
| TryHackMe Premium | ฿5K/year | ฿15K |
| CySA+ voucher | ฿12K one-time | ฿36K |
| SANS OnDemand (1 course) | ฿130K | ฿390K |
| Books & materials | ฿5K/year | ฿15K |
| Conference (1/year) | ฿10–30K | ฿30–90K |
| **Annual Total** | **฿162–182K** | **฿486–546K** |

---

## Related Documents

- [SOC Building Roadmap](SOC_Building_Roadmap.en.md)
- [Budget & Staffing](Budget_Staffing.en.md)
- [Tier 1 Runbook](../05_Incident_Response/Tier1_Runbook.en.md)
- [Interview Guide](../05_Incident_Response/Interview_Guide.en.md)
- [Analyst Onboarding](../09_Training_Onboarding/Analyst_Onboarding_Path.en.md)
