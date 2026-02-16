# SOC Capacity Planning / การวางแผนกำลังคน SOC

**รหัสเอกสาร**: OPS-SOP-026
**เวอร์ชัน**: 1.0
**การจัดชั้นความลับ**: ใช้ภายใน
**อัปเดตล่าสุด**: 2026-02-16

> กรอบการ **วางแผนกำลังคน, โครงสร้างพื้นฐาน, และงบประมาณ SOC** ตามการเติบโตองค์กร, การเปลี่ยนแปลงภัยคุกคาม, และข้อกำหนดงาน ครอบคลุม staffing, SIEM sizing, license, และ budget

---

## โมเดลกำลังคน

### ตามรูปแบบ Coverage

| รูปแบบ | กะ | Analysts ขั้นต่ำ | Lead/Manager | รวม FTE |
|:---|:---:|:---:|:---:|:---:|
| **เวลาทำการ** (8×5) | 1 | 2 | 1 | 3 |
| **ขยาย** (16×5) | 2 | 4 | 1 | 5 |
| **24/5** | 3 | 6 | 1 | 7 |
| **24/7** | 4 | 8 | 2 | 10 |
| **24/7 + Hunt** | 4 | 10 | 2 + 2 TH | 14 |

### Capacity ต่อ FTE

| Role | Capacity | หมายเหตุ |
|:---|:---|:---|
| **Tier 1** | 30–50 alerts/กะ | Triage + initial response |
| **Tier 2** | 5–10 investigations/วัน | Deep investigation |
| **Tier 3 / Hunt** | 2–4 hunts/สัปดาห์ | Proactive hunting |
| **Detection Engineer** | 5–10 rules/สัปดาห์ | สร้าง + tune rules |
| **SOAR Engineer** | 2–3 playbooks/เดือน | Automation dev |

---

## SIEM Sizing

| Tier | EPS | ปริมาณ/วัน | Storage (1 ปี) | vCPU | RAM |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Small** | < 5K | < 50 GB | 18 TB | 8 | 32 GB |
| **Medium** | 5–25K | 50–250 GB | 90 TB | 24 | 96 GB |
| **Large** | 25–100K | 250 GB–1 TB | 365 TB | 64 | 256 GB |
| **Enterprise** | > 100K | > 1 TB | 500+ TB | 128+ | 512+ GB |

### ปริมาณ Log ต่อแหล่ง

| แหล่ง | EPS เฉลี่ย/เครื่อง | ต่อวัน | อัตราเติบโต |
|:---|:---:|:---:|:---:|
| Firewall | 200–500 | 5–15 GB | 15%/ปี |
| IDS/IPS | 50–200 | 2–8 GB | 10%/ปี |
| EDR | 10–50/agent | 0.2–1 GB | 20%/ปี |
| Windows Event | 5–20/host | 0.1–0.5 GB | 10%/ปี |
| DNS | 100–500 | 3–10 GB | 15%/ปี |
| Cloud | 20–200 | 1–5 GB | 30%/ปี |

---

## การวางแผนงบประมาณ

### สัดส่วนงบ SOC

| หมวด | % ของงบ SOC | รายละเอียด |
|:---|:---:|:---|
| **บุคลากร** | 55–65% | เงินเดือน, สวัสดิการ, ฝึกอบรม, certification |
| **เทคโนโลยี** | 25–35% | SIEM, SOAR, EDR, TI, cloud |
| **Operations** | 5–10% | สถานที่, ไฟฟ้า, เครือข่าย |
| **Professional Services** | 3–5% | ที่ปรึกษา, pentest |
| **Contingency** | 3–5% | IR retainer, surge capacity |

### Automation ROI

| ก่อน Automation | หลัง Automation | ประหยัด |
|:---|:---|:---|
| 50 alerts/analyst/กะ | 80 alerts/analyst/กะ | +37.5% capacity |
| Triage เฉลี่ย 15 นาที | 5 นาที ด้วย SOAR | ลด 66% |
| 3 analysts สำหรับ triage | 2 analysts | ลด 1 FTE |
| Enrichment 10 นาที | Auto 30 วินาที | เร็วขึ้น 95% |

---

## Growth Triggers

| Trigger | ตัวบ่งชี้ | Action |
|:---|:---|:---|
| Alert > capacity | Analysts ได้ > 50/กะ | เพิ่ม FTE |
| MTTD เพิ่ม | เทรนด์เกิน SLA | เพิ่ม monitoring capacity |
| MTTR เพิ่ม | เทรนด์เกิน SLA | เพิ่ม investigation capacity |
| Alert backlog | Unresolved > 24 ชม. | เพิ่ม triage capacity |
| Log sources ใหม่ | EPS เพิ่ม > 20% | ขยาย SIEM |
| M&A / ขยายกิจการ | Business units ใหม่ | ขยาย staff + tools |
| Attrition สูง | Turnover > 15% | ปรับค่าตอบแทน |

---

## ตัวชี้วัด

| ตัวชี้วัด | เป้าหมาย |
|:---|:---:|
| Analyst utilization rate | 70–80% |
| Alert-to-analyst ratio | ≤ 50/กะ |
| SIEM capacity headroom | ≥ 20% |
| Budget variance | ± 5% |
| Attrition rate | < 15% |
| Training hours/analyst | ≥ 40 ชม./ปี |
| Automation coverage | ≥ 50% |

---

## เครื่องมือคำนวณ FTE

### สูตรคำนวณ FTE พื้นฐาน

```
FTE ขั้นต่ำ (24/7) = (จำนวนชั่วโมงต่อสัปดาห์ × 52) / (ชั่วโมงทำงานต่อคน × 52 - วันลา)

ตัวอย่าง:
- Coverage: 168 ชม./สัปดาห์ (24/7)
- ชั่วโมงทำงาน: 40 ชม./สัปดาห์
- วันลา: 15 วัน/ปี + 13 วันหยุดนักขัตฤกษ์
- Practical availability: ~1,776 ชม./ปี

FTE = 168 × 52 / 1,776 = ~4.9 ≈ 5 FTE ต่อตำแหน่ง
สำหรับ 24/7 ที่ต้องมี 2 คนขั้นต่ำ = 10 FTE (analysts เท่านั้น)
```

### Alert Volume → FTE Mapping

| Alerts/วัน | เวลา Triage/Alert | FTE ที่ต้องใช้ (8h shift) |
|:---:|:---:|:---:|
| 50 | 10 นาที | 1.0 |
| 100 | 10 นาที | 2.1 |
| 200 | 10 นาที | 4.2 |
| 500 | 10 นาที | 10.4 |
| 500 | 5 นาที (with SOAR) | 5.2 |

## แผนการเติบโต

```mermaid
gantt
    title SOC Growth Plan
    dateFormat YYYY-Q
    section Phase 1 (Startup)
    3-4 FTE, 8/5        :2026-Q1, 2026-Q2
    section Phase 2 (Growth)
    6-8 FTE, 16/5       :2026-Q3, 2026-Q4
    section Phase 3 (Mature)
    12-15 FTE, 24/7     :2027-Q1, 2027-Q4
```

## Infrastructure Capacity Planning

| ทรัพยากร | สูตร | ตัวอย่าง |
|:---|:---|:---|
| **Storage** | EPS × 500 bytes × 86400 × retention days | 100 EPS × 30 วัน = ~130 GB |
| **SIEM CPU** | 1 core ต่อ 2,000 EPS | 500 EPS = 1 core |
| **SIEM RAM** | 16 GB base + 4 GB ต่อ 1,000 EPS | 500 EPS = 18 GB |
| **Network** | EPS × avg log size × 8 | 100 EPS × 500B = 0.4 Mbps |

## Capacity Planning Formulas

### Staffing Calculator

```
Required Analysts = (Alerts/Day × Avg Handle Time) / (Working Hours × Utilization)

ตัวอย่าง:
- Alerts/Day: 500
- Avg Handle Time: 15 min (0.25 hr)
- Working Hours: 8 hr/shift
- Utilization: 75%

= (500 × 0.25) / (8 × 0.75) = 125 / 6 = ~21 analysts (3 shifts)
```

### Growth Projection Model

| Year | Alert Volume | Analysts | Cost (THB) |
|:---|:---|:---|:---|
| Y1 | 500/day | 6 | 4.8M |
| Y2 | 750/day (+50%) | 8 | 6.4M |
| Y3 | 1,000/day (+33%) | 10 | 8.0M |
| Y4 | 1,200/day (+20%) | 11 | 8.8M |

## เอกสารที่เกี่ยวข้อง

-   [SOC Team Structure](SOC_Team_Structure.en.md) — บทบาทและความรับผิดชอบ
-   [SOC Metrics & KPIs](SOC_Metrics.en.md) — การวัดผล
-   [Log Source Matrix](Log_Source_Matrix.en.md) — แหล่งข้อมูลและปริมาณ
-   [SOC Automation Catalog](SOC_Automation_Catalog.en.md) — ลดภาระงาน
