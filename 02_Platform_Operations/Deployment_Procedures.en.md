# Change Management & Deployment Standard

This document outlines the standard process for managing changes and deployments within the SOC environment.

## 1. Change Management Process

All changes to the production SOC environment (Alert Rules, Parsers, Infrastructure) must follow a structured process.

```mermaid
sequenceDiagram
    participant Eng as Engineer
    participant Mgr as Manager
    participant CAB as CAB Board
    participant Prod as Production
    
    Eng->>Mgr: Submit RFC
    Mgr->>Mgr: Review Risk
    alt Low Risk
        Mgr->>Prod: Approve & Schedule
    else High Risk
        Mgr->>CAB: Request Approval
        CAB->>Prod: Approve Deployment
    end
    Prod-->>Eng: Deployment Complete
```

### 1.1 Request (RFC)
-   Submit a Request for Change (RFC) documenting:
    -   Description of change.
    -   Justification/Impact.
    -   Risk assessment.
    -   Rollback plan.

### 1.2 Review & Approval (CAB)
-   **Change Advisory Board (CAB)** reviews High-risk changes.
-   Peer review is required for Alert Rule modifications (Detection Engineering).

## 2. Deployment Procedures

### 2.1 Environment Strategy
-   **Development/Lab**: Sandbox environment for testing new rules and integrations.
-   **Staging**: Mirror of production for final verification.
-   **Production**: Live environment.

### 2.2 Deployment Steps
1.  **Test**: Validate functionality in the Lab environment.
2.  **Snapshot**: Take a backup/snapshot of the current configuration.
3.  **Deploy**: Apply changes to Production during the approved window.
4.  **Verify**: Confirm operational status and check for errors.

### 2.3 CI/CD for Detection Rules
-   Manage detection rules as code (Detection-as-Code).
-   Use Version Control (Git) for all rule logic.
-   Automate testing (Syntax check, Unit test) via CI pipeline before merging to `main`.

## 3. Rollback Plan

-   Every deployment must have a predefined rollback strategy.
-   If verification fails, immediately revert to the pre-deployment snapshot.
-   Conduct a Root Cause Analysis (RCA) for failed changes.

## 4. Change Risk Assessment

| Risk Level | Criteria | Approval | Maintenance Window |
|:---|:---|:---|:---|
| **Low** | Cosmetic, documentation, non-impacting | SOC Lead | Anytime |
| **Medium** | New detection rule, parser update | SOC Manager | Business hours |
| **High** | SIEM config, integration change | SOC Manager + CAB | Maintenance window |
| **Critical** | Infrastructure, network, auth changes | CISO + CAB | Scheduled downtime |

## 5. Maintenance Windows

| Window | Schedule | Duration | Use For |
|:---|:---|:---|:---|
| **Standard** | Tuesday & Thursday 02:00–06:00 | 4 hours | Medium/High changes |
| **Emergency** | As needed (CAB approval) | 2 hours | Critical hotfixes |
| **Extended** | Last Saturday of month 00:00–08:00 | 8 hours | Infrastructure upgrades |

## 6. Deployment Checklist

| # | Step | Owner | Done |
|:---:|:---|:---|:---:|
| 1 | RFC submitted and approved | Engineer | ☐ |
| 2 | Peer review completed (detection rules) | Detection Eng | ☐ |
| 3 | Pre-deployment snapshot/backup taken | Engineer | ☐ |
| 4 | Change tested in staging environment | Engineer | ☐ |
| 5 | Rollback plan documented and tested | Engineer | ☐ |
| 6 | Deployment window confirmed | SOC Manager | ☐ |
| 7 | Stakeholders notified of change | SOC Lead | ☐ |
| 8 | Change deployed to production | Engineer | ☐ |
| 9 | Post-deployment verification completed | Engineer | ☐ |
| 10 | Monitoring for 30 min post-change (no errors) | SOC Lead | ☐ |
| 11 | RFC closed with results documented | Engineer | ☐ |

## 7. Detection-as-Code Pipeline

```mermaid
graph LR
    Author["Author Rule"] --> PR["Pull Request"]
    PR --> Review["Peer Review"]
    Review --> CI["CI Pipeline"]
    CI --> Syntax["Syntax Check"]
    Syntax --> Unit["Unit Test"]
    Unit --> Staging["Deploy Staging"]
    Staging --> Validate["Validate 24h"]
    Validate --> Prod["Deploy Production"]
```

## 8. Minimum Release Criteria

- [ ] **Scope and risk defined**: The change record identifies affected systems, operational impact, and rollback owner.
- [ ] **Pre-change evidence captured**: Baseline screenshots, config export, or rule version references exist before deployment.
- [ ] **Validation plan prepared**: Success criteria, smoke tests, and observation window are documented.
- [ ] **Rollback is executable**: The team can restore prior state within the approved rollback target.
- [ ] **Stakeholders informed**: SOC operations, affected service owners, and on-call responders know the change window and fallback plan.

## 9. Emergency Change Triggers

| Trigger | Approval Path | Documentation Minimum |
|:---|:---|:---|
| **Active incident requires control change** | SOC Manager + incident lead | What changed, why it was urgent, rollback path |
| **Critical detection or ingestion outage** | SOC Manager | Outage scope, temporary mitigation, verification plan |
| **Security exposure cannot wait for next window** | CISO or delegate | Risk statement, expected blast radius, recovery owner |

## 10. Escalation Triggers During Deployment

- [ ] **Escalate immediately** if log ingestion stops for critical sources, alert routing breaks, or production authentication is impacted.
- [ ] **Escalate to SOC Manager** if smoke tests fail, rollback exceeds target time, or monitoring shows material degradation.
- [ ] **Escalate to CISO** if emergency downtime, security coverage loss, or executive-facing services are affected.

## Rollback Procedures

### When to Rollback
| Indicator | Action |
|:---|:---|
| SIEM stops receiving logs | Rollback immediately |
| Alert volume drops to 0 | Investigate first, rollback if not resolved in 15 min |
| False positive rate spikes > 50% | Rollback rule change, investigate |
| Dashboard/query errors | Rollback config change |
| Agent crash after update | Rollback agent version |

### Rollback Checklist
```
□ Identify the change that caused the issue
□ Notify SOC Manager that rollback is in progress
□ Apply rollback from backup/git
□ Verify system returns to normal operation
□ Document the failed change and root cause
□ Schedule post-mortem within 48 hours
```

## Change Window Schedule

| Change Type | Allowed Window | Approval Required | Rollback Time |
|:---|:---|:---|:---|
| Detection rule (new) | Anytime (test mode) | SOC Lead | < 5 min |
| Detection rule (production) | Business hours | SOC Lead + peer review | < 5 min |
| SIEM configuration | Maintenance window (Sun 02:00-06:00) | SOC Manager | < 30 min |
| Agent update (fleet) | Staged: 10% → 50% → 100% over 3 days | SOC Manager + IT | < 1 hour |
| Major platform upgrade | Maintenance window + CAB approval | CISO | < 4 hours |

## Post-Deployment Smoke Test

After any deployment, run these verification steps:

```bash
#!/bin/bash
# smoke_test.sh — Post-deployment verification

echo "=== Post-Deployment Smoke Test ==="

# 1. SIEM connectivity
echo -n "SIEM API: "
curl -s -o /dev/null -w "%{http_code}" https://siem.internal/api/health && echo " ✅" || echo " ❌"

# 2. Log ingestion (check last 5 min)
echo -n "Log ingestion: "
RECENT=$(curl -s 'localhost:9200/_count?q=@timestamp:>now-5m' | grep -o '"count":[0-9]*')
echo "$RECENT events in last 5 min"

# 3. Detection rules
echo -n "Active rules: "
# Adjust for your SIEM
echo "$(curl -s 'localhost:9200/_cat/count/sigma-*' | awk '{print $3}') rules loaded"

# 4. Alert routing
echo "Sending test alert..."
# Add your test alert mechanism here
```

## Related Documents
-   [Change Request Template](../11_Reporting_Templates/change_request_rfc.en.md)
-   [Data Governance & Retention](Database_Management.en.md)
-   [SOC Infrastructure Setup](../10_Training_Onboarding/System_Activation.en.md)

## References
-   [ITIL Change Management](https://www.axelos.com/best-practice-solutions/itil)
-   [DevSecOps Manifesto](https://www.devsecops.org/)
