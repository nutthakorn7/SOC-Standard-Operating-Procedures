# Playbook: แอดมินกระทำผิด / Insider Admin

**ID**: PB-15
**ระดับความรุนแรง**: วิกฤต | **หมวดหมู่**: ภัยคุกคามจากภายใน
**MITRE ATT&CK**: [T1078.002](https://attack.mitre.org/techniques/T1078/002/) (บัญชีโดเมน), [T1098](https://attack.mitre.org/techniques/T1098/) (การจัดการบัญชี)
**ทริกเกอร์**: PAM alert, AD audit anomaly, whistleblower report, UEBA, SOD violation


## หลังเหตุการณ์ (Post-Incident)

- [ ] ทบทวน admin accounts ทั้งหมดและลบสิทธิ์ที่ไม่จำเป็น
- [ ] ใช้ PIM/PAM สำหรับ admin access ทั้งหมด
- [ ] เปิด command-line logging สำหรับ admin sessions
- [ ] ทบทวน separation of duties policies
- [ ] ทำ access recertification สำหรับ privileged accounts
- [ ] จัดทำ [Incident Report](../../11_Reporting_Templates/incident_report.th.md)

### ผังตัวบ่งชี้พฤติกรรม

```mermaid
graph TD
    Monitor["👁️ UEBA/PAM"] --> A["🕐 เข้าถึงนอกเวลา"]
    Monitor --> B["📋 bypass Change Mgmt"]
    Monitor --> C["🔑 สร้าง backdoor account"]
    Monitor --> D["🗑️ ลบ audit logs"]
    Monitor --> E["📤 export ข้อมูล"]
    A --> Score["⚠️ Risk Score สูง"]
    B --> Score
    C --> Score
    D --> Score
    E --> Score
    Score --> SOC["🚨 Alert SOC"]
```

### ผัง Covert Investigation

```mermaid
sequenceDiagram
    participant SOC
    participant Legal
    participant HR
    participant Forensics
    SOC->>Legal: ปรึกษาก่อนดำเนินการ
    Legal-->>SOC: อนุมัติ covert investigation
    SOC->>Forensics: เก็บหลักฐาน (shadow copies)
    SOC->>SOC: เพิ่ม monitoring (ไม่แจ้ง target)
    Forensics-->>SOC: หลักฐานครบ
    SOC->>HR: ส่งรายงาน + หลักฐาน
```

---

## ผังการตัดสินใจ

```mermaid
graph TD
    Alert["🚨 พฤติกรรม Admin ผิดปกติ"] --> Type{"🔍 ประเภท?"}
    Type -->|เข้าถึงข้อมูลไม่จำเป็น| Data["📊 Data Access Anomaly"]
    Type -->|สร้างบัญชี/สิทธิ์ลับ| Account["👤 สร้าง Backdoor Account"]
    Type -->|ลบ/เปลี่ยน logs| Cover["🗑️ ปกปิดร่องรอย"]
    Type -->|เปลี่ยน security config| Config["⚙️ Security Config Tampering"]
    Data --> Covert["🤫 สอบสวนลับ"]
    Account --> Covert
    Cover --> Covert
    Config --> Overt["🔒 ตอบสนองทันที"]
    Covert --> Evidence["📋 รวบรวมหลักฐาน"]
    Evidence --> Action["⚖️ ดำเนินการร่วม HR/Legal"]
```

---

## 1. การวิเคราะห์

### 1.1 ตัวบ่งชี้พฤติกรรม

| ตัวบ่งชี้ | ความเสี่ยง | การตรวจจับ |
|:---|:---|:---|
| เข้าถึงข้อมูลนอกขอบเขตหน้าที่ | 🔴 สูง | UEBA / DLP |
| สร้างบัญชีหรือ service account ลับ | 🔴 สูง | AD audit |
| เพิ่มสิทธิ์ให้ตัวเองหรือผู้อื่นโดยไม่ได้รับอนุมัติ | 🔴 สูง | IAM audit |
| ลบหรือแก้ไข logs | 🔴 วิกฤต | SIEM integrity |
| ปิดการ monitoring / เปลี่ยน security config | 🔴 วิกฤต | Change management |
| ส่งออกข้อมูลจำนวนมาก | 🔴 สูง | DLP / Netflow |
| เข้าถึงนอกเวลาทำงานบ่อยๆ | 🟡 ปานกลาง | SIEM |

### 1.2 รายการตรวจสอบ (ดำเนินการอย่างลับ)

| รายการ | วิธีตรวจสอบ | เสร็จ |
|:---|:---|:---:|
| ระบุบัญชี admin ที่เกี่ยวข้อง | SIEM / AD audit | ☐ |
| กิจกรรมที่ผิดปกติคืออะไร? | UEBA / Logs | ☐ |
| มีบัญชีลับถูกสร้างหรือไม่? | AD / IAM audit | ☐ |
| มีสิทธิ์ถูกเปลี่ยนแปลงหรือไม่? | IAM / RBAC audit | ☐ |
| มีข้อมูลถูกส่งออกหรือไม่? | DLP / Netflow | ☐ |
| มี logs ถูกลบหรือแก้ไขหรือไม่? | SIEM log integrity | ☐ |
| ประวัติด้านวินัยหรือ HR? | HR consultation | ☐ |
| กำลังลาออก (notice period)? | HR | ☐ |

> ⚠️ **สำคัญ**: ห้ามแจ้งผู้ต้องสงสัยจนกว่าจะรวบรวมหลักฐานเสร็จและหารือกับ HR/Legal แล้ว

---

## 2. การควบคุม

### 2.1 การสอบสวนลับ (พบ: เข้าถึงข้อมูล / ส่งออก)

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | เพิ่ม monitoring ลับบนบัญชี admin | ☐ |
| 2 | บันทึก session recordings (หากมี PAM) | ☐ |
| 3 | สำรอง forensic image ของเครื่องที่ใช้ | ☐ |
| 4 | แจ้ง HR + Legal อย่างลับๆ | ☐ |
| 5 | ตรวจสอบ second admin/peer review บัญชี | ☐ |

### 2.2 การตอบสนองทันที (พบ: ลบ logs / เปลี่ยน security / backdoor)

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | **ปิดบัญชี admin** ทันที | ☐ |
| 2 | **ลบ** backdoor accounts / service accounts ที่สร้าง | ☐ |
| 3 | **คืนค่า** security configurations | ☐ |
| 4 | **ทบทวน** syslog forwarding / SIEM integrity | ☐ |
| 5 | **สำรอง forensic image** | ☐ |

---

## 3. การกำจัด

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | ลบบัญชี/สิทธิ์ที่ไม่ได้รับอนุมัติทั้งหมด | ☐ |
| 2 | คืนค่า configurations ที่ถูกเปลี่ยน | ☐ |
| 3 | หมุนเวียน credentials ที่ admin เข้าถึงได้ | ☐ |
| 4 | ตรวจสอบว่ามี persistence mechanisms อื่นหรือไม่ | ☐ |

---

## 4. การฟื้นฟู

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | ใช้ PAM (Privileged Access Management) สำหรับบัญชี admin ทั้งหมด | ☐ |
| 2 | บังคับ admin MFA + session recording | ☐ |
| 3 | ใช้ JIT (Just-In-Time) admin access | ☐ |
| 4 | ใช้ dual-approval สำหรับ security-critical changes | ☐ |
| 5 | ตรวจสอบสิทธิ์ admin ทุกไตรมาส | ☐ |

---

## 5. เกณฑ์การยกระดับ

| เงื่อนไข | ยกระดับไปยัง |
|:---|:---|
| ข้อมูลลูกค้าถูกส่งออก | Legal + DPO (PDPA 72 ชม.) |
| Logs ถูกลบ/แก้ไข | CISO ทันที |
| Backdoor account สร้างขึ้น | CISO + IT Director |
| ทำร่วมกับบุคคลภายนอก | Law Enforcement |
| Domain Admin / Root ถูกใช้ในทางที่ผิด | Major Incident |

---

### ผัง Admin Access Control

```mermaid
graph TD
    Admin["👑 Admin Access"] --> PIM["🔑 PIM: JIT activation"]
    Admin --> MFA["📱 MFA enforced"]
    Admin --> PAW["💻 PAW: dedicated device"]
    Admin --> Log["📋 Audit every action"]
    PIM --> Review["👁️ Monthly review"]
    MFA --> Review
    PAW --> Review
    style Admin fill:#e74c3c,color:#fff
    style PIM fill:#27ae60,color:#fff
```

### ผัง Evidence Preservation

```mermaid
sequenceDiagram
    participant SOC
    participant Legal
    participant Forensics
    participant HR
    SOC->>Legal: 🔒 Request legal hold
    Legal-->>SOC: ✅ Approved
    SOC->>Forensics: Preserve logs + screenshots
    Forensics->>Forensics: Chain of custody
    Forensics-->>SOC: 📋 Evidence package
    SOC->>HR: ส่งหลักฐาน
    Note over SOC: ⚠️ ห้ามให้ suspect ลบข้อมูล!
```

## กฎตรวจจับ (Sigma)

| กฎ | ไฟล์ |
|:---|:---|
| User Added to Domain Admins | [win_domain_admin_group_add.yml](../../08_Detection_Engineering/sigma_rules/win_domain_admin_group_add.yml) |
| New Local User Created | [win_new_user_created.yml](../../08_Detection_Engineering/sigma_rules/win_new_user_created.yml) |
| Windows Security Log Cleared | [win_security_log_cleared.yml](../../08_Detection_Engineering/sigma_rules/win_security_log_cleared.yml) |

## เอกสารที่เกี่ยวข้อง

- [กรอบการตอบสนองต่อเหตุการณ์](../Framework.th.md)
- [แม่แบบรายงานเหตุการณ์](../../11_Reporting_Templates/incident_report.th.md)
- [PB-14 ภัยคุกคามจากภายใน](Insider_Threat.th.md)
- [PB-15 การลบ Log](Log_Clearing.th.md)

## Rogue Admin Detection Indicators

| Indicator | Detection | Risk |
|:---|:---|:---|
| Off-hours admin action | Time-based alerting | High |
| Unauthorized config change | Change management diff | High |
| Security control disable | SIEM watchlist | Critical |
| Bulk data access | UEBA volume anomaly | Critical |
| Account creation/modification | AD audit logs | Medium |

### Investigation Steps (Sensitive)

| Step | Action | Precaution |
|:---|:---|:---|
| 1 | Review all admin actions (30d) | Query by SOC manager only |
| 2 | Compare approved vs actual changes | Cross-ref with CAB records |
| 3 | Capture forensic evidence | Legal hold if needed |
| 4 | Coordinate HR + Legal | In-person only |

## References

- [MITRE ATT&CK T1078 — Valid Accounts](https://attack.mitre.org/techniques/T1078/)
- [NIST SP 800-53 — AC-6 Least Privilege](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
