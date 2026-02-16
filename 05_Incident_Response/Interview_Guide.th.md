# คู่มือสัมภาษณ์ SOC Analyst

> **รหัสเอกสาร:** HR-001  
> **เวอร์ชัน:** 1.0  
> **อัปเดตล่าสุด:** 2026-02-15  
> **กลุ่มเป้าหมาย:** SOC Manager, HR

---

## วิธีใช้

เลือกคำถามตาม **ระดับ** ที่จ้าง ผสมคำถามเทคนิค + สถานการณ์จำลอง + พฤติกรรม ให้คะแนน 1–5

---

## Tier 1 — Junior Analyst

### คำถามเทคนิค

**Q1: IDS กับ IPS ต่างกันอย่างไร?**
> IDS ตรวจจับ+แจ้งเตือน (passive), IPS ตรวจจับ+ป้องกัน (inline)

**Q2: User แจ้งว่าคลิก link น่าสงสัยใน email คุณทำอะไร 5 ขั้นตอน?**
> 1) ถามรายละเอียด 2) ตรวจ header 3) ตรวจ URL (VT) 4) ตรวจ EDR 5) ถ้าอันตราย → isolate + escalate

**Q3: False Positive คืออะไร? ยกตัวอย่าง**
> Alert ที่ fire แต่ไม่ใช่ภัยจริง เช่น vulnerability scanner trigger IDS

**Q4: Port ที่ analyst ต้องรู้?**
> 80/443, 22, 3389, 53, 25, 445, 389, 88

**Q5: เห็น 500 failed logins จาก IP เดียวใน 5 นาที ทำอะไร?**
> Brute force (T1110) → ตรวจว่ามี login สำเร็จไหม → Block IP → ถ้าสำเร็จ = compromise → escalate

### Hands-On Test (15 นาที)
ให้ดู SIEM alert จำลอง → ถามความรุนแรง, สืบต่ออะไร, escalate ไหม

---

## Tier 2 — Senior Analyst

**Q1: อธิบาย MITRE ATT&CK และใช้อย่างไร?**

**Q2: EDR กับ SIEM ต่างกันอย่างไร?**

**Q3: สืบสวน Windows server ที่ถูก compromise — ดู artifact อะไร?**
> Event logs, Sysmon, scheduled tasks, PowerShell history, registry run keys, memory dump

**Q4: Kerberoasting คืออะไร? ตรวจจับอย่างไร?**

**Q5: ออกแบบ detection rule สำหรับ PsExec lateral movement**

### Scenario Test (30 นาที)
ให้สถานการณ์ multi-stage attack → สร้าง timeline, หา IOC, กำหนด blast radius, แนะนำ containment

---

## SOC Lead / Manager

**Q1: วัดประสิทธิภาพ SOC อย่างไร?**
> MTTD, MTTR, FP rate, SLA, MITRE coverage, analyst retention

**Q2: FP rate 50% — ลดอย่างไร?**

**Q3: ป้องกัน analyst burnout อย่างไร?**

**Q4: มีงบซื้อเครื่องมือ 1 ตัว — ตัดสินใจอย่างไร?**

---

## คำถามพฤติกรรม (ทุก Tier)

| คำถาม | ประเมินอะไร |
|:---|:---|
| เล่าเรื่อง incident ที่กดดัน | ความสงบภายใต้แรงกดดัน |
| เคย escalate ผิดไหม? | ความอ่อนน้อม เรียนรู้จากข้อผิดพลาด |
| ติดตามภัยใหม่อย่างไร? | การเรียนรู้ต่อเนื่อง |
| Incident ที่น่าสนใจที่สุด? | ความหลงใหล ประสบการณ์ |

---

## ตารางให้คะแนน

| เกณฑ์ | น้ำหนัก | คะแนน (1-5) |
|:---|:---:|:---:|
| ความรู้เทคนิค | 30% | ___ |
| Hands-on | 25% | ___ |
| สื่อสาร | 15% | ___ |
| แก้ปัญหา | 15% | ___ |
| Teamwork | 10% | ___ |
| การเรียนรู้ | 5% | ___ |

**เกณฑ์ผ่าน:** ≥ 3.5 ค่าเฉลี่ยถ่วงน้ำหนัก

---

## Interview Question Bank

### สำหรับ Incident Reporter

| # | คำถาม | วัตถุประสงค์ |
|:---|:---|:---|
| 1 | สังเกตเห็นอะไรผิดปกติเป็นครั้งแรก? | Timeline |
| 2 | เกิดขึ้นเมื่อไร? | Timestamp |
| 3 | มีใครอื่นเห็นเหตุการณ์ด้วยหรือไม่? | Witnesses |
| 4 | คุณกำลังทำอะไรก่อนเกิดเหตุ? | Context |
| 5 | มีการคลิกลิงก์หรือเปิดไฟล์หรือไม่? | Initial vector |
| 6 | เครื่องมีอาการผิดปกติอย่างไร? | Symptoms |
| 7 | มีใครเข้าถึงเครื่องคุณได้บ้าง? | Access |
| 8 | ข้อมูลอ่อนไหวถูกกระทบหรือไม่? | Impact |

### Interview Do's and Don'ts

| ✅ ควรทำ | ❌ ไม่ควรทำ |
|:---|:---|
| บันทึกทุกรายละเอียด | กล่าวโทษผู้ถูกสัมภาษณ์ |
| ใช้คำถามปลายเปิด | ถามนำคำตอบ |
| รักษาความลับ | แชร์ข้อมูลเกินจำเป็น |
| ยืนยัน timeline ซ้ำ | ข้ามรายละเอียดเล็กน้อย |

### Interview Documentation Template

```
Interview Record:
- Date/Time: [วันเวลา]
- Interviewer: [ชื่อ]
- Interviewee: [ชื่อ + ตำแหน่ง]
- Incident ID: [INC-XXXX]
- Key Findings:
  1. [ข้อค้นพบ 1]
  2. [ข้อค้นพบ 2]
- Follow-up Actions:
  1. [action item]
- Signature: _____________
```

### Key Interview Principles

| Principle | Rationale |
|:---|:---|
| Open-ended questions | ได้ข้อมูลมากกว่า |
| Active listening | สร้างความไว้วางใจ |
| Document everything | Evidence integrity |

## เอกสารที่เกี่ยวข้อง

- [โครงสร้างทีม SOC](../06_Operations_Management/SOC_Team_Structure.th.md)
- [แผนงานสร้าง SOC](../01_SOC_Fundamentals/SOC_Building_Roadmap.th.md)
