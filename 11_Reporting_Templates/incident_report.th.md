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

## Template สรุปผู้บริหาร

สำหรับ incident ที่ต้องแจ้งผู้บริหาร:

```markdown
## สรุปผู้บริหาร

เมื่อ [วันที่] SOC ตรวจพบ [ประเภทภัย] กำหนดเป้า [ระบบ/ผู้ใช้]
การโจมตีถูก [ตรวจจับ/แจ้ง] เวลา [เวลา] และ contain ภายใน [ระยะเวลา]
ผลกระทบ: [คำอธิบาย] ระบบ/ผู้ใช้ [X] รายได้รับผลกระทบ
สาเหตุ: [อธิบายสั้น] สถานะ: [Contained/Eradicated/Recovered]
ผลกระทบธุรกิจโดยรวม: [ต่ำ/กลาง/สูง]
```

## แนวปฏิบัติบันทึก Timeline

ใช้ UTC timestamp และรูปแบบสม่ำเสมอ:

```markdown
## Timeline Incident — INC-2026-042

| เวลา (UTC) | ขั้นตอน | เหตุการณ์ | แหล่งข้อมูล |
|:---|:---|:---|:---|
| 2026-02-15 08:23 | Initial Access | ได้รับ phishing email | Email gateway |
| 2026-02-15 08:31 | Execution | ผู้ใช้คลิก link อันตราย | Proxy logs |
| 2026-02-15 08:32 | Execution | Macro ทำงาน, PowerShell spawn | EDR alert |
| 2026-02-15 08:35 | Detection | SOC alert trigger (Sigma rule) | SIEM |
| 2026-02-15 08:38 | Triage | T1 analyst ยืนยัน True Positive | Ticket |
| 2026-02-15 08:42 | Escalation | Escalate ไป T2 analyst | Ticket |
| 2026-02-15 08:50 | Containment | Isolate host ผ่าน EDR | EDR console |
| 2026-02-15 09:15 | Investigation | เก็บ forensic image | Forensic tool |
| 2026-02-15 11:00 | Eradication | ลบ malware, reset credentials | IT + EDR |
| 2026-02-15 14:00 | Recovery | Build host ใหม่ | IT |
```

## Checklist แนบหลักฐาน

```
□ Screenshots ของ alert/detection
□ Raw log excerpts (เฉพาะบรรทัดที่เกี่ยว)
□ Network capture (ถ้ามี)
□ Memory dump (ถ้ามี)
□ Hash ของ malware sample (อย่าแนบ malware จริง)
□ Email headers (ถ้าเป็น phishing)
□ IOCs ที่รวบรวม (IPs, domains, hashes)
□ MITRE ATT&CK mapping
□ เอกสารประเมินผลกระทบ
```

## หลักฐานขั้นต่ำก่อนปิดเคส (Minimum Evidence Before Closure)

- [ ] **ยืนยัน timeline แล้ว**: เวลาของ detection, triage, escalation, containment, eradication, recovery และ closure ต้องครบ
- [ ] **ยืนยันขอบเขตผลกระทบแล้ว**: hosts, users, services และผลกระทบต่อข้อมูลต้องผ่านการตรวจสอบ ไม่ใช่การคาดเดา
- [ ] **บันทึก root cause แล้ว**: ระบุช่องโหว่หรือ business process failure ได้ชัดพอที่จะมอบหมาย remediation
- [ ] **เก็บหลักฐานการจำกัดวงแล้ว**: การปิดบัญชี isolate host การ block หรือการเปลี่ยน config ต้องตรวจสอบย้อนหลังได้
- [ ] **บันทึกผลการตัดสินใจเรื่องการแจ้งแล้ว**: privacy, legal, ลูกค้า หรือผู้บริหาร ต้องมี owner และเวลาที่ตัดสินใจ

## Trigger การแจ้งผู้บริหารและหน่วยงานที่เกี่ยวข้อง

| Trigger | ต้องแจ้งใคร | เวลา |
|:---|:---|:---|
| **Critical incident หรือมี business disruption ยืนยันแล้ว** | CISO, CIO, business owner | ทันที |
| **ยืนยันหรือสงสัยว่ามี regulated data exposure** | CISO, Legal, Privacy | ทันที |
| **incident กระทบบัญชีผู้บริหาร บัญชีสิทธิ์สูง หรือบัญชี shared administration** | CISO, SOC Manager, identity owner | ทันที |
| **การจำกัดวงต้องกระทบบริการหรือจำกัดสิทธิ์แบบฉุกเฉิน** | Business owner, IT operations, CISO | ก่อนลงมือ ถ้าทำได้ |

## บันทึกการแจ้งผู้บริหาร / กฎหมาย / Privacy

| จุดตัดสินใจ | Owner | เวลา | หลักฐานที่ใช้ | ขั้นตอนถัดไป |
|:---|:---|:---|:---|:---|
| ต้องแจ้งผู้บริหารหรือไม่ | | | | |
| ต้องให้ legal / privacy review หรือไม่ | | | | |
| ต้องแจ้งลูกค้า หรือ third party หรือไม่ | | | | |
| ต้องยกระดับไปยัง board หรือไม่ | | | | |

## บันทึกการส่งต่องานสื่อสารออกนอกทีม

| ประเภทการสื่อสาร | ผู้ส่งที่ได้รับอนุมัติ | ผู้รับสาร | เวลาอนุมัติ | เอกสารอ้างอิง |
|:---|:---|:---|:---|:---|
| แจ้งลูกค้า | | | | |
| แจ้ง regulator | | | | |
| แจ้ง vendor / third party | | | | |
| แถลงต่อสื่อ / ผู้บริหาร | | | | |

## บันทึกการกำกับ War Room

| รายการ | ค่า |
|:---|:---|
| **มีการเปิด War room หรือไม่** | ☐ Yes · ☐ No |
| **Incident Commander** | |
| **Backup Commander** | |
| **เวลาเปิด War room** | |
| **เวลาปิด War room** | |
| **Cadence การอัปเดตที่ใช้จริง** | |
| **เวลาที่บันทึกการตัดสินใจสำคัญ** | |
| **owner ของ monitoring หลังปิด war room** | |
| **เวลา governance review ถัดไป** | |

## บันทึกการตัดสินใจ Restore / Rollback / Return-to-Service

| จุดตัดสินใจ | Owner | เวลา | หลักฐานที่ใช้ | การยืนยันที่ต้องทำต่อ |
|:---|:---|:---|:---|:---|
| อนุมัติ restore จาก backup / snapshot หรือไม่ | | | | |
| อนุมัติ rollback ไปยัง release / configuration ก่อนหน้าหรือไม่ | | | | |
| อนุมัติ reconnect host / network path / integration หรือไม่ | | | | |
| อนุมัติ return service to production หรือไม่ | | | | |

## หลักฐานขั้นต่ำก่อน Return-to-Service

- [ ] **ยืนยัน clean state แล้ว**: host, account, application, หรือ integration ผ่าน integrity check หรือ validation ตามที่ตกลงกันแล้ว
- [ ] **ทบทวน data consistency แล้ว**: service owner ยอมรับ backup point, transaction gap, หรือ state หลัง rollback แล้ว
- [ ] **เปิด monitoring แล้ว**: ระบุ owner ระยะเวลา และ escalation threshold ของ enhanced monitoring ไว้ก่อน restore หรือ reconnect
- [ ] **ยังมี rollback path**: ยังมีทางย้อนกลับได้หากบริการที่กู้คืนเริ่มมีปัญหาหรือมีสัญญาณเกิดซ้ำ
- [ ] **มี business owner sign-off**: การ restore บริการสำคัญหรือ re-enable access ที่มีนัยสำคัญต้องมี owner ผู้รับผิดชอบชัดเจน

## บันทึกการออกจาก Enhanced Monitoring และการปิด Incident

| จุดตรวจ | Owner | สถานะ | หลักฐาน / หมายเหตุ |
|:---|:---|:---|:---|
| enhanced monitoring ครบตามช่วงเวลาที่ตกลง | | ☐ Pass · ☐ Blocked | |
| ไม่พบการเกิดซ้ำหรือกิจกรรมต้องสงสัยที่ยังไม่คลี่คลาย | | ☐ Pass · ☐ Blocked | |
| telemetry พร้อมใช้งานตลอดช่วง validate | | ☐ Pass · ☐ Blocked | |
| การแจ้งและ external obligation ที่เปิดอยู่เสร็จแล้วหรือส่งมอบต่อแล้ว | | ☐ Pass · ☐ Blocked | |
| residual risk ถูกยอมรับในระดับอำนาจที่ถูกต้อง | | ☐ Pass · ☐ Blocked | |
| อนุมัติปิด incident แล้ว | | ☐ Pass · ☐ Blocked | |

## เกณฑ์การยกระดับไปยัง Board

-   [ ] ยกระดับเข้า board pack หากเหตุการณ์ก่อให้เกิด material business disruption, มี regulatory exposure ที่ยังไม่ปิด, หรือ remediation decision ที่ต้องใช้อำนาจอนุมัติงบ
-   [ ] ยกระดับหาก residual risk หลัง containment ยังอยู่ระดับ **High** หรือ accepted risk เกินอำนาจของ management
-   [ ] ยกระดับหาก incident pattern เกิดซ้ำและชี้ว่ามี systemic control failure

## เอกสารที่เกี่ยวข้อง

- [กรอบ IR](../05_Incident_Response/Framework.th.md)
- [แบบฟอร์มส่งมอบกะ](shift_handover.th.md)
- [แบบฟอร์ม RFC](change_request_rfc.th.md)
- [PDPA Compliance](../07_Compliance_Privacy/PDPA_Compliance.th.md)
- [คู่มือ PDPA Incident Response](../07_Compliance_Privacy/PDPA_Incident_Response.th.md)
- [Board Quarterly Decision Pack](Board_Quarterly_Decision_Pack.th.md)
- [แม่แบบการสื่อสารเหตุการณ์](../05_Incident_Response/Communication_Templates.th.md)

## Checklist คุณภาพรายงาน (Report Quality Checklist)

| Item | Description | ✓ |
|:---|:---|:---|
| Timeline | ครบทุก event | ☐ |
| Evidence | SHA256 hashes | ☐ |
| Impact | Quantified | ☐ |
| Root cause | Identified | ☐ |
| Actions | Assigned + dated | ☐ |

## SLA การส่งรายงาน (Report Priority)

| Severity | Due |
|:---|:---|
| Critical | 24 hrs |
| High | 72 hrs |

## References

- [NIST SP 800-61r2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
- [VERIS Framework](http://veriscommunity.net/)
