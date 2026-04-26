# Playbook: Account Compromise / Unauthorized Access

**ID**: PB-05
**Severity**: High/Critical | **Category**: Identity & Access
**MITRE ATT&CK**: [T1078](https://attack.mitre.org/techniques/T1078/) (Valid Accounts), [T1110](https://attack.mitre.org/techniques/T1110/) (Brute Force)
**Trigger**: Identity Protection alert, Impossible travel / anomalous token, User report, TI credential leak

### Account Compromise Lifecycle

```mermaid
graph LR
    Cred["🔑 Get Credential"] --> Login["🔓 Login"]
    Login --> Persist["⚙️ Establish Persistence"]
    Persist --> Pivot["🔀 Pivot / BEC"]
    Pivot --> Exfil["📤 Exfiltrate Data"]
    style Cred fill:#e74c3c,color:#fff
    style Login fill:#f39c12,color:#fff
    style Persist fill:#e67e22,color:#fff
    style Pivot fill:#8e44ad,color:#fff
    style Exfil fill:#c0392b,color:#fff
```

### Response Sequence

```mermaid
sequenceDiagram
    participant IdP
    participant SOC
    participant User
    participant Exchange
    IdP->>SOC: 🚨 Risk detection
    SOC->>IdP: Revoke all sessions
    SOC->>IdP: Reset password
    SOC->>User: ☎️ Verify identity (phone)
    SOC->>Exchange: Check inbox rules
    Exchange-->>SOC: Found forwarding rule!
    SOC->>Exchange: Remove malicious rules
    SOC->>IdP: Re-register MFA
```

---

## Decision Flow

```mermaid
graph TD
    Alert["🚨 Suspicious Login"] --> Context{"📍 Known Location/Device?"}
    Context -->|Known + User Confirms| FP["✅ False Positive"]
    Context -->|Unknown / Cannot Reach User| Investigate["🔍 Investigate"]
    Investigate --> Contact["📞 Verify with User"]
    Contact -->|User: Yes, it was me| FP
    Contact -->|User: No / Unreachable| Compromised["🚨 Confirmed Compromise"]
    Compromised --> Severity{"VIP / Admin Account?"}
    Severity -->|Yes| Critical["🔴 Critical Response"]
    Severity -->|No| Standard["🟠 Standard Response"]
    Critical --> FullLock["Disable + Full Audit + CISO Notify"]
    Standard --> Lock["Disable + Reset + Monitor"]
```

---

## 1. Analysis

### 1.1 Login Context Review

| Check | How | Done |
|:---|:---|:---:|
| Login source IP/location | SIEM, IdP logs, GeoIP | ☐ |
| Device fingerprint | Known device or new? | ☐ |
| Login time | Normal business hours? | ☐ |
| Impossible travel | Multiple logins from distant locations in short time? | ☐ |
| VPN/proxy usage | Is source IP a known VPN/Tor exit? | ☐ |

### 1.2 Post-Login Activity Audit

| Activity | What to Check | Tool | Done |
|:---|:---|:---|:---:|
| **Email rules** | New forwarding rules, redirects, delegates | M365 / Google Admin | ☐ |
| **MFA changes** | New MFA device enrolled, backup codes generated | IdP audit log | ☐ |
| **OAuth consents** | New application authorized | Azure AD / Google | ☐ |
| **API keys** | New keys or tokens created | Cloud console | ☐ |
| **File access** | Unusual file downloads or sharing | DLP, Cloud audit | ☐ |
| **Admin actions** | Role changes, new accounts created | AD / IdP logs | ☐ |
| **Lateral movement** | RDP/SSH to other hosts | SIEM, EDR | ☐ |

### 1.3 Scope Assessment

- [ ] Is only one account affected, or multiple?
- [ ] Were any admin/service accounts compromised?
- [ ] Any data accessed or exfiltrated?
- [ ] How was the account compromised? (phishing, credential stuffing, leaked password)

---

## 2. Containment

### 2.1 Immediate Actions (within 10 minutes)

| # | Action | Tool | Done |
|:---:|:---|:---|:---:|
| 1 | **Disable account** in AD/IdP | AD / Okta / Azure AD | ☐ |
| 2 | **Revoke all sessions** — kill active tokens | IdP session management | ☐ |
| 3 | **Block source IP** at firewall (if external) | Firewall | ☐ |
| 4 | **Isolate endpoint** if device is involved | EDR | ☐ |

### 2.2 If Admin/VIP Account

| # | Additional Action | Done |
|:---:|:---|:---:|
| 1 | Review all admin actions taken during compromise window | ☐ |
| 2 | Check for new accounts or role assignments created by attacker | ☐ |
| 3 | Audit privileged group memberships | ☐ |
| 4 | Rotate service account credentials if accessed | ☐ |
| 5 | Notify CISO | ☐ |

---

## 3. Eradication

| # | Action | Done |
|:---:|:---|:---:|
| 1 | **Reset password** to a strong, unique value | ☐ |
| 2 | **Reset MFA** — remove all devices, re-enroll with user verification | ☐ |
| 3 | Remove unauthorized email forwarding rules | ☐ |
| 4 | Revoke unauthorized OAuth/application consents | ☐ |
| 5 | Delete any API keys/tokens created during compromise | ☐ |
| 6 | Check for persistence: Azure AD app registrations, service principals | ☐ |
| 7 | If password was reused: notify user to change on all other services | ☐ |

---

## 4. Recovery

| # | Action | Done |
|:---:|:---|:---:|
| 1 | Re-enable account after password + MFA reset | ☐ |
| 2 | Add user to "High Risk" monitoring group for 48 hours | ☐ |
| 3 | Verify user can access normally from expected location | ☐ |
| 4 | Send targeted awareness note to affected user | ☐ |

---

## 5. IoC Collection

| Type | Value | Source |
|:---|:---|:---|
| Attacker IP | | SIEM / IdP |
| Attacker GeoLocation | | GeoIP |
| User-Agent string | | IdP logs |
| Compromised account | | Alert |
| Attacker actions | | Audit log |
| Data accessed | | DLP / Cloud audit |

---

## 6. Evidence Checklist

| Evidence Type | What to Collect | Source | Why It Matters |
|:---|:---|:---|:---|
| Identity evidence | Username, UPN, role, MFA method, session/token IDs | IdP / auth logs | Confirms the compromised identity and access level |
| Access evidence | Source IP, geolocation, device, client app, impossible travel details | Sign-in logs / SIEM | Distinguishes normal from malicious sign-in patterns |
| Post-login activity | Inbox rules, OAuth consents, file access, admin actions, app registrations | Exchange / cloud audit / IAM logs | Shows persistence and business impact |
| User confirmation evidence | User interview notes, expected travel/device context, business justification | Ticket / call log | Helps close false positives and defend decisions |
| Cross-account scope evidence | Similar logins, password reuse indicators, related accounts | SIEM / password audit | Determines whether this is a single-user issue or campaign |

---

## 7. Minimum Telemetry Required

| Telemetry Source | Required For | Priority | Blind Spot If Missing |
|:---|:---|:---:|:---|
| Identity provider sign-in logs | Login source, MFA events, session creation, impossible travel review | Required | Cannot validate the compromise or dismiss benign travel/login patterns |
| Cloud audit and mailbox activity logs | Post-login actions, inbox rules, OAuth grants, admin changes | Required | Cannot determine impact after access was gained |
| Endpoint and device telemetry | Device posture, browser history, token theft, malware overlap | Recommended | Cannot tell whether identity abuse started from a compromised endpoint |
| Password reset and helpdesk records | User confirmation, lockout history, social engineering indicators | Recommended | Analyst decisions may rely on incomplete user context |
| SIEM correlation across identities | Similar IPs, reused passwords, related accounts | Required | Campaign-level compromise may remain hidden |

---

## 8. False Positive and Tuning Guide

| Scenario | Why It Looks Suspicious | How to Validate | Tuning Action | Escalate If |
|:---|:---|:---|:---|:---|
| Legitimate business travel or VPN use | New country, ASN, or IP can trigger impossible-travel style alerts | Confirm user itinerary, VPN egress, and device compliance | Tune location logic using known VPN egress and travel-aware windows | MFA resets, inbox rule changes, or abnormal post-login activity follow |
| New managed device enrollment | First-time device or client app looks like takeover | Validate MDM enrollment, join status, and helpdesk request | Suppress for approved enrollment workflow and limited time window | Device is unmanaged or login source is inconsistent with enrollment records |
| Password reset or access restoration by helpdesk | Session churn and auth changes can resemble attacker recovery actions | Confirm ticket ID, operator, and affected user | Correlate reset events with helpdesk workflow before alerting | Reset is followed by risky login behavior or unauthorized admin changes |
| Service account or automation token use | Non-interactive logins can appear anomalous in sign-in analytics | Validate expected source ranges, app ID, and schedule | Separate service identities into dedicated detections and thresholds | Service identity performs mailbox, admin, or user-style activity |

---

## 9. Escalation Criteria

| Condition | Escalate To |
|:---|:---|
| Admin/service account compromised | SOC Lead + CISO |
| Multiple accounts compromised | Major Incident |
| Data exfiltration confirmed | [PB-08](Data_Exfiltration.en.md) + Legal |
| Part of credential stuffing campaign | Threat Intel team |
| Phishing was the entry vector | Cross-reference [PB-01](Phishing.en.md) |

---

## 10. Post-Incident

- [ ] Review authentication policies (enforce MFA for all accounts)
- [ ] Update Conditional Access policies based on attack vector
- [ ] Implement sign-in risk policies (Azure AD / Okta)
- [ ] Review and revoke stale OAuth app consents
- [ ] Enforce password complexity and expiration policies
- [ ] Create Sigma rule for observed credential abuse patterns
- [ ] Conduct phishing simulation if phishing was the entry vector
- [ ] Document findings in [Incident Report](../../11_Reporting_Templates/incident_report.en.md)

---

### Post-Compromise Activity Check

```mermaid
graph TD
    Compromise["🔴 Account Compromised"] --> Email["📧 Inbox rules?"]
    Compromise --> OAuth["🔑 OAuth apps?"]
    Compromise --> MFA["📱 MFA changed?"]
    Compromise --> Data["📁 Data accessed?"]
    Email --> Clean["🧹 Remove"]
    OAuth --> Clean
    MFA --> Reset["🔄 Reset MFA"]
    Data --> DLP["📊 DLP report"]
    style Compromise fill:#e74c3c,color:#fff
```

### Identity Protection Layers

```mermaid
graph LR
    User["👤 User"] --> MFA2["📱 MFA"]
    MFA2 --> CA["🛡️ Conditional Access"]
    CA --> PIM["🔑 PIM"]
    PIM --> PAM["🏰 PAM"]
    PAM --> Monitor["👁️ UEBA"]
    style MFA2 fill:#3498db,color:#fff
    style CA fill:#27ae60,color:#fff
    style PAM fill:#f39c12,color:#fff
    style Monitor fill:#e74c3c,color:#fff
```

## Detection Rules (Sigma)

| Rule | File |
|:---|:---|
| Login from Unusual Location | [cloud_unusual_login.yml](../../08_Detection_Engineering/sigma_rules/cloud_unusual_login.yml) |
| Multiple Failed Login Attempts | [win_multiple_failed_logins.yml](../../08_Detection_Engineering/sigma_rules/win_multiple_failed_logins.yml) |
| Suspicious Inbox Rule Created | [cloud_email_inbox_rule.yml](../../08_Detection_Engineering/sigma_rules/cloud_email_inbox_rule.yml) |

## Related Documents

- [IR Framework](../Framework.en.md)
- [Incident Report](../../11_Reporting_Templates/incident_report.en.md)
- [PB-01 Phishing](Phishing.en.md)
- [PB-04 Brute Force](Brute_Force.en.md)
- [PB-06 Impossible Travel](Impossible_Travel.en.md)

## References

- [MITRE ATT&CK T1078 — Valid Accounts](https://attack.mitre.org/techniques/T1078/)
- [CISA Account Security](https://www.cisa.gov/secure-our-world)
- [NIST SP 800-63 — Digital Identity Guidelines](https://pages.nist.gov/800-63-3/)
