# แบบฟอร์มจัดลำดับ Telemetry Backlog

**กลุ่มเป้าหมาย**: Security Engineer, SOC Manager, Platform Owner
**วัตถุประสงค์**: ใช้แบบฟอร์มนี้เพื่อจัดลำดับงาน onboarding telemetry และ data quality ตามคุณค่าด้านความปลอดภัย dependency และความพร้อมในการ implement

```mermaid
graph TD
    A["รวบรวม telemetry gaps"] --> B["map ไปยัง use cases และ assets"]
    B --> C["ให้คะแนนความพร้อมและ Exposure"]
    C --> D["จัดลำดับงาน"]
    D --> E["ติดตาม Delivery และ Validation"]
```

## 1. ทะเบียนรายการ Backlog

| รหัส | Telemetry Gap | ระบบหรือบริการที่ได้รับผลกระทบ | ผู้รับผิดชอบ | สถานะ |
|:---|:---|:---|:---|:---:|
| TEL-BL-[001] | | | | ☐ New ☐ Ranked ☐ In Progress ☐ Done |
| TEL-BL-[002] | | | | ☐ New ☐ Ranked ☐ In Progress ☐ Done |

## 2. โมเดลการให้คะแนน

| ปัจจัย | คำถาม | คะแนน (1-5) |
|:---|:---|:---:|
| Critical asset exposure | Gap นี้กระทบ critical หรือ regulated service หรือไม่ | |
| Detection dependency | มี use cases กี่รายการที่ต้องพึ่ง telemetry นี้ | |
| Investigation dependency | Incident response ล้มเหลวหรือไม่หากไม่มีข้อมูลนี้ | |
| Implementation readiness | มี owner, integration path, และ sample data พร้อมหรือไม่ | |
| Data quality risk | ข้อมูลปัจจุบันขาด หาย ช้า หรือไม่น่าเชื่อถือหรือไม่ | |

## 3. ตารางจัดลำดับความสำคัญ

| รายการ | Asset Exposure | Detection Dependency | IR Dependency | Readiness | Quality Risk | คะแนนรวม | ลำดับความสำคัญ |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| | | | | | | | High / Medium / Low |
| | | | | | | | |

## 4. กติกาการทบทวน

-   [ ] ให้ priority กับ telemetry ที่ปลดล็อก high-priority use cases ได้หลายรายการ
-   [ ] escalate รายการที่กระทบ critical assets และไม่มี alternative data source
-   [ ] ห้ามปิดงานจนกว่าจะผ่าน data quality และ timestamp checks
-   [ ] re-score เมื่อ service ownership, retention, หรือ legal constraints เปลี่ยน

## 5. เส้นทางส่งต่อใน Backlog และ Governance

-   [ ] เชื่อมรายการที่ต้องเริ่มงานใหม่ไปยัง log source onboarding request
-   [ ] เชื่อมรายการที่บล็อก detection use case สำคัญไป weekly telemetry review และ monthly governance review เมื่อกระทบความเสี่ยงเชิงบริการ
-   [ ] ยกระดับ blind spot ที่คงอยู่นานหรือกระทบ regulated data ไป quarterly risk หรือ board review ตามเกณฑ์ที่เกี่ยวข้อง

## เอกสารที่เกี่ยวข้อง (Related Documents)

-   [แบบฟอร์มคำขอ Onboarding Log Source](Log_Source_Onboarding_Request.th.md)
-   [แค็ตตาล็อกบริการของ SOC](../06_Operations_Management/SOC_Service_Catalog.th.md)
-   [ตารางแหล่งข้อมูล Log](../06_Operations_Management/Log_Source_Matrix.th.md)
-   [คู่มือ Log Source Onboarding](../06_Operations_Management/Log_Source_Onboarding.th.md)

## References

-   [NIST SP 800-92](https://csrc.nist.gov/publications/detail/sp/800-92/final)
-   [Open Cybersecurity Schema Framework](https://schema.ocsf.io/)
