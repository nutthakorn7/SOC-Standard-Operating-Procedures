# Playbook: การตอบสนอง Wiper / การโจมตีแบบทำลาย

**ID**: PB-38
**ความรุนแรง**: วิกฤต | **ประเภท**: Impact
**MITRE ATT&CK**: [T1485](https://attack.mitre.org/techniques/T1485/) (Data Destruction), [T1561](https://attack.mitre.org/techniques/T1561/) (Disk Wipe), [T1490](https://attack.mitre.org/techniques/T1490/) (Inhibit System Recovery)
**Trigger**: EDR alert (ลบไฟล์จำนวนมาก), SIEM (MBR overwrite pattern), หลายระบบ offline พร้อมกัน

> ⚠️ **วิกฤต**: Wiper attacks เป็นการทำลายที่ย้อนกลับไม่ได้ ความเร็วคือทุกอย่าง — แยกก่อนที่ wiper จะแพร่กระจาย อย่าพยายาม remediate บนระบบที่ติด

### กลุ่ม Wiper Malware ที่รู้จัก

```mermaid
graph TD
    Wiper["💀 Wiper Malware"] --> NotPetya["NotPetya (2017)\nSMB + EternalBlue"]
    Wiper --> Shamoon["Shamoon (2012)\nMBR overwrite"]
    Wiper --> WhisperGate["WhisperGate (2022)\nมุ่งเป้ายูเครน"]
    Wiper --> HermeticWiper["HermeticWiper (2022)\nPartition corruption"]
    Wiper --> CaddyWiper["CaddyWiper (2022)\nลบไฟล์ + partition"]
    Wiper --> Industroyer2["Industroyer2 (2022)\nมุ่งเป้า OT/ICS"]
    Wiper --> AcidRain["AcidRain (2022)\nลบ Modem/router"]
    style Wiper fill:#660000,color:#fff
    style NotPetya fill:#cc0000,color:#fff
    style HermeticWiper fill:#cc0000,color:#fff
```

### Wiper Kill Chain

```mermaid
graph LR
    A["1️⃣ เข้าถึง\nPhishing/Exploit"] --> B["2️⃣ เตรียม\nวาง wiper"]
    B --> C["3️⃣ ปิด Recovery\nลบ VSS/backup"]
    C --> D["4️⃣ แพร่กระจาย\nSMB/PsExec/GPO"]
    D --> E["5️⃣ ทำงาน\nOverwrite MBR/ไฟล์"]
    E --> F["6️⃣ ระบบล่ม\n💀"]
    style A fill:#ff9900,color:#fff
    style C fill:#ff4444,color:#fff
    style E fill:#cc0000,color:#fff
    style F fill:#660000,color:#fff
```

---

## Decision Flow

```mermaid
graph TD
    Alert["🚨 ตรวจพบกิจกรรมทำลาย"] --> Type{"ประเภทการทำลาย?"}
    Type -->|"MBR overwrite"| MBR["ระบบ boot ไม่ได้\n💀 วิกฤต"]
    Type -->|"ลบไฟล์จำนวนมาก"| Files["ลบ/เข้ารหัสจำนวนมาก\nตรวจว่าเป็น ransomware"]
    Type -->|"ลบ Shadow copy"| VSS["Recovery ถูกปิด\nสัญญาณก่อน wiper"]
    MBR --> Isolate["🔴 แยกทุก SEGMENT ที่ได้รับผลกระทบ"]
    Files --> Ransom{"มี Ransom note?"}
    Ransom -->|ใช่| RansomPB["→ Ransomware Playbook PB-02"]
    Ransom -->|"ไม่ — ทำลายล้วน"| Isolate
    VSS --> Monitor["ตรวจติดตาม wiper ตามมา"]
    Isolate --> Scope{"กำลังแพร่กระจาย?"}
    Scope -->|ใช่| Emergency["🚨 ฉุกเฉิน\nแบ่ง segment ทั้งเครือข่าย"]
    Scope -->|"จำกัดเครื่องเดียว"| Investigate["สืบสวน wiper binary"]
    Emergency --> BCP["เปิดใช้ BCP/DR"]
    style Alert fill:#ff4444,color:#fff
    style MBR fill:#660000,color:#fff
    style Emergency fill:#660000,color:#fff
```

### การสื่อสารเหตุการณ์

```mermaid
sequenceDiagram
    participant SOC as SOC Analyst
    participant Manager as SOC Manager
    participant CISO
    participant CEO
    participant Legal
    participant BCP as BCP Team

    SOC->>Manager: 🚨 พบ Wiper — หลายระบบล่ม
    Manager->>CISO: วิกฤต — การโจมตีทำลายกำลังดำเนินอยู่
    CISO->>CEO: ต้องเปิด BCP
    CISO->>Legal: ประเมินการแจ้้งตามกฎหมาย
    CISO->>BCP: เปิดแผน disaster recovery
    BCP->>BCP: เริ่ม rebuild จาก clean backups
    SOC->>Manager: อัปเดตสถานะทุก 30 นาที
    Manager->>CISO: ประเมินขอบเขต: X ระบบได้รับผลกระทบ
```

### วิธีการแพร่กระจายของ Wiper

```mermaid
graph TD
    Prop["วิธีแพร่กระจาย"] --> SMB["SMB/EternalBlue\nNetwork shares"]
    Prop --> PsExec["PsExec/WMI\nAdmin credentials"]
    Prop --> GPO["Group Policy\nDeploy ทั้ง domain"]
    Prop --> Supply["Supply Chain\nผ่าน software update"]
    Prop --> USB["USB/Removable\nเครือข่าย air-gapped"]
    SMB --> Wide["🔴 ผลกระทบทั้งเครือข่าย"]
    PsExec --> Wide
    GPO --> Wide
    style Prop fill:#333,color:#fff
    style Wide fill:#660000,color:#fff
```

### Timeline การตอบสนอง

```mermaid
gantt
    title Wiper Attack Response Timeline
    dateFormat HH:mm
    axisFormat %H:%M
    section Detection
        Alert triggered        :a1, 00:00, 5min
        ยืนยันการทำลาย         :a2, after a1, 10min
    section Containment
        Network segmentation   :a3, after a2, 15min
        แยกเครื่องทั้งหมด      :a4, after a3, 30min
    section Recovery
        ตรวจสถานะ backup       :a5, after a4, 60min
        เริ่ม rebuild           :a6, after a5, 180min
        กู้คืนระบบ              :a7, after a6, 480min
    section Hardening
        Root cause analysis    :a8, after a7, 120min
```

### การประเมินผลกระทบ

```mermaid
graph TD
    Impact["ประเมินผลกระทบ"] --> Single{"เครื่องเดียว?"}
    Single -->|ใช่| Low["🟡 ปานกลาง\nRebuild ระบบเดียว"]
    Single -->|หลายเครื่อง| Domain{"Domain controller ได้รับผลกระทบ?"}
    Domain -->|ไม่| Med["🟠 สูง\nRebuild หลายระบบ"]
    Domain -->|ใช่| DC{"AD database ยังอยู่?"}
    DC -->|ใช่| High["🔴 วิกฤต\nRebuild DC + reset credentials"]
    DC -->|ไม่| Cat["💀 หายนะ\nFull AD rebuild จาก backup"]
    style Impact fill:#333,color:#fff
    style Cat fill:#660000,color:#fff
```

---

## 1. การดำเนินการทันที (10 นาทีแรก)

| # | การดำเนินการ | ผู้รับผิดชอบ |
|:---|:---|:---|
| 1 | **แยก** network segments ที่ได้รับผลกระทบทันที | Network Team |
| 2 | ปิดเครื่องที่แสดงกิจกรรม wiper (เก็บหลักฐาน) | SOC T1 |
| 3 | Block lateral movement: ปิด SMB, PsExec, WMI | Network Team |
| 4 | ตรวจ backup integrity ก่อนเชื่อมต่อ backup systems | SOC T2 |
| 5 | แจ้ง CISO — เปิดแผน BCP/DR | SOC Manager |
| 6 | เก็บเครื่องที่ติดอย่างน้อย 1 เครื่องสำหรับ forensics | IR Team |

## 2. รายการตรวจสอบการสืบสวน

### วิเคราะห์ Malware
- [ ] เก็บ wiper binary (ถ้าระบบยังทำงาน)
- [ ] ระบุกลุ่ม wiper (hash lookup ใน VT, MalwareBazaar)
- [ ] ระบุวิธีแพร่กระจาย (SMB, PsExec, GPO, scheduled task)
- [ ] ตรวจความสามารถ self-propagation
- [ ] ระบุ kill switch หรือ C2 communication

### ประเมินขอบเขต
- [ ] กี่ระบบได้รับผลกระทบ?
- [ ] Wiper ยังแพร่กระจายอยู่หรือไม่?
- [ ] Domain controllers ถูกโจมตีหรือไม่?
- [ ] Backups เข้าถึงได้และสะอาดหรือไม่?
- [ ] ระบบ OT/ICS มีความเสี่ยงหรือไม่?

## 3. การควบคุม (Containment)

| ลำดับ | การดำเนินการ | รายละเอียด |
|:---|:---|:---|
| **P0** | Network segmentation | Block SMB (445), RDP (3389) ระหว่าง VLANs |
| **P0** | ปิด admin shares | `net share C$ /delete` ทั้งเครือข่าย |
| **P1** | ตัด backups | ให้ backup networks เป็น air-gapped |
| **P1** | ปิด scheduled tasks | ลบ GPO-deployed tasks |
| **P2** | Block C2 domains/IPs | Firewall + DNS sinkhole |

## 4. การกำจัดและกู้คืน

### ลำดับการกู้คืน
1. **Domain Controllers** — Rebuild AD จาก clean backup
2. **DNS/DHCP** — กู้คืน network services
3. **Backup infrastructure** — ตรวจและปกป้อง
4. **ระบบธุรกิจสำคัญ** — ERP, email, file servers
5. **Workstations** — Reimage จาก gold image

## 5. หลังเหตุการณ์ (Post-Incident)

### บทเรียน
| คำถาม | คำตอบ |
|:---|:---|
| Wiper ถูกตรวจจับก่อนทำงานหรือไม่? | [Timeline] |
| Backups เป็น air-gapped อย่างถูกต้องหรือไม่? | [ใช่/ไม่] |
| Network segmentation ทำได้เร็วแค่ไหน? | [เวลา] |
| แผน BCP/DR มีประสิทธิภาพหรือไม่? | [ประเมิน] |

## 6. Detection Rules (Sigma)

```yaml
title: Volume Shadow Copy Deletion (สัญญาณก่อน Wiper)
logsource:
    product: windows
    category: process_creation
detection:
    selection:
        CommandLine|contains:
            - 'vssadmin delete shadows'
            - 'wmic shadowcopy delete'
            - 'bcdedit /set.*recoveryenabled.*no'
            - 'wbadmin delete catalog'
    condition: selection
    level: critical
```

## เอกสารที่เกี่ยวข้อง
- [Ransomware Playbook](Ransomware.th.md)
- [Malware Infection Playbook](Malware_Infection.th.md)
- [Disaster Recovery & BCP](../Disaster_Recovery_BCP.th.md)
- [คู่มือ Tier 3](../Runbooks/Tier3_Runbook.th.md)

## References
- [MITRE T1485 — Data Destruction](https://attack.mitre.org/techniques/T1485/)
- [CISA — Destructive Malware](https://www.cisa.gov/news-events/cybersecurity-advisories)
- [Microsoft — Wiper Malware Analysis](https://www.microsoft.com/en-us/security/blog/)
