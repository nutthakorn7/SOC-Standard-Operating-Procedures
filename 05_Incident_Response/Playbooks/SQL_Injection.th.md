# Playbook: การตอบสนอง SQL Injection

**ID**: PB-37
**ความรุนแรง**: สูง | **ประเภท**: Initial Access / Web Application
**MITRE ATT&CK**: [T1190](https://attack.mitre.org/techniques/T1190/) (Exploit Public-Facing Application)
**Trigger**: WAF alert, SIEM correlation (SQL patterns ผิดปกติ), IDS signature, application error spike

> ⚠️ **วิกฤต**: SQL injection อาจนำไปสู่การโจมตี database ทั้งหมด, ขโมยข้อมูล, หรือรัน OS command ผ่าน `xp_cmdshell` หรือ `LOAD_FILE()`

### ประเภท SQL Injection

```mermaid
graph TD
    SQLi["🔴 SQL Injection"] --> Classic["Classic SQLi\n' OR 1=1 --"]
    SQLi --> Blind["Blind SQLi\nBoolean/Time-based"]
    SQLi --> Union["UNION-based\nExtract ตารางอื่น"]
    SQLi --> Error["Error-based\nข้อมูล DB ใน error"]
    SQLi --> Stacked["Stacked Queries\nหลายคำสั่ง"]
    SQLi --> OOB["Out-of-Band\nDNS/HTTP exfil"]
    SQLi --> Second["Second-Order\nเก็บแล้วทำงานทีหลัง"]
    style SQLi fill:#ff4444,color:#fff
    style Stacked fill:#cc0000,color:#fff
    style OOB fill:#cc0000,color:#fff
```

### ลำดับการโจมตี

```mermaid
graph LR
    A["1️⃣ สำรวจ\nParameter fuzzing"] --> B["2️⃣ Injection\nสร้าง payload"]
    B --> C["3️⃣ ดึงข้อมูล\nUNION/Blind"]
    C --> D["4️⃣ Privilege Escalation\nDB admin access"]
    D --> E["5️⃣ OS Command\nxp_cmdshell/UDF"]
    E --> F["6️⃣ Compromise เต็มรูป\nLateral movement"]
    style A fill:#ffcc00,color:#000
    style B fill:#ff9900,color:#fff
    style C fill:#ff6600,color:#fff
    style D fill:#ff4444,color:#fff
    style E fill:#cc0000,color:#fff
    style F fill:#660000,color:#fff
```

---

## Decision Flow

```mermaid
graph TD
    Alert["🚨 ตรวจพบ SQLi"] --> Source{"แหล่ง Alert?"}
    Source -->|WAF| WAF["ตรวจ WAF logs\nBlock หรือผ่าน?"]
    Source -->|SIEM| SIEM["ตรวจ DB query logs"]
    Source -->|IDS| IDS["ตรวจ network payload"]
    WAF --> Blocked{"Request ถูก block?"}
    Blocked -->|ใช่| Monitor["ตรวจติดตามต่อเนื่อง\nเช็ค endpoint อื่น"]
    Blocked -->|"ไม่ — ผ่านเข้ามา"| Confirm["🔴 ยืนยัน SQLi"]
    SIEM --> Confirm
    IDS --> Confirm
    Confirm --> Assess{"ข้อมูลถูกเข้าถึง?"}
    Assess -->|"Schema/metadata เท่านั้น"| Medium["🟡 ปานกลาง — ขั้นสำรวจ"]
    Assess -->|"ข้อมูลผู้ใช้ถูกดึง"| High["🔴 สูง — Data breach"]
    Assess -->|"OS commands ถูกรัน"| Critical["💀 วิกฤต — Full compromise"]
    High --> Contain["CONTAIN & แจ้ง"]
    Critical --> Contain
    style Alert fill:#ff4444,color:#fff
    style Confirm fill:#cc0000,color:#fff
    style Critical fill:#660000,color:#fff
```

### ขั้นตอนการสืบสวน

```mermaid
sequenceDiagram
    participant WAF
    participant SOC as SOC Analyst
    participant DBA as DB Admin
    participant Dev as Dev Team
    participant IR as IR Team

    WAF->>SOC: 🚨 ตรวจพบ SQLi pattern
    SOC->>WAF: ดึง request logs ทั้งหมด (URI, params, body)
    SOC->>DBA: ขอ DB query audit logs
    DBA->>SOC: ส่ง queries ที่น่าสงสัย
    SOC->>SOC: เปรียบเทียบ WAF + DB logs (timestamp match)
    SOC->>IR: ยืนยัน SQLi — escalate
    IR->>DBA: ตรวจข้อมูลที่ถูกเข้าถึง (tables, rows)
    IR->>Dev: ระบุ endpoint ที่มีช่องโหว่
    Dev->>Dev: Deploy hotfix (parameterized queries)
    IR->>SOC: ประเมินขอบเขต data breach
```

### การประเมินผลกระทบ Database

```mermaid
graph TD
    subgraph "Level 1: สำรวจ"
        L1A["Version query\nSELECT @@version"]
        L1B["Schema enumeration\nINFORMATION_SCHEMA"]
        L1C["Table listing\nSHOW TABLES"]
    end
    subgraph "Level 2: เข้าถึงข้อมูล"
        L2A["อ่านข้อมูลผู้ใช้\nSELECT from users"]
        L2B["ขโมย credential\npassword hashes"]
        L2C["ข้อมูลการเงิน\ntransactions, PII"]
    end
    subgraph "Level 3: Compromise ระบบ"
        L3A["อ่านไฟล์\nLOAD_FILE()"]
        L3B["เขียนไฟล์\nINTO OUTFILE"]
        L3C["OS commands\nxp_cmdshell"]
    end
    style L1A fill:#ffcc00,color:#000
    style L2B fill:#ff6600,color:#fff
    style L3C fill:#cc0000,color:#fff
```

### ประสิทธิภาพ WAF Rules

```mermaid
pie title SQLi Detection โดย WAF Rule
    "Classic patterns blocked" : 45
    "Encoded payloads blocked" : 20
    "Blind SQLi detected" : 15
    "Bypassed (0-day)" : 10
    "False positives" : 10
```

### Timeline การตอบสนอง

```mermaid
gantt
    title SQL Injection Response Timeline
    dateFormat HH:mm
    axisFormat %H:%M
    section Detection
        WAF/IDS alert          :a1, 00:00, 5min
        Log correlation        :a2, after a1, 15min
    section Containment
        Block attacker IP      :a3, after a2, 5min
        WAF emergency rules    :a4, after a3, 10min
    section Investigation
        วิเคราะห์ request      :a5, after a4, 30min
        ประเมินผลกระทบ DB     :a6, after a5, 60min
        ขอบเขต data breach    :a7, after a6, 60min
    section Recovery
        Deploy code fix        :a8, after a7, 120min
        WAF rule hardening     :a9, after a8, 60min
```

---

## 1. การดำเนินการทันที (15 นาทีแรก)

| # | การดำเนินการ | ผู้รับผิดชอบ |
|:---|:---|:---|
| 1 | Block IP ผู้โจมตีที่ WAF/firewall | SOC T1 |
| 2 | เปิด WAF rules เข้มงวดสำหรับ SQLi | SOC T1 |
| 3 | เก็บ HTTP request logs เต็มรูปแบบ (headers, body, params) | SOC T2 |
| 4 | ขอ database query audit logs จาก DBA | SOC T2 |
| 5 | ระบุ application endpoint ที่มีช่องโหว่ | Dev Team |
| 6 | ตรวจว่าข้อมูลถูกนำออกหรือไม่ (response sizes, timing) | SOC T2 |

## 2. รายการตรวจสอบการสืบสวน

### วิเคราะห์ WAF/Web Server
- [ ] HTTP requests ที่มี SQLi patterns ทั้งหมด (URI, params, POST body)
- [ ] IP ผู้โจมตี, User-Agent, ที่ตั้งทางภูมิศาสตร์
- [ ] ความถี่และรูปแบบเวลาของ requests
- [ ] ตรวจ encoding bypasses (URL, Unicode, hex, double encoding)
- [ ] ตรวจว่า requests ถูก block หรือผ่านเข้ามา

### วิเคราะห์ Database
- [ ] เปิดและตรวจ query audit logs
- [ ] ตรวจ `UNION SELECT`, `INFORMATION_SCHEMA`, `@@version`
- [ ] ตรวจ `xp_cmdshell`, `LOAD_FILE()`, `INTO OUTFILE`
- [ ] ตรวจ privileges ของ database user (รันเป็น DBA/root หรือไม่?)
- [ ] ประเมิน tables/rows ที่ถูกเข้าถึง
- [ ] ตรวจ database users ใหม่หรือการเปลี่ยนแปลง privileges

### วิเคราะห์ Application
- [ ] ระบุ code ที่มีช่องโหว่ (ไม่ใช้ parameterized queries)
- [ ] ตรวจว่า ORM ใช้ถูกต้องหรือไม่
- [ ] ตรวจ input validation และ sanitization
- [ ] ตรวจ stored procedures ที่มี dynamic SQL

## 3. การควบคุม (Containment)

| ขอบเขต | การดำเนินการ | รายละเอียด |
|:---|:---|:---|
| **เครือข่าย** | Block IP ผู้โจมตี | WAF + Firewall rules |
| **WAF** | Emergency SQLi rules | Block payloads ทั่วไป |
| **Application** | ปิด endpoint ที่มีช่องโหว่ | หน้า maintenance ชั่วคราว |
| **Database** | เพิกถอน privileges เกิน | Least-privilege สำหรับ app accounts |
| **Credentials** | หมุนเวียน DB passwords | ทุก application DB connections |

## 4. การกำจัดและกู้คืน

### Code Fixes (ลำดับความสำคัญ)
1. **Parameterized queries** — แทนที่ string concatenation ใน SQL ทั้งหมด
2. **Input validation** — Whitelist ตัวอักษรที่อนุญาตต่อ field
3. **WAF rules** — Deploy SQLi signatures เฉพาะ
4. **DB hardening** — ลบ `xp_cmdshell`, ปิด `LOAD_FILE()`
5. **Least privilege** — App DB accounts มี permissions น้อยที่สุด

### SIEM Detection Queries
```sql
-- Splunk: ตรวจจับ SQLi patterns ใน web logs
index=web sourcetype=access_combined
| regex uri_query="(?i)(union\s+select|information_schema|or\s+1\s*=\s*1|waitfor\s+delay|benchmark\s*\(|sleep\s*\()"
| stats count by src_ip, uri_path, uri_query
| where count > 5
```

## 5. Evidence Checklist

| ประเภทหลักฐาน | สิ่งที่ต้องเก็บ | แหล่งข้อมูล | เหตุผลที่ต้องเก็บ |
|:---|:---|:---|:---|
| หลักฐาน request | full URI, parameter, header, body, encoding style, timestamp | WAF / web logs | ใช้ reconstruct injection path และ bypass technique |
| หลักฐาน database | query log, table ที่โดน, privilege ของ DB user, error trace | DB audit / DBA logs | ใช้ยืนยันว่าผลกระทบถึง database และข้อมูลส่วนใดบ้าง |
| หลักฐานแอปพลิเคชัน | vulnerable code path, stack trace, release/version context | App logs / APM / code review | ใช้ผูกเหตุเข้ากับ defect ที่ต้องแก้ |
| หลักฐานของ response | returned row, response size, timing anomaly, error page | Access logs / app metrics | ใช้ดูว่ามี data extraction หรือ blind SQLi สำเร็จหรือไม่ |
| หลักฐานโครงสร้างพื้นฐาน | action ของ WAF, firewall, endpoint change ชั่วคราว | WAF / firewall / change tickets | ใช้ประกอบ containment timeline และบทเรียน |

---

## 6. Minimum Telemetry Required

| แหล่ง Telemetry | ใช้เพื่ออะไร | ความสำคัญ | Blind Spot ถ้าไม่มี |
|:---|:---|:---:|:---|
| WAF และ web access logs | ดู payload pattern, source IP, target endpoint, block/pass status | Required | ระบุ injection vector และพฤติกรรมต้นทางไม่ได้ |
| Database audit logs | ดู query abuse, table access, privilege abuse, data extraction | Required | พิสูจน์ผลกระทบต่อข้อมูลไม่ได้ |
| Application และ APM logs | ดู error condition, code path, auth/session context | Required | บอกไม่ได้ว่า payload ไปถึง logic ที่ exploitable หรือไม่ |
| Change และ release records | ดู code change หรือ config regression ล่าสุด | Recommended | root cause analysis ช้าลงและโทษผิดจุดได้ |
| DLP หรือ data classification context | ดูความอ่อนไหวของข้อมูลที่อาจถูกนำออก | Recommended | ขอบเขตการแจ้งเตือนไม่ชัด |

---

## 7. False Positive และ Tuning Guide

| Scenario | ทำไมจึงดูน่าสงสัย | วิธีตรวจสอบ | Tuning Action | ต้องยกระดับเมื่อ |
|:---|:---|:---|:---|:---|
| security scan หรือ DAST run | test payload ตั้งใจให้เหมือน SQLi | ยืนยัน scanner source, schedule, และ endpoint scope | allowlist source range และ test header ในช่วงเวลาที่อนุมัติ | request โผล่นอกเวลา หรือไปโดน production data path ที่ไม่ควร |
| business input ที่ encode ซับซ้อนแต่ถูกต้อง | search syntax หรือ special char อาจดูเหมือน payload | reproduce กับ application owner และดูการจัดการฝั่ง server | tune exception เฉพาะ parameter ไม่ผ่อนกฎทั้งชุด | source เดียวกันเริ่ม schema probing หรือ timing payload |
| QA หรือ pre-release validation | test automation อาจสร้าง query string ที่ error เยอะ | ยืนยัน testing window และ environment | ลด severity เฉพาะ QA identity และ path ที่อนุมัติ | traffic ไปโดน production หรือมี DB-side indicator ร่วม |
| WAF normalization gap | double-encoding ทำให้เกิด partial match noise | validate decoded payload และดูพฤติกรรม downstream | tune เรื่อง normalization/decoding consistency ก่อน suppress | decoded content ยัง probing schema, delay, หรือ extraction pattern |

---

## 8. หลังเหตุการณ์ (Post-Incident)

### บทเรียน
| คำถาม | คำตอบ |
|:---|:---|
| Application ใช้ parameterized queries หรือไม่? | [บันทึก] |
| WAF ตรวจจับและ block ได้หรือไม่? | [ใช่/ไม่ — rule gap?] |
| Database privileges กำหนดถูกต้องหรือไม่? | [บันทึกช่องว่าง] |
| ข้อมูลถูกนำออกหรือไม่? ต้องแจ้ง PDPA? | [ประเมิน] |

## 9. Detection Rules (Sigma)

```yaml
title: SQL Injection Attempt in Web Logs
logsource:
    category: webserver
detection:
    selection:
        cs-uri-query|contains:
            - 'UNION SELECT'
            - 'INFORMATION_SCHEMA'
            - 'xp_cmdshell'
            - "' OR 1=1"
            - 'WAITFOR DELAY'
            - 'BENCHMARK('
    condition: selection
    level: high
```

## เอกสารที่เกี่ยวข้อง
- [Web Attack Playbook](Web_Attack.th.md)
- [Data Exfiltration Playbook](Data_Exfiltration.th.md)
- [Exploit Playbook](Exploit.th.md)
- [คู่มือ Tier 2](../Runbooks/Tier2_Runbook.th.md)

## References
- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [MITRE T1190](https://attack.mitre.org/techniques/T1190/)
- [SQLi Cheat Sheet — PortSwigger](https://portswigger.net/web-security/sql-injection/cheat-sheet)
