# แบบฟอร์มจัดลำดับ Remediation Backlog

**กลุ่มเป้าหมาย**: SOC Manager, IR Engineer, Security Owner, Business Owner
**วัตถุประสงค์**: ใช้แบบฟอร์มนี้เพื่อจัดลำดับงาน remediation หลัง incident หรือ control gap ตาม residual risk โอกาสเกิดซ้ำ และความพร้อมของ owner

```mermaid
graph TD
    A["รวบรวมรายการ remediation"] --> B["ให้คะแนน residual risk"]
    B --> C["ตรวจสอบโอกาสเกิดซ้ำและ dependency"]
    C --> D["จัดลำดับ backlog"]
    D --> E["ติดตามการปิดงานและการยืนยันผล"]
```

## 1. ทะเบียนรายการ Backlog

| รหัส | รายการ Remediation | ต้นทาง incident หรือ gap | Owner | สถานะ |
|:---|:---|:---|:---|:---:|
| REM-BL-[001] | | | | ☐ New ☐ Ranked ☐ In Progress ☐ Done |
| REM-BL-[002] | | | | ☐ New ☐ Ranked ☐ In Progress ☐ Done |

## 2. โมเดลการให้คะแนน

| ปัจจัย | คำถาม | คะแนน (1-5) |
|:---|:---|:---:|
| Residual risk | หากไม่ทำงานนี้จะเกิดอะไรขึ้น | |
| Recurrence potential | Incident หรือ failure เดิมมีโอกาสเกิดซ้ำหรือไม่ | |
| Critical dependency | งานนี้บล็อก recovery, compliance, หรือ safe operation หรือไม่ | |
| Owner readiness | Owner พร้อม execute ภายในเวลาที่ต้องการหรือไม่ | |
| Validation clarity | สามารถยืนยันการปิดงานได้อย่างเป็นกลางหรือไม่ | |

## 3. ตารางจัดลำดับความสำคัญ

| รายการ | Residual Risk | Recurrence | Dependency | ความพร้อมของ Owner | Validation | คะแนนรวม | ลำดับความสำคัญ |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| | | | | | | | High / Medium / Low |
| | | | | | | | |

## 4. กติกาการทบทวน

-   [ ] ให้ priority กับงานที่ช่วยป้องกันการเกิดซ้ำของ Critical หรือ High incidents
-   [ ] escalate รายการที่ไม่มี owner ไม่มี due date หรือเลื่อนซ้ำ
-   [ ] ห้ามปิด remediation โดยไม่มี validation evidence
-   [ ] re-score เมื่อ business impact, threat activity, หรือ compliance deadline เปลี่ยน

## เอกสารที่เกี่ยวข้อง (Related Documents)

-   [เทมเพลตรายงาน Incident](incident_report.th.md)
-   [เทมเพลตการยอมรับความเสี่ยง](Risk_Acceptance_Template.th.md)
-   [การวิเคราะห์ช่องว่างด้าน Compliance](../07_Compliance_Privacy/Compliance_Gap_Analysis.th.md)
-   [รายงานผลการดำเนินงาน SOC ประจำเดือน](Monthly_SOC_Report.th.md)

## References

-   [NIST SP 800-61 Rev. 2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
-   [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
