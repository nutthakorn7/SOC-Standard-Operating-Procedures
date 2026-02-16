# Playbook PB-35: การรวบรวมข้อมูลที่น่าสงสัย (Suspicious Data Collection)

**ความรุนแรง**: สูง | **หมวดหมู่**: Collection | **MITRE**: T1560, T1119, T1115, T1074, T1213, T1005

---

## คำอธิบาย

ผู้โจมตีรวบรวมข้อมูลที่ละเอียดอ่อนภายในสภาพแวดล้อมก่อนจะนำออก รวมถึง staging ไฟล์ใน temp directories, เข้าถึง SharePoint/OneDrive, บีบอัดข้อมูลด้วยเครื่องมือ compression, clipboard capture, และ automated collection scripts

## แหล่งตรวจจับ

| แหล่ง | ตัวอย่าง Alert |
|:---|:---|
| **EDR** | การใช้ archiver ผิดปกติ (7z, rar, zip จาก temp dirs), data staging |
| **SIEM** | เข้าถึงไฟล์จำนวนมาก, ดาวน์โหลด SharePoint/OneDrive ผิดปกติ |
| **DLP** | ข้อมูลละเอียดอ่อนใน archives, clipboard monitoring |
| **Cloud** | ดาวน์โหลดเอกสารจำนวนมากจาก Teams/SharePoint |
| **Network** | ถ่ายโอนข้อมูลขนาดใหญ่ภายใน, staging ไปยัง file shares |

## เช็คลิสต์คัดกรอง

| # | ขั้นตอน | การดำเนินการ |
|:---:|:---|:---|
| 1 | **ระบุผู้ใช้** | ใครกำลังรวบรวมข้อมูล? บทบาทได้รับอนุญาต? |
| 2 | **ตรวจประเภทข้อมูล** | ไฟล์/ข้อมูลที่เข้าถึงคืออะไร? ละเอียดอ่อน? จำแนก? |
| 3 | **ปริมาณ** | ข้อมูลเท่าไหร่? ปริมาณผิดปกติสำหรับผู้ใช้/บทบาทนี้? |
| 4 | **Staging** | ไฟล์ถูกคัดลอกไปยัง temp directories, USB, หรือ cloud? |
| 5 | **เครื่องมือ** | ใช้เครื่องมือ compression? (7z, rar, WinRAR, tar แบบใส่รหัส) |
| 6 | **Timeline** | สัมพันธ์กับ discovery หรือ credential access alerts? |

## การตอบสนอง

### Tier 1

1. บันทึกผู้ใช้, ไฟล์ที่เข้าถึง, ปริมาณ, และปลายทาง
2. ตรวจสอบว่าบทบาทของผู้ใช้สมเหตุสมผลกับรูปแบบการเข้าถึง
3. ถ้าปริมาณ/ประเภทไม่ได้อนุญาต → Escalate ถึง Tier 2

### Tier 2

4. ตรวจสอบประวัติการเข้าถึงไฟล์ทั้งหมด (30 วันที่ผ่านมา)
5. ค้นหา indicators ของ compromise ก่อนหน้า
6. สืบสวน staging locations
7. ถ้ายืนยัน: **แยก** เครื่อง, **เพิกถอน** สิทธิ์เข้าถึง, **เก็บรักษา** artifacts

## ผลกระทบตามประเภทข้อมูล

| ประเภท | ความเสี่ยง | การแจ้ง |
|:---|:---|:---|
| **PII ทั่วไป** | สูง | DPO ภายใน 72 ชม. |
| **PII อ่อนไหว** | วิกฤต | DPO ทันที, แจ้ง สำนักงาน คปส. |
| **ข้อมูลการเงิน** | สูง | CFO, Legal |
| **ความลับทางการค้า** | วิกฤต | CEO, Legal |
| **Source Code** | สูง | CTO, Engineering Lead |

## เอกสารที่เกี่ยวข้อง

- [Data Exfiltration Playbook](Data_Exfiltration.th.md)
- [Insider Threat Playbook](Insider_Threat.th.md)
- [Network Discovery Playbook](Network_Discovery.th.md)
- [PDPA Compliance](../../07_Compliance_Privacy/PDPA_Compliance.th.md)

## อ้างอิง

- [MITRE ATT&CK — Collection](https://attack.mitre.org/tactics/TA0009/)
- [MITRE T1560 — Archive Collected Data](https://attack.mitre.org/techniques/T1560/)
- [MITRE T1074 — Data Staged](https://attack.mitre.org/techniques/T1074/)
