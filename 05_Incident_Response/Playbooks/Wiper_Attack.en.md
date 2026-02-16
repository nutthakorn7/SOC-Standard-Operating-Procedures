# Playbook: Wiper / Destructive Attack Response

**ID**: PB-38
**Severity**: Critical | **Category**: Impact
**MITRE ATT&CK**: [T1485](https://attack.mitre.org/techniques/T1485/) (Data Destruction), [T1561](https://attack.mitre.org/techniques/T1561/) (Disk Wipe), [T1490](https://attack.mitre.org/techniques/T1490/) (Inhibit System Recovery)
**Trigger**: EDR alert (mass file deletion), SIEM (MBR overwrite pattern), multiple systems offline simultaneously

> ⚠️ **CRITICAL**: Wiper attacks are IRREVERSIBLE. Speed is everything — isolate before the wiper propagates. Do NOT attempt to remediate on infected systems.

### Known Wiper Malware Families

```mermaid
graph TD
    Wiper["💀 Wiper Malware"] --> NotPetya["NotPetya (2017)\nSMB + EternalBlue"]
    Wiper --> Shamoon["Shamoon (2012)\nMBR overwrite"]
    Wiper --> WhisperGate["WhisperGate (2022)\nUkraine targeted"]
    Wiper --> HermeticWiper["HermeticWiper (2022)\nPartition corruption"]
    Wiper --> CaddyWiper["CaddyWiper (2022)\nFile + partition wipe"]
    Wiper --> Industroyer2["Industroyer2 (2022)\nOT/ICS targeted"]
    Wiper --> AcidRain["AcidRain (2022)\nModem/router wipe"]
    style Wiper fill:#660000,color:#fff
    style NotPetya fill:#cc0000,color:#fff
    style HermeticWiper fill:#cc0000,color:#fff
```

### Wiper Kill Chain

```mermaid
graph LR
    A["1️⃣ Access\nPhishing/Exploit"] --> B["2️⃣ Staging\nDrop wiper"]
    B --> C["3️⃣ Disable Recovery\nDelete VSS/backups"]
    C --> D["4️⃣ Propagation\nSMB/PsExec/GPO"]
    D --> E["5️⃣ Execution\nOverwrite MBR/files"]
    E --> F["6️⃣ Systems Offline\n💀"]
    style A fill:#ff9900,color:#fff
    style C fill:#ff4444,color:#fff
    style E fill:#cc0000,color:#fff
    style F fill:#660000,color:#fff
```

---

## Decision Flow

```mermaid
graph TD
    Alert["🚨 Destructive Activity Detected"] --> Type{"Type of destruction?"}
    Type -->|"MBR overwrite"| MBR["Systems unbootable\n💀 CRITICAL"]
    Type -->|"Mass file deletion"| Files["Mass delete/encrypt\nCheck if ransomware"]
    Type -->|"Volume shadow delete"| VSS["Recovery disabled\nPrecursor to wiper"]
    MBR --> Isolate["🔴 ISOLATE ALL AFFECTED SEGMENTS"]
    Files --> Ransom{"Ransom note present?"}
    Ransom -->|Yes| RansomPB["→ Ransomware Playbook PB-02"]
    Ransom -->|"No — Pure destruction"| Isolate
    VSS --> Monitor["Monitor for follow-up wiper"]
    Isolate --> Scope{"Spreading?"}
    Scope -->|Yes| Emergency["🚨 EMERGENCY\nSegment entire network"]
    Scope -->|"Contained to single host"| Investigate["Investigate wiper binary"]
    Emergency --> BCP["Activate BCP/DR"]
    style Alert fill:#ff4444,color:#fff
    style MBR fill:#660000,color:#fff
    style Emergency fill:#660000,color:#fff
```

### Incident Communication

```mermaid
sequenceDiagram
    participant SOC as SOC Analyst
    participant Manager as SOC Manager
    participant CISO
    participant CEO
    participant Legal
    participant BCP as BCP Team

    SOC->>Manager: 🚨 Wiper detected — multiple systems down
    Manager->>CISO: CRITICAL — destructive attack in progress
    CISO->>CEO: BCP activation required
    CISO->>Legal: Assess regulatory notification
    CISO->>BCP: Activate disaster recovery
    BCP->>BCP: Begin rebuild from clean backups
    SOC->>Manager: Status update every 30 minutes
    Manager->>CISO: Scope assessment: X systems affected
```

### Wiper Propagation Methods

```mermaid
graph TD
    Prop["Propagation Methods"] --> SMB["SMB/EternalBlue\nNetwork shares"]
    Prop --> PsExec["PsExec/WMI\nAdmin credentials"]
    Prop --> GPO["Group Policy\nDomain-wide deployment"]
    Prop --> Supply["Supply Chain\nSoftware update mechanism"]
    Prop --> USB["USB/Removable\nAir-gapped networks"]
    SMB --> Wide["🔴 Network-wide impact"]
    PsExec --> Wide
    GPO --> Wide
    style Prop fill:#333,color:#fff
    style Wide fill:#660000,color:#fff
```

### Response Timeline

```mermaid
gantt
    title Wiper Attack Response Timeline
    dateFormat HH:mm
    axisFormat %H:%M
    section Detection
        Alert triggered        :a1, 00:00, 5min
        Confirm destructive    :a2, after a1, 10min
    section Containment
        Network segmentation   :a3, after a2, 15min
        Isolate all affected   :a4, after a3, 30min
    section Recovery
        Assess backup status   :a5, after a4, 60min
        Begin rebuild          :a6, after a5, 180min
        System restoration     :a7, after a6, 480min
    section Hardening
        Root cause analysis    :a8, after a7, 120min
```

### Impact Severity Matrix

```mermaid
graph TD
    Impact["Impact Assessment"] --> Single{"Single host?"}
    Single -->|Yes| Low["🟡 Medium\nRebuild single system"]
    Single -->|Multiple| Domain{"Domain controller affected?"}
    Domain -->|No| Med["🟠 High\nMultiple system rebuild"]
    Domain -->|Yes| DC{"AD database intact?"}
    DC -->|Yes| High["🔴 Critical\nDC rebuild + credential reset"]
    DC -->|No| Cat["💀 Catastrophic\nFull AD rebuild from backup"]
    style Impact fill:#333,color:#fff
    style Cat fill:#660000,color:#fff
```

---

## 1. Immediate Actions (First 10 Minutes)

| # | Action | Owner |
|:---|:---|:---|
| 1 | **ISOLATE** affected network segments immediately | Network Team |
| 2 | Power OFF systems showing wiper activity (preserve evidence) | SOC T1 |
| 3 | Block lateral movement: disable SMB, PsExec, WMI | Network Team |
| 4 | Verify backup integrity BEFORE connecting backup systems | SOC T2 |
| 5 | Alert CISO — activate BCP/DR plan | SOC Manager |
| 6 | Preserve at least ONE infected system for forensics | IR Team |

## 2. Investigation Checklist

### Malware Analysis
- [ ] Capture wiper binary (if system still running)
- [ ] Identify wiper family (hash lookup in VT, MalwareBazaar)
- [ ] Determine propagation mechanism (SMB, PsExec, GPO, scheduled task)
- [ ] Check for self-propagation capabilities
- [ ] Identify kill switch or C2 communication

### Scope Assessment
- [ ] How many systems are affected?
- [ ] Is the wiper still spreading?
- [ ] Are domain controllers compromised?
- [ ] Are backups accessible and clean?
- [ ] Are OT/ICS systems at risk?

### Initial Access
- [ ] How did the wiper enter the network?
- [ ] Check email logs for initial phishing
- [ ] Check VPN/RDP logs for unauthorized access
- [ ] Review supply chain components

## 3. Containment

| Priority | Action | Details |
|:---|:---|:---|
| **P0** | Network segmentation | Block all SMB (445), RDP (3389) between VLANs |
| **P0** | Disable admin shares | `net share C$ /delete` across network |
| **P1** | Disconnect backups | Ensure backup networks are air-gapped |
| **P1** | Disable scheduled tasks | Remove GPO-deployed tasks |
| **P2** | Block C2 domains/IPs | Firewall + DNS sinkhole |

## 4. Eradication & Recovery

### Recovery Priority
1. **Domain Controllers** — Rebuild AD from clean backup
2. **DNS/DHCP** — Restore network services
3. **Backup infrastructure** — Verify and protect
4. **Critical business systems** — ERP, email, file servers
5. **Workstations** — Reimage from gold image

### Recovery Checklist
- [ ] Verify backup integrity before restoration
- [ ] Rebuild systems from clean images (not from infected backups)
- [ ] Reset ALL domain credentials (including KRBTGT twice)
- [ ] Re-deploy EDR agents on rebuilt systems
- [ ] Implement network segmentation before reconnecting

## 5. Post-Incident

### Lessons Learned
| Question | Answer |
|:---|:---|
| Was the wiper detected before execution? | [Timeline] |
| Were backups properly air-gapped? | [Yes/No] |
| How fast was network segmentation? | [Time] |
| Was BCP/DR plan effective? | [Assessment] |

### Recovery Metrics
| Metric | Target | Actual |
|:---|:---|:---|
| Time to detect | < 15 min | [Actual] |
| Time to contain | < 30 min | [Actual] |
| Systems affected | 0 | [Count] |
| Data permanently lost | 0 | [Assessment] |
| Time to full recovery | < 72h | [Actual] |

## 6. Detection Rules (Sigma)

```yaml
title: Volume Shadow Copy Deletion (Wiper Precursor)
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

```yaml
title: Mass File Deletion Pattern
logsource:
    product: windows
    category: file_delete
detection:
    selection:
        TargetFilename|endswith:
            - '.doc'
            - '.xls'
            - '.pdf'
            - '.mdb'
    timeframe: 1m
    condition: selection | count() > 100
    level: critical
```

## Related Documents
- [IR Framework](../Framework.en.md)
- [Sigma Rules Index](../../08_Detection_Engineering/sigma_rules/)
- [Ransomware Playbook](Ransomware.en.md)
- [Malware Infection Playbook](Malware_Infection.en.md)
- [Disaster Recovery & BCP](../Disaster_Recovery_BCP.en.md)
- [Tier 3 Runbook](../Runbooks/Tier3_Runbook.en.md)

## References
- [MITRE T1485 — Data Destruction](https://attack.mitre.org/techniques/T1485/)
- [CISA — Destructive Malware](https://www.cisa.gov/news-events/cybersecurity-advisories)
- [Microsoft — Wiper Malware Analysis](https://www.microsoft.com/en-us/security/blog/)
