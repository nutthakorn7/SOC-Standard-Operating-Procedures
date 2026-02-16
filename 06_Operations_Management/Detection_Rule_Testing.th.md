# SOP ทดสอบ Detection Rule

> **รหัสเอกสาร:** DRT-001  
> **เวอร์ชัน:** 1.0  
> **อัปเดตล่าสุด:** 2026-02-15  
> **เจ้าของ:** Detection Engineer / SOC Lead

---

## Pipeline การทดสอบ

```mermaid
graph LR
    A[1. เขียน Rule] --> B[2. ตรวจ Syntax]
    B --> C[3. Backtest]
    C --> D[4. ทดสอบ Staging]
    D --> E[5. Peer Review]
    E --> F[6. Deploy]
    F --> G[7. ติดตาม 7 วัน]
```

### ขั้นตอนสำคัญ:

**2. ตรวจ Syntax:**
```bash
python tools/sigma_validator.py path/to/rule.yml
```

**3. Backtest (7–30 วัน):**
- ตรวจจับ known-bad ได้ไหม?
- FP rate ≤ 20%?
- Alert ≤ 50/วัน?

**4. Staging:**
- Deploy เป็น disabled ก่อน
- รัน Atomic Red Team test
- ตรวจ alert trigger ถูกต้อง

**5. Peer Review:**
- [ ] Logic ถูกต้อง
- [ ] Whitelist เหมาะสม
- [ ] MITRE mapping ถูก
- [ ] คำอธิบายชัดเจนสำหรับ T1

**7. ติดตาม 7 วัน:**

| ตัวชี้วัด | เป้า | ถ้าไม่ผ่าน |
|:---|:---:|:---|
| FP rate | ≤ 20% | ปรับ whitelist |
| Alert volume | ≤ 50/วัน | ปรับ threshold |
| Performance | ≤ 5% เพิ่ม | optimize query |

---

## Checklist คุณภาพ Rule

```
□ Title ชัดเจน
□ มี MITRE ATT&CK mapping
□ Level (severity) เหมาะสม
□ Detection logic ใช้ field name ถูกต้อง
□ มี false positive section
□ ผ่านทดสอบ: syntax, backtest, staging
□ Peer review อนุมัติแล้ว
□ Submit Change Request แล้ว
```

---

## ตารางผลการทดสอบ

| Rule ID | ชื่อกฎ | ผลลัพธ์ | หมายเหตุ |
|:---|:---|:---:|:---|
| [ID] | [ชื่อ] | [✅/⚠️/❌] | [หมายเหตุ] |

## เกณฑ์การทดสอบ

| ระดับ | เกณฑ์ | การดำเนินการ |
|:---:|:---|:---|
| ✅ ผ่าน | แจ้งเตือนถูกต้อง, context ครบ, severity ถูก | Deploy ไปยัง Production |
| ⚠️ บางส่วน | แจ้งเตือนแต่ context ไม่ครบหรือ severity ผิด | ปรับปรุงแล้ว retest |
| ❌ ไม่ผ่าน | ไม่มีแจ้งเตือนหรือ FP สูง | แก้ไข logic แล้ว retest |

## รอบการทดสอบ

| การทดสอบ | ความถี่ | ผู้รับผิดชอบ |
|:---|:---|:---|
| ทดสอบกฎใหม่ | ก่อน deploy ทุกครั้ง | Detection Engineering |
| ทดสอบกฎที่มีอยู่ (regression) | รายเดือน | Detection Engineering |
| Full coverage test | รายไตรมาส | SOC Manager + Detection Eng |

## Rule Testing Methodology

### Test Plan Template

| Phase | Activity | Duration |
|:---|:---|:---|
| 1 | Unit test (lab) | 1-2 วัน |
| 2 | Integration test (staging) | 2-3 วัน |
| 3 | Shadow mode (prod) | 5-7 วัน |
| 4 | Active mode (prod) | Go-live |

### Rule Quality Metrics

| Metric | Target | Measurement |
|:---|:---|:---|
| True Positive Rate | > 90% | Weekly |
| False Positive Rate | < 10% | Weekly |
| Detection Latency | < 5 min | Per alert |
| Coverage (tactics) | > 70% | Monthly |

### Test Evidence Template

| Field | Content |
|:---|:---|
| Rule Name | [ชื่อ rule] |
| Test Date | [วันที่] |
| Tester | [ชื่อ] |
| Test Data | [description] |
| Expected Alert | [Yes/No + details] |
| Actual Result | [Pass/Fail + evidence] |

### Test Status Tracking

| Status | Meaning |
|:---|:---|
| Draft | ยังไม่ทดสอบ |
| Testing | กำลังทดสอบ |

## เอกสารที่เกี่ยวข้อง

- [SOP จัดการเปลี่ยนแปลง](Change_Management.th.md)
- [ดัชนี Detection Rules](../07_Detection_Rules/README.md)
