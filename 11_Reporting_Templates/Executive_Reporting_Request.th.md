# แบบฟอร์มคำขอรายงานสำหรับผู้บริหาร

**กลุ่มเป้าหมาย**: SOC Manager, CISO Delegate, Business Owner, Executive Stakeholder
**วัตถุประสงค์**: ใช้แบบฟอร์มนี้เพื่อขอรายงานรายเดือน รายไตรมาส หรือรายงานเฉพาะกิจสำหรับผู้บริหาร โดยกำหนด audience, metrics, และ decision needs ให้ชัด

```mermaid
graph TD
    A["ส่งคำขอรายงาน"] --> B["ยืนยัน Audience และ Purpose"]
    B --> C["ยืนยัน Metrics และข้อเท็จจริง"]
    C --> D["จัดทำ Report Pack"]
    D --> E["ทบทวนและส่งมอบ"]
```

## 1. ส่วนหัวคำขอ

| Field | Value |
|:---|:---|
| **Request ID** | RPT-[YYYYMMDD]-[001] |
| **ผู้ร้องขอ** | |
| **ประเภทรายงาน** | ☐ Monthly · ☐ Quarterly · ☐ Incident-specific · ☐ Ad hoc |
| **Audience** | |
| **วันครบกำหนด** | |

## 2. เป้าหมายของรายงาน

| Question | Answer |
|:---|:---|
| **เหตุใดจึงต้องมีรายงานนี้** | |
| **ต้องการให้รายงานนี้ช่วยรองรับการตัดสินใจใด** | |
| **ครอบคลุมช่วงเวลาใด** | |
| **มี sensitivity หรือ TLP ระดับใด** | |

## 3. เนื้อหาที่ต้องมี

| Content Item | Required | Notes |
|:---|:---:|:---|
| Executive summary | ☐ | |
| KPI trend | ☐ | |
| Material incidents | ☐ | |
| Open risks or gaps | ☐ | |
| Funding or action request | ☐ | |

## 4. การทบทวนและการอนุมัติ

| Role | Name | Decision | Date |
|:---|:---|:---:|:---|
| SOC Manager | | ☐ Reviewed | |
| CISO Delegate | | ☐ Approve · ☐ Revise | |
| Requesting Executive | | ☐ Confirm Scope | |

## เอกสารที่เกี่ยวข้อง (Related Documents)

-   [SOC Service Catalog](../06_Operations_Management/SOC_Service_Catalog.th.md)
-   [Monthly SOC Report](Monthly_SOC_Report.th.md)
-   [Quarterly Business Review](Quarterly_Business_Review.th.md)
-   [Executive Dashboard](Executive_Dashboard.th.md)

## References

-   [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
-   [FIRST CSIRT Services Framework](https://www.first.org/standards/frameworks/csirts/FIRST_CSIRT_Services_Framework_v2.1)
