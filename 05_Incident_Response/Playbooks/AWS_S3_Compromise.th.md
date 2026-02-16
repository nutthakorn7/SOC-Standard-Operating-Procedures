# Playbook: AWS S3 Compromise

**ID**: PB-21
**ระดับความรุนแรง**: สูง/วิกฤต | **หมวดหมู่**: ความปลอดภัยคลาวด์
**MITRE ATT&CK**: [T1530](https://attack.mitre.org/techniques/T1530/) (Data from Cloud Storage)
**ทริกเกอร์**: AWS Config rule violation, GuardDuty S3 finding, Macie PII alert, CloudTrail anomaly

### ผังการตรวจจับ S3 Exposure

```mermaid
graph TD
    Monitor["🔍 Monitoring"] --> Type{"📋 ประเภท?"}
    Type -->|Public Access| Public["🌐 S3 สาธารณะ"]
    Type -->|Unusual Download| Download["📥 Download ผิดปกติ"]
    Type -->|PII Detected| PII["🔴 Macie: PII Found"]
    Type -->|Policy Change| Policy["⚙️ Bucket Policy เปลี่ยน"]
    Public --> Urgent["🔴 Block ทันที"]
    Download --> Investigate["🔎 ตรวจ CloudTrail"]
    PII --> Classify["📋 จำแนก + แจ้ง DPO"]
    Policy --> Revert["↩️ Revert Policy"]
    style Public fill:#e74c3c,color:#fff
    style PII fill:#c0392b,color:#fff
```

### ผังขั้นตอนหมุนเวียน Credentials

```mermaid
sequenceDiagram
    participant SOC
    participant IAM
    participant App as Application
    participant S3
    SOC->>IAM: ปิด compromised access key
    SOC->>IAM: สร้าง access key ใหม่
    IAM-->>SOC: key ID + secret
    SOC->>App: อัปเดต credentials
    App->>S3: ทดสอบ access ใหม่
    S3-->>App: ✅ สำเร็จ
    SOC->>IAM: ลบ old access key
```

---

## ผังการตัดสินใจ

```mermaid
graph TD
    Alert["🚨 S3 Alert"] --> Type{"📋 สถานการณ์?"}
    Type -->|Public Bucket| Pub["🌐 ข้อมูลเปิดสาธารณะ"]
    Type -->|Policy Changed| Pol["⚙️ Policy ถูกเปลี่ยน"]
    Type -->|External Download| DL["📥 ดาวน์โหลดจากภายนอก"]
    Type -->|Ransomware/Delete| Ransom["🔴 S3 Ransomware"]
    Pub --> Classify["📁 จำแนกข้อมูล"]
    Pol --> Classify
    DL --> Classify
    Classify -->|PII / Secrets| Critical["🔴 บล็อกทันที"]
    Ransom --> Critical
```

---

## 1. การวิเคราะห์

### 1.1 สถานการณ์ที่พบบ่อย

| สถานการณ์ | ตัวบ่งชี้ | ความรุนแรง |
|:---|:---|:---|
| **Public bucket + PII** | S3 ACL/Policy = public | 🔴 วิกฤต |
| **Policy เปลี่ยนเป็น public** | CloudTrail `PutBucketPolicy` | 🔴 สูง |
| **Download จาก external IP** | S3 access logs | 🔴 สูง |
| **S3 ransomware** | ลบ objects + ransom note | 🔴 วิกฤต |
| **Credentials ใน bucket** | Macie / TruffleHog | 🔴 วิกฤต |

### 1.2 รายการตรวจสอบ

| รายการ | วิธีตรวจสอบ | เสร็จ |
|:---|:---|:---:|
| Bucket name + region + owner tag | AWS Console | ☐ |
| ข้อมูลอะไรใน bucket? จำแนกประเภท | Macie / manual | ☐ |
| เปิดเป็น public? (Policy / ACL) | `aws s3api get-bucket-policy` | ☐ |
| Block Public Access ปิดอยู่? | `aws s3api get-public-access-block` | ☐ |
| ใครเปลี่ยน? เมื่อไหร่? | CloudTrail | ☐ |
| มีข้อมูลถูก download จาก external IP? | S3 access logs | ☐ |
| มี credentials/secrets อยู่ใน bucket? | Secrets scanner | ☐ |
| Versioning เปิดอยู่? | AWS Console | ☐ |

---

## 2. การควบคุม

### 2.1 การดำเนินการทันที

| # | การดำเนินการ | คำสั่ง | เสร็จ |
|:---:|:---|:---|:---:|
| 1 | **Block Public Access** | `aws s3api put-public-access-block --bucket <name> --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true` | ☐ |
| 2 | **เพิกถอน credentials** ที่เก็บใน S3 | IAM Console | ☐ |
| 3 | **เปิด versioning** เก็บหลักฐาน | `aws s3api put-bucket-versioning --bucket <name> --versioning-configuration Status=Enabled` | ☐ |
| 4 | **Tag** `Status: Compromised` | AWS Console | ☐ |
| 5 | **กู้คืน bucket policy** จาก IaC | Terraform / CFN | ☐ |

### 2.2 หาก Credentials ถูกเปิดเผย

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | หมุนเวียน API keys, access keys, tokens ทั้งหมด | ☐ |
| 2 | ตรวจ CloudTrail ว่า credentials ถูกใช้หรือไม่ | ☐ |
| 3 | หากถูกใช้ → ยกระดับไป [PB-16 Cloud IAM](Cloud_IAM.th.md) | ☐ |

---

## 3. การกำจัด

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | คืนค่า bucket policy ที่ถูกต้อง (จาก IaC) | ☐ |
| 2 | หมุนเวียน credentials ทั้งหมดที่อยู่ใน bucket | ☐ |
| 3 | ตรวจสอบ IAM — จำกัดผู้ที่เปลี่ยน policy ได้ | ☐ |
| 4 | หาก S3 ransomware → กู้คืนจาก versioning / backup | ☐ |

---

## 4. การฟื้นฟู

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | **Block Public Access ระดับ account** (SCP) | ☐ |
| 2 | เปิด **Macie** สำหรับ data classification | ☐ |
| 3 | เปิด **AWS Config rules** (s3-bucket-public-read/write-prohibited) | ☐ |
| 4 | ใช้ **Terraform/CloudFormation** สำหรับ bucket policies | ☐ |
| 5 | เปิด **S3 Object Lock** สำหรับ backup buckets | ☐ |
| 6 | เปิด **Server Access Logging** ทุก bucket | ☐ |

---

## 5. เกณฑ์การยกระดับ

| เงื่อนไข | ยกระดับไปยัง |
|:---|:---|
| PII / ข้อมูลลูกค้าถูกเข้าถึง | Legal + DPO (PDPA 72 ชม.) |
| Credentials เปิดเผยและถูกใช้ | CISO + [PB-16 Cloud IAM](Cloud_IAM.th.md) |
| S3 ransomware (ลบ objects) | [PB-02 Ransomware](Ransomware.th.md) + CISO |
| หลาย buckets/accounts | Major Incident |

---

### ผัง S3 Hardening Checklist

```mermaid
graph TD
    S3["📦 S3 Bucket"] --> BPA["🔒 Block Public Access"]
    S3 --> Encrypt["🔐 SSE-S3/KMS"]
    S3 --> Version["📋 Versioning"]
    S3 --> Logging["📊 Access Logging"]
    S3 --> Lifecycle["♻️ Lifecycle Policy"]
    BPA --> Audit["✅ Quarterly audit"]
    Encrypt --> Audit
    style S3 fill:#f39c12,color:#fff
    style Audit fill:#27ae60,color:#fff
```

### ผัง Bucket Policy Audit

```mermaid
sequenceDiagram
    participant CSPM
    participant SOC
    participant AWS
    participant Dev
    CSPM->>SOC: 🚨 Public bucket detected
    SOC->>AWS: Check bucket policy
    AWS-->>SOC: Principal: * (public!)
    SOC->>AWS: Enable BPA
    SOC->>Dev: ตรวจสอบ application impact
    Dev-->>SOC: ✅ No impact — app uses IAM role
```

## เอกสารที่เกี่ยวข้อง

- [กรอบการตอบสนองต่อเหตุการณ์](../Framework.th.md)
- [PB-27 Cloud Storage Exposure](Cloud_Storage_Exposure.th.md)
- [PB-16 Cloud IAM](Cloud_IAM.th.md)

## อ้างอิง

- [MITRE ATT&CK T1530 — Data from Cloud Storage](https://attack.mitre.org/techniques/T1530/)
- [AWS S3 Security Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)
