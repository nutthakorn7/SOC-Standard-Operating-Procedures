# Playbook: อุปกรณ์มือถือถูกบุกรุก (PB-28)

**ความรุนแรง**: สูง | **หมวด**: Endpoint Security | **MITRE**: T1456, T1474

## 1. วิเคราะห์ (Triage)
-   **ตรวจ MDM**: ดู Intune/Jamf สำหรับสถานะ non-compliant, profile แปลก, หรือ jailbreak
-   **วิเคราะห์แอป**: ตรวจหาแอปที่ไม่รู้จักหรือ sideload จากนอก App Store
-   **Network Activity**: ดูการส่งข้อมูลผิดปกติหรือเชื่อมต่อ IP น่าสงสัย
-   **ตรวจการเข้าถึง**: ดู log การเข้า email, VPN, SaaS จากอุปกรณ์

## 2. ควบคุม (Containment)
-   **ล็อคอุปกรณ์**: Remote lock ผ่าน MDM ทันที
-   **ยกเลิกการเข้าถึงองค์กร**: ลบอุปกรณ์จาก conditional access
-   **ปิดแอปองค์กร**: Selective wipe เฉพาะข้อมูลองค์กร
-   **บล็อกเครือข่าย**: ลบจาก WiFi และ VPN องค์กร

## 3. แก้ไข (Remediation)
-   **Factory Reset**: ถ้ายืนยัน spyware/rootkit ให้ wipe ทั้งเครื่อง
-   **ลงทะเบียน MDM ใหม่**: Enroll ใหม่พร้อม security policy
-   **รีเซ็ต Credentials**: เปลี่ยนรหัสผ่านทุกบัญชีที่ใช้บนอุปกรณ์
-   **MFA ใหม่**: ลบอุปกรณ์จาก trusted devices, ลงทะเบียนใหม่

## 4. กู้คืน (Recovery)
-   Restore เฉพาะข้อมูลผู้ใช้ (ไม่ใช่แอป) จาก backup ที่สะอาด
-   บังคับ app allowlist, บล็อก sideloading, บังคับ OS update

## 5. บทเรียน
-   ประเมิน MDM coverage สำหรับ BYOD ทั้งหมด
-   พิจารณา Mobile Threat Defense (MTD)
-   ฝึกอบรมผู้ใช้เรื่องความปลอดภัยมือถือ

## References
-   [MITRE ATT&CK Mobile — T1456](https://attack.mitre.org/techniques/T1456/)
