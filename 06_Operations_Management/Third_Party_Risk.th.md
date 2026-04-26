# Third-Party Risk — SOC Integration SOP / SOP ความเสี่ยงจากบุคคลที่สาม

**รหัสเอกสาร**: OPS-SOP-014
**เวอร์ชัน**: 1.0
**การจัดชั้นความลับ**: ใช้ภายใน
**อัปเดตล่าสุด**: 2026-02-15

> บุคคลที่สามและ supply chain ขยายพื้นผิวโจมตีขององค์กร SOP นี้กำหนดวิธีที่ SOC **ติดตาม**, **ตอบสนอง**, และ **จัดการความเสี่ยง** จาก vendors, ผู้รับเหมา, APIs, และบริการ outsource

---

## การจัดชั้นความเสี่ยง Vendor

| ชั้น | เกณฑ์ | ระดับ SOC Monitoring | ความถี่ทบทวน | ประเภทการเข้าถึง |
|:---:|:---|:---:|:---:|:---|
| **Tier 1** 🔴 | เข้าถึง production, จัดการ PII, ให้บริการด้าน security | **เต็มรูปแบบ** — real-time + dedicated alerts | รายเดือน | VPN + privileged accounts |
| **Tier 2** 🟠 | เข้าถึง staging/dev, จัดการข้อมูลธุรกิจ | **เข้มข้น** — ตรวจ log รายวัน + alerts | รายไตรมาส | VPN จำกัด / API keys |
| **Tier 3** 🟡 | เข้าถึงจำกัด, ไม่มีข้อมูลสำคัญ | **มาตรฐาน** — ตรวจรายสัปดาห์ | ทุก 6 เดือน | Portal / restricted API |
| **Tier 4** 🟢 | ไม่มีการเข้าถึงโดยตรง | **พื้นฐาน** — ตามเหตุการณ์ | รายปี | ไม่มี / public API |

---

## ข้อกำหนดการ Monitor ตามชั้น

### Tier 1 — Vendor วิกฤต

| # | ข้อกำหนด | แหล่งข้อมูล | Alert Rule |
|:---:|:---|:---|:---|
| 1 | Login/logout จาก vendor accounts | IAM / AD | Login นอกเวลาที่อนุมัติ, IP/ประเทศใหม่ |
| 2 | คำสั่ง privileged ที่ทำ | EDR / cmdline logs | Admin command จาก vendor account |
| 3 | รูปแบบการเข้าถึงข้อมูล | DLP / file access logs | Bulk download, เข้าถึงนอกขอบเขต |
| 4 | Network traffic anomalies | Firewall / NDR | โอนข้อมูลขนาดใหญ่, port ผิดปกติ |
| 5 | ปริมาณ API calls | API gateway logs | Spike ใน API calls |
| 6 | การแก้ไขไฟล์ | FIM | เปลี่ยนไฟล์สำคัญระหว่าง vendor session |
| 7 | Lateral movement | EDR / SIEM | เข้าถึงระบบนอกขอบเขตที่อนุมัติ |

---

## การควบคุมการเข้าถึง Vendor

### Checklist ก่อนอนุญาตเข้าถึง

- [ ] ลงทะเบียน vendor ในทะเบียน vendor inventory
- [ ] กำหนดชั้นความเสี่ยง
- [ ] ได้รับอนุมัติจาก system owner
- [ ] บังคับ MFA สำหรับ vendor accounts ทั้งหมด
- [ ] กำหนดช่วงเวลาเข้าถึง (time-limited)
- [ ] กำหนด IP allowlist (ถ้าเป็นไปได้)
- [ ] Deploy monitoring rules ตามชั้น
- [ ] ยืนยัน break-glass procedure

---

## การตอบสนองเมื่อ Vendor ถูกบุกรุก

```mermaid
flowchart TD
    A[🔔 Vendor แจ้ง Breach] --> B{ข้อมูลเราได้รับผลกระทบ?}
    B -->|ใช่| C[P1: เริ่ม IR]
    B -->|ไม่| D[P3: Monitor & ประเมิน]
    B -->|ไม่ทราบ| E[P2: สืบสวนด่วน]

    C --> F[ระงับ vendor access ทั้งหมด]
    C --> G[ประเมินขอบเขตข้อมูลที่รั่ว]
    C --> H[แจ้ง DPO / กฎหมาย]

    E --> I[ขอ IOCs จาก vendor]
    E --> J[ค้นหาย้อนหลังใน logs]
    I --> K{พบ match?}
    J --> K
    K -->|ใช่| C
    K -->|ไม่| L[Monitor ต่อ 30 วัน]

    style A fill:#3b82f6,color:#fff
    style C fill:#dc2626,color:#fff
    style L fill:#22c55e,color:#fff
```

### ขั้นตอนตอบสนอง

| ขั้น | การดำเนินการ | ผู้รับผิดชอบ | SLA |
|:---:|:---|:---|:---:|
| 1 | รับการแจ้ง breach จาก vendor | SOC Tier 2 | — |
| 2 | ประเมินผลกระทบ: ข้อมูล/การเข้าถึงของเราได้รับผลกระทบ? | SOC Lead | 1 ชม. |
| 3 | ถ้าได้รับผลกระทบ: **ระงับ vendor access ทันที** | SOC Engineering | 15 นาที |
| 4 | ขอ IOCs จาก vendor (IPs, domains, hashes, TTPs) | SOC Lead | 2 ชม. |
| 5 | ค้นหา IOCs ใน logs (ย้อนหลัง 90 วัน) | SOC Tier 2/3 | 4 ชม. |
| 6 | ถ้าพบ match: **Escalate เป็น P1** | IR Manager | ทันที |
| 7 | แจ้ง DPO/กฎหมายถ้า PII อาจรั่วไหล | SOC Manager | 4 ชม. |
| 8 | แจ้ง PDPA ถ้ามีข้อมูลคนไทยได้รับผลกระทบ | DPO | < 72 ชม. |
| 9 | Vendor ต้องส่ง root cause + แผนแก้ไข | Vendor | 30 วัน |

---

## การตรวจจับ Supply Chain Attack

### สัญญาณเตือน

| สัญญาณ | วิธีตรวจจับ | ตัวอย่าง Rule |
|:---|:---|:---|
| Software update จากแหล่งไม่คาดหมาย | ตรวจ Hash | Hash ≠ hash ที่ vendor ประกาศ |
| Code ไม่คาดหมายใน dependency | SCA tools (Snyk ฯลฯ) | Dependency ใหม่ที่ไม่น่าเชื่อถือ |
| Vendor tool เชื่อมต่อ network ผิดปกติ | NDR / firewall | Agent เชื่อมต่อ IP ไม่รู้จัก |
| Certificate ของ vendor portal เปลี่ยน | Certificate monitoring | Cert issuer เปลี่ยนกะทันหัน |

### Checklist ป้องกันแบบ SolarWinds

- [ ] ตรวจ hash ของ update ก่อน deploy
- [ ] Monitor พฤติกรรม network ของ vendor software หลัง update
- [ ] แยก vendor tools บน network segment แยก
- [ ] รัน vendor binaries ใน sandbox ที่ monitor ก่อน
- [ ] สมัครรับ vendor security advisories
- [ ] จัดทำ SBOM ของ vendor software

---

## Template Vendor Inventory

| Vendor | ชั้น | บริการ | ข้อมูลที่เข้าถึง | วิธีเข้าถึง | การ Monitor | หมดสัญญา | ทบทวนล่าสุด | คะแนนเสี่ยง |
|:---|:---:|:---|:---|:---|:---:|:---:|:---:|:---:|
| ____________ | 1/2/3/4 | ____________ | PII/ธุรกิจ/ไม่มี | VPN/API/Portal | เต็ม/เข้มข้น/มาตรฐาน/พื้นฐาน | ____-__-__ | ____-__-__ | __/10 |

---

## การประสานงานกับ MSSP

| ข้อกำหนด | รายละเอียด |
|:---|:---|
| **Playbook ร่วม** | MSSP ต้องใช้ playbook เดียวกับทีมภายใน |
| **เส้นทาง Escalation** | MSSP → SOC Lead ภายใน → IR Manager (บันทึกไว้) |
| **การจัดการข้อมูล** | MSSP ไม่สามารถส่งออกข้อมูลได้โดยไม่ได้รับอนุมัติ |
| **SLA monitoring** | ติดตาม MTTD, MTTR, SLA ของ MSSP แยกต่างหาก |
| **สิทธิ์ audit** | ทบทวน MSSP operations รายไตรมาส |
| **แผนยุติสัญญา** | แผนการ transition เมื่อต้องเปลี่ยน MSSP |

---

## ตัวชี้วัด

| ตัวชี้วัด | เป้าหมาย | วิธีวัด |
|:---|:---:|:---|
| ทบทวน vendor access ตรงเวลา | 100% | ตามตารางแต่ละชั้น |
| Vendor accounts ที่มี MFA | 100% | ตรวจรายเดือน |
| Dormant vendor accounts ที่ disable | 100% (> 90 วัน) | ตรวจอัตโนมัติ |
| เวลาในการ disable vendor ที่ถูกบุกรุก | < 15 นาที | จากตรวจพบถึง disable |
| Vendor IOC hunt เสร็จ | < 4 ชม. | จากได้รับ IOC ถึงสแกนเสร็จ |

---

## เทมเพลตแบบประเมินผู้ให้บริการ

### Security Assessment Questionnaire

| # | หมวด | คำถาม | คำตอบ | Risk |
|:---:|:---|:---|:---|:---:|
| 1 | **Certifications** | มี ISO 27001 / SOC 2? | [ใช่/ไม่] | 🔴/🟢 |
| 2 | **Data Handling** | ข้อมูลเข้ารหัสระหว่างจัดเก็บ? | [ใช่/ไม่] | 🔴/🟢 |
| 3 | **Data Location** | ข้อมูลจัดเก็บในประเทศไทย? | [ใช่/ไม่] | 🔴/🟢 |
| 4 | **Access Control** | ใช้ MFA สำหรับ admin access? | [ใช่/ไม่] | 🔴/🟢 |
| 5 | **Incident Response** | มีแผน IR ที่ทดสอบแล้ว? | [ใช่/ไม่] | 🔴/🟢 |
| 6 | **BCP/DR** | มีแผน BCP/DR? | [ใช่/ไม่] | 🔴/🟢 |
| 7 | **PDPA** | ปฏิบัติตาม PDPA? | [ใช่/ไม่] | 🔴/🟢 |

### Risk Scoring

| คะแนนรวม | Risk Level | Action |
|:---|:---|:---|
| 0–2 🔴 flags | **Low Risk** | อนุมัติ, review ปีละครั้ง |
| 3–4 🔴 flags | **Medium Risk** | อนุมัติแบบมีเงื่อนไข |
| 5–6 🔴 flags | **High Risk** | ต้อง remediate ก่อนอนุมัติ |
| 7 🔴 flags | **Critical** | ไม่อนุมัติ |

## Continuous Monitoring

| ตรวจสอบ | ความถี่ | เครื่องมือ |
|:---|:---|:---|
| Security scorecard | รายเดือน | SecurityScorecard / BitSight |
| Certificate expiry | อัตโนมัติ | SSL monitoring |
| Dark web mentions | รายสัปดาห์ | TI platform |
| Service availability | Real-time | Uptime monitoring |

## Vendor Incident SLA

| ระดับ | คำอธิบาย | Notification SLA | Resolution SLA |
|:---|:---|:---:|:---:|
| 🔴 Critical | Data breach | ≤ 1 ชม. | ≤ 24 ชม. |
| 🟡 High | Security incident | ≤ 4 ชม. | ≤ 48 ชม. |
| 🟠 Medium | Vulnerability | ≤ 24 ชม. | ≤ 7 วัน |
| 🟢 Low | Config issue | ≤ 72 ชม. | ≤ 30 วัน |

## Third-Party Security Assessment

### Vendor Security Scorecard

| Domain | Weight | Questions | Score Method |
|:---|:---|:---|:---|
| Data Protection | 25% | 8 ข้อ | Evidence-based |
| Access Control | 20% | 6 ข้อ | Audit + policy |
| Incident Response | 20% | 5 ข้อ | SLA + drill |
| Compliance | 15% | 5 ข้อ | Cert + audit |
| Business Continuity | 10% | 4 ข้อ | DR test |
| Physical Security | 10% | 3 ข้อ | Site visit |

### Risk Tier Classification

| Tier | Criteria | Review Cycle | Assessment |
|:---|:---|:---|:---|
| Critical | มีสิทธิ์เข้าข้อมูลลูกค้า | ทุก 6 เดือน | Full + Pentest |
| High | เข้าถึงระบบ production | ทุก 12 เดือน | Full assessment |
| Medium | เข้าถึง non-prod | ทุก 18 เดือน | Questionnaire |
| Low | ไม่เข้าถึงข้อมูล/ระบบ | ทุก 24 เดือน | Self-assessment |

### Continuous Monitoring Checklist
- [ ] ตรวจสอบ SOC 2 / ISO 27001 certificate validity
- [ ] Monitor vendor breach news feeds
- [ ] Review vendor access logs monthly
- [ ] Validate data handling compliance
- [ ] Check SLA performance metrics

### Vendor Incident Notification Requirements

| Severity | Notification SLA | แจ้งใคร |
|:---|:---|:---|
| Critical breach | 4 ชั่วโมง | CISO + Legal + DPO |
| High risk event | 24 ชั่วโมง | Security Manager |
| Medium risk | 72 ชั่วโมง | SOC Team |
| Service degradation | 5 วันทำการ | IT Operations |

### Contract Security Clauses Checklist
- [ ] Right to audit clause
- [ ] Data breach notification SLA
- [ ] Data handling & encryption requirements
- [ ] Background check requirements
- [ ] Termination data destruction clause

### Annual Review Cycle

| Quarter | Activities |
|:---|:---|
| Q1 | Vendor inventory update |
| Q2 | Critical vendor assessments |
| Q3 | Policy & contract reviews |
| Q4 | Annual risk report |

## Trigger สำหรับการยกระดับความเสี่ยงบุคคลที่สาม

| Trigger | ต้อง escalate ไปหา | เหตุผล |
|:---|:---|:---|
| **Tier 1 vendor incident ที่อาจกระทบข้อมูลเรา** | CISO + Legal / DPO | อาจเป็นเหตุการณ์ที่ต้องรายงาน |
| **พบ vendor access นอก scope หรือนอกเวลาที่อนุมัติ** | SOC Manager | อาจเป็น misuse หรือ vendor compromise |
| **critical vendor ไม่ให้ IOC หรือ remediation details เพียงพอ** | Risk Owner + CISO | โปร่งใสไม่พอที่จะควบคุมความเสี่ยง |
| **จุดอ่อนเดิมของ vendor โผล่ซ้ำหลายรอบทบทวน** | Procurement / Vendor Owner | ความเสี่ยงเริ่มเป็นเชิงโครงสร้าง |

## หลักฐานขั้นต่ำในการทบทวน Vendor

| หลักฐาน | มาตรฐานขั้นต่ำ |
|:---|:---|
| **รายการการเข้าถึงปัจจุบัน** | named users, accounts, APIs และ scope ที่อนุญาต |
| **activity logs ล่าสุด** | เพียงพอให้ยืนยันรูปแบบการใช้งานที่อนุมัติ |
| **ประวัติ incident หรือ advisory** | breach, notification หรือ finding สำคัญก่อนหน้า |
| **compensating controls** | network limits, MFA, segmentation หรือ monitoring ที่ใช้อยู่ |

## เอกสารที่เกี่ยวข้อง

-   [Escalation Matrix](../05_Incident_Response/Escalation_Matrix.th.md)
-   [Incident Classification](../05_Incident_Response/Incident_Classification.th.md)
-   [Forensic Investigation](../05_Incident_Response/Forensic_Investigation.th.md)
-   [Vendor Evaluation](Vendor_Evaluation.th.md)
-   [SLA Template](SLA_Template.th.md)
-   [Log Source Matrix](Log_Source_Matrix.th.md)

## References

- [NIST Cybersecurity Framework](https://csrc.nist.gov/projects/cybersecurity-framework)
- [CISA](https://www.cisa.gov/)
