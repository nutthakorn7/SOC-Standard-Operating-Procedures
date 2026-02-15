# แม่แบบ SOAR Playbook

> **รหัสเอกสาร:** SOAR-TPL-001  
> **เวอร์ชัน:** 1.0  
> **อัปเดตล่าสุด:** 2026-02-15  
> **เจ้าของ:** SOC Engineer  

---

## วัตถุประสงค์

แม่แบบ workflow อัตโนมัติสำหรับ **SOAR** สามารถ import เข้า:
- **Palo Alto XSOAR** (Cortex)
- **Shuffle** (Open-source)
- **TheHive / Cortex**
- **Tines** / **Splunk SOAR**

---

## ดัชนีแม่แบบ

| # | แม่แบบ | Playbook | ระดับอัตโนมัติ | การดำเนินการหลัก |
|:---:|:---|:---|:---:|:---|
| 1 | Phishing Triage | PB-01 | เต็ม | Extract IOC → Sandbox → Block → แจ้ง |
| 2 | Ransomware Response | PB-02 | กึ่งอัตโนมัติ | Isolate → Snapshot → Escalate |
| 3 | Brute Force Block | PB-04 | เต็ม | ตรวจ threshold → Lock → Alert |
| 4 | Account Compromise | PB-05 | เต็ม | Disable → Reset → Revoke sessions |
| 5 | Malware Quarantine | PB-03 | เต็ม | ค้น hash → Quarantine → Block |
| 6 | IOC Enrichment | ทั้งหมด | เต็ม | Enrichment หลายแหล่ง → Verdict |

---

## 1. Phishing Triage

**Trigger**: User แจ้ง email น่าสงสัย หรือ email gateway alert  
**อัตโนมัติ**: เต็มรูปแบบ (ต้อง approve ก่อน block)

```yaml
name: Phishing Auto Triage
trigger:
  type: email_report
  source: phishing_mailbox OR email_gateway_alert

steps:
  - id: extract_indicators
    action: extract_indicators
    description: "แยก URLs, attachments, sender IP จาก email"

  - id: check_reputation
    action: parallel
    tasks:
      - action: virustotal_lookup
      - action: urlscan_submit
      - action: abuseipdb_check

  - id: sandbox_attachment
    action: sandbox_detonate
    condition: "มี attachment"
    timeout: 300

  - id: calculate_verdict
    action: decision
    rules:
      - "VT ≥ 5 OR sandbox = malicious" → MALICIOUS
      - "VT ≥ 2 OR sandbox = suspicious" → SUSPICIOUS
      - default → CLEAN

  - id: respond_malicious
    condition: "MALICIOUS"
    tasks:
      - block_sender
      - delete_from_mailboxes
      - block_urls (proxy/firewall)
      - block_hashes (EDR)
      - notify_user → "ยืนยัน phishing"
      - create_incident → P2, PB-01
```

---

## 2. Ransomware Response

**Trigger**: EDR alert พฤติกรรม ransomware  
**อัตโนมัติ**: กึ่ง (isolate ทันที, ส่งต่อคน)

```yaml
name: Ransomware Emergency Response
steps:
  - id: immediate_isolate
    action: edr_isolate_host
    auto_execute: true  # ← ตัดเน็ตทันที ไม่ต้องรอ

  - id: snapshot_evidence
    tasks:
      - edr_collect_forensics (memory, processes, network)
      - cloud_snapshot (ถ้าเป็น cloud)

  - id: check_lateral
    action: edr_hunt  # ← ค้นหา IOC เดียวกันทั้งองค์กร

  - id: escalate
    severity: P1, playbook: PB-02
    notify: [soc_lead, incident_commander, ciso]
```

---

## 3. Brute Force Lockout

**Trigger**: SIEM alert ≥ 10 failed logins ใน 5 นาที  
**อัตโนมัติ**: เต็มรูปแบบ

```yaml
name: Brute Force Auto-Lockout
steps:
  - id: enrich_source
    tasks:
      - geoip_lookup
      - abuseipdb_check
      - internal_asset_check

  - id: decide_action
    rules:
      - IP ภายใน → แจ้งเตือนเท่านั้น
      - AbuseIPDB ≥ 80 → block + lock
      - ประเทศไม่อนุญาต → block + lock
      - อื่นๆ → block ชั่วคราว

  - id: execute_block
    tasks:
      - firewall_block_ip (24 ชม.)
      - lock_account (ถ้า login สำเร็จแล้ว)
      - create_incident → P3, PB-04
```

---

## 4. Account Compromise

**Trigger**: Impossible travel, token theft, credential leak  
**อัตโนมัติ**: เต็มรูปแบบ

```yaml
name: Account Compromise Auto-Response
steps:
  - id: disable_account → ทันที
  - id: revoke_sessions → OAuth + active sessions + MFA bypass
  - id: audit_actions → ตรวจ 72 ชม. ย้อนหลัง
  - id: remediate → reset password + re-enroll MFA + ลบ forwarding rules
  - id: notify → แจ้งหัวหน้าผู้ใช้ + สร้าง incident P2
```

---

## 5. Malware Quarantine

**Trigger**: EDR ตรวจพบ malware  
**อัตโนมัติ**: เต็มรูปแบบ

```yaml
name: Malware Auto-Quarantine
steps:
  - id: quarantine_file → กักไฟล์ทันที
  - id: check_hash → VT + MalwareBazaar
  - id: enterprise_block → block hash ทั้งองค์กร (ถ้า VT ≥ 5)
  - id: hunt_enterprise → ค้นหาเครื่องอื่นที่มีไฟล์เดียวกัน
  - id: mass_quarantine → กักทุกเครื่องที่พบ
```

---

## 6. IOC Enrichment (Sub-playbook)

**Trigger**: เรียกโดย playbook อื่น  
**อัตโนมัติ**: เต็มรูปแบบ

```yaml
name: IOC Multi-Source Enrichment
inputs: indicator_type (ip|domain|hash|url), indicator_value

steps:
  - id: enrich (ขนานกัน)
    - virustotal_lookup
    - abuseipdb_check (ถ้า IP)
    - urlscan_lookup (ถ้า URL)
    - urlhaus_lookup
    - threatfox_lookup
    - shodan_lookup (ถ้า IP)
    - whois_lookup (ถ้า domain)

  - id: calculate_score
    rules:
      VT ≥ 10 OR AbuseIPDB ≥ 90 → MALICIOUS (HIGH)
      VT ≥ 3 OR AbuseIPDB ≥ 50 → SUSPICIOUS (MED)
      อื่นๆ → CLEAN (LOW)

outputs: verdict, confidence, enrichment_data
```

---

## คู่มือ Import

### XSOAR (Cortex)
1. แปลง YAML เป็น XSOAR playbook
2. Upload ที่ **Settings → Content → Upload Content Pack**
3. Map integrations ที่ **Settings → Integrations**

### Shuffle
1. Import YAML ที่ **Workflows → Import**
2. ตั้ง app connections
3. ตั้ง triggers จาก webhook/SIEM

### TheHive
1. สร้าง Responders ตามแต่ละ step
2. สร้าง Case Templates ตาม workflow
3. เชื่อม Cortex Analyzers สำหรับ enrichment

---

## เอกสารที่เกี่ยวข้อง

- [IR Playbooks](Playbooks/)
- [ตารางความรุนแรง](Severity_Matrix.th.md)
- [Detection Rules](../07_Detection_Rules/README.md)
