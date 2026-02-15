# SOC Operational Checklists — Daily / Weekly / Monthly

> **Document ID:** CHK-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Owner:** SOC Manager

---

## Daily Checklist (Every Shift)

### Start of Shift
```
□ Read shift handoff notes from previous shift
□ Check SIEM dashboard — any P1/P2 open incidents?
□ Review alert queue — how many pending?
□ Verify all log sources are active (no gaps in data)
□ Check agent health — any endpoints disconnected?
□ Review threat intel feed — new IOCs published?
□ Confirm SOC communication channels operational (Slack/Teams)
```

### During Shift
```
□ Process all incoming alerts (target: queue < 30 min old)
□ Escalate P1/P2 incidents within SLA
□ Update open incident tickets with progress
□ Document false positives for tuning review
□ Monitor for recurring alerts (possible tuning opportunity)
□ Check email for user-reported suspicious activity
```

### End of Shift
```
□ All alerts triaged — nothing pending > 30 min
□ Open incidents updated with latest status
□ Write shift handoff notes:
  - Alerts processed (count)
  - Incidents opened/closed
  - Anything unusual
  - Pending items for next shift
□ Notify next shift of any ongoing P1/P2
```

---

## Weekly Checklist (Every Monday)

### Detection & Tuning
```
□ Review top 10 noisiest alert rules
  - Any rules > 50% false positive? → Tune or disable
  - Any new patterns to whitelist?
□ Review rules that haven't fired in 30 days
  - Are they still relevant? Or is data source missing?
□ Check Sigma rule updates (community releases)
□ Review threat landscape — any new techniques trending?
```

### Operations
```
□ SIEM storage usage check (disk space, retention)
□ Review SOC metrics dashboard:
  - MTTD / MTTR trends
  - Alert volume trends
  - SLA compliance
□ Agent update status — any endpoints need patching?
□ Review open incidents > 7 days (are they stuck?)
□ Check backup status of SIEM/log data
```

### Team
```
□ Weekly SOC standup meeting (15 min):
  - Incidents summary
  - Tuning requests
  - Knowledge sharing (interesting case of the week)
□ Assign training/learning task to each analyst
□ Review shift coverage for next week
```

---

## Monthly Checklist (1st Week of Month)

### Reporting
```
□ Generate monthly SOC report:
  - Total alerts processed
  - Incidents by severity (P1/P2/P3/P4)
  - MTTD / MTTR averages
  - Top 5 alert categories
  - SLA compliance %
  - Notable incidents summary
  - Recommendations
□ Present report to CISO/management
□ Update SOC maturity scorecard
```

### Detection Engineering
```
□ Review and deploy new Sigma rules (community + custom)
□ Validate detection coverage against MITRE ATT&CK heatmap
□ Review YARA rules — any new malware families to add?
□ Test 2 existing detection rules (do they still fire correctly?)
□ Update IOC block lists (IP, domain, hash)
```

### Infrastructure
```
□ SIEM health check:
  - Performance metrics (query speed, ingestion rate)
  - Storage capacity planning (next 3 months)
  - License usage review
□ Check TLS certificates (expiring within 60 days?)
□ Review user access — remove departed staff accounts
□ Verify backup and restore process (test restore)
□ Patch SOC tools (SIEM, EDR, ticketing)
```

### Process Improvement
```
□ Review closed incidents — any process gaps found?
□ Update playbooks if needed (new techniques, tools, contacts)
□ Schedule tabletop exercise (quarterly)
□ Review compliance requirements (PDPA, ISO, PCI)
□ Knowledge base — add any new SOPs or runbooks
```

### Team Development
```
□ 1-on-1 with each analyst (15 min):
  - Workload okay?
  - Training progress?
  - Any concerns?
□ Identify training needs for next month
□ Review on-call/shift rotation fairness
□ Recognize top performer (public acknowledgment)
```

---

## Quarterly Checklist

```
□ Tabletop exercise (use Tabletop_Exercises guide)
□ SOC maturity assessment (use soc_maturity_scorer.html)
□ Purple team exercise (2 beginner-level minimum)
□ Compliance audit review (quarterly controls check)
□ Budget review — actuals vs planned
□ Vendor/tool evaluation — any gaps to fill?
□ Update SOC Building Roadmap progress
□ Present quarterly report to Board/Executive team
```

---

## Annual Checklist

```
□ Full SOC maturity assessment (all 7 domains)
□ Major purple team / red team exercise
□ Comprehensive MITRE ATT&CK coverage review
□ All playbooks reviewed and updated
□ All Sigma/YARA rules validated
□ Staffing plan review (hiring, promotions, training budget)
□ Technology stack review (renew, replace, or add tools)
□ Business continuity / DR test for SOC operations
□ Compliance audit (ISO 27001, PCI DSS, PDPA)
□ Annual SOC report to Board
```

---

## Related Documents

- [Tier 1 Runbook](../05_Incident_Response/Tier1_Runbook.en.md)
- [SOC Metrics](../06_Operations_Management/SOC_Metrics.en.md)
- [Shift Handoff](../06_Operations_Management/Shift_Handoff.en.md)
- [Tabletop Exercises](../05_Incident_Response/Tabletop_Exercises.en.md)
- [Purple Team Exercises](../05_Incident_Response/Purple_Team_Exercises.en.md)
