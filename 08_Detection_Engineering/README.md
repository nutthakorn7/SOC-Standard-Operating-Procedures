# Detection Rules Index (Sigma)

This directory contains **54 Sigma detection rules** mapped to the SOC Playbooks. Rules are organized by category and can be imported into any Sigma-compatible SIEM (Splunk, Elastic, Microsoft Sentinel, etc.).

## How to Use

1. **Import** the `.yml` files into your SIEM's Sigma converter (e.g., `sigmac`, `pySigma`, Uncoder.io)
2. **Tune** the `falsepositives` and `level` fields to match your environment
3. **Map** each rule to the corresponding Playbook for response procedures

---

## 📋 Detection Rules by Category

### 🖥️ Process / Endpoint Detection

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [proc_office_spawn_powershell.yml](proc_office_spawn_powershell.yml) | Office Application Spawning PowerShell | High | T1059.001 | PB-01 Phishing |
| [proc_powershell_encoded.yml](proc_powershell_encoded.yml) | PowerShell Encoded Command | High | T1059.001 | PB-11 Suspicious Script |
| [proc_temp_folder_execution.yml](proc_temp_folder_execution.yml) | Suspicious Execution from Temp/Downloads | Medium | T1204.002 | PB-03 Malware |
| [proc_cryptomining_indicators.yml](proc_cryptomining_indicators.yml) | Cryptomining Process / Stratum Protocol | Critical | T1496 | PB-23 Cryptomining |
| [win_lolbin_execution.yml](sigma_rules/win_lolbin_execution.yml) | Living Off The Land Binary Execution | High | T1218 | PB-39 LOLBins |

### 📁 File Activity

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [file_bulk_renaming_ransomware.yml](file_bulk_renaming_ransomware.yml) | Potential Ransomware Bulk File Renaming | Critical | T1486 | PB-02 Ransomware |
| [file_bulk_usb_copy.yml](file_bulk_usb_copy.yml) | Bulk File Copy to USB Drive | Medium | T1052 | PB-08 Data Exfiltration |
| [file_usb_autorun.yml](sigma_rules/file_usb_autorun.yml) | USB Removable Media Threat Indicators | Medium | T1091 | PB-40 USB Media |

### 🌐 Network Detection

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [net_beaconing.yml](net_beaconing.yml) | Network Beaconing Pattern | High | T1071 | PB-13 C2 Communication |
| [net_large_upload.yml](net_large_upload.yml) | Large Upload to External IP (>500MB) | High | T1048 | PB-08 Data Exfiltration |
| [net_dns_tunneling.yml](net_dns_tunneling.yml) | DNS Tunneling (High Volume / Long Queries) | High | T1071.004 | PB-24 DNS Tunneling |
| [net_ot_ics_anomaly.yml](net_ot_ics_anomaly.yml) | OT/ICS Network Anomaly (Modbus/DNP3/OPC UA) | Critical | ICS T0813 | PB-30 OT/ICS Incident |
| [net_vpn_abuse.yml](sigma_rules/net_vpn_abuse.yml) | Unauthorized VPN or Proxy Usage | Medium | T1133 | PB-41 VPN Abuse |
| [net_deepfake_social.yml](sigma_rules/net_deepfake_social.yml) | Deepfake Social Engineering Indicators | High | T1598 | PB-48 Deepfake |
| [net_typosquatting.yml](sigma_rules/net_typosquatting.yml) | Typosquatting Domain Access | Medium | T1583.001 | PB-49 Typosquatting |
| [net_unauthorized_scanning.yml](sigma_rules/net_unauthorized_scanning.yml) | Unauthorized Network Scanning | Medium | T1046 | PB-50 Scanning |

### 🔐 Windows Security

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [win_multiple_failed_logins.yml](win_multiple_failed_logins.yml) | Multiple Failed Login Attempts | Medium | T1110 | PB-04 Brute Force |
| [win_admin_share_access.yml](win_admin_share_access.yml) | Access to Admin Shares (C$) | Medium | T1021.002 | PB-12 Lateral Movement |
| [win_domain_admin_group_add.yml](win_domain_admin_group_add.yml) | User Added to Domain Admins | High | T1078 | PB-07 Privilege Escalation |
| [win_new_user_created.yml](win_new_user_created.yml) | New Local User Created | Medium | T1136 | PB-15 Rogue Admin |
| [win_security_log_cleared.yml](win_security_log_cleared.yml) | Windows Security Log Cleared | Critical | T1070.001 | PB-20 Log Clearing |
| [win_security_event_log_cleared.yml](sigma_rules/win_security_event_log_cleared.yml) | Windows Security Event Log Cleared | Critical | T1070.001 | PB-20 Log Clearing |
| [win_network_discovery.yml](sigma_rules/win_network_discovery.yml) | Network Discovery Commands | Medium | T1018 | PB-34 Network Discovery |
| [win_data_collection_staging.yml](sigma_rules/win_data_collection_staging.yml) | Data Collection and Staging | Medium | T1074 | PB-35 Data Collection |
| [win_credential_dumping.yml](sigma_rules/win_credential_dumping.yml) | Credential Dumping (LSASS/SAM/DCSync) | Critical | T1003 | PB-36 Credential Dump |
| [win_wiper_attack.yml](sigma_rules/win_wiper_attack.yml) | Wiper / Destructive Malware Activity | Critical | T1485/T1561 | PB-38 Wiper Attack |
| [win_rootkit_bootkit.yml](sigma_rules/win_rootkit_bootkit.yml) | Rootkit / Bootkit Installation | Critical | T1014/T1542 | PB-45 Rootkit |

### ☁️ Cloud Detection

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [cloud_impossible_travel.yml](cloud_impossible_travel.yml) | Impossible Travel (Cloud/VPN) | High | T1078.004 | PB-06 Impossible Travel |
| [cloud_unusual_login.yml](cloud_unusual_login.yml) | Login from Unusual Location | Medium | T1078.004 | PB-05 Account Compromise |
| [cloud_root_login.yml](cloud_root_login.yml) | AWS Root Account Login | Critical | T1078 | PB-16 Cloud IAM |
| [cloud_aws_ec2_mining.yml](cloud_aws_ec2_mining.yml) | AWS EC2 Crypto Mining Indicator | High | T1496 | PB-23 Cryptomining |
| [cloud_aws_s3_public_access.yml](cloud_aws_s3_public_access.yml) | AWS S3 Public Access Enabled | High | T1530 | Cloud S3 Compromise |
| [cloud_azure_risky_signin.yml](cloud_azure_risky_signin.yml) | Azure AD Risky Sign-in | High | T1078.004 | Azure AD Compromise |
| [cloud_email_inbox_rule.yml](cloud_email_inbox_rule.yml) | Suspicious Inbox Rule Created | High | T1114.003 | PB-17 BEC |
| [cloud_supply_chain_compromise.yml](cloud_supply_chain_compromise.yml) | Suspicious Package Manager Activity | High | T1195.002 | PB-21 Supply Chain |
| [cloud_mfa_bypass.yml](cloud_mfa_bypass.yml) | MFA Bypass / AiTM Token Theft | High | T1556.006 | PB-26 MFA Bypass |
| [cloud_storage_public_access.yml](cloud_storage_public_access.yml) | Cloud Storage Public Access (S3/Blob) | High | T1530 | PB-27 Cloud Storage |
| [cloud_mobile_compromise.yml](cloud_mobile_compromise.yml) | Mobile Device Compromise (MDM) | Medium | T1456 | PB-28 Mobile Compromise |
| [cloud_email_takeover.yml](sigma_rules/cloud_email_takeover.yml) | Email Account Takeover (OAuth/Rules) | High | T1114 | PB-42 Email Takeover |
| [cloud_sim_swap.yml](sigma_rules/cloud_sim_swap.yml) | SIM Swap Attack Indicators | High | T1111 | PB-46 SIM Swap |
| [cloud_cryptojacking.yml](sigma_rules/cloud_cryptojacking.yml) | Cloud Cryptojacking (GPU/Cost Spike) | Critical | T1496 | PB-47 Cryptojacking |

### 🌍 Web / Application

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [web_high_rate_limit.yml](web_high_rate_limit.yml) | High Web Request Rate from Single IP | High | T1498 | PB-09 DDoS / PB-22 API Abuse |
| [web_sqli_pattern.yml](web_sqli_pattern.yml) | Generic SQL Injection Pattern | High | T1190 | PB-10 Web Attack |
| [web_waf_exploit.yml](web_waf_exploit.yml) | WAF Detected Exploit Attempt | High | T1190 | PB-18 Exploit |
| [web_api_abuse_auth_bypass.yml](web_api_abuse_auth_bypass.yml) | API Auth Bypass / Enumeration | High | T1190 | PB-22 API Abuse |
| [web_zero_day_exploit_attempt.yml](web_zero_day_exploit_attempt.yml) | Zero-Day Exploit Payload (Log4Shell, RCE) | Critical | T1190/T1203 | PB-25 Zero-Day |
| [web_sqli_advanced.yml](sigma_rules/web_sqli_advanced.yml) | Advanced SQL Injection (Blind/Time-based) | High | T1190 | PB-37 SQL Injection |
| [web_watering_hole.yml](sigma_rules/web_watering_hole.yml) | Watering Hole Attack Indicators | High | T1189 | PB-43 Watering Hole |
| [web_drive_by_download.yml](sigma_rules/web_drive_by_download.yml) | Drive-By Download (Browser Exploit) | High | T1189 | PB-44 Drive-By |

### 📱 MDM / Device

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [mdm_device_offline.yml](mdm_device_offline.yml) | Device Offline for Extended Period | Low | — | PB-19 Lost Device |

### 🔍 Proxy / CASB

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [proxy_shadow_it.yml](proxy_shadow_it.yml) | Shadow IT / Unauthorized SaaS Usage | Low | T1567 | PB-29 Shadow IT |

---

## 🎯 YARA Rules (File-based Detection)

In addition to Sigma rules, this directory contains **15 YARA rules** for file-based threat detection:

| File | Rules | Detects | Playbook |
|:---|:---:|:---|:---|
| [ransomware_indicators.yar](yara/ransomware_indicators.yar) | 2 | Ransom notes, shadow copy deletion | PB-02 |
| [webshell_generic.yar](yara/webshell_generic.yar) | 3 | PHP/JSP/ASPX webshells | PB-10, PB-18 |
| [cryptominer_detection.yar](yara/cryptominer_detection.yar) | 2 | Mining pools, xmrig binaries | PB-23 |
| [cobalt_strike_beacon.yar](yara/cobalt_strike_beacon.yar) | 2 | CS beacons & stagers | PB-13, PB-12 |
| [malicious_document.yar](yara/malicious_document.yar) | 2 | Office macro malware, PDF JS | PB-01, PB-03 |
| [credential_dumping_tools.yar](yara/credential_dumping_tools.yar) | 2 | Mimikatz, LaZagne, Rubeus, SAM dump | PB-36 |
| [wiper_malware.yar](yara/wiper_malware.yar) | 1 | Shamoon, NotPetya, HermeticWiper | PB-38 |
| [rootkit_bootkit.yar](yara/rootkit_bootkit.yar) | 1 | TDL, ZeroAccess, UEFI rootkits | PB-45 |
| [lolbin_dropper.yar](yara/lolbin_dropper.yar) | 1 | certutil, mshta, BITSAdmin abuse scripts | PB-39 |
| [exploit_kit_payload.yar](yara/exploit_kit_payload.yar) | 1 | Exploit kit landing pages, shellcode | PB-25, PB-43, PB-44 |
| [supply_chain_backdoor.yar](yara/supply_chain_backdoor.yar) | 1 | npm/pip backdoor, SolarWinds/SUNBURST | PB-21 |
| [data_staging_archive.yar](yara/data_staging_archive.yar) | 1 | Password-protected archives, staging | PB-08, PB-35 |

📖 **Full YARA Index**: [yara/README.md](yara/README.md)

---

## 🎯 Detection Coverage Matrix

For a comprehensive view of Sigma, YARA, and MITRE ATT&CK coverage mapped to all 50 playbooks:

> 📊 **[Coverage_Matrix.en.md](Coverage_Matrix.en.md)** | **[ตารางครอบคลุม (TH)](Coverage_Matrix.th.md)**

---

## References
-   [Sigma Official Repository](https://github.com/SigmaHQ/sigma)
-   [MITRE ATT&CK Framework](https://attack.mitre.org/)
-   [Uncoder.io — Sigma Rule Converter](https://uncoder.io/)
-   [YARA Official Documentation](https://yara.readthedocs.io/)
