# คู่มือเก็บหลักฐาน — Digital Forensics

> **รหัสเอกสาร:** FOR-001  
> **เวอร์ชัน:** 1.0  
> **อัปเดตล่าสุด:** 2026-02-15  
> **เจ้าของ:** IR Lead / Forensic Analyst

---

## กฎทองของการเก็บหลักฐาน

1. **อย่าแก้ไขหลักฐาน** — ทำงานกับสำเนาเท่านั้น
2. **บันทึกทุกอย่าง** — ใคร ทำอะไร เมื่อไหร่ ที่ไหน ทำไม อย่างไร
3. **รักษา Chain of Custody** — บันทึกทุกการส่งมอบ
4. **เก็บข้อมูลที่หายง่ายก่อน** — Memory ก่อน Disk
5. **ใช้ Write Blocker** — สำหรับ disk imaging

---

## ลำดับการเก็บ (เก็บตามลำดับนี้)

| ลำดับ | แหล่ง | ความเร่งด่วน | เครื่องมือ |
|:---:|:---|:---|:---|
| 1 | **RAM (Memory)** | หายใน นาที | WinPMEM, LiME |
| 2 | **Network Connections** | หายใน นาที | netstat, tcpdump |
| 3 | **Running Processes** | หายใน นาที | Velociraptor, tasklist |
| 4 | **Disk (Live)** | ชั่วโมง | FTK Imager, dc3dd |
| 5 | **Logs** | วัน | SIEM export |
| 6 | **Disk (Offline)** | ถาวร | dd, FTK Imager |

---

## คำสั่ง Windows

### เก็บ Memory
```powershell
winpmem_mini_x64.exe memory_dump.raw
certutil -hashfile memory_dump.raw SHA256
```

### Triage สด
```powershell
# Process ที่ทำงาน
Get-CimInstance Win32_Process | Select ProcessId, Name, CommandLine | Export-Csv processes.csv

# Network connections
Get-NetTCPConnection | Where {$_.State -eq "Established"} | Export-Csv netconn.csv

# Scheduled tasks
schtasks /query /fo CSV > scheduled_tasks.csv

# Event logs (24 ชม.)
Get-WinEvent -FilterHashtable @{LogName='Security'; StartTime=(Get-Date).AddHours(-24)} | Export-Csv events.csv
```

---

## คำสั่ง Linux

```bash
# Memory
sudo insmod lime.ko "path=/evidence/memory.lime format=lime"

# Process + Network
ps auxf > processes.txt
ss -tulnp > network.txt
lsof > open_files.txt

# ไฟล์ที่เปลี่ยนแปลง (24 ชม.)
find / -mtime -1 -ls 2>/dev/null > recent_files.txt

# Bash history
find /home -name ".bash_history" -exec cat {} \; > bash_history.txt

# Disk image
sudo dc3dd if=/dev/sda of=/evidence/disk.dd hash=sha256
```

---

## Cloud (AWS)

```bash
# CloudTrail
aws cloudtrail lookup-events --start-time $(date -u -d '24 hours ago' +%Y-%m-%dT%H:%M:%SZ) > cloudtrail.json

# IAM Report
aws iam generate-credential-report && aws iam get-credential-report --output text --query Content | base64 -d > iam.csv
```

---

## แบบฟอร์ม Chain of Custody

```
╔═══════════════════════════════════════╗
║    บันทึกการครอบครองหลักฐาน           ║
╠═══════════════════════════════════════╣
║ Case ID:      _______________         ║
║ Evidence ID:  _______________         ║
║ รายละเอียด:   _______________         ║
║ วันเวลาเก็บ:  _______________         ║
║ ผู้เก็บ:       _______________         ║
║ SHA256:       _______________         ║
║                                       ║
║ วันที่    | จาก     | ถึง    | วัตถุประสงค์ ║
║ _______ | _______ | ______ | _________ ║
╚═══════════════════════════════════════╝
```

---

## Chain of Custody Form

| ฟิลด์ | ค่า |
|:---|:---|
| **Evidence ID** | EV-YYYY-NNN |
| **Incident ID** | INC-YYYY-NNN |
| **ประเภท** | [Disk image / Memory dump / Log file / Network capture] |
| **ที่มา** | [Hostname / IP / Location] |
| **ผู้เก็บ** | [ชื่อ + ตำแหน่ง] |
| **วันที่/เวลาเก็บ** | [YYYY-MM-DD HH:MM UTC] |
| **Hash (SHA256)** | [hash value] |
| **สถานที่จัดเก็บ** | [Evidence locker / Encrypted share / Cloud vault] |

### ตาราง Transfer Log

| # | วันที่ | จาก | ถึง | วัตถุประสงค์ | ลงชื่อ |
|:---:|:---|:---|:---|:---|:---|
| 1 | [วันที่] | [ผู้เก็บ] | [Evidence Storage] | Initial collection | [ลงชื่อ] |
| 2 | [วันที่] | [Storage] | [Analyst] | Analysis | [ลงชื่อ] |

## คำสั่ง Collection ที่สำคัญ

### Memory Acquisition

```bash
# Linux — ใช้ LiME
sudo insmod lime-$(uname -r).ko "path=/evidence/mem.lime format=lime"

# Windows — ใช้ WinPMem
winpmem_mini_x64.exe evidence\mem.raw

# ตรวจสอบ hash
sha256sum /evidence/mem.lime > /evidence/mem.lime.sha256
```

### Disk Imaging

```bash
# Linux — ใช้ dc3dd (ดีกว่า dd — มี hashing built-in)
dc3dd if=/dev/sda of=/evidence/disk.dd hash=sha256 log=/evidence/disk.log

# Windows — ใช้ FTK Imager (GUI)
# File → Create Disk Image → Physical Drive → E01 format
```

### Network Capture

```bash
# Full packet capture
tcpdump -i eth0 -w /evidence/capture.pcap -c 100000

# เฉพาะ host ที่สงสัย
tcpdump -i eth0 host 10.0.0.50 -w /evidence/suspect.pcap
```

### Log Collection

```bash
# รวม Windows Event Logs
wevtutil epl Security /evidence/security.evtx
wevtutil epl System /evidence/system.evtx

# รวม Linux logs
tar czf /evidence/logs.tar.gz /var/log/auth.log* /var/log/syslog*
sha256sum /evidence/logs.tar.gz > /evidence/logs.tar.gz.sha256
```

## Evidence Handling Do's & Don'ts

| ✅ ควรทำ | ❌ ไม่ควรทำ |
|:---|:---|
| Hash ทุกชิ้นหลักฐานทันที | แก้ไข original evidence |
| บันทึกทุกขั้นตอนใน Chain of Custody | ใช้ tool ที่เขียนลง disk ต้นทาง |
| ทำงานบน forensic copy เท่านั้น | วิเคราะห์บน live system (ถ้าเลี่ยงได้) |
| เก็บในพื้นที่เข้ารหัส | ส่งผ่านช่องทางไม่ปลอดภัย |
| จำกัดการเข้าถึงเฉพาะทีม IR | ให้คนนอกทีมเข้าถึงโดยไม่มี log |

## Volatility Order (ลำดับความผันผวน)

| ลำดับ | ที่มา | ความผันผวน | เก็บก่อน? |
|:---:|:---|:---|:---:|
| 1 | **CPU registers, cache** | สูงมาก | ✅ (ถ้าได้) |
| 2 | **RAM (memory)** | สูง | ✅ |
| 3 | **Network connections** | สูง | ✅ |
| 4 | **Running processes** | สูง | ✅ |
| 5 | **Disk (temporary files)** | ปานกลาง | ✅ |
| 6 | **Disk (persistent data)** | ต่ำ | ลำดับถัดไป |
| 7 | **External logs (SIEM/Cloud)** | ต่ำ | จากส่วนกลาง |
| 8 | **Backup / Archive** | ต่ำมาก | เก็บทีหลังได้ |

### Evidence Priority Order

| Priority | Type | Tool |
|:---|:---|:---|
| 1 | Memory (volatile) | WinPmem/LiME |
| 2 | Running processes | Volatility |
| 3 | Network connections | netstat/tcpdump |
| 4 | Disk image | FTK Imager |
| 5 | Log files | Copy + hash |

## เอกสารที่เกี่ยวข้อง

- [กรอบ IR](Framework.th.md)
- [สถานการณ์จำลอง](Tabletop_Exercises.th.md)
- [ตารางความรุนแรง](Severity_Matrix.th.md)
