# SOC Building Roadmap — From Zero to Operational

> **Document ID:** SOC-BUILD-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Audience:** IT Managers, CISOs, Security Leaders starting a SOC from scratch

---

## Who Is This For?

You have **no SOC today**. Maybe you have a small IT team that handles security "when something happens." This guide walks you through building a Security Operations Center from nothing — step by step, phase by phase.

---

## The 4 Phases

```
Phase 1 (Month 1-3)     Phase 2 (Month 4-6)     Phase 3 (Month 7-12)    Phase 4 (Year 2+)
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  Foundation   │──▶│   Detection  │──▶│   Response   │──▶│  Maturity    │
│              │   │              │   │              │   │              │
│ • Buy tools  │   │ • Log sources│   │ • Playbooks  │   │ • Automation │
│ • Hire people│   │ • First rules│   │ • IR process │   │ • Threat hunt│
│ • Basic setup│   │ • Basic SOPs │   │ • Exercises   │   │ • SOAR       │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
```

---

## Phase 1: Foundation (Month 1–3)

### 1.1 Define Your SOC Mission

Before buying anything, answer these questions:

| Question | Why It Matters |
|:---|:---|
| What are we protecting? | Defines scope (servers, cloud, endpoints, OT?) |
| What are our biggest risks? | Prioritizes what to detect first |
| What regulations apply? | PDPA, PCI DSS, ISO 27001 affect requirements |
| What's our budget? | Determines build vs buy vs outsource |
| Who will staff it? | In-house vs MSSP vs hybrid |

### 1.2 Choose Your Operating Model

| Model | Team Size | Budget | Best For |
|:---|:---:|:---:|:---|
| 🟢 **Hybrid MSSP** | 1–2 internal + MSSP | ฿1.5–3M/yr | Small org, <500 employees |
| 🟡 **Small In-house** | 3–5 analysts | ฿5–10M/yr | Mid-size, 500–2000 employees |
| 🔴 **Full In-house** | 8–15+ people | ฿15–30M+/yr | Enterprise, 2000+ employees |

> **Recommendation for beginners**: Start with **Hybrid MSSP** — outsource 24/7 monitoring, keep 1–2 people in-house for escalations and process building.

### 1.3 Select Your Technology Stack

#### SIEM (Security Information and Event Management) — Your #1 Tool

| SIEM | Cost | Best For | Learning Curve |
|:---|:---|:---|:---:|
| **Wazuh** | Free (open-source) | Budget-conscious, learning | 🟡 Medium |
| **Elastic Security** | Free tier available | Flexible, scalable | 🟡 Medium |
| **Microsoft Sentinel** | Pay-per-GB | Azure/M365 shops | 🟢 Easy |
| **Splunk** | $$$ per GB | Enterprise, any environment | 🔴 Hard |
| **Google Chronicle** | Flat-rate | Google Cloud users | 🟡 Medium |

> **Recommendation for beginners**: **Wazuh** (free, includes SIEM + EDR + compliance) or **Elastic Security** (free tier, powerful).

#### EDR (Endpoint Detection & Response)

| EDR | Cost | Key Feature |
|:---|:---|:---|
| **Wazuh Agent** | Free | Bundled with Wazuh SIEM |
| **Microsoft Defender for Endpoint** | Included in M365 E5 | Already have it? Use it! |
| **CrowdStrike Falcon** | $$$ | Best-in-class detection |
| **SentinelOne** | $$ | Strong autonomous response |
| **LimaCharlie** | Pay-per-agent | Flexible, affordable |

#### Other Essential Tools

| Category | Free Option | Paid Option |
|:---|:---|:---|
| **Ticketing** | TheHive, osTicket | ServiceNow, Jira |
| **Threat Intel** | MISP, OTX | Recorded Future, Mandiant |
| **Vulnerability Scanner** | OpenVAS/Greenbone | Tenable, Qualys |
| **Network Monitoring** | Zeek, Suricata | Darktrace, Vectra |
| **Email Security** | Built-in (M365/Google) | Proofpoint, Mimecast |
| **SOAR** | Shuffle, n8n | Palo Alto XSOAR, Splunk SOAR |

### 1.4 Minimum Viable Architecture

```
                    ┌─────────────┐
                    │   Internet  │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │  Firewall   │ ← Logs to SIEM
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────┴─────┐ ┌───┴───┐ ┌─────┴─────┐
        │  Servers   │ │  VPN  │ │ Cloud     │
        │ (EDR agent)│ │       │ │ (AWS/Azure)│
        └────────────┘ └───────┘ └───────────┘
              │            │            │
              └────────────┼────────────┘
                           │
                    ┌──────┴──────┐
                    │    SIEM     │ ← Wazuh / Elastic
                    │  Dashboard  │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │  SOC Team   │ ← Monitors dashboards
                    │  (Analysts) │    Reviews alerts
                    └─────────────┘
```

### 1.5 Hire Your First Team

#### Minimum Team (Hybrid Model)

| Role | Count | Skills Needed | Salary Range (Thailand) |
|:---|:---:|:---|:---|
| SOC Lead / Manager | 1 | 5+ yrs security, IR experience | ฿80–150K/mo |
| SOC Analyst (T1/T2) | 1–2 | SIEM, basic networking, willingness to learn | ฿30–60K/mo |

#### Where to Find People
- University security programs (KMUTT, Chula, KMITL)
- Online communities (SANS, TryHackMe, HackTheBox graduates)
- IT staff interested in transitioning to security
- Fresh graduates + structured training (cheapest option)

### 1.6 Phase 1 Checklist

```
□ SOC mission statement written
□ Operating model chosen (hybrid/in-house)
□ Budget approved
□ SIEM selected and installed
□ EDR deployed on critical servers
□ First team member(s) hired
□ Basic network diagram documented
□ Management buy-in secured
□ MSSP contract signed (if hybrid)
```

---

## Phase 2: Detection (Month 4–6)

### 2.1 Onboard Log Sources (Priority Order)

Follow the [Log Source Onboarding Guide](../06_Operations_Management/Log_Source_Onboarding.en.md).

| Week | Log Source | Why First |
|:---:|:---|:---|
| Week 1 | Active Directory / Azure AD | #1 attack target — logins, privilege changes |
| Week 2 | Firewall logs | Network visibility — who goes where |
| Week 3 | EDR / Endpoint logs | Malware, suspicious processes |
| Week 4 | Email gateway | Phishing — #1 initial access vector |
| Week 5–6 | Cloud (AWS/Azure) | Cloud misconfig is common |
| Week 7–8 | DNS + Proxy | C2, tunneling, shadow IT |

### 2.2 Deploy Your First Detection Rules

Start with these 10 Sigma rules from this repo (highest ROI):

| Priority | Rule | Detects | Playbook |
|:---:|:---|:---|:---|
| 1 | `win_multiple_failed_logins` | Brute force | PB-04 |
| 2 | `proc_office_spawn_powershell` | Phishing payload | PB-01 |
| 3 | `cloud_unusual_login` | Account compromise | PB-05 |
| 4 | `cloud_impossible_travel` | Stolen credentials | PB-06 |
| 5 | `file_bulk_renaming_ransomware` | Ransomware | PB-02 |
| 6 | `proc_temp_folder_execution` | Malware | PB-03 |
| 7 | `win_admin_share_access` | Lateral movement | PB-12 |
| 8 | `net_beaconing` | C2 communication | PB-13 |
| 9 | `win_security_log_cleared` | Cover tracks | PB-20 |
| 10 | `cloud_email_inbox_rule` | BEC | PB-17 |

### 2.3 Write Your First SOPs

Start with these documents from this repo:

1. ✅ [IR Framework](../05_Incident_Response/Framework.en.md) — How to handle incidents
2. ✅ [Severity Matrix](../05_Incident_Response/Severity_Matrix.en.md) — P1/P2/P3/P4 classification
3. ✅ [Tier 1 Runbook](../05_Incident_Response/Runbooks/Tier1_Runbook.en.md) — Day-to-day analyst guide
4. ✅ [Shift Handoff](../06_Operations_Management/Shift_Handoff.en.md) — If running shifts
5. ✅ [Communication Templates](../05_Incident_Response/Communication_Templates.en.md) — Who to notify

### 2.4 Phase 2 Checklist

```
□ Top 5 log sources onboarded and validated
□ 10 initial Sigma rules deployed
□ IR Framework documented and distributed
□ Severity Matrix agreed with management
□ Tier 1 Runbook given to all analysts
□ First false positive tuning completed
□ Alert routing configured (email/Slack/ticket)
□ Analysts can investigate basic alerts independently
```

---

## Phase 3: Operational (Month 7–12)

### 3.1 Expand Playbook Coverage

Deploy playbooks in this priority order:

| Wave | Playbooks | Why |
|:---:|:---|:---|
| Wave 1 (done in Phase 2) | PB-01 to PB-05 | Core threats |
| Wave 2 | PB-06 to PB-10 | Common scenarios |
| Wave 3 | PB-11 to PB-20 | Advanced threats |
| Wave 4 | PB-21 to PB-30 | Specialized scenarios |

### 3.2 Run Your First Tabletop Exercise

Use [Tabletop Exercises](../05_Incident_Response/Tabletop_Exercises.en.md):
- Start with **Scenario 1 (Ransomware)** — most likely real-world scenario
- Include SOC team, IT Ops, and at least one manager
- Score the exercise and document improvement areas

### 3.3 Establish Metrics

Track these 5 metrics from day 1 (see [SOC Metrics](../06_Operations_Management/SOC_Metrics.en.md)):

| Metric | Target (Month 6) | Target (Year 1) |
|:---|:---:|:---:|
| MTTD (Mean Time to Detect) | < 4 hours | < 1 hour |
| MTTR (Mean Time to Respond) | < 8 hours | < 4 hours |
| Alert-to-Ticket ratio | > 50% | > 70% |
| False Positive rate | < 70% | < 40% |
| SLA compliance (P1 response) | > 80% | > 95% |

### 3.4 Phase 3 Checklist

```
□ All 50 playbooks reviewed (deploy relevant ones)
□ All 51 Sigma rules deployed
□ First tabletop exercise completed
□ SOC metrics dashboard created
□ Monthly SOC report to management
□ Evidence collection procedures tested
□ PDPA notification process documented
□ At least 1 real incident handled end-to-end
```

---

## Phase 4: Maturity (Year 2+)

### 4.1 Advanced Capabilities

| Capability | When | How |
|:---|:---|:---|
| **Threat Hunting** | Month 12+ | Proactive searches beyond alert-driven |
| **SOAR Automation** | Month 12+ | Automate repetitive tasks (enrichment, blocking) |
| **Purple Teaming** | Month 15+ | Test your detections with [Purple Team Guide](../05_Incident_Response/Purple_Team_Exercises.en.md) |
| **Threat Intelligence** | Month 12+ | Feed integration with [TI Guide](../06_Operations_Management/TI_Feeds_Integration.en.md) |
| **Compliance Audit** | Month 18+ | Use [Compliance Mapping](../07_Compliance_Privacy/Compliance_Mapping.en.md) |

### 4.2 SOC Maturity Levels

Use the [SOC Maturity Scorer](../tools/soc_maturity_scorer.html) to assess:

| Level | Description | You're Here When... |
|:---:|:---|:---|
| 1 — Initial | Ad-hoc, reactive | No formal process |
| 2 — Managed | Basic monitoring, some SOPs | End of Phase 2 |
| 3 — Defined | Documented processes, metrics | End of Phase 3 |
| 4 — Quantitative | Data-driven, KPIs tracked | Year 2 |
| 5 — Optimizing | Continuous improvement, automation | Year 3+ |

---

## Budget Planning

### Option A: Budget SOC (Open-Source Stack)

| Item | Year 1 Cost | Notes |
|:---|:---:|:---|
| SIEM (Wazuh) | ฿0 | Self-hosted, open-source |
| Server hardware / VM | ฿200K–500K | 2–3 servers or cloud VMs |
| EDR (Wazuh Agent) | ฿0 | Included |
| Threat Intel (MISP + OTX) | ฿0 | Open-source |
| Ticketing (TheHive) | ฿0 | Open-source |
| Staff (1 Lead + 1 Analyst) | ฿1.3–2.5M | Thai market rates |
| Training / Certs | ฿100–300K | SANS, CompTIA, online courses |
| **Total Year 1** | **฿1.6–3.3M** | |

### Option B: Mid-Range SOC (Commercial + Open-Source)

| Item | Year 1 Cost | Notes |
|:---|:---:|:---|
| SIEM (Elastic / Sentinel) | ฿500K–2M | Pay-per-GB or license |
| EDR (Defender / CrowdStrike) | ฿500K–2M | Per-endpoint licensing |
| Vuln Scanner (Tenable) | ฿500K–1M | Annual license |
| Staff (1 Lead + 3 Analysts) | ฿3–5M | 8×5 or 16×5 coverage |
| MSSP (after-hours) | ฿1–2M | Night/weekend coverage |
| Training | ฿300–500K | SANS, vendor-specific |
| **Total Year 1** | **฿5.8–12.5M** | |

### Option C: Enterprise SOC

| Item | Year 1 Cost |
|:---|:---:|
| SIEM (Splunk / Chronicle) | ฿3–10M |
| EDR (CrowdStrike / SentinelOne) | ฿2–5M |
| SOAR (XSOAR / Splunk SOAR) | ฿2–5M |
| Staff (8–15 people, 24×7) | ฿10–25M |
| Training + Certs | ฿1–2M |
| **Total Year 1** | **฿18–47M** |

---

## Analyst Training Path

### For Complete Beginners (Month 1–3)

| Week | Topic | Resource |
|:---:|:---|:---|
| 1–2 | Networking fundamentals | CompTIA Network+ / YouTube |
| 3–4 | Linux & Windows basics | TryHackMe "Pre-Security" path |
| 5–6 | Security fundamentals | CompTIA Security+ study |
| 7–8 | SIEM basics | Your SIEM vendor training (free) |
| 9–10 | Log analysis | TryHackMe "SOC Level 1" path |
| 11–12 | IR fundamentals | This repository + SANS webinars |

### Recommended Certifications (Progressive)

```
Beginner        Intermediate      Advanced
┌──────────┐   ┌──────────┐    ┌──────────┐
│CompTIA   │──▶│ CySA+    │──▶│ SANS     │
│Security+ │   │ BTL1     │   │ GCIH     │
│SC-900    │   │ SC-200   │   │ GCFA     │
└──────────┘   └──────────┘   └──────────┘
   ~฿10K        ~฿15–30K       ~฿100–200K
```

### Free Training Resources

| Resource | What You Learn |
|:---|:---|
| [TryHackMe](https://tryhackme.com) | SOC Level 1 & 2 paths (free tier) |
| [LetsDefend](https://letsdefend.io) | SOC analyst simulation |
| [CyberDefenders](https://cyberdefenders.org) | Blue team challenges |
| [SANS Webcasts](https://sans.org/webcasts) | Free expert sessions |
| **This Repository** | Real-world SOPs, playbooks, detection rules |

---

## Common Mistakes to Avoid

| ❌ Mistake | ✅ Instead |
|:---|:---|
| Buying expensive SIEM before hiring people | Hire first, then choose tools with them |
| Trying to monitor everything on day 1 | Start with top 5 log sources |
| No playbooks, just "figure it out" | Use this repo's playbooks from day 1 |
| Alert fatigue (too many noisy rules) | Start with 10 rules, tune, then add more |
| No metrics — can't prove value | Track MTTD/MTTR from week 1 |
| 24/7 with 2 people (burnout) | Use MSSP for after-hours until you can staff properly |
| Skipping tabletop exercises | Run quarterly — cheapest way to find gaps |
| No management reporting | Monthly 1-pager to CISO/CEO |

---

## Quick Start Checklist (30-Day Sprint)

```
Week 1:
□ Read this entire guide
□ Write your SOC mission statement (1 paragraph)
□ Identify your crown jewels (most critical systems/data)
□ Get budget approval

Week 2:
□ Install Wazuh or chosen SIEM on a VM
□ Deploy 5 agents on critical servers
□ Configure Active Directory log forwarding
□ Read the Tier 1 Runbook

Week 3:
□ Import top 10 Sigma rules
□ Test: can you see a failed login in the SIEM?
□ Test: does an alert fire for 10+ failed logins?
□ Set up email/Slack notifications for alerts

Week 4:
□ Print Severity Matrix and post it on the wall
□ Assign someone to check alerts daily
□ Handle your first alert end-to-end
□ Document what you learned
```

---

## This Repository — Your Reading Order

If you're starting from zero, read these documents in this order:

| Order | Document | Why |
|:---:|:---|:---|
| 1 | **This guide** (you're here!) | Overall roadmap |
| 2 | [IR Framework](../05_Incident_Response/Framework.en.md) | How incidents work |
| 3 | [Severity Matrix](../05_Incident_Response/Severity_Matrix.en.md) | P1/P2/P3/P4 |
| 4 | [Tier 1 Runbook](../05_Incident_Response/Runbooks/Tier1_Runbook.en.md) | Daily operations |
| 5 | [SOC Team Structure](../06_Operations_Management/SOC_Team_Structure.en.md) | Roles & shifts |
| 6 | [Detection Rules Index](../08_Detection_Engineering/README.md) | What rules to deploy |
| 7 | [Log Source Onboarding](../06_Operations_Management/Log_Source_Onboarding.en.md) | How to add logs |
| 8 | [PB-01 Phishing](../05_Incident_Response/Playbooks/Phishing.en.md) | Your first playbook |
| 9 | [SOC Metrics](../06_Operations_Management/SOC_Metrics.en.md) | Measuring success |
| 10 | [Tabletop Exercises](../05_Incident_Response/Tabletop_Exercises.en.md) | Testing readiness |

---

## Related Documents

- [SOC Team Structure](../06_Operations_Management/SOC_Team_Structure.en.md)
- [SOC Maturity Scorer](../tools/soc_maturity_scorer.html)
- [MITRE ATT&CK Heatmap](../tools/mitre_attack_heatmap.html)
- [Compliance Mapping](../07_Compliance_Privacy/Compliance_Mapping.en.md)
- [All 50 Playbooks](../05_Incident_Response/Playbooks/Phishing.en.md)
