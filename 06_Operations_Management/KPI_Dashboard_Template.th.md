# SOC KPI Dashboard Template / แม่แบบ Dashboard ตัวชี้วัด SOC

**รหัสเอกสาร**: OPS-SOP-013
**เวอร์ชัน**: 1.0
**การจัดชั้นความลับ**: ใช้ภายใน
**อัปเดตล่าสุด**: 2026-02-15

> แม่แบบ **executive dashboard** สำหรับรายงานผลการดำเนินงาน SOC รายเดือน คัดลอกส่วนเหล่านี้ไปใช้ใน BI tool (Grafana, Power BI, Kibana) หรือใช้เป็นรายงาน manual

---

## ส่วนที่ 1: สรุปสำหรับผู้บริหาร

> 🎯 **กลุ่มเป้าหมาย**: CISO, CTO, คณะกรรมการ
> 📅 **ความถี่**: รายเดือน

### KPI หลัก

| KPI | เดือนนี้ | เดือนก่อน | แนวโน้ม | เป้าหมาย | สถานะ |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Alert ทั้งหมด** | _____ | _____ | ↑/↓ _% | — | — |
| **True Positive Rate** | ___% | ___% | ↑/↓ | ≥ 80% | 🟢/🟡/🔴 |
| **Incident ที่สร้าง** | _____ | _____ | ↑/↓ _% | — | — |
| **P1/P2 Incidents** | _____ | _____ | ↑/↓ _% | — | — |
| **MTTD** (เวลาเฉลี่ยในการตรวจพบ) | ___ นาที | ___ นาที | ↑/↓ | < 15 นาที | 🟢/🟡/🔴 |
| **MTTR** (เวลาเฉลี่ยในการตอบสนอง) | ___ นาที | ___ นาที | ↑/↓ | < 60 นาที | 🟢/🟡/🔴 |
| **MTTC** (เวลาเฉลี่ยในการควบคุม) | ___ ชม. | ___ ชม. | ↑/↓ | < 4 ชม. | 🟢/🟡/🔴 |
| **SLA Compliance** | ___% | ___% | ↑/↓ | ≥ 95% | 🟢/🟡/🔴 |
| **Automation Rate** | ___% | ___% | ↑/↓ | ≥ 40% | 🟢/🟡/🔴 |
| **Data Breach** | _____ | _____ | ↑/↓ | 0 | 🟢/🟡/🔴 |

**สัญลักษณ์**: 🟢 ได้ตามเป้า | 🟡 ต้องดูแล (ภายใน 10%) | 🔴 ต่ำกว่าเป้า

---

## ส่วนที่ 2: Alert Analytics

### 2a. แนวโน้มปริมาณ Alert (12 เดือน)

| เดือน | Alert ทั้งหมด | True Positive | False Positive | TP Rate | Alert/Analyst/วัน |
|:---|:---:|:---:|:---:|:---:|:---:|
| _____ | _____ | _____ | _____ | ___% | _____ |
| _____ | _____ | _____ | _____ | ___% | _____ |

> 📊 **Visualization**: Line chart แสดงแนวโน้ม alert พร้อมแยก TP/FP

### 2b. หมวดหมู่ Alert (Top 10)

| อันดับ | หมวดหมู่ | จำนวน | % ของทั้งหมด | แนวโน้ม |
|:---:|:---|:---:|:---:|:---:|
| 1 | ______________ | _____ | ___% | ↑/↓ |
| 2 | ______________ | _____ | ___% | ↑/↓ |
| 3 | ______________ | _____ | ___% | ↑/↓ |

### 2c. แหล่ง Alert

| แหล่ง | จำนวน | % ของทั้งหมด | TP Rate | Noise Ratio |
|:---|:---:|:---:|:---:|:---:|
| SIEM | _____ | ___% | ___% | ___% |
| EDR | _____ | ___% | ___% | ___% |
| Email Gateway | _____ | ___% | ___% | ___% |
| Cloud | _____ | ___% | ___% | ___% |

---

## ส่วนที่ 3: ตัวชี้วัด Incident

### 3a. Incidents ตามระดับความรุนแรง

| ระดับ | จำนวน | % | Avg MTTR | SLA ผ่าน | SLA ไม่ผ่าน |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **P1** 🔴 | _____ | ___% | ___ นาที | _____ | _____ |
| **P2** 🟠 | _____ | ___% | ___ นาที | _____ | _____ |
| **P3** 🟡 | _____ | ___% | ___ ชม. | _____ | _____ |
| **P4** 🔵 | _____ | ___% | ___ ชม. | _____ | _____ |

### 3b. Incidents ตามหมวดหมู่

| รหัส | หมวดหมู่ | จำนวน | % |
|:---:|:---|:---:|:---:|
| MAL | มัลแวร์ | _____ | ___% |
| PHI | Phishing | _____ | ___% |
| UNA | การเข้าถึงผิดกฎ | _____ | ___% |
| CLD | Cloud | _____ | ___% |
| POL | ละเมิดนโยบาย | _____ | ___% |

> อ้างอิง: [Incident Classification](../05_Incident_Response/Incident_Classification.en.md)

---

## ส่วนที่ 4: Detection Coverage

### 4a. MITRE ATT&CK Coverage

| Tactic | Techniques ที่ครอบคลุม | ทั้งหมด | Coverage % |
|:---|:---:|:---:|:---:|
| Initial Access | __/__ | 9 | ___% |
| Execution | __/__ | 14 | ___% |
| Persistence | __/__ | 20 | ___% |
| Defense Evasion | __/__ | 42 | ___% |
| Credential Access | __/__ | 17 | ___% |
| Lateral Movement | __/__ | 9 | ___% |
| Exfiltration | __/__ | 9 | ___% |
| Impact | __/__ | 14 | ___% |
| **รวม** | **__/211** | **211** | **___%** |

### 4b. สุขภาพ Detection Rules

| ตัวชี้วัด | ค่า | เป้าหมาย | สถานะ |
|:---|:---:|:---:|:---:|
| Rules ทั้งหมดที่ active | _____ | — | — |
| Rules ใหม่เดือนนี้ | _____ | ≥ 5 | 🟢/🟡/🔴 |
| Rules ที่ปรับปรุง | _____ | ≥ 10% | 🟢/🟡/🔴 |
| Rules ที่ disable (FP สูง) | _____ | < 5% | 🟢/🟡/🔴 |

### 4c. สุขภาพ Log Source

| หมวด | คาดหวัง | เก็บจริง | Coverage |
|:---|:---:|:---:|:---:|
| Endpoint | _____ | _____ | ___% |
| Network | _____ | _____ | ___% |
| Cloud | _____ | _____ | ___% |
| Identity | _____ | _____ | ___% |

> อ้างอิง: [Log Source Matrix](Log_Source_Matrix.en.md)

---

## ส่วนที่ 5: ผลงานทีม

### 5a. Workload ต่อ Analyst

| Analyst | Alerts | Incidents | Avg MTTR | TP Rate |
|:---|:---:|:---:|:---:|:---:|
| ______________ | _____ | _____ | ___ นาที | ___% |
| ______________ | _____ | _____ | ___ นาที | ___% |
| **ค่าเฉลี่ยทีม** | **_____** | **_____** | **___ นาที** | **___%** |

### 5b. การฝึกอบรม

| ตัวชี้วัด | ค่า | เป้าหมาย |
|:---|:---:|:---:|
| ชม. ฝึกอบรม (ทีม) | _____ ชม. | ≥ 40 ชม./คน/ปี |
| Certification ใหม่ | _____ | ≥ 2/คน/ปี |
| Tabletop exercises | _____ | ≥ 4/ปี |

---

## ส่วนที่ 6: Automation & ประสิทธิภาพ

| ตัวชี้วัด | ค่า | เป้าหมาย | สถานะ |
|:---|:---:|:---:|:---:|
| SOAR executions | _____ | — | — |
| SOAR success rate | ___% | ≥ 95% | 🟢/🟡/🔴 |
| Alert auto-enriched | ___% | ≥ 90% | 🟢/🟡/🔴 |
| Alert auto-resolved (P4) | ___% | ≥ 30% | 🟢/🟡/🔴 |
| เวลาที่ประหยัดจาก automation | ___ ชม. | ≥ 40 ชม./เดือน | 🟢/🟡/🔴 |

> อ้างอิง: [SOC Automation Catalog](SOC_Automation_Catalog.en.md)

---

## ส่วนที่ 7: ความเสี่ยง & Compliance

| ตัวชี้วัด | ค่า | เป้าหมาย | สถานะ |
|:---|:---:|:---:|:---:|
| Vulnerability patches ค้าง (critical) | _____ | 0 | 🟢/🟡/🔴 |
| การแจ้งหน่วยงานกำกับตรงเวลา | ___% | 100% | 🟢/🟡/🔴 |
| PDPA breach notification < 72 ชม. | ___% | 100% | 🟢/🟡/🔴 |
| Audit findings ที่ยังเปิด | _____ | 0 | 🟢/🟡/🔴 |

---

## ส่วนที่ 8: สรุปเชิงบรรยายสำหรับผู้บริหาร

### จุดเด่นประจำเดือน
1. _____________________________________________________
2. _____________________________________________________

### เหตุการณ์สำคัญ
| วันที่ | สรุป | ระดับ | MTTR | สถานะ |
|:---|:---|:---:|:---:|:---:|
| _____ | _______________________________________ | P__ | ___ | ปิด/เปิด |

### ข้อกังวลและความเสี่ยง
1. _____________________________________________________

### คำขอทรัพยากร
| คำขอ | เหตุผล | ลำดับ | งบประมาณ |
|:---|:---|:---:|:---:|
| ______________ | _______________________________ | P_ | $_____ |

### แผนงานเดือนหน้า
1. _____________________________________________________
2. _____________________________________________________

---

## เทมเพลต Dashboard Layout

### Panel 1: สรุปภาพรวม (Executive Summary)

| ตัวชี้วัด | ค่า | เทรนด์ | เป้าหมาย |
|:---|:---:|:---:|:---:|
| Total Incidents (เดือนนี้) | [XX] | ↑/↓ | < [XX] |
| MTTD (เฉลี่ย) | [XX] นาที | ↑/↓ | ≤ 60 นาที |
| MTTR (เฉลี่ย) | [XX] นาที | ↑/↓ | ≤ 240 นาที |
| False Positive Rate | [XX]% | ↑/↓ | < 10% |
| SLA Compliance | [XX]% | ↑/↓ | ≥ 95% |

### Panel 2: ประสิทธิภาพ Detection

| หมวด | จำนวน Rules | Triggered/เดือน | FP Rate |
|:---|:---:|:---:|:---:|
| Network | [XX] | [XX] | [XX]% |
| Endpoint | [XX] | [XX] | [XX]% |
| Identity | [XX] | [XX] | [XX]% |
| Cloud | [XX] | [XX] | [XX]% |
| Email | [XX] | [XX] | [XX]% |

### Panel 3: MITRE ATT&CK Coverage Heat Map

| Tactic | ครอบคลุม | ช่องว่าง | ลำดับ |
|:---|:---:|:---:|:---:|
| Initial Access | [XX]% | [XX] techniques | 🔴/🟡/🟢 |
| Execution | [XX]% | [XX] techniques | 🔴/🟡/🟢 |
| Persistence | [XX]% | [XX] techniques | 🔴/🟡/🟢 |
| Privilege Escalation | [XX]% | [XX] techniques | 🔴/🟡/🟢 |
| Defense Evasion | [XX]% | [XX] techniques | 🔴/🟡/🟢 |
| Lateral Movement | [XX]% | [XX] techniques | 🔴/🟡/🟢 |
| Collection | [XX]% | [XX] techniques | 🔴/🟡/🟢 |
| Exfiltration | [XX]% | [XX] techniques | 🔴/🟡/🟢 |
| Impact | [XX]% | [XX] techniques | 🔴/🟡/🟢 |

### Panel 4: Team Performance

| นักวิเคราะห์ | Alerts Triaged | Avg Triage Time | Escalation Rate | Quality Score |
|:---|:---:|:---:|:---:|:---:|
| [Analyst 1] | [XX] | [XX] นาที | [XX]% | [X]/5 |
| [Analyst 2] | [XX] | [XX] นาที | [XX]% | [X]/5 |
| [Analyst 3] | [XX] | [XX] นาที | [XX]% | [X]/5 |

### Panel 5: Trend Analysis (รายเดือน)

| เดือน | Incidents | Alerts | FP Rate | MTTD | MTTR |
|:---|:---:|:---:|:---:|:---:|:---:|
| [M-3] | [XX] | [XX] | [XX]% | [XX]m | [XX]m |
| [M-2] | [XX] | [XX] | [XX]% | [XX]m | [XX]m |
| [M-1] | [XX] | [XX] | [XX]% | [XX]m | [XX]m |
| ปัจจุบัน | [XX] | [XX] | [XX]% | [XX]m | [XX]m |

## Dashboard Design Best Practices

### Color Coding Standards

| สี | ความหมาย | ใช้สำหรับ |
|:---|:---|:---|
| 🟢 เขียว | ปกติ / บรรลุเป้า | KPI ที่ผ่านเกณฑ์ |
| 🟡 เหลือง | เตือน / ใกล้เกณฑ์ | ต้องติดตาม |
| 🔴 แดง | วิกฤต / เกินเกณฑ์ | ต้องดำเนินการทันที |
| 🔵 น้ำเงิน | ข้อมูลอ้างอิง | Baseline / trend |

### Dashboard Layout Template

```
┌─────────────────────────────────────────────────────┐
│  SOC Executive Dashboard              [Date Range ▼]│
├──────────┬──────────┬──────────┬────────────────────┤
│ MTTR     │ MTTD     │ Alerts   │ Open Incidents     │
│ 12 min ↓ │ 8 min ↓  │ 1,247 ↑  │ 23 ↓              │
├──────────┴──────────┴──────────┴────────────────────┤
│  [Alert Trend Chart - 30 days]                      │
├─────────────────────┬───────────────────────────────┤
│  Top Alert Sources  │  Incident by Severity         │
│  1. Firewall  45%   │  Critical: 3                  │
│  2. EDR       30%   │  High: 8                      │
│  3. IDS       15%   │  Medium: 12                   │
│  4. Other     10%   │  Low: 45                      │
└─────────────────────┴───────────────────────────────┘
```

### Refresh Rate Guidelines

| ประเภท Dashboard | Refresh Rate | เหตุผล |
|:---|:---|:---|
| Real-time Operations | 30 วินาที | Alert monitoring |
| Daily Summary | 15 นาที | Shift awareness |
| Weekly Executive | 1 ชั่วโมง | Trend analysis |
| Monthly Report | Manual | Deep analysis |

## เอกสารที่เกี่ยวข้อง

-   [SOC Metrics & KPIs](SOC_Metrics.en.md) — นิยาม KPI และสูตรคำนวณ
-   [Log Source Matrix](Log_Source_Matrix.en.md) — ครอบคลุมแหล่งข้อมูล
-   [SOC Automation Catalog](SOC_Automation_Catalog.en.md) — Automation maturity
-   [Incident Classification](../05_Incident_Response/Incident_Classification.en.md) — อนุกรมวิธาน
-   [SLA Template](SLA_Template.en.md) — นิยาม SLA
