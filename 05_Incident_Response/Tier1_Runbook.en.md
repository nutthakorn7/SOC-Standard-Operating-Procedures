# SOC Tier 1 Analyst Runbook

> **Document ID:** RB-T1-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Owner:** SOC Manager  
> **Audience:** Tier 1 / Junior SOC Analysts

---

## Your Daily Workflow

```
08:00  Shift start → Read handoff notes → Check dashboards
08:15  Review overnight alerts queue → Triage by severity
08:30  Begin alert processing (target: 12–15 alerts/hour)
       ↓ Continuous cycle ↓
       Triage → Investigate → Escalate or Close
12:00  Midday review with T2 lead
16:00  Prepare shift handoff notes
16:30  Handoff to next shift
```

---

## Alert Triage — The First 5 Minutes

### Step 1: Read the Alert
| Check | What to Look For |
|:---|:---|
| **Source** | Which tool generated this? (EDR, SIEM, IDS, email gateway) |
| **Severity** | How did the tool classify it? (Critical/High/Medium/Low) |
| **Asset** | What system is affected? (server, workstation, cloud resource) |
| **User** | Who is associated? (employee, service account, admin) |
| **Timestamp** | When did it happen? (business hours? weekend?) |

### Step 2: Quick Context Check (2 min)
```
□ Is this a known false positive? → Check FP runbook
□ Is this asset in maintenance? → Check change calendar
□ Has this user/host triggered similar alerts recently? → Check SIEM history (7 days)
□ Is this a repeat of an existing incident? → Check open tickets
```

### Step 3: Decide
| Decision | Action | Time Limit |
|:---|:---|:---:|
| ✅ **True Positive** | Create incident ticket → Escalate to T2 | 15 min |
| ⚠️ **Needs More Investigation** | Enrich IOCs → Pivot search → Then decide | 30 min |
| ❌ **False Positive** | Document reason → Close → Update tuning list | 5 min |
| 🔴 **Critical / P1** | **Escalate IMMEDIATELY** to T2/IR Lead | 0 min |

---

## Escalation Triggers — ALWAYS Escalate These

🚨 **Immediately escalate to T2/IR Lead if you see ANY of these:**

- Ransomware indicators (file encryption, shadow copy deletion)
- Active data exfiltration (large uploads to external IPs)
- Executive/VIP account compromise
- Multiple hosts showing same malicious behavior
- Production server compromise
- Confirmed malware execution
- Any OT/ICS alerts
- You don't understand the alert after 30 minutes

---

## Common Alert Types & Quick Actions

### 🎣 Phishing Email Alert
```
1. DO NOT click any links/attachments in the email
2. Check email headers → Is sender spoofed?
3. Check URL reputation → VirusTotal, URLhaus
4. Check if other users received the same email → SIEM search
5. If malicious → Block sender + URL → Escalate to T2
6. Playbook: PB-01
```

### 🔐 Failed Login Alert (Brute Force)
```
1. Check source IP → Internal or external?
2. Count failed attempts → How many? Over what period?
3. Check if any login succeeded after failures
4. If external + >10 attempts → Block IP at firewall
5. If succeeded after failures → Escalate to T2 (possible compromise)
6. Playbook: PB-04
```

### 🦠 Malware/EDR Alert
```
1. Check detection name → What type of malware?
2. Was it blocked or did it execute?
3. Check process tree → What launched it?
4. If EXECUTED → Escalate to T2 immediately
5. If BLOCKED → Verify quarantine → Check for other instances
6. Playbook: PB-03
```

### 🌐 Web Attack / WAF Alert
```
1. Check attack type → SQLi, XSS, RCE?
2. Check response code → 200 (possible success) vs 403/WAF blocked
3. Check source IP → Known scanner or targeted?
4. If response=200 + payload looks successful → Escalate to T2
5. If blocked → Log and monitor for persistence
6. Playbook: PB-10
```

### ☁️ Cloud Alert (AWS/Azure)
```
1. What action triggered the alert?
2. Which IAM user/role?
3. From what IP/region?
4. Is this a known admin action?
5. If unusual region + privileged action → Escalate to T2
6. Playbook: PB-16
```

---

## IOC Enrichment — Quick Reference

| IOC Type | Where to Check | Free Tools |
|:---|:---|:---|
| IP Address | Reputation, Geolocation, ASN | VirusTotal, AbuseIPDB, Shodan |
| Domain | WHOIS, DNS, Reputation | VirusTotal, URLhaus, DomainTools |
| File Hash | Malware database | VirusTotal, MalwareBazaar, Hybrid Analysis |
| URL | Reputation, Redirect chain | VirusTotal, URLScan.io, URLhaus |
| Email Address | Breach databases, reputation | Have I Been Pwned, EmailRep |

### VirusTotal Quick Check
```
IP:   https://www.virustotal.com/gui/ip-address/{IP}
Hash: https://www.virustotal.com/gui/file/{HASH}
URL:  https://www.virustotal.com/gui/url/{URL}
```

---

## Ticket Documentation Template

Every alert you process should be documented:

```
## Alert Summary
- Alert ID: [from SIEM]
- Timestamp: [when alert fired]
- Source Tool: [EDR/SIEM/IDS/other]
- Affected Asset: [hostname/IP]
- Affected User: [username]
- Alert Type: [phishing/malware/brute-force/etc]

## Investigation Steps
1. [What you checked first]
2. [What you found]
3. [Additional context gathered]

## IOC Summary
- IP: x.x.x.x (VT score: X/90)
- Hash: abc123... (VT score: X/70)
- Domain: evil.com (registered: yesterday)

## Decision
- [x] True Positive → Escalated to T2 (ticket #XXX)
- [ ] False Positive → Closed (reason: known scanner)
- [ ] Needs Further Investigation

## Actions Taken
- Blocked IP at firewall
- Quarantined file on endpoint
- Notified user
```

---

## Shift Handoff Checklist

Before ending your shift:

```
□ All alerts triaged (none pending >30 min)
□ Open incidents updated with latest status
□ Escalated items confirmed received by T2
□ Handoff notes written in shared document:
  - Number of alerts processed
  - Any ongoing incidents
  - Anything unusual or concerning
  - Any systems in degraded state
□ Dashboard screenshots saved if anomalies noted
```

---

## Do's and Don'ts

| ✅ Do | ❌ Don't |
|:---|:---|
| Ask for help if unsure | Sit on an alert for >30 min without acting |
| Document everything | Close alerts without investigation notes |
| Escalate early if P1 | Try to handle P1 incidents alone |
| Check for related alerts | Look at alerts in isolation |
| Use the playbooks | Rely only on memory |
| Communicate status updates | Go silent during incidents |

---

## Key Contacts

| Role | When to Contact |
|:---|:---|
| T2 Analyst | Any alert you can't resolve in 30 min |
| IR Lead | Confirmed P1/P2 incidents |
| SOC Manager | Operational issues, tool outages |
| IT Ops | Server/network issues during investigation |
| HR | Insider threat cases |
| Legal | Data breach confirmed |

---

## Related Documents

- [IR Framework](Framework.en.md)
- [Severity Matrix](Severity_Matrix.en.md)
- [Shift Handoff](../06_Operations_Management/Shift_Handoff.en.md)
- [All Playbooks (PB-01 to PB-30)](Playbooks/)
