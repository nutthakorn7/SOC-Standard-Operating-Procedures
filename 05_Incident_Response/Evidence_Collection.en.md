# Evidence Collection Guide — Digital Forensics

> **Document ID:** FOR-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Owner:** IR Lead / Forensic Analyst  
> **Classification:** Internal

---

## Golden Rules of Evidence Collection

1. **Don't modify evidence** — Work on copies, never originals
2. **Document everything** — Who, what, when, where, why, how
3. **Maintain chain of custody** — Every handoff is recorded
4. **Prioritize volatile data** — Memory first, then disk
5. **Use write blockers** — For physical disk acquisition

---

## Order of Volatility (Collect in This Order)

| Priority | Source | Volatility | Tool |
|:---:|:---|:---|:---|
| 1 | **CPU Registers/Cache** | Seconds | N/A (rarely feasible) |
| 2 | **RAM (Memory)** | Minutes | WinPMEM, LiME, Magnet RAM |
| 3 | **Network Connections** | Minutes | netstat, ss, tcpdump |
| 4 | **Running Processes** | Minutes | Velociraptor, GRR, tasklist |
| 5 | **Disk (Live)** | Hours | FTK Imager, dc3dd |
| 6 | **Logs (Remote)** | Days | SIEM export, syslog |
| 7 | **Disk (Offline)** | Permanent | dd, FTK Imager |
| 8 | **Backups/Archives** | Permanent | Backup system |

---

## Windows Evidence Collection

### Memory Acquisition
```powershell
# WinPMEM (run as Administrator)
winpmem_mini_x64.exe memory_dump.raw

# Verify hash
certutil -hashfile memory_dump.raw SHA256
```

### Live Triage Commands
```powershell
# Running processes with parent
Get-CimInstance Win32_Process | Select ProcessId, Name, ParentProcessId, CommandLine | Export-Csv processes.csv

# Network connections
Get-NetTCPConnection | Where {$_.State -eq "Established"} | Export-Csv netconn.csv

# Logged-on users
query user

# Scheduled tasks
schtasks /query /fo CSV > scheduled_tasks.csv

# Startup items
Get-CimInstance Win32_StartupCommand | Export-Csv startup.csv

# Recent file activity (last 24h)
Get-ChildItem -Recurse -Path C:\ -ErrorAction SilentlyContinue | Where {$_.LastWriteTime -gt (Get-Date).AddHours(-24)} | Export-Csv recent_files.csv

# DNS cache
Get-DnsClientCache | Export-Csv dns_cache.csv

# Event logs - Security (last 24h)
Get-WinEvent -FilterHashtable @{LogName='Security'; StartTime=(Get-Date).AddHours(-24)} | Export-Csv security_events.csv
```

### Disk Imaging
```powershell
# FTK Imager CLI
ftkimager.exe \\.\PhysicalDrive0 output_image --e01 --compress 6 --verify
```

---

## Linux Evidence Collection

### Memory Acquisition
```bash
# LiME kernel module
sudo insmod lime.ko "path=/evidence/memory.lime format=lime"

# Verify
sha256sum /evidence/memory.lime > /evidence/memory.lime.sha256
```

### Live Triage Commands
```bash
# System info
uname -a > system_info.txt
date >> system_info.txt
uptime >> system_info.txt

# Running processes
ps auxf > processes.txt

# Network connections
ss -tulnp > network.txt
netstat -anp >> network.txt

# Open files
lsof > open_files.txt

# Logged-in users
w > users.txt
last -100 >> users.txt

# Cron jobs
for user in $(cut -f1 -d: /etc/passwd); do echo "==$user=="; crontab -u $user -l 2>/dev/null; done > cron_jobs.txt

# Recent file modifications (24h)
find / -mtime -1 -ls 2>/dev/null > recent_files.txt

# SSH authorized keys
find / -name "authorized_keys" -exec cat {} \; > ssh_keys.txt

# Bash history (all users)
find /home -name ".bash_history" -exec echo "=={}" \; -exec cat {} \; > bash_history.txt
```

### Disk Imaging
```bash
# dd with hashing
sudo dc3dd if=/dev/sda of=/evidence/disk.dd hash=sha256 log=/evidence/disk.log
```

---

## Cloud Evidence (AWS)

```bash
# CloudTrail events (last 24h)
aws cloudtrail lookup-events \
  --start-time $(date -u -d '24 hours ago' +%Y-%m-%dT%H:%M:%SZ) \
  --output json > cloudtrail_events.json

# IAM credential report
aws iam generate-credential-report
aws iam get-credential-report --output text --query Content | base64 -d > iam_report.csv

# S3 access logs
aws s3 sync s3://your-access-log-bucket/ /evidence/s3_logs/

# EC2 instance metadata
aws ec2 describe-instances --output json > ec2_instances.json

# Security group changes
aws ec2 describe-security-groups --output json > security_groups.json

# VPC Flow Logs
aws logs get-log-events --log-group-name vpc-flow-logs --output json > vpc_flows.json
```

---

## Network Evidence

```bash
# Packet capture (tcpdump)
sudo tcpdump -i eth0 -w /evidence/capture.pcap -c 100000

# Capture specific host
sudo tcpdump -i eth0 host 10.0.1.50 -w /evidence/host_capture.pcap

# DNS queries only
sudo tcpdump -i eth0 port 53 -w /evidence/dns_capture.pcap
```

---

## Chain of Custody Form

```
╔══════════════════════════════════════════════════╗
║           CHAIN OF CUSTODY RECORD                ║
╠══════════════════════════════════════════════════╣
║ Case ID:      _______________                    ║
║ Evidence ID:  _______________                    ║
║ Description:  _______________                    ║
║ Date/Time Collected: _______________             ║
║ Collected By: _______________                    ║
║ SHA256 Hash:  _______________                    ║
║                                                  ║
║ Custody Log:                                     ║
║ Date       | From        | To          | Purpose ║
║ __________ | ___________ | ___________ | _______ ║
║ __________ | ___________ | ___________ | _______ ║
║ __________ | ___________ | ___________ | _______ ║
║                                                  ║
║ Storage Location: _______________                ║
║ Access Restricted To: _______________            ║
╚══════════════════════════════════════════════════╝
```

---

## Evidence Storage Requirements

| Requirement | Standard |
|:---|:---|
| **Encryption** | AES-256 at rest |
| **Access** | Named individuals only, need-to-know basis |
| **Retention** | Minimum 1 year (or as required by regulation) |
| **Integrity** | SHA-256 hash verified at every transfer |
| **Location** | Dedicated forensic storage, not shared drives |
| **Backup** | At least 2 copies on separate media |

---

## Related Documents

- [IR Framework](../05_Incident_Response/Framework.en.md)
- [Tabletop Exercises](../05_Incident_Response/Tabletop_Exercises.en.md)
- [Severity Matrix](../05_Incident_Response/Severity_Matrix.en.md)
