# สถานการณ์จำลองการซ้อม — SOC Incident Response Training

> **รหัสเอกสาร:** TTX-001  
> **เวอร์ชัน:** 1.0  
> **อัปเดตล่าสุด:** 2026-02-15  
> **เจ้าของ:** SOC Manager / IR Lead  
> **ความถี่:** ทุกไตรมาส (อย่างน้อย)

---

## วัตถุประสงค์

สถานการณ์จำลอง Tabletop Exercise (TTX) เพื่อทดสอบและพัฒนาความสามารถในการตอบสนองเหตุการณ์ของ SOC แต่ละสถานการณ์ใช้เวลา **60–90 นาที** พร้อมระดับความยากที่เพิ่มขึ้นตามลำดับ

---

## วิธีจัดการซ้อม

1. **กำหนดบทบาท**: ผู้ดำเนินรายการ (อ่าน inject), SOC Analysts, IR Lead, ผู้สังเกตการณ์จากผู้บริหาร
2. **กฎ**: ไม่มีคำตอบผิด, โฟกัสที่กระบวนการ, จำกัดเวลาแต่ละ inject
3. **เดินตาม Inject**: ผู้ดำเนินรายการอ่านแต่ละ inject ทีมอภิปรายแนวทาง
4. **บันทึก**: ใครทำอะไร, escalation path, เครื่องมือที่ใช้
5. **สรุป (15 นาที)**: อะไรดี? ขาดอะไร? ปรับอะไร?
6. **Action Items**: กำหนดผู้รับผิดชอบและกำหนดเวลา

---

## สถานการณ์ 1: Ransomware โจมตีเซิร์ฟเวอร์การเงิน

**ระดับ**: 🔴 ยาก | **เวลา**: 90 นาที | **Playbooks**: PB-02, PB-08, PB-12

### Inject 1 — แจ้งเตือนแรก (16:30)
> Analyst ได้รับ EDR alert: `"vssadmin.exe delete shadows /all"` บนเซิร์ฟเวอร์ `FIN-SVR-03` (File server ฝ่ายการเงิน) วันศุกร์ 16:30

**คำถามอภิปราย:**
- ระดับความรุนแรงเท่าไหร่? แจ้งใคร?
- ควร isolate ทันทีหรือสืบสวนก่อน?
- ตรวจข้อมูลอะไรเพิ่มใน SIEM?

### Inject 2 — แพร่กระจาย (16:45)
> Alert เพิ่มอีก 2 เครื่อง: `FIN-SVR-05` และ `HR-SVR-01` ผู้ใช้ฝ่ายการเงินแจ้งเปิดไฟล์ไม่ได้ — ชื่อไฟล์ลงท้ายด้วย `.locked`

**คำถามอภิปราย:**
- จะหยุด lateral movement อย่างไร?
- Isolate ทั้ง VLAN หรือเฉพาะเครื่อง?
- แจ้ง CISO, Legal, ผู้บริหารตอนไหน?

### Inject 3 — จดหมายเรียกค่าไถ่ (17:00)
> Ransom note ปรากฏ: "ไฟล์ของคุณถูกเข้ารหัสโดย BlackCat จ่าย 50 BTC ภายใน 72 ชั่วโมง"

**คำถามอภิปราย:**
- ติดต่อผู้โจมตีหรือไม่? เพราะอะไร?
- แผนสื่อสารเป็นอย่างไร?
- ตรวจสอบ backup สมบูรณ์ไหม?

### Inject 4 — ข้อมูลรั่วไหล (17:15)
> พบว่ามีการอัพโหลดข้อมูล 200GB ไปยัง IP ภายนอกใน 48 ชม.ที่ผ่านมา รวมถึง PII ลูกค้า

**คำถามอภิปราย:**
- ข้อกำหนด PDPA แจ้งเตือนภายในกี่ชั่วโมง?
- เก็บหลักฐานอย่างไรพร้อมกับกู้คืนระบบ?
- ต้องแจ้งหน่วยงานบังคับใช้กฎหมายไหม?

### ผลลัพธ์ที่คาดหวัง
- [ ] จำแนกความรุนแรง P1 ถูกต้อง
- [ ] Isolate เครื่องภายใน 15 นาที
- [ ] แจ้ง CISO+Legal ภายใน 30 นาที
- [ ] ตรวจสอบ backup ก่อนกู้คืน
- [ ] เข้าใจ timeline แจ้ง PDPA (72 ชม.)

---

## สถานการณ์ 2: Business Email Compromise (BEC)

**ระดับ**: 🟡 ปานกลาง | **เวลา**: 60 นาที | **Playbooks**: PB-17, PB-05, PB-26

### Inject 1 — Email น่าสงสัย (09:00)
> CFO ได้รับ email เร่งด่วนจาก "CEO": "ต้องการให้โอนเงิน 250,000 ดอลลาร์ไปยังบัญชี XXXX ด่วน NDA — อย่าบอกใคร"

### Inject 2 — โดเมนปลอม (09:30)
> พบว่า email มาจาก `ceo@your-company.co` (ไม่ใช่ `.com`) โดเมนลงทะเบียนเมื่อ 2 วันก่อน

### Inject 3 — บัญชีจริงถูกยึด (10:00)
> พบ forwarding rule ใน email จริงของ CEO ส่งต่อ email ทั้งหมดไป Gmail ภายนอก MFA ถูก bypass ด้วย AiTM

### Inject 4 — โอนเงินไปแล้ว (10:30)
> CFO ยอมรับว่าโอนเงินไปแล้ว $85,000 ก่อน SOC จะแจ้งเตือน

---

## สถานการณ์ 3: Insider Threat — ขโมยข้อมูล

**ระดับ**: 🟡 ปานกลาง | **เวลา**: 60 นาที | **Playbooks**: PB-14, PB-08

- Inject 1: HR แจ้ง SOC ว่าวิศวกรอาวุโสลาออก — เปิด enhanced monitoring
- Inject 2: DLP พบดาวน์โหลดข้อมูลลูกค้า 2.5GB + clone repo ที่ไม่เกี่ยวข้อง
- Inject 3: เสียบ USB ส่วนตัว + อัพโหลดไป Google Drive
- Inject 4: HR เรียกประชุม — พนักงานปฏิเสธ, Legal ต้องการหลักฐาน

---

## สถานการณ์ 4: Cloud Infrastructure ถูกบุกรุก

**ระดับ**: 🔴 ยาก | **เวลา**: 90 นาที | **Playbooks**: PB-16, PB-27, PB-07

- Inject 1: GuardDuty alert — IAM credentials ใช้จาก IP ยุโรปตะวันออก (ตี 2)
- Inject 2: Privilege escalation — สร้าง admin user ใหม่
- Inject 3: ปั่น EC2 ขุด crypto + เปิด S3 เป็น public
- Inject 4: Root cause = SSRF vulnerability ขโมย metadata credentials

---

## สถานการณ์ 5: OT/ICS — โจมตีโรงบำบัดน้ำ

**ระดับ**: 🔴🔴 วิกฤต | **เวลา**: 90 นาที | **Playbooks**: PB-30

- Inject 1: HMI แสดงค่า NaOH เปลี่ยนจาก 100ppm เป็น 1,100ppm โดยไม่มีผู้ปฏิบัติงานทำ
- Inject 2: พบ VPN connection จาก IP ไม่รู้จัก + TeamViewer บน engineering workstation
- Inject 3: หน่วยงานสาธารณสุขโทรมา + สื่อเริ่มรายงานข่าว
- Inject 4: แก้ไขค่า NaOH แล้ว ต้องตรวจสอบ PLC logic

---

## ตารางให้คะแนน (Scoring Rubric)

| หมวด | คะแนน 1–5 |
|:---|:---:|
| ความเร็วในการตรวจจับ | _/5 |
| ความถูกต้องในการ Escalate | _/5 |
| การควบคุมเหตุการณ์ | _/5 |
| การสื่อสาร | _/5 |
| การจัดการหลักฐาน | _/5 |
| การวางแผนกู้คืน | _/5 |
| การปฏิบัติตามกระบวนการ | _/5 |

**คะแนนรวม: ___/35** → 🟢 30+ ดีเยี่ยม | 🟡 22–29 ดี | 🟠 15–21 พัฒนาได้ | 🔴 <15 ต้องปรับปรุง

---

## ปฏิทินการซ้อม

| ไตรมาส | สถานการณ์ | จุดเน้น | ผู้เข้าร่วม |
|:---:|:---|:---|:---|
| Q1 | Ransomware (#1) | Containment + Recovery | SOC + IT Ops + ผู้บริหาร |
| Q2 | BEC (#2) | Detection + สื่อสาร | SOC + Finance + Legal |
| Q3 | Insider Threat (#3) | Monitoring + หลักฐาน | SOC + HR + Legal |
| Q4 | Cloud Compromise (#4) | Cloud IR + Escalation | SOC + Cloud Team |
| ประจำปี | OT/ICS (#5) | ความปลอดภัย + OT | SOC + วิศวกร OT |

---

## เทมเพลตวาระ Exercise

| เวลา | กิจกรรม | ผู้รับผิดชอบ |
|:---:|:---|:---|
| 15 นาที | **เปิดประชุม**: วัตถุประสงค์, กฎกติกา | Facilitator |
| 10 นาที | **Scenario Briefing**: สถานการณ์เริ่มต้น | Facilitator |
| 30 นาที | **Phase 1 — Detection**: ตรวจพบ, คัดกรอง | SOC Team |
| 20 นาที | **Phase 2 — Containment**: ตัดสินใจควบคุม | IR Lead |
| 20 นาที | **Phase 3 — Eradication**: กำจัดภัยคุกคาม | IR Team |
| 15 นาที | **Phase 4 — Recovery**: กู้คืนระบบ | IT + SOC |
| 20 นาที | **Debrief**: สิ่งที่ทำได้ดี / ต้องปรับปรุง | ทุกคน |
| 10 นาที | **Action Items**: มอบหมายงาน, กำหนดเวลา | Facilitator |

## Facilitator Guide

### ก่อน Exercise (1 สัปดาห์)

- [ ] เลือก scenario ที่เกี่ยวข้องกับองค์กร
- [ ] เตรียม injects (เหตุการณ์ที่จะ "ฉีด" เข้ามาระหว่าง exercise)
- [ ] ส่งคำเชิญและเอกสารเตรียมตัวให้ผู้เข้าร่วม
- [ ] เตรียมห้องประชุม / virtual meeting room
- [ ] ทดสอบ tools ที่จะใช้ (slides, timer, note-taking)

### ระหว่าง Exercise

- **ห้ามตัดสิน** — ไม่มีคำตอบถูก/ผิด ทุกการตัดสินใจเป็นการเรียนรู้
- **ควบคุมเวลา** — ใช้ timer, ไม่ให้ phase ใดยาวเกินไป
- **Inject เหตุการณ์** — เพิ่มความซับซ้อนตามจังหวะ (เช่น "CEO โทรมาถาม")
- **บันทึกทุกอย่าง** — จด decisions, assumptions, gaps ที่พบ

### หลัง Exercise (1 สัปดาห์)

- [ ] เขียน after-action report
- [ ] แจก action items พร้อม owner และ deadline
- [ ] อัปเดต playbooks ตามผลลัพธ์
- [ ] กำหนดวัน exercise ครั้งถัดไป

## ตัวอย่าง Injects

| นาทีที่ | Inject | ผลกระทบ |
|:---:|:---|:---|
| 5 | SOC ได้รับ alert: Ransomware detected on 3 hosts | เริ่ม IR process |
| 15 | EDR agent offline บน domain controller | เพิ่มความเร่งด่วน |
| 25 | CEO โทรถาม "เรามีข่าวหลุดมั้ย?" | ทดสอบ communication |
| 35 | พบ lateral movement ไปยัง database server | ขยาย scope |
| 45 | Backup server ถูก encrypt ด้วย | ทดสอบ BCP |

## ตัวชี้วัด Exercise

| ตัวชี้วัด | เป้าหมาย |
|:---|:---|
| จำนวน exercise ต่อปี | ≥ 4 (รายไตรมาส) |
| ผู้เข้าร่วม vs เป้าหมาย | ≥ 80% |
| Action items แล้วเสร็จภายใน 30 วัน | ≥ 70% |
| ปรับปรุง MTTD/MTTR หลัง exercise | ลดลง ≥ 10% |

## Scenario Library

### Scenario 3: Business Email Compromise (BEC)

| Phase | สถานการณ์ | Decision Point |
|:---|:---|:---|
| **Detection** | พนักงานการเงินรายงาน email จาก CEO ขอโอนเงิน | ยืนยัน email อย่างไร? |
| **Investigation** | ตรวจพบ email header ปลอม + domain typosquatting | Scope ของ compromise? |
| **Containment** | Block malicious domain, reset affected accounts | แจ้งธนาคาร? |
| **Recovery** | Recall ถ้าโอนเงินแล้ว, reset MFA | จะป้องกันซ้ำอย่างไร? |

### Scenario 4: Supply Chain Compromise

| Phase | สถานการณ์ | Decision Point |
|:---|:---|:---|
| **Detection** | EDR alert: malicious DLL loaded by trusted software | Software update ปกติ? |
| **Investigation** | DLL มี C2 callback ไปยัง unknown IP | กี่เครื่องที่ affected? |
| **Containment** | Block outbound C2, isolate hosts | ถอน software? |
| **Recovery** | Re-image, deploy clean version, monitor | แจ้ง vendor? |

### Scenario 5: Insider Data Theft

| Phase | สถานการณ์ | Decision Point |
|:---|:---|:---|
| **Detection** | DLP alert: พนักงาน upload 500MB ไป personal cloud | จงใจหรือผิดพลาด? |
| **Investigation** | พนักงานกำลังจะลาออก, access ข้อมูลลูกค้าจำนวนมาก | เข้า HR process? |
| **Containment** | Revoke access, preserve evidence | Chain of custody? |
| **Legal** | ตรวจสอบสัญญาจ้าง, NDA, PDPA obligations | แจ้งเจ้าของข้อมูล? |

## After-Action Report Template

| ส่วน | เนื้อหา |
|:---|:---|
| **Exercise Date** | [วันที่] |
| **Scenario** | [ชื่อ scenario] |
| **Participants** | [รายชื่อ + บทบาท] |
| **สิ่งที่ทำได้ดี** | [3–5 bullet points] |
| **สิ่งที่ต้องปรับปรุง** | [3–5 bullet points] |
| **Gaps ที่พบ** | [ระบุ gap + severity] |
| **Action Items** | [รายการ + owner + deadline] |
| **ส่งรายงานถึง** | [SOC Manager, CISO] |
| **Exercise ถัดไป** | [วันที่เป้าหมาย] |

## Tabletop Scenario Templates

### Scenario 1: Ransomware Attack

| ขั้นตอน | สถานการณ์ | คำถามอภิปราย |
|:---|:---|:---|
| 1 | พบ file encryption เวลา 02:00 | ใครต้อง notify ก่อน? |
| 2 | 30% ของ servers ถูก encrypt | จ่าย ransom หรือไม่? |
| 3 | ข่าวรั่วไหลสู่สื่อ | PR response อย่างไร? |
| 4 | Recovery เริ่ม 48 ชม. | ลำดับ restore อย่างไร? |

### Scenario 2: Insider Threat

| ขั้นตอน | สถานการณ์ | คำถามอภิปราย |
|:---|:---|:---|
| 1 | DLP alert: mass download | ตรวจสอบอย่างไรโดยไม่แจ้ง? |
| 2 | พนักงานยื่นลาออก 2 สัปดาห์ก่อน | Legal implications? |
| 3 | พบข้อมูลใน personal cloud | การเก็บหลักฐาน? |
| 4 | ข้อมูลลูกค้า 10,000 ราย | แจ้ง PDPA ภายใน 72 ชม.? |

### Exercise Evaluation Rubric

| Criteria | 1 (Poor) | 3 (Adequate) | 5 (Excellent) |
|:---|:---|:---|:---|
| Response Time | >60 นาที | 30-60 นาที | <30 นาที |
| Communication | ไม่มีแผน | มีแผนบางส่วน | แผนชัดเจน |
| Decision Making | ไม่แน่นอน | ค่อนข้างดี | รวดเร็วแม่นยำ |
| Documentation | ไม่บันทึก | บันทึกบางส่วน | บันทึกครบถ้วน |

### Exercise Logistics Checklist

| รายการ | รายละเอียด | สถานะ |
|:---|:---|:---|
| สถานที่ | ห้องประชุม + จอ | ☐ |
| ผู้เข้าร่วม | 8-15 คน | ☐ |
| Facilitator | ผู้ดำเนินรายการ | ☐ |
| Scenario packet | เอกสารสถานการณ์ | ☐ |
| Note-taker | ผู้จดบันทึก | ☐ |
| Timer | จับเวลาแต่ละ phase | ☐ |
| Evaluation form | แบบประเมินผล | ☐ |

### Exercise Calendar (Annual)

| ไตรมาส | Scenario Theme | ระดับ | ผู้เข้าร่วม |
|:---|:---|:---|:---|
| Q1 | Ransomware | Technical | SOC + IT |
| Q2 | Data Breach + PDPA | Strategic | Mgmt + Legal |
| Q3 | Insider Threat | Tactical | SOC + HR |
| Q4 | Supply Chain / Cloud | Technical | SOC + DevOps |

### Follow-up Action Types

| Type | SLA | Owner |
|:---|:---|:---|
| Process update | 2 weeks | SOC Manager |
| New detection rule | 1 week | Engineer |
| Training update | 1 month | Training lead |

### Quick Prep Checklist

| Item | Done |
|:---|:---|
| Scenario ready | ☐ |
| Participants confirmed | ☐ |

## เอกสารที่เกี่ยวข้อง

- [กรอบ IR](Framework.th.md)
- [ตารางความรุนแรง](Severity_Matrix.th.md)
- [Playbook ทั้งหมด (PB-01 ถึง PB-50)](Playbooks/Phishing.th.md)
