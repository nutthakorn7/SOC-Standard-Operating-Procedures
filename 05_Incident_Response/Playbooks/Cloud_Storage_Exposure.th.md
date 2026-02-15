# Playbook: Cloud Storage เปิด Public (PB-27)

**ความรุนแรง**: สูง | **หมวด**: Cloud Security | **MITRE**: T1530, T1537

## 1. วิเคราะห์ (Triage)
-   **ระบุขอบเขต**: Storage ไหนเปิด public — S3 bucket, Azure Blob, GCP GCS
-   **จำแนกข้อมูล**: ข้อมูลที่เปิดเผยมี PII, credentials, secrets, ข้อมูลการเงิน หรือ source code หรือไม่
-   **ตรวจ Access Logs**: ดู CloudTrail/Azure Monitor ว่ามีใครเข้าถึงหรือดาวน์โหลดข้อมูลไปบ้าง
-   **ระยะเวลา**: เปิด public มานานเท่าไหร่

## 2. ควบคุม (Containment)
-   **ปิด Public Access ทันที**:
    -   AWS: `aws s3api put-public-access-block --bucket <name> --public-access-block-configuration BlockPublicAcls=true,...`
    -   Azure: ตั้ง container เป็น `Private`
    -   GCP: ลบ `allUsers` binding
-   **หมุน Credentials**: ถ้ามี secrets/keys ถูกเปิดเผย ให้ rotate ทันที
-   **เปิด Versioning**: เก็บหลักฐานการเปลี่ยนแปลง

## 3. แก้ไข (Remediation)
-   **หมุน Credentials ทั้งหมด**: API keys, tokens ที่อยู่ใน storage ที่เปิดเผย
-   **ประเมินผลกระทบข้อมูล**: ถ้า PII รั่วไหล ประเมินข้อกำหนดการแจ้ง PDPA/GDPR
-   **ตรวจสอบ IAM**: ใครมีสิทธิ์เปลี่ยน storage access policy
-   **เปิด Preventive Controls**: S3 Block Public Access, Azure Policy, GCP Organization Policy

## 4. กู้คืน (Recovery)
-   Deploy CSPM (Cloud Security Posture Management)
-   เปิด alert สำหรับการสร้าง public storage ใหม่
-   Tag ข้อมูลสำคัญและบังคับ encryption

## 5. บทเรียน
-   บังคับใช้ IaC (Terraform) พร้อม security guardrails
-   Implement SCPs/Organization Policy ป้องกัน public storage ระดับ account
-   สแกน storage access ทุกสัปดาห์

## References
-   [MITRE ATT&CK T1530](https://attack.mitre.org/techniques/T1530/)
