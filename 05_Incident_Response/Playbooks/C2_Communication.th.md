# Playbook: การสื่อสาร Command & Control (C2)

**ID**: PB-13
**ความรุนแรง**: สูง
**ตัวกระตุ้น**: แจ้งเตือน Network/NDR ("Beaconing detected", "เชื่อมต่อไปยัง Known C2 IP")

## 1. การวิเคราะห์ (Analysis)
-   **ความถี่ (Beaconing)**: มีจังหวะเวลาสม่ำเสมอหรือไม่? (เช่น ทุก 5 นาที)
-   **ชื่อโดเมน**: ตรวจสอบอายุโดเมน (เพิ่งจดทะเบียนใหม่?)
-   **Process**: โปรแกรมอะไรเป็นตัวเชื่อมต่อออกไป? (powershell.exe vs chrome.exe)

## 2. การจำกัดวง (Containment)
-   **บล็อก IP/Domain**: บล็อกที่ Firewall หรือทำ DNS Sinkhole
-   **แยกเครื่อง**: ตัดการเชื่อมต่อเครื่องที่พยายามติดต่อออกไป

## 3. การกำจัด (Eradication)
-   **หยุด Process**: Kill process ที่ทำการเชื่อมต่อ
-   **วิเคราะห์ Memory**: หากเป็น Process injection (เช่น แฝงใน svchost.exe) การรีสตาร์ทอาจหาย แต่ควรเก็บหลักฐานก่อน

## 4. การกู้คืน (Recovery)
-   **Threat Intel**: ส่งข้อมูล C2 IP/Domain ไปยังระบบ Threat Intelligence เพื่ออัปเดตเครื่องมือป้องกันอื่นๆ
