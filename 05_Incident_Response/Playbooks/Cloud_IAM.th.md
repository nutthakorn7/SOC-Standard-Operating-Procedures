# Playbook: Cloud IAM Anomaly / ความผิดปกติ IAM คลาวด์

**ID**: PB-16
**ระดับความรุนแรง**: สูง/วิกฤต | **หมวดหมู่**: ความปลอดภัยคลาวด์
**MITRE ATT&CK**: [T1098](https://attack.mitre.org/techniques/T1098/) (Account Manipulation), [T1078.004](https://attack.mitre.org/techniques/T1078/004/) (Cloud Accounts)
**ทริกเกอร์**: CloudTrail/Azure Monitor anomaly, Root/GlobalAdmin login, GuardDuty IAM finding, Billing spike


## หลังเหตุการณ์ (Post-Incident)

- [ ] ทบทวน IAM policies ตาม least privilege
- [ ] เปิดใช้ SCPs / Permission boundaries
- [ ] ตรวจสอบ service account key rotation
- [ ] ใช้ CSPM tool เพื่อเฝ้าระวังอย่างต่อเนื่อง
- [ ] ทำ access recertification สำหรับ cloud roles
- [ ] จัดทำ [Incident Report](../../11_Reporting_Templates/incident_report.th.md)

### ผังการตรวจจับ IAM Anomaly

```mermaid
graph TD
    CT["📋 CloudTrail/Audit"] --> ML["🤖 Analytics"]
    ML --> Type{"⚠️ ประเภท?"}
    Type -->|Root Login| R["🔴 วิกฤต"]
    Type -->|New IAM User| N["🟠 สูง"]
    Type -->|Policy Change| P["🟠 สูง"]
    Type -->|Disable Logging| D["🔴 วิกฤต"]
    R --> SOC["🚨 Alert SOC"]
    N --> SOC
    P --> SOC
    D --> SOC
```

### ผังขั้นตอน Break-Glass

```mermaid
sequenceDiagram
    participant SOC
    participant Safe as Sealed Envelope
    participant Cloud as AWS/Azure
    participant CISO
    SOC->>CISO: 🚨 ต้องใช้ Root/GA
    CISO->>Safe: เปิด sealed envelope
    Safe-->>CISO: Root credentials
    CISO->>Cloud: Login + ดำเนินการ
    Cloud-->>CISO: เสร็จสิ้น
    CISO->>Cloud: เปลี่ยนรหัสผ่าน
    CISO->>Safe: ปิดผนึกใหม่
```

---

## ผังการตัดสินใจ

```mermaid
graph TD
    Alert["🚨 Cloud IAM Alert"] --> Type{"⚙️ ประเภท?"}
    Type -->|Root/GA Login| Root["👑 Root/Global Admin"]
    Type -->|สร้าง IAM User/Role| Create["👤 New Identity"]
    Type -->|สร้าง Access Key| Key["🔑 New Credentials"]
    Type -->|เปลี่ยน Policy| Policy["📋 Policy Change"]
    Type -->|ลบ Logging| Log["🗑️ Disable Audit"]
    Root --> Verify{"✅ ได้รับอนุมัติ?"}
    Create --> Verify
    Key --> Verify
    Policy --> Verify
    Log --> Urgent["🔴 เปิด logging ทันที"]
    Verify -->|ไม่| Contain["🔒 ปิด + กู้คืน"]
    Verify -->|ใช่| Monitor["👁️ บันทึก + ติดตาม"]
```

---

## 1. การวิเคราะห์

### 1.1 เหตุการณ์ที่มีความเสี่ยงสูง

| เหตุการณ์ | AWS CloudTrail | Azure Monitor | ความรุนแรง |
|:---|:---|:---|:---|
| **Root/GA login** | `ConsoleLogin` (Root) | GA sign-in | 🔴 วิกฤต |
| **สร้าง IAM user/role** | `CreateUser`, `CreateRole` | `Add member` | 🔴 สูง |
| **สร้าง Access Key** | `CreateAccessKey` | `Add app credential` | 🔴 สูง |
| **เปลี่ยน policy** | `PutUserPolicy`, `AttachPolicy` | `Add role assignment` | 🟠 สูง |
| **ลบ logging** | `DeleteTrail`, `StopLogging` | `Disable diagnostic` | 🔴 วิกฤต |
| **สร้าง federation** | `CreateSAMLProvider` | `Add federated domain` | 🔴 วิกฤต |
| **AssumeRole ผิดปกติ** | `AssumeRole` จาก IP ใหม่ | — | 🟠 สูง |

### 1.2 รายการตรวจสอบ

| รายการ | วิธีตรวจสอบ | เสร็จ |
|:---|:---|:---:|
| ใคร/อะไร ทำกิจกรรมนี้? (IAM user/role/service) | CloudTrail / Azure Audit | ☐ |
| จาก IP/location ไหน? | CloudTrail sourceIP | ☐ |
| มี Change Request ที่ได้รับอนุมัติ? | ITSM / Ticketing | ☐ |
| Root/GA มีการใช้งานปกติหรือไม่? (ควร = ไม่) | CloudTrail / Azure | ☐ |
| มีทรัพยากรใหม่ถูกสร้าง? (EC2, Lambda, etc.) | CloudTrail / Azure | ☐ |
| มี billing anomaly? | Billing dashboard | ☐ |
| Logging ยังเปิดอยู่? | CloudTrail / Config | ☐ |

### 1.3 ตรวจทรัพยากรที่สร้างใหม่

| ทรัพยากร | ตรวจสอบ | เสร็จ |
|:---|:---|:---:|
| EC2 instances (ทุก region!) | AWS Console / CLI | ☐ |
| Lambda functions | AWS Console | ☐ |
| S3 buckets | AWS Console | ☐ |
| IAM users/roles/policies | IAM Console | ☐ |
| Network (VPC, SG, NACL changes) | VPC Console | ☐ |

---

## 2. การควบคุม

| # | การดำเนินการ | เครื่องมือ | เสร็จ |
|:---:|:---|:---|:---:|
| 1 | **ปิด Access Keys** ที่น่าสงสัย | IAM Console | ☐ |
| 2 | **ลบ IAM users/roles** ที่ไม่ได้รับอนุมัติ | IAM Console | ☐ |
| 3 | **กู้คืน policies** ที่ถูกเปลี่ยน | IAM / IaC | ☐ |
| 4 | **เปิด logging** ที่ถูกปิด (CloudTrail, Config) | AWS Console | ☐ |
| 5 | **Terminate** instances/lambdas ที่ผู้โจมตีสร้าง | AWS Console | ☐ |
| 6 | **ตรวจ billing** สำหรับค่าใช้จ่ายผิดปกติ | Billing | ☐ |

---

## 3. การกำจัด

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | หมุนเวียน Root/GA credentials | ☐ |
| 2 | ลบทรัพยากรทั้งหมดที่ผู้โจมตีสร้าง (ทุก region!) | ☐ |
| 3 | ลบ federation trust ที่เพิ่ม (ถ้ามี) | ☐ |
| 4 | ตรวจ STS credentials ที่ assume แล้ว | ☐ |

---

## 4. การฟื้นฟู

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | บังคับ **MFA** สำหรับ Root/GA (hardware key) | ☐ |
| 2 | ใช้ **SCP** / **Azure Policy** ห้ามใช้ Root ในงานประจำ | ☐ |
| 3 | ใช้ **break-glass procedure** สำหรับ GA (sealed envelope) | ☐ |
| 4 | เปิด **alerts** สำหรับ Root/GA login, IAM changes | ☐ |
| 5 | ใช้ **Terraform/CloudFormation** สำหรับ IAM changes (GitOps) | ☐ |
| 6 | ตรวจสอบ IAM access ทุกไตรมาส | ☐ |

---

## 5. เกณฑ์การยกระดับ

| เงื่อนไข | ยกระดับไปยัง |
|:---|:---|
| Root/GA ถูกบุกรุก | CISO + Major Incident |
| Cryptomining instances สร้างขึ้น | Finance + [PB-31 Cryptomining](Cryptomining.th.md) |
| ข้อมูลถูกเข้าถึง (S3/DB) | Legal + DPO (PDPA 72 ชม.) |
| Billing spike > $1,000 | Finance + Cloud team |
| Logging ถูกปิด | CISO ทันที |

---

## 6. Evidence Checklist

| ประเภทหลักฐาน | สิ่งที่ต้องเก็บ | แหล่งข้อมูล | เหตุผลที่ต้องเก็บ |
|:---|:---|:---|:---|
| หลักฐานด้านตัวตน | User ARN/UPN, role, access key ID, สถานะ MFA | Cloud audit / IAM logs | ยืนยันว่าตัวตนใดถูกนำไปใช้ |
| หลักฐานการเปลี่ยนแปลง | policy diff, role assignment, trust relationship, การปิด logging | CloudTrail / Azure audit / IaC repo | ใช้ดูว่ามีการเปลี่ยนอะไรและมีความเสี่ยงแค่ไหน |
| หลักฐานผลกระทบต่อทรัพยากร | compute, storage, network, function, หรือ public exposure ที่สร้างใหม่ | Cloud console / audit logs | ใช้ประเมิน blast radius |
| หลักฐานแหล่งที่มา | source IP, user agent, console/API method, geolocation | Event details / SIEM | ใช้ช่วย attribution และ review false positive |
| หลักฐานด้านธุรกิจและต้นทุน | billing spike, ข้อมูลที่ถูกเปิดเผย, account/subscription ที่ได้รับผลกระทบ | Billing / asset inventory / DLP | ใช้ยกระดับถึงผู้บริหารและ legal |

---

## 7. Minimum Telemetry Required

| แหล่ง Telemetry | ใช้เพื่ออะไร | ความสำคัญ | Blind Spot ถ้าไม่มี |
|:---|:---|:---:|:---|
| Cloud audit logs | ดู identity action, policy change, API call, logging tamper event | Required | พิสูจน์ไม่ได้ว่าผู้โจมตีแก้อะไรหรือเข้าถึงอะไร |
| IAM และ directory telemetry | ดู MFA state, role membership, trust relationship, key lifecycle | Required | ระบุ privilege escalation หรือ persistence path ไม่ได้ |
| Cloud asset และ posture telemetry | ดู public exposure, resource ใหม่, guardrail violation | Required | มอง blast radius และ exposure ไม่ชัด |
| Billing และ usage anomaly telemetry | ดู cryptomining, abuse spike, resource consumption ที่ผิดปกติ | Recommended | พลาด cost-driven abuse หรือ resource creation แบบ stealth ได้ |
| IaC และ change-management records | ใช้เทียบ planned change, approver, deployment window | Recommended | อาจตี planned change เป็น compromise |

---

## 8. False Positive และ Tuning Guide

| Scenario | ทำไมจึงดูน่าสงสัย | วิธีตรวจสอบ | Tuning Action | ต้องยกระดับเมื่อ |
|:---|:---|:---|:---|:---|
| งาน deploy infrastructure ที่อนุมัติ | role, policy, หรือ resource ใหม่ดูเหมือน attacker persistence | ยืนยัน IaC change set, approver, pipeline run, และ maintenance window | suppress เฉพาะ deployment identity และ change window ที่อนุมัติ | มีการเปลี่ยนผ่าน console/manual หรือไม่ตรง template ที่อนุมัติ |
| การใช้ break-glass หรือ emergency admin | Root/Global Admin อาจถูกใช้จริงตอน outage | ยืนยัน incident record, approver, และระยะเวลาการใช้งาน | ลด severity สำหรับ break-glass ที่อนุมัติและเก็บ log ครบ | มีการใช้โดยไม่มี incident approval หรือใช้นานเกิน window |
| การทำงานของ cloud security tooling | CSPM/SSPM/auto-remediation อาจแก้ policy หรือ quarantine asset | ยืนยัน tool identity, remediation policy, และ resource เป้าหมาย | allowlist เฉพาะ identity ของเครื่องมือสำหรับ action ที่ documented | identity เดียวกันไปปิด logging หรือเพิ่ม privilege อย่างไม่คาดหมาย |
| งาน key rotation หรือ federation update ตามแผน | trust หรือ key lifecycle change ดูเหมือน malicious persistence | ยืนยัน change ticket, key owner, และ rollout plan | tune รอบเวลาของ key rotation และ federation change ที่อนุมัติ | มี principal ใหม่, trust policy กว้าง, หรือ cross-account access เพิ่มขึ้น |

---

### ผัง Least Privilege Model

```mermaid
graph TD
    User["👤 User"] --> Role{"🏷️ Role?"}
    Role -->|Read only| Read["📖 Viewer"]
    Role -->|Deploy| Deploy["🚀 Developer"]
    Role -->|Admin| Admin["👑 PIM-protected"]
    Admin --> JIT["⏱️ JIT: 2h max"]
    JIT --> Approval["✅ Requires approval"]
    style Admin fill:#e74c3c,color:#fff
    style JIT fill:#f39c12,color:#fff
    style Approval fill:#27ae60,color:#fff
```

### ผัง Cloud Permission Audit

```mermaid
sequenceDiagram
    participant CSPM
    participant SOC
    participant IAM
    participant Owner
    CSPM->>SOC: ⚠️ Over-permissioned role found
    SOC->>IAM: Check last usage
    IAM-->>SOC: ไม่เคยใช้ 90 วัน
    SOC->>Owner: ☎️ ยืนยันความจำเป็น
    Owner-->>SOC: ไม่จำเป็นแล้ว
    SOC->>IAM: ลบ role
```

## กฎตรวจจับ (Sigma)

| กฎ | ไฟล์ |
|:---|:---|
| AWS Root Account Login | [cloud_root_login.yml](../../08_Detection_Engineering/sigma_rules/cloud_root_login.yml) |
| User Added to Domain Admins | [win_domain_admin_group_add.yml](../../08_Detection_Engineering/sigma_rules/win_domain_admin_group_add.yml) |

## เอกสารที่เกี่ยวข้อง

- [กรอบการตอบสนองต่อเหตุการณ์](../Framework.th.md)
- [PB-22 AWS EC2 Compromise](AWS_EC2_Compromise.th.md)
- [PB-21 AWS S3 Compromise](AWS_S3_Compromise.th.md)

## IAM Risk Indicators

| Indicator | Risk Level | Detection |
|:---|:---|:---|
| Unused admin keys > 90d | High | IAM Access Analyzer |
| MFA not enabled (admin) | Critical | IAM policy check |
| Overprivileged roles | Medium | Permission analysis |
| Cross-account access | Medium | CloudTrail review |
| Root account usage | Critical | CloudTrail alert |

### IAM Incident Containment

| Action | AWS | Azure | GCP |
|:---|:---|:---|:---|
| Disable access key | ✅ update-access-key | ✅ Portal | ✅ disable key |
| Revoke sessions | ✅ Inline deny policy | ✅ Revoke sessions | ✅ IAM |
| Reset credentials | ✅ Console/CLI | ✅ Portal/PS | ✅ Console |
| Remove permissions | ✅ Detach policy | ✅ Remove role | ✅ Remove binding |

### Cloud Credential Rotation

| Credential Type | Rotation Cycle |
|:---|:---|
| Access keys | 90 days |
| Service account keys | 60 days |
| Root/admin password | 30 days |
| API tokens | 90 days |

## References

- [MITRE ATT&CK T1078.004 — Cloud Accounts](https://attack.mitre.org/techniques/T1078/004/)
- [AWS Security Incident Response Guide](https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/welcome.html)
