# คู่มือเริ่มต้นด่วน — สร้าง SOC ใน 30 นาที (Quickstart Guide)

คู่มือนี้แสดง **เส้นทางที่เร็วที่สุด** ในการอ่านเอกสารทั้ง Repository ทำตามขั้นตอนเพื่อทำความเข้าใจและตั้ง SOC ตั้งแต่เริ่มต้น

## แผนที่การอ่าน (Reading Roadmap)

```mermaid
graph TD
    START[🚀 เริ่มตรงนี้] --> S1[1. SOC 101]
    S1 --> S2[2. โครงสร้างทีม]
    S2 --> S3[3. ติดตั้งโครงสร้างพื้นฐาน]
    S3 --> S4[4. กรอบ IR]
    S4 --> S5[5. Playbook 5 ชุดแรก]
    S5 --> S6[6. กฎตรวจจับ]
    S6 --> S7[7. ระบบกะ]
    S7 --> S8[8. KPI และรายงาน]
    S8 --> S9[9. ทดสอบ Purple Team]
    S9 --> S10[10. ฝึกอบรม Analyst]

    style START fill:#e74c3c,color:#fff
    style S5 fill:#2ecc71,color:#fff
    style S10 fill:#3498db,color:#fff
```

## ขั้นตอนการอ่าน (Step-by-Step Reading Order)

### 🔴 สัปดาห์ที่ 1 — ทำความเข้าใจ (อ่านอย่างเดียว)

| ขั้นตอน | เวลา | เอกสาร | สิ่งที่จะเรียนรู้ |
|:---:|:---:|---|---|
| 1 | 15 นาที | [SOC 101](SOC_101.th.md) | SOC คืออะไร องค์ประกอบหลัก ขั้นตอนการเติบโต |
| 2 | 10 นาที | [คำศัพท์สำคัญ](Glossary.th.md) | ศัพท์เทคนิค (SIEM, EDR, IOC, TTP เป็นต้น) |
| 3 | 10 นาที | [โครงสร้างทีม SOC](../06_Operations_Management/SOC_Team_Structure.th.md) | บทบาท จำนวนคน เส้นทางอาชีพ |

### 🟠 สัปดาห์ที่ 2 — วางแผน (ออกแบบ SOC ของคุณ)

| ขั้นตอน | เวลา | เอกสาร | สิ่งที่จะเรียนรู้ |
|:---:|:---:|---|---|
| 4 | 15 นาที | [การติดตั้ง SOC](../10_Training_Onboarding/System_Activation.th.md) | ต้อง Deploy ระบบอะไรบ้าง |
| 5 | 10 นาที | [นโยบายข้อมูล](../02_Platform_Operations/Database_Management.th.md) | การจัดการ Log Data และ Retention |
| 6 | 10 นาที | [แบบประเมิน SOC](../06_Operations_Management/SOC_Assessment_Checklist.th.md) | วิเคราะห์ Gap ของสถานะปัจจุบัน |

### 🟡 สัปดาห์ที่ 3 — สร้าง (ทำกระบวนการหลัก)

| ขั้นตอน | เวลา | เอกสาร | สิ่งที่จะเรียนรู้ |
|:---:|:---:|---|---|
| 7 | 20 นาที | [กรอบ IR](../05_Incident_Response/Framework.th.md) | วิธีจัดการ Incident ตั้งแต่ต้นจนจบ |
| 8 | 30 นาที | **Playbook 5 ชุดแรก** (ดูด้านล่าง) | วิธีตอบสนองต่อการโจมตีที่พบบ่อย |
| 9 | 15 นาที | [Detection Rules](../08_Detection_Engineering/README.md) | กฎ Sigma สำเร็จรูปพร้อม Deploy |
| 10 | 10 นาที | [Integration Hub](../03_User_Guides/Integration_Hub.th.md) | วิธีเชื่อมต่อเครื่องมือเข้าด้วยกัน |

### 🟢 สัปดาห์ที่ 4 — เปิดใช้งาน (Go Live)

| ขั้นตอน | เวลา | เอกสาร | สิ่งที่จะเรียนรู้ |
|:---:|:---:|---|---|
| 11 | 10 นาที | [มาตรฐานส่งมอบกะ](../06_Operations_Management/Shift_Handoff.th.md) | การทำงาน 24/7 |
| 12 | 10 นาที | [ตัวชี้วัด SOC](../06_Operations_Management/SOC_Metrics.th.md) | MTTD, MTTR, False Positive Rate |
| 13 | 15 นาที | [รายงานรายเดือน](../11_Reporting_Templates/Monthly_SOC_Report.th.md) | การรายงานให้ผู้บริหาร |
| 14 | 10 นาที | [หลักสูตร Analyst](../10_Training_Onboarding/Analyst_Onboarding_Path.th.md) | วิธีฝึก Analyst ใหม่ |

## Playbook 5 ชุดที่ต้องเริ่มก่อน

เริ่มจากชุดนี้ — ครอบคลุม 80% ของ Incident ในโลกจริง:

| ลำดับ | Playbook | ทำไมต้องเริ่มที่นี่ |
|:---:|---|---|
| 1️⃣ | [Phishing](../05_Incident_Response/Playbooks/Phishing.th.md) | ช่องทางโจมตีอันดับ 1 ที่พบมากที่สุด |
| 2️⃣ | [Malware Infection](../05_Incident_Response/Playbooks/Malware_Infection.th.md) | Escalation ที่พบบ่อยที่สุดจาก Phishing |
| 3️⃣ | [Brute Force](../05_Incident_Response/Playbooks/Brute_Force.th.md) | ตรวจจับง่าย เหมาะฝึก Tier 1 |
| 4️⃣ | [Account Compromise](../05_Incident_Response/Playbooks/Account_Compromise.th.md) | พื้นที่โจมตีขยายตัวจากการใช้ Cloud |
| 5️⃣ | [Ransomware](../05_Incident_Response/Playbooks/Ransomware.th.md) | ผลกระทบต่อธุรกิจสูงสุด |

## SOC Maturity Roadmap

```mermaid
graph TD
    subgraph Phase1["Phase 1: คลาน (เดือน 1-3)"]
        A1[Deploy SIEM]
        A2[นำเข้า Log 10 แหล่ง]
        A3[จ้างคน 3-5 คน]
        A4[กำหนดขั้นตอน Escalation]
    end

    subgraph Phase2["Phase 2: เดิน (เดือน 3-6)"]
        B1[เปิดใช้ Detection Rules 10 กฎ]
        B2[เปิดใช้ Playbook 5 ชุด]
        B3["จัดตารางกะ (8x5)"]
        B4["FP Rate < 30%"]
    end

    subgraph Phase3["Phase 3: วิ่ง (เดือน 6-12)"]
        C1[ใช้ Playbook ครบ 50 ชุด]
        C2[EDR ครบทุก Endpoint]
        C3[Purple Team ครั้งแรก]
        C4[รายงาน KPI รายเดือน]
    end

    subgraph Phase4["Phase 4: วิ่งเร็ว (ปี 1-2)"]
        D1[โปรแกรม Threat Hunting]
        D2[Threat Intel Feeds]
        D3[SOAR Automation]
        D4[MITRE ATT&CK Coverage Map]
    end

    subgraph Phase5["Phase 5: บิน (ปี 2+)"]
        E1["SOC-CMM Level 3+"]
        E2["Triage อัตโนมัติ 80%+"]
        E3[Detection-as-Code CI/CD]
        E4[SOC Assessment ประจำปี]
    end

    Phase1 --> Phase2 --> Phase3 --> Phase4 --> Phase5

    style Phase1 fill:#e74c3c,color:#fff
    style Phase2 fill:#e67e22,color:#fff
    style Phase3 fill:#f1c40f,color:#000
    style Phase4 fill:#2ecc71,color:#fff
    style Phase5 fill:#3498db,color:#fff
```

## Checklist ขั้นต่ำของ SOC ที่ใช้งานได้จริง

สิ่งที่ต้องมีอย่างน้อยที่สุดเพื่อเริ่มต้น — "Day 1" ของคุณ:

- [ ] **SIEM 1 ตัว** (แนะนำ Wazuh สำหรับองค์กรงบจำกัด)
- [ ] **Log Source 3 แหล่ง** (Firewall, Active Directory, Email)
- [ ] **คน 3 คน** (Tier 1 Analyst 2 คน + Manager 1 คน)
- [ ] **Detection Rules 5 กฎ** (จาก `08_Detection_Engineering/sigma_rules/`)
- [ ] **Playbook 1 ชุด** (เริ่มจาก Phishing)
- [ ] **ระบบ Ticketing 1 ตัว** (TheHive หรือ Jira)
- [ ] **เส้นทาง Escalation 1 เส้น** (Tier 1 → Manager → CISO)
- [ ] **ช่องทางสื่อสาร 1 ช่อง** (Slack/Teams สำหรับทีม SOC)

> ✅ ถ้าทำครบ 8 ข้อข้างบน คุณก็มี SOC ที่ทำงานได้แล้ว!

## ใครควรอ่านอะไรก่อน

| บทบาท | ควรเริ่มอ่าน | ใช้เอกสารนี้เพื่อตัดสินใจเรื่องอะไร |
|:---|:---|:---|
| **CISO** | [SOC 101](SOC_101.th.md), [ตัวชี้วัด SOC](../06_Operations_Management/SOC_Metrics.th.md), [รายงานรายเดือน](../11_Reporting_Templates/Monthly_SOC_Report.th.md) | งบประมาณ กำลังคน และรูปแบบการดำเนินงาน |
| **SOC Manager** | [แบบประเมิน SOC](../06_Operations_Management/SOC_Assessment_Checklist.th.md), [มาตรฐานส่งมอบกะ](../06_Operations_Management/Shift_Handoff.th.md), [หลักสูตร Analyst](../10_Training_Onboarding/Analyst_Onboarding_Path.th.md) | จังหวะการทำงาน ความพร้อมก่อน go-live และขอบเขตทีม |
| **SOC Analyst** | [กรอบ IR](../05_Incident_Response/Framework.th.md), [Phishing](../05_Incident_Response/Playbooks/Phishing.th.md), [Brute Force](../05_Incident_Response/Playbooks/Brute_Force.th.md) | ต้องทำอะไรก่อนเมื่อมี alert จริง |
| **Security Engineer** | [Detection Rules](../08_Detection_Engineering/README.md), [Integration Hub](../03_User_Guides/Integration_Hub.th.md), [Log Source Matrix](../06_Operations_Management/Log_Source_Matrix.th.md) | telemetry ที่ต้องมี ลำดับ onboarding และ control gap |
| **IR Engineer** | [กรอบ Incident Response](../05_Incident_Response/Framework.th.md), [Ransomware](../05_Incident_Response/Playbooks/Ransomware.th.md), [แบบฟอร์ม Incident Report](../11_Reporting_Templates/incident_report.th.md) | flow การจำกัดวง การเก็บหลักฐาน และเส้นทางรายงาน |

## ผลลัพธ์ขั้นต่ำใน 30 วันแรก

- [ ] **อนุมัติขอบเขต SOC แล้ว**: ระบุ business unit ที่รองรับ ชั่วโมงทำการ และ severity model
- [ ] **จัดทำรายการทรัพย์สินสำคัญแล้ว**: ระบุ crown-jewel systems, identities สำคัญ และบริการที่มีผลต่อธุรกิจ
- [ ] **นำเข้า log 3 แหล่งหลักแล้ว**: อย่างน้อย identity, email และ network/security controls
- [ ] **เลือก use case 5 อันดับแรกแล้ว**: เริ่มจาก Phishing, Malware, Brute Force, Account Compromise และ Ransomware
- [ ] **ประกาศเส้นทาง escalation แล้ว**: ระบุผู้จัดการ on-call ช่องทางสื่อสาร และ trigger การแจ้งผู้บริหาร
- [ ] **เปิดใช้กระบวนการจัดการเคสแล้ว**: ทุกการสืบสวน alert ต้องมี ticket, status และ owner
- [ ] **เก็บ baseline KPI รอบแรกแล้ว**: วัด alert volume, true positives, MTTD, MTTR และ false positive rate
- [ ] **ส่งรายงานผู้บริหารรอบแรกแล้ว**: สรุปความเสี่ยง incident gap และ next actions ใน 1 หน้า

## เกณฑ์ตัดสินใจช่วงเริ่มต้น

| จุดตัดสินใจ | เงื่อนไขขั้นต่ำ | ผู้รับผิดชอบ |
|:---|:---|:---|
| **ประกาศว่า MVP SOC พร้อมใช้งาน** | SIEM รับข้อมูลจาก 3 แหล่งสำคัญขึ้นไป มีผู้จัดการรับผิดชอบ และมี detection ความเชื่อมั่นสูง 5 ตัวที่มีการเฝ้าดูทุกวัน | SOC Manager |
| **ขยายจาก 8x5 เป็น extended coverage** | backlog คงที่ เส้นทาง escalation ทดสอบแล้ว และความเสี่ยงนอกเวลาทำการรองรับเหตุผลในการขยายกะ | CISO + SOC Manager |
| **เพิ่ม detection เพิ่มเติม** | detection เดิมมี owner มีประวัติ tuning และมี response action ที่บันทึกไว้แล้ว | Security Engineer |
| **เริ่มรายงานผู้บริหาร** | นิยาม KPI ตกลงร่วมกันแล้ว แหล่งข้อมูลเสถียร และ metric gap สำคัญมีคำอธิบาย | CISO + SOC Manager |

## Trigger การ Escalate ใน 30 วันแรก

- [ ] **Escalate ไป CISO** ถ้าระบบสำคัญยังอยู่นอก monitoring scope, บัญชีผู้บริหารยังไม่ถูกป้องกัน, หรือเกิด incident รุนแรงก่อน baseline controls พร้อม
- [ ] **Escalate ไป SOC Manager** ถ้า alert backlog เกินกำลังทีมนานเกิน 1 วันทำการ หรือยังไม่มี owner สำหรับ Priority 1 gap
- [ ] **Escalate ไป Security Engineering** ถ้า telemetry ที่จำเป็นจาก identity, email หรือ network controls ไม่มีหรือใช้งานไม่ได้
- [ ] **Escalate ไป business owner** ถ้าทรัพย์สินสำคัญไม่สามารถให้ logs, retention หรือการสนับสนุนที่จำเป็นต่อ incident handling ได้

## คำถามที่พบบ่อย

| # | คำถาม | คำตอบ |
|:---|:---|:---|
| 1 | ต้องมีกี่คนถึงเริ่ม SOC ได้? | ขั้นต่ำ 3: T1 2 คน + Manager 1 คน |
| 2 | ควรใช้ SIEM ตัวไหน? | งบน้อย: Wazuh (ฟรี) / Enterprise: Splunk, Elastic, Sentinel |
| 3 | SOC จะ effective ใช้เวลานานแค่ไหน? | Crawl (3 เดือน), Walk (6 เดือน), Run (12 เดือน) |
| 4 | ต้อง 24/7 ตั้งแต่วันแรกไหม? | ไม่ เริ่มจาก 8x5 แล้วขยายเมื่อ maturity เพิ่ม |
| 5 | ควรสร้าง playbooks ตัวไหนก่อน? | Phishing, Malware, Brute Force, Account Compromise, Ransomware |
| 6 | ต้องมี detection rules กี่ตัว? | เริ่มจาก 5-10 ตัวที่ confidence สูง แล้วค่อยเพิ่ม |
| 7 | ควร build หรือ buy SOC? | เริ่มภายใน + MSSP ช่วยถ้างบพอ |
| 8 | Analyst ต้องมี cert อะไร? | T1: Security+/CySA+ / T2: GCIH / T3: GCFA/OSCP |
| 9 | วัดประสิทธิภาพ SOC อย่างไร? | MTTD, MTTR, FP rate, SLA compliance |
| 10 | ใช้ repo นี้สำหรับองค์กรได้ไหม? | ได้! Fork, ปรับแต่ง, contribute back |

## เอกสารที่เกี่ยวข้อง (Related Documents)
-   [SOC 101](SOC_101.th.md)
-   [คำศัพท์สำคัญ](Glossary.th.md)
-   [โครงสร้างทีม SOC](../06_Operations_Management/SOC_Team_Structure.th.md)
-   [หลักสูตร Analyst](../10_Training_Onboarding/Analyst_Onboarding_Path.th.md)

## References
-   [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
-   [SOC-CMM — SOC Capability Maturity Model](https://www.soc-cmm.com/)
-   [SANS SOC Survey](https://www.sans.org/white-papers/soc-survey/)
