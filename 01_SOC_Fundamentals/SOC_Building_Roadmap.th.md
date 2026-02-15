# แผนงานสร้าง SOC จากศูนย์

> **รหัสเอกสาร:** SOC-BUILD-001  
> **เวอร์ชัน:** 1.0  
> **อัปเดตล่าสุด:** 2026-02-15  
> **กลุ่มเป้าหมาย:** IT Manager, CISO, ผู้บริหารที่ต้องการสร้าง SOC ใหม่

---

## เอกสารนี้สำหรับใคร?

คุณ **ยังไม่มี SOC** วันนี้ อาจมีทีม IT เล็กๆ ที่ดูแลความปลอดภัย "เมื่อมีอะไรเกิดขึ้น" คู่มือนี้จะพาคุณสร้าง SOC ตั้งแต่ไม่มีอะไรเลย — ทีละขั้น ทีละ Phase

---

## 4 เฟส

```
เฟส 1 (เดือน 1-3)      เฟส 2 (เดือน 4-6)      เฟส 3 (เดือน 7-12)     เฟส 4 (ปีที่ 2+)
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  วางรากฐาน    │──▶│  ตรวจจับ      │──▶│  ปฏิบัติการ    │──▶│  พัฒนาต่อ     │
│              │   │              │   │              │   │              │
│ • ซื้อเครื่องมือ│   │ • เพิ่ม Log   │   │ • Playbooks  │   │ • Automation │
│ • จ้างคน     │   │ • Rules แรก  │   │ • IR process │   │ • Threat hunt│
│ • ติดตั้งพื้นฐาน│   │ • SOP พื้นฐาน │   │ • ซ้อม        │   │ • SOAR       │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
```

---

## เฟส 1: วางรากฐาน (เดือน 1–3)

### 1.1 ตอบคำถามพื้นฐาน

| คำถาม | ทำไมสำคัญ |
|:---|:---|
| ปกป้องอะไร? | กำหนดขอบเขต |
| ความเสี่ยงใหญ่สุดคืออะไร? | จัดลำดับว่า detect อะไรก่อน |
| กฎหมายอะไรเกี่ยวข้อง? | PDPA, ISO, PCI |
| งบเท่าไหร่? | กำหนด build vs buy vs outsource |

### 1.2 เลือกโมเดล

| โมเดล | ทีม | งบ/ปี | เหมาะกับ |
|:---|:---:|:---:|:---|
| 🟢 **Hybrid MSSP** | 1–2 คน + MSSP | ฿1.5–3M | องค์กรเล็ก <500 คน |
| 🟡 **In-house เล็ก** | 3–5 คน | ฿5–10M | กลาง 500–2000 คน |
| 🔴 **Full In-house** | 8–15+ คน | ฿15–30M+ | ใหญ่ 2000+ คน |

> **แนะนำ**: เริ่มจาก **Hybrid MSSP** — outsource 24/7 monitoring เก็บ 1–2 คนไว้ดูแล escalation

### 1.3 เลือกเครื่องมือ

#### SIEM — เครื่องมือ #1

| SIEM | ค่าใช้จ่าย | เหมาะกับ |
|:---|:---|:---|
| **Wazuh** | ฟรี (open-source) | งบจำกัด, เรียนรู้ |
| **Elastic Security** | Free tier | ยืดหยุ่น, scale ได้ |
| **Microsoft Sentinel** | จ่ายตาม GB | ใช้ Azure/M365 |
| **Splunk** | แพง | Enterprise |

> **แนะนำ**: **Wazuh** (ฟรี, รวม SIEM + EDR + Compliance)

### 1.4 จ้างทีมแรก

| ตำแหน่ง | จำนวน | เงินเดือน (ไทย) |
|:---|:---:|:---|
| SOC Lead | 1 | ฿80–150K/เดือน |
| SOC Analyst | 1–2 | ฿30–60K/เดือน |

---

## เฟส 2: ตรวจจับ (เดือน 4–6)

### เพิ่ม Log Source ตามลำดับ

| สัปดาห์ | Log Source | ทำไมก่อน |
|:---:|:---|:---|
| 1 | Active Directory | เป้าโจมตี #1 |
| 2 | Firewall | เห็น traffic |
| 3 | EDR | malware, process |
| 4 | Email gateway | phishing #1 |
| 5–6 | Cloud (AWS/Azure) | misconfig |
| 7–8 | DNS + Proxy | C2, shadow IT |

### Deploy 10 Sigma Rules แรก

เริ่มจาก `win_multiple_failed_logins`, `proc_office_spawn_powershell`, `cloud_unusual_login` + อ่าน [Tier 1 Runbook](../05_Incident_Response/Tier1_Runbook.th.md)

---

## เฟส 3: ปฏิบัติการ (เดือน 7–12)

- Deploy playbooks ทั้ง 30 ชุด (ค่อยๆ ทำเป็น wave)
- ซ้อม [Tabletop Exercise](../05_Incident_Response/Tabletop_Exercises.th.md) ครั้งแรก
- เริ่มวัด metrics: MTTD < 4 ชม., MTTR < 8 ชม.

---

## เฟส 4: พัฒนา (ปีที่ 2+)

- Threat Hunting, SOAR Automation, Purple Teaming
- สอบ SOC Maturity — ใช้ [เครื่องมือวัดคะแนน](../tools/soc_maturity_scorer.html)
- Compliance audit — ใช้ [Compliance Mapping](../10_Compliance/Compliance_Mapping.th.md)

---

## งบประมาณ

| แบบ | งบปีแรก | หมายเหตุ |
|:---|:---:|:---|
| 🟢 Budget (Open-Source) | ฿1.6–3.3M | Wazuh + 2 คน |
| 🟡 Mid-Range | ฿5.8–12.5M | Elastic/Sentinel + 4 คน + MSSP |
| 🔴 Enterprise | ฿18–47M | Splunk + 10+ คน + 24/7 |

---

## เส้นทางฝึก Analyst

### เดือน 1–3 (มือใหม่)
| สัปดาห์ | เรียนอะไร | แหล่ง |
|:---:|:---|:---|
| 1–2 | พื้นฐาน Network | CompTIA Network+ / YouTube |
| 3–4 | Linux & Windows | TryHackMe "Pre-Security" |
| 5–6 | Security พื้นฐาน | CompTIA Security+ |
| 7–10 | SIEM + Log Analysis | TryHackMe "SOC Level 1" |
| 11–12 | IR พื้นฐาน | Repository นี้ |

### Cert แนะนำ
```
เริ่มต้น → Security+ / SC-900 (~฿10K)
กลาง   → CySA+ / BTL1 (~฿15–30K)
สูง     → SANS GCIH / GCFA (~฿100–200K)
```

---

## Quick Start 30 วัน

```
สัปดาห์ 1: อ่านคู่มือนี้ + เขียน SOC mission + ขออนุมัติงบ
สัปดาห์ 2: ติดตั้ง SIEM + deploy agent 5 เครื่อง + เชื่อม AD
สัปดาห์ 3: Import 10 Sigma rules + ทดสอบ alert แรก
สัปดาห์ 4: พิมพ์ Severity Matrix + มอบหมายคนดู alert + handle alert แรก
```

---

## ข้อผิดพลาดที่พบบ่อย

| ❌ อย่าทำ | ✅ ทำแทน |
|:---|:---|
| ซื้อ SIEM แพงก่อนจ้างคน | จ้างคนก่อน แล้วเลือกเครื่องมือด้วยกัน |
| พยายาม monitor ทุกอย่างวันแรก | เริ่มจาก 5 log sources |
| ไม่มี playbook | ใช้ playbook จาก repo นี้ตั้งแต่วันแรก |
| Alert ดังทั้งวัน (alert fatigue) | เริ่ม 10 rules, tune, แล้วค่อยเพิ่ม |
| 24/7 ด้วย 2 คน (burnout) | ใช้ MSSP ดูนอกเวลา |

---

## เอกสารที่เกี่ยวข้อง

- [กรอบ IR](../05_Incident_Response/Framework.th.md)
- [ตารางความรุนแรง](../05_Incident_Response/Severity_Matrix.th.md)
- [คู่มือ Tier 1](../05_Incident_Response/Tier1_Runbook.th.md)
- [โครงสร้างทีม SOC](../06_Operations_Management/SOC_Team_Structure.th.md)
- [เครื่องมือวัด Maturity](../tools/soc_maturity_scorer.html)
