# 🎯 ตารางครอบคลุมการตรวจจับ (Detection Coverage Matrix)

> แสดง Sigma Rule, YARA Rule และ MITRE ATT&CK สำหรับทุก Playbook
>
> **Version**: 2.14.0 | **อัปเดตล่าสุด**: 2026-04-26

---

## 📊 สรุปภาพรวม

| ตัวชี้วัด | จำนวน | ครอบคลุม |
|:---|:---:|:---:|
| Playbook ทั้งหมด | 53 | — |
| Playbook ที่มี Sigma Rules | 53 | **100%** ✅ |
| Sigma Rules ทั้งหมด | 54 | 1+ ต่อ playbook |
| YARA Rules ทั้งหมด | 15 | ภัยคุกคามที่เป็นไฟล์ |
| เทคนิค MITRE ATT&CK / ATLAS | 43+ | map ครบทุกกฎ |

---

## 🗺️ ตาราง Coverage ทั้งหมด

| # | Playbook | Sigma Rule(s) | YARA | MITRE ATT&CK | ระดับ |
|:---:|:---|:---|:---:|:---|:---:|
| PB-01 | **ฟิชชิ่ง** | `proc_office_spawn_powershell` | ✅ | T1566, T1059.001 | 🟠 สูง |
| PB-02 | **แรนซัมแวร์** | `file_bulk_renaming_ransomware` | ✅ | T1486 | 🔴 วิกฤต |
| PB-03 | **มัลแวร์** | `proc_temp_folder_execution` | ✅ | T1204.002 | 🟠 สูง |
| PB-04 | **Brute Force** | `win_multiple_failed_logins` | — | T1110 | 🟡 ปานกลาง |
| PB-05 | **บัญชีถูกยึด** | `cloud_unusual_login` | — | T1078.004 | 🟡 ปานกลาง |
| PB-06 | **Impossible Travel** | `cloud_impossible_travel` | — | T1078.004 | 🟠 สูง |
| PB-07 | **ยกระดับสิทธิ์** | `win_domain_admin_group_add` | — | T1078 | 🟠 สูง |
| PB-08 | **ขโมยข้อมูล** | `file_bulk_usb_copy`, `net_large_upload` | ✅ | T1052, T1048 | 🟠 สูง |
| PB-09 | **DDoS** | `web_high_rate_limit` | — | T1498 | 🟠 สูง |
| PB-10 | **โจมตีเว็บ** | `web_sqli_pattern` | ✅ | T1190 | 🟠 สูง |
| PB-11 | **Script ต้องสงสัย** | `proc_powershell_encoded` | — | T1059.001 | 🟠 สูง |
| PB-12 | **เคลื่อนตัวข้ามระบบ** | `win_admin_share_access` | ✅ | T1021.002 | 🟡 ปานกลาง |
| PB-13 | **C2 Communication** | `net_beaconing` | ✅ | T1071 | 🟠 สูง |
| PB-14 | **ภัยคุกคามจากภายใน** | `file_bulk_usb_copy`, `net_large_upload` | — | T1052, T1048 | 🟠 สูง |
| PB-15 | **แอดมินปลอม** | `win_new_user_created` | — | T1136 | 🟡 ปานกลาง |
| PB-16 | **Cloud IAM** | `cloud_root_login` | — | T1078 | 🔴 วิกฤต |
| PB-17 | **BEC** | `cloud_email_inbox_rule` | — | T1114.003 | 🟠 สูง |
| PB-18 | **Exploit** | `web_waf_exploit` | ✅ | T1190 | 🟠 สูง |
| PB-19 | **อุปกรณ์หาย** | `mdm_device_offline` | — | — | 🟢 ต่ำ |
| PB-20 | **ลบ Log** | `win_security_log_cleared` ×2 | — | T1070.001 | 🔴 วิกฤต |
| PB-21 | **AWS S3** | `cloud_aws_s3_public_access` | — | T1530 | 🟠 สูง |
| PB-22 | **AWS EC2** | `cloud_aws_ec2_mining`, `cloud_root_login` | — | T1078, T1496 | 🟠 สูง |
| PB-23 | **Azure AD** | `cloud_azure_risky_signin` | — | T1078.004 | 🟠 สูง |
| PB-24 | **Zero-Day** | `web_zero_day_exploit_attempt` | ✅ | T1190, T1203 | 🔴 วิกฤต |
| PB-25 | **DNS Tunneling** | `net_dns_tunneling` | — | T1071.004 | 🟠 สูง |
| PB-26 | **MFA Bypass** | `cloud_mfa_bypass` | — | T1556.006 | 🟠 สูง |
| PB-27 | **Cloud Storage** | `cloud_storage_public_access` ×2 | — | T1530 | 🟠 สูง |
| PB-28 | **มือถือถูกยึด** | `cloud_mobile_compromise` | — | T1456 | 🟡 ปานกลาง |
| PB-29 | **Shadow IT** | `proxy_shadow_it` | — | T1567 | 🟢 ต่ำ |
| PB-30 | **API Abuse** | `web_api_abuse_auth_bypass`, `web_high_rate_limit` | — | T1190 | 🟠 สูง |
| PB-31 | **ขุดคริปโต** | `proc_cryptomining_indicators`, `cloud_aws_ec2_mining` | ✅ | T1496 | 🟠 สูง |
| PB-32 | **Supply Chain** | `cloud_supply_chain_compromise` | ✅ | T1195.002 | 🟠 สูง |
| PB-33 | **OT/ICS** | `net_ot_ics_anomaly` | — | ICS T0813 | 🔴 วิกฤต |
| PB-34 | **Network Discovery** | `win_network_discovery` | — | T1018 | 🟡 ปานกลาง |
| PB-35 | **รวบรวมข้อมูล** | `win_data_collection_staging` | ✅ | T1074 | 🟡 ปานกลาง |
| PB-36 | **Credential Dump** | `win_credential_dumping` | ✅ | T1003 | 🔴 วิกฤต |
| PB-37 | **SQL Injection** | `web_sqli_advanced` | — | T1190 | 🟠 สูง |
| PB-38 | **Wiper** | `win_wiper_attack` | ✅ | T1485, T1561 | 🔴 วิกฤต |
| PB-39 | **LOLBins** | `win_lolbin_execution` | ✅ | T1218 | 🟠 สูง |
| PB-40 | **USB** | `file_usb_autorun` | — | T1091 | 🟡 ปานกลาง |
| PB-41 | **VPN Abuse** | `net_vpn_abuse` | — | T1133 | 🟡 ปานกลาง |
| PB-42 | **อีเมลถูกยึด** | `cloud_email_takeover` | — | T1114 | 🟠 สูง |
| PB-43 | **Watering Hole** | `web_watering_hole` | ✅ | T1189 | 🟠 สูง |
| PB-44 | **Drive-By** | `web_drive_by_download` | ✅ | T1189 | 🟠 สูง |
| PB-45 | **Rootkit** | `win_rootkit_bootkit` | ✅ | T1014, T1542 | 🔴 วิกฤต |
| PB-46 | **SIM Swap** | `cloud_sim_swap` | — | T1111 | 🟠 สูง |
| PB-47 | **Cloud Cryptojacking** | `cloud_cryptojacking` | — | T1496 | 🔴 วิกฤต |
| PB-48 | **Deepfake** | `net_deepfake_social` | — | T1598 | 🟠 สูง |
| PB-49 | **Typosquatting** | `net_typosquatting` | — | T1583.001 | 🟡 ปานกลาง |
| PB-50 | **Scanning** | `net_unauthorized_scanning` | — | T1046 | 🟡 ปานกลาง |
| PB-51 | **AI Prompt Injection** | `ai_prompt_injection` | — | AML.T0051, T1059 | 🟠 สูง |
| PB-52 | **LLM Data Poisoning** | `ai_data_poisoning` | — | AML.T0020, T1565 | 🔴 วิกฤต |
| PB-53 | **AI Model Theft** | `ai_model_theft` | — | AML.T0024, T1020 | 🔴 วิกฤต |

---

## 📈 สรุปตามระดับความรุนแรง

| ระดับ | จำนวน |
|:---|:---:|
| 🔴 วิกฤต (Critical) | 11 |
| 🟠 สูง (High) | 29 |
| 🟡 ปานกลาง (Medium) | 11 |
| 🟢 ต่ำ (Low) | 2 |

---

## เอกสารที่เกี่ยวข้อง
- [Detection Rules Index (EN)](README.md)
- [ดัชนี Detection Rules (TH)](README.th.md)
- [MITRE ATT&CK Heatmap](../tools/mitre_attack_heatmap.html)
- [Compliance Mapping (TH)](../07_Compliance_Privacy/Compliance_Mapping.th.md)
