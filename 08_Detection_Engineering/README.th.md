# ดัชนี Detection Rules (Sigma) — ภาษาไทย

ไดเรกทอรีนี้มี **Sigma Detection Rule 54 กฎ** ที่ map กับ SOC Playbook แต่ละชุด สามารถ Import เข้า SIEM ที่รองรับ Sigma ได้ (Splunk, Elastic, Microsoft Sentinel ฯลฯ)

## วิธีใช้งาน

1. **Import** ไฟล์ `.yml` เข้า Sigma Converter ของ SIEM (เช่น `sigmac`, `pySigma`, Uncoder.io)
2. **ปรับแต่ง** ค่า `falsepositives` และ `level` ให้เหมาะกับสภาพแวดล้อมของคุณ
3. **เชื่อมโยง** แต่ละกฎกับ Playbook ที่เกี่ยวข้องเพื่อขั้นตอนตอบสนอง

---

## 📋 Detection Rules แยกตามหมวดหมู่

### 🖥️ Process / Endpoint Detection (การตรวจจับที่ Endpoint)

| ไฟล์กฎ | ชื่อ (EN) | คำอธิบายภาษาไทย | ระดับ | MITRE | Playbook |
|:---|:---|:---|:---|:---|:---|
| [proc_office_spawn_powershell.yml](proc_office_spawn_powershell.yml) | Office Spawning PowerShell | ตรวจจับ Office (Word/Excel/Outlook) เปิด PowerShell — เทคนิค Phishing ทั่วไป | สูง | T1059.001 | PB-01 |
| [proc_powershell_encoded.yml](proc_powershell_encoded.yml) | PowerShell Encoded Command | ตรวจจับ PowerShell ที่รันคำสั่งแบบ Encode เพื่อซ่อน Script อันตราย | สูง | T1059.001 | PB-11 |
| [proc_temp_folder_execution.yml](proc_temp_folder_execution.yml) | Execution from Temp/Downloads | ตรวจจับไฟล์ที่รันจากโฟลเดอร์ Temp หรือ Downloads — น่าสงสัยว่าเป็นมัลแวร์ | ปานกลาง | T1204.002 | PB-03 |
| [proc_cryptomining_indicators.yml](proc_cryptomining_indicators.yml) | Cryptomining Process / Stratum | ตรวจจับ Process ขุดเหมือง (xmrig, cpuminer) หรือการใช้ Stratum Protocol — ขุดคริปโตโดยไม่ได้รับอนุญาต | วิกฤต | T1496 | PB-31 |
| [win_lolbin_execution.yml](sigma_rules/win_lolbin_execution.yml) | Living Off The Land Binary | ตรวจจับการใช้ LOLBins (certutil, mshta, rundll32, regsvr32) เพื่อดาวน์โหลดหรือรัน Payload อันตราย | สูง | T1218 | PB-39 |

### 📁 File Activity (กิจกรรมไฟล์)

| ไฟล์กฎ | ชื่อ (EN) | คำอธิบายภาษาไทย | ระดับ | MITRE | Playbook |
|:---|:---|:---|:---|:---|:---|
| [file_bulk_renaming_ransomware.yml](file_bulk_renaming_ransomware.yml) | Bulk File Renaming (Ransomware) | ตรวจจับการเปลี่ยนชื่อไฟล์จำนวนมากในเวลาสั้น (เช่น .enc, .lock, .crypt) — สัญญาณ Ransomware | วิกฤต | T1486 | PB-02 |
| [file_bulk_usb_copy.yml](file_bulk_usb_copy.yml) | Bulk File Copy to USB | ตรวจจับการคัดลอกไฟล์จำนวนมากไปยัง USB Drive — อาจเป็นการขโมยข้อมูล | ปานกลาง | T1052 | PB-08 |
| [file_usb_autorun.yml](sigma_rules/file_usb_autorun.yml) | USB Removable Media Threat | ตรวจจับ Autorun จาก USB, สัญญาณ BadUSB และ Mass Storage ที่ไม่ได้รับอนุญาต | ปานกลาง | T1091 | PB-40 |

### 🌐 Network Detection (การตรวจจับเครือข่าย)

| ไฟล์กฎ | ชื่อ (EN) | คำอธิบายภาษาไทย | ระดับ | MITRE | Playbook |
|:---|:---|:---|:---|:---|:---|
| [net_beaconing.yml](net_beaconing.yml) | Network Beaconing Pattern | ตรวจจับการเชื่อมต่อเครือข่ายแบบสม่ำเสมอไปยังปลายทางเดิม — สัญญาณ C2 Beaconing | สูง | T1071 | PB-13 |
| [net_large_upload.yml](net_large_upload.yml) | Large Upload >500MB | ตรวจจับการอัปโหลดข้อมูลมากกว่า 500MB ไปยัง IP ภายนอก — อาจเป็นการรั่วไหลข้อมูล | สูง | T1048 | PB-08 |
| [net_dns_tunneling.yml](net_dns_tunneling.yml) | DNS Tunneling | ตรวจจับ DNS Query ที่มีความยาวผิดปกติ (>50 chars) หรือปริมาณ TXT/NULL record สูง — สัญญาณ DNS Tunneling | สูง | T1071.004 | PB-25 |
| [net_ot_ics_anomaly.yml](net_ot_ics_anomaly.yml) | OT/ICS Network Anomaly | ตรวจจับทราฟฟิก Modbus/DNP3/OPC UA ที่ผิดปกติในเครือข่าย OT/ICS | วิกฤต | ICS T0813 | PB-33 |
| [net_vpn_abuse.yml](sigma_rules/net_vpn_abuse.yml) | Unauthorized VPN/Proxy | ตรวจจับการใช้ VPN ที่ไม่ได้รับอนุญาต (NordVPN, ProtonVPN), Tunnel (ngrok), หรือ Tor | ปานกลาง | T1133 | PB-41 |
| [net_deepfake_social.yml](sigma_rules/net_deepfake_social.yml) | Deepfake Social Engineering | ตรวจจับอีเมลปลอมตัวเป็นผู้บริหาร, คำขอโอนเงินเร่งด่วน, ไฟล์เสียงแนบต้องสงสัย | สูง | T1598 | PB-48 |
| [net_typosquatting.yml](sigma_rules/net_typosquatting.yml) | Typosquatting Domain | ตรวจจับการเข้าถึงโดเมนปลอม (homoglyph, punycode, TLD น่าสงสัย) | ปานกลาง | T1583.001 | PB-49 |
| [net_unauthorized_scanning.yml](sigma_rules/net_unauthorized_scanning.yml) | Unauthorized Scanning | ตรวจจับเครื่องมือ Scan (nmap, masscan) และ Port Sweep จากภายใน | ปานกลาง | T1046 | PB-50 |

### 🔐 Windows Security (ความปลอดภัย Windows)

| ไฟล์กฎ | ชื่อ (EN) | คำอธิบายภาษาไทย | ระดับ | MITRE | Playbook |
|:---|:---|:---|:---|:---|:---|
| [win_multiple_failed_logins.yml](win_multiple_failed_logins.yml) | Multiple Failed Logins | ตรวจจับการ Login ล้มเหลวหลายครั้งในเวลาสั้น — สัญญาณ Brute Force | ปานกลาง | T1110 | PB-04 |
| [win_admin_share_access.yml](win_admin_share_access.yml) | Admin Share Access (C$) | ตรวจจับการเข้าถึง Admin Share (Admin$, C$, D$) — ใช้ในการเคลื่อนตัวข้ามระบบ | ปานกลาง | T1021.002 | PB-12 |
| [win_domain_admin_group_add.yml](win_domain_admin_group_add.yml) | User Added to Domain Admins | ตรวจจับการเพิ่มผู้ใช้เข้ากลุ่ม Domain Admins — การยกระดับสิทธิ์ | สูง | T1078 | PB-07 |
| [win_new_user_created.yml](win_new_user_created.yml) | New Local User Created | ตรวจจับการสร้างบัญชีผู้ใช้ Local ใหม่ — อาจเป็น Backdoor | ปานกลาง | T1136 | PB-15 |
| [win_security_log_cleared.yml](win_security_log_cleared.yml) | Security Log Cleared | ตรวจจับการลบ Windows Security Event Log — ตัวบ่งชี้สำคัญของการถูกบุกรุก | วิกฤต | T1070.001 | PB-20 |
| [win_security_event_log_cleared.yml](sigma_rules/win_security_event_log_cleared.yml) | Security Event Log Cleared | ตรวจจับการลบ Event Log ผ่าน System channel — เทคนิค anti-forensics | วิกฤต | T1070.001 | PB-20 |
| [win_network_discovery.yml](sigma_rules/win_network_discovery.yml) | Network Discovery Commands | ตรวจจับคำสั่ง network reconnaissance (net view, nltest, dsquery) | ปานกลาง | T1018 | PB-34 |
| [win_data_collection_staging.yml](sigma_rules/win_data_collection_staging.yml) | Data Collection/Staging | ตรวจจับการรวบรวมและ staging ข้อมูล (7z, rar, Compress-Archive) | ปานกลาง | T1074 | PB-35 |
| [win_credential_dumping.yml](sigma_rules/win_credential_dumping.yml) | Credential Dumping | ตรวจจับการ dump ข้อมูลรหัสจาก LSASS, SAM, DCSync — เครื่องมือ mimikatz, procdump | วิกฤต | T1003 | PB-36 |
| [win_wiper_attack.yml](sigma_rules/win_wiper_attack.yml) | Wiper / Destructive Malware | ตรวจจับมัลแวร์ทำลายล้าง — ลบ Shadow Copy, เขียนทับ MBR, ลบข้อมูลจำนวนมาก | วิกฤต | T1485/T1561 | PB-38 |
| [win_rootkit_bootkit.yml](sigma_rules/win_rootkit_bootkit.yml) | Rootkit / Bootkit | ตรวจจับ Driver ที่ไม่ได้ลงนาม, การแก้ไข Boot Config, การดัดแปลง UEFI | วิกฤต | T1014/T1542 | PB-45 |

### ☁️ Cloud Detection (การตรวจจับ Cloud)

| ไฟล์กฎ | ชื่อ (EN) | คำอธิบายภาษาไทย | ระดับ | MITRE | Playbook |
|:---|:---|:---|:---|:---|:---|
| [cloud_impossible_travel.yml](cloud_impossible_travel.yml) | Impossible Travel | ตรวจจับ Login จาก 2 สถานที่ที่เดินทางไม่ทันในเวลาที่กำหนด | สูง | T1078.004 | PB-06 |
| [cloud_unusual_login.yml](cloud_unusual_login.yml) | Unusual Login Location | ตรวจจับ Login จากประเทศที่ไม่อยู่ในรายการอนุมัติ | ปานกลาง | T1078.004 | PB-05 |
| [cloud_root_login.yml](cloud_root_login.yml) | AWS Root Account Login | ตรวจจับการ Login ด้วยบัญชี Root ของ AWS — ไม่ควรใช้ในการทำงานปกติ | วิกฤต | T1078 | PB-16 |
| [cloud_aws_ec2_mining.yml](cloud_aws_ec2_mining.yml) | EC2 Crypto Mining | ตรวจจับ EC2 Instance ที่เชื่อมต่อกับ Mining Pool ผ่าน GuardDuty | สูง | T1496 | PB-22/PB-31 |
| [cloud_aws_s3_public_access.yml](cloud_aws_s3_public_access.yml) | S3 Public Access Enabled | ตรวจจับการปิด Block Public Access หรือ Bucket Policy ที่เปิดเป็น Public | สูง | T1530 | PB-21 |
| [cloud_azure_risky_signin.yml](cloud_azure_risky_signin.yml) | Azure AD Risky Sign-in | ตรวจจับ Sign-in ที่ถูกแฟล็กว่า Impossible Travel หรือ Anonymized IP | สูง | T1078.004 | PB-23 |
| [cloud_email_inbox_rule.yml](cloud_email_inbox_rule.yml) | Suspicious Inbox Rule | ตรวจจับการสร้าง Inbox Rule ที่ผู้โจมตีใช้ซ่อนอีเมล (เช่น ลบ, ย้ายไป RSS) | สูง | T1114.003 | PB-17 |
| [cloud_supply_chain_compromise.yml](cloud_supply_chain_compromise.yml) | Supply Chain Package Tampering | ตรวจจับ Package Manager (npm, pip, gem) ที่ Install จาก Registry ไม่ปกติ — สัญญาณ Supply Chain Attack | สูง | T1195.002 | PB-32 |
| [cloud_mfa_bypass.yml](cloud_mfa_bypass.yml) | MFA Bypass / AiTM Token Theft | ตรวจจับการ Bypass MFA ผ่าน AiTM Proxy หรือ Token Theft | สูง | T1556.006 | PB-26 |
| [cloud_storage_public_access.yml](cloud_storage_public_access.yml) | Cloud Storage Public Access | ตรวจจับการเปิด Public Access ของ Cloud Storage (S3/Blob) | สูง | T1530 | PB-27 |
| [cloud_mobile_compromise.yml](cloud_mobile_compromise.yml) | Mobile Device Compromise | ตรวจจับสัญญาณการโจมตีอุปกรณ์มือถือผ่าน MDM | ปานกลาง | T1456 | PB-28 |
| [cloud_email_takeover.yml](sigma_rules/cloud_email_takeover.yml) | Email Account Takeover | ตรวจจับการยึดบัญชีอีเมล — OAuth App ต้องสงสัย, กฎส่งต่ออีเมล, การเปลี่ยน Delegate | สูง | T1114 | PB-42 |
| [cloud_sim_swap.yml](sigma_rules/cloud_sim_swap.yml) | SIM Swap Attack | ตรวจจับสัญญาณ SIM Swap — เปลี่ยนเบอร์โทร, เปลี่ยนวิธี MFA, รีเซ็ตรหัส | สูง | T1111 | PB-46 |
| [cloud_cryptojacking.yml](sigma_rules/cloud_cryptojacking.yml) | Cloud Cryptojacking | ตรวจจับการขุดคริปโตบน Cloud — สร้าง GPU Instance, ค่าใช้จ่ายพุ่ง, API Key abuse | วิกฤต | T1496 | PB-47 |

### 🌍 Web / Application (เว็บ / แอปพลิเคชัน)

| ไฟล์กฎ | ชื่อ (EN) | คำอธิบายภาษาไทย | ระดับ | MITRE | Playbook |
|:---|:---|:---|:---|:---|:---|
| [web_high_rate_limit.yml](web_high_rate_limit.yml) | High Request Rate | ตรวจจับ IP เดียวส่ง HTTP Request จำนวนมากผิดปกติ — สัญญาณ DDoS หรือ Scanning | สูง | T1498 | PB-09/30 |
| [web_sqli_pattern.yml](web_sqli_pattern.yml) | SQL Injection Pattern | ตรวจจับรูปแบบ SQL Injection ทั่วไปใน URL Parameter | สูง | T1190 | PB-10 |
| [web_waf_exploit.yml](web_waf_exploit.yml) | WAF Exploit Attempt | ตรวจจับ WAF Event ที่แฟล็กการพยายามโจมตีด้วย CVE ที่รู้จัก | สูง | T1190 | PB-18 |
| [web_api_abuse_auth_bypass.yml](web_api_abuse_auth_bypass.yml) | API Auth Bypass / Enumeration | ตรวจจับการโจมตี API แบบ BOLA/IDOR — วน ID ต่อเนื่องหรือ Auth Fail จำนวนมาก | สูง | T1190 | PB-30 |
| [web_zero_day_exploit_attempt.yml](web_zero_day_exploit_attempt.yml) | Zero-Day Exploit Payload | ตรวจจับ Payload ที่ใช้โจมตีช่องโหว่ (Log4Shell, Spring4Shell, RCE) ใน Web Request | วิกฤต | T1190/T1203 | PB-24 |
| [web_sqli_advanced.yml](sigma_rules/web_sqli_advanced.yml) | Advanced SQL Injection | ตรวจจับ SQLi ขั้นสูง — Blind SQLi, Time-based, Error-based extraction | สูง | T1190 | PB-37 |
| [web_watering_hole.yml](sigma_rules/web_watering_hole.yml) | Watering Hole Attack | ตรวจจับ Redirect จากเว็บที่เชื่อถือไปยัง Exploit Kit หรือโดเมนอันตราย | สูง | T1189 | PB-43 |
| [web_drive_by_download.yml](sigma_rules/web_drive_by_download.yml) | Drive-By Download | ตรวจจับ Browser สร้าง Process ต้องสงสัย (cmd, powershell, wscript) — สัญญาณ Exploit | สูง | T1189 | PB-44 |

### 📱 MDM / Device (อุปกรณ์)

| ไฟล์กฎ | ชื่อ (EN) | คำอธิบายภาษาไทย | ระดับ | MITRE | Playbook |
|:---|:---|:---|:---|:---|:---|
| [mdm_device_offline.yml](mdm_device_offline.yml) | Device Offline >30 Days | ตรวจจับอุปกรณ์ที่ไม่ Check-in กับ MDM Server มากกว่า 30 วัน | ต่ำ | — | PB-19 |

### 🔍 Proxy / CASB

| ไฟล์กฎ | ชื่อ (EN) | คำอธิบายภาษาไทย | ระดับ | MITRE | Playbook |
|:---|:---|:---|:---|:---|:---|
| [proxy_shadow_it.yml](proxy_shadow_it.yml) | Shadow IT / Unauthorized SaaS | ตรวจจับการใช้ SaaS ที่ไม่ได้รับอนุมัติ (Dropbox, WeTransfer ฯลฯ) | ต่ำ | T1567 | PB-29 |

### 🤖 AI / ML Security

| ไฟล์กฎ | ชื่อ (EN) | คำอธิบายภาษาไทย | ระดับ | MITRE / ATLAS | Playbook |
|:---|:---|:---|:---|:---|:---|
| [ai_prompt_injection.yml](sigma_rules/ai_prompt_injection.yml) | AI Prompt Injection Attack Pattern | ตรวจจับ jailbreak, system prompt extraction และคำสั่ง override ต่อ LLM endpoint | สูง | AML.T0051, T1059 | PB-51 |
| [ai_data_poisoning.yml](sigma_rules/ai_data_poisoning.yml) | LLM Data Poisoning Indicators | ตรวจจับการแก้ไข training data, RAG source หรือ dataset จำนวนมากโดยผิดปกติ | สูง | AML.T0020, T1565 | PB-52 |
| [ai_model_theft.yml](sigma_rules/ai_model_theft.yml) | AI Model Theft or Extraction Attempt | ตรวจจับ inference call ปริมาณสูงและการ download model weight ที่ไม่ได้รับอนุญาต | สูง | AML.T0024, T1020 | PB-53 |

---

## ระดับความรุนแรง (Severity Level)

| ระดับ | ความหมาย | การตอบสนอง |
|:---|:---|:---|
| 🔴 **วิกฤต (Critical)** | ตัวบ่งชี้การถูกบุกรุกที่ชัดเจน | ตอบสนองทันที — แจ้ง Tier 2+ |
| 🟠 **สูง (High)** | มีโอกาสสูงที่เป็นเหตุการณ์จริง | ตรวจสอบภายใน 15 นาที |
| 🟡 **ปานกลาง (Medium)** | ต้องตรวจสอบเพิ่มเติม | ตรวจสอบภายใน 1 ชั่วโมง |
| 🟢 **ต่ำ (Low)** | ข้อมูลเสริม / ปกติ | ตรวจสอบในเวลาทำการ |

## 🎯 ตาราง Detection Coverage

ดูภาพรวม Sigma, YARA และ MITRE ATT&CK ที่ครอบคลุมทุก 53 Playbook:

> 📊 **[Coverage_Matrix.th.md](Coverage_Matrix.th.md)** | **[Coverage Matrix (EN)](Coverage_Matrix.en.md)**

---

## 📚 คลัง Use Case สำหรับ SOC

ใช้คลัง Use Case สำหรับ SOC เพื่อจัดลำดับ detection ตาม maturity, business risk, telemetry readiness, response playbook และ KPI:

> 📘 **[SOC_Use_Case_Library.th.md](SOC_Use_Case_Library.th.md)** | **[SOC Use Case Library (EN)](SOC_Use_Case_Library.en.md)**

---

## References
-   [Sigma Official Repository](https://github.com/SigmaHQ/sigma)
-   [MITRE ATT&CK Framework](https://attack.mitre.org/)
-   [Uncoder.io — Sigma Rule Converter](https://uncoder.io/)
