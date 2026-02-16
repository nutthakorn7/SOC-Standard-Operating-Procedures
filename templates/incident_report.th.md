# แบบฟอร์มรายงานเหตุการณ์ (Incident Report Template)

> **คำแนะนำ**: กรอกส่วนบังคับ (★) ให้ครบภายใน 24 ชม. หลังปิดเคส สำหรับ Critical/High ต้องส่ง executive summary ให้ผู้บริหารภายใน 4 ชม. หลังตรวจพบ

---

## ส่วนหัว

| ฟิลด์ | ค่า |
|:---|:---|
| **รหัสเหตุการณ์** | #YYYYMMDD-00X |
| **วันที่ตรวจพบ** | YYYY-MM-DD HH:MM (UTC) |
| **วันที่ปิด** | YYYY-MM-DD HH:MM (UTC) |
| **ผู้รับผิดชอบ** | [ชื่อ / ตำแหน่ง] |
| **ความรุนแรง** | ☐ Critical · ☐ High · ☐ Medium · ☐ Low |
| **สถานะ** | ☐ Open · ☐ กำลังสืบสวน · ☐ จำกัดวง · ☐ Closed |
| **TLP** | ☐ RED · ☐ AMBER+STRICT · ☐ AMBER · ☐ GREEN · ☐ CLEAR |
| **หมวดหมู่** | [Phishing / Malware / Ransomware / Account Compromise / DDoS / Data Breach / อื่นๆ] |
| **MITRE ATT&CK** | [Technique IDs, เช่น T1566.001, T1059.001] |

---

## ★ 1. บทสรุปผู้บริหาร

*สรุป 2-3 ประโยค: เกิดอะไรขึ้น ผลกระทบคืออะไร ผลลัพธ์เป็นอย่างไร*

> 

---

## ★ 2. ไทม์ไลน์ (UTC)

| เวลา | ขั้นตอน | เหตุการณ์ |
|:---|:---|:---|
| YYYY-MM-DD HH:MM | **กิจกรรมเริ่มต้น** | การกระทำแรกของผู้โจมตี (ถ้าทราบ) |
| YYYY-MM-DD HH:MM | **ตรวจพบ** | Alert จาก [ชื่อกฎ / แหล่ง] |
| YYYY-MM-DD HH:MM | **คัดกรอง** | Analyst รับเรื่องและเริ่มสืบสวน |
| YYYY-MM-DD HH:MM | **Escalation** | ส่งต่อไปยัง [Tier 2 / SOC Lead / ผู้บริหาร] |
| YYYY-MM-DD HH:MM | **จำกัดวง** | [การดำเนินการ เช่น แยกเครื่อง, ปิดบัญชี] |
| YYYY-MM-DD HH:MM | **กำจัด** | [การดำเนินการ เช่น ลบ malware, patch] |
| YYYY-MM-DD HH:MM | **กู้คืน** | ระบบกลับสู่ production |
| YYYY-MM-DD HH:MM | **ปิดเคส** | ประกาศแก้ไขเสร็จสิ้น |

---

## ★ 3. การประเมินผลกระทบ

| มิติ | การประเมิน |
|:---|:---|
| **เครื่องที่ได้รับผลกระทบ** | [รายชื่อ hostname/IP] |
| **ผู้ใช้ที่ได้รับผลกระทบ** | [จำนวน + รายชื่อถ้า < 10] |
| **บริการที่ได้รับผลกระทบ** | [แอปพลิเคชัน, ฐานข้อมูล ฯลฯ] |
| **ข้อมูลสูญหาย** | ☐ ไม่มี · ☐ สงสัย · ☐ ยืนยัน (รายละเอียด: ____) |
| **ประเภทข้อมูล** | ☐ PII · ☐ การเงิน · ☐ Credentials · ☐ IP · ☐ อื่นๆ |
| **ผลกระทบทางธุรกิจ** | [ระยะเวลา downtime, ผลกระทบรายได้] |
| **ต้องแจ้งตามกฎหมาย** | ☐ ใช่ (PDPA 72 ชม. / อื่นๆ) · ☐ ไม่ |

---

## ★ 4. วิเคราะห์สาเหตุ (VERIS "4A")

| มิติ | การประเมิน |
|:---|:---|
| **ผู้กระทำ** | ☐ External · ☐ Internal · ☐ Partner · ☐ ไม่ทราบ |
| **การกระทำ** | ☐ Malware · ☐ Hacking · ☐ Social · ☐ Error · ☐ Misuse |
| **สินทรัพย์** | ☐ Server · ☐ Workstation · ☐ User Device · ☐ Cloud · ☐ Data |
| **ผลกระทบ** | ☐ Confidentiality · ☐ Integrity · ☐ Availability |

| คำถาม | คำตอบ |
|:---|:---|
| **ช่องโหว่ที่ถูกใช้** | [CVE-XXXX-XXXX หรือคำอธิบาย] |
| **วิธีเข้าถึง** | [Initial access vector] |
| **ป้องกันได้?** | ☐ ได้ (วิธี) · ☐ ไม่ได้ (เหตุผล) |

---

## ★ 5. Indicators of Compromise (IoCs)

| ประเภท | ค่า | บริบท |
|:---|:---|:---|
| IP Address | | [C2 / Scanner / Source] |
| Domain | | [Phishing / C2] |
| File Hash (SHA256) | | [Malware / Tool] |
| URL | | [Payload / Landing page] |

---

## ★ 6. การแก้ไขและติดตาม

| # | การดำเนินการ | ผู้รับผิดชอบ | สถานะ | กำหนด |
|:---:|:---|:---|:---:|:---|
| 1 | | | ☐ เสร็จ · ☐ รอ | |
| 2 | | | ☐ เสร็จ · ☐ รอ | |
| 3 | อัปเดตกฎตรวจจับ | SOC | ☐ เสร็จ · ☐ รอ | |

---

## 7. บทเรียน

| คำถาม | คำตอบ |
|:---|:---|
| **อะไรทำได้ดี?** | |
| **อะไรปรับปรุงได้?** | |
| **ทำตาม Playbook?** | ☐ ใช่ · ☐ บางส่วน · ☐ ไม่ |
| **SLA ตรงเวลา?** | ☐ ใช่ · ☐ ไม่ (รายละเอียด: ____) |

---

## 8. การอนุมัติ

| ตำแหน่ง | ชื่อ | ลายเซ็น | วันที่ |
|:---|:---|:---|:---|
| Lead Analyst | | | |
| SOC Manager | | | |
| CISO (เฉพาะ Critical) | | | |

---

## เอกสารที่เกี่ยวข้อง

- [กรอบ IR](../05_Incident_Response/Framework.th.md)
- [แบบฟอร์มส่งมอบกะ](shift_handover.th.md)
- [แบบฟอร์ม RFC](change_request_rfc.th.md)
- [PDPA Compliance](../07_Compliance_Privacy/PDPA_Compliance.th.md)

### Report Quality Checklist

| Item | Description | ✓ |
|:---|:---|:---|
| Timeline | ครบทุก event | ☐ |
| Evidence | SHA256 hashes | ☐ |
| Impact | Quantified | ☐ |
| Root cause | Identified | ☐ |
| Actions | Assigned + dated | ☐ |

## อ้างอิง

- [NIST SP 800-61r2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
- [VERIS Framework](http://veriscommunity.net/)
