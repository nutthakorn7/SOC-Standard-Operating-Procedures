# PDPA Incident Response Guide

> **Document ID:** PDPA-IR-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Applicable Law:** พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)

---

## Purpose

This guide provides SOC-specific procedures for handling incidents involving **Personal Data** under Thailand's Personal Data Protection Act (PDPA). Covers the **72-hour notification** requirement, data breach classification, and regulatory reporting.

---

## When PDPA Applies

A PDPA incident occurs when:

| Trigger | Example |
|:---|:---|
| Personal data is **accessed** by unauthorized persons | Attacker reads customer database |
| Personal data is **exfiltrated** | Data sent to external server |
| Personal data is **modified** without authorization | Database records altered |
| Personal data is **destroyed/lost** | Ransomware encrypts customer data |
| Personal data is **disclosed** unintentionally | Email sent to wrong recipient |

### What is "Personal Data" under PDPA?

| Category | Examples |
|:---|:---|
| **Identifiers** | Thai national ID, passport number, driver's license |
| **Contact info** | Name, address, phone, email |
| **Financial** | Bank account, credit card, salary |
| **Health** | Medical records, health insurance |
| **Biometric** | Fingerprint, face recognition data |
| **Online** | IP address (when linkable to person), cookies, device ID |
| **Sensitive** | Religion, political opinion, criminal record, sexual orientation |

> ⚠️ **Sensitive personal data** has stricter requirements and higher penalties.

---

## 72-Hour Notification Timeline

```
Hour 0:   Data breach DETECTED
          ↓
Hour 0-4: Confirm breach involves personal data → YES → activate PDPA process
          ↓
Hour 4-24: Assess scope, blast radius, types of data affected
          ↓
Hour 24-48: Prepare notification to PDPC
          ↓
Hour 48-72: Submit notification to PDPC ← LEGAL DEADLINE
          ↓
ASAP after PDPC: Notify affected data subjects (if high risk)
```

### When to Notify

| Scenario | Notify PDPC? | Notify Data Subjects? |
|:---|:---:|:---:|
| Encrypted data stolen (encryption intact) | ⚠️ Assess | Usually no |
| Unencrypted PII exfiltrated | ✅ Yes | ✅ Yes |
| Ransomware encrypts PII | ✅ Yes | ✅ If no backup |
| Employee accesses unauthorized records | ✅ Yes | ⚠️ Assess risk |
| Phishing captures user credentials | ✅ If data accessed | ⚠️ Assess |
| Database exposed but no evidence of access | ✅ Yes | ⚠️ Assess risk |

---

## SOC Response Procedure

### Step 1: Detection & Initial Assessment (Hour 0–4)

```
□ Confirm incident involves personal data
□ Classify severity:
  - P1: Mass breach (>1,000 records) or sensitive data
  - P2: Limited breach (<1,000 records) or non-sensitive data
□ Notify SOC Manager immediately
□ Notify DPO (Data Protection Officer) immediately
□ Begin evidence preservation (per Evidence Collection SOP)
□ DO NOT attempt to hide, minimize, or delay reporting
```

### Step 2: Scope Assessment (Hour 4–24)

```
□ Identify what data was compromised:
  - Type of personal data (identifiers, financial, health, sensitive)
  - Number of data subjects affected
  - Geographic scope (Thai citizens? Cross-border?)
□ Identify how the breach occurred:
  - Attack vector
  - Vulnerability exploited
  - Duration of exposure
□ Determine if data was:
  - Viewed only vs. copied/exfiltrated
  - Encrypted at rest (breach may be less severe)
□ Check for secondary compromise
□ Document everything in incident ticket
```

### Step 3: Containment & Legal Preparation (Hour 24–48)

```
□ Contain the breach (isolate, block, patch)
□ Prepare PDPC notification with DPO/Legal:

Required information for PDPC:
  1. Name and contact of data controller
  2. Name and contact of DPO
  3. Nature of the breach
  4. Categories and approximate number of data subjects
  5. Categories and approximate number of data records
  6. Likely consequences of the breach
  7. Measures taken or proposed to address the breach
  8. Measures to mitigate adverse effects

□ Prepare data subject notification (if applicable):
  - Clear, plain language (Thai)
  - What happened
  - What data was affected
  - What they should do (change passwords, monitor accounts)
  - Who to contact for more information
  - What you are doing to prevent recurrence
```

### Step 4: Notification (Hour 48–72)

```
□ Submit notification to PDPC (Office of the Personal Data Protection Committee)
  - Email: complaint@pdpc.or.th
  - Online: https://www.pdpc.or.th
  - Reference: Section 37(4) PDPA
□ If high risk → notify affected data subjects ASAP
□ If cross-border → assess notification requirements in other jurisdictions
□ Keep copy of all notifications sent
```

### Step 5: Post-Breach (After 72 hours)

```
□ Continue investigation and remediation
□ Respond to any PDPC follow-up requests
□ Conduct Lessons Learned (use Lessons Learned Template)
□ Implement corrective measures
□ Update breach register
□ Report to management/board
□ Consider voluntary disclosure to media (PR/Legal decision)
```

## Notification Decision Matrix

| Condition | Notify PDPC | Notify Data Subjects | Escalate To |
|:---|:---:|:---:|:---|
| Personal data confirmed, impact still under assessment | ✅ | Assess | DPO + SOC Manager |
| Sensitive data, financial data, or authentication secrets exposed | ✅ | ✅ | DPO + CISO + Legal |
| Data encrypted and key integrity confirmed | Assess | Usually no | DPO |
| No evidence of access but public exposure existed | ✅ | Assess | DPO + SOC Manager |
| Third-party breach affects your controlled data | ✅ | Assess | DPO + Vendor owner + Legal |

## Minimum Evidence Before Notification

| Evidence | Why It Matters | Owner |
|:---|:---|:---|
| Timeline of detection, escalation, and containment | Supports legal timeline and defensibility | IR Engineer |
| Data types, estimated record count, and affected subjects | Required for regulator and subject notice | SOC Analyst |
| Containment status and known blast radius | Prevents incomplete or misleading notification | Technical Lead |
| Current contact details for DPO, legal, and business owner | Ensures notification does not stall | SOC Manager |
| Copy of draft and final notification packages | Preserves audit and legal record | DPO |

## Executive / Legal / Privacy Escalation Path

| Situation | Notify First | Notify Next | Minimum Output |
|:---|:---|:---|:---|
| Personal data exposure confirmed but scope still incomplete | DPO + SOC Manager | CISO | Initial breach summary and investigation timeline |
| Sensitive data, financial data, or identity secrets exposed | DPO + Legal + CISO | Business owner + Privacy lead | Draft PDPC package and subject-notification plan |
| Potential media, customer, or contractual impact | CISO + Legal | Communications lead / Vendor owner | Agreed external communications position |
| Material regulatory exposure or repeated breach pattern | CISO + Legal + DPO | Board / Executive Committee | Decision summary for board pack and corrective-action owner |

## Minimum Notification Decision Record

-   [ ] State whether PDPC notification is **required**, **assessed**, or **not required**.
-   [ ] State whether data subject notification is **required**, **assessed**, or **not required**.
-   [ ] Record who approved the notification decision and at what time.
-   [ ] Record which evidence was still unknown at the time of notification.

## Customer / Regulator Communication Handoff

| Outbound Communication | Primary Owner | Required Input | Record Destination |
|:---|:---|:---|:---|
| PDPC notification | DPO | Notification decision, scope estimate, containment status | Incident record and breach register |
| Data subject notification | DPO + Communications | Approved message, support path, affected-group definition | Incident record and subject-notification log |
| Customer or contract-driven notification | Legal + Business owner | Confirmed service impact, legal wording, response path | Incident report and communications log |
| Board or executive follow-up | CISO | Material impact summary, residual risk, corrective-action plan | Board pack and governance tracker |

---

## PDPA Penalties Reference

| Violation | Administrative Fine | Criminal Penalty |
|:---|:---:|:---:|
| Failure to notify breach to PDPC | Up to ฿5,000,000 | — |
| Failure to notify data subjects | Up to ฿5,000,000 | — |
| Unlawful processing of personal data | Up to ฿5,000,000 | Up to 1 year / ฿1,000,000 |
| Unlawful processing of sensitive data | Up to ฿5,000,000 | Up to 1 year / ฿1,000,000 |
| Cross-border transfer without safeguards | Up to ฿5,000,000 | — |
| Compensatory damages | Court-determined | — |
| Punitive damages | Up to 2× actual damages | — |

---

## Breach Register Template

Maintain a register of all data breaches (required by PDPA):

| Date | Incident ID | Description | Records Affected | Data Types | PDPC Notified | Subjects Notified | Status |
|:---|:---|:---|:---:|:---|:---:|:---:|:---|
| | | | | | ☐ | ☐ | |

---

## Key Contacts

| Role | Name | Contact |
|:---|:---|:---|
| Data Protection Officer (DPO) | ___________ | ___________ |
| Legal Counsel | ___________ | ___________ |
| CISO | ___________ | ___________ |
| PR/Communications | ___________ | ___________ |
| PDPC Hotline | — | 02-142-1033 |
| PDPC Email | — | complaint@pdpc.or.th |

---

## Related Documents

- [IR Framework](../05_Incident_Response/Framework.en.md)
- [Evidence Collection](../05_Incident_Response/Evidence_Collection.en.md)
- [Communication Templates](../05_Incident_Response/Communication_Templates.en.md)
- [Lessons Learned Template](../05_Incident_Response/Lessons_Learned_Template.en.md)
- [Compliance Mapping](../07_Compliance_Privacy/Compliance_Mapping.en.md)
- [Incident Report Template](../11_Reporting_Templates/incident_report.en.md)
- [Board Quarterly Decision Pack](../11_Reporting_Templates/Board_Quarterly_Decision_Pack.en.md)

## References

- [Thailand Personal Data Protection Committee (PDPC)](https://www.pdpc.or.th/)
- [NIST SP 800-61r2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
