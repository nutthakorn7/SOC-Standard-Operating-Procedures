# Shift Handover Log

> **Instructions**: Complete all mandatory sections (★) before briefing the incoming shift. Save this log in the ticketing system or shared drive after both leads sign off.

---

## Header Information

| Field | Value |
|:---|:---|
| **Date** | YYYY-MM-DD |
| **Shift** | ☐ Morning (08:00–16:00) · ☐ Afternoon (16:00–00:00) · ☐ Night (00:00–08:00) |
| **Outgoing Lead** | [Name] |
| **Incoming Lead** | [Name] |
| **Handoff Time** | HH:MM |

---

## ★ 1. Shift Summary

**Overall Status**: ☐ Quiet · ☐ Normal · ☐ Busy · ☐ Critical

**Narrative Summary**:
> *Provide a 2–3 sentence overview of the shift. Highlight any escalations, notable events, or management directives received.*

---

## ★ 2. Active Incidents (Requiring Attention)

| ID | Severity | Category | Description | Current Status | Owner | Next Action | ETA |
|:---|:---:|:---|:---|:---|:---|:---|:---|
| #___ | Critical/High/Med/Low | Phishing/Malware/etc | Brief description | Triage/Investigation/Containment/etc | [Name] | What needs to happen next | When |
| | | | | | | | |
| | | | | | | | |

**Total Active**: ____ | **Critical/High**: ____ | **Awaiting Escalation**: ____

---

## ★ 3. System Health

| System | Status | Notes |
|:---|:---:|:---|
| SIEM Ingestion | ☐ Normal · ☐ Degraded · ☐ Down | |
| EDR Connectivity | ☐ Normal · ☐ Degraded · ☐ Down | |
| SOAR Playbooks | ☐ Normal · ☐ Degraded · ☐ Down | |
| TI Feed Updates | ☐ Normal · ☐ Delayed · ☐ Down | |
| Ticketing System | ☐ Normal · ☐ Degraded · ☐ Down | |
| Network Sensors | ☐ Normal · ☐ Degraded · ☐ Down | |
| Email Gateway | ☐ Normal · ☐ Degraded · ☐ Down | |

**Known Issues**: 
> *Describe any ongoing system degradation, scheduled maintenance, or license expirations.*

---

## ★ 4. Pending Tasks / Follow-ups

| # | Task | Related Ticket | Priority | Assigned To | Due |
|:---:|:---|:---|:---:|:---|:---|
| 1 | | | High/Med/Low | | |
| 2 | | | | | |
| 3 | | | | | |

---

## ★ 5. Intelligence & Advisories

### New Threat Intelligence
| Source | Summary | IoCs Added? | Action Required? |
|:---|:---|:---:|:---:|
| | | ☐ Yes · ☐ No | ☐ Yes · ☐ No |

### Vulnerability Advisories
| CVE | Affected Systems | Severity | Patch Available? | Action |
|:---|:---|:---:|:---:|:---|
| | | | ☐ Yes · ☐ No | |

---

## 6. Escalations (if applicable)

| Escalated To | Reason | Time | Response Received? | Status |
|:---|:---|:---|:---:|:---|
| | | | ☐ Yes · ☐ No | |

---

## 7. Change Advisories (if applicable)

| Change ID | System | Description | Window | Impact on Alerts? |
|:---|:---|:---|:---|:---:|
| | | | | ☐ Yes · ☐ No |

---

## 8. Compliance Deadlines (if applicable)

| Deadline | Regulation | Description | Days Remaining | Owner |
|:---|:---|:---|:---:|:---|
| | PDPA / ISO 27001 / etc | | | |

---

## ★ Shift Statistics

| Metric | Count |
|:---|:---:|
| Alerts Processed | |
| Incidents Opened | |
| Incidents Closed | |
| Escalations Made | |
| False Positives Identified | |
| Average Response Time (MTTA) | min |

---

## ★ Sign-off

| | Outgoing Lead | Incoming Lead |
|:---|:---|:---|
| **Name** | | |
| **Signature** | | |
| **Time** | | |

> ⚠️ **Both leads must sign off** to confirm that the briefing was conducted and all mandatory sections were reviewed.

---

## Related Documents

- [Shift Handoff Standard](../06_Operations_Management/Shift_Handoff.en.md) — Full handoff procedure
- [IR Framework](../05_Incident_Response/Framework.en.md) — Incident response lifecycle
- [SOC Metrics & KPIs](../06_Operations_Management/SOC_Metrics.en.md) — Performance metrics
- [Incident Report Template](incident_report.en.md) — Post-incident documentation

## References

- [NIST SP 800-61r2 — Incident Handling](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
