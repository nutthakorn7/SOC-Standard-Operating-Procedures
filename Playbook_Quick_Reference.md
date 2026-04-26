# SOC Playbook Quick Reference Card

> **Print this page** — A compact reference for all 53 incident response playbooks.
>
> **Purpose**: Help analysts quickly identify the correct playbook, first action, and escalation path.

---

## Email & Social Engineering

| PB | Name | Severity | Key Action |
|:---:|:---|:---:|:---|
| 01 | Phishing | P2-P1 | Validate headers, block sender, remove messages, check click logs |
| 17 | Business Email Compromise | P1 | Freeze transaction, verify sender, preserve mailbox evidence |
| 42 | Email Account Takeover | P1 | Reset credentials, revoke sessions, audit inbox and OAuth rules |
| 48 | Deepfake Social Engineering | P1 | Verify by callback, freeze requested action, preserve media evidence |

## Malware & Endpoint

| PB | Name | Severity | Key Action |
|:---:|:---|:---:|:---|
| 02 | Ransomware | P1 | Isolate hosts, protect backups, preserve evidence, activate IR |
| 03 | Malware Infection | P2-P1 | Isolate endpoint, collect artifacts, scan for spread |
| 11 | Suspicious Script | P2 | Stop process, capture script, inspect parent process |
| 38 | Wiper Attack | P1 | Isolate immediately, activate DR/BCP, verify integrity |
| 39 | Living Off The Land | P2 | Review LOLBin usage, hunt persistence, block abused binaries |
| 45 | Rootkit / Bootkit | P1 | Offline scan, preserve disk image, rebuild trusted system |

## Identity & Access

| PB | Name | Severity | Key Action |
|:---:|:---|:---:|:---|
| 04 | Brute Force | P3-P2 | Lock account, block source, enforce MFA |
| 05 | Account Compromise | P2-P1 | Reset password, revoke sessions, review user activity |
| 06 | Impossible Travel | P3-P2 | Verify user, check VPN/proxy, review sign-in logs |
| 07 | Privilege Escalation | P1 | Revoke elevated access, audit group changes, hunt persistence |
| 14 | Insider Threat | P1 | Preserve evidence, coordinate HR/Legal, monitor access |
| 15 | Rogue Admin | P1 | Disable account, rotate secrets, review admin changes |
| 16 | Cloud IAM Anomaly | P2-P1 | Revoke risky permissions, audit API calls, rotate keys |
| 26 | MFA Bypass / Token Theft | P1 | Revoke tokens, force reenrollment, investigate AiTM indicators |
| 36 | Credential Dumping | P1 | Isolate host, reset exposed credentials, hunt LSASS/SAM/DCSync |

## Network & Web

| PB | Name | Severity | Key Action |
|:---:|:---|:---:|:---|
| 09 | DDoS Attack | P2-P1 | Enable mitigation, rate limit, coordinate ISP/CDN |
| 10 | Web Application Attack | P2-P1 | Block exploit path, review logs, patch vulnerable component |
| 12 | Lateral Movement | P1 | Segment network, disable compromised accounts, scope hosts |
| 13 | C2 Communication | P1 | Block C2 destinations, isolate beaconing hosts, analyze traffic |
| 18 | Vulnerability Exploitation | P2-P1 | Patch or virtual patch, block IOCs, check compromise |
| 24 | Zero-Day Exploit | P1 | Apply compensating controls, isolate exposed assets, monitor KEV/TI |
| 25 | DNS Tunneling | P1 | Block domain, isolate host, analyze encoded payloads |
| 30 | API Abuse | P2 | Rate limit, revoke API keys, review object access patterns |
| 34 | Network Discovery | P3-P2 | Identify scanner, confirm authorization, block if unauthorized |
| 37 | SQL Injection | P1 | Block payloads, patch code, check database exposure |
| 43 | Watering Hole | P1 | Block site, identify visitors, scan affected endpoints |
| 44 | Drive-By Download | P2 | Block URL, scan endpoints, patch browser/plugins |
| 50 | Unauthorized Scanning | P3 | Identify source, block if needed, review exposed services |

## Cloud & Infrastructure

| PB | Name | Severity | Key Action |
|:---:|:---|:---:|:---|
| 21 | AWS S3 Compromise | P2-P1 | Block public access, review CloudTrail, assess data exposure |
| 22 | AWS EC2 Compromise | P1 | Isolate instance, snapshot volumes, rotate keys |
| 23 | Azure AD / Entra ID Compromise | P1 | Revoke sessions, reset credentials, review Conditional Access |
| 27 | Cloud Storage Exposure | P2-P1 | Make private, review access logs, notify if data leaked |
| 29 | Shadow IT | P3 | Inventory service, risk assess, block or onboard |
| 31 | Cryptomining | P2-P1 | Terminate miner, rotate access keys, check billing |
| 41 | VPN Abuse | P2 | Disable VPN account, inspect source, review tunnel logs |
| 47 | Cloud Cryptojacking | P1 | Kill compute, revoke API keys, alert finance/cloud owner |

## Data, Supply Chain & Physical

| PB | Name | Severity | Key Action |
|:---:|:---|:---:|:---|
| 08 | Data Exfiltration | P1 | Block channel, scope data, assess PDPA notification |
| 19 | Lost/Stolen Device | P2 | Remote wipe, disable accounts, document chain of custody |
| 20 | Log Clearing | P1 | Preserve remaining logs, restore from backups, investigate source |
| 28 | Mobile Device Compromise | P2 | Lock/wipe device, revoke tokens, re-enroll MDM |
| 32 | Supply Chain Attack | P1 | Isolate affected software, validate signatures, contact vendor |
| 33 | OT/ICS Incident | P1 | Protect safety, isolate OT segment, coordinate site owner |
| 35 | Data Collection / Staging | P2 | Monitor staging area, block exfil paths, preserve archives |
| 40 | USB Removable Media | P3-P2 | Quarantine media, scan device, review DLP/file access |
| 46 | SIM Swap | P1 | Contact carrier, reset accounts, move MFA away from SMS |
| 49 | Typosquatting | P3 | Block domain, report registrar, warn users |

## AI & ML Security

| PB | Name | Severity | Key Action |
|:---:|:---|:---:|:---|
| 51 | AI Prompt Injection | P2-P1 | Block unsafe prompt path, disable risky tools, review output exposure |
| 52 | LLM Data Poisoning | P1 | Freeze training/RAG pipeline, identify poisoned records, restore trusted data |
| 53 | AI Model Theft | P1 | Stop extraction, revoke access, preserve API and storage logs |

---

## Escalation Quick Guide

| Severity | Response Time | Notify | Example |
|:---:|:---:|:---|:---|
| P1 Critical | 15 min | SOC Manager, CISO, Legal, affected owner | Ransomware, active breach, data leak, model theft |
| P2 High | 30 min | SOC Manager, Team Lead | Malware, account compromise, cloud exposure |
| P3 Medium | 2 hours | Tier 2 Analyst | Brute force, scanning, policy violation |
| P4 Low | 8 hours | Tier 1 Analyst | False positive, informational request |

## Key Contacts

| Role | Name | Phone | Email |
|:---|:---|:---|:---|
| SOC Manager | __________ | __________ | __________ |
| CISO | __________ | __________ | __________ |
| Legal / DPO | __________ | __________ | __________ |
| PR / Communications | __________ | __________ | __________ |
| IT Infrastructure Lead | __________ | __________ | __________ |
| Cloud Owner | __________ | __________ | __________ |
| HR Contact | __________ | __________ | __________ |

---

> **Full Documentation**: [SOC SOP Repository](https://nutthakorn7.github.io/SOC-SOP/)
>
> **Last Updated**: 2026-04-26 | **Version**: 2.14
