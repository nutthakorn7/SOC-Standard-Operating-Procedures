# Playbook PB-34: การสำรวจเครือข่ายที่น่าสงสัย (Suspicious Network Discovery)

**ความรุนแรง**: ปานกลาง–สูง | **หมวดหมู่**: Discovery | **MITRE**: T1046, T1135, T1018, T1016, T1049, T1082

---

## คำอธิบาย

ผู้โจมตีทำการสำรวจภายในเพื่อทำแผนที่เครือข่าย, ค้นหาเครื่องที่ทำงานอยู่, ค้นพบ file shares, และสำรวจบริการ ข้อมูลนี้ช่วยให้สามารถเคลื่อนที่ในเครือข่าย, ยกระดับสิทธิ์, และขโมยข้อมูลได้ Discovery มักเกิดหลังจากเข้าถึงระบบเบื้องต้นและก่อนการเคลื่อนที่

## แหล่งตรวจจับ

| แหล่ง | ตัวอย่าง Alert |
|:---|:---|
| **EDR** | เครื่องมือสแกนพอร์ต (nmap, Advanced IP Scanner), คำสั่งสำรวจเครือข่าย |
| **SIEM** | การเชื่อมต่อล้มเหลวจำนวนมาก, ICMP sweeps, SMB share enumeration |
| **Network** | ARP requests ผิดปกติ, การเชื่อมต่อต่อเนื่องไปหลายเครื่องอย่างรวดเร็ว |
| **Domain Controller** | LDAP query สำหรับ computers/users ทั้งหมด, กิจกรรม BloodHound |

## เช็คลิสต์คัดกรอง

| # | ขั้นตอน | การดำเนินการ |
|:---:|:---|:---|
| 1 | **ระบุแหล่งที่มา** | ใครรันคำสั่ง discovery? admin ปกติหรือบัญชีที่ถูกยึด? |
| 2 | **ตรวจบริบท** | เป็นส่วนหนึ่งของงาน IT ที่กำหนด (patching, inventory)? |
| 3 | **ดูคำสั่ง** | ค้นหา: `net view`, `net share`, `nltest`, `arp -a`, `nmap`, PowerShell AD cmdlets |
| 4 | **ตรวจเครื่อง** | เครื่อง workstation หรือ server? Domain-joined? ผู้ใช้คาดหวัง? |
| 5 | **Timeline** | กิจกรรมเริ่มเมื่อไหร่? สัมพันธ์กับ alert initial access? |
| 6 | **ปริมาณ** | สแกนกี่เครื่อง/พอร์ต? สแกนเร็ว = น่าจะเป็นอัตโนมัติ |

## การตอบสนอง

### Tier 1

1. บันทึกเครื่องต้นทาง, ผู้ใช้, และคำสั่งที่พบ
2. ตรวจสอบว่าผู้ใช้มีเหตุผลที่ถูกต้อง (IT admin, pentest ที่ได้รับอนุญาต)
3. ถ้าไม่ได้อนุญาต → Escalate ถึง Tier 2

### Tier 2

4. สืบสวนเครื่องต้นทางเพื่อหาสัญญาณ compromise
5. ค้นหา initial access indicators ก่อนหน้า
6. ค้นหากิจกรรมต่อเนื่อง: lateral movement, credential dumping
7. ถ้ายืนยันว่าเป็นอันตราย:
   - **แยก** เครื่องต้นทางผ่าน EDR
   - **ปิด** บัญชีที่ถูกยึด
   - **บล็อก** เครื่องมือสแกนผ่าน endpoint policy

## เอกสารที่เกี่ยวข้อง

- [Lateral Movement Playbook](Lateral_Movement.th.md)
- [Privilege Escalation Playbook](Privilege_Escalation.th.md)
- [กรอบ IR](../Framework.th.md)

## อ้างอิง

- [MITRE ATT&CK — Discovery](https://attack.mitre.org/tactics/TA0007/)
- [MITRE T1046 — Network Service Discovery](https://attack.mitre.org/techniques/T1046/)
- [MITRE T1135 — Network Share Discovery](https://attack.mitre.org/techniques/T1135/)
