# แม่แบบ Dashboard สำหรับผู้บริหาร

> **รหัสเอกสาร:** EXEC-DASH-001  
> **เวอร์ชัน:** 1.0  
> **อัปเดตล่าสุด:** 2026-02-15  
> **ผู้ใช้:** CISO, ผู้บริหาร, Board

---

## ตัวชี้วัดแนะนำสำหรับ Dashboard

### Tier 1: KPI หลัก (แสดงเสมอ)

| ตัวชี้วัด | คำจำกัดความ | เป้า | แสดง |
|:---|:---|:---:|:---|
| **Total Alerts** | Alert ทั้งหมดในช่วงเวลา | — | ตัวเลข + % เทียบเดือนก่อน |
| **Incidents** | Alert ที่เป็นเหตุจริง | — | ตัวเลข + ทิศทาง |
| **MTTD** | เวลาตรวจจับ | ≤ 60 นาที | เขียว/แดง |
| **MTTR** | เวลาตอบสนอง | ≤ 4 ชม. | เขียว/แดง |
| **SLA Compliance** | % ที่ผ่าน SLA | ≥ 95% | % แยกตาม severity |
| **FP Rate** | % false positive | ≤ 30% | % + trend |

### Tier 2: มุมมองปฏิบัติการ (เสริม)

| ตัวชี้วัด | เป้า |
|:---|:---:|
| Alert-to-Incident Ratio | 10–30% |
| Automation Rate (SOAR) | ≥ 40% |
| Escalation Rate | 20–40% |
| Coverage Hours | 24/7 |

### Tier 3: มุมมองเชิงกลยุทธ์ (รายเดือน/ไตรมาส)

| ตัวชี้วัด | เป้า |
|:---|:---:|
| MITRE ATT&CK Coverage | ≥ 70% |
| Log Source Coverage | ≥ 95% |
| Cost per Incident | ลดลง |

---

## แม่แบบสรุปรายเดือน

```markdown
# รายงาน SOC รายเดือน — [เดือน ปี]

## Highlights
- ✅ [ผลงานเด่น]
- ⚠️ [ข้อกังวล]
- 🔄 [การปรับปรุง]

## ตัวเลข
| ตัวชี้วัด | เดือนนี้ | เดือนก่อน | ทิศทาง |
|:---|:---:|:---:|:---:|
| Alerts | X,XXX | X,XXX | ↑/↓ X% |
| Incidents | XXX | XXX | |
| MTTD | XX นาที | XX นาที | |
| MTTR | X.X ชม. | X.X ชม. | |
| SLA | XX% | XX% | |

## เหตุการณ์สำคัญ
| วันที่ | ID | ประเภท | ระดับ | ผลกระทบ |
|:---|:---|:---|:---:|:---|

## ข้อเสนอ
1. ___
2. ___
```

---

## แนวทางการนำเสนอ

```
1. นำด้วยผลกระทบทางธุรกิจ ไม่ใช่ technical details
2. ใช้ เขียว/เหลือง/แดง — ผู้บริหารสแกน ไม่อ่าน
3. แสดงแนวโน้มเทียบเดือนก่อนเสมอ
4. 1 หน้าจอ — น้อยกว่าคือดีกว่า
5. บอกทั้งผลงานและความเสี่ยง — สมดุลสร้างความเชื่อมั่น
6. เตรียม talking points 3 ข้อก่อนประชุม
7. มีข้อมูล drill-down พร้อม แต่ไม่แสดงจนกว่าจะถูกถาม
```

---

## องค์ประกอบของ Dashboard

### Panel 1: Security Posture Score

| หมวด | คะแนน (1-10) | แนวโน้ม | สถานะ |
|:---|:---:|:---:|:---:|
| Detection Coverage | [X] | ↑ | 🟢 |
| Response Readiness | [X] | → | 🟡 |
| การจัดการช่องโหว่ | [X] | ↑ | 🟢 |
| Compliance | [X] | → | 🟡 |
| บุคลากรและการฝึกอบรม | [X] | ↓ | 🔴 |
| **Overall** | **[X.X]** | | |

### Panel 2: สรุปภัยคุกคาม

| ประเภท | จำนวนเดือนนี้ | เทียบเดือนก่อน | แนวโน้ม |
|:---|:---:|:---:|:---:|
| Phishing attempts | [XX] | +/-[XX]% | ↑/↓ |
| Malware detections | [XX] | +/-[XX]% | ↑/↓ |
| Unauthorized access | [XX] | +/-[XX]% | ↑/↓ |
| Data incidents | [XX] | +/-[XX]% | ↑/↓ |

### Panel 3: งบประมาณเทียบการใช้จ่าย

| หมวด | งบตั้ง | ใช้จริง | % ใช้ | คงเหลือ |
|:---|:---:|:---:|:---:|:---:|
| Personnel | [XX] ฿ | [XX] ฿ | [XX]% | [XX] ฿ |
| Technology | [XX] ฿ | [XX] ฿ | [XX]% | [XX] ฿ |
| Training | [XX] ฿ | [XX] ฿ | [XX]% | [XX] ฿ |
| **Total** | [XX] ฿ | [XX] ฿ | [XX]% | [XX] ฿ |

### การจัดวาง KPI Card

| การ์ด | ตัวชี้วัด | รูปแบบการแสดงผล | เป้าหมาย |
|:---|:---|:---|:---|
| 1 | MTTR | Gauge | < 4 hrs |
| 2 | Open Incidents | Counter | < 10 |
| 3 | Alert Volume (24h) | Sparkline | Trend ↓ |
| 4 | SLA Compliance | % Bar | > 95% |
| 5 | Detection Coverage | Heat map | > 60% |

### ตารางสิทธิ์การเข้าถึงของผู้มีส่วนเกี่ยวข้อง

| บทบาท | ระดับการเข้าถึง Dashboard | ส่งออกข้อมูล | ปรับแต่งมุมมอง |
|:---|:---|:---|:---|
| CISO | Full | ✅ | ✅ |
| Director | Summary | ✅ | ❌ |
| Analyst | Ops only | ❌ | ❌ |

## นิยาม KPI และเป้าหมาย

| KPI | นิยาม | สูตร | เป้าหมาย | เกณฑ์ RAG |
|:---|:---|:---|:---|:---|
| **MTTD** | เวลาเฉลี่ยตรวจจับ | Avg(เวลาตรวจจับ - เวลาเกิด) | ≤ 60 นาที | 🟢≤60 🟡≤120 🔴>120 |
| **MTTR** | เวลาเฉลี่ยตอบสนอง | Avg(เวลาตอบ - เวลาตรวจจับ) | ≤ 240 นาที | 🟢≤240 🟡≤480 🔴>480 |
| **FP Rate** | อัตรา False Positive | FP Alerts / Total × 100 | ≤ 20% | 🟢≤20% 🟡≤35% 🔴>35% |
| **SLA** | % incidents แก้ไขทัน SLA | ทัน / ทั้งหมด × 100 | ≥ 95% | 🟢≥95% 🟡≥85% 🔴<85% |
| **Coverage** | MITRE ATT&CK coverage | Covered / Total × 100 | ≥ 60% | 🟢≥60% 🟡≥40% 🔴<40% |
| **Staffing** | อัตราการใช้งาน analyst | ชม.ทำงาน / ชม.ว่าง × 100 | 60-80% | 🟢60-80% 🟡>80% 🔴>90% |

## ชุดข้อมูลขั้นต่ำของ Executive Dashboard

- [ ] **ภาพรวมสถานะรวม**: มีมุมมอง RED/AMBER/GREEN สำหรับ detection, response, staffing, technology, coverage และ compliance
- [ ] **มุมมองผลกระทบทางธุรกิจ**: แสดง incident สำคัญ downtime ผู้ใช้ที่ได้รับผลกระทบ หรือกรณีข้อมูลตามกฎหมาย
- [ ] **มุมมองแนวโน้ม**: เทียบ alerts, incidents, MTTD, MTTR และ SLA compliance กับรอบก่อน
- [ ] **มุมมองการตัดสินใจ**: ระบุ 3 ความเสี่ยงหรือคำขอสนับสนุนที่ผู้บริหารต้องตัดสินใจ

## เกณฑ์ Trigger สำหรับผู้บริหาร

| เงื่อนไข | สถานะ | การตัดสินใจที่ผู้บริหารควรทำ |
|:---|:---:|:---|
| **เกิด Critical incident ที่กระทบธุรกิจยืนยันแล้ว** | 🔴 | เข้าร่วม incident governance อนุมัติ tradeoff ในการจำกัดวง และติดตาม recovery |
| **MTTD หรือ MTTR หลุดเป้า 2 รอบติดกัน** | 🟡/🔴 | ทบทวนกำลังคน escalation flow และ coverage gap |
| **SLA compliance ต่ำกว่า 85%** | 🔴 | อนุมัติการลดภาระงาน การจัดลำดับใหม่ หรือ external support |
| **coverage ของ critical assets ต่ำกว่า baseline ที่ตกลงไว้** | 🔴 | อนุมัติการกู้ telemetry การติดตั้ง control หรือการ remediation โดย asset owner |
| **control failure เดิมทำให้เกิด incident ซ้ำ** | 🟡/🔴 | กำหนด owner, due date และติดตามความคืบหน้าของ remediation |

## Mapping ไปยังรอบ Governance

| สัญญาณจาก Dashboard | ต้องส่งต่อไปที่ | ผลลัพธ์ที่ต้องมี |
|:---|:---|:---|
| **ตัวชี้วัดแย่ลงรอบเดียวแต่ยังควบคุมผลกระทบได้** | ชุดทบทวน Governance รายเดือน | owner, corrective action, และ next review date |
| **ตัวชี้วัดล้มเหลวซ้ำตลอดไตรมาส** | ชุดเอกสารการตัดสินใจรายไตรมาสสำหรับบอร์ด | คำขอเรื่อง capacity, funding, หรือ scope decision |
| **มีประเด็น exception หรือ risk tolerance** | ชุดทบทวนการยอมรับความเสี่ยงรายไตรมาส | residual risk statement, วันหมดอายุ, และ recommendation |
| **มีช่องว่างเชิงโครงสร้างด้าน coverage หรือ telemetry** | Annual Control Coverage Review Pack | priority gap statement, บริการที่ได้รับผลกระทบ, และความต้องการลงทุน |
| **incident กลายเป็นประเด็นสาธารณะหรือมีแรงกดดันด้านการสื่อสาร** | เทมเพลตการสื่อสารเหตุการณ์ และชุดเอกสารการตัดสินใจรายไตรมาสสำหรับบอร์ด | เส้นทางข้อความที่อนุมัติแล้ว owner ผู้แถลง และบันทึกการตัดสินใจของผู้บริหาร |

## บันทึกการตัดสินใจขั้นต่ำสำหรับผู้บริหาร

- [ ] ระบุ 3 ประเด็นหลักที่ต้องการความสนใจจากผู้บริหารในรอบนี้
- [ ] ระบุให้ชัดว่าแต่ละประเด็นต้องการ funding, risk acceptance, scope change, หรือแค่ follow-up
- [ ] บันทึก owner และ target date สำหรับทุกรายการที่ขึ้นสถานะ RED

## สัญญาณของเคสที่เป็นประเด็นสาธารณะ

| สัญญาณ | ความหมายต่อผู้บริหาร | ต้องยกระดับทันทีเมื่อ |
|:---|:---|:---|
| **มีสื่อสอบถามเข้ามา** | incident อาจเกินขอบเขตการจัดการเฉพาะฝั่งปฏิบัติการ | ข้อเท็จจริงยังไม่ครบ แต่ไม่สามารถรอการตอบภายนอกได้ |
| **ความเชื่อมั่นของลูกค้าลดลง** | ผลกระทบบริการหรือข้อมูลอาจแปลงเป็น churn หรือแรงกดดันตามสัญญา | ต้องแจ้งลูกค้าหรือออก service statement |
| **มีการออก public statement แล้ว** | ผู้บริหารต้องติดตามความสอดคล้องของข้อความและความเสี่ยงต่อเนื่อง | ข้อความอ้างถึง outage, breach, หรือการสอบสวนที่ยัง active |
| **มี regulator path และ media path พร้อมกัน** | ต้องคุม alignment ระหว่าง legal, privacy, และผู้บริหาร | มีการแจ้งตาม PDPA หรือข้อกำกับอื่นระหว่างที่แรงกดดันสาธารณะเพิ่มขึ้น |

## เทมเพลต Dashboard สถานะ RAG

```markdown
## SOC Health Dashboard — [วันที่]

### สถานะรวม: 🟢 เขียว

| ด้าน | สถานะ | ตัวชี้วัดหลัก | หมายเหตุ |
|:---|:---:|:---|:---|
| Detection | 🟢 | MTTD: 42 นาที | อยู่ในเป้า |
| Response | 🟢 | MTTR: 180 นาที | แนวโน้มดีขึ้น |
| กำลังคน | 🟡 | Utilization: 82% | ว่าง 1 ตำแหน่ง กำลังหา |
| เทคโนโลยี | 🟢 | Uptime: 99.8% | ไม่มีเหตุสำคัญ |
| Coverage | 🟡 | ATT&CK: 55% | 5 rules กำลังพัฒนา |
| Compliance | 🟢 | SLA: 97% | เกินเป้า |
```

## เอกสารที่เกี่ยวข้อง

- [ตัวชี้วัด SOC](../06_Operations_Management/SOC_Metrics.th.md)
- [รายงานรายเดือน](Monthly_SOC_Report.th.md)
- [รายงานรายไตรมาส](Quarterly_Business_Review.th.md)
- [ชุดทบทวน Governance รายเดือน](Monthly_Governance_Review_Pack.th.md)
- [ชุดเอกสารการตัดสินใจรายไตรมาสสำหรับบอร์ด](Board_Quarterly_Decision_Pack.th.md)
- [แม่แบบการสื่อสารเหตุการณ์](../05_Incident_Response/Communication_Templates.th.md)

## References

- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [SANS SOC Metrics](https://www.sans.org/white-papers/)
- [SOC-CMM](https://www.soc-cmm.com/)
