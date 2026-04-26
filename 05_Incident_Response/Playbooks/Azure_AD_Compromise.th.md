# Playbook: Azure AD / Entra ID Compromise

**ID**: PB-23
**ระดับความรุนแรง**: สูง/วิกฤต | **หมวดหมู่**: Identity & Access
**MITRE ATT&CK**: [T1098](https://attack.mitre.org/techniques/T1098/) (Account Manipulation), [T1556](https://attack.mitre.org/techniques/T1556/) (Modify Authentication Process)
**ทริกเกอร์**: Identity Protection risk alert, Conditional Access failure, Unified Audit Log anomaly, Sentinel alert


## หลังเหตุการณ์ (Post-Incident)

- [ ] ตรวจสอบ Entra ID Conditional Access policies
- [ ] ใช้ Phishing-resistant MFA (FIDO2/passkeys)
- [ ] ทบทวน PIM role assignments
- [ ] เปิด Identity Protection risk policies
- [ ] ตรวจ service principal credentials ทั้งหมด
- [ ] จัดทำ [Incident Report](../../11_Reporting_Templates/incident_report.th.md)

### ผัง Identity Protection Pipeline

```mermaid
graph LR
    SignIn["🔑 Sign-in"] --> ML["🤖 ML Engine"]
    ML --> Risk{"⚠️ Risk Level?"}
    Risk -->|Low| Allow["✅ Allow"]
    Risk -->|Medium| MFA["🔐 Require MFA"]
    Risk -->|High| Block["❌ Block + Alert SOC"]
    style SignIn fill:#3498db,color:#fff
    style ML fill:#9b59b6,color:#fff
    style Block fill:#e74c3c,color:#fff
    style Allow fill:#27ae60,color:#fff
```

### ผังขั้นตอน PIM Activation

```mermaid
sequenceDiagram
    participant Admin
    participant PIM
    participant Approver
    participant AzureAD as Azure AD
    Admin->>PIM: ขอ activate Global Admin
    PIM->>Approver: 📧 ขออนุมัติ
    Approver-->>PIM: ✅ อนุมัติ
    PIM->>AzureAD: Activate role (2 ชม.)
    Note over AzureAD: ⏳ Role active 2 ชม.
    AzureAD->>PIM: Role expired
    PIM->>Admin: 📧 สิทธิ์หมดอายุ
```

---

## ผังการตัดสินใจ

```mermaid
graph TD
    Alert["🚨 Azure AD Risk Alert"] --> Type{"⚙️ ประเภท?"}
    Type -->|Account Compromise| Acc["👤 บัญชีถูกบุกรุก"]
    Type -->|OAuth Consent Phishing| OAuth["🔗 Malicious App Consent"]
    Type -->|GA/Admin Abuse| GA["👑 Global Admin ผิดปกติ"]
    Type -->|Federation Abuse| Fed["🏛️ Trusted Domain เพิ่ม"]
    Acc --> Session["🔒 เพิกถอน Sessions"]
    OAuth --> Revoke["❌ ลบ App Consent"]
    GA --> Emergency["🔴 Break-glass Procedure"]
    Fed --> Emergency
```

---

## 1. การวิเคราะห์

### 1.1 ประเภทความเสี่ยง (Identity Protection)

| ประเภท | ตัวบ่งชี้ | ความรุนแรง |
|:---|:---|:---|
| **Unfamiliar sign-in** | IP/Location ใหม่ | 🟡 ปานกลาง |
| **Atypical travel** | Impossible travel | 🟠 สูง |
| **Anomalous token** | Token ผิดปกติ (replay) | 🔴 สูง |
| **Malware linked IP** | IP ที่เชื่อมกับ malware | 🔴 สูง |
| **Leaked credentials** | Found in breach data | 🔴 สูง |
| **Consent phishing** | OAuth app ที่อันตราย | 🔴 สูง |
| **GA sign-in** | Global Admin login | 🔴 สูง |
| **Federation change** | เพิ่ม trusted domain | 🔴 วิกฤต |
| **MFA manipulation** | เปลี่ยน/ลบ MFA methods | 🔴 สูง |

### 1.2 รายการตรวจสอบ

| รายการ | วิธีตรวจสอบ | เสร็จ |
|:---|:---|:---:|
| บัญชีที่ได้รับผลกระทบ (+role/privileges) | Azure AD Portal | ☐ |
| Sign-in details (IP, device, client app) | Sign-in logs | ☐ |
| Risk detections ทั้งหมด | Identity Protection | ☐ |
| Role assignments ที่เปลี่ยน | Audit logs | ☐ |
| OAuth consents ใหม่ (Enterprise Applications) | Enterprise Apps | ☐ |
| App registrations ใหม่ | App registrations | ☐ |
| Conditional Access evaluation results | Sign-in logs | ☐ |
| MFA methods ที่เปลี่ยน | Authentication methods | ☐ |
| Inbox rules/delegates ที่สร้าง | Exchange audit | ☐ |

### 1.3 กิจกรรมหลังถูกบุกรุก

| กิจกรรม | ตรวจสอบ | เสร็จ |
|:---|:---|:---:|
| สร้าง/แก้ไข App Registration | Audit logs | ☐ |
| เพิ่ม credentials ให้ Service Principal | Audit logs | ☐ |
| เปลี่ยน Role assignments | Directory audit | ☐ |
| consent OAuth app | Enterprise Apps | ☐ |
| สร้าง inbox forwarding rule | Exchange audit | ☐ |

---

## 2. การควบคุม

| # | การดำเนินการ | เครื่องมือ | เสร็จ |
|:---:|:---|:---|:---:|
| 1 | **เพิกถอน sessions** ทั้งหมด (Revoke-AzureADUserAllRefreshToken) | Azure AD | ☐ |
| 2 | **รีเซ็ตรหัสผ่าน** ผ่านช่องทาง out-of-band | Azure AD | ☐ |
| 3 | **ปิดบัญชี** ชั่วคราว (Block sign-in) | Azure AD | ☐ |
| 4 | **ลบ OAuth apps** ที่อันตราย | Enterprise Apps | ☐ |
| 5 | **กู้คืน role assignments** ที่ถูกเปลี่ยน | Azure AD | ☐ |
| 6 | **ลบ App Registration** + credentials ที่สร้างใหม่ | Azure AD | ☐ |

---

## 3. การกำจัด

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | ล้างและลงทะเบียน **MFA ใหม่** (FIDO2/passkeys) | ☐ |
| 2 | ลบ inbox rules / forwarding / delegates | ☐ |
| 3 | ลบ Service Principal credentials ที่ผู้โจมตีสร้าง | ☐ |
| 4 | หาก federation abuse → ลบ trusted domain ที่เพิ่ม | ☐ |

---

## 4. การฟื้นฟู

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | บังคับ **FIDO2/passkeys** สำหรับ admins | ☐ |
| 2 | เปิด **PIM** (Privileged Identity Management) | ☐ |
| 3 | ตรวจสอบ **Conditional Access policies** | ☐ |
| 4 | เปิด **CAE** (Continuous Access Evaluation) | ☐ |
| 5 | จำกัด **admin consent workflow** | ☐ |
| 6 | ติดตาม 30 วัน | ☐ |

---

## 5. เกณฑ์การยกระดับ

| เงื่อนไข | ยกระดับไปยัง |
|:---|:---|
| Global Admin ถูกบุกรุก | CISO + Major Incident |
| Federation abuse (trusted domain เพิ่ม) | CISO + Microsoft support |
| ข้อมูลถูกนำออก | Legal + DPO (PDPA 72 ชม.) |
| หลายบัญชีถูกบุกรุก | Major Incident |
| BEC follow-up | [PB-17 BEC](BEC.th.md) |

---

### ผัง Entra ID Security Stack

```mermaid
graph TD
    EntraID["🔐 Entra ID"] --> IdP["🛡️ Identity Protection"]
    EntraID --> CA["📋 Conditional Access"]
    EntraID --> PIM["🔑 PIM"]
    EntraID --> AccessReview["👁️ Access Review"]
    IdP --> SIEM["📊 Sentinel"]
    CA --> SIEM
    PIM --> SIEM
    style EntraID fill:#3498db,color:#fff
    style SIEM fill:#e74c3c,color:#fff
```

### ผัง Audit Log Analysis

```mermaid
sequenceDiagram
    participant SOC
    participant AuditLog as Entra Audit Log
    participant Sentinel
    SOC->>AuditLog: Query: new app registrations
    AuditLog-->>SOC: 3 suspicious apps
    SOC->>AuditLog: Query: role assignments
    AuditLog-->>SOC: Global Admin added!
    SOC->>Sentinel: Create hunting query
    Sentinel->>SOC: 🚨 Correlated alert
```

## กฎตรวจจับ (Sigma)

| กฎ | ไฟล์ |
|:---|:---|
| Azure AD Risky Sign-in | [cloud_azure_risky_signin.yml](../../08_Detection_Engineering/sigma_rules/cloud_azure_risky_signin.yml) |
| Impossible Travel | [cloud_impossible_travel.yml](../../08_Detection_Engineering/sigma_rules/cloud_impossible_travel.yml) |
| Login from Unusual Location | [cloud_unusual_login.yml](../../08_Detection_Engineering/sigma_rules/cloud_unusual_login.yml) |

## เอกสารที่เกี่ยวข้อง

- [กรอบการตอบสนองต่อเหตุการณ์](../Framework.th.md)
- [PB-05 บัญชีถูกบุกรุก](Account_Compromise.th.md)
- [PB-26 MFA Bypass](MFA_Bypass.th.md)

## Azure AD Investigation Queries

| Query Purpose | Log Source | Key Fields |
|:---|:---|:---|
| Risky sign-ins | Azure AD Sign-in | riskState, riskLevel |
| MFA bypass | Azure AD Sign-in | authenticationRequirement |
| Privilege changes | Azure AD Audit | targetResources |
| App consent grants | Azure AD Audit | operationType |
| Conditional Access | Sign-in logs | conditionalAccessStatus |

### Azure AD Containment Actions

| Action | Impact | Speed | Reversible |
|:---|:---|:---|:---|
| Disable user account | High | Immediate | ✅ |
| Revoke all sessions | Medium | Immediate | ✅ |
| Reset password + MFA | Medium | < 15 min | N/A |
| Block sign-in | High | Immediate | ✅ |
| Remove role assignments | High | < 30 min | ✅ |

### Conditional Access Quick Fix

| Policy | Setting | Priority |
|:---|:---|:---|
| Block legacy auth | All users | P1 |
| Require MFA | All admins | P1 |
| Named locations | Allowed countries only | P2 |

## References

- [MITRE ATT&CK T1098 — Account Manipulation](https://attack.mitre.org/techniques/T1098/)
- [Microsoft — Incident Response Playbooks](https://learn.microsoft.com/en-us/security/operations/incident-response-playbooks)
