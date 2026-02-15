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

## เอกสารที่เกี่ยวข้อง

- [กรอบ IR](Framework.th.md)
- [สถานการณ์จำลอง](Tabletop_Exercises.th.md)
- [ตารางความรุนแรง](Severity_Matrix.th.md)
