# แบบประเมินระดับความพร้อม SOC (SOC-CMM)

**รอบการประเมิน**: รายไตรมาส

## 1. วงจรการปรับปรุง (Improvement Cycle)
เราใช้วงจรการปรับปรุงอย่างต่อเนื่องเพื่อยกระดับความสามารถของ SOC

```mermaid
graph LR
    Measure[1. วัดผล] --> Analyze[2. วิเคราะห์]
    Analyze --> Plan[3. วางแผน]
    Plan --> Improve[4. ปรับปรุง]
    Improve --> Measure
    
    subgraph "การกระทำ"
    Measure --- Check[ทำแบบประเมิน]
    Analyze --- Gap[หาช่องว่าง]
    Plan --- Budget[ของบ/แบ่งงาน]
    Improve --- Deploy[ลงมือทำ]
    end
```

## 2. ระดับความพร้อม (Maturity Levels)
-   **Level 1 (Initial)**: ทำตามมีตามเกิด, แก้ปัญหาเฉพาะหน้า
-   **Level 2 (Managed)**: มีกระบวนการ แต่ยังทำงานเชิงรับ (Reactive)
-   **Level 3 (Defined)**: มีมาตรฐานชัดเจน, ทำงานเชิงรุก (Proactive) **(เป้าหมายปัจจุบัน)**
-   **Level 4 (Quantitatively Managed)**: ขับเคลื่อนด้วยข้อมูล (Metrics/KPIs)
-   **Level 5 (Optimizing)**: อัตโนมัติขั้นสูง, AI-driven

## 3. รายการตรวจเช็ค (Checklist)

### Domain 1: ธุรกิจ (Business)
- [ ] มีพ.ร.บ. หรือกฎบัตร (Charter) ของ SOC?
- [ ] ได้รับการสนับสนุนงบประมาณจากผู้บริหาร?
- [ ] มีการรายงานผล KPI สม่ำเสมอ?

### Domain 2: บุคลากร (People)
- [ ] มีตารางเวร 24/7 ที่ชัดเจน?
- [ ] มีหลักสูตร Onboarding พนักงานใหม่?
- [ ] มีการฝึกอบรมทักษะ (เช่น Purple Team) สม่ำเสมอ?

### Domain 3: กระบวนการ (Process)
- [ ] มี SOP ครอบคลุมงานหลัก?
- [ ] มี Playbook รับมือภัยคุกคาม 10 อันดับแรก?
- [ ] มีกระบวนการ Change Management (RFC)?

### Domain 4: เทคโนโลยี (Technology)
- [ ] SIEM รับ Log สำคัญครบถ้วน?
- [ ] EDR ติดตั้งครอบคลุม 95%+ ของเครื่อง?
- [ ] มีระบบ SOAR ช่วยงานซ้ำๆ?

### Domain 5: บริการ (Services)
- [ ] มีการเฝ้าระวังและแจ้งเตือนแบบ Real-time?
- [ ] มีขีดความสามารถในการตอบสนองเหตุการณ์ (IR)?
- [ ] มีการใช้ Threat Intelligence?

## 4. การให้คะแนน
นับจำนวนข้อที่ตอบ "ใช่" เพื่อประเมินระดับ
-   0-5: Level 1
-   6-10: Level 2
-   11-13: Level 3 (เกณฑ์มาตรฐาน)
-   14+: Level 4+

### โดเมน 6: การปฏิบัติตามและการกำกับดูแล
- [ ] มีขั้นตอน PDPA / GDPR?
- [ ] มาตรฐานการจำแนกข้อมูลและ TLP?
- [ ] ดำเนินการตรวจสอบการปฏิบัติตามเป็นประจำ?

## เทมเพลตวิเคราะห์ช่องว่าง

| โดเมน | ระดับปัจจุบัน | ระดับเป้าหมาย | ช่องว่าง | ลำดับ | การแก้ไข |
|:---|:---:|:---:|:---:|:---:|:---|
| ธุรกิจ | [1-5] | [3+] | [Δ] | [H/M/L] | [รายการดำเนินการ] |
| บุคลากร | [1-5] | [3+] | [Δ] | [H/M/L] | [รายการดำเนินการ] |
| กระบวนการ | [1-5] | [3+] | [Δ] | [H/M/L] | [รายการดำเนินการ] |
| เทคโนโลยี | [1-5] | [3+] | [Δ] | [H/M/L] | [รายการดำเนินการ] |
| บริการ | [1-5] | [3+] | [Δ] | [H/M/L] | [รายการดำเนินการ] |
| การปฏิบัติตาม | [1-5] | [3+] | [Δ] | [H/M/L] | [รายการดำเนินการ] |

## แผนการปรับปรุง

| ไตรมาส | พื้นที่เน้น | กิจกรรมหลัก | เกณฑ์ความสำเร็จ |
|:---|:---|:---|:---|
| Q1 | พื้นฐาน | SOPs, ตารางกะ, Log onboarding | ถึงระดับ 2 |
| Q2 | การตรวจจับ | Sigma rules, playbooks, การปรับจูน | 35 playbooks ใช้งาน |
| Q3 | ระบบอัตโนมัติ | SOAR workflows, auto-enrichment | MTTR < 60 นาที |
| Q4 | ขั้นสูง | Threat hunting, purple team, TI program | ถึงระดับ 3 |

## เอกสารที่เกี่ยวข้อง (Related Documents)
-   [กรอบการตอบสนองเหตุการณ์](../05_Incident_Response/Framework.th.md)
-   [แบบประเมิน SOC](SOC_Assessment_Checklist.th.md)
-   [ตัวชี้วัด SOC](SOC_Metrics.th.md)

### Assessment Scoring Guide

| Score | Meaning | Action |
|:---|:---|:---|
| 0-2 | Critical gap | Immediate fix |
| 3-4 | Needs improvement | Plan within 30d |
| 5 | Meets standard | Maintain |

## References
-   [SOC-CMM (Capability Maturity Model)](https://www.soc-cmm.com/)
-   [MITRE SOC Strategy](https://mitre.org/)
-   14+: Level 4+
