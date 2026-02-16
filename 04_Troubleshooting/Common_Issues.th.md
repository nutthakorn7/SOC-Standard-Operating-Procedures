# วิธีการแก้ปัญหามาตรฐาน (Standard Troubleshooting Methodology)

เอกสารนี้ระบุแนวทางที่เป็นระบบในการแก้ปัญหาระบบโครงสร้างพื้นฐาน SOC

## 1. นิยามปัญหา (Defining the Problem)

```mermaid
graph TD
    Issue[รับแจ้งปัญหา] --> Define[ระบุขอบเขต/อาการ]
    Define --> Layer1{ระดับ Network?}
    Layer1 -->|ล่ม| FixNet[แก้การเชื่อมต่อ]
    Layer1 -->|ปกติ| Layer2{ระดับ App?}
    Layer2 -->|ล่ม| FixApp[Restart/Debug Service]
    Layer2 -->|ปกติ| Layer3{ระดับ Data?}
    Layer3 -->|ล่ม| FixData[เช็ค Config/Logs]
    Layer3 -->|ปกติ| RCA[วิเคราะห์เชิงลึก]
```

-   **อาการ**: อะไรล้มเหลว? (เช่น "Alert ไม่ขึ้น", "Login ไม่ได้")
-   **ขอบเขต**: กระทบผู้ใช้คนเดียว, Sensor ตัวเดียว, หรือทั้งระบบ?
-   **เวลา**: เริ่มเป็นเมื่อไหร่? มีการเปลี่ยนแปลงระบบเร็วๆ นี้หรือไม่ (Deployment/RFC)?

## 2. ขั้นตอนการแก้ปัญหา (The Troubleshooting Workflow)

### 2.1 ระดับเครือข่าย (Physical/Network Layer)
-   **การเชื่อมต่อ**: Ping/Telnet/Netcat หาปลายทางเจอหรือไม่?
-   **Firewall**: พอร์ตถูกบล็อกหรือไม่? (เช็ค Log Firewall)
-   **DNS**: ชื่อ Hostname แปลงเป็น IP ถูกต้องหรือไม่? (`nslookup`, `dig`)

### 2.2 ระดับแอปพลิเคชัน (Application/Service Layer)
-   **สถานะบริการ**: Process ทำงานอยู่หรือไม่? (`systemctl status`, `docker ps`)
-   **ทรัพยากร**: เช็ค CPU/RAM/Disk (`top`, `df -h`) โหลดสูงอาจทำให้ Timeout
-   **Logs**: **ต้อง** ตรวจสอบ Log เสมอ
    -   `/var/log/syslog`
    -   Application specific logs

### 2.3 ตรวจสอบการไหลของข้อมูล (Data Flow Verification)
-   **ต้นทาง**: Agent อ่านไฟล์เจอหรือไม่?
-   **ระหว่างทาง**: สถานะบน Log Forwarder/Broker (Kafka/RabbitMQ) เป็นอย่างไร?
-   **ปลายทาง**: มี Error ในการ Index เข้า SIEM หรือไม่?

## 3. สถานการณ์ที่พบบ่อย (Common Failure Scenarios)

### 3.1 Log Source หยุดส่งข้อมูล
1.  เช็ค Network/VPN ระหว่างต้นทางและ SOC
2.  เช็คสถานะ Agent service บนเครื่องต้นทาง
3.  เช็คพื้นที่ว่าง Disk บนเครื่องต้นทาง (Agent มักหยุดทำงานถ้า Disk เต็ม)

### 3.2 แจ้งเตือนผิดพลาดพุ่งสูง (False Positives Spikes)
1.  ระบุกฎที่เป็นปัญหา
2.  วิเคราะห์ Pattern ที่ทำให้เกิด Alert
3.  ปรับ Logic ของกฎ หรือเพิ่ม Whitelist

## 4. การทำเอกสาร (Documentation)
-   บันทึกการวิเคราะห์สาเหตุที่แท้จริง (RCA)
-   อัปเดต Knowledge Base (KB) และ SOP เพื่อป้องกันการเกิดซ้ำ

### เทมเพลต RCA

| ฟิลด์ | คำอธิบาย |
|:---|:---|
| **รหัสปัญหา** | หมายเลขเฉพาะ |
| **วันที่ตรวจพบ** | เมื่อพบปัญหาครั้งแรก |
| **ระบบที่ได้รับผลกระทบ** | SIEM, EDR, log sources ฯลฯ |
| **ผลกระทบ** | แจ้งเตือนพลาด, FP, ประสิทธิภาพลดลง |
| **สาเหตุหลัก** | คำอธิบายทางเทคนิค |
| **การแก้ไข** | ขั้นตอนที่ดำเนินการ |
| **การป้องกัน** | การเปลี่ยนแปลงเพื่อป้องกันการเกิดซ้ำ |

## คำสั่งวินิจฉัยอ้างอิง

| วัตถุประสงค์ | คำสั่ง | แพลตฟอร์ม |
|:---|:---|:---|
| ตรวจสอบสถานะบริการ | `systemctl status <service>` | Linux |
| ดูล็อกล่าสุด | `journalctl -u <service> --since "1 hour ago"` | Linux |
| ตรวจสอบพื้นที่ดิสก์ | `df -h` | Linux/macOS |
| ทดสอบการเชื่อมต่อ TCP | `nc -zv <host> <port>` | Linux/macOS |
| ตรวจสอบ DNS | `dig <hostname>` / `nslookup <hostname>` | ทั้งหมด |
| ตรวจสอบ Container | `docker ps` / `docker logs <container>` | Docker |

## สถานการณ์ความล้มเหลวเพิ่มเติม

### SIEM Alert ล่าช้า
1. ตรวจสอบสถานะ Queue ของ SIEM indexing
2. ตรวจสอบ Data pipeline (Kafka/Logstash)
3. ตรวจสอบพื้นที่จัดเก็บ Hot storage

### EDR Agent ไม่รายงาน
1. ตรวจสอบ Agent service บน Endpoint
2. ตรวจสอบการเชื่อมต่อเครือข่ายไปยัง EDR server
3. ตรวจสอบเวอร์ชัน Agent ว่ารองรับ

### SOAR Playbook ล้มเหลว
1. ตรวจสอบ API connectivity
2. ตรวจสอบ API key/token ว่าหมดอายุหรือไม่
3. ตรวจสอบ Rate limiting ของ API endpoint

## เอกสารที่เกี่ยวข้อง (Related Documents)
-   [กลยุทธ์การเชื่อมต่อเครื่องมือ](../03_User_Guides/Integration_Hub.th.md)
-   [การติดตั้ง SOC](../01_Onboarding/System_Activation.th.md)
-   [ขั้นตอนการ Deploy](../02_Platform_Operations/Deployment_Procedures.th.md)

### Quick Fix Reference

| Issue | First Action | Escalate If |
|:---|:---|:---|
| SIEM slow | Check indexer load | CPU > 90% for 30 min |
| No alerts | Verify log ingestion | Source offline > 15 min |
| Login failure | Reset password/MFA | Account locked 3x |
| Agent offline | Restart service | > 3 endpoints |

## References
-   [USE Method (Brendan Gregg)](https://www.brendangregg.com/usemethod.html)
-   [Google SRE Handbook](https://sre.google/sre-book/table-of-contents/)
