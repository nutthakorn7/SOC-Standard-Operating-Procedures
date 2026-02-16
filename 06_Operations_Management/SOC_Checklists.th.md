# รายการตรวจสอบ SOC — รายวัน / รายสัปดาห์ / รายเดือน

> **รหัสเอกสาร:** CHK-001  
> **เวอร์ชัน:** 1.0  
> **อัปเดตล่าสุด:** 2026-02-15  
> **เจ้าของ:** SOC Manager

---

## รายการประจำวัน (ทุกกะ)

### เริ่มกะ
```
□ อ่าน handoff notes จากกะก่อน
□ เช็ค SIEM dashboard — มี P1/P2 เปิดอยู่ไหม?
□ ตรวจ alert queue — มีกี่ pending?
□ ตรวจ log sources ทำงานครบไหม
□ เช็ค agent health — มีเครื่องไหน disconnect ไหม?
□ ตรวจ threat intel — มี IOC ใหม่ไหม?
```

### ระหว่างกะ
```
□ Process alerts ทั้งหมด (เป้า: queue ไม่เก่ากว่า 30 นาที)
□ Escalate P1/P2 ตาม SLA
□ อัปเดต ticket ที่เปิดอยู่
□ บันทึก false positive เพื่อ tune
```

### จบกะ
```
□ Alert ทั้งหมดถูก triage แล้ว
□ เขียน handoff notes
□ แจ้งกะถัดไปเรื่อง P1/P2 ที่ยังเปิดอยู่
```

---

## รายการประจำสัปดาห์ (ทุกวันจันทร์)

```
□ ตรวจ 10 rules ที่ดังสุด → tune ถ้า FP > 50%
□ ตรวจ rules ที่ไม่ fire 30 วัน
□ เช็ค Sigma rule updates ใหม่
□ ตรวจ disk space / SIEM storage
□ ตรวจ SOC metrics (MTTD/MTTR/SLA)
□ ตรวจ incidents ที่เปิด > 7 วัน
□ ประชุม SOC standup 15 นาที
```

---

## รายการประจำเดือน (สัปดาห์แรก)

```
□ สร้างรายงาน SOC ประจำเดือน + present ให้ผู้บริหาร
□ Deploy Sigma rules ใหม่
□ ตรวจ MITRE ATT&CK coverage
□ ทดสอบ detection rules 2 ตัว
□ SIEM health check + capacity planning
□ ตรวจ TLS certificates
□ Review user access — ลบบัญชีคนออก
□ ทดสอบ backup restore
□ 1-on-1 กับ analyst ทุกคน (15 นาที)
```

---

## รายการประจำไตรมาส

```
□ Tabletop exercise
□ SOC maturity assessment
□ Purple team exercise (2 ชุดขั้นต่ำ)
□ ตรวจ compliance
□ ตรวจ budget
□ รายงานไตรมาสให้ผู้บริหาร
```

---

## รายการประจำปี

```
□ Full maturity assessment
□ Red/Purple team ใหญ่
□ ตรวจ playbooks + rules ทั้งหมด
□ ทบทวน staffing + training budget
□ ทบทวน technology stack
□ DR test
□ Compliance audit (ISO/PCI/PDPA)
□ รายงานประจำปีให้คณะกรรมการ
```

---

## เช็คลิสต์รายสัปดาห์

| # | รายการ | ผู้รับผิดชอบ | สถานะ |
|:---:|:---|:---|:---:|
| 1 | ทบทวน top alerts ของสัปดาห์ | SOC Manager | ☐ |
| 2 | Review false positive trends | Detection Engineer | ☐ |
| 3 | อัปเดต TI feeds สถานะ | TI Analyst | ☐ |
| 4 | ตรวจสอบ log source health | Tier 1 | ☐ |
| 5 | Review open tickets > 48h | Shift Lead | ☐ |
| 6 | ทบทวน escalations ของสัปดาห์ | SOC Manager | ☐ |
| 7 | อัปเดต SOC wiki/knowledge base | ทีม SOC | ☐ |

## เช็คลิสต์รายเดือน

| # | รายการ | ผู้รับผิดชอบ | สถานะ |
|:---:|:---|:---|:---:|
| 1 | สรุป Monthly SOC Report | SOC Manager | ☐ |
| 2 | ทบทวน SLA compliance | SOC Manager | ☐ |
| 3 | ทบทวน detection rule performance | Detection Engineer | ☐ |
| 4 | อัปเดต playbooks ที่จำเป็น | SOC Lead | ☐ |
| 5 | ทบทวน access control | SOC Manager | ☐ |
| 6 | ทดสอบ backup/restore | IT + SOC | ☐ |
| 7 | ทบทวน vendor/tool licenses | SOC Manager | ☐ |
| 8 | จัด team meeting / retrospective | SOC Manager | ☐ |

## เช็คลิสต์รายไตรมาส

| # | รายการ | ผู้รับผิดชอบ | สถานะ |
|:---:|:---|:---|:---:|
| 1 | จัด Tabletop Exercise | SOC Manager | ☐ |
| 2 | ทบทวน SOC Maturity Assessment | SOC Manager + CISO | ☐ |
| 3 | ทบทวน MITRE ATT&CK coverage | Detection Engineer | ☐ |
| 4 | ทดสอบ IR playbooks (purple team) | SOC Team | ☐ |
| 5 | ทบทวน staffing/capacity | SOC Manager | ☐ |
| 6 | Compliance gap review | Compliance | ☐ |

## เอกสารที่เกี่ยวข้อง

- [คู่มือ Tier 1](../05_Incident_Response/Tier1_Runbook.th.md)
- [ตัวชี้วัด SOC](SOC_Metrics.th.md)
- [ส่งมอบกะ](Shift_Handoff.th.md)
