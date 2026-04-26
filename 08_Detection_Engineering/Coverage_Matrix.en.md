# 🎯 Detection Coverage Matrix

> **ตารางครอบคลุมการตรวจจับ** — แสดง Sigma Rule, YARA Rule และ MITRE ATT&CK สำหรับทุก Playbook
>
> **Version**: 2.14.0 | **Last updated**: 2026-04-26

---

## 📊 Coverage Summary

| Metric | Count | Coverage |
|:---|:---:|:---:|
| Total Playbooks | 53 | — |
| Playbooks with Sigma Rules | 53 | **100%** ✅ |
| Total Sigma Rules | 54 | 1+ per playbook |
| Total YARA Rules | 15 | File-based threats |
| MITRE ATT&CK / ATLAS Techniques | 43+ | Mapped to all rules |

---

## 🗺️ Full Coverage Map

| # | Playbook | Sigma Rule(s) | YARA | MITRE ATT&CK | Level |
|:---:|:---|:---|:---:|:---|:---:|
| PB-01 | **Phishing** | `proc_office_spawn_powershell` | ✅ `malicious_document` | T1566, T1059.001 | 🟠 High |
| PB-02 | **Ransomware** | `file_bulk_renaming_ransomware` | ✅ `ransomware_indicators` | T1486 | 🔴 Critical |
| PB-03 | **Malware Infection** | `proc_temp_folder_execution` | ✅ `malicious_document` | T1204.002 | 🟠 High |
| PB-04 | **Brute Force** | `win_multiple_failed_logins` | — | T1110 | 🟡 Medium |
| PB-05 | **Account Compromise** | `cloud_unusual_login` | — | T1078.004 | 🟡 Medium |
| PB-06 | **Impossible Travel** | `cloud_impossible_travel` | — | T1078.004 | 🟠 High |
| PB-07 | **Privilege Escalation** | `win_domain_admin_group_add` | — | T1078 | 🟠 High |
| PB-08 | **Data Exfiltration** | `file_bulk_usb_copy`, `net_large_upload` | ✅ `data_staging_archive` | T1052, T1048 | 🟠 High |
| PB-09 | **DDoS Attack** | `web_high_rate_limit` | — | T1498 | 🟠 High |
| PB-10 | **Web Attack** | `web_sqli_pattern` | ✅ `webshell_generic` | T1190 | 🟠 High |
| PB-11 | **Suspicious Script** | `proc_powershell_encoded` | — | T1059.001 | 🟠 High |
| PB-12 | **Lateral Movement** | `win_admin_share_access` | ✅ `cobalt_strike_beacon` | T1021.002 | 🟡 Medium |
| PB-13 | **C2 Communication** | `net_beaconing` | ✅ `cobalt_strike_beacon` | T1071 | 🟠 High |
| PB-14 | **Insider Threat** | `file_bulk_usb_copy`, `net_large_upload` | — | T1052, T1048 | 🟠 High |
| PB-15 | **Rogue Admin** | `win_new_user_created` | — | T1136 | 🟡 Medium |
| PB-16 | **Cloud IAM** | `cloud_root_login` | — | T1078 | 🔴 Critical |
| PB-17 | **BEC** | `cloud_email_inbox_rule` | — | T1114.003 | 🟠 High |
| PB-18 | **Exploit** | `web_waf_exploit` | ✅ `webshell_generic` | T1190 | 🟠 High |
| PB-19 | **Lost Device** | `mdm_device_offline` | — | — | 🟢 Low |
| PB-20 | **Log Clearing** | `win_security_log_cleared`, `win_security_event_log_cleared` | — | T1070.001 | 🔴 Critical |
| PB-21 | **AWS S3 Compromise** | `cloud_aws_s3_public_access` | — | T1530 | 🟠 High |
| PB-22 | **AWS EC2 Compromise** | `cloud_aws_ec2_mining`, `cloud_root_login` | — | T1078, T1496 | 🟠 High |
| PB-23 | **Azure AD Compromise** | `cloud_azure_risky_signin` | — | T1078.004 | 🟠 High |
| PB-24 | **Zero-Day Exploit** | `web_zero_day_exploit_attempt` | ✅ `exploit_kit_payload` | T1190, T1203 | 🔴 Critical |
| PB-25 | **DNS Tunneling** | `net_dns_tunneling` | — | T1071.004 | 🟠 High |
| PB-26 | **MFA Bypass** | `cloud_mfa_bypass` | — | T1556.006 | 🟠 High |
| PB-27 | **Cloud Storage** | `cloud_storage_public_access`, `cloud_aws_s3_public_access` | — | T1530 | 🟠 High |
| PB-28 | **Mobile Compromise** | `cloud_mobile_compromise` | — | T1456 | 🟡 Medium |
| PB-29 | **Shadow IT** | `proxy_shadow_it` | — | T1567 | 🟢 Low |
| PB-30 | **API Abuse** | `web_api_abuse_auth_bypass`, `web_high_rate_limit` | — | T1190 | 🟠 High |
| PB-31 | **Cryptomining** | `proc_cryptomining_indicators`, `cloud_aws_ec2_mining` | ✅ `cryptominer_detection` | T1496 | 🟠 High |
| PB-32 | **Supply Chain** | `cloud_supply_chain_compromise` | ✅ `supply_chain_backdoor` | T1195.002 | 🟠 High |
| PB-33 | **OT/ICS Incident** | `net_ot_ics_anomaly` | — | ICS T0813 | 🔴 Critical |
| PB-34 | **Network Discovery** | `win_network_discovery` | — | T1018 | 🟡 Medium |
| PB-35 | **Data Collection** | `win_data_collection_staging` | ✅ `data_staging_archive` | T1074 | 🟡 Medium |
| PB-36 | **Credential Dumping** | `win_credential_dumping` | ✅ `credential_dumping_tools` | T1003 | 🔴 Critical |
| PB-37 | **SQL Injection** | `web_sqli_advanced`, `web_sqli_pattern` | — | T1190 | 🟠 High |
| PB-38 | **Wiper Attack** | `win_wiper_attack` | ✅ `wiper_malware` | T1485, T1561 | 🔴 Critical |
| PB-39 | **Living Off The Land** | `win_lolbin_execution` | ✅ `lolbin_dropper` | T1218 | 🟠 High |
| PB-40 | **USB Removable Media** | `file_usb_autorun` | — | T1091 | 🟡 Medium |
| PB-41 | **VPN Abuse** | `net_vpn_abuse` | — | T1133 | 🟡 Medium |
| PB-42 | **Email Account Takeover** | `cloud_email_takeover` | — | T1114 | 🟠 High |
| PB-43 | **Watering Hole** | `web_watering_hole` | ✅ `exploit_kit_payload` | T1189 | 🟠 High |
| PB-44 | **Drive-By Download** | `web_drive_by_download` | ✅ `exploit_kit_payload` | T1189 | 🟠 High |
| PB-45 | **Rootkit/Bootkit** | `win_rootkit_bootkit` | ✅ `rootkit_bootkit` | T1014, T1542 | 🔴 Critical |
| PB-46 | **SIM Swap** | `cloud_sim_swap` | — | T1111 | 🟠 High |
| PB-47 | **Cloud Cryptojacking** | `cloud_cryptojacking` | — | T1496 | 🔴 Critical |
| PB-48 | **Deepfake Social Eng** | `net_deepfake_social` | — | T1598 | 🟠 High |
| PB-49 | **Typosquatting** | `net_typosquatting` | — | T1583.001 | 🟡 Medium |
| PB-50 | **Unauthorized Scanning** | `net_unauthorized_scanning` | — | T1046 | 🟡 Medium |
| PB-51 | **AI Prompt Injection** | `ai_prompt_injection` | — | AML.T0051, T1059 | 🟠 High |
| PB-52 | **LLM Data Poisoning** | `ai_data_poisoning` | — | AML.T0020, T1565 | 🔴 Critical |
| PB-53 | **AI Model Theft** | `ai_model_theft` | — | AML.T0024, T1020 | 🔴 Critical |

---

## 📈 Coverage by Severity

| Severity | Count | Playbooks |
|:---|:---:|:---|
| 🔴 Critical | 11 | PB-02, 16, 20, 24, 33, 36, 38, 45, 47, 52–53 |
| 🟠 High | 29 | PB-01, 03, 06–11, 13–14, 17–18, 21–23, 25–27, 30–32, 37, 39, 42–44, 46, 48, 51 |
| 🟡 Medium | 11 | PB-04–05, 12, 15, 28, 34–35, 40–41, 49–50 |
| 🟢 Low | 2 | PB-19, 29 |

## 🧬 YARA Coverage

| YARA Rule File | Rules | Playbooks Covered |
|:---|:---:|:---|
| `ransomware_indicators.yar` | 2 | PB-02 Ransomware |
| `webshell_generic.yar` | 3 | PB-10 Web Attack, PB-18 Exploit |
| `cryptominer_detection.yar` | 2 | PB-31 Cryptomining |
| `cobalt_strike_beacon.yar` | 2 | PB-12 Lateral Movement, PB-13 C2 |
| `malicious_document.yar` | 2 | PB-01 Phishing, PB-03 Malware |
| `credential_dumping_tools.yar` | 2 | PB-36 Credential Dumping |
| `wiper_malware.yar` | 1 | PB-38 Wiper Attack |
| `rootkit_bootkit.yar` | 1 | PB-45 Rootkit/Bootkit |
| `lolbin_dropper.yar` | 1 | PB-39 Living Off The Land |
| `exploit_kit_payload.yar` | 1 | PB-24 Zero-Day, PB-43 Watering Hole, PB-44 Drive-By |
| `supply_chain_backdoor.yar` | 1 | PB-32 Supply Chain |
| `data_staging_archive.yar` | 1 | PB-08 Data Exfil, PB-35 Data Collection |

---

## Related Documents
- [Detection Rules Index (EN)](README.md)
- [ดัชนี Detection Rules (TH)](README.th.md)
- [MITRE ATT&CK Heatmap](../tools/mitre_attack_heatmap.html)
- [Compliance Mapping](../07_Compliance_Privacy/Compliance_Mapping.en.md)
