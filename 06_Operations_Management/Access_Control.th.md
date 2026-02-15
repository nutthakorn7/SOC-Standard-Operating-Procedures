# นโยบายควบคุมการเข้าถึง SOC

> **รหัสเอกสาร:** ACC-001  
> **เวอร์ชัน:** 1.0  
> **อัปเดตล่าสุด:** 2026-02-15  
> **เจ้าของ:** SOC Manager / CISO

---

## ตาราง Access ตามบทบาท

| เครื่องมือ | T1 | T2 | Lead | Manager | DetEng | MSSP |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| SIEM อ่าน/ค้นหา | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ จำกัด |
| SIEM สร้าง Rule | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ |
| SIEM Admin | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| EDR ดู Alert | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ จำกัด |
| EDR Isolate | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Ticketing สร้าง | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ticketing ปิด P1/P2 | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Firewall Block IP | ❌ | ✅ ชั่วคราว | ✅ | ✅ | ❌ | ❌ |
| SOAR แก้ Playbook | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |

---

## ข้อกำหนดความปลอดภัยบัญชี

| การควบคุม | ข้อกำหนด |
|:---|:---|
| **Authentication** | MFA บังคับทุกเครื่องมือ SOC |
| **Password** | ≥ 14 ตัวอักษร, ไม่ซ้ำ 12 รอบ |
| **Session timeout** | 15 นาที inactive → lock |
| **Service accounts** | เฉพาะแต่ละเครื่องมือ, rotate 90 วัน |
| **API keys** | ต่อคน, rotate 90 วัน, เก็บใน vault |
| **Remote access** | VPN/Zero Trust บังคับ |

---

## ตารางทบทวน Access

| ทบทวน | ความถี่ | ผู้รับผิดชอบ |
|:---|:---:|:---|
| บัญชี active | รายเดือน | SOC Manager |
| ระดับสิทธิ์ | รายไตรมาส | SOC Manager + CISO |
| Service accounts | รายไตรมาส | SOC Engineer |
| MSSP access | รายเดือน | SOC Manager |
| Full audit | รายปี | CISO + Internal Audit |

---

## Checklist เมื่อคนออก

```
□ ปิดบัญชี AD/Azure AD (ภายใน 1 ชม.)
□ เพิกถอน SIEM, EDR, Ticketing, SOAR, VPN, TI access
□ Rotate shared credentials ที่คนนั้นเข้าถึงได้
□ ลบจาก Slack/Teams SOC
□ ลบจาก on-call/shift rotation
□ โอนย้าย dashboards/rules ที่สร้างไว้
□ บันทึกใน Access Register
```

---

## เอกสารที่เกี่ยวข้อง

- [โครงสร้างทีม SOC](SOC_Team_Structure.th.md)
- [SOP จัดการเปลี่ยนแปลง](Change_Management.th.md)
- [โปรโตคอลข้อมูล](Data_Handling_Protocol.th.md)
