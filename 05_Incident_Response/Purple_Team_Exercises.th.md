# คู่มือการซ้อม Purple Team

> **รหัสเอกสาร:** PTX-001  
> **เวอร์ชัน:** 1.0  
> **อัปเดตล่าสุด:** 2026-02-15  
> **เจ้าของ:** Detection Engineering / SOC Manager

---

## วัตถุประสงค์

ทดสอบว่า detection rules และ playbooks ทำงานจริง โดยจำลองเทคนิคโจมตีจริงในสภาพแวดล้อมที่ควบคุม Purple team = Red Team (โจมตี) + Blue Team (ตรวจจับ)

---

## วิธีทำงาน

```
Red Team ลงมือ → SOC ควรตรวจพบ → ตรวจว่า alert มา → แก้ไขถ้าไม่มา
```

---

## แบบฝึกหัด

### 🟢 เริ่มต้น

#### EX-01: คลิก Phishing Link (T1204)
- จำลองส่ง phishing → ตรวจว่า email gateway block ไหม
- **ผ่าน**: Email ถูกจับ + URL ถูก block + Alert ใน 5 นาที

#### EX-02: Brute Force Login (T1110)
- สร้าง 50 failed logins ใน 5 นาที
- **ผ่าน**: SIEM alert สำหรับ >10 failures

#### EX-03: PowerShell เข้ารหัส (T1059.001)
- รัน encoded PowerShell (ไม่อันตราย)
- **ผ่าน**: EDR + SIEM จับได้

### 🟡 ปานกลาง

#### EX-04: Lateral Movement SMB (T1021.002)
- เข้าถึง admin share ข้ามเครื่อง
- **ผ่าน**: Event 5140/5145 + SIEM alert

#### EX-05: DNS Tunneling (T1048.003)
- สร้าง DNS query ปริมาณมาก + subdomain ยาว
- **ผ่าน**: ตรวจพบ pattern ผิดปกติ

#### EX-06: Shadow Copy Deletion (T1490)
- ตรวจจับ vssadmin execution (สัญญาณ ransomware)
- **ผ่าน**: EDR alert = High/Critical

### 🔴 ขั้นสูง

#### EX-07: MFA Bypass / AiTM (T1556.006)
- จำลอง session token theft (ในแล็บ)
- **ผ่าน**: Azure AD risk detection + session revoke <15 นาที

#### EX-08: Cloud Privilege Escalation (T1078.004)
- สร้าง IAM user + ให้ admin policy (test account)
- **ผ่าน**: CloudTrail → SIEM alert <30 นาที

#### EX-09: C2 Beaconing (T1071.001)
- จำลอง periodic callback ทุก 60 วินาที
- **ผ่าน**: Network monitoring จับ pattern

---

## ตารางบันทึกผล

| แบบฝึก | Technique | ตรวจพบ? | เวลา | Alert ถูก? | แก้ไข |
|:---|:---|:---:|:---:|:---:|:---|
| EX-01 | T1204 | ✅/❌ | __ นาที | ✅/❌ | [tune/สร้าง/OK] |
| EX-02 | T1110 | ✅/❌ | __ นาที | ✅/❌ | [tune/สร้าง/OK] |
| ... | ... | ... | ... | ... | ... |

---

## ⚠️ กฎความปลอดภัย

1. **ห้ามรันบน production** โดยไม่มีอนุมัติเป็นลายลักษณ์อักษร
2. **ใช้สภาพแวดล้อมทดสอบ** (VM, lab, test cloud account)
3. **แจ้ง SOC** ว่ากำลังซ้อม (หรือทดสอบแบบ blind)
4. **มี kill switch** — หยุดได้ทันทีถ้ามีปัญหา
5. **บันทึกทุกอย่าง** — timestamp ทุกการกระทำ

---

## เครื่องมือแนะนำ

| เครื่องมือ | ใช้ทำอะไร |
|:---|:---|
| Atomic Red Team | ชุดทดสอบ MITRE ATT&CK สำเร็จรูป |
| Caldera (MITRE) | จำลองผู้โจมตีอัตโนมัติ |
| Stratus Red Team | จำลองโจมตี Cloud |
| GoPhish | จำลอง Phishing |

---

## ปฏิทิน

| ความถี่ | แบบฝึก | Coverage |
|:---:|:---|:---|
| รายเดือน | 2 แบบเริ่มต้น | Core detections |
| รายไตรมาส | 2 แบบปานกลาง | Advanced detections |
| ทุก 6 เดือน | 1 แบบขั้นสูง | Full kill-chain |
| ประจำปี | Full purple team | End-to-end |

---

## ระดับความซับซ้อนของ Exercise

| ระดับ | ลักษณะ | ระยะเวลา | เหมาะกับ |
|:---|:---|:---|:---|
| **Beginner** | Atomic tests, single technique | 1–2 ชม. | SOC ใหม่ |
| **Intermediate** | Multi-step attack chain | 4–8 ชม. | SOC ที่มี playbooks |
| **Advanced** | Full kill chain simulation | 1–3 วัน | SOC ที่ mature |
| **Expert** | Red team engagement + debrief | 1–2 สัปดาห์ | SOC ระดับ 4-5 |

## ตัวอย่าง Exercise Scenarios

### Scenario 1: Phishing → Credential Theft → Lateral Movement

| ขั้นตอน | Red Team Action | Expected Detection |
|:---|:---|:---|
| 1 | ส่ง phishing email + malicious link | Email gateway alert |
| 2 | Harvest credentials (fake login page) | Impossible travel detection |
| 3 | Login ด้วย stolen credentials | Anomalous logon alert |
| 4 | Enumerate AD (BloodHound) | LDAP query spike |
| 5 | Lateral movement (PsExec) | Process creation alert |
| 6 | Data staging + exfiltration | DLP / network anomaly |

### Scenario 2: Supply Chain Attack

| ขั้นตอน | Red Team Action | Expected Detection |
|:---|:---|:---|
| 1 | Compromise update server | Code signing anomaly |
| 2 | Deploy backdoored update | File hash mismatch |
| 3 | C2 beacon (DNS tunneling) | DNS anomaly detection |
| 4 | Privilege escalation | UAC bypass / token theft |

## เทมเพลตรายงานผล

| ส่วน | เนื้อหา |
|:---|:---|
| **สรุป Executive** | ผลรวม, จำนวน techniques ที่ตรวจจับได้ |
| **รายละเอียด Technique** | ตาราง technique vs detection status |
| **Gap Analysis** | Techniques ที่ไม่มี detection |
| **คำแนะนำ** | สิ่งที่ต้องปรับปรุง จัดลำดับตาม risk |
| **แผนแก้ไข** | Action items + owner + deadline |

## ตัวชี้วัดความสำเร็จ

| ตัวชี้วัด | เป้าหมาย |
|:---|:---|
| Detection Rate | ≥ 80% ของ techniques ที่ทดสอบ |
| MTTD (ระหว่าง exercise) | ≤ 30 นาที |
| Playbook Accuracy | ≥ 90% ทำตาม playbook ได้ถูกต้อง |
| Gap Remediation (30 วัน) | ≥ 70% ของ gaps ถูกแก้ไข |

## เครื่องมือ Purple Team

| เครื่องมือ | ประเภท | ใช้สำหรับ | ราคา |
|:---|:---|:---|:---|
| **Atomic Red Team** | Open-source | ทดสอบ techniques เดี่ยว | ฟรี |
| **MITRE Caldera** | Open-source | Automated adversary emulation | ฟรี |
| **Infection Monkey** | Open-source | Network propagation testing | ฟรี |
| **SafeBreach** | Commercial | Continuous BAS | $$$  |
| **AttackIQ** | Commercial | Automated BAS platform | $$$ |

## ตัวอย่าง Atomic Test Commands

### T1059.001 — PowerShell Execution

```powershell
# ทดสอบ: PowerShell execution policy bypass
powershell.exe -ExecutionPolicy Bypass -Command "Write-Host 'Test'"

# Expected Detection: Sysmon Event ID 1 + PowerShell logging
# Expected Alert: Suspicious PowerShell execution
```

### T1053.005 — Scheduled Task

```powershell
# ทดสอบ: สร้าง scheduled task
schtasks /create /tn "PurpleTest" /tr "calc.exe" /sc once /st 23:59

# Cleanup:
schtasks /delete /tn "PurpleTest" /f
```

### T1078 — Valid Accounts (Brute Force)

```bash
# ทดสอบ: SSH brute force (ใน lab เท่านั้น!)
hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://target_ip

# Expected Detection: Multiple failed auth → account lockout alert
```

## กำหนดการ Purple Team ประจำปี

| ไตรมาส | Focus Area | Techniques | ระดับ |
|:---|:---|:---|:---:|
| **Q1** | Initial Access + Execution | T1566, T1059 | Intermediate |
| **Q2** | Persistence + Priv Esc | T1053, T1548 | Intermediate |
| **Q3** | Lateral Movement + Collection | T1021, T1005 | Advanced |
| **Q4** | Full Kill Chain Simulation | End-to-end | Advanced |

## Exercise Execution Checklist

### Pre-Exercise (สัปดาห์ก่อน)
- [ ] กำหนด scope และ Rules of Engagement
- [ ] เตรียม attack scenarios (ATT&CK mapping)
- [ ] แจ้ง stakeholders ที่เกี่ยวข้อง
- [ ] Setup monitoring และ logging
- [ ] Backup ระบบที่เกี่ยวข้อง

### During Exercise
- [ ] Red Team: execute attacks ตาม playbook
- [ ] Blue Team: detect และ respond แบบ real-time
- [ ] White Team: ควบคุมและบันทึกผลลัพธ์
- [ ] Log ทุก action พร้อม timestamp

### Post-Exercise
- [ ] Debrief ร่วม Red + Blue Team
- [ ] Gap analysis: จุดที่ detect ไม่ได้
- [ ] สร้าง detection rules ใหม่
- [ ] อัปเดต playbooks จากบทเรียน

### Detection Gap Tracking

| Attack Technique | MITRE ID | Detected? | Gap Action |
|:---|:---|:---|:---|
| Spearphishing | T1566.001 | ✅ ตรวจจับได้ | - |
| PowerShell execution | T1059.001 | ⚠️ บางส่วน | เพิ่ม rule |
| Lateral Movement | T1021 | ❌ ไม่พบ | สร้าง use case |
| Data Staging | T1074 | ❌ ไม่พบ | เพิ่ม DLP rule |
| Exfiltration | T1048 | ✅ ตรวจจับได้ | - |

### Resource Allocation

| Resource | Red Team | Blue Team | White Team |
|:---|:---|:---|:---|
| Personnel | 2-3 คน | 3-5 คน | 1-2 คน |
| Duration | 2-4 สัปดาห์ | ตลอด exercise | ตลอด exercise |
| Tools | Metasploit, Cobalt | SIEM, EDR | Reporting |

### Exercise Deconfliction

| เวลา | Activity | Owner |
|:---|:---|:---|
| T-7 days | Notify stakeholders | White Team |
| T-1 day | Verify safeguards | Red + White |
| T+0 | Execute | Red |
| T+1 day | Initial debrief | All |
| T+5 days | Final report | White Team |

### ROI Measurement

| Metric | Before | After | Improvement |
|:---|:---|:---|:---|
| Detection rate | 40% | 75% | +35% |
| MTTD | 48 hrs | 4 hrs | -92% |
| Rules created | 0 | 15 | +15 new |

### Detection Improvement Targets

| Area | Before | Target |
|:---|:---|:---|
| Detection rate | 40% | 80% |
| Mean time to detect | 48h | 4h |
| Coverage (ATT&CK) | 30% | 60% |

## เอกสารที่เกี่ยวข้อง

- [สถานการณ์จำลอง](Tabletop_Exercises.th.md)
- [ดัชนี Detection Rules](../07_Detection_Rules/README.th.md)
- [แผนที่ MITRE ATT&CK](../tools/mitre_attack_heatmap.html)
