# แบบฟอร์มคำขอ Threat Hunt

**กลุ่มเป้าหมาย**: Threat Hunter, SOC Manager, Incident Responder, Detection Engineer
**วัตถุประสงค์**: ใช้แบบฟอร์มนี้เพื่อขอ threat hunt จาก hypothesis, campaign concern, หรือ control gap

```mermaid
graph TD
    A["ส่งคำขอ hunt"] --> B["กำหนด hypothesis และขอบเขต"]
    B --> C["ตรวจสอบความพร้อมของข้อมูล"]
    C --> D["กำหนดตารางการ hunt"]
    D --> E["แปลงผลที่พบเป็นงานต่อ"]
```

## 1. ส่วนหัวคำขอ

| รายการ | ค่า |
|:---|:---|
| **Request ID** | HUNT-[YYYYMMDD]-[001] |
| **ผู้ร้องขอ** | |
| **วันที่ส่งคำขอ** | |
| **เหตุผลของการ hunt** | ☐ Hypothesis · ☐ ติดตาม incident · ☐ Threat Intel · ☐ Audit / Gap |

## 2. เป้าหมายของการ Hunt

| คำถาม | คำตอบ |
|:---|:---|
| **Hypothesis หรือข้อกังวลหลัก** | |
| **Assets หรือ users ที่อยู่ใน scope** | |
| **ช่วงเวลา** | |
| **Indicators หรือพฤติกรรมที่คาดว่าจะพบ** | |

## 3. ข้อมูลและข้อจำกัด

| รายการ | สถานะ | หมายเหตุ |
|:---|:---:|:---|
| มี logs ที่เกี่ยวข้องพร้อม | ☐ | |
| มี EDR หรือ endpoint data พร้อม | ☐ | |
| มี cloud หรือ identity data พร้อม | ☐ | |
| บันทึกข้อจำกัดที่ทราบแล้ว | ☐ | |

## 4. ผลลัพธ์ที่คาดหวัง

-   [ ] สรุปผลการ hunt
-   [ ] Findings ที่ต้อง escalate เป็น incident
-   [ ] ตัวเลือก detection ที่ควรสร้างต่อ
-   [ ] ช่องว่างด้าน telemetry หรือ coverage

## 5. การอนุมัติและการจัดตาราง

| บทบาท | ชื่อ | การตัดสินใจ | วันที่ |
|:---|:---|:---:|:---|
| Threat Hunt Lead | | ☐ Accept · ☐ Reject · ☐ Need More Info | |
| SOC Manager | | ☐ Scheduled | |

## 6. เส้นทางส่งต่อหลังจบ Hunt

-   [ ] หากพบ incident indicator ที่น่าเชื่อถือ ให้ยกระดับเข้า incident response ทันที
-   [ ] หากพบ detection candidate ให้เชื่อมไป detection request หรือ detection backlog
-   [ ] หากพบ telemetry gap หรือ blind spot ให้เชื่อมไป telemetry backlog หรือ log source onboarding request

## เอกสารที่เกี่ยวข้อง (Related Documents)

-   [แค็ตตาล็อกบริการของ SOC](../06_Operations_Management/SOC_Service_Catalog.th.md)
-   [คู่มือ Threat Hunting](../05_Incident_Response/Threat_Hunting_Playbook.th.md)
-   [วงจรการทำงาน Threat Intelligence](../06_Operations_Management/Threat_Intelligence_Lifecycle.th.md)
-   [คลัง SOC Use Cases](../08_Detection_Engineering/SOC_Use_Case_Library.th.md)

## References

-   [MITRE ATT&CK](https://attack.mitre.org/)
-   [NIST SP 800-61 Rev. 2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
