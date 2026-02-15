<p align="center">
  <img src="assets/soc_header.png" alt="SOC Standard Operating Procedures" width="100%">
</p>

<h1 align="center">SOC Standard Operating Procedures</h1>

<p align="center">
  <b>Vendor-agnostic SOC SOPs — Bilingual EN/TH — Build a SOC from Zero</b><br>
  ระเบียบปฏิบัติมาตรฐานสำหรับ SOC — ภาษาอังกฤษ/ไทย — สร้าง SOC ตั้งแต่ศูนย์
</p>

<p align="center">
  <img src="https://img.shields.io/badge/📄_Documents-170+-blue?style=for-the-badge" alt="Documents">
  <img src="https://img.shields.io/badge/🛡️_Playbooks-33-red?style=for-the-badge" alt="Playbooks">
  <img src="https://img.shields.io/badge/🔍_Sigma_Rules-33-orange?style=for-the-badge" alt="Sigma Rules">
  <img src="https://img.shields.io/badge/🌐_Bilingual-EN%2FTH-green?style=for-the-badge" alt="Bilingual">
</p>

---

## 📍 Start Here / เริ่มต้นที่นี่

> **New to SOC?** Read these two documents first — they'll guide you through everything else.
>
> **เพิ่งเริ่มต้น?** อ่าน 2 เอกสารนี้ก่อน แล้วจะรู้ว่าต้องอ่านอะไรต่อ

| | Document | English | ภาษาไทย |
|:---:|:---|:---:|:---:|
| 1️⃣ | **SOC 101** — SOC คืออะไร? | [Read](00_Getting_Started/SOC_101.en.md) | [อ่าน](00_Getting_Started/SOC_101.th.md) |
| 2️⃣ | **Quickstart Guide** — สร้าง SOC ใน 30 นาที | [Read](00_Getting_Started/Quickstart_Guide.en.md) | [อ่าน](00_Getting_Started/Quickstart_Guide.th.md) |
| 📖 | **Glossary** — คำศัพท์ที่ต้องรู้ | [Read](00_Getting_Started/Glossary.en.md) | [อ่าน](00_Getting_Started/Glossary.th.md) |

---

## 📊 What's Inside / สิ่งที่มีในโปรเจกต์นี้

| Category | Count | Highlights |
|:---|:---:|:---|
| 📄 Documents (EN+TH) | 170+ | Bilingual, vendor-agnostic SOPs |
| 🛡️ IR Playbooks | 33 | PB-01 Phishing → PB-33 Azure AD, MITRE mapped |
| 🔍 Sigma Detection Rules | 33 | Ready-to-import SIEM rules |
| 🧬 YARA Rules | 5 | File-based threat detection |
| 📋 Templates | 6 | Incident report, shift log, RFC, dashboards |
| 🧰 Interactive Tools | 2 | SOC Maturity Scorer + MITRE Heatmap |
| 📊 Dashboard JSON | 2 | Grafana (14 panels) + Kibana (11 panels) |

---

## 🏗️ Building a SOC from Zero / สร้าง SOC ตั้งแต่ศูนย์

Start here if you're building a brand-new SOC. Follow the numbered order.

| # | Document | English | ภาษาไทย |
|:---:|:---|:---:|:---:|
| 1 | **SOC Building Roadmap** 🗺️ | [Read](01_SOC_Fundamentals/SOC_Building_Roadmap.en.md) | [อ่าน](01_SOC_Fundamentals/SOC_Building_Roadmap.th.md) |
| 2 | **Budget & Staffing** 💰 | [Read](01_SOC_Fundamentals/Budget_Staffing.en.md) | [อ่าน](01_SOC_Fundamentals/Budget_Staffing.th.md) |
| 3 | **Technology Stack Selection** 🔧 | [Read](01_SOC_Fundamentals/Technology_Stack.en.md) | [อ่าน](01_SOC_Fundamentals/Technology_Stack.th.md) |
| 4 | **Infrastructure Setup** 🖥️ | [Read](01_SOC_Fundamentals/Infrastructure_Setup.en.md) | [อ่าน](01_SOC_Fundamentals/Infrastructure_Setup.th.md) |
| 5 | **Use Case Prioritization** 🎯 | [Read](01_SOC_Fundamentals/Use_Case_Prioritization.en.md) | [อ่าน](01_SOC_Fundamentals/Use_Case_Prioritization.th.md) |
| 6 | **Analyst Training Path** (6 months) 🎓 | [Read](01_SOC_Fundamentals/Analyst_Training_Path.en.md) | [อ่าน](01_SOC_Fundamentals/Analyst_Training_Path.th.md) |
| 7 | **SOC Infrastructure Activation** ⚡ | [Read](01_Onboarding/System_Activation.en.md) | [อ่าน](01_Onboarding/System_Activation.th.md) |

---

## 🛡️ Incident Response / การตอบสนองต่อเหตุการณ์

### Core Framework / กรอบงานหลัก

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **IR Framework** (NIST-based) | [Read](05_Incident_Response/Framework.en.md) | [อ่าน](05_Incident_Response/Framework.th.md) |
| **Severity Matrix** (P1–P4) | [Read](05_Incident_Response/Severity_Matrix.en.md) | [อ่าน](05_Incident_Response/Severity_Matrix.th.md) |
| **📋 Incident Classification** | [Read](05_Incident_Response/Incident_Classification.en.md) | [อ่าน](05_Incident_Response/Incident_Classification.th.md) |
| **🚨 Escalation Matrix** | [Read](05_Incident_Response/Escalation_Matrix.en.md) | [อ่าน](05_Incident_Response/Escalation_Matrix.th.md) |
| **Tier 1 Runbook** | [Read](05_Incident_Response/Tier1_Runbook.en.md) | [อ่าน](05_Incident_Response/Tier1_Runbook.th.md) |
| **Communication Templates** (6) | [Read](05_Incident_Response/Communication_Templates.en.md) | [อ่าน](05_Incident_Response/Communication_Templates.th.md) |

### Investigation & Evidence / การสืบสวนและหลักฐาน

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **🔬 Forensic Investigation** | [Read](05_Incident_Response/Forensic_Investigation.en.md) | [อ่าน](05_Incident_Response/Forensic_Investigation.th.md) |
| **Evidence Collection** | [Read](05_Incident_Response/Evidence_Collection.en.md) | [อ่าน](05_Incident_Response/Evidence_Collection.th.md) |
| **🎯 Threat Hunting Playbook** | [Read](05_Incident_Response/Threat_Hunting_Playbook.en.md) | [อ่าน](05_Incident_Response/Threat_Hunting_Playbook.th.md) |
| **Interview Guide** (T1/T2/Lead) | [Read](05_Incident_Response/Interview_Guide.en.md) | [อ่าน](05_Incident_Response/Interview_Guide.th.md) |

### Recovery & Automation / การกู้คืนและอัตโนมัติ

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **🏥 Disaster Recovery / BCP** | [Read](05_Incident_Response/Disaster_Recovery_BCP.en.md) | [อ่าน](05_Incident_Response/Disaster_Recovery_BCP.th.md) |
| **SOAR Playbook Templates** (6) | [Read](05_Incident_Response/SOAR_Playbooks.en.md) | [อ่าน](05_Incident_Response/SOAR_Playbooks.th.md) |
| **Lessons Learned Template** | [Read](05_Incident_Response/Lessons_Learned_Template.en.md) | [อ่าน](05_Incident_Response/Lessons_Learned_Template.th.md) |
| **📘 Playbook Development Guide** | [Read](05_Incident_Response/Playbook_Development_Guide.en.md) | [อ่าน](05_Incident_Response/Playbook_Development_Guide.th.md) |

### 33 Playbooks — Grouped by Category

All playbooks are bilingual (EN+TH) and MITRE ATT&CK mapped.

<details>
<summary><b>🔴 Core Attacks (PB-01 → PB-10)</b> — Covers 80% of real-world incidents</summary>

| # | Playbook | EN | TH |
|:---:|:---|:---:|:---:|
| 01 | Phishing | [📄](05_Incident_Response/Playbooks/Phishing.en.md) | [📄](05_Incident_Response/Playbooks/Phishing.th.md) |
| 02 | Ransomware | [📄](05_Incident_Response/Playbooks/Ransomware.en.md) | [📄](05_Incident_Response/Playbooks/Ransomware.th.md) |
| 03 | Malware Infection | [📄](05_Incident_Response/Playbooks/Malware_Infection.en.md) | [📄](05_Incident_Response/Playbooks/Malware_Infection.th.md) |
| 04 | Brute Force | [📄](05_Incident_Response/Playbooks/Brute_Force.en.md) | [📄](05_Incident_Response/Playbooks/Brute_Force.th.md) |
| 05 | Account Compromise | [📄](05_Incident_Response/Playbooks/Account_Compromise.en.md) | [📄](05_Incident_Response/Playbooks/Account_Compromise.th.md) |
| 06 | Impossible Travel | [📄](05_Incident_Response/Playbooks/Impossible_Travel.en.md) | [📄](05_Incident_Response/Playbooks/Impossible_Travel.th.md) |
| 07 | Privilege Escalation | [📄](05_Incident_Response/Playbooks/Privilege_Escalation.en.md) | [📄](05_Incident_Response/Playbooks/Privilege_Escalation.th.md) |
| 08 | Data Exfiltration | [📄](05_Incident_Response/Playbooks/Data_Exfiltration.en.md) | [📄](05_Incident_Response/Playbooks/Data_Exfiltration.th.md) |
| 09 | DDoS Attack | [📄](05_Incident_Response/Playbooks/DDoS_Attack.en.md) | [📄](05_Incident_Response/Playbooks/DDoS_Attack.th.md) |
| 10 | Web App Attack | [📄](05_Incident_Response/Playbooks/Web_Attack.en.md) | [📄](05_Incident_Response/Playbooks/Web_Attack.th.md) |

</details>

<details>
<summary><b>🟠 Advanced Threats (PB-11 → PB-20)</b> — Insider, lateral movement, evasion</summary>

| # | Playbook | EN | TH |
|:---:|:---|:---:|:---:|
| 11 | Suspicious Script | [📄](05_Incident_Response/Playbooks/Suspicious_Script.en.md) | [📄](05_Incident_Response/Playbooks/Suspicious_Script.th.md) |
| 12 | Lateral Movement | [📄](05_Incident_Response/Playbooks/Lateral_Movement.en.md) | [📄](05_Incident_Response/Playbooks/Lateral_Movement.th.md) |
| 13 | C2 Communication | [📄](05_Incident_Response/Playbooks/C2_Communication.en.md) | [📄](05_Incident_Response/Playbooks/C2_Communication.th.md) |
| 14 | Insider Threat | [📄](05_Incident_Response/Playbooks/Insider_Threat.en.md) | [📄](05_Incident_Response/Playbooks/Insider_Threat.th.md) |
| 15 | Rogue Admin | [📄](05_Incident_Response/Playbooks/Rogue_Admin.en.md) | [📄](05_Incident_Response/Playbooks/Rogue_Admin.th.md) |
| 16 | Cloud IAM Anomaly | [📄](05_Incident_Response/Playbooks/Cloud_IAM.en.md) | [📄](05_Incident_Response/Playbooks/Cloud_IAM.th.md) |
| 17 | Business Email Compromise | [📄](05_Incident_Response/Playbooks/BEC.en.md) | [📄](05_Incident_Response/Playbooks/BEC.th.md) |
| 18 | Exploit | [📄](05_Incident_Response/Playbooks/Exploit.en.md) | [📄](05_Incident_Response/Playbooks/Exploit.th.md) |
| 19 | Lost/Stolen Device | [📄](05_Incident_Response/Playbooks/Lost_Device.en.md) | [📄](05_Incident_Response/Playbooks/Lost_Device.th.md) |
| 20 | Log Clearing | [📄](05_Incident_Response/Playbooks/Log_Clearing.en.md) | [📄](05_Incident_Response/Playbooks/Log_Clearing.th.md) |

</details>

<details>
<summary><b>🟡 Emerging & Cloud (PB-21 → PB-30)</b> — Supply chain, cloud, mobile, OT</summary>

| # | Playbook | EN | TH |
|:---:|:---|:---:|:---:|
| 21 | Supply Chain Attack | [📄](05_Incident_Response/Playbooks/Supply_Chain_Attack.en.md) | [📄](05_Incident_Response/Playbooks/Supply_Chain_Attack.th.md) |
| 22 | API Abuse | [📄](05_Incident_Response/Playbooks/API_Abuse.en.md) | [📄](05_Incident_Response/Playbooks/API_Abuse.th.md) |
| 23 | Cryptomining | [📄](05_Incident_Response/Playbooks/Cryptomining.en.md) | [📄](05_Incident_Response/Playbooks/Cryptomining.th.md) |
| 24 | DNS Tunneling | [📄](05_Incident_Response/Playbooks/DNS_Tunneling.en.md) | [📄](05_Incident_Response/Playbooks/DNS_Tunneling.th.md) |
| 25 | Zero-Day Exploit | [📄](05_Incident_Response/Playbooks/Zero_Day_Exploit.en.md) | [📄](05_Incident_Response/Playbooks/Zero_Day_Exploit.th.md) |
| 26 | MFA Bypass / Token Theft | [📄](05_Incident_Response/Playbooks/MFA_Bypass.en.md) | [📄](05_Incident_Response/Playbooks/MFA_Bypass.th.md) |
| 27 | Cloud Storage Exposure | [📄](05_Incident_Response/Playbooks/Cloud_Storage_Exposure.en.md) | [📄](05_Incident_Response/Playbooks/Cloud_Storage_Exposure.th.md) |
| 28 | Mobile Device Compromise | [📄](05_Incident_Response/Playbooks/Mobile_Compromise.en.md) | [📄](05_Incident_Response/Playbooks/Mobile_Compromise.th.md) |
| 29 | Shadow IT | [📄](05_Incident_Response/Playbooks/Shadow_IT.en.md) | [📄](05_Incident_Response/Playbooks/Shadow_IT.th.md) |
| 30 | OT/ICS Incident | [📄](05_Incident_Response/Playbooks/OT_ICS_Incident.en.md) | [📄](05_Incident_Response/Playbooks/OT_ICS_Incident.th.md) |

</details>

<details>
<summary><b>☁️ Cloud-Specific (PB-31 → PB-33)</b> — AWS & Azure</summary>

| # | Playbook | EN | TH |
|:---:|:---|:---:|:---:|
| 31 | AWS EC2 Compromise | [📄](05_Incident_Response/Playbooks/AWS_EC2_Compromise.en.md) | [📄](05_Incident_Response/Playbooks/AWS_EC2_Compromise.th.md) |
| 32 | AWS S3 Compromise | [📄](05_Incident_Response/Playbooks/AWS_S3_Compromise.en.md) | [📄](05_Incident_Response/Playbooks/AWS_S3_Compromise.th.md) |
| 33 | Azure AD Compromise | [📄](05_Incident_Response/Playbooks/Azure_AD_Compromise.en.md) | [📄](05_Incident_Response/Playbooks/Azure_AD_Compromise.th.md) |

</details>

---

## 🔍 Detection & Threat Intelligence / การตรวจจับและข่าวกรองภัยคุกคาม

### Sigma Detection Rules (33 Rules)

Ready-to-import rules mapped to MITRE ATT&CK. See full index: [README](07_Detection_Rules/README.md) | [ดัชนี (TH)](07_Detection_Rules/README.th.md)

| Category | Rule Examples | Count |
|:---|:---|:---:|
| **Windows** | Failed logins, admin group add, log clearing, PowerShell | 8 |
| **Cloud** | Impossible travel, root login, MFA bypass, mining | 10 |
| **Network** | DNS tunneling, beaconing, large upload, OT anomaly | 5 |
| **Web/API** | SQLi, WAF exploit, API abuse, zero-day, rate limit | 5 |
| **File/Proc** | Ransomware rename, USB bulk copy, crypto indicators | 5 |

### YARA Rules (5 Rules)

File-based threat detection: [YARA Index](07_Detection_Rules/yara/README.md) | [File Signatures](10_File_Signatures/README.md)

### Threat Intelligence

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **Threat Intelligence Lifecycle** | [Read](06_Operations_Management/Threat_Intelligence_Lifecycle.en.md) | [อ่าน](06_Operations_Management/Threat_Intelligence_Lifecycle.th.md) |
| **TI Feeds Integration** | [Read](06_Operations_Management/TI_Feeds_Integration.en.md) | [อ่าน](06_Operations_Management/TI_Feeds_Integration.th.md) |
| **Detection Rule Testing SOP** | [Read](06_Operations_Management/Detection_Rule_Testing.en.md) | [อ่าน](06_Operations_Management/Detection_Rule_Testing.th.md) |
| **Detection Engineering Lifecycle** | [Read](03_User_Guides/Content_Management.en.md) | [อ่าน](03_User_Guides/Content_Management.th.md) |

---

## 📊 Operations / การปฏิบัติงาน

### 👥 Team & Daily Operations / ทีมและงานประจำวัน

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **SOC Team Structure** | [Read](06_Operations_Management/SOC_Team_Structure.en.md) | [อ่าน](06_Operations_Management/SOC_Team_Structure.th.md) |
| **Shift Handoff SOP** | [Read](06_Operations_Management/Shift_Handoff.en.md) | [อ่าน](06_Operations_Management/Shift_Handoff.th.md) |
| **SOC Checklists** (Daily/Weekly/Monthly) | [Read](06_Operations_Management/SOC_Checklists.en.md) | [อ่าน](06_Operations_Management/SOC_Checklists.th.md) |
| **SOC Metrics & KPIs** | [Read](06_Operations_Management/SOC_Metrics.en.md) | [อ่าน](06_Operations_Management/SOC_Metrics.th.md) |
| **📈 KPI Dashboard Template** | [Read](06_Operations_Management/KPI_Dashboard_Template.en.md) | [อ่าน](06_Operations_Management/KPI_Dashboard_Template.th.md) |
| **📊 Log Source Matrix** | [Read](06_Operations_Management/Log_Source_Matrix.en.md) | [อ่าน](06_Operations_Management/Log_Source_Matrix.th.md) |
| **Log Source Onboarding** | [Read](06_Operations_Management/Log_Source_Onboarding.en.md) | [อ่าน](06_Operations_Management/Log_Source_Onboarding.th.md) |
| **🤖 SOC Automation Catalog** | [Read](06_Operations_Management/SOC_Automation_Catalog.en.md) | [อ่าน](06_Operations_Management/SOC_Automation_Catalog.th.md) |
| **🔧 Alert Tuning SOP** | [Read](06_Operations_Management/Alert_Tuning.en.md) | [อ่าน](06_Operations_Management/Alert_Tuning.th.md) |
| **📊 SOC Capacity Planning** | [Read](06_Operations_Management/SOC_Capacity_Planning.en.md) | [อ่าน](06_Operations_Management/SOC_Capacity_Planning.th.md) |

### 🔍 Security Monitoring / การเฝ้าระวัง

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **🌐 Network Security Monitoring** | [Read](06_Operations_Management/Network_Security_Monitoring.en.md) | [อ่าน](06_Operations_Management/Network_Security_Monitoring.th.md) |
| **☁️ Cloud Security Monitoring** | [Read](06_Operations_Management/Cloud_Security_Monitoring.en.md) | [อ่าน](06_Operations_Management/Cloud_Security_Monitoring.th.md) |
| **🔒 Data Loss Prevention (DLP)** | [Read](06_Operations_Management/DLP_SOP.en.md) | [อ่าน](06_Operations_Management/DLP_SOP.th.md) |
| **🕵️ Insider Threat Program** | [Read](06_Operations_Management/Insider_Threat_Program.en.md) | [อ่าน](06_Operations_Management/Insider_Threat_Program.th.md) |

### 📡 Threat Intelligence & Hunting / ข่าวกรองภัยคุกคาม

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **Threat Intelligence Lifecycle** | [Read](06_Operations_Management/Threat_Intelligence_Lifecycle.en.md) | [อ่าน](06_Operations_Management/Threat_Intelligence_Lifecycle.th.md) |
| **TI Feeds Integration** | [Read](06_Operations_Management/TI_Feeds_Integration.en.md) | [อ่าน](06_Operations_Management/TI_Feeds_Integration.th.md) |
| **🌍 Threat Landscape Report** | [Read](06_Operations_Management/Threat_Landscape_Report.en.md) | [อ่าน](06_Operations_Management/Threat_Landscape_Report.th.md) |
| **Detection Rule Testing SOP** | [Read](06_Operations_Management/Detection_Rule_Testing.en.md) | [อ่าน](06_Operations_Management/Detection_Rule_Testing.th.md) |
| **Detection Engineering Lifecycle** | [Read](03_User_Guides/Content_Management.en.md) | [อ่าน](03_User_Guides/Content_Management.th.md) |

### 🏛️ Risk & Governance / ความเสี่ยงและธรรมาภิบาล

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **🛡️ Vulnerability Management** | [Read](06_Operations_Management/Vulnerability_Management.en.md) | [อ่าน](06_Operations_Management/Vulnerability_Management.th.md) |
| **🔗 Third-Party Risk** | [Read](06_Operations_Management/Third_Party_Risk.en.md) | [อ่าน](06_Operations_Management/Third_Party_Risk.th.md) |
| **🎯 SOC Maturity Assessment** | [Read](06_Operations_Management/SOC_Maturity_Assessment.en.md) | [อ่าน](06_Operations_Management/SOC_Maturity_Assessment.th.md) |
| **SOC Assessment Checklist** | [Read](06_Operations_Management/SOC_Assessment_Checklist.en.md) | [อ่าน](06_Operations_Management/SOC_Assessment_Checklist.th.md) |
| **SLA Template** | [Read](06_Operations_Management/SLA_Template.en.md) | [อ่าน](06_Operations_Management/SLA_Template.th.md) |
| **Vendor/Tool Evaluation** | [Read](06_Operations_Management/Vendor_Evaluation.en.md) | [อ่าน](06_Operations_Management/Vendor_Evaluation.th.md) |

### 📜 Policies & Processes / นโยบายและกระบวนการ

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **Data Handling Protocol** | [Read](06_Operations_Management/Data_Handling_Protocol.en.md) | [อ่าน](06_Operations_Management/Data_Handling_Protocol.th.md) |
| **Change Management SOP** | [Read](06_Operations_Management/Change_Management.en.md) | [อ่าน](06_Operations_Management/Change_Management.th.md) |
| **Access Control Policy** | [Read](06_Operations_Management/Access_Control.en.md) | [อ่าน](06_Operations_Management/Access_Control.th.md) |
| **Communication SOP** | [Read](06_Operations_Management/Communication_SOP.en.md) | [อ่าน](06_Operations_Management/Communication_SOP.th.md) |

### 🔧 Platform & Tools / แพลตฟอร์มและเครื่องมือ

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **Data Governance & Retention** | [Read](02_Platform_Operations/Database_Management.en.md) | [อ่าน](02_Platform_Operations/Database_Management.th.md) |
| **Deployment Procedures** | [Read](02_Platform_Operations/Deployment_Procedures.en.md) | [อ่าน](02_Platform_Operations/Deployment_Procedures.th.md) |
| **Integration Hub** | [Read](03_User_Guides/Integration_Hub.en.md) | [อ่าน](03_User_Guides/Integration_Hub.th.md) |
| **Troubleshooting** | [Read](04_Troubleshooting/Common_Issues.en.md) | [อ่าน](04_Troubleshooting/Common_Issues.th.md) |

---

## 🎯 Testing & Training / การทดสอบและฝึกอบรม

### Simulation & Purple Team / การจำลองและทดสอบ

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **🟣 Purple Team Exercise Guide** | [Read](08_Simulation_Testing/Purple_Team_Exercise.en.md) | [อ่าน](08_Simulation_Testing/Purple_Team_Exercise.th.md) |
| **Purple Team Exercises** (9 exercises) | [Read](05_Incident_Response/Purple_Team_Exercises.en.md) | [อ่าน](05_Incident_Response/Purple_Team_Exercises.th.md) |
| **Tabletop Exercises** (5 scenarios) | [Read](05_Incident_Response/Tabletop_Exercises.en.md) | [อ่าน](05_Incident_Response/Tabletop_Exercises.th.md) |
| **🎣 Phishing Simulation Program** | [Read](08_Simulation_Testing/Phishing_Simulation.en.md) | [อ่าน](08_Simulation_Testing/Phishing_Simulation.th.md) |
| **Simulation Guide** | [Read](08_Simulation_Testing/Simulation_Guide.en.md) | [อ่าน](08_Simulation_Testing/Simulation_Guide.th.md) |
| **Atomic Test Map** (MITRE) | [Read](08_Simulation_Testing/Atomic_Test_Map.en.md) | [อ่าน](08_Simulation_Testing/Atomic_Test_Map.th.md) |

### Analyst Training / การฝึกอบรม

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **👤 SOC Analyst Onboarding** (90-day) | [Read](01_SOC_Overview/SOC_Onboarding.en.md) | [อ่าน](01_SOC_Overview/SOC_Onboarding.th.md) |
| **Analyst Onboarding** (5-day path) | [Read](09_Training_Onboarding/Analyst_Onboarding_Path.en.md) | [อ่าน](09_Training_Onboarding/Analyst_Onboarding_Path.th.md) |
| **Training Checklist** | [Read](09_Training_Onboarding/Training_Checklist.en.md) | [อ่าน](09_Training_Onboarding/Training_Checklist.th.md) |

---

## 🏛️ Compliance & Reporting / การปฏิบัติตามกฎหมายและรายงาน

### Compliance

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **Compliance Mapping** (ISO 27001 / NIST CSF / PCI DSS) | [Read](10_Compliance/Compliance_Mapping.en.md) | [อ่าน](10_Compliance/Compliance_Mapping.th.md) |
| **PDPA Incident Response** (72-hr notification) | [Read](10_Compliance/PDPA_Incident_Response.en.md) | [อ่าน](10_Compliance/PDPA_Incident_Response.th.md) |
| **📝 Compliance Gap Analysis** | [Read](10_Compliance/Compliance_Gap_Analysis.en.md) | [อ่าน](10_Compliance/Compliance_Gap_Analysis.th.md) |

### Reports & Dashboards

| Document | English | ภาษาไทย |
|:---|:---:|:---:|
| **Monthly SOC Report** | [Read](11_Reporting_Templates/Monthly_SOC_Report.en.md) | [อ่าน](11_Reporting_Templates/Monthly_SOC_Report.th.md) |
| **Quarterly Business Review** | [Read](11_Reporting_Templates/Quarterly_Business_Review.en.md) | [อ่าน](11_Reporting_Templates/Quarterly_Business_Review.th.md) |
| **Executive Dashboard** | [Read](11_Reporting_Templates/Executive_Dashboard.en.md) | [อ่าน](11_Reporting_Templates/Executive_Dashboard.th.md) |

### Templates / แบบฟอร์มพร้อมใช้

| Template | English | ภาษาไทย |
|:---|:---:|:---:|
| **Incident Report** | [Read](templates/incident_report.en.md) | [อ่าน](templates/incident_report.th.md) |
| **Shift Handover Log** | [Read](templates/shift_handover.en.md) | [อ่าน](templates/shift_handover.th.md) |
| **Change Request (RFC)** | [Read](templates/change_request_rfc.en.md) | [อ่าน](templates/change_request_rfc.th.md) |

---

## 🛠️ Tools / เครื่องมือ

### Interactive (Open in Browser)

| Tool | Description |
|:---|:---|
| **[SOC Maturity Scorer](tools/soc_maturity_scorer.html)** | Self-assessment: 7 domains, 56 questions, bilingual EN/TH, scored 1–5 |
| **[MITRE ATT&CK Heatmap](tools/mitre_attack_heatmap.html)** | Coverage map: 19 techniques, gap analysis, click-to-detail |

### Dashboards (Import to SIEM)

| Dashboard | Format | Panels |
|:---|:---|:---:|
| **[Grafana SOC Operations](tools/dashboards/grafana_soc_operations.json)** | JSON (Import → Dashboards) | 14 |
| **[Kibana SOC Operations](tools/dashboards/kibana_soc_operations.ndjson)** | NDJSON (Import → Saved Objects) | 11 |
| **[ATT&CK Navigator Layer](tools/mitre_attack_navigator.json)** | JSON (Import → [Navigator](https://mitre-attack.github.io/attack-navigator/)) | — |

### CLI Scripts

| Script | Usage |
|:---|:---|
| [export_docs.py](tools/export_docs.py) | `python3 tools/export_docs.py` — Merge all docs into single Markdown |
| [new_playbook.py](tools/new_playbook.py) | `python3 tools/new_playbook.py` — Generate new playbook from template |
| [check_links.py](tools/check_links.py) | `python3 tools/check_links.py` — Validate internal links |
| [validate_sigma.py](tools/validate_sigma.py) | `python3 tools/validate_sigma.py` — Lint Sigma rules |

---

## 📚 Full Manual / คู่มือฉบับเต็ม

For offline reading or printing, download the consolidated manual:

> **[📖 SOC_Manual_Consolidated.md](SOC_Manual_Consolidated.md)** — All 170+ documents in one file

---

## 📋 Version & Tracking / เวอร์ชันและการติดตาม

| Resource | Description |
|:---|:---|
| **[📝 CHANGELOG.md](CHANGELOG.md)** | All changes by version (Keep a Changelog format) |
| **[📋 VERSION_TRACKER.md](VERSION_TRACKER.md)** | Every document's version, last update, and next review date |
| **Current Version** | **v2.3.0** (2026-02-16) |

---

## Contributing / การมีส่วนร่วม

1. **Standardization** — Keep procedures vendor-agnostic where possible
2. **Bilingual** — Maintain both English (`.en.md`) and Thai (`.th.md`) versions
3. **Review** — Changes should be reviewed by SOC Managers or Lead Engineers
4. **Versioning** — Update `CHANGELOG.md` and `VERSION_TRACKER.md` with every change

---

## 👤 About the Author / ผู้เขียน

<p align="center">
  <b>Nutthakorn Chalaemwongwan [Pop]</b><br>
  🛡️ SOC Architect · Cybersecurity Educator · Open-Source Advocate
</p>

> *"Security is a process, not a product."* — I created this repository to democratize SOC knowledge, making enterprise-grade security operations accessible to everyone — in both English and Thai.

### 🎓 Training & Consulting / อบรมและที่ปรึกษา

Looking to build, improve, or scale your Security Operations Center? I offer hands-on, practical training and consulting services:

| 🎯 Service | Description |
|:---|:---|
| **🏗️ SOC Building Workshop** | ออกแบบและจัดตั้ง SOC ตั้งแต่ศูนย์ — architecture, staffing, tools, processes |
| **📚 SOC Analyst Bootcamp** | หลักสูตร intensive สำหรับ Tier 1–3 — triage, investigation, hunting, SOAR |
| **🔥 Incident Response Drill** | ซ้อม tabletop exercise + purple team ด้วย scenario จริง |
| **📊 SOC Maturity Assessment** | ประเมิน SOC ปัจจุบัน 7 domains พร้อมแผน roadmap ปรับปรุง |
| **📋 Compliance & Gap Analysis** | ประเมิน ISO 27001 / NIST CSF / PDPA gap พร้อม remediation plan |
| **🎤 Speaking & Workshops** | บรรยาย, workshop, guest lecture ด้าน cybersecurity |

### 📬 Contact / ช่องทางติดต่อ

<p align="center">
  <a href="mailto:nutthakorn.ch@kmitl.ac.th"><img src="https://img.shields.io/badge/📧_Email-nutthakorn.ch@kmitl.ac.th-blue?style=for-the-badge" alt="Email"></a>
  <a href="https://www.linkedin.com/in/nutthakorn/"><img src="https://img.shields.io/badge/💼_LinkedIn-Nutthakorn-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn"></a>
  <a href="https://line.me/ti/p/~pop7"><img src="https://img.shields.io/badge/💬_Line-pop7-00C300?style=for-the-badge&logo=line" alt="Line"></a>
</p>

<p align="center">
  <i>📌 View my full profile, certifications, and experience on <a href="https://www.linkedin.com/in/nutthakorn/">LinkedIn</a></i>
</p>

---

<p align="center">
  <b>⭐ If this repository helps your SOC, please give it a star!</b><br>
  <i>สร้างด้วย 🛡️ เพื่อ SOC community ไทยและทั่วโลก</i>
</p>
