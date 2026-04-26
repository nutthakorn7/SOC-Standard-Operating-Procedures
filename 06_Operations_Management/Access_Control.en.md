# SOC Access Control Policy

> **Document ID:** ACC-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Owner:** SOC Manager / CISO

---

## Purpose

Defines who can access SOC tools, at what privilege level, and how access is granted, reviewed, and revoked. The SOC must protect itself as rigorously as it protects the organization.

---

## Role-Based Access Matrix

| SOC Tool | T1 Analyst | T2 Analyst | SOC Lead | SOC Manager | Detection Eng | External (MSSP) |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **SIEM — Read/Search** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (limited) |
| **SIEM — Create Rules** | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **SIEM — Admin/Config** | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **EDR — View Alerts** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (limited) |
| **EDR — Isolate Host** | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **EDR — Uninstall Agent** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Ticketing — Create** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Ticketing — Close P1/P2** | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Firewall — View Rules** | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Firewall — Block IP** | ❌ | ✅ (temp) | ✅ | ✅ | ❌ | ❌ |
| **SOAR — Execute Playbook** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **SOAR — Edit Playbook** | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |
| **TI Platform (MISP)** | Read | Read/Write | Admin | Admin | Read/Write | Read |
| **SOC Documentation** | Read | Read/Write | Admin | Admin | Read/Write | Read |

---

## Access Request Process

```mermaid
graph LR
    Request[1. Submit Request] --> Manager[2. SOC Manager Review]
    Manager --> IT[3. IT Provisions Access]
    IT --> Verify[4. User Confirms]
    Verify --> Log[5. Log in Access Register]
```

### Request Requirements

| Field | Required |
|:---|:---:|
| Requester name | ✅ |
| Tool/system requested | ✅ |
| Access level (read/write/admin) | ✅ |
| Business justification | ✅ |
| Duration (permanent/temporary) | ✅ |
| Manager approval | ✅ |

---

## Account Security Requirements

| Control | Requirement |
|:---|:---|
| **Authentication** | MFA required for ALL SOC tools |
| **Password** | Min 14 chars, complexity enforced, no reuse (12 history) |
| **Session timeout** | 15 min inactive → lock, 8 hrs max → force re-auth |
| **Service accounts** | Unique per tool, no shared passwords, rotate every 90 days |
| **API keys** | Per-user, rotate every 90 days, stored in vault (not plaintext) |
| **VPN/Zero Trust** | Required for remote access to SOC tools |
| **Privileged access** | JIT (Just-In-Time) for admin access where possible |

---

## Access Review Schedule

| Review Type | Frequency | Reviewer | Action |
|:---|:---:|:---|:---|
| Active accounts | Monthly | SOC Manager | Remove departed staff |
| Privilege levels | Quarterly | SOC Manager + CISO | Right-size permissions |
| Service accounts | Quarterly | SOC Engineer | Rotate credentials |
| API keys | Quarterly | SOC Engineer | Rotate and audit usage |
| MSSP access | Monthly | SOC Manager | Validate scope |
| Full audit | Annually | CISO + Internal Audit | Comprehensive review |

---

## Offboarding Checklist

When a SOC team member departs:

```
□ Disable AD/Azure AD account (within 1 hour of departure)
□ Revoke SIEM access
□ Revoke EDR access
□ Revoke ticketing system access
□ Revoke SOAR access
□ Revoke VPN/remote access
□ Revoke TI platform access
□ Rotate any shared credentials the person had access to
□ Remove from SOC communication channels (Slack/Teams)
□ Remove from on-call/shift rotation
□ Transfer ownership of dashboards/rules they created
□ Document in Access Register
```

---

## Audit Logging

All SOC tool access must be logged:

| Log Type | What to Capture | Retention |
|:---|:---|:---:|
| Login events | User, time, source IP, success/fail | 1 year |
| Configuration changes | Who, what, when, before/after | 2 years |
| Rule modifications | Rule name, author, old/new logic | 2 years |
| Data exports | Who, dataset, volume, destination | 1 year |
| Admin actions | All privileged operations | 2 years |

---

## Break-Glass Emergency Access

During critical incidents when normal access paths are unavailable:

| Scenario | Break-Glass Procedure | Post-Incident |
|:---|:---|:---|
| SSO/IdP down, cannot access SIEM | Use local admin account (sealed envelope) | Change password immediately, log usage |
| MFA provider outage | Bypass MFA with backup codes (pre-issued) | Report to IT, review all sessions |
| Primary analyst unavailable for P1 | SOC Manager grants temp access to backup | Revoke within 24 hours |
| SOAR API credentials expired mid-incident | Use manual command override | Rotate credentials, update vault |

### Break-Glass Access Rules
1. **Two-person rule** — break-glass access requires approval from SOC Manager or CISO
2. **Audit trail** — all break-glass usage must be logged in incident ticket
3. **Time-limited** — access valid for incident duration only (max 24 hours)
4. **Post-mortem** — review all break-glass events in weekly ops meeting

## Privileged Access Management (PAM)

```mermaid
graph LR
    Request["Request PAM<br/>Access"] --> Approve["Manager<br/>Approves"]
    Approve --> Grant["JIT Access<br/>Granted"]
    Grant --> Session["Recorded<br/>Session"]
    Session --> Expire["Auto-Expire<br/>(4h max)"]
    Expire --> Audit["Audit Log<br/>Generated"]
```

| PAM Control | Implementation |
|:---|:---|
| Just-In-Time (JIT) access | Admin access granted for 4-hour windows only |
| Session recording | All admin sessions recorded and stored 1 year |
| Password vaulting | Service account passwords in CyberArk/HashiCorp Vault |
| Credential rotation | Automated rotation every 90 days |
| Multi-level approval | P1 incident: SOC Manager; Config changes: CISO |

## Access Risk Escalation Triggers

| Condition | Escalate To | SLA | Required Action |
|:---|:---|:---:|:---|
| Privileged account granted without ticket or approval | SOC Manager + CISO | Immediate | Review access, revoke if unjustified |
| Shared, orphaned, or undocumented admin account found | SOC Manager + Security Engineer | Within 4 hours | Contain usage and assign owner |
| Failed access review or offboarding gap discovered | SOC Manager + HR / IT owner | Same business day | Revoke stale access and confirm completion |
| Break-glass account used outside approved incident | CISO | Immediate | Investigate misuse and rotate credentials |
| Access logs missing for privileged actions | Security Engineer + SOC Manager | Within 24 hours | Restore logging and assess blind spots |

## Minimum Evidence for Access Review

| Evidence | Why It Matters | Owner |
|:---|:---|:---|
| Current user-to-role export for each SOC system | Confirms who has access now | Security Engineer |
| Approval record or ticket for privileged accounts | Proves authorization path | SOC Manager |
| Last login and activity history | Identifies dormant or suspicious accounts | SOC Analyst |
| Offboarding completion evidence | Confirms removal of departed users | HR / IT owner |
| Break-glass usage log and post-review | Verifies emergency access remained controlled | SOC Manager |

## Related Documents

- [SOC Team Structure](SOC_Team_Structure.en.md)
- [Change Management SOP](Change_Management.en.md)
- [Data Handling Protocol](Data_Handling_Protocol.en.md)

## References

- [NIST SP 800-53 Rev. 5 - Access Control (AC)](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- [NIST SP 800-61r2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
