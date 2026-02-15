# Playbook: Shadow IT / SaaS ไม่ได้รับอนุญาต (PB-29)

**ความรุนแรง**: ปานกลาง | **หมวด**: Governance | **MITRE**: T1567, T1537

## 1. วิเคราะห์ (Triage)
-   **ระบุบริการ**: SaaS อะไรที่ถูกใช้โดยไม่ได้รับอนุญาต (file sharing, AI tools, PM tools)
-   **ขอบเขตผู้ใช้**: กี่คนใช้? คนเดียวหรือทั้งแผนก
-   **จำแนกข้อมูล**: มีข้อมูลองค์กรถูกอัพโหลดหรือไม่ ระดับ classification อะไร
-   **การยืนยันตัวตน**: ใช้ email องค์กรสมัครหรือไม่ credentials เสี่ยงหรือไม่

## 2. ควบคุม (Containment)
-   **บล็อกบริการ**: เพิ่ม domain ใน proxy/firewall blocklist
-   **ยกเลิก OAuth**: ถ้าเชื่อมต่อผ่าน OAuth กับ corporate identity
-   **เปิด DLP**: ป้องกันการอัพโหลดข้อมูลไปบริการ cloud ที่ไม่จัดหมวด

## 3. แก้ไข (Remediation)
-   **ดึงข้อมูลกลับ**: Export แล้วลบข้อมูลองค์กรจากบริการที่ไม่ได้รับอนุญาต
-   **ล้าง Account**: ให้ user ลบบัญชีหรือเปลี่ยนรหัสถ้าใช้ password ซ้ำ
-   **ประเมินความต้องการ**: มี business need จริงหรือไม่ — พิจารณาอนุมัติพร้อม security controls
-   **อัปเดต Policy**: เพิ่มแนวทางเรื่อง unauthorized SaaS ใน acceptable use policy

## 4. กู้คืน (Recovery)
-   จัดหาทางเลือกที่อนุมัติแล้วให้ตอบโจทย์ business needs
-   ปรับ CASB สำหรับ Shadow IT discovery ต่อเนื่อง

## 5. บทเรียน
-   Shadow IT มักเกิดเพราะเครื่องมือที่อนุมัติไม่ตอบโจทย์ — แก้ที่ต้นเหตุ
-   สร้าง SaaS governance framework พร้อมกระบวนการขอ-อนุมัติ

## References
-   [MITRE ATT&CK T1567](https://attack.mitre.org/techniques/T1567/)
