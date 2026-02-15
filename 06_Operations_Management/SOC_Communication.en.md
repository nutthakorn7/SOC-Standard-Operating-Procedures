# SOC Communication SOP

This document defines the standard communication procedures for SOC operations — internal team communication, stakeholder notifications, and external reporting.

---

## Communication Channels

| Channel | Use For | SLA |
|:---|:---|:---|
| **Ticketing System** | Incident communication, audit trail, all case work | Per incident SLA |
| **Chat (Teams/Slack)** | Quick coordination, shift notifications, FYI alerts | < 5 min response |
| **Phone** | Critical escalation, time-sensitive matters | Immediate |
| **Email** | Non-urgent updates, reports, formal communication | < 1 hour |
| **War Room** | Active Critical/High incident coordination | Real-time |

## Communication Matrix

| Scenario | Who | Channel | Frequency |
|:---|:---|:---|:---|
| Alert triage update | Shift Lead | Ticket | Per alert |
| Shift handoff | Incoming + Outgoing Lead | Verbal + Log | Per shift |
| Incident escalation | SOC Lead → SOC Manager | Phone + Email | As needed |
| Daily SOC brief | SOC Manager → Team | Email/Chat | Daily |
| Weekly report | SOC Manager → CISO | Email | Weekly |
| Security advisory | SOC → All Staff | Email | As needed |
| Breach notification | CISO → Affected parties | Formal letter | Per regulation |

## Notification Templates

### Internal Incident Notification

```
Subject: [SEVERITY] Security Incident #[ID] - [Brief Description]

Severity: [Critical/High/Medium/Low]
Status: [Detected/Investigating/Contained/Resolved]
Impact: [Description of affected systems/users]
Current Actions: [What SOC is doing]
Next Steps: [Planned actions]
Contact: [SOC Lead name and channel]
```

### Management Escalation

```
Subject: 🚨 ESCALATION - Incident #[ID] - [Severity]

Summary: [1-2 sentence description]
Business Impact: [Affected services, users, data]
Timeline: [Key timestamps]
Actions Taken: [Containment/investigation steps]
Decision Required: [What approval/guidance is needed]
```

## Related Documents

- [Shift Handoff Standard](Shift_Handoff.en.md)
- [Escalation Matrix](Escalation_Matrix.en.md)
- [IR Framework](../05_Incident_Response/Framework.en.md)

## References

- [NIST SP 800-61r2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
