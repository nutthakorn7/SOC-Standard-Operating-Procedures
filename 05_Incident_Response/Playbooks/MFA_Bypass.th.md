# Playbook: MFA Bypass / ขโมย Token (PB-26)

**ความรุนแรง**: สูง | **หมวด**: Identity & Access | **MITRE**: T1556.006, T1539

## 1. วิเคราะห์ (Triage)

-   **ระบุประเภทการโจมตี**: AiTM proxy, MFA fatigue (กด push จนเหยื่อยอม), SIM swap หรือขโมย session cookie
-   **ตรวจ Identity Logs**: ดู Azure AD / Okta sign-in logs — IP ต่างแต่ session เดียวกัน, geo ผิดปกติ
-   **ตรวจ OAuth**: ดูว่ามี app consent ใหม่ถูกเพิ่มหลังถูกโจมตีหรือไม่
-   **ตรวจ Email Rules**: มี forwarding rule หรือ delegate ถูกเพิ่มหรือไม่

## 2. ควบคุม (Containment)
-   **ยกเลิก Session ทั้งหมด**: Force sign-out จากทุกอุปกรณ์
-   **บล็อก Token**: ถ้าระบุ session cookie ได้ ให้เพิ่มใน blocklist
-   **ปิดบัญชีชั่วคราว**: ถ้ายืนยันว่าถูกใช้งานโดยผู้โจมตี
-   **บล็อก AiTM**: เพิ่ม phishing proxy domain/IP ใน firewall
-   **กักกัน Email**: ลบ phishing email ออกจากทุก mailbox

## 3. แก้ไข (Remediation)
-   **รีเซ็ตรหัสผ่าน**: บังคับเปลี่ยนผ่านช่องทางที่ยืนยันแล้ว
-   **ลงทะเบียน MFA ใหม่**: ลบ MFA เก่า, ลงทะเบียนใหม่ด้วย FIDO2/passkey
-   **ลบ OAuth Apps**: ยกเลิก consent ที่น่าสงสัย
-   **ลบ Email Rules**: ลบ forwarding rules และ delegates ที่ผู้โจมตีสร้าง
-   **ตรวจ Audit Trail**: ดูการเข้าถึงข้อมูล, ดาวน์โหลดไฟล์, เปลี่ยนสิทธิ์ระหว่างถูกโจมตี

## 4. กู้คืน (Recovery)
-   **อัปเกรดเป็น Phishing-Resistant MFA**: ย้ายไปใช้ FIDO2 security key หรือ passkey
-   **Conditional Access**: บังคับ compliant device + managed app
-   **ลด Token Lifetime**: เปิด Continuous Access Evaluation (CAE)

## 5. บทเรียน
-   ประเมินความเสี่ยงของ MFA method ปัจจุบันต่อ AiTM
-   ฝึก user ให้จำ AiTM proxy phishing pages

## References
-   [MITRE ATT&CK T1556.006](https://attack.mitre.org/techniques/T1556/006/)
-   [MITRE ATT&CK T1539](https://attack.mitre.org/techniques/T1539/)
