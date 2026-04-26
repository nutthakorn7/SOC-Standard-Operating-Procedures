# คู่มือการพัฒนา Playbook ตอบสนองเหตุการณ์

**รหัสเอกสาร**: IR-SOP-015
**เวอร์ชัน**: 1.0
**การจัดชั้นความลับ**: ใช้ภายใน
**อัปเดตล่าสุด**: 2026-02-16

> คู่มือ **สร้าง, ทดสอบ, และบำรุงรักษา IR playbooks** เพื่อความสม่ำเสมอ คุณภาพ และครบถ้วนทุก playbook ครอบคลุมมาตรฐานโครงสร้าง, MITRE mapping, วิธีทดสอบ, และ lifecycle management

---

## มาตรฐานโครงสร้าง Playbook

ทุก playbook **ต้องมี** sections เหล่านี้:

| # | Section | จำเป็น | คำอธิบาย |
|:---:|:---|:---:|:---|
| 1 | **Metadata** | ✅ | ID, version, MITRE mapping |
| 2 | **ภาพรวม** | ✅ | ขอบเขตและเมื่อไรใช้ |
| 3 | **Severity mapping** | ✅ | เกณฑ์ P1–P4 |
| 4 | **การตรวจจับ** | ✅ | แหล่ง alert, indicators |
| 5 | **Triage steps** | ✅ | ขั้นตอนวิเคราะห์เบื้องต้น |
| 6 | **การสืบสวน** | ✅ | วิเคราะห์เชิงลึก |
| 7 | **Containment** | ✅ | หยุดการโจมตี |
| 8 | **Eradication** | ✅ | ลบภัยคุกคาม |
| 9 | **Recovery** | ✅ | กู้คืนระบบ |
| 10 | **เกณฑ์ Escalation** | ✅ | เมื่อไรเลื่อนระดับ |
| 11 | **Decision matrix** | ✅ | เกณฑ์ตัดสินใจว่าจะปิด ติดตาม จำกัดวง หรือแจ้งผู้เกี่ยวข้อง |
| 12 | **การสื่อสาร** | ✅ | แจ้งใครในแต่ละ severity |
| 13 | **Evidence checklist** | ✅ | เก็บหลักฐานอะไร |
| 14 | **Minimum telemetry required** | ✅ | log, sensor, และ blind spot ขั้นต่ำที่ต้องมีเพื่อใช้ playbook นี้ได้จริง |
| 15 | **False positive และ tuning guide** | ✅ | benign cause ที่พบบ่อย, วิธี validate, และ tuning action ที่เหมาะสม |
| 16 | **Playbooks ที่เกี่ยวข้อง** | ✅ | Link เอกสารอื่น |

---

## กระบวนการพัฒนา

| ขั้น | กิจกรรม | ผู้ดำเนินการ | ระยะเวลา |
|:---:|:---|:---|:---:|
| 1 | ระบุความจำเป็น | SOC Lead | 1 วัน |
| 2 | Research + MITRE mapping | Analyst | 2–3 วัน |
| 3 | ร่าง playbook (EN) | ผู้เขียน | 3–5 วัน |
| 4 | Peer review | Analyst + SOC Lead | 2 วัน |
| 5 | แก้ไข | ผู้เขียน | 1–2 วัน |
| 6 | Tabletop test | ทีม SOC | 1 วัน |
| 7 | แก้ไขรอบสุดท้าย | ผู้เขียน | 1 วัน |
| 8 | แปลภาษาไทย | ผู้แปล | 2–3 วัน |
| 9 | อนุมัติ | SOC Manager | 1 วัน |
| 10 | เผยแพร่ | ผู้เขียน | 1 วัน |
| 11 | SOAR integration | SOAR Engineer | 3–5 วัน |

### Quality Checklist

- [ ] ครบทุก sections ที่จำเป็น
- [ ] MITRE ATT&CK mapped
- [ ] เกณฑ์ severity ชัดเจน
- [ ] Triage steps เป็นขั้นตอน
- [ ] Containment มี rollback
- [ ] Escalation threshold ชัด
- [ ] มี decision matrix สำหรับ close / escalate / contain
- [ ] Communication matrix ครบ
- [ ] Evidence checklist ครบ
- [ ] ระบุ telemetry ขั้นต่ำและ blind spot ถ้าขาดข้อมูล
- [ ] มี false positive และ tuning guidance
- [ ] Peer reviewed ≥ 1 คน
- [ ] Tabletop tested
- [ ] แปลไทยแล้ว
- [ ] Publish ลง repository

---

## MITRE ATT&CK Coverage

| Tactic | Playbooks ปัจจุบัน | Coverage |
|:---|:---|:---:|
| Initial Access | PB-01 Phishing, PB-17 BEC, PB-18 Exploit | ✅ |
| Execution | PB-11 Suspicious Script | 🟡 |
| Persistence | PB-14 Insider Threat, PB-15 Rogue Admin | 🟡 |
| Privilege Escalation | PB-07 | ✅ |
| Defense Evasion | PB-20 Log Clearing | 🟡 |
| Credential Access | PB-04, PB-05, PB-26 | ✅ |
| Discovery | — | 🔴 Gap |
| Lateral Movement | PB-12 | ✅ |
| Collection | — | 🔴 Gap |
| C2 | PB-13, PB-24 | ✅ |
| Exfiltration | PB-08 | ✅ |
| Impact | PB-02, PB-09, PB-23 | ✅ |

---

## วิธีทดสอบ Tabletop

## มาตรฐานของ Decision Matrix

ทุก playbook ควรมี decision matrix ที่ช่วยให้ผู้อ่านตอบคำถามต่อไปนี้ได้ทันที:

- [ ] ปิดเคสเป็น false positive ได้หรือไม่
- [ ] ยังให้ระบบทำงานต่อภายใต้การเฝ้าระวังได้หรือไม่
- [ ] ต้องจำกัดวงทันทีหรือไม่
- [ ] ต้องแจ้ง legal, privacy, ผู้บริหาร, หรือ business owner หรือไม่

### Template ขั้นต่ำของ Decision Matrix

| เงื่อนไข | การตัดสินใจ | ผู้รับผิดชอบ | SLA |
|:---|:---|:---|:---|
| ยืนยัน alert แล้วแต่ไม่พบผลกระทบเชิงร้าย | monitor และ tune rule | SOC Analyst | ภายในกะเดียวกัน |
| มีพฤติกรรมอันตรายจริงแต่ขอบเขตยังจำกัด | escalate และสืบสวนต่อ | SOC Analyst → SOC Manager | 15–30 นาที |
| มีการ compromise อยู่หรือมี business risk ชัดเจน | จำกัดวงทันที | IR Engineer / Security Engineer | ทันที |
| มี regulated data, executive impact, หรือ trigger ด้านการรายงาน | แจ้ง legal/privacy/ผู้บริหาร | SOC Manager / CISO | ตาม policy |

### กฎคุณภาพของ Decision Matrix

| กฎ | เหตุผล |
|:---|:---|
| ใช้เงื่อนไขที่สังเกตได้จริง | Analyst ต้องตัดสินใจจาก log หรือหลักฐานได้ |
| ระบุ owner ของการตัดสินใจ | ลดความกำกวมตอนเกิดเหตุจริง |
| ใส่ SLA หรือเวลาเป้าหมาย | ช่วยให้ SOC Manager คุมจังหวะการตอบสนองได้ |
| ใส่ business และ compliance trigger | ทำให้ playbook ใช้ได้กับ CISO และ IR leadership ไม่ใช่แค่ analyst |

## มาตรฐานของ Evidence Checklist

ทุก playbook ควรมี evidence checklist ที่ตอบคำถามเชิงปฏิบัติ 3 ข้อ:

- [ ] ต้องเก็บอะไรทันที ก่อนหลักฐานจะหายไป
- [ ] ต้องเก็บจากระบบหรือแหล่งใด
- [ ] หลักฐานชิ้นนั้นสำคัญต่อการหาขอบเขต การระบุผู้กระทำ หรือการพิจารณาทางกฎหมายอย่างไร

### Template ขั้นต่ำของ Evidence Checklist

| ประเภทหลักฐาน | สิ่งที่ต้องเก็บ | แหล่งข้อมูล | เหตุผลที่ต้องเก็บ |
|:---|:---|:---|:---|
| บริบทของ alert | alert ต้นทาง, correlation ID, timestamp, severity | SIEM / EDR / gateway | เก็บจุดเริ่มต้นของ timeline |
| หลักฐานด้านตัวตน | user, account, token, API key, source IP, device | IAM / auth logs | ยืนยันว่าใครหรืออะไรเกี่ยวข้อง |
| หลักฐานจากระบบ | hostname, process tree, files, registry/service/task changes | EDR / forensic tools | ใช้ดู execution และ persistence |
| หลักฐานด้านเครือข่าย | destination IP/domain, URL, port, transfer volume | Proxy / firewall / DNS / NetFlow | ใช้ดูการสื่อสารและการ exfiltration |
| หลักฐานด้านผลกระทบธุรกิจ | ผู้ใช้, ระบบ, ชุดข้อมูล, จำนวน records ที่ได้รับผลกระทบ | DLP / app logs / asset inventory | ใช้ตัดสิน severity และ notification |

### กฎคุณภาพของ Evidence Checklist

| กฎ | เหตุผล |
|:---|:---|
| เก็บข้อมูลที่หายง่ายก่อน | token, session, memory, และ log บางชนิดหายเร็ว |
| ระบุ system of record ให้ชัด | ลดความสับสนระหว่างตอบสนองเหตุการณ์ |
| เก็บทั้งหลักฐานเทคนิคและหลักฐานเชิงธุรกิจ | ช่วยให้ CISO, legal, และ privacy ใช้ตัดสินใจได้ |
| ทำให้เฉพาะกับ incident นั้น | checklist กว้างเกินไปมักใช้หน้างานไม่ได้จริง |

## มาตรฐานของ Minimum Telemetry Required

ทุก playbook ควรระบุ telemetry ขั้นต่ำที่จำเป็นต่อการใช้งาน playbook อย่างมั่นใจ:

- [ ] ต้องมี log source อะไรบ้างเพื่อยืนยัน incident
- [ ] มีแหล่งข้อมูลเสริมอะไรที่ช่วยให้วิเคราะห์เร็วหรือแม่นขึ้น
- [ ] ถ้า telemetry นี้ไม่มี จะเกิด blind spot อะไร

### Template ขั้นต่ำของ Minimum Telemetry Required

| แหล่ง Telemetry | ใช้เพื่ออะไร | ความสำคัญ | Blind Spot ถ้าไม่มี |
|:---|:---|:---:|:---|
| Authentication logs | ยืนยันการ login, token usage, account abuse | Required | แยกไม่ออกว่าเป็น user error หรือ compromise |
| Endpoint telemetry | ดู process, file, service, registry, script execution | Required | มองไม่เห็น execution และ persistence บนเครื่อง |
| Network telemetry | ดู outbound connection, DNS, proxy, transfer | Required | ระบุ C2 และ exfiltration path ได้ไม่ครบ |
| Asset และ identity inventory | ดู owner, criticality, role, account type | Recommended | ตัด severity และ notification ได้ไม่สม่ำเสมอ |
| Case และ ticket history | ดู incident เดิม, exception, maintenance window | Recommended | อาจ escalate false positive ซ้ำโดยไม่จำเป็น |

### กฎคุณภาพของ Minimum Telemetry Required

| กฎ | เหตุผล |
|:---|:---|
| แยก Required ออกจาก Recommended ให้ชัด | ทำให้ SOC Manager เห็นว่าต้องมีอะไรจริงก่อน rollout |
| ระบุชื่อระบบหรือ control family ให้ชัด | ลดความกำกวมสำหรับ Security Engineer และ platform owner |
| อธิบาย blind spot เป็นภาษาตรงไปตรงมา | ให้ CISO และ IR leadership เข้าใจ residual risk ได้เร็ว |
| ทำให้เฉพาะกับ incident นั้น | ทำให้ section นี้ใช้หน้างานได้จริง ไม่กลายเป็น governance กว้าง ๆ |

## มาตรฐานของ False Positive และ Tuning Guide

ทุก playbook ควรช่วยให้ analyst แยก benign activity ออกจาก incident จริง และรู้ว่าควร tune แบบใด:

- [ ] อะไรคือพฤติกรรมปกติที่มักดูคล้าย incident นี้
- [ ] ต้องใช้หลักฐานอะไรเพื่อแยก benign ออกจาก malicious
- [ ] ควร tune อย่างไรเพื่อลด noise โดยไม่ปิดการมองเห็นความเสี่ยงจริง

### Template ขั้นต่ำของ False Positive และ Tuning Guide

| Scenario | ทำไมจึงดูน่าสงสัย | วิธีตรวจสอบ | Tuning Action | ต้องยกระดับเมื่อ |
|:---|:---|:---|:---|:---|
| งาน admin หรือ maintenance ที่ได้รับอนุมัติ | อาจ trigger rule หรือ workflow เดียวกัน | ตรวจ change ticket, owner, และ maintenance window | suppress เฉพาะ scope และช่วงเวลาที่อนุมัติ | กิจกรรมเกิดนอก scope ที่อนุมัติ |
| การเดินทาง, VPN, หรือ mobile network ของผู้ใช้ | ทำให้ source IP, location, หรือ device context เปลี่ยน | ยืนยันกับผู้ใช้, device posture, และ login pattern เดิม | tune logic ด้าน location หรือ ASN พร้อม compensating control | มี MFA anomaly หรือ post-login action ที่เสี่ยง |
| Security scanning หรือ test automation | ทำให้ request ปริมาณสูงหรือ pattern ผิดปกติ | ยืนยัน scanner identity, source range, และ schedule | allowlist เฉพาะ scanner และ schedule ที่อนุมัติ | ยิงเกินช่วงที่อนุมัติหรือมี exploit behavior |
| งาน batch หรือ integration ทางธุรกิจ | ทำให้เกิด volume, file movement, หรือ API use สูงผิดปกติ | ยืนยัน application owner, job ID, และ baseline เดิม | ปรับ threshold เฉพาะ signature ของ process ที่รู้จัก | มี data access pattern ใหม่หรือ privileged action |

### กฎคุณภาพของ False Positive และ Tuning Guide

| กฎ | เหตุผล |
|:---|:---|
| Tune ให้แคบตาม scope, identity, หรือเวลา | การยกเว้นกว้างเกินไปทำให้ coverage หายแบบเงียบ ๆ |
| ต้องมี validation step ก่อน suppress | ป้องกัน analyst เผลอทำให้พฤติกรรม attacker ดูเป็นเรื่องปกติ |
| ระบุ residual risk หลัง tune | ให้ CISO และ SOC Manager เข้าใจความเสี่ยงที่ยังเหลืออยู่ |
| ผูกคำแนะนำกับหลักฐานที่สังเกตได้จริง | ทำให้ section นี้ใช้หน้างานได้ ไม่ใช่แค่อ่านย้อนหลัง |

| ขั้น | กิจกรรม | ระยะเวลา |
|:---:|:---|:---:|
| 1 | Facilitator นำเสนอ scenario | 5 นาที |
| 2 | ทีมเดินตาม playbook ทีละขั้น | 20 นาที |
| 3 | ระบุช่องว่าง, ความคลุมเครือ | 15 นาที |
| 4 | อภิปรายปรับปรุง | 10 นาที |
| 5 | บันทึก action items | 5 นาที |

### เกณฑ์ให้คะแนน

| คะแนนรวม | ผลลัพธ์ | การดำเนินการ |
|:---:|:---|:---|
| 16–20 | ✅ เผยแพร่ได้ | พร้อม production |
| 11–15 | 🟡 ปรับแก้เล็กน้อย | แก้ไขตาม feedback |
| 6–10 | 🟠 ปรับแก้มาก | เขียนใหม่บางส่วน |
| 1–5 | 🔴 ไม่ผ่าน | เริ่มใหม่ |

---

## Lifecycle Management

| Trigger | Action | ผู้รับผิดชอบ |
|:---|:---|:---|
| รายไตรมาส | ทบทวน content, อัปเดต links | ผู้เขียน |
| หลังเหตุการณ์สำคัญ | อัปเดตจาก lessons learned | IR Lead |
| TI ใหม่ | เพิ่ม IOCs, techniques | TI Analyst |
| MITRE update | Re-map framework | SOC Engineer |
| เปลี่ยนเครื่องมือ | อัปเดตขั้นตอน | SOAR Engineer |
| รายปี | ทบทวนทั้งหมด + ทดสอบ tabletop | SOC Manager |

---

## ตัวชี้วัด

| ตัวชี้วัด | เป้าหมาย |
|:---|:---:|
| Playbook coverage (MITRE tactics) | ≥ 90% |
| Playbooks ผ่าน tabletop | 100% |
| Playbooks ทบทวนภายใน 12 เดือน | 100% |
| เวลาพัฒนาเฉลี่ย | < 15 วัน |
| ความพึงพอใจ analyst | ≥ 4/5 |
| Playbooks มี SOAR | ≥ 60% |

---

## Playbook Template Structure

| ส่วน | เนื้อหา | ตัวอย่าง |
|:---|:---|:---|
| **Metadata** | ID, version, owner, MITRE mapping | PB-001, v2.1, DetEng |
| **Scope** | เมื่อไหร่ที่ใช้ playbook นี้ | เมื่อ EDR alert ransomware |
| **Prerequisites** | สิ่งที่ต้องมีก่อน | SIEM access, EDR console |
| **Step-by-step** | ขั้นตอนการตอบสนอง | 1. Verify → 2. Contain → ... |
| **Escalation** | เมื่อไหร่ + ใคร | P1 → SOC Manager ทันที |
| **Evidence** | สิ่งที่ต้องเก็บ | Memory dump, disk image |
| **Resolution** | เกณฑ์การปิดเคส | Clean scan + 48h monitoring |
| **References** | เอกสารอ้างอิง | MITRE, Sigma rules |

## Quality Checklist

| # | เกณฑ์ | ✅/❌ |
|:---:|:---|:---:|
| 1 | มี Mermaid diagram สำหรับ workflow | ☐ |
| 2 | ทุกขั้นตอนสามารถทำได้จริง (actionable) | ☐ |
| 3 | มี decision points ที่ชัดเจน | ☐ |
| 4 | Evidence collection ระบุเครื่องมือและคำสั่ง | ☐ |
| 5 | Escalation criteria ชัดเจน | ☐ |
| 6 | มี SLA timeline | ☐ |
| 7 | ทดสอบจริงด้วย tabletop/purple team | ☐ |
| 8 | มี Sigma rule cross-reference | ☐ |
| 9 | Link ไปยัง playbooks ที่เกี่ยวข้อง | ☐ |
| 10 | ผ่าน peer review | ☐ |

## Playbook Lifecycle

```mermaid
graph LR
    Draft["📝 ร่าง"] --> Review["👀 ทบทวนโดยเพื่อนร่วมทีม"]
    Review --> Test["🧪 ทดสอบแบบ Tabletop"]
    Test --> Approve["✅ อนุมัติ"]
    Approve --> Deploy["🚀 นำขึ้นใช้งาน"]
    Deploy --> Monitor["📊 ติดตามผล"]
    Monitor --> Update["🔄 ปรับปรุง"]
    Update --> Review
```

## Playbook Metrics

| ตัวชี้วัด | เป้าหมาย | สิ่งที่บอก |
|:---|:---|:---|
| **Usage Rate** | ≥ 80% ของ incidents ใช้ playbook | Coverage ดีพอหรือไม่ |
| **Accuracy** | ≥ 90% ทำตาม playbook ได้สำเร็จ | Playbook เขียนดีหรือไม่ |
| **Time Savings** | ลด MTTR ≥ 30% | Automation คุ้มหรือไม่ |
| **Version Freshness** | อัปเดตภายใน 6 เดือน | เอกสาร stale หรือไม่ |
| **Coverage** | ≥ top 20 incident types | ครอบคลุมพอหรือไม่ |

## Playbook Quality Standards

### Mandatory Sections

| Section | Required Content | Review Criteria |
|:---|:---|:---|
| Objective | ระบุเป้าหมายชัดเจน | Measurable |
| Scope | ขอบเขตและข้อจำกัด | Complete |
| Prerequisites | เครื่องมือ + สิทธิ์ | Verified |
| Steps | ขั้นตอนละเอียด | Actionable |
| Decision Points | เงื่อนไข + ทางเลือก | Clear criteria |
| Escalation | เมื่อไร + ส่งใคร | Defined |
| References | MITRE + logs | Up-to-date |

### Playbook Review Cycle

| Trigger | Reviewer | SLA |
|:---|:---|:---|
| New playbook | Peer + Manager | 5 วันทำการ |
| Post-incident update | Incident owner | 3 วันทำการ |
| Quarterly review | SOC Lead | 2 สัปดาห์ |
| Tool change | Engineer | 1 สัปดาห์ |

### Template Quick Reference

| Section | Max Length |
|:---|:---|
| Objective | 2-3 sentences |
| Prerequisites | Bullet list |
| Steps | 10-15 max |
| Escalation | Decision tree |

## เอกสารที่เกี่ยวข้อง

-   [IR Framework](Framework.th.md) — กรอบงาน NIST
-   [Severity Matrix](Severity_Matrix.th.md) — คำจำกัดความ P1–P4
-   [SOAR Playbooks](SOAR_Playbooks.th.md) — Automation templates
-   [SOC Automation Catalog](../06_Operations_Management/SOC_Automation_Catalog.th.md) — คลัง Automation
