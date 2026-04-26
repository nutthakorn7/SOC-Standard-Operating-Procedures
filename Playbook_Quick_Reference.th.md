# SOC Playbook Quick Reference Card / สรุป Playbook

> **พิมพ์หน้านี้** — สรุป Playbook ทั้ง 53 ฉบับ สำหรับแปะโต๊ะ Analyst
>
> **วัตถุประสงค์**: ช่วยให้ analyst เลือก playbook, action แรก และ escalation path ได้เร็ว

---

## Email & Social Engineering

| PB | ชื่อ | ระดับ | การดำเนินหลัก |
|:---:|:---|:---:|:---|
| 01 | Phishing / ฟิชชิ่ง | P2-P1 | ตรวจ header, บล็อก sender, ลบอีเมล, ตรวจ click log |
| 17 | BEC / อีเมลหลอกธุรกิจ | P1 | ระงับธุรกรรม, ยืนยันผู้ส่ง, เก็บหลักฐาน mailbox |
| 42 | Email Account Takeover | P1 | รีเซ็ตรหัส, เพิกถอน session, ตรวจ inbox/OAuth rule |
| 48 | Deepfake Social Engineering | P1 | ยืนยันผ่าน callback, หยุดคำขอเสี่ยง, เก็บหลักฐานสื่อ |

## Malware & Endpoint

| PB | ชื่อ | ระดับ | การดำเนินหลัก |
|:---:|:---|:---:|:---|
| 02 | Ransomware / แรนซัมแวร์ | P1 | แยกเครื่อง, ป้องกัน backup, เก็บหลักฐาน, เปิด IR |
| 03 | Malware Infection / มัลแวร์ | P2-P1 | แยก endpoint, เก็บ artifact, ตรวจการแพร่กระจาย |
| 11 | Suspicious Script | P2 | หยุด process, เก็บ script, ตรวจ parent process |
| 38 | Wiper Attack | P1 | แยกเครื่องทันที, เปิด DR/BCP, ตรวจ integrity |
| 39 | Living Off The Land | P2 | ตรวจ LOLBin, hunt persistence, บล็อก binary ที่ถูก abuse |
| 45 | Rootkit / Bootkit | P1 | offline scan, เก็บ disk image, rebuild ระบบที่เชื่อถือได้ |

## Identity & Access

| PB | ชื่อ | ระดับ | การดำเนินหลัก |
|:---:|:---|:---:|:---|
| 04 | Brute Force / เดารหัส | P3-P2 | lock account, บล็อก source, enforce MFA |
| 05 | Account Compromise | P2-P1 | รีเซ็ตรหัส, เพิกถอน session, ตรวจ user activity |
| 06 | Impossible Travel | P3-P2 | ยืนยันผู้ใช้, ตรวจ VPN/proxy, ตรวจ sign-in log |
| 07 | Privilege Escalation | P1 | ถอนสิทธิ์สูง, audit group change, hunt persistence |
| 14 | Insider Threat / ภัยจากภายใน | P1 | เก็บหลักฐาน, ประสาน HR/Legal, monitor access |
| 15 | Rogue Admin | P1 | ปิดบัญชี, rotate secret, ตรวจ admin change |
| 16 | Cloud IAM Anomaly | P2-P1 | ถอนสิทธิ์เสี่ยง, audit API call, rotate key |
| 26 | MFA Bypass / Token Theft | P1 | เพิกถอน token, บังคับ reenroll, ตรวจ AiTM indicator |
| 36 | Credential Dumping | P1 | แยก host, รีเซ็ตรหัสที่เสี่ยง, hunt LSASS/SAM/DCSync |

## Network & Web

| PB | ชื่อ | ระดับ | การดำเนินหลัก |
|:---:|:---|:---:|:---|
| 09 | DDoS Attack | P2-P1 | เปิด mitigation, rate limit, ประสาน ISP/CDN |
| 10 | Web Application Attack | P2-P1 | บล็อก exploit path, ตรวจ log, patch component |
| 12 | Lateral Movement | P1 | แยก segment, ปิดบัญชีที่ถูกยึด, scope host |
| 13 | C2 Communication | P1 | บล็อก C2, แยก host ที่ beacon, วิเคราะห์ traffic |
| 18 | Vulnerability Exploitation | P2-P1 | patch หรือ virtual patch, บล็อก IOC, ตรวจ compromise |
| 24 | Zero-Day Exploit | P1 | ใช้ compensating control, แยก asset เสี่ยง, monitor KEV/TI |
| 25 | DNS Tunneling | P1 | บล็อก domain, แยก host, วิเคราะห์ payload ที่ encode |
| 30 | API Abuse | P2 | rate limit, revoke API key, ตรวจ object access pattern |
| 34 | Network Discovery | P3-P2 | ระบุ scanner, ยืนยัน authorization, บล็อกถ้าไม่อนุญาต |
| 37 | SQL Injection | P1 | บล็อก payload, patch code, ตรวจ data exposure |
| 43 | Watering Hole | P1 | บล็อกเว็บ, ระบุผู้เข้าเยี่ยมชม, scan endpoint |
| 44 | Drive-By Download | P2 | บล็อก URL, scan endpoint, patch browser/plugin |
| 50 | Unauthorized Scanning | P3 | ระบุ source, บล็อกถ้าจำเป็น, ตรวจ service ที่เปิดอยู่ |

## Cloud & Infrastructure

| PB | ชื่อ | ระดับ | การดำเนินหลัก |
|:---:|:---|:---:|:---|
| 21 | AWS S3 Compromise | P2-P1 | ปิด public access, ตรวจ CloudTrail, ประเมินข้อมูลรั่ว |
| 22 | AWS EC2 Compromise | P1 | แยก instance, snapshot volume, rotate key |
| 23 | Azure AD / Entra ID Compromise | P1 | revoke session, reset credential, ตรวจ Conditional Access |
| 27 | Cloud Storage Exposure | P2-P1 | ทำ private, ตรวจ access log, แจ้งถ้าข้อมูลรั่ว |
| 29 | Shadow IT | P3 | inventory service, ประเมินความเสี่ยง, block หรือ onboard |
| 31 | Cryptomining | P2-P1 | หยุด miner, rotate access key, ตรวจ billing |
| 41 | VPN Abuse | P2 | ปิด VPN account, ตรวจ source, review tunnel log |
| 47 | Cloud Cryptojacking | P1 | kill compute, revoke API key, แจ้ง finance/cloud owner |

## Data, Supply Chain & Physical

| PB | ชื่อ | ระดับ | การดำเนินหลัก |
|:---:|:---|:---:|:---|
| 08 | Data Exfiltration / ข้อมูลรั่ว | P1 | บล็อกช่องทาง, scope ข้อมูล, ประเมิน PDPA notification |
| 19 | Lost/Stolen Device / อุปกรณ์หาย | P2 | remote wipe, ปิดบัญชี, บันทึก chain of custody |
| 20 | Log Clearing / ลบ Log | P1 | เก็บ log ที่เหลือ, restore จาก backup, ตรวจ source |
| 28 | Mobile Device Compromise | P2 | lock/wipe device, revoke token, re-enroll MDM |
| 32 | Supply Chain Attack | P1 | แยก software กระทบ, ตรวจ signature, ติดต่อ vendor |
| 33 | OT/ICS Incident | P1 | ให้ความปลอดภัยมาก่อน, แยก OT segment, ประสาน site owner |
| 35 | Data Collection / Staging | P2 | monitor staging area, บล็อก exfil path, เก็บ archive |
| 40 | USB Removable Media | P3-P2 | quarantine media, scan device, ตรวจ DLP/file access |
| 46 | SIM Swap | P1 | ติดต่อ carrier, reset account, เปลี่ยน MFA ออกจาก SMS |
| 49 | Typosquatting | P3 | บล็อก domain, report registrar, แจ้งผู้ใช้ |

## AI & ML Security

| PB | ชื่อ | ระดับ | การดำเนินหลัก |
|:---:|:---|:---:|:---|
| 51 | AI Prompt Injection | P2-P1 | บล็อก prompt path เสี่ยง, ปิด tool เสี่ยง, ตรวจ output exposure |
| 52 | LLM Data Poisoning | P1 | freeze training/RAG pipeline, ระบุ poisoned record, restore trusted data |
| 53 | AI Model Theft | P1 | หยุด extraction, revoke access, เก็บ API/storage log |

---

## คู่มือ Escalation ด่วน

| ระดับ | SLA ตอบรับ | ส่งต่อถึง | ตัวอย่าง |
|:---:|:---:|:---|:---|
| P1 Critical | 15 นาที | SOC Manager, CISO, Legal, owner ที่เกี่ยวข้อง | Ransomware, active breach, data leak, model theft |
| P2 High | 30 นาที | SOC Manager, Team Lead | Malware, account compromise, cloud exposure |
| P3 Medium | 2 ชั่วโมง | Tier 2 Analyst | Brute force, scanning, policy violation |
| P4 Low | 8 ชั่วโมง | Tier 1 Analyst | False positive, info request |

## ข้อมูลติดต่อ

| บทบาท | ชื่อ | เบอร์ | อีเมล |
|:---|:---|:---|:---|
| SOC Manager | __________ | __________ | __________ |
| CISO | __________ | __________ | __________ |
| Legal / DPO | __________ | __________ | __________ |
| PR / Communications | __________ | __________ | __________ |
| IT Infrastructure Lead | __________ | __________ | __________ |
| Cloud Owner | __________ | __________ | __________ |
| HR Contact | __________ | __________ | __________ |

---

> **เอกสารฉบับเต็ม**: [SOC SOP Repository](https://nutthakorn7.github.io/SOC-SOP/)
>
> **อัปเดตล่าสุด**: 2026-04-26 | **เวอร์ชัน**: 2.14
