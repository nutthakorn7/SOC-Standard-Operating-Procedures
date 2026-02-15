# Playbook: เหตุการณ์ OT/ICS (PB-30)

**ความรุนแรง**: วิกฤต | **หมวด**: Operational Technology | **MITRE ICS**: T0813, T0831

> ⚠️ **สำคัญมาก**: ในเหตุการณ์ OT/ICS **ความปลอดภัยทางกายภาพมาก่อนทุกอย่าง** ถ้ามีความเสี่ยงต่อชีวิต อุปกรณ์ หรือสิ่งแวดล้อม — เปิดระบบ Safety (SIS) ก่อนเลย

## 1. วิเคราะห์ (Triage)
-   **ระบุระบบที่ได้รับผลกระทบ**: PLC, HMI, SCADA server, RTU, engineering workstation
-   **ขอบเขต IT-OT**: ภัยข้ามจาก IT มา OT หรือเกิดใน OT
-   **ประเมินความปลอดภัย**: มีความเสี่ยงทางกายภาพไหม
-   **วิเคราะห์ OT Protocol**: ตรวจ Modbus, DNP3, OPC UA สำหรับคำสั่งผิดปกติ

## 2. ควบคุม (Containment)
-   **⚡ ความปลอดภัยก่อน**: ถ้ามีความเสี่ยงกระบวนการ ให้ emergency shutdown
-   **แยก IT-OT**: ปิด/จำกัดการเชื่อมต่อ IT-OT DMZ
-   **อย่า Patch OT**: ห้าม reboot หรือ patch ระบบ OT ขณะเหตุการณ์ — อาจทำให้กระบวนการหยุด
-   **แบ่งส่วนเครือข่าย**: Isolate OT zone ที่ได้รับผลกระทบ
-   **เก็บหลักฐาน**: Capture PCAP บนเครือข่าย OT — ห้ามติดตั้ง agent บน PLC

## 3. แก้ไข (Remediation)
-   **Restore จาก Known-Good**: ใช้ PLC program และ HMI config จาก offline backup ที่ยืนยันแล้ว
-   **ตรวจสอบ Logic**: เปรียบเทียบ PLC ladder logic กับ golden baseline
-   **หมุน Credentials**: เปลี่ยนรหัสผ่าน default และที่ถูกบุกรุกบน OT devices
-   **ตรวจสอบ Firmware**: ยืนยันความถูกต้องของ firmware บน PLC/RTU

## 4. กู้คืน (Recovery)
-   Restart OT เป็นขั้นตอน โดยมี OT engineer ดูแล
-   Deploy OT monitoring (Claroty, Nozomi, Dragos) ถ้ายังไม่มี
-   ปรับปรุง firewall rules ระหว่าง IT-OT

## 5. บทเรียน
-   ทบทวน Purdue Model — แบ่งส่วนเครือข่ายระหว่าง IT-OT
-   ทำ asset inventory ระบบ OT ทั้งหมด
-   ซ้อม IR ร่วม IT+OT

## ผู้ที่ต้องแจ้ง
| บทบาท | เมื่อไหร่ |
|:---|:---|
| วิศวกร OT/โรงงาน | ทันที — ทุกเหตุการณ์ OT |
| เจ้าหน้าที่ความปลอดภัย | ถ้ามีความเสี่ยงทางกายภาพ |
| Vendor Support | สำหรับยืนยัน firmware/logic |
| หน่วยงานกำกับ | ถ้าเป็น critical infrastructure |

## References
-   [MITRE ATT&CK for ICS](https://attack.mitre.org/matrices/ics/)
-   [NIST SP 800-82](https://csrc.nist.gov/publications/detail/sp/800-82/rev-3/final)
