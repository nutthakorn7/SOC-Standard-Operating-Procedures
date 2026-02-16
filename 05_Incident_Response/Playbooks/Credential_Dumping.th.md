# Playbook: การตอบสนอง Credential Dumping

**ID**: PB-36
**ความรุนแรง**: วิกฤต | **ประเภท**: Credential Access
**MITRE ATT&CK**: [T1003](https://attack.mitre.org/techniques/T1003/) (OS Credential Dumping), [T1003.001](https://attack.mitre.org/techniques/T1003/001/) (LSASS Memory), [T1003.002](https://attack.mitre.org/techniques/T1003/002/) (SAM), [T1003.003](https://attack.mitre.org/techniques/T1003/003/) (NTDS)
**Trigger**: EDR alert (LSASS access), SIEM (Mimikatz signature), กระบวนการที่เข้าถึง credential stores ผิดปกติ

> ⚠️ **วิกฤต**: Credential dumping หมายความว่าผู้โจมตีมี privileged access แล้ว สันนิษฐานว่า credentials ทั้งหมดบนเครื่องถูกขโมย ต้อง reset password ทันที

### Attack Kill Chain

```mermaid
graph LR
    A["1️⃣ Initial Access"] --> B["2️⃣ Privilege Escalation"]
    B --> C["3️⃣ Credential Dumping"]
    C --> D["4️⃣ Lateral Movement"]
    D --> E["5️⃣ Domain Dominance"]
    style A fill:#ffcc00,color:#000
    style B fill:#ff9900,color:#fff
    style C fill:#ff4444,color:#fff
    style D fill:#cc0000,color:#fff
    style E fill:#660000,color:#fff
```

### เครื่องมือ Credential Dumping ที่พบบ่อย

```mermaid
graph TD
    CredDump["🔓 Credential Dumping"] --> Mimikatz["Mimikatz\nsekurlsa::logonpasswords"]
    CredDump --> ProcDump["ProcDump\nlsass.exe dump"]
    CredDump --> Comsvcs["comsvcs.dll\nMiniDump"]
    CredDump --> NtdsUtil["ntdsutil.exe\nAD database"]
    CredDump --> SecretsDump["secretsdump.py\nImpacket"]
    CredDump --> LaZagne["LaZagne\nBrowser/App creds"]
    CredDump --> RegSave["reg save\nSAM/SYSTEM hives"]
    style CredDump fill:#ff4444,color:#fff
    style Mimikatz fill:#cc3333,color:#fff
    style ProcDump fill:#cc3333,color:#fff
    style NtdsUtil fill:#cc3333,color:#fff
```

---

## Decision Flow

```mermaid
graph TD
    Alert["🚨 ตรวจพบ Credential Dump"] --> Verify{"ตรวจสอบ Alert"}
    Verify -->|"LSASS access"| LSASS["ตรวจ process ที่เข้าถึง LSASS"]
    Verify -->|"SAM/NTDS"| Registry["ตรวจ registry/file access"]
    Verify -->|"พบเครื่องมือ"| Tool["ระบุเครื่องมือ: Mimikatz/ProcDump/อื่นๆ"]
    LSASS --> Legit{"Process ปกติ?"}
    Registry --> Legit
    Tool --> Legit
    Legit -->|"ไม่ — ยืนยันการ dump"| Contain["🔴 CONTAIN ทันที"]
    Legit -->|"ใช่ — คาดหวัง"| FP["บันทึกเป็น False Positive"]
    Contain --> Isolate["แยกเครื่องออกจากเครือข่าย"]
    Isolate --> ResetCreds["บังคับ reset password ทุกบัญชีบนเครื่อง"]
    ResetCreds --> Investigate["สืบสวนเต็มรูปแบบ"]
    style Alert fill:#ff4444,color:#fff
    style Contain fill:#cc0000,color:#fff
    style Isolate fill:#990000,color:#fff
```

### ขั้นตอนการสืบสวน

```mermaid
sequenceDiagram
    participant EDR
    participant SOC as SOC Analyst
    participant AD as AD Admin
    participant IR as IR Team
    
    EDR->>SOC: 🚨 LSASS access alert
    SOC->>SOC: ตรวจสอบ process & parent process
    SOC->>EDR: ดึง process tree & memory dump
    SOC->>AD: ขอ logon audit สำหรับเครื่องที่ถูกโจมตี
    AD->>SOC: ส่งรายการบัญชีที่ authenticated
    SOC->>IR: Escalate — ยืนยัน credential dump
    IR->>AD: บังคับ reset password ทุกบัญชีที่ได้รับผลกระทบ
    IR->>SOC: เริ่ม hunt lateral movement
    SOC->>EDR: Sweep หาเครื่องมือเดียวกันทุก endpoint
```

### ประเภท Credential Dump

```mermaid
graph TB
    subgraph "Memory-Based"
        LSASS["LSASS Process\n(sekurlsa::logonpasswords)"]
        WDigest["WDigest\n(cleartext ใน memory)"]
        Kerberos["Kerberos Tickets\n(Pass-the-Ticket)"]
    end
    subgraph "File-Based"
        SAM["SAM Database\n(local accounts)"]
        NTDS["NTDS.dit\n(domain accounts)"]
        LSA["LSA Secrets\n(service accounts)"]
    end
    subgraph "Network-Based"
        DCSync["DCSync\n(replicate AD)"]
        LLMNR["LLMNR/NBT-NS\nPoisoning"]
        Kerberoast["Kerberoasting\n(SPN tickets)"]
    end
    style LSASS fill:#ff4444,color:#fff
    style NTDS fill:#ff4444,color:#fff
    style DCSync fill:#ff4444,color:#fff
```

### Timeline การตอบสนอง

```mermaid
gantt
    title Credential Dumping Response Timeline
    dateFormat HH:mm
    axisFormat %H:%M
    section Detection
        Alert triggered           :a1, 00:00, 5min
        Triage & verify           :a2, after a1, 10min
    section Containment
        แยกเครื่อง                :a3, after a2, 5min
        ปิดบัญชีที่ถูกโจมตี       :a4, after a3, 15min
    section Investigation
        วิเคราะห์ process tree    :a5, after a4, 30min
        Hunt lateral movement     :a6, after a5, 60min
        ตรวจสอบ credential ทั้งหมด :a7, after a6, 60min
    section Recovery
        Mass password reset       :a8, after a7, 120min
        เปิด Credential Guard     :a9, after a8, 60min
```

### การประเมินผลกระทบ

```mermaid
graph TD
    Impact["ประเมินผลกระทบ"] --> Local{"บัญชี local เท่านั้น?"}
    Local -->|ใช่| Low["🟡 ปานกลาง\nReset local admin passwords"]
    Local -->|"domain accounts"| Domain{"Domain Admin ถูกโจมตี?"}
    Domain -->|ไม่| Medium["🟠 สูง\nReset domain accounts ที่ได้รับผลกระทบ"]
    Domain -->|ใช่| DomAdmin{"KRBTGT / DC ถูกโจมตี?"}
    DomAdmin -->|ไม่| High["🔴 วิกฤต\nReset credential ทั้ง domain"]
    DomAdmin -->|ใช่| Catastrophic["💀 หายนะ\nต้อง rebuild AD ใหม่"]
    style Impact fill:#333,color:#fff
    style Catastrophic fill:#660000,color:#fff
    style High fill:#cc0000,color:#fff
```

---

## 1. การดำเนินการทันที (15 นาทีแรก)

| # | การดำเนินการ | ผู้รับผิดชอบ |
|:---|:---|:---|
| 1 | แยกเครื่องที่ได้รับผลกระทบ (EDR network isolation) | SOC T1 |
| 2 | เก็บ volatile memory ก่อนปิดเครื่อง | SOC T2 |
| 3 | ระบุบัญชีทั้งหมดที่ login อยู่บนเครื่อง | SOC T2 |
| 4 | ปิด/reset password สำหรับทุกบัญชีที่ระบุ | AD Admin |
| 5 | ตรวจหา LSASS dump files บน disk | SOC T2 |
| 6 | แจ้ง IR team — อาจเป็น domain compromise | SOC Manager |

## 2. รายการตรวจสอบการสืบสวน

### การวิเคราะห์ Host
- [ ] Process tree: process อะไรเข้าถึง LSASS? Parent process?
- [ ] ระบุเครื่องมือ: Mimikatz, ProcDump, comsvcs.dll, Task Manager?
- [ ] ตรวจหาไฟล์ `.dmp` ใน `%TEMP%`, `C:\Windows\Temp`, Desktop
- [ ] ตรวจ PowerShell history: `Get-Content (Get-PSReadLineOption).HistorySavePath`
- [ ] ตรวจ Sysmon Event ID 10 (ProcessAccess to lsass.exe)
- [ ] ตรวจคำสั่ง `reg save HKLM\SAM`, `reg save HKLM\SYSTEM`
- [ ] ตรวจ ntdsutil.exe หรือ vssadmin shadow copies

### การวิเคราะห์ Network
- [ ] ตรวจ DCSync traffic (DRSUAPI replication)
- [ ] ตรวจ LDAP queries สำหรับ SPNs (Kerberoasting)
- [ ] ตรวจ Pass-the-Hash (NTLM auth จาก IP ใหม่)
- [ ] ตรวจ lateral movement (RDP, WMI, PsExec, SMB) จากเครื่องที่ถูกโจมตี

### การวิเคราะห์ Active Directory
- [ ] ตรวจ Kerberos TGT/TGS requests จากเครื่องที่ถูกโจมตี
- [ ] ตรวจ service accounts ที่สร้างใหม่/แก้ไข
- [ ] ตรวจ Group Policy สำหรับ persistence
- [ ] ตรวจ KRBTGT account — วันที่เปลี่ยน password ล่าสุด

## 3. การควบคุม (Containment)

| ขอบเขต | การดำเนินการ | คำสั่ง |
|:---|:---|:---|
| **Host** | แยกเครือข่ายผ่าน EDR | `Isolate-Endpoint -HostId <ID>` |
| **บัญชี** | บังคับ reset password | `Set-ADAccountPassword -Identity <user>` |
| **Kerberos** | ลบ tickets | `klist purge` บนทุกเครื่องที่ได้รับผลกระทบ |
| **Service accts** | หมุนเวียน credentials | อัปเดต password service account ทั้งหมด |
| **Admin accounts** | ปิดและสร้างใหม่ | สร้างบัญชี admin ใหม่ชื่อต่างจากเดิม |

## 4. การกำจัดและกู้คืน

### ระยะสั้น
1. Reimage เครื่องที่ถูกโจมตี (อย่าเชื่อการ cleanup อย่างเดียว)
2. Reset password ทั้งหมดสำหรับบัญชีบนเครื่องที่ถูกโจมตี
3. หมุนเวียน service account credentials
4. Reset KRBTGT password **2 ครั้ง** (ถ้า domain admin ถูกโจมตี)
5. เพิกถอน Kerberos tickets ที่ active ทั้งหมด

### ระยะยาว
1. เปิด **Credential Guard** บน Windows 10/11 ทุกเครื่อง
2. Deploy **LSASS protection** (`RunAsPPL` registry key)
3. ใช้ **tiered admin model** (Tier 0/1/2)
4. ปิด WDigest authentication (`UseLogonCredential = 0`)
5. Deploy **Privileged Access Workstations (PAWs)**

## 5. หลังเหตุการณ์ (Post-Incident)

### บทเรียน
| คำถาม | คำตอบ |
|:---|:---|
| ผู้โจมตีได้ initial access อย่างไร? | [บันทึก] |
| Credential Guard เปิดใช้อยู่หรือไม่? | [ใช่/ไม่ — ถ้าไม่ เพราะอะไร?] |
| บัญชี admin แบ่ง tier ถูกต้องหรือไม่? | [บันทึกช่องว่าง] |
| Credentials ถูกเปิดเผยนานแค่ไหน? | [Timeline] |

### Hardening Checklist
- [ ] Credential Guard เปิดบนทุก endpoint ที่ join domain
- [ ] LSASS RunAsPPL เปิดใช้
- [ ] WDigest ปิดใช้
- [ ] Local admin passwords จัดการผ่าน LAPS
- [ ] Tiered admin model ใช้งาน
- [ ] Protected Users group กำหนดค่าสำหรับ privileged accounts

## 6. Detection Rules (Sigma)

```yaml
# ตรวจจับการเข้าถึง LSASS Memory
title: LSASS Memory Access by Non-System Process
logsource:
    product: windows
    category: process_access
detection:
    selection:
        TargetImage|endswith: '\lsass.exe'
        GrantedAccess|contains:
            - '0x1010'
            - '0x1410'
            - '0x1F0FFF'
    filter:
        SourceImage|endswith:
            - '\wmiprvse.exe'
            - '\taskmgr.exe'
            - '\procexp64.exe'
    condition: selection and not filter
    level: critical
```

```yaml
# ตรวจจับ SAM/SYSTEM Registry Hive Export
title: SAM Registry Hive Export
logsource:
    product: windows
    category: process_creation
detection:
    selection:
        CommandLine|contains|all:
            - 'reg'
            - 'save'
        CommandLine|contains:
            - 'HKLM\SAM'
            - 'HKLM\SYSTEM'
            - 'HKLM\SECURITY'
    condition: selection
    level: critical
```

## เอกสารที่เกี่ยวข้อง
- [Lateral Movement Playbook](Lateral_Movement.th.md)
- [Account Compromise Playbook](Account_Compromise.th.md)
- [Privilege Escalation Playbook](Privilege_Escalation.th.md)
- [Brute Force Playbook](Brute_Force.th.md)
- [คู่มือ Tier 2](../Runbooks/Tier2_Runbook.th.md)

## References
- [MITRE T1003 — OS Credential Dumping](https://attack.mitre.org/techniques/T1003/)
- [Microsoft — Credential Guard](https://learn.microsoft.com/en-us/windows/security/identity-protection/credential-guard/)
- [SANS — Detecting Mimikatz](https://www.sans.org/white-papers/)
