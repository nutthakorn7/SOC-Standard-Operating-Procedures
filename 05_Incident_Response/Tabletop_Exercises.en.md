# Tabletop Exercise Scenarios — SOC Incident Response Training

> **Document ID:** TTX-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Owner:** SOC Manager / IR Lead  
> **Frequency:** Quarterly (minimum)

---

## Purpose

Structured tabletop exercises (TTX) to test and improve SOC incident response capabilities. Each scenario is designed for **60–90 minute sessions** with progressive difficulty levels (injects).

---

## How to Run a Tabletop Exercise

1. **Assign Roles**: Facilitator (reads injects), SOC Analysts (T1/T2), IR Lead, Management observer
2. **Set Ground Rules**: No wrong answers, focus on process not tools, time-boxed discussion per inject
3. **Walk Through Injects**: Facilitator reads each inject sequentially, team discusses response
4. **Document Decisions**: Record who does what, escalation paths taken, tools used
5. **Debrief (15 min)**: What went well? What gaps? What to improve?
6. **Action Items**: Assign owners and deadlines for improvements

---

## Scenario 1: Ransomware Attack on Finance Server

**Difficulty**: 🔴 Hard | **Duration**: 90 min | **Playbooks**: PB-02, PB-08, PB-12

### Background
Your organization is a mid-size financial services company. It's Friday 16:30. Most senior staff are leaving for the weekend.

### Inject 1 — Initial Alert (16:30)
> A Tier 1 analyst receives an EDR alert: `"Suspicious process: vssadmin.exe delete shadows /all"` on server `FIN-SVR-03` (Finance department file server).

**Discussion Points:**
- What is the severity? Who do you escalate to?
- Should you isolate the server immediately or investigate first?
- What additional data do you check in the SIEM?

### Inject 2 — Spreading (16:45)
> While investigating, two more alerts fire: `FIN-SVR-05` and `HR-SVR-01` show the same behavior. Users in Finance report they cannot open their files — filenames now end in `.locked`.

**Discussion Points:**
- How do you contain lateral movement? Which tools?
- Do you isolate the entire Finance VLAN or individual hosts?
- Who do you notify? (CISO, Legal, Management)

### Inject 3 — Ransom Note (17:00)
> A ransom note appears on `FIN-SVR-03`: "Your files are encrypted by BlackCat. Pay 50 BTC within 72 hours. Contact us at darkweb.onion..."

**Discussion Points:**
- Do you engage with the attacker? Why or why not?
- What is your communication plan? (Internal, customers, regulators)
- How do you assess backup integrity?

### Inject 4 — Data Exfiltration (17:15)
> Network team discovers 200GB was uploaded to an external IP over the past 48 hours from `FIN-SVR-03`. The data appears to include customer PII.

**Discussion Points:**
- This is now a data breach — what regulatory obligations apply? (PDPA 72-hour notification)
- How do you preserve evidence while restoring operations?
- Do you involve law enforcement?

### Inject 5 — Recovery Decision (17:30)
> Backups exist from Wednesday night. The CEO calls asking: "When will we be back online?"

**Discussion Points:**
- Can you restore from backup? What about Thursday/Friday data?
- What testing do you do before declaring recovery?
- How do you communicate the timeline to management?

### Expected Outcomes
- [ ] Incident severity correctly classified as P1
- [ ] Host isolation executed within 15 minutes
- [ ] CISO and Legal notified within 30 minutes
- [ ] Backup integrity verified before restoration
- [ ] PDPA notification timeline understood (72 hours)

---

## Scenario 2: Business Email Compromise (BEC)

**Difficulty**: 🟡 Medium | **Duration**: 60 min | **Playbooks**: PB-17, PB-05, PB-26

### Background
Monday morning, 09:00. Your CEO is traveling abroad for a conference.

### Inject 1 — Suspicious Email (09:00)
> The CFO receives an urgent email from what appears to be the CEO's email address: "I need you to process an urgent wire transfer of $250,000 to vendor account XXXX. NDA — don't discuss with anyone. Handle ASAP."

**Discussion Points:**
- How does the SOC become aware of this? (User report, email gateway, DLP?)
- What indicators do you check? (Headers, Reply-to, sending IP)
- Is this a phishing or BEC scenario? How do they differ?

### Inject 2 — It's Real... Almost (09:30)
> Investigation reveals the email came from `ceo@your-company.co` (not `.com`). The domain was registered 2 days ago. Two other executives received similar emails.

**Discussion Points:**
- How do you block the lookalike domain?
- Do you search for other emails from this domain?
- Should you alert all staff? How without causing panic?

### Inject 3 — Account Compromise Found (10:00)
> While investigating, you discover the CEO's real email account has a new forwarding rule sending all mail to an external Gmail address. MFA was bypassed using a stolen session token (AiTM attack).

**Discussion Points:**
- How do you remediate the compromised account? (PB-26)
- What data was potentially exposed via email forwarding?
- How do you check if the attacker accessed other systems via the CEO's credentials?

### Inject 4 — Money Already Sent (10:30)
> The CFO admits they already initiated one wire transfer of $85,000 before the SOC alert.

**Discussion Points:**
- How do you work with Finance to attempt fund recovery?
- What is the legal reporting process?
- How do you update your BEC detection procedures?

### Expected Outcomes
- [ ] Email headers analyzed correctly
- [ ] Lookalike domain blocked and reported
- [ ] Account compromise remediation completed (session revoke, MFA re-enroll)
- [ ] Forwarding rules identified and removed
- [ ] Financial fraud response process followed

---

## Scenario 3: Insider Threat — Data Theft

**Difficulty**: 🟡 Medium | **Duration**: 60 min | **Playbooks**: PB-14, PB-08

### Background
Wednesday. HR has confidentially informed the SOC that a senior engineer ("Alex") has submitted their resignation, effective in 2 weeks. Alex has access to source code and customer databases.

### Inject 1 — Enhanced Monitoring (Day 1)
> SOC is asked to enable enhanced monitoring on Alex's account. What do you monitor?

**Discussion Points:**
- What data sources do you enable/review? (DLP, CASB, endpoint, email)
- How do you do this without tipping off the employee?
- What legal/HR guidelines must you follow?

### Inject 2 — Suspicious Activity (Day 3)
> DLP alerts show Alex downloaded 2.5GB from the customer database via SQL query export. Alex also accessed the source code repository and cloned 3 repos not related to their current project.

**Discussion Points:**
- Is this conclusive or could it be legitimate?
- Do you confront Alex or continue monitoring?
- How do you preserve evidence chain of custody?

### Inject 3 — USB and Cloud (Day 5)
> Endpoint monitoring shows Alex connected a personal USB drive and copied files. CASB logs show uploads to a personal Google Drive from a corporate laptop.

**Discussion Points:**
- Do you revoke access immediately?
- How do you coordinate with HR and Legal?
- What evidence do you need for potential legal action?

### Inject 4 — Confrontation (Day 7)
> HR decides to have a meeting with Alex. They deny everything. Legal asks SOC: "Can you prove what was taken?"

**Discussion Points:**
- How do you compile a forensic report?
- What chain of custody requirements apply?
- How do you prevent the data from being used externally?

### Expected Outcomes
- [ ] Enhanced monitoring activated without detection by subject
- [ ] DLP alerts triaged correctly
- [ ] Evidence preserved with proper chain of custody
- [ ] HR/Legal coordination followed corporate policy
- [ ] Post-incident access review completed

---

## Scenario 4: Cloud Infrastructure Compromise

**Difficulty**: 🔴 Hard | **Duration**: 90 min | **Playbooks**: PB-16, PB-27, PB-07

### Background
Thursday, 02:00 AM. An automated alert fires from AWS GuardDuty.

### Inject 1 — GuardDuty Alert (02:00)
> GuardDuty: `"UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration.OutsideAWS"` — IAM credentials from EC2 instance `prod-api-01` used from an IP in Eastern Europe.

**Discussion Points:**
- What is the severity at 2 AM? How do you handle after-hours escalation?
- What do you check first? (CloudTrail, VPC Flow Logs)
- Should you rotate credentials immediately or investigate first?

### Inject 2 — Privilege Escalation (02:30)
> CloudTrail shows: The compromised role was used to call `iam:CreateUser`, `iam:AttachUserPolicy`, and `iam:CreateAccessKey` — a new admin user was created.

**Discussion Points:**
- How do you contain without breaking production?
- What is the blast radius? Which services does this role have access to?
- How do you identify the initial access vector? (SSRF? Leaked key?)

### Inject 3 — Crypto Mining + S3 Exposure (03:00)
> 20 new `c5.4xlarge` instances are spinning up in `us-east-1`. Also, S3 bucket `prod-customer-data` policy was changed to public.

**Discussion Points:**
- How do you stop the cryptomining instances AND secure the S3 bucket?
- Is customer data exposed? How do you assess?
- Cost implications — who do you notify about unexpected AWS charges?

### Inject 4 — Root Cause (04:00)
> Investigation reveals an SSRF vulnerability in the API allowed accessing the EC2 instance metadata service (`169.254.169.254`), leaking IAM credentials.

**Discussion Points:**
- How do you fix the SSRF immediately?
- Should you move to IMDSv2?
- What other EC2 instances might be vulnerable?

### Expected Outcomes
- [ ] After-hours escalation plan executed
- [ ] Compromised credentials rotated
- [ ] Unauthorized IAM user removed
- [ ] S3 bucket re-secured and access logs reviewed
- [ ] Root cause (SSRF) identified and remediated

---

## Scenario 5: OT/ICS — Water Treatment Attack

**Difficulty**: 🔴🔴 Critical | **Duration**: 90 min | **Playbooks**: PB-30

### Background
Your organization operates a water treatment plant. Saturday, 06:00 AM.

### Inject 1 — HMI Anomaly (06:00)
> Night shift operator notices the HMI showing sodium hydroxide (NaOH) dosing levels were changed from 100ppm to 1,100ppm. No operator made this change.

**Discussion Points:**
- **SAFETY FIRST**: What is the immediate physical safety action?
- How do you engage the OT engineer?
- Is this a cyber incident or an equipment malfunction?

### Inject 2 — IT-OT Boundary (06:30)
> Investigation shows a VPN connection from an unknown IP to the engineering workstation at 04:00 AM. The TeamViewer service was running on the workstation.

**Discussion Points:**
- How did the attacker get VPN credentials?
- What is the IT-OT network segmentation? Was it breached?
- Do you shut down VPN access entirely?

### Inject 3 — Regulatory and Public (07:00)
> Local government health authority calls — they received an anonymous tip about "contaminated water." Media coverage is starting.

**Discussion Points:**
- Who handles external communications?
- What are your regulatory reporting obligations?
- How do you assure the public while investigation is ongoing?

### Inject 4 — Recovery (08:00)
> The NaOH levels were corrected manually. PLC logs show the change originated from the engineering workstation. Water quality tests confirm no contamination reached the distribution system.

**Discussion Points:**
- How do you verify PLC logic integrity?
- What enhanced monitoring do you implement?
- How do you rebuild the engineering workstation?

### Expected Outcomes
- [ ] Physical safety activated immediately
- [ ] OT engineer engaged within 15 minutes
- [ ] IT-OT access severed during investigation
- [ ] Regulatory notification made per requirements
- [ ] PLC logic validated against golden baseline

---

## Scoring Rubric

Use this rubric to evaluate team performance after each exercise:

| Category | Score 1–5 | What to Assess |
|:---|:---:|:---|
| **Detection Speed** | _/5 | How quickly was the threat identified? |
| **Escalation Accuracy** | _/5 | Correct severity? Right people notified? |
| **Containment** | _/5 | Effective isolation without breaking things? |
| **Communication** | _/5 | Clear internal/external comms? |
| **Evidence Handling** | _/5 | Proper preservation and chain of custody? |
| **Recovery Planning** | _/5 | Realistic timeline? Tested before restoring? |
| **Process Adherence** | _/5 | Followed playbooks? Used correct tools? |

**Total: ___/35**

| Score | Rating |
|:---:|:---|
| 30–35 | 🟢 Excellent — minor improvements only |
| 22–29 | 🟡 Good — some gaps to address |
| 15–21 | 🟠 Developing — significant process gaps |
| <15 | 🔴 Needs Work — fundamental issues to fix |

---

## Exercise Calendar Template

| Quarter | Scenario | Focus Area | Participants |
|:---:|:---|:---|:---|
| Q1 | Ransomware (#1) | Containment + Recovery | SOC + IT Ops + Management |
| Q2 | BEC (#2) | Detection + Communication | SOC + Finance + Legal |
| Q3 | Insider Threat (#3) | Monitoring + Evidence | SOC + HR + Legal |
| Q4 | Cloud Compromise (#4) | Cloud IR + Escalation | SOC + Cloud Team + DevOps |
| Annual | OT/ICS (#5) | Safety + OT Coordination | SOC + OT Engineers + Safety |

---

## Related Documents

- [IR Framework](Framework.en.md)
- [Severity Matrix](Severity_Matrix.en.md)
- [SOAR Playbook Templates](SOAR_Playbooks.en.md)
- [All Playbooks (PB-01 to PB-30)](Playbooks/)
