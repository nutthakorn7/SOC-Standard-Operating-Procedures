# Playbook: DNS Tunneling

**ID**: PB-25
**ระดับความรุนแรง**: สูง | **หมวดหมู่**: เครือข่าย / การนำข้อมูลออก
**MITRE ATT&CK**: [T1071.004](https://attack.mitre.org/techniques/T1071/004/) (Application Layer Protocol: DNS)
**ทริกเกอร์**: DNS analytics alert (high entropy), SIEM (excessive NXDOMAIN/TXT), IDS/IPS signature


## หลังเหตุการณ์ (Post-Incident)

- [ ] บล็อก DNS-over-HTTPS endpoints ที่ไม่ได้รับอนุญาต
- [ ] ใช้ DNS sinkholing สำหรับ C2 domains
- [ ] ทบทวน DNS inspection coverage
- [ ] สร้าง detection rule สำหรับ high-entropy DNS queries
- [ ] ใช้ DNS logging เฝ้าระวังอย่างต่อเนื่อง
- [ ] จัดทำ [Incident Report](../../11_Reporting_Templates/incident_report.th.md)

### ผังการตรวจจับ DNS Tunneling

```mermaid
graph LR
    DNS["📡 DNS Query"] --> Analyze{"🔍 วิเคราะห์"}
    Analyze -->|Entropy สูง| Suspect["🟠 น่าสงสัย"]
    Analyze -->|Query ยาว >50 char| Suspect
    Analyze -->|TXT record มาก| Suspect
    Analyze -->|NXDOMAIN มาก| Suspect
    Suspect --> Correlate["🔗 Correlate: host + process"]
    Correlate --> Confirm["🔴 ยืนยัน Tunnel"]
    style DNS fill:#3498db,color:#fff
    style Suspect fill:#f39c12,color:#fff
    style Confirm fill:#e74c3c,color:#fff
```

### ผังขั้นตอน RPZ Sinkhole

```mermaid
sequenceDiagram
    participant Host
    participant DNS as DNS Resolver
    participant RPZ as RPZ Zone
    participant SOC
    Host->>DNS: query: data.evil.com
    DNS->>RPZ: ตรวจ RPZ policy
    RPZ-->>DNS: NXDOMAIN (blocked!)
    DNS-->>Host: NXDOMAIN
    RPZ->>SOC: 📋 Log blocked query
    SOC->>SOC: ระบุ infected host
```

---

## ผังการตัดสินใจ

```mermaid
graph TD
    Alert["🚨 DNS ผิดปกติ"] --> Indicator{"📊 ตัวบ่งชี้?"}
    Indicator -->|Entropy สูง| Entropy["🔤 Subdomain ยาว/สุ่ม"]
    Indicator -->|Query rate สูง| Volume["📈 ปริมาณสูงผิดปกติ"]
    Indicator -->|TXT/NULL สูง| Type["📋 Record type ผิดปกติ"]
    Entropy --> Domain["🌐 ระบุ Tunnel Domain"]
    Volume --> Domain
    Type --> Domain
    Domain --> Tool{"🔧 เครื่องมือ?"}
    Tool -->|iodine/dnscat2| Known["✅ Known Tool"]
    Tool -->|Custom/Cobalt Strike| APT["🔴 APT Indicator"]
```

---

## 1. การวิเคราะห์

### 1.1 ตัวบ่งชี้ DNS Tunneling

| ตัวบ่งชี้ | ค่าปกติ | ค่าน่าสงสัย | การตรวจจับ |
|:---|:---|:---|:---|
| **Subdomain length** | < 30 chars | > 50 chars | DNS analytics |
| **Shannon entropy** | < 3.5 | > 4.0 | DNS analytics |
| **Query rate** (single domain) | < 10/min | > 100/min | SIEM |
| **TXT query volume** | ต่ำ | สูงผิดปกติ | DNS logs |
| **NULL/CNAME unusual** | น้อย | มาก | DNS logs |
| **Domain จดทะเบียนใหม่** | — | < 30 วัน | WHOIS / TI |
| **Non-cached queries** | ปกติ | 100% non-cached | DNS resolver | 

### 1.2 เครื่องมือ DNS Tunnel ที่รู้จัก

| เครื่องมือ | ลักษณะ | ความรุนแรง |
|:---|:---|:---|
| **iodine** | IP-over-DNS, NULL records | 🟠 สูง |
| **dnscat2** | Encrypted C2, TXT records | 🔴 สูง |
| **DNSExfiltrator** | Data exfil, TXT/CNAME | 🔴 สูง |
| **Cobalt Strike DNS** | Beacon over DNS | 🔴 วิกฤต |
| **SUNBURST** | SolarWinds, CNAME | 🔴 วิกฤต (APT) |

### 1.3 รายการตรวจสอบ

| รายการ | วิธีตรวจสอบ | เสร็จ |
|:---|:---|:---:|
| Domain ที่ใช้ tunnel | DNS logs / analytics | ☐ |
| Source host(s) | DNS query logs | ☐ |
| Process ที่ทำ DNS queries | EDR (Sysmon Event 22) | ☐ |
| ปริมาณข้อมูลที่ส่งออก (ประมาณ) | Query volume × payload size | ☐ |
| Domain ลงทะเบียนเมื่อไหร่? | WHOIS | ☐ |
| มี host อื่นติดต่อ domain เดียวกัน? | SIEM pivot | ☐ |
| ข้อมูลอะไรถูกส่งออก? (decode payload) | Base32/Base64 decode | ☐ |

---

## 2. การควบคุม

| # | การดำเนินการ | เครื่องมือ | เสร็จ |
|:---:|:---|:---|:---:|
| 1 | **Block** tunnel domain → DNS RPZ / Sinkhole | DNS server | ☐ |
| 2 | **Isolate** source host | EDR / Network | ☐ |
| 3 | **Kill** tunnel process | EDR | ☐ |
| 4 | **Block** DoH/DoT ไปยัง external resolvers | Firewall | ☐ |
| 5 | ค้นหา host อื่นที่ query domain เดียวกัน | SIEM | ☐ |

---

## 3. การกำจัด

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | ลบ DNS tunnel tool จาก host | ☐ |
| 2 | ลบ persistence (scheduled task, startup) | ☐ |
| 3 | หมุนเวียน credentials ที่อาจถูกส่งออก | ☐ |
| 4 | ตรวจ malware อื่นบน host (EDR full scan) | ☐ |

---

## 4. การฟื้นฟู

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | **บังคับ DNS ภายในเท่านั้น** (block outbound 53/UDP ไม่ผ่าน resolver) | ☐ |
| 2 | **Block DoH/DoT** ไปยัง external providers (8.8.8.8, 1.1.1.1) | ☐ |
| 3 | เปิด **DNS analytics** / DNS firewall | ☐ |
| 4 | ตั้ง threshold alerts สำหรับ entropy > 4.0 | ☐ |
| 5 | ติดตาม 30 วัน | ☐ |

---

## 5. เกณฑ์การยกระดับ

| เงื่อนไข | ยกระดับไปยัง |
|:---|:---|
| Data exfiltration ยืนยัน | [PB-08 Data Exfiltration](Data_Exfiltration.th.md) + Legal |
| C2 over DNS (Cobalt Strike / APT) | [PB-13 C2](C2_Communication.th.md) + Threat Hunt |
| SUNBURST / nation-state indicators | CISO + Law Enforcement |
| หลาย host ใช้ tunnel เดียวกัน | Major Incident |

---

### ผัง DNS Security Architecture

```mermaid
graph LR
    Client["💻 Client"] --> Internal["🔤 Internal DNS"]
    Internal --> RPZ["🛡️ RPZ Filter"]
    RPZ -->|Block| Sinkhole["🕳️ Sinkhole"]
    RPZ -->|Allow| Upstream["🌐 Upstream DNS"]
    Upstream --> DoH["🔒 DoH/DoT"]
    style RPZ fill:#27ae60,color:#fff
    style Sinkhole fill:#e74c3c,color:#fff
```

### ผัง DNS-based C2 Indicators

```mermaid
graph TD
    Indicator["🔍 DNS Indicator"] --> Length["📏 Query > 50 chars"]
    Indicator --> Entropy["🎲 High entropy"]
    Indicator --> Volume["📊 High NXDomain"]
    Indicator --> TXT["📝 Large TXT responses"]
    Length --> Score["⚠️ Risk Score"]
    Entropy --> Score
    Volume --> Score
    TXT --> Score
    Score --> Alert["🚨 SOC Alert"]
    style Alert fill:#e74c3c,color:#fff
```

## กฎตรวจจับ (Sigma)

| กฎ | ไฟล์ |
|:---|:---|
| DNS Tunneling Detection | [net_dns_tunneling.yml](../../08_Detection_Engineering/sigma_rules/net_dns_tunneling.yml) |
| Network Beaconing Pattern | [net_beaconing.yml](../../08_Detection_Engineering/sigma_rules/net_beaconing.yml) |

## เอกสารที่เกี่ยวข้อง

- [กรอบการตอบสนองต่อเหตุการณ์](../Framework.th.md)
- [PB-13 C2 Communication](C2_Communication.th.md)
- [PB-08 Data Exfiltration](Data_Exfiltration.th.md)

## DNS Tunneling Detection Indicators

| Indicator | Normal | Suspicious | Threshold |
|:---|:---|:---|:---|
| Query length | < 30 chars | > 50 chars | Alert > 60 |
| Subdomain depth | 1-3 levels | > 5 levels | Alert > 4 |
| Query entropy | < 3.0 | > 3.5 | Alert > 3.5 |
| TXT record volume | < 5/hr | > 50/hr | Alert > 20 |
| NXDOMAIN ratio | < 5% | > 30% | Alert > 20% |

### DNS Analysis Tools

| Tool | Purpose | Usage |
|:---|:---|:---|
| dns2tcp | Detect tunneling | Monitor traffic |
| Passive DNS | Historical lookup | Investigate domains |
| Zeek dns.log | Log analysis | Query forensics |
| DNScat2 detection | Known tool fingerprint | Signature match |

### Containment Checklist

| Action | Priority |
|:---|:---|
| Block malicious domain | Immediate |
| Sinkhole DNS queries | Immediate |
| Isolate source host | 15 min |
| Scan for additional hosts | 1 hr |

## References

- [MITRE ATT&CK T1071.004 — DNS](https://attack.mitre.org/techniques/T1071/004/)
- [SANS — Detecting DNS Tunneling](https://www.sans.org/white-papers/detecting-dns-tunneling/)
