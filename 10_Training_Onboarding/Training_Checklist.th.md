# เช็คลิสต์การฝึกอบรม Analyst

> **วัตถุประสงค์**: โปรแกรมอบรม 8 สัปดาห์สำหรับ SOC analyst ใหม่ ครอบคลุมเครื่องมือ, กระบวนการ, และขั้นตอนปฏิบัติก่อนเข้ากะจริง

---

**ชื่อ Analyst**: ____________________
**วันที่เริ่ม**: YYYY-MM-DD
**พี่เลี้ยง (Mentor)**: ____________________
**SOC Manager**: ____________________
**เป้าหมายเสร็จสิ้น**: 8 สัปดาห์

---

## สัปดาห์ที่ 1: สภาพแวดล้อมและการเข้าถึง

| # | งาน | แหล่งข้อมูล | เสร็จ |
|:---:|:---|:---|:---:|
| 1.1 | รับ laptop, บัตรพนักงาน, credentials | IT Ops | ☐ |
| 1.2 | เซ็น NDA / security clearance | HR + Legal | ☐ |
| 1.3 | เปิดสิทธิ์: SIEM, EDR, SOAR, Ticketing | IAM Team | ☐ |
| 1.4 | อ่าน: [System Activation](../10_Training_Onboarding/System_Activation.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 1.5 | อ่าน: [Data Governance Policy](../07_Compliance_Privacy/Data_Governance_Policy.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 1.6 | อ่าน: [Change Management (RFC)](../06_Operations_Management/Change_Management.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 1.7 | ทัวร์: ห้อง SOC, war room, โทรศัพท์ escalation | Mentor | ☐ |

**✅ Checkpoint**: นำทาง SIEM Dashboard ได้สำเร็จ, หาคิว alert ได้
**ลายเซ็น Mentor**: ________ **วันที่**: ________

---

## สัปดาห์ที่ 2: การปฏิบัติงาน SOC

| # | งาน | แหล่งข้อมูล | เสร็จ |
|:---:|:---|:---|:---:|
| 2.1 | อ่าน: [มาตรฐานส่งมอบกะ](../06_Operations_Management/Shift_Handoff.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 2.2 | อ่าน: [Escalation Matrix](../05_Incident_Response/Escalation_Matrix.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 2.3 | อ่าน: [ตัวชี้วัด SOC & KPIs](../06_Operations_Management/SOC_Metrics.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 2.4 | สังเกตการณ์: ดูการส่งมอบกะจริง 2 ครั้ง | Shift Lead | ☐ |
| 2.5 | ฝึก: เขียน shift handover log (จำลอง) | Mentor | ☐ |

**✅ Checkpoint**: อธิบายกระบวนการส่งมอบกะ, ระบุผู้ติดต่อ escalation ได้
**ลายเซ็น Mentor**: ________ **วันที่**: ________

---

## สัปดาห์ที่ 3: กรอบการตอบสนองต่อเหตุการณ์

| # | งาน | แหล่งข้อมูล | เสร็จ |
|:---:|:---|:---|:---:|
| 3.1 | อ่าน: [กรอบ IR (NIST)](../05_Incident_Response/Framework.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 3.2 | อ่าน: [Severity Matrix](../05_Incident_Response/Severity_Matrix.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 3.3 | อ่าน: [การจำแนกเหตุการณ์](../05_Incident_Response/Incident_Classification.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 3.4 | ดู: [แบบฟอร์ม Incident Report](../11_Reporting_Templates/incident_report.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 3.5 | สังเกตการณ์: ดู Tier 2 จัดการ incident จริง | Tier 2 Analyst | ☐ |
| 3.6 | เรียน: RACI matrix — รู้ว่าใครทำอะไร | ศึกษาด้วยตนเอง | ☐ |

**✅ Checkpoint**: อธิบาย 6 ขั้นตอน IR และเกณฑ์ตัดสินใจ containment สำหรับ Critical vs High
**ลายเซ็น Mentor**: ________ **วันที่**: ________

---

## สัปดาห์ที่ 4: Playbooks (ชุดหลัก)

| # | งาน | แหล่งข้อมูล | เสร็จ |
|:---:|:---|:---|:---:|
| 4.1 | อ่าน: [PB-01 Phishing](../05_Incident_Response/Playbooks/Phishing.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 4.2 | อ่าน: [PB-02 Ransomware](../05_Incident_Response/Playbooks/Ransomware.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 4.3 | อ่าน: [PB-03 Malware](../05_Incident_Response/Playbooks/Malware_Infection.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 4.4 | อ่าน: [PB-04 Account Compromise](../05_Incident_Response/Playbooks/Account_Compromise.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 4.5 | อ่าน: [PB-05 BEC](../05_Incident_Response/Playbooks/BEC.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 4.6 | ฝึก: ปฏิบัติตาม playbook phishing กับ alert จำลอง | Mentor | ☐ |
| 4.7 | ฝึก: ปฏิบัติตาม playbook malware กับ alert จำลอง | Mentor | ☐ |

**✅ Checkpoint**: อธิบายขั้นตอน "Containment" ของ Ransomware; สาธิต phishing triage
**ลายเซ็น Mentor**: ________ **วันที่**: ________

---

## สัปดาห์ที่ 5: การตรวจจับและข่าวกรองภัยคุกคาม

| # | งาน | แหล่งข้อมูล | เสร็จ |
|:---:|:---|:---|:---:|
| 5.1 | อ่าน: [Content Management Lifecycle](../03_User_Guides/Content_Management.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 5.2 | อ่าน: [Threat Intelligence Lifecycle](../06_Operations_Management/Threat_Intelligence_Lifecycle.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 5.3 | ดู: Sigma Rules Library (เรียกดู 10 rules) | ศึกษาด้วยตนเอง | ☐ |
| 5.4 | ฝึก: เขียน SIEM correlation search เบื้องต้น | Mentor | ☐ |
| 5.5 | ฝึก: Enrich IoC ด้วย VirusTotal และ URLScan | Mentor | ☐ |

**✅ Checkpoint**: อธิบาย logic ของ Sigma rule `proc_office_spawn_powershell.yml`; สาธิตการ enrich IoC
**ลายเซ็น Mentor**: ________ **วันที่**: ________

---

## สัปดาห์ที่ 6: Compliance และการจัดการข้อมูล

| # | งาน | แหล่งข้อมูล | เสร็จ |
|:---:|:---|:---|:---:|
| 6.1 | อ่าน: [PDPA Compliance](../07_Compliance_Privacy/PDPA_Compliance.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 6.2 | อ่าน: [Data Handling Protocol](../06_Operations_Management/Data_Handling_Protocol.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 6.3 | ตอบคำถาม: จำแนกข้อมูล — อะไรคือ PII, อะไรต้องแจ้งเตือน? | Mentor | ☐ |

**✅ Checkpoint**: จำแนก 5 สถานการณ์ข้อมูลตามข้อกำหนด PDPA ได้ถูกต้อง
**ลายเซ็น Mentor**: ________ **วันที่**: ________

---

## สัปดาห์ที่ 7: การจำลองและทดสอบ

| # | งาน | แหล่งข้อมูล | เสร็จ |
|:---:|:---|:---|:---:|
| 7.1 | อ่าน: [Simulation Guide](../09_Simulation_Testing/Simulation_Guide.th.md) | ศึกษาด้วยตนเอง | ☐ |
| 7.2 | ปฏิบัติ: Atomic Red Team Test (T1059.001 — PowerShell) | Lab | ☐ |
| 7.3 | ปฏิบัติ: Atomic Red Team Test (T1566.001 — Spearphishing) | Lab | ☐ |
| 7.4 | ตรวจสอบ: ยืนยัน SIEM ตรวจจับ simulation ทั้งสองได้ | Lab | ☐ |
| 7.5 | เข้าร่วม: การซ้อมแผน (Tabletop exercise) | ทีม SOC | ☐ |

**✅ Checkpoint**: ปฏิบัติ Atomic test สำเร็จ 2 รายการ, ยืนยันการตรวจจับใน SIEM, เข้าร่วม tabletop
**ลายเซ็น Mentor**: ________ **วันที่**: ________

---

## สัปดาห์ที่ 8: การประเมินและจบหลักสูตร

| # | งาน | แหล่งข้อมูล | เสร็จ |
|:---:|:---|:---|:---:|
| 8.1 | จัดการ: alert จริง 5 รายการด้วยตนเอง (มี mentor คอยดู) | Production | ☐ |
| 8.2 | ส่ง: Mock Incident Report (ครบวงจร) | Template | ☐ |
| 8.3 | สอบ: ข้อเขียน (30 ข้อ) | SOC Manager | ☐ |
| 8.4 | สอบ: ปฏิบัติ (triage + escalation จำลอง) | SOC Manager | ☐ |
| 8.5 | ปฏิบัติ: เป็น incoming lead ในการส่งมอบกะ 1 ครั้ง (มีคนดูแล) | Shift Lead | ☐ |

**✅ การประเมินขั้นสุดท้าย**:

| เกณฑ์ | คะแนน | ผ่าน/ไม่ผ่าน |
|:---|:---:|:---:|
| สอบข้อเขียน (≥ 80%) | ____/100 | ☐ |
| สอบปฏิบัติ (≥ 80%) | ____/100 | ☐ |
| คุณภาพ Mock Incident Report | ____/5 | ☐ |
| คำแนะนำจาก Mentor | ใช่/ไม่ | ☐ |

**🎓 ลงนามขั้นสุดท้าย**: พร้อมสำหรับการหมุนเวียนกะจริง

| บทบาท | ชื่อ | ลายเซ็น | วันที่ |
|:---|:---|:---|:---|
| Analyst | | | |
| Mentor | | | |
| SOC Manager | | | |

---

## ใบรับรองที่แนะนำ

| ใบรับรอง | ผู้ให้บริการ | ระดับ | ระยะเวลาแนะนำ |
|:---|:---|:---|:---|
| CompTIA Security+ | CompTIA | เริ่มต้น | ก่อนเริ่มงาน |
| CompTIA CySA+ | CompTIA | กลาง | ภายใน 6 เดือน |
| GIAC GSOC | SANS | กลาง | ภายใน 1 ปี |
| SC-200 | Microsoft | กลาง | ภายใน 6 เดือน |
| BTL1 | Security Blue Team | เริ่มต้น–กลาง | ภายใน 6 เดือน |

---

## เอกสารที่เกี่ยวข้อง

- [เส้นทางการอบรม Analyst](Analyst_Onboarding_Path.th.md)
- [โครงสร้างทีม SOC](../06_Operations_Management/SOC_Team_Structure.th.md)
- [คู่มือการจำลอง](../09_Simulation_Testing/Simulation_Guide.th.md)
- [แบบฟอร์ม Incident Report](../11_Reporting_Templates/incident_report.th.md)

### Training Completion Tracking

| Module | Required | Completed |
|:---|:---|:---|
| SOC Overview | ✅ | ☐ |
| SIEM Basics | ✅ | ☐ |

## เกณฑ์ตัดสินใจก่อนปล่อยเข้ากะจริง (Release-to-Production Decision Criteria)

| เกณฑ์ | เงื่อนไขผ่าน | ผู้รับผิดชอบ |
|:---|:---|:---|
| ข้อสอบและการประเมินภาคปฏิบัติ | ผ่านตามคะแนนที่กำหนด | SOC Manager |
| คุณภาพ ticket และพฤติกรรมการ escalate | ไม่มี critical gap ใน sample ที่ review | Mentor |
| ความชำนาญเครื่องมือหลัก | ทำงานใน SIEM, EDR, ticketing ได้โดยไม่ต้องช่วย | SOC Lead |
| ความเข้าใจด้าน compliance และ data handling | ผ่าน checkpoint เรื่อง PDPA และหลักฐาน | SOC Manager |

## Trigger สำหรับการยกระดับจาก Checklist (Checklist Escalation Triggers)

| เงื่อนไข | ยกระดับถึง | SLA | การดำเนินการที่ต้องทำ |
|:---|:---|:---:|:---|
| milestone รายสัปดาห์หลุดโดยไม่มี recovery plan | SOC Manager | ภายใน 24 ชม. | ตั้ง training schedule ใหม่ |
| ผ่านภาคทฤษฎีแต่ไม่ผ่านภาคปฏิบัติ | Mentor + SOC Lead | ภายในวันทำการเดียวกัน | ขยาย supervised practice |
| คุณภาพเอกสารต่ำกว่าเกณฑ์ต่อเนื่อง | SOC Lead | ภายใน 24 ชม. | จัด writing review แบบเฉพาะจุดและทดสอบใหม่ |

## References

- [SANS SOC Analyst Training](https://www.sans.org/cyber-security-courses/)
- [CompTIA CySA+](https://www.comptia.org/certifications/cybersecurity-analyst)
- [MITRE ATT&CK Training](https://attack.mitre.org/resources/training/)
