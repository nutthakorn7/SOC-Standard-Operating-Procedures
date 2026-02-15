# Detection Rules Index (Sigma)

This directory contains **28 Sigma detection rules** mapped to the SOC Playbooks. Rules are organized by category and can be imported into any Sigma-compatible SIEM (Splunk, Elastic, Microsoft Sentinel, etc.).

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

### 📁 File Activity

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [file_bulk_renaming_ransomware.yml](file_bulk_renaming_ransomware.yml) | Potential Ransomware Bulk File Renaming | Critical | T1486 | PB-02 Ransomware |
| [file_bulk_usb_copy.yml](file_bulk_usb_copy.yml) | Bulk File Copy to USB Drive | Medium | T1052 | PB-08 Data Exfiltration |

### 🌐 Network Detection

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [net_beaconing.yml](net_beaconing.yml) | Network Beaconing Pattern | High | T1071 | PB-13 C2 Communication |
| [net_large_upload.yml](net_large_upload.yml) | Large Upload to External IP (>500MB) | High | T1048 | PB-08 Data Exfiltration |
| [net_dns_tunneling.yml](net_dns_tunneling.yml) | DNS Tunneling (High Volume / Long Queries) | High | T1071.004 | PB-24 DNS Tunneling |

### 🔐 Windows Security

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [win_multiple_failed_logins.yml](win_multiple_failed_logins.yml) | Multiple Failed Login Attempts | Medium | T1110 | PB-04 Brute Force |
| [win_admin_share_access.yml](win_admin_share_access.yml) | Access to Admin Shares (C$) | Medium | T1021.002 | PB-12 Lateral Movement |
| [win_domain_admin_group_add.yml](win_domain_admin_group_add.yml) | User Added to Domain Admins | High | T1078 | PB-07 Privilege Escalation |
| [win_new_user_created.yml](win_new_user_created.yml) | New Local User Created | Medium | T1136 | PB-15 Rogue Admin |
| [win_security_log_cleared.yml](win_security_log_cleared.yml) | Windows Security Log Cleared | Critical | T1070.001 | PB-20 Log Clearing |

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

### 🌍 Web / Application

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [web_high_rate_limit.yml](web_high_rate_limit.yml) | High Web Request Rate from Single IP | High | T1498 | PB-09 DDoS / PB-22 API Abuse |
| [web_sqli_pattern.yml](web_sqli_pattern.yml) | Generic SQL Injection Pattern | High | T1190 | PB-10 Web Attack |
| [web_waf_exploit.yml](web_waf_exploit.yml) | WAF Detected Exploit Attempt | High | T1190 | PB-18 Exploit |
| [web_api_abuse_auth_bypass.yml](web_api_abuse_auth_bypass.yml) | API Auth Bypass / Enumeration | High | T1190 | PB-22 API Abuse |
| [web_zero_day_exploit_attempt.yml](web_zero_day_exploit_attempt.yml) | Zero-Day Exploit Payload (Log4Shell, RCE) | Critical | T1190/T1203 | PB-25 Zero-Day |

### 📱 MDM / Device

| Rule File | Title | Level | MITRE ATT&CK | Playbook |
|:---|:---|:---|:---|:---|
| [mdm_device_offline.yml](mdm_device_offline.yml) | Device Offline for Extended Period | Low | — | PB-19 Lost Device |

---

## 🎯 YARA Rules (File-based Detection)

In addition to Sigma rules, this directory contains **10 YARA rules** for file-based threat detection:

| File | Rules | Detects | Playbook |
|:---|:---:|:---|:---|
| [ransomware_indicators.yar](yara/ransomware_indicators.yar) | 2 | Ransom notes, shadow copy deletion | PB-02 |
| [webshell_generic.yar](yara/webshell_generic.yar) | 3 | PHP/JSP/ASPX webshells | PB-10, PB-18 |
| [cryptominer_detection.yar](yara/cryptominer_detection.yar) | 2 | Mining pools, xmrig binaries | PB-23 |
| [cobalt_strike_beacon.yar](yara/cobalt_strike_beacon.yar) | 2 | CS beacons & stagers | PB-13, PB-12 |
| [malicious_document.yar](yara/malicious_document.yar) | 2 | Office macro malware, PDF JS | PB-01, PB-03 |

📖 **Full YARA Index**: [yara/README.md](yara/README.md)

---

## References
-   [Sigma Official Repository](https://github.com/SigmaHQ/sigma)
-   [MITRE ATT&CK Framework](https://attack.mitre.org/)
-   [Uncoder.io — Sigma Rule Converter](https://uncoder.io/)
-   [YARA Official Documentation](https://yara.readthedocs.io/)
