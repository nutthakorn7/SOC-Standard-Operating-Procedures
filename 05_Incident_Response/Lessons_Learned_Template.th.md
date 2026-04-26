# แม่แบบ Lessons Learned (บทเรียนจากเหตุการณ์)

> **รหัสเอกสาร:** LL-001  
> **เวอร์ชัน:** 1.0  
> **อัปเดตล่าสุด:** 2026-02-15

---

## สรุปเหตุการณ์

| ข้อมูล | รายละเอียด |
|:---|:---|
| **Incident ID** | INC-YYYY-NNN |
| **วันที่ตรวจพบ** | YYYY-MM-DD HH:MM |
| **วันที่แก้ไขเสร็จ** | YYYY-MM-DD HH:MM |
| **ระดับ** | P1 / P2 / P3 / P4 |
| **ประเภท** | (Phishing / Ransomware / ฯลฯ) |
| **ระบบที่ได้รับผลกระทบ** | |
| **ผลกระทบทางธุรกิจ** | (downtime, ข้อมูลรั่ว, ค่าใช้จ่าย) |

---

## KPIs

| ตัวชี้วัด | ค่า | เป้า SLA | ผ่าน? |
|:---|:---:|:---:|:---:|
| MTTD | ___ นาที | ≤ 60 นาที | ✅/❌ |
| MTTR | ___ นาที | ≤ 240 นาที | ✅/❌ |
| เวลา Contain | ___ นาที | ≤ 60 นาที | ✅/❌ |

---

## สิ่งที่ทำได้ดี ✅
1. ___
2. ___

## สิ่งที่ต้องปรับปรุง ❌
1. ___
2. ___

## สาเหตุรากเหง้า
_อธิบาย root cause 2–3 ประโยค_

---

## รายการแก้ไข

| # | สิ่งที่ต้องทำ | ผู้รับผิดชอบ | กำหนด | สถานะ |
|:---:|:---|:---|:---:|:---:|
| 1 | สร้าง detection rule สำหรับ ____ | DetEng | | ☐ |
| 2 | อัปเดต playbook PB-XX | SOC Lead | | ☐ |
| 3 | Implement MFA สำหรับ ____ | IT | | ☐ |

## เส้นทางการปรับปรุงหลัง PIR

| ประเภทข้อค้นพบจาก PIR | ต้องส่งต่อไปที่ | ผลลัพธ์ขั้นต่ำ |
|:---|:---|:---|
| **detection gap** | detection backlog / weekly detection review | rule request, test owner, และ target release date |
| **telemetry หรือ visibility gap** | telemetry backlog / weekly telemetry review | source ที่ขาด, onboarding owner, และ workaround ชั่วคราว |
| **remediation หรือ control failure** | monthly remediation review | owner, due date, และ validation evidence ที่คาดหวัง |
| **residual risk ยังเป็น High** | monthly governance และ quarterly risk acceptance review | residual risk statement, compensating controls, และข้อเสนอการยกระดับ |
| **ขาด funding, authority, หรือเป็น strategic gap** | board quarterly decision pack | business impact, decision request, และผู้บริหารที่รับผิดชอบ |

## เกณฑ์ปิด PIR

-   [ ] action item ทุกข้อมี owner และ due date ชัดเจน
-   [ ] รายการที่ต้องเข้าคิว backlog มีเลขอ้างอิง intake หรือ tracking ID
-   [ ] หาก residual risk ยังเป็น High ต้องถูกยกระดับอย่างชัดเจน ไม่ปล่อยค้างในบันทึก PIR
-   [ ] ระบุ governance forum ถัดไปสำหรับทุกประเด็นที่ incident team ปิดเองไม่ได้

---

## การจัดอันดับการปรับปรุง

| ลำดับ | หมวดหมู่ | รายการ | ผู้รับผิดชอบ | กำหนด | สถานะ |
|:---:|:---|:---|:---|:---:|:---:|
| 🔴 สูง | Detection | สร้าง Sigma rule สำหรับ attack vector ที่ใช้ | DetEng | | ☐ |
| 🟡 กลาง | Process | อัปเดต Playbook ที่เกี่ยวข้อง | SOC Lead | | ☐ |
| 🟢 ต่ำ | Training | จัดอบรม awareness สำหรับผู้ใช้ | HR | | ☐ |

## ผลกระทบทางธุรกิจโดยละเอียด

| ด้าน | รายละเอียด |
|:---|:---|
| **Downtime** | [XX] ชั่วโมง |
| **ผู้ใช้ที่ได้รับผลกระทบ** | [XX] คน |
| **ข้อมูลที่ได้รับผลกระทบ** | [ระบุประเภทและปริมาณ] |
| **ค่าใช้จ่าย (ประมาณ)** | [XX] บาท |
| **ความเสี่ยงทางกฎหมาย** | [PDPA notification required? ใช่/ไม่] |

## รูปแบบ Lessons Learned ที่พบบ่อย

จากผลการวิเคราะห์ incident ที่ผ่านมา:

| # | รูปแบบ | ความถี่ | สาเหตุหลัก | แนวทางแก้ไข |
|:---|:---|:---:|:---|:---|
| 1 | ไม่มี detection rule สำหรับ technique | 40% | TTP ใหม่ยังไม่ครอบคลุม | สร้าง Sigma rule ภายใน 48 ชม. |
| 2 | Playbook มีข้อมูลติดต่อเก่า | 25% | การเปลี่ยนแปลงคนไม่ได้อัปเดต | ตรวจสอบ SOP รายเดือน |
| 3 | ตรวจจับช้า (MTTD > SLA) | 20% | Alert fatigue, queue แน่น | ปรับ rules, เพิ่ม context, ลด FP |
| 4 | Containment ล่าช้าเพราะรอ approval | 15% | Chain อนุมัติไม่ชัด | Pre-authorize containment สำหรับภัยที่ยืนยันแล้ว |
| 5 | หลักฐาน chain of custody ขาด | 10% | ไม่มี forensic procedure มาตรฐาน | บังคับใช้ forensic SOP checklist |
| 6 | Communication gaps ตอน P1 | 20% | ไม่เปิด war room | Auto-activate war room สำหรับ P1 |
| 7 | ช่องโหว่เดิมถูกโจมตีซ้ำ | 15% | ไม่ได้ patch หลังแจ้ง | ติดตาม patch อัตโนมัติ + escalation |

## แนวปฏิบัติที่ดีสำหรับการประชุม Lessons Learned

### Checklist สำหรับผู้นำประชุม
```
ก่อนประชุม:
□ นัดภายใน 5 วันทำการหลังปิด incident
□ ส่งเอกสารอ่านล่วงหน้า: timeline, metrics, ผลเบื้องต้น
□ เชิญ: Lead analyst, T2/T3 ที่เกี่ยว, SOC Manager, IT contacts
□ จอง 60-90 นาที

ระหว่างประชุม:
□ ตั้งกฎ: ไม่ตำหนิคน, โฟกัสกระบวนการ
□ เดินผ่าน timeline ด้วยกัน
□ แต่ละขั้น ถาม: "อะไรดี? อะไรไม่ดี?"
□ ระบุ action items พร้อม เจ้าของ+กำหนด เฉพาะ
□ จัดลำดับความสำคัญ: 3 actions ที่มีผลกระทบมากที่สุด

หลังประชุม:
□ ส่ง meeting notes ภายใน 24 ชม.
□ สร้าง tickets สำหรับทุก action items
□ ติดตามการทำเสร็จใน weekly SOC ops meeting
□ ปิด LL record เมื่อ actions ทั้งหมดเสร็จ
```

### วัฒนธรรม Blameless Post-Mortem

| ✅ ควรทำ | ❌ ไม่ควรทำ |
|:---|:---|
| โฟกัสที่ระบบล้มเหลว ไม่ใช่คนผิดพลาด | ตำหนิคนเฉพาะ |
| ถาม "อะไรทำให้เกิดขึ้นได้?" | ถาม "ใครทำ?" |
| ชื่นชม detection และ escalation ที่ดี | โฟกัสแค่ความล้มเหลว |
| แชร์ผลการเรียนรู้ทั้งทีม | เก็บ lessons learned ไว้ส่วนตัว |
| ติดตามการแก้ไขจนเสร็จ | ระบุ action items แต่ไม่ติดตาม |

## เอกสารที่เกี่ยวข้อง
- [IR Framework](Framework.th.md)
- [แม่แบบรายงานเหตุการณ์](../11_Reporting_Templates/incident_report.th.md)
- [Escalation Matrix](Escalation_Matrix.th.md)
- [Monthly Remediation Review Pack](../11_Reporting_Templates/Monthly_Remediation_Review_Pack.th.md)
- [Monthly Governance Review Pack](../11_Reporting_Templates/Monthly_Governance_Review_Pack.th.md)
- [Quarterly Risk Acceptance Review Pack](../11_Reporting_Templates/Quarterly_Risk_Acceptance_Review_Pack.th.md)
- [Board Quarterly Decision Pack](../11_Reporting_Templates/Board_Quarterly_Decision_Pack.th.md)

---

## Lessons Learned Meeting Agenda

### Meeting Structure (60 นาที)

| เวลา | หัวข้อ | ผู้นำ |
|:---|:---|:---|
| 0-5 min | เปิดประชุม + กฎ | Facilitator |
| 5-15 min | Timeline walkthrough | Incident Commander |
| 15-30 min | What went well? | ทุกคน |
| 30-45 min | What needs improvement? | ทุกคน |
| 45-55 min | Action items + owners | Facilitator |
| 55-60 min | สรุป + next steps | Incident Commander |

### Action Item Tracking

| # | Action | Owner | Due Date | Status |
|:---|:---|:---|:---|:---|
| 1 | อัปเดต playbook X | Analyst A | +2 weeks | ⬜ Open |
| 2 | สร้าง detection rule | Engineer B | +1 week | ⬜ Open |
| 3 | แก้ communication gap | SOC Manager | +3 days | ⬜ Open |

### Root Cause Categories

| Category | Description | ตัวอย่าง |
|:---|:---|:---|
| Process | กระบวนการไม่ครบ | ไม่มี playbook |
| People | ทักษะ/การสื่อสาร | ไม่ escalate ตามเวลา |
| Technology | เครื่องมือขัดข้อง | Alert ไม่ trigger |
| External | ปัจจัยภายนอก | Zero-day exploit |

### Improvement Tracking

| Lesson | Action Owner | Deadline | Status |
|:---|:---|:---|:---|
| Slow detection | Add rule | 2 wks | ☐ |
| Poor comms | Update plan | 1 wk | ☐ |
| Missing log | Onboard source | 3 wks | ☐ |

## ลงชื่อ

```
SOC Manager: ____________________ วันที่: __________
CISO:        ____________________ วันที่: __________
```

## References

- [NIST SP 800-61 Rev. 2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
