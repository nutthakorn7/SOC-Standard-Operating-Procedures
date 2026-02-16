# แบบฟอร์มร้องขอการเปลี่ยนแปลง (Request for Change - RFC)

> **คำแนะนำ**: กรอกทุกส่วนก่อนส่ง CAB อนุมัติ สำหรับ Emergency change สามารถข้าม CAB แต่ต้องได้รับอนุมัติวาจาจาก SOC Manager + CISO และทบทวนย้อนหลังภายใน 48 ชั่วโมง

---

## ส่วนหัว

| ฟิลด์ | ค่า |
|:---|:---|
| **รหัส RFC** | #RFC-YYYYMMDD-XX |
| **ผู้ร้องขอ** | [ชื่อ / ตำแหน่ง] |
| **วันที่ส่ง** | YYYY-MM-DD |
| **วันที่เป้าหมาย** | YYYY-MM-DD |
| **ประเภท** | ☐ Standard · ☐ Normal · ☐ Emergency |
| **ลำดับความสำคัญ** | ☐ Critical · ☐ High · ☐ Medium · ☐ Low |
| **สภาพแวดล้อม** | ☐ Production · ☐ Staging · ☐ Development |

---

## 1. รายละเอียดการเปลี่ยนแปลง

| มิติ | รายละเอียด |
|:---|:---|
| **ส่วนประกอบ** | [SIEM / EDR / SOAR / Network / อื่นๆ] |
| **สรุปการเปลี่ยนแปลง** | [เช่น ติดตั้งกฎตรวจจับใหม่ 'Detect Mimikatz T1003'] |
| **ขอบเขต** | [ระบบ/tenant/region ที่ได้รับผลกระทบ] |
| **เวอร์ชัน** | จาก: [ปัจจุบัน] → เป็น: [เป้าหมาย] |

---

## 2. เหตุผลความจำเป็น

| คำถาม | คำตอบ |
|:---|:---|
| **ความต้องการทางธุรกิจ** | |
| **ความเสี่ยงที่ลดได้** | |
| **ผลกระทบหากไม่เปลี่ยน** | |
| **ข้อกำหนดกฎระเบียบ?** | ☐ ใช่ (ระบุ) · ☐ ไม่ใช่ |

---

## 3. วิเคราะห์ผลกระทบ

| มิติ | การประเมิน |
|:---|:---|
| **ระบบที่ได้รับผลกระทบ** | [รายการระบบทั้งหมด] |
| **ทีมที่ได้รับผลกระทบ** | [SOC / IT Ops / Network / ผู้ใช้] |
| **ความเสี่ยงที่จะล้มเหลว** | ☐ ต่ำ · ☐ กลาง · ☐ สูง |
| **ต้องหยุดระบบ** | ☐ ใช่ (ระยะเวลา: ____) · ☐ ไม่ใช่ |
| **ผลกระทบ Performance** | ☐ ไม่มี · ☐ ลดลงชั่วคราว · ☐ สำคัญ |
| **ความเสี่ยง False Positive** | ☐ ต่ำ · ☐ กลาง · ☐ สูง |

---

## 4. แผนการดำเนินการ

| # | ขั้นตอน | ผู้รับผิดชอบ | ระยะเวลา | เช็คพอยต์ |
|:---:|:---|:---|:---|:---|
| 1 | สำรองข้อมูล/snapshot ก่อนเปลี่ยน | | | ☐ |
| 2 | [ขั้นตอนดำเนินการ] | | | ☐ |
| 3 | [ขั้นตอนดำเนินการ] | | | ☐ |
| 4 | ตรวจสอบหลังเปลี่ยน | | | ☐ |
| 5 | ระยะเวลาเฝ้าระวัง | | | ☐ |

---

## 5. การทดสอบและตรวจสอบ

| การทดสอบ | ผลที่คาดหวัง | ผลจริง | ผ่าน? |
|:---|:---|:---|:---:|
| ทดสอบฟังก์ชัน | | | ☐ |
| ทดสอบ Performance | | | ☐ |
| ตรวจสอบ Alert (กฎตรวจจับ) | | | ☐ |
| ไม่มี regression กฎเดิม | | | ☐ |

---

## 6. แผนถอยกลับ (Rollback)

| # | ขั้นตอน Rollback | ผู้รับผิดชอบ | ระยะเวลา |
|:---:|:---|:---|:---|
| 1 | | | |
| 2 | | | |
| 3 | ยืนยัน rollback สำเร็จ | | |

**เงื่อนไข Rollback**: [อะไรจะทำให้ต้อง rollback?]

---

## 7. การอนุมัติ (CAB)

| ตำแหน่ง | ชื่อ | ผลตัดสิน | วันที่ |
|:---|:---|:---:|:---|
| SOC Manager | | ☐ อนุมัติ · ☐ ปฏิเสธ | |
| IT Operations | | ☐ อนุมัติ · ☐ ปฏิเสธ | |
| Security Lead | | ☐ อนุมัติ · ☐ ปฏิเสธ | |
| CISO (เฉพาะ Critical) | | ☐ อนุมัติ · ☐ ปฏิเสธ | |

---

## 8. ทบทวนหลังดำเนินการ

| ตัวชี้วัด | ค่า |
|:---|:---|
| **เปลี่ยนแปลงสำเร็จ?** | ☐ สำเร็จ · ☐ บางส่วน · ☐ ไม่สำเร็จ (rollback) |
| **เวลาดำเนินการจริง** | |
| **ปัญหาที่พบ** | |
| **บทเรียน** | |

---

## เกณฑ์ประเมินความเสี่ยง

| ปัจจัย | ต่ำ (1) | กลาง (2) | สูง (3) |
|:---|:---|:---|:---|
| **ขอบเขต** | Rule/dashboard เดียว | หลายเครื่องมือ/config | Core infrastructure |
| **ย้อนกลับ** | Rollback ทันที | Rollback < 1 ชม. | Rollback > 1 ชม. |
| **ผลกระทบ** | ไม่สะดวกเล็กน้อย | Alert gap < 1 ชม. | ข้อมูลสูญหาย |
| **การทดสอบ** | ทดสอบเต็มใน lab | ทดสอบบางส่วน | ทดสอบล่วงหน้าไม่ได้ |
| **เวลา** | Change window | เวลาทำการ | ระหว่าง incident |

**คะแนนเสี่ยง** = รวมทุกปัจจัย (5-15)
- **5-7**: ต่ำ → SOC Lead อนุมัติ
- **8-10**: กลาง → SOC Manager อนุมัติ
- **11-15**: สูง → CISO อนุมัติ + CAB review

## Approval Matrix

| ประเภท Change | ระดับเสี่ยง | ผู้อนุมัติ | Lead Time |
|:---|:---|:---|:---|
| Detection rule ใหม่ (test) | ต่ำ | SOC Lead | วันเดียว |
| Detection rule (production) | ต่ำ-กลาง | SOC Lead + peer review | 24 ชม. |
| SIEM configuration | กลาง | SOC Manager | 48 ชม. |
| Log source ใหม่ | กลาง | SOC Manager | 1 สัปดาห์ |
| Agent deploy (fleet) | สูง | SOC Manager + IT Lead | 1 สัปดาห์ |
| Platform upgrade หลัก | สูง | CISO + CAB | 2 สัปดาห์ |

## Checklist ตรวจหลังเปลี่ยน

```
□ Change ดำเนินการสำเร็จ
□ ไม่มี error ใน logs
□ Dashboard สุขภาพระบบปกติ
□ Test alert ทำงานถูกต้อง (ถ้าเปลี่ยน rule)
□ Data flow ยืนยันแล้ว (ถ้าเปลี่ยน source/pipeline)
□ ไม่มี FP เพิ่มผิดปกติ
□ Performance baseline ไม่เปลี่ยน
□ Rollback plan ยืนยันว่าใช้ได้
□ Change ticket อัปเดตและปิดแล้ว
□ แจ้งทีมว่า change เสร็จ
```

## เอกสารที่เกี่ยวข้อง

- [ขั้นตอนการ Deploy](../02_Platform_Operations/Deployment_Procedures.th.md)
- [แบบฟอร์ม Incident](incident_report.th.md)
- [SOP การจัดการเปลี่ยนแปลง](../06_Operations_Management/Change_Management.th.md)

### Change Risk Assessment Matrix

| ปัจจัย | Low (1) | Medium (2) | High (3) |
|:---|:---|:---|:---|
| ผลกระทบต่อ Production | ไม่มี | บางส่วน | ทั้งระบบ |
| ความซับซ้อน | Simple | Multi-step | Cross-system |
| Rollback Difficulty | Auto | Manual < 1hr | Manual > 1hr |
| Downtime Required | ไม่มี | < 30 min | > 30 min |

### Change Communication Template

```
Subject: [RFC-XXXX] Change Notification
- Change: [รายละเอียด]
- Window: [วันเวลา]
- Impact: [ผลกระทบ]
- Contact: [ผู้รับผิดชอบ]
- Rollback ETA: [เวลาถ้าต้อง rollback]
```

### Approval Quick Guide

| Risk Level | Approver | Turnaround |
|:---|:---|:---|
| Low | Team lead | Same day |
| Medium | Manager | 2 days |
| High | CAB | 5 days |

## อ้างอิง

- [ITIL Change Management](https://www.axelos.com/certifications/itil-service-management)
- [NIST SP 800-128](https://csrc.nist.gov/publications/detail/sp/800-128/final)
