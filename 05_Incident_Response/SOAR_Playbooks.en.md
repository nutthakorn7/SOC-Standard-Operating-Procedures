# SOAR Playbook Templates

> **Document ID:** SOAR-TPL-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Owner:** SOC Engineer  

---

## Purpose

Pre-built automation workflow templates for **Security Orchestration, Automation, and Response (SOAR)** platforms. These templates map directly to SOC Playbooks and can be imported into:

- **Palo Alto XSOAR** (Cortex)
- **Shuffle** (Open-source)
- **TheHive / Cortex**
- **Tines** / **Splunk SOAR**

---

## Template Index

| # | Template | Playbook | Automation Level | Key Actions |
|:---:|:---|:---|:---:|:---|
| 1 | [Phishing Triage](#1-phishing-triage) | PB-01 | Full | Extract IOC → Sandbox → Block → Notify |
| 2 | [Ransomware Response](#2-ransomware-response) | PB-02 | Semi | Isolate → Snapshot → Escalate |
| 3 | [Brute Force Block](#3-brute-force-lockout) | PB-04 | Full | Check threshold → Lock account → Alert |
| 4 | [Account Compromise](#4-account-compromise) | PB-05 | Full | Disable → Reset → Revoke sessions |
| 5 | [Malware Quarantine](#5-malware-quarantine) | PB-03 | Full | Hash lookup → Quarantine → Block hash |
| 6 | [IOC Enrichment](#6-ioc-enrichment) | All | Full | Multi-source enrichment → Verdict |

---

## 1. Phishing Triage

**Trigger**: Email reported by user or email gateway alert  
**Automation Level**: Full auto with analyst approval for blocking

```yaml
# XSOAR / Shuffle compatible workflow
name: Phishing Auto Triage
trigger:
  type: email_report
  source: phishing_mailbox OR email_gateway_alert

steps:
  - id: extract_indicators
    action: extract_indicators
    description: "Parse email for URLs, attachments, sender IP, headers"
    inputs:
      email_body: "{{incident.email_body}}"
      attachments: "{{incident.attachments}}"
    outputs: [urls, file_hashes, sender_ip, sender_domain]

  - id: check_reputation
    action: parallel
    description: "Check all indicators against threat intel"
    tasks:
      - action: virustotal_lookup
        inputs: { indicators: "{{extract_indicators.file_hashes}}" }
      - action: urlscan_submit
        inputs: { urls: "{{extract_indicators.urls}}" }
      - action: abuseipdb_check
        inputs: { ip: "{{extract_indicators.sender_ip}}" }
      - action: whois_lookup
        inputs: { domain: "{{extract_indicators.sender_domain}}" }

  - id: sandbox_attachment
    action: sandbox_detonate
    condition: "{{extract_indicators.attachments | length > 0}}"
    inputs:
      files: "{{extract_indicators.attachments}}"
      sandbox: "any.run OR hybrid_analysis"
      timeout: 300

  - id: calculate_verdict
    action: decision
    inputs:
      vt_score: "{{check_reputation.virustotal.score}}"
      sandbox_result: "{{sandbox_attachment.verdict}}"
      url_scan: "{{check_reputation.urlscan.verdict}}"
    rules:
      - condition: "vt_score >= 5 OR sandbox_result == 'malicious'"
        verdict: MALICIOUS
      - condition: "vt_score >= 2 OR sandbox_result == 'suspicious'"
        verdict: SUSPICIOUS
      - default:
        verdict: CLEAN

  - id: respond_malicious
    action: sequential
    condition: "{{calculate_verdict.verdict == 'MALICIOUS'}}"
    tasks:
      - action: block_sender
        inputs: { email: "{{extract_indicators.sender_email}}", platform: "exchange_or_gsuite" }
      - action: delete_from_mailboxes
        inputs: { message_id: "{{incident.message_id}}" }
      - action: block_urls
        inputs: { urls: "{{extract_indicators.urls}}", platform: "proxy_or_firewall" }
      - action: block_hashes
        inputs: { hashes: "{{extract_indicators.file_hashes}}", platform: "edr" }
      - action: notify_user
        inputs: { user: "{{incident.reported_by}}", template: "phishing_confirmed" }
      - action: create_incident
        inputs: { severity: "P2", playbook: "PB-01", title: "Confirmed Phishing" }

  - id: respond_clean
    action: sequential
    condition: "{{calculate_verdict.verdict == 'CLEAN'}}"
    tasks:
      - action: close_alert
        inputs: { verdict: "false_positive", notes: "No malicious indicators found" }
      - action: notify_user
        inputs: { user: "{{incident.reported_by}}", template: "phishing_clean" }
```

---

## 2. Ransomware Response

**Trigger**: EDR alert for ransomware behavior  
**Automation Level**: Semi-auto (isolate immediately, escalate to human)

```yaml
name: Ransomware Emergency Response
trigger:
  type: edr_alert
  rule: "ransomware_behavior OR file_bulk_encryption"

steps:
  - id: immediate_isolate
    action: edr_isolate_host
    description: "Network-isolate the affected endpoint IMMEDIATELY"
    inputs:
      hostname: "{{alert.hostname}}"
      platform: "crowdstrike OR sentinelone OR defender"
    priority: CRITICAL
    auto_execute: true

  - id: snapshot_evidence
    action: parallel
    tasks:
      - action: edr_collect_forensics
        inputs: { hostname: "{{alert.hostname}}", artifacts: ["memory_dump", "running_processes", "network_connections"] }
      - action: cloud_snapshot
        inputs: { instance_id: "{{alert.cloud_instance_id}}" }
        condition: "{{alert.is_cloud_instance}}"

  - id: check_lateral
    action: edr_hunt
    description: "Hunt for same IOCs across all endpoints"
    inputs:
      iocs: "{{alert.file_hashes}}"
      process_names: "{{alert.process_name}}"
      time_range: "24h"

  - id: escalate
    action: escalate_incident
    inputs:
      severity: "P1"
      playbook: "PB-02"
      notify: ["soc_lead", "incident_commander", "ciso"]
      channel: "slack_or_teams"
      message: |
        🔴 RANSOMWARE DETECTED
        Host: {{alert.hostname}}
        User: {{alert.username}}
        Process: {{alert.process_name}}
        Status: Host isolated, forensics collecting
        Lateral movement check: {{check_lateral.result_count}} additional hosts

  - id: block_iocs
    action: parallel
    tasks:
      - action: block_hashes
        inputs: { hashes: "{{alert.file_hashes}}", platform: "edr" }
      - action: block_ips
        inputs: { ips: "{{alert.c2_ips}}", platform: "firewall" }
        condition: "{{alert.c2_ips | length > 0}}"
```

---

## 3. Brute Force Lockout

**Trigger**: SIEM alert for N+ failed logins in T minutes  
**Automation Level**: Full auto

```yaml
name: Brute Force Auto-Lockout
trigger:
  type: siem_alert
  rule: "brute_force_threshold"
  threshold: "10 failures in 5 minutes"

steps:
  - id: enrich_source
    action: parallel
    tasks:
      - action: geoip_lookup
        inputs: { ip: "{{alert.source_ip}}" }
      - action: abuseipdb_check
        inputs: { ip: "{{alert.source_ip}}" }
      - action: internal_asset_check
        inputs: { ip: "{{alert.source_ip}}" }

  - id: decide_action
    action: decision
    rules:
      - condition: "{{enrich_source.is_internal}} == true"
        action: alert_only
        note: "Internal IP — may be misconfigured service"
      - condition: "{{enrich_source.abuseipdb_score}} >= 80"
        action: block_and_lock
      - condition: "{{enrich_source.geoip.country}} NOT IN allowed_countries"
        action: block_and_lock
      - default:
        action: temporary_block

  - id: execute_block
    action: sequential
    condition: "{{decide_action.action == 'block_and_lock'}}"
    tasks:
      - action: firewall_block_ip
        inputs: { ip: "{{alert.source_ip}}", duration: "24h" }
      - action: lock_account
        inputs: { username: "{{alert.target_user}}", platform: "ad_or_azure" }
        condition: "{{alert.any_success}} == true"
      - action: create_incident
        inputs: { severity: "P3", playbook: "PB-04" }
```

---

## 4. Account Compromise

**Trigger**: Impossible travel, token theft, or confirmed credential leak  
**Automation Level**: Full auto

```yaml
name: Account Compromise Auto-Response
trigger:
  type: identity_alert
  rules: ["impossible_travel", "token_anomaly", "credential_leak"]

steps:
  - id: disable_account
    action: identity_disable_user
    auto_execute: true
    inputs:
      username: "{{alert.username}}"
      platform: "azure_ad OR okta OR google"

  - id: revoke_sessions
    action: parallel
    tasks:
      - action: revoke_oauth_tokens
        inputs: { user: "{{alert.username}}" }
      - action: revoke_active_sessions
        inputs: { user: "{{alert.username}}" }
      - action: revoke_mfa_bypass
        inputs: { user: "{{alert.username}}" }

  - id: audit_actions
    action: query_audit_log
    inputs:
      user: "{{alert.username}}"
      time_range: "72h"
      actions: ["file_download", "permission_change", "email_forward_rule", "mailbox_delegation"]

  - id: remediate
    action: sequential
    tasks:
      - action: reset_password
        inputs: { user: "{{alert.username}}", force_change: true }
      - action: re_enroll_mfa
        inputs: { user: "{{alert.username}}" }
      - action: remove_suspicious_rules
        inputs: { rules: "{{audit_actions.forwarding_rules}}" }
        condition: "{{audit_actions.forwarding_rules | length > 0}}"

  - id: notify
    action: parallel
    tasks:
      - action: notify_user_manager
        inputs: { user: "{{alert.username}}", template: "account_compromised" }
      - action: create_incident
        inputs: { severity: "P2", playbook: "PB-05" }
```

---

## 5. Malware Quarantine

**Trigger**: EDR malware detection alert  
**Automation Level**: Full auto

```yaml
name: Malware Auto-Quarantine
trigger:
  type: edr_alert
  category: malware_detection

steps:
  - id: quarantine_file
    action: edr_quarantine_file
    auto_execute: true
    inputs:
      file_path: "{{alert.file_path}}"
      hostname: "{{alert.hostname}}"

  - id: check_hash
    action: parallel
    tasks:
      - action: virustotal_hash_lookup
        inputs: { hash: "{{alert.file_hash}}" }
      - action: malwarebazaar_lookup
        inputs: { hash: "{{alert.file_hash}}" }

  - id: enterprise_block
    action: block_hash_enterprise
    condition: "{{check_hash.virustotal.positives}} >= 5"
    inputs:
      hash: "{{alert.file_hash}}"
      platform: "edr"
      scope: "organization"

  - id: hunt_enterprise
    action: edr_hunt
    inputs:
      hash: "{{alert.file_hash}}"
      scope: "all_endpoints"
    outputs: [affected_hosts]

  - id: mass_quarantine
    action: edr_quarantine_file
    condition: "{{hunt_enterprise.affected_hosts | length > 0}}"
    inputs:
      file_hash: "{{alert.file_hash}}"
      hosts: "{{hunt_enterprise.affected_hosts}}"

  - id: close
    action: create_incident
    inputs:
      severity: "{{alert.severity}}"
      playbook: "PB-03"
      affected_hosts: "{{hunt_enterprise.affected_hosts}}"
```

---

## 6. IOC Enrichment

**Trigger**: Called by any playbook needing indicator enrichment  
**Automation Level**: Full auto (sub-playbook)

```yaml
name: IOC Multi-Source Enrichment
trigger:
  type: sub_playbook
  called_by: any

inputs:
  indicator_type: "ip | domain | hash | url"
  indicator_value: "<value>"

steps:
  - id: enrich
    action: parallel
    tasks:
      - action: virustotal_lookup
        inputs: { indicator: "{{indicator_value}}", type: "{{indicator_type}}" }
      - action: abuseipdb_check
        inputs: { ip: "{{indicator_value}}" }
        condition: "{{indicator_type == 'ip'}}"
      - action: urlscan_lookup
        inputs: { url: "{{indicator_value}}" }
        condition: "{{indicator_type == 'url'}}"
      - action: urlhaus_lookup
        inputs: { indicator: "{{indicator_value}}" }
      - action: threatfox_lookup
        inputs: { indicator: "{{indicator_value}}" }
      - action: shodan_lookup
        inputs: { ip: "{{indicator_value}}" }
        condition: "{{indicator_type == 'ip'}}"
      - action: whois_lookup
        inputs: { domain: "{{indicator_value}}" }
        condition: "{{indicator_type == 'domain'}}"

  - id: calculate_score
    action: scoring
    inputs:
      vt_score: "{{enrich.virustotal.positives}}"
      abuse_score: "{{enrich.abuseipdb.score}}"
      urlhaus_status: "{{enrich.urlhaus.status}}"
      threatfox_ioc: "{{enrich.threatfox.found}}"
    rules:
      - condition: "vt_score >= 10 OR abuse_score >= 90 OR threatfox_ioc"
        verdict: MALICIOUS
        confidence: HIGH
      - condition: "vt_score >= 3 OR abuse_score >= 50"
        verdict: SUSPICIOUS
        confidence: MEDIUM
      - default:
        verdict: CLEAN
        confidence: LOW

outputs:
  verdict: "{{calculate_score.verdict}}"
  confidence: "{{calculate_score.confidence}}"
  enrichment_data: "{{enrich}}"
```

---

## Import Guide

### XSOAR (Cortex)
1. Convert YAML to XSOAR playbook via Marketplace or custom content pack
2. Upload via **Settings → Content → Upload Content Pack**
3. Map integrations (VirusTotal, EDR, Firewall) in **Settings → Integrations**

### Shuffle
1. Import YAML directly via **Workflows → Import**
2. Configure app connections for each integration
3. Set triggers via webhook or SIEM integration

### TheHive
1. Create Responders based on each step's action
2. Build Case Templates matching playbook workflows
3. Link Cortex Analyzers for enrichment steps

---

## Related Documents

- [IR Playbooks](../05_Incident_Response/Playbooks/)
- [Severity Matrix](../05_Incident_Response/Severity_Matrix.en.md)
- [Detection Rules](../07_Detection_Rules/README.md)
