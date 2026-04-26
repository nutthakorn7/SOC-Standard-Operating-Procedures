# SOC Analyst Onboarding Checklist / Checklist การเตรียมความพร้อม SOC Analyst

**รหัสเอกสาร**: OPS-SOP-017
**เวอร์ชัน**: 1.0
**การจัดชั้นความลับ**: ใช้ภายใน
**อัปเดตล่าสุด**: 2026-02-15

> **โปรแกรม onboarding 90 วัน** สำหรับ SOC analyst ใหม่ ครอบคลุมการให้สิทธิ์, การฝึกอบรมเครื่องมือ, การลงกะ shadow, และการประเมินความสามารถ เป้าหมาย: analyst ใหม่ทำงานได้อย่างอิสระภายใน 90 วัน

---

## เฟส 1: พื้นฐาน (สัปดาห์ 1–2)

### วันที่ 1: ต้อนรับ

- [ ] ทำเอกสาร HR & security clearance
- [ ] รับ laptop, บัตรผ่าน, physical access
- [ ] ทบทวนและลงชื่อ NDA / นโยบายการใช้งาน
- [ ] พบ SOC Manager และหัวหน้าทีม
- [ ] รับเอกสาร onboarding (เอกสารนี้ + รายการอ่าน)
- [ ] ตั้งค่าช่องทางสื่อสาร (Slack, Teams, email groups)

### วันที่ 2–3: การให้สิทธิ์เข้าถึง

| ระบบ | ระดับสิทธิ์ | ให้แล้ว | ตรวจสอบ |
|:---|:---|:---:|:---:|
| **SIEM** (ค้นหา & ดู) | อ่านอย่างเดียว | ⬜ | ⬜ |
| **EDR Console** | อ่านอย่างเดียว | ⬜ | ⬜ |
| **Ticketing** | สร้าง/แก้ไข ticket | ⬜ | ⬜ |
| **SOAR** | ดู playbook | ⬜ | ⬜ |
| **TI Platform** | ค้นหา IOC | ⬜ | ⬜ |
| **Email** | SOC distribution list | ⬜ | ⬜ |
| **Wiki / KB** | อ่าน + เขียน | ⬜ | ⬜ |
| **VPN** | SOC VPN profile | ⬜ | ⬜ |
| **Active Directory** | SOC security group | ⬜ | ⬜ |

> ⚠️ สิทธิ์เขียน SIEM rules / EDR policies จะได้หลังผ่านการประเมิน (สัปดาห์ 9+)

### วันที่ 3–5: ภาพรวม SOC

| หัวข้อ | ระยะเวลา | ผู้นำเสนอ | เอกสาร |
|:---|:---:|:---|:---|
| ภารกิจ, กฎบัตร, โครงสร้าง SOC | 1 ชม. | SOC Manager | SOC Charter |
| SOC tiers (1/2/3) และหน้าที่ | 1 ชม. | Team Lead | Roles & Responsibilities |
| ตารางกะ & handoff | 30 นาที | Shift Lead | SOC Checklists |
| ขั้นตอนสื่อสาร | 30 นาที | SOC Lead | Communication SOP |
| การ escalate | 1 ชม. | SOC Lead | Escalation Matrix |
| การจำแนก incident | 1 ชม. | Tier 2 Analyst | Incident Classification |

### วันที่ 6–10: ฝึกอบรมเครื่องมือ

| เครื่องมือ | ประเภทฝึก | ระยะเวลา | ทดสอบ |
|:---|:---|:---:|:---|
| **SIEM** | Hands-on lab | 4 ชม. | เขียน query 3 ข้อ |
| **EDR** | Walkthrough + lab | 2 ชม. | สืบสวน 1 endpoint |
| **Ticketing** | Hands-on | 1 ชม. | สร้าง & ปิด test ticket |
| **SOAR** | Demo | 1 ชม. | รัน 1 playbook ใน sandbox |
| **TI Platform** | Hands-on | 1 ชม. | ค้นหา 5 IOCs |

---

## เฟส 2: Shadow (สัปดาห์ 3–4)

### ข้อกำหนด Shadow Shift

| ข้อกำหนด | รายละเอียด |
|:---|:---|
| **ชั่วโมง shadow รวม** | อย่างน้อย 40 ชม. (5 กะเต็ม) |
| **ความหลากหลาย** | อย่างน้อย 1 กะกลางวัน + 1 กะกลางคืน |
| **Mentor** | มอบหมาย Tier 1/2 analyst แต่ละกะ |
| **กิจกรรม** | สังเกต triage, ดูการสืบสวน, ถามคำถาม |
| **ข้อจำกัด** | **ห้าม** ปิด ticket หรือดำเนินการอิสระ |
| **บันทึก** | จด 10 alerts ที่น่าสนใจและวิธี triage |

### เอกสารที่ต้องอ่าน

| เอกสาร | ลำดับ | เสร็จ |
|:---|:---:|:---:|
| IR Framework | 🔴 ต้องอ่าน | ⬜ |
| Tier 1 Runbook | 🔴 ต้องอ่าน | ⬜ |
| Playbook 5 อันดับแรก (Phishing, Malware, Unauth Access, Ransomware, BEC) | 🔴 ต้องอ่าน | ⬜ |
| Alert Tuning SOP | 🟡 ควรอ่าน | ⬜ |
| Evidence Collection | 🟡 ควรอ่าน | ⬜ |
| Log Source Matrix | 🟡 ควรอ่าน | ⬜ |

---

## เฟส 3: ทำงานแบบมีพี่เลี้ยง (สัปดาห์ 5–8)

### ข้อกำหนด

| ข้อกำหนด | รายละเอียด |
|:---|:---|
| **Mentor** | อยู่กะเดียวกัน, ถามได้ |
| **จัดการ alert** | จัดการจริง แต่ mentor review ก่อนปิด |
| **Escalation** | P2+ ต้อง escalate ให้ mentor |
| **คุณภาพ ticket** | Mentor review 20 ticket แรก |

### Milestone Checklist

- [ ] Triage 100+ alerts (mentor review)
- [ ] สร้าง 20+ tickets ที่มีเอกสารครบ
- [ ] Escalate อย่างน้อย 3 incidents ถูกต้อง
- [ ] เขียน incident report 1 ฉบับ
- [ ] ทำ evidence collection 1 ครั้ง (มีพี่เลี้ยง)
- [ ] เสนอ alert tuning request 1 รายการ
- [ ] ผ่าน quiz กลางเทอม (≥ 70%)

---

## เฟส 4: อิสระ (สัปดาห์ 9–12)

### เกณฑ์เริ่มทำงานอิสระ

- [ ] ผ่าน quiz กลางเทอม (≥ 70%)
- [ ] Mentor แนะนำให้เป็นอิสระ
- [ ] SOC Lead อนุมัติ

### กิจกรรมสัปดาห์ 9–12

- [ ] จัดการกะเต็มอิสระ (mentor โทรถามได้)
- [ ] จัดการ P2+ incident ครบวงจร อย่างน้อย 1 ครั้ง
- [ ] เขียน detection rule (Sigma) + peer review
- [ ] เข้าร่วม threat hunting exercise
- [ ] ทำ competency assessment สุดท้าย

---

## การประเมินความสามารถ (วันที่ 85–90)

### องค์ประกอบ

| องค์ประกอบ | น้ำหนัก | ผู้ประเมิน |
|:---|:---:|:---|
| **ข้อสอบ** (MC + คำตอบสั้น) | 30% | SOC Lead |
| **Lab ปฏิบัติ** (triage 5 สถานการณ์) | 40% | Tier 2 Mentor |
| **Audit คุณภาพ ticket** (สุ่ม 10 tickets) | 15% | SOC Lead |
| **ประเมินจาก mentor** | 15% | Mentor ที่มอบหมาย |

### สถานการณ์ Lab ปฏิบัติ

| # | สถานการณ์ | สิ่งที่คาดหวัง | เวลา |
|:---:|:---|:---|:---:|
| 1 | Phishing email + ไฟล์แนบอันตราย | วิเคราะห์ email, ดึง IOC, บล็อก | 20 นาที |
| 2 | Brute-force login ตามด้วย success | ตรวจ log, ประเมิน account, escalate | 15 นาที |
| 3 | EDR alert: process น่าสงสัย | สืบสวน process, ตัดสินใจ contain | 15 นาที |
| 4 | สัญญาณ data exfiltration | วิเคราะห์ network, ขอบเขต, escalate | 20 นาที |
| 5 | False positive — triage & document | ระบุ FP, เอกสาร, เสนอ tuning | 10 นาที |

### เกณฑ์ผ่าน

| เกณฑ์ | ต้องได้ |
|:---|:---:|
| คะแนนข้อสอบ | ≥ 70% |
| คะแนน lab ปฏิบัติ | ≥ 75% |
| คุณภาพ ticket | ≥ 80% |
| แนะนำจาก mentor | บวก |

---

## ทบทวน 30-60-90 วัน

| ทบทวน | สัปดาห์ | ผู้เข้าร่วม | โฟกัส |
|:---|:---:|:---|:---|
| **30 วัน** | 4 | Analyst + Mentor + SOC Lead | ความสะดวกสบาย, ปัญหา access, ช่องว่างการเรียนรู้ |
| **60 วัน** | 8 | Analyst + Mentor + SOC Lead | ความก้าวหน้า, คุณภาพ ticket, ความพร้อมสำหรับอิสระ |
| **90 วัน** | 12 | Analyst + SOC Manager | ผลการประเมิน, ยืนยันบทบาท, แผนพัฒนา |

---

## การพัฒนาต่อเนื่อง (หลัง 90 วัน)

| กิจกรรม | ความถี่ | เป้าหมาย |
|:---|:---:|:---|
| 1-on-1 กับ SOC Lead | รายเดือน | พัฒนาอาชีพ, feedback |
| หลักสูตรขั้นสูง | รายไตรมาส | Threat hunting, forensics, cloud |
| Certification | รายปี | BTL1, CySA+, GCIH, GCIA |
| Cross-training (ทักษะ Tier 2) | หลัง 6 เดือน | เตรียมเลื่อนตำแหน่ง |
| Purple team | รายไตรมาส | เทคนิค adversary จริง |

---

## Onboarding Timeline

| สัปดาห์ | หัวข้อ | กิจกรรม | ผู้ดูแล |
|:---|:---|:---|:---|
| **สัปดาห์ 1** | Orientation | ทัวร์ SOC, แนะนำทีม, เข้าถึงระบบ | SOC Manager |
| **สัปดาห์ 2** | Tools | SIEM training, EDR console, ticketing | Tier 2 Mentor |
| **สัปดาห์ 3** | Process | Playbooks, escalation, shift handoff | Shift Lead |
| **สัปดาห์ 4** | Shadow | เข้ากะจริง (shadow Tier 1 analyst) | Buddy |
| **สัปดาห์ 5-6** | Supervised | Triage alerts ด้วยตัวเอง + review | Shift Lead |
| **สัปดาห์ 7-8** | Independent | ทำงานอิสระ + ประเมินผล | SOC Manager |

## Day 1 Checklist

| # | รายการ | สถานะ |
|:---:|:---|:---:|
| 1 | Badge / Physical access สำเร็จ | ☐ |
| 2 | AD account + email เปิดใช้งาน | ☐ |
| 3 | VPN access ทดสอบแล้ว | ☐ |
| 4 | SIEM console access | ☐ |
| 5 | EDR console access | ☐ |
| 6 | Ticketing system access | ☐ |
| 7 | Chat/Teams channel เข้าร่วมแล้ว | ☐ |
| 8 | Wiki/Knowledge base access | ☐ |
| 9 | ลงชื่อ NDA + Acceptable Use Policy | ☐ |
| 10 | พบ mentor/buddy | ☐ |

## Competency Assessment

| ทักษะ | ระดับที่คาดหวัง (30 วัน) | วิธีประเมิน |
|:---|:---|:---|
| Alert triage | Triage ได้ 10+ alerts/ชม. | สังเกต + review |
| SIEM query | เขียน basic query ได้ | Lab exercise |
| Playbook execution | ทำตาม playbook ได้ถูกต้อง | Tabletop |
| Escalation judgment | รู้เมื่อไหร่ต้อง escalate | Scenario test |
| Documentation | บันทึก investigation ได้ครบ | Ticket review |

## 90-Day Competency Assessment

### Skills Matrix

| Skill Area | Day 30 | Day 60 | Day 90 |
|:---|:---|:---|:---|
| Alert Triage | ทำได้ด้วยตัวเอง | มีประสิทธิภาพ | Expert |
| SIEM Queries | Basic searches | Complex queries | Custom dashboards |
| IR Procedures | รู้จัก playbooks | ปฏิบัติได้ | นำทีมได้ |
| Communication | รู้ escalation path | รายงานได้ดี | สอนคนอื่นได้ |
| Tools (EDR/FW) | Basic navigation | Investigation | Advanced hunting |

### Onboarding Feedback Survey

| Week | Survey Focus | Questions |
|:---|:---|:---|
| Week 2 | Initial experience | 5 ข้อ (scale 1-5) |
| Week 4 | Tool proficiency | 8 ข้อ + open-ended |
| Week 8 | Process confidence | 6 ข้อ + self-assess |
| Week 12 | Overall readiness | 10 ข้อ + manager eval |

### Buddy System Assignment

| Week | Focus | Buddy Role |
|:---|:---|:---|
| 1-2 | Tool navigation | Senior Analyst |
| 3-4 | Alert triage | Tier 2 |
| 5-8 | Investigation | Tier 2/3 |
| 9-12 | Independent work | Manager |

## เกณฑ์ขั้นต่ำก่อนเข้ากะอิสระ (Minimum Readiness Criteria Before Independent Shift)

| ข้อกำหนด | เหตุผล | ผู้รับผิดชอบ |
|:---|:---|:---|
| ตรวจสิทธิ์และสาธิตงานพื้นฐานในเครื่องมือหลักได้ | ป้องกัน access gap ตอนทำเคสจริง | SOC Analyst + Mentor |
| คุณภาพ ticket และ judgment เรื่อง escalation ผ่านเกณฑ์ | ยืนยันว่าทำงานได้อย่างปลอดภัย | SOC Lead |
| อ่านและทำความเข้าใจ core playbooks กับ IR framework แล้ว | ทำให้การตัดสินใจยึดเอกสาร ไม่ใช่เดา | SOC Analyst |
| มี mentor sign-off และผล assessment บันทึกไว้ | สร้าง accountability ก่อนปล่อยเข้ากะจริง | SOC Manager |
| ยืนยัน after-hours contact path และ support model แล้ว | ลดความเสี่ยงในกะแรกที่ทำเอง | Shift Lead |

## Trigger สำหรับการยกระดับระหว่าง Onboarding (Onboarding Escalation Triggers)

| เงื่อนไข | ยกระดับถึง | SLA | การดำเนินการที่ต้องทำ |
|:---|:---|:---:|:---|
| สิทธิ์ที่จำเป็นยังไม่ครบหลังจบเป้าหมายสัปดาห์แรก | SOC Manager + IAM owner | ภายในวันทำการเดียวกัน | แก้ access block ก่อนเข้าเฟสถัดไป |
| Analyst ไม่ผ่าน checkpoint สองครั้งในเฟสเดียวกัน | SOC Manager | ภายใน 24 ชม. | ทำ remediation plan หรือขยายช่วง supervised |
| mentor ไม่พอสำหรับ guided work | SOC Lead | ภายในวันทำการเดียวกัน | เปลี่ยน mentor หรือหยุด milestone ชั่วคราว |
| Analyst ถูกปล่อยเข้ากะอิสระโดยไม่มี readiness evidence | SOC Manager | ทันที | ดึงกลับมา supervised mode |

## เอกสารที่เกี่ยวข้อง

-   SOC Charter — ภารกิจและโครงสร้าง
-   Roles & Responsibilities — นิยาม tier
-   Training Program — แผนฝึกอบรมระยะยาว
-   [Tier 1 Runbook](../05_Incident_Response/Runbooks/Tier1_Runbook.th.md) — ขั้นตอนรายวัน
-   [IR Framework](../05_Incident_Response/Framework.th.md) — วงจร IR
-   [Escalation Matrix](../05_Incident_Response/Escalation_Matrix.th.md) — เมื่อไรต้อง escalate
