# SOC Automation Catalog / แคตตาล็อกระบบอัตโนมัติ SOC

**รหัสเอกสาร**: OPS-SOP-012
**เวอร์ชัน**: 1.0
**การจัดชั้นความลับ**: ใช้ภายใน
**อัปเดตล่าสุด**: 2026-02-15

> แคตตาล็อกนี้รวบรวม **ระบบอัตโนมัติทุกตัว** ที่ SOC ใช้หรือควรนำมาใช้ เพื่อติดตาม automation maturity, ระบุงาน manual ที่ควรทำเป็น auto, และ onboard analyst ใหม่

---

## ระดับความสมบูรณ์ของ Automation

| ระดับ | ชื่อ | คำอธิบาย | ตัวอย่าง |
|:---:|:---|:---|:---|
| **L0** | Manual ทั้งหมด | Analyst ทำทุกอย่างด้วยมือ | Copy-paste IOC ไปค้นหา |
| **L1** | มีตัวช่วย | เครื่องมือแนะนำ, analyst ตัดสินใจ | SIEM เพิ่ม context ให้ alert |
| **L2** | กึ่งอัตโนมัติ | เครื่องมือทำ, analyst อนุมัติ | SOAR สร้าง ticket หลัง analyst ยืนยัน |
| **L3** | อัตโนมัติเต็ม | ไม่ต้องมีคนดูแล | Auto-block IOC จาก TI feeds |
| **L4** | ปรับตัวเอง | ระบบเรียนรู้และปรับเอง | ML จัดลำดับ alert |

---

## 1. Alert Triage & Enrichment

| # | Automation | คำอธิบาย | Trigger | ปัจจุบัน | เป้าหมาย | ลำดับ |
|:---:|:---|:---|:---|:---:|:---:|:---:|
| 1.1 | **IOC Auto-Enrichment** | ค้นหา hash/IP/domain จาก TI feeds | Alert ใหม่ | L1 | L3 | 🔴 P1 |
| 1.2 | **Alert Deduplication** | ระงับ alert ซ้ำจากแหล่งเดียวกัน | Alert ingestion | L1 | L3 | 🔴 P1 |
| 1.3 | **Alert Priority Scoring** | คำนวณ severity จาก asset + TI + user risk | Alert ใหม่ | L0 | L2 | 🟠 P2 |
| 1.4 | **Context Enrichment** | เพิ่มข้อมูลผู้ใช้, asset, กิจกรรมล่าสุดใน alert | Alert ใหม่ | L1 | L3 | 🔴 P1 |
| 1.5 | **FP Filtering** | Auto-close FP ที่รู้จัก, พร้อมบันทึก | Alert ingestion | L0 | L2 | 🟠 P2 |
| 1.6 | **Alert Correlation** | รวม alert ที่เกี่ยวข้องเป็น incident อัตโนมัติ | หลาย alerts | L1 | L3 | 🟠 P2 |

---

## 2. Incident Response Automation

| # | Automation | คำอธิบาย | Trigger | ปัจจุบัน | เป้าหมาย | ลำดับ |
|:---:|:---|:---|:---|:---:|:---:|:---:|
| 2.1 | **Phishing Quarantine** | Quarantine phishing email ทั้งองค์กรอัตโนมัติ | User report / detection | L1 | L3 | 🔴 P1 |
| 2.2 | **Endpoint Isolation** | Isolate endpoint เมื่อมี malware/C2 | P1/P2 malware alert | L1 | L2 | 🔴 P1 |
| 2.3 | **Account Disable** | Disable account ที่ถูกบุกรุก | ยืนยัน compromise (P1) | L1 | L2 | 🔴 P1 |
| 2.4 | **Firewall Block IOC** | เพิ่ม IP/domain อันตรายใน blocklist อัตโนมัติ | IOC ยืนยันอันตราย | L1 | L3 | 🟠 P2 |
| 2.5 | **Ticket Creation** | สร้าง incident ticket พร้อม context อัตโนมัติ | P1/P2 alert ใหม่ | L2 | L3 | 🟠 P2 |
| 2.6 | **Notification Dispatch** | ส่งการแจ้งเตือนตาม severity + escalation matrix | Incident classification | L1 | L3 | 🟠 P2 |
| 2.7 | **Evidence Collection** | เก็บ forensic artifacts อัตโนมัติ | P1 incident | L0 | L2 | 🟡 P3 |

---

## 3. Threat Intelligence Automation

| # | Automation | คำอธิบาย | Trigger | ปัจจุบัน | เป้าหมาย | ลำดับ |
|:---:|:---|:---|:---|:---:|:---:|:---:|
| 3.1 | **TI Feed Ingestion** | รับ IOC จาก TI feeds อัตโนมัติ | กำหนดเวลา (ทุกชม.) | L2 | L3 | 🔴 P1 |
| 3.2 | **IOC Expiry** | ลบ IOC เก่าตามอายุและ confidence | ทำความสะอาดรายวัน | L0 | L3 | 🟠 P2 |
| 3.3 | **Retroactive Hunting** | สแกน log ย้อนหลังเมื่อได้ IOC ใหม่ที่สำคัญ | IOC วิกฤตใหม่ | L0 | L2 | 🟠 P2 |
| 3.4 | **MITRE Mapping** | Tag alert ด้วย ATT&CK technique อัตโนมัติ | Alert creation | L1 | L3 | 🟠 P2 |

---

## 4. Detection Engineering Automation

| # | Automation | คำอธิบาย | Trigger | ปัจจุบัน | เป้าหมาย | ลำดับ |
|:---:|:---|:---|:---|:---:|:---:|:---:|
| 4.1 | **Sigma Rule Deployment** | แปลง Sigma rules เป็น SIEM query แล้ว deploy | Git push ไป rules repo | L1 | L3 | 🔴 P1 |
| 4.2 | **Rule Testing** | ทดสอบ rule ใหม่กับ test data ก่อน production | PR ไป rules repo | L0 | L2 | 🟠 P2 |
| 4.3 | **Rule Performance** | ติดตาม TP/FP ratio ต่อ rule, แจ้ง rule ที่แย่ | รายสัปดาห์ | L0 | L2 | 🟠 P2 |
| 4.4 | **YARA Scanning** | สแกนไฟล์ที่ส่งมาด้วย YARA rules | File submission | L1 | L3 | 🟠 P2 |

---

## 5. Operational Automation

| # | Automation | คำอธิบาย | Trigger | ปัจจุบัน | เป้าหมาย | ลำดับ |
|:---:|:---|:---|:---|:---:|:---:|:---:|
| 5.1 | **Shift Handoff Report** | สร้างสรุปเวรจาก tickets และ alerts อัตโนมัติ | สิ้นสุดเวร | L0 | L2 | 🟠 P2 |
| 5.2 | **Log Source Health** | แจ้งเตือนเมื่อ log source หยุดส่ง > threshold | ทุก 15 นาที | L1 | L3 | 🔴 P1 |
| 5.3 | **SLA Breach Warning** | แจ้งเมื่อ ticket ใกล้เลย SLA | ตรวจสอบอายุ ticket | L1 | L3 | 🟠 P2 |
| 5.4 | **Monthly KPI Report** | สร้างรายงาน KPI อัตโนมัติ | รายเดือน | L0 | L2 | 🟡 P3 |

---

## 6. User & Entity Behavior

| # | Automation | คำอธิบาย | Trigger | ปัจจุบัน | เป้าหมาย | ลำดับ |
|:---:|:---|:---|:---|:---:|:---:|:---:|
| 6.1 | **Impossible Travel** | ตรวจจับ login จากสถานที่ที่เป็นไปไม่ได้ | Login event | L2 | L3 | 🟠 P2 |
| 6.2 | **Privileged Account Monitoring** | แจ้งเตือนกิจกรรมผิดปกติของ privileged account | Privileged event | L1 | L3 | 🟠 P2 |
| 6.3 | **Off-Hours Activity** | แจ้งเตือนกิจกรรมนอกเวลาทำงาน | After-hours event | L1 | L2 | 🟡 P3 |

---

## กรอบตัดสินใจ Automation

| ปัจจัย | คะแนน 1 (ต่ำ) | คะแนน 2 (กลาง) | คะแนน 3 (สูง) |
|:---|:---|:---|:---|
| **ความถี่** | รายเดือนหรือน้อยกว่า | รายสัปดาห์ | รายวันหรือมากกว่า |
| **เวลาต่อครั้ง** | < 5 นาที | 5–30 นาที | > 30 นาที |
| **ความเสี่ยงผิดพลาด (manual)** | ต่ำ | ปานกลาง | สูง |
| **ผลกระทบถ้าล่าช้า** | ข้อมูลแจ้งเตือน | กระทบการปฏิบัติงาน | กระทบความปลอดภัย |
| **ความยากในการ automate** | สูง (custom dev) | ปานกลาง (API) | ต่ำ (built-in) |

**เกณฑ์คะแนน:**
- **12–15**: Automate ทันที
- **8–11**: วางแผนไตรมาสหน้า
- **5–7**: คง manual, ประเมินใหม่ทีหลัง

---

## ตัวชี้วัด Automation

| ตัวชี้วัด | เป้าหมาย | วิธีวัด |
|:---|:---:|:---|
| Automation coverage (% ที่ L2+) | ≥ 50% | จำนวนที่ L2+ / ทั้งหมด |
| Mean Time to Enrich (MTTE) | < 30 วินาที | Alert creation → enrichment เสร็จ |
| Alert ที่ auto-resolve | ≥ 30% ของ P4 | Auto-closed / total P4 |
| SOAR success rate | ≥ 95% | Runs สำเร็จ / total runs |
| เวลาที่ analyst ประหยัดต่อเวร | ≥ 2 ชม. | ก่อน vs หลัง automation |

---

## Automation Priority Matrix

| จำนวน/เดือน × เวลาต่อครั้ง | ง่าย | ปานกลาง | ซับซ้อน |
|:---|:---:|:---:|:---:|
| **สูง (>500 ครั้ง)** | 🔴 Automate Now | 🔴 Automate Now | 🟡 Plan |
| **กลาง (100-500)** | 🔴 Automate Now | 🟡 Plan | 🟢 Backlog |
| **ต่ำ (<100)** | 🟡 Plan | 🟢 Backlog | ⚪ Skip |

## Automation Recipes

### Recipe 1: Auto-Enrich Alert

```
Trigger: New alert created
Steps:
  1. Extract IOCs (IP, hash, domain, URL)
  2. Query VT, AbuseIPDB, URLhaus
  3. Add enrichment to alert notes
  4. Update severity based on results
  5. If malicious → auto-assign to Tier 2
```

### Recipe 2: Auto-Close Known FP

```
Trigger: Alert matches known-FP pattern
Steps:
  1. Check alert against FP whitelist
  2. If match → add note "Auto-closed: Known FP [ID]"
  3. Close ticket
  4. Log for monthly FP review
```

### Recipe 3: Auto-Quarantine Malware

```
Trigger: EDR alert with high confidence malware
Steps:
  1. Verify confidence score ≥ 90%
  2. Isolate host via EDR API
  3. Create incident ticket
  4. Notify Shift Lead (Slack + email)
  5. Collect forensic snapshot
```

## Automation KPIs

| ตัวชี้วัด | เป้าหมาย | ปัจจุบัน |
|:---|:---|:---|
| Automation Rate | ≥ 60% ของ alerts | [XX]% |
| Auto-enrichment Success Rate | ≥ 95% | [XX]% |
| Auto-close FP Rate | ≥ 30% ของ total FP | [XX]% |
| เวลาที่ analyst ประหยัดได้/เดือน | ≥ 40 ชม. | [XX] ชม. |

### Automation Impact Metrics

| Automation | Manual Time | Auto Time | Savings |
|:---|:---|:---|:---|
| Phishing triage | 15 min | 2 min | 87% |
| IOC enrichment | 10 min | 30 sec | 95% |
| Endpoint isolation | 5 min | 10 sec | 97% |
| Report generation | 2 hrs | 5 min | 96% |

### Automation Readiness Checklist

| Criteria | Required |
|:---|:---|
| Process documented | ✅ |
| Consistent inputs | ✅ |
| API available | ✅ |
| Error handling defined | ✅ |

## เกณฑ์ควบคุมก่อนปล่อย Automation

| Control | Owner | สิ่งที่ต้องมีขั้นต่ำ |
|:---|:---|:---|
| **กำหนด trigger และ scope ชัดเจน** | SOAR Engineer | ระบุให้ชัดว่าอะไรทำให้รันและระบบใดได้รับผลกระทบได้ |
| **มีจุดให้มนุษย์อนุมัติ** | SOC Manager | บังคับใช้กับ account disable, host isolation, หรือ block actions เว้นแต่มี pre-approval |
| **มี rollback path** | Security Engineer | automation ที่เปลี่ยนสถานะระบบต้องย้อนกลับได้และเคยทดสอบแล้ว |
| **มี execution log** | SOC Analyst | เก็บว่าใครอนุมัติ, อะไรถูกรัน, และเปลี่ยนอะไรไปบ้าง |
| **มี failure handling** | SOAR Engineer | ถ้ารันไม่สำเร็จต้อง escalate ไม่ใช่เงียบหาย |

## งานแบบไหนควร Automate และงานแบบไหนควรคง Manual

| ประเภทงาน | ควร automate เมื่อ | ควรคง manual เมื่อ |
|:---|:---|:---|
| **Alert enrichment** | input มีโครงสร้างและผลลัพธ์เป็นเชิง advisory | source quality ยังไม่นิ่ง |
| **IOC blocking** | confidence สูงและกำหนดวันหมดอายุไว้แล้ว | อาจกระทบ partner หรือระบบธุรกิจสำคัญ |
| **Containment actions** | approval workflow ชัดและ blast radius ต่ำ | asset เป็น privileged, regulated หรือ production-critical |
| **Reporting** | data source normalize แล้วและนิ่ง | ต้องใช้ judgment เชิงบริหาร |

## เอกสารที่เกี่ยวข้อง

-   [SOAR Playbooks](../05_Incident_Response/SOAR_Playbooks.th.md)
-   [Threat Hunting Playbook](../05_Incident_Response/Threat_Hunting_Playbook.th.md)
-   [Detection Rule Testing SOP](Detection_Rule_Testing.th.md)
-   [TI Feeds Integration](TI_Feeds_Integration.th.md)
-   [SOC Metrics & KPIs](SOC_Metrics.th.md)
-   [Log Source Matrix](Log_Source_Matrix.th.md)

## References

- [NIST SP 800-61 Rev. 2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
- [MITRE ATT&CK](https://attack.mitre.org/)
