# Playbook: Brute Force / Password Spray

**ID**: PB-04
**Severity**: Low/Medium/High | **Category**: Identity & Access
**MITRE ATT&CK**: [T1110](https://attack.mitre.org/techniques/T1110/) (Brute Force), [T1110.001](https://attack.mitre.org/techniques/T1110/001/) (Password Guessing), [T1110.003](https://attack.mitre.org/techniques/T1110/003/) (Password Spraying)
**Trigger**: SIEM alert ("Multiple failed logins"), IdP risk detection, Firewall/WAF logs

### Attack Patterns

```mermaid
graph TD
    Attacker["🔨 Attacker"] --> Type{"📋 Type?"}
    Type -->|Brute Force| BF["🔑 Try all passwords"]
    Type -->|Password Spray| PS["🌊 1 password × many accounts"]
    Type -->|Credential Stuffing| CS["📦 Use leaked creds"]
    BF --> Target["🎯 Single account"]
    PS --> Target2["🎯 Multiple accounts"]
    CS --> Target2
    style Attacker fill:#e74c3c,color:#fff
    style BF fill:#f39c12,color:#fff
    style PS fill:#e67e22,color:#fff
    style CS fill:#8e44ad,color:#fff
```

### Smart Lockout Flow

```mermaid
sequenceDiagram
    participant Attacker
    participant IdP
    participant SOC
    participant User as Legitimate User
    Attacker->>IdP: ❌ Login fail ×5
    IdP->>IdP: 🔒 Smart lockout (attacker only)
    User->>IdP: ✅ Login success (not locked)
    IdP->>SOC: 🚨 Alert: failed attempts
    SOC->>SOC: Check IP + success/fail ratio
```

---

## Decision Flow

```mermaid
graph TD
    Alert["🚨 Failed Login Spike"] --> Type{"🔍 Attack Type?"}
    Type -->|Many fails → 1 account| Brute["🔨 Brute Force"]
    Type -->|1 password → Many accounts| Spray["🌧️ Password Spray"]
    Type -->|Credential list tested| Stuffing["📋 Credential Stuffing"]
    Brute --> Success{"✅ Any Success After Fails?"}
    Spray --> Success
    Stuffing --> Success
    Success -->|Yes, Login Succeeded| Compromised["🔴 Account Compromised!"]
    Success -->|No, All Failed| Attempt["🟡 Attack Attempt"]
    Compromised --> Reset["🔄 Reset + Investigate"]
    Attempt --> Block["🚫 Block Source + Monitor"]
```

---

## 1. Analysis

### 1.1 Attack Type Identification

| Type | Pattern | Detection |
|:---|:---|:---|
| **Brute Force** | 100+ attempts against ONE account in minutes | SIEM: high fail count per user |
| **Password Spray** | 1-2 attempts per account across MANY accounts | SIEM: same source, many targets |
| **Credential Stuffing** | Leaked credential pairs tested | Multiple users, different passwords |
| **Slow & Low** | Spread attempts over hours/days to avoid lockout | UEBA baseline deviation |
| **Distributed** | Same attack from many IPs (botnet) | Correlation: same target, many sources |

### 1.2 Investigation Checklist

| Check | How | Done |
|:---|:---|:---:|
| Source IP(s) — internal or external? | SIEM / Firewall | ☐ |
| IP reputation | AbuseIPDB, VirusTotal | ☐ |
| Target account(s) — VIP, admin, service? | AD / IdP | ☐ |
| Volume — how many attempts? | SIEM query | ☐ |
| Any SUCCESSFUL login after failures? | **CRITICAL** — Event ID 4624 after 4625s | ☐ |
| Protocol used (RDP, SSH, OWA, VPN, API) | Authentication logs | ☐ |
| Account lockout triggered? | AD / IdP | ☐ |
| Is the target exposed externally? | Firewall rules, Shodan | ☐ |

### 1.3 Severity Assessment

| Scenario | Severity | Action |
|:---|:---|:---|
| External IP, all failures, non-admin accounts | **Low** | Block IP, monitor |
| External IP, all failures, admin/VIP accounts | **Medium** | Block IP, alert account owner |
| Successful login after failed attempts | **High** | Treat as [PB-05 Account Compromise](Account_Compromise.en.md) |
| Password spray hitting many accounts | **High** | Block IP, org-wide password assessment |
| Internal source IP | **High** | Compromised host investigation |

---

## 2. Containment

### 2.1 Attack Attempt (No Success)

| # | Action | Tool | Done |
|:---:|:---|:---|:---:|
| 1 | **Block source IP(s)** at firewall/WAF | Firewall | ☐ |
| 2 | **GeoIP block** if source is from non-business country | Firewall / IdP | ☐ |
| 3 | **Lock accounts** only if lockout threshold wasn't auto-triggered | AD | ☐ |
| 4 | **Alert account owners** (especially VIP/admins) | Email / Chat | ☐ |

### 2.2 Successful Login Detected (CRITICAL)

| # | Action | Tool | Done |
|:---:|:---|:---|:---:|
| 1 | **Immediately reset password** of compromised account | AD / IdP | ☐ |
| 2 | **Terminate all sessions** | IdP | ☐ |
| 3 | **Enforce MFA** before re-enabling | IdP | ☐ |
| 4 | **Block source IP** | Firewall | ☐ |
| 5 | **Audit account activity** from successful login onward | SIEM | ☐ |
| 6 | Escalate to [PB-05 Account Compromise](Account_Compromise.en.md) | SOC | ☐ |

### 2.3 If Internal Source

| # | Action | Done |
|:---:|:---|:---:|
| 1 | Isolate source host — likely compromised | ☐ |
| 2 | Investigate what's running on source host | ☐ |
| 3 | Check for malware / attacker tooling | ☐ |

---

## 3. Eradication

| # | Action | Done |
|:---:|:---|:---:|
| 1 | Remove attacker IP from any Allow lists | ☐ |
| 2 | If internal source: clean/re-image compromised host | ☐ |
| 3 | Check if any other accounts were compromised | ☐ |
| 4 | Verify all targeted accounts have strong, unique passwords | ☐ |

---

## 4. Recovery

| # | Action | Done |
|:---:|:---|:---:|
| 1 | Unlock legitimately locked accounts after verification | ☐ |
| 2 | Enforce MFA on all targeted accounts | ☐ |
| 3 | Implement smart lockout (Azure AD) or progressive delays | ☐ |
| 4 | Review and reduce externally exposed auth endpoints | ☐ |
| 5 | Deploy password banned list (common passwords) | ☐ |
| 6 | Consider passwordless authentication for high-risk accounts | ☐ |
| 7 | Monitor targeted accounts for 30 days | ☐ |

---

## 5. IoC Collection

| Type | Value | Source |
|:---|:---|:---|
| Attacker IP(s) | | Firewall / SIEM |
| Targeted account(s) | | Auth logs |
| Attempted passwords (if visible) | | Auth logs |
| Attack duration | | SIEM |
| Successful login timestamp | | Auth logs |
| Protocol targeted | | Auth logs |

---

## 6. Evidence Checklist

| Evidence Type | What to Collect | Source | Why It Matters |
|:---|:---|:---|:---|
| Authentication evidence | Failed and successful login events, timestamps, result codes | IdP / AD / VPN / app auth logs | Confirms whether the attack remained an attempt or became compromise |
| Identity evidence | Target usernames, account type, MFA state, lockout status | IAM / IdP | Shows whether privileged or high-risk identities were targeted |
| Source evidence | Source IPs, ASN, geolocation, user agents, proxy/Tor indicators | SIEM / firewall / threat intel | Distinguishes single-source abuse from distributed campaigns |
| Exposure evidence | Internet-facing auth endpoints, protocol used, external accessibility | Firewall / asset inventory | Explains attack surface and priority for hardening |
| Business impact evidence | User lockouts, service disruption, affected business functions | Helpdesk / ticketing / service owner | Supports severity and communication decisions |

---

## 7. Minimum Telemetry Required

| Telemetry Source | Required For | Priority | Blind Spot If Missing |
|:---|:---|:---:|:---|
| Authentication logs | Count failures, detect success-after-failure, identify protocol | Required | Cannot prove brute force versus normal login failure noise |
| IAM and MFA telemetry | Account type, lockout, MFA state, reset events | Required | Cannot assess privileged-account risk or control bypass |
| Firewall, WAF, or VPN telemetry | Source concentration, rate, geo distribution, perimeter targeting | Required | Distributed attacks and exposed entry points remain unclear |
| Threat intel and IP reputation | Known botnet, proxy, Tor, or abusive source context | Recommended | Analyst confidence and prioritization drop |
| Asset and service inventory | Which auth endpoints are exposed and who owns them | Recommended | Hardening decisions become slower and inconsistent |

---

## 8. False Positive and Tuning Guide

| Scenario | Why It Looks Suspicious | How to Validate | Tuning Action | Escalate If |
|:---|:---|:---|:---|:---|
| User forgot password | Short burst of failed logins against one account | Confirm with user and no success from unusual source | Keep low threshold alert informational for single-user self-correction | Success follows from new geo/device or MFA anomalies appear |
| Password manager or stale mobile client retries | Repeated failed logins from one known device/app | Check known device, user agent, and cached credential issue | Suppress repeated retries from approved client signatures for a short window | Pattern spreads across accounts or source IP changes unexpectedly |
| Security scan or auth resilience testing | High-volume auth failures can resemble spraying | Validate scanner source range, schedule, and owner | Allowlist approved test sources and windows only | Attempts hit production identities outside approved scope |
| Shared NAT or proxy egress | Many users can appear behind one source IP | Correlate usernames, device identity, and office/VPN context | Tune source-IP-only logic to include per-user and per-protocol thresholds | Same source shows success-after-failure or privileged targeting |

---

## 9. Escalation Criteria

| Condition | Escalate To |
|:---|:---|
| Successful login after brute force | [PB-05 Account Compromise](Account_Compromise.en.md) |
| Admin / service account targeted | SOC Lead + Identity team |
| Password spray > 100 accounts | SOC Lead |
| Internal source IP | Tier 2 + Endpoint team |
| Distributed attack (botnet) | SOC Lead + Network team |
| Externally exposed RDP targeted | Network team — disable external RDP |

---

### Password Policy Hardening

```mermaid
graph TD
    Policy["🔐 Password Policy"] --> Length["📏 Min 14 chars"]
    Policy --> Complex["🔤 Complexity required"]
    Policy --> History["📋 Remember 24"]
    Policy --> Lockout["🔒 Lockout 10 fails"]
    Lockout --> Duration["⏱️ 30 min lockout"]
    Length --> MFA["📱 MFA required"]
    Complex --> MFA
    style MFA fill:#27ae60,color:#fff
    style Lockout fill:#e74c3c,color:#fff
```

### Credential Source Tracking

```mermaid
graph LR
    Source{"🔑 Source?"} --> Dark["🌑 Dark Web dump"]
    Source --> Phish["🎣 Phishing"]
    Source --> Reuse["♻️ Password reuse"]
    Source --> Keylog["⌨️ Keylogger"]
    Dark --> Check["✅ Check HaveIBeenPwned"]
    Phish --> Check
    Reuse --> Check
    Keylog --> EDR["🛡️ EDR scan"]
    style Dark fill:#2c3e50,color:#fff
    style Phish fill:#e74c3c,color:#fff
```

## Detection Rules (Sigma)

| Rule | File |
|:---|:---|
| Multiple Failed Login Attempts | [win_multiple_failed_logins.yml](../../08_Detection_Engineering/sigma_rules/win_multiple_failed_logins.yml) |
| Login from Unusual Location | [cloud_unusual_login.yml](../../08_Detection_Engineering/sigma_rules/cloud_unusual_login.yml) |

## Related Documents

- [IR Framework](../Framework.en.md)
- [Incident Report](../../11_Reporting_Templates/incident_report.en.md)
- [PB-05 Account Compromise](Account_Compromise.en.md)
- [PB-06 Impossible Travel](Impossible_Travel.en.md)
- [Shift Handover Log](../../11_Reporting_Templates/shift_handover.en.md)

## References

- [MITRE ATT&CK T1110 — Brute Force](https://attack.mitre.org/techniques/T1110/)
- [OWASP Brute Force Prevention](https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks)
- [Microsoft Smart Lockout](https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-smart-lockout)
