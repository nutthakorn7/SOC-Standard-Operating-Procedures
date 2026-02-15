# Incident Lessons Learned Template

> **Document ID:** LL-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15

---

## Incident Summary

| Field | Details |
|:---|:---|
| **Incident ID** | INC-YYYY-NNN |
| **Date Detected** | YYYY-MM-DD HH:MM |
| **Date Resolved** | YYYY-MM-DD HH:MM |
| **Severity** | P1 / P2 / P3 / P4 |
| **Type** | (Phishing / Ransomware / Account Compromise / etc.) |
| **MITRE ATT&CK** | (T1xxx — Technique Name) |
| **Affected Systems** | (hostnames, IPs, user accounts) |
| **Blast Radius** | (number of systems/users affected) |
| **Business Impact** | (downtime hours, data exposed, financial cost) |
| **Lead Analyst** | (name) |
| **Incident Commander** | (name) |

---

## Timeline

| Time | Event | Source |
|:---|:---|:---|
| YYYY-MM-DD HH:MM | Initial indicator observed | SIEM alert |
| | Alert triaged by T1 analyst | Ticket system |
| | Escalated to T2 | Ticket system |
| | Containment action taken | EDR / Firewall |
| | Root cause identified | Investigation |
| | Eradication completed | Manual / automated |
| | Recovery and monitoring | SOC team |
| | Incident closed | Ticket system |

---

## Key Metrics

| Metric | Value | SLA Target | Met? |
|:---|:---:|:---:|:---:|
| **Time to Detect** (MTTD) | ___ min | ≤ 60 min | ✅/❌ |
| **Time to Respond** (MTTR) | ___ min | ≤ 240 min | ✅/❌ |
| **Time to Contain** | ___ min | ≤ 60 min (P1) | ✅/❌ |
| **Time to Resolve** | ___ hours | Varies | ✅/❌ |

---

## What Went Well ✅

1. ___ (e.g., "Detection rule fired within 3 minutes")
2. ___ (e.g., "T1 analyst correctly escalated to T2")
3. ___ (e.g., "EDR isolation prevented lateral movement")

## What Didn't Go Well ❌

1. ___ (e.g., "Alert was ignored for 2 hours due to queue volume")
2. ___ (e.g., "Playbook had outdated contact information")
3. ___ (e.g., "No Sigma rule for this specific attack vector")

## Root Cause

```
Describe the root cause of the incident in 2-3 sentences.
Example: "An employee clicked a phishing link containing a credential harvester. 
The stolen credentials were used to access the VPN and move laterally to the 
file server. The MFA bypass was possible due to legacy authentication protocols."
```

---

## Action Items

| # | Action | Owner | Due Date | Status |
|:---:|:---|:---|:---:|:---:|
| 1 | Create detection rule for ____ | Detection Eng | YYYY-MM-DD | ☐ |
| 2 | Update playbook PB-XX with ____ | SOC Lead | YYYY-MM-DD | ☐ |
| 3 | Implement MFA for ____ | IT Admin | YYYY-MM-DD | ☐ |
| 4 | Add IOCs to blocklist | T2 Analyst | YYYY-MM-DD | ☐ |
| 5 | Security awareness training on ____ | HR/Security | YYYY-MM-DD | ☐ |

---

## Detection Gap Analysis

| Question | Answer |
|:---|:---|
| Did existing rules detect this? | Yes / No / Partially |
| What rule/alert detected it? | (rule name or "none") |
| Was it detected automatically or by human? | Auto / Manual / User report |
| Detection gaps identified | (what was missing) |
| New rules needed | (describe rule to create) |
| MITRE ATT&CK coverage gap | (technique not covered) |

---

## Meeting Details

| Field | Details |
|:---|:---|
| **Meeting Date** | YYYY-MM-DD |
| **Attendees** | (names and roles) |
| **Duration** | ___ minutes |
| **Facilitator** | (name) |

---

## Sign-off

```
SOC Manager:    ____________________ Date: __________
CISO:           ____________________ Date: __________
IT Manager:     ____________________ Date: __________
```

---

## Related Documents

- [IR Framework](Framework.en.md)
- [Communication Templates](Communication_Templates.en.md)
- [Incident Report Template](../templates/incident_report.en.md)
