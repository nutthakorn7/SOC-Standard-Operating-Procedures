# Changelog

All notable changes to the SOC Standard Operating Procedures will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.13.0] - 2026-03-06

### Added
- **3 AI Threat Playbooks** (EN+TH) — first-of-kind SOC procedures for AI/ML security:
  - PB-51 AI Prompt Injection — jailbreak, indirect injection, tool abuse response
  - PB-52 LLM Data Poisoning — training data, RAG, RLHF poisoning response
  - PB-53 AI Model Theft — API extraction, weight theft, insider exfiltration response
- **3 Sigma detection rules** for AI threats (`ai_prompt_injection`, `ai_data_poisoning`, `ai_model_theft`)
- **7 YARA rules** for credential dump, wiper, rootkit, LOLBin, exploit kit, supply chain, data staging
- **Detection Coverage Matrix** (EN+TH) — comprehensive Sigma/YARA/MITRE map for all playbooks
- Total: 53 playbooks, 54 Sigma rules, 15 YARA rules

---

## [2.12.0] - 2026-03-06

### Added
- **15 new Sigma detection rules** for PB-36 to PB-50, achieving full playbook detection coverage
  - `win_credential_dumping.yml` — LSASS, SAM, DCSync (PB-36, T1003)
  - `web_sqli_advanced.yml` — Blind/time-based SQLi (PB-37, T1190)
  - `win_wiper_attack.yml` — MBR overwrite, shadow copy deletion (PB-38, T1485/T1561)
  - `win_lolbin_execution.yml` — certutil, mshta, rundll32 abuse (PB-39, T1218)
  - `file_usb_autorun.yml` — Autorun, BadUSB indicators (PB-40, T1091)
  - `net_vpn_abuse.yml` — Unauthorized VPN/proxy/Tor (PB-41, T1133)
  - `cloud_email_takeover.yml` — OAuth abuse, forwarding rules (PB-42, T1114)
  - `web_watering_hole.yml` — Trusted site redirect to exploit kit (PB-43, T1189)
  - `web_drive_by_download.yml` — Browser spawning suspicious processes (PB-44, T1189)
  - `win_rootkit_bootkit.yml` — Unsigned drivers, UEFI tampering (PB-45, T1014/T1542)
  - `cloud_sim_swap.yml` — Phone/MFA method changes (PB-46, T1111)
  - `cloud_cryptojacking.yml` — GPU instances, cost spikes (PB-47, T1496)
  - `net_deepfake_social.yml` — Executive impersonation, urgent transfer (PB-48, T1598)
  - `net_typosquatting.yml` — Homoglyph/punycode domain detection (PB-49, T1583.001)
  - `net_unauthorized_scanning.yml` — nmap, masscan, port sweeps (PB-50, T1046)
- Total Sigma rules: **36 → 51** (full coverage for all 50 playbooks)

### Fixed
- **VERSION_TRACKER.md** synced from v2.6.0 to v2.11.1 — added PB-36→PB-50, Tier 2/3 Runbooks, Tabletop/Purple Team Exercises, System Activation
- **AGENTS.md** — fixed directory structure (removed duplicates, added missing dirs) and expanded Playbook Index to PB-50
- **Git tags** — backfilled v2.5.0 through v2.11.1 (8 tags)
- **Stale count sweep** — corrected 30+ stale references across 15+ files (EN+TH):
  - Playbook count: 20/30/33 → 50
  - Sigma count: 28/33 → 36 (now 51)
  - Document count: 170+ → 279
  - YARA count: 16 → 8
  - Version: v2.4.0 → v2.11.1 (now v2.12.0)
- **VERSION_TRACKER.md** — removed duplicate Alert Tuning and SOC Communication rows
- **Detection Engineering README.md** — fixed YARA count 10 → 8

---

## [2.11.1] - 2026-02-17

### Fixed
- **86 broken links** across 34 files — incorrect filenames, wrong directory prefixes, missing `../` paths
- **46 directory-level link warnings** — replaced `Playbooks/`, `sigma_rules/`, `Runbooks/` directory links with specific file references in 39 files
- **4 duplicate PB numbers** in `mkdocs.yml` — reassigned Log Clearing (→PB-27), Lost Device (→PB-32), Watering Hole (→PB-44), Cloud Cryptojacking (→PB-45)
- **24 PB number mismatches** in Playbook Quick Reference — aligned EN (13 fixes) and TH (11 fixes) with mkdocs.yml numbering
- **TH Quick Reference rewrite** — fixed 5 duplicate PBs (16, 22, 24, 28, 48) and 5 missing PBs (18, 27, 35, 41, 45)
- **6 emoji anchor links** in TRAINING.md — aligned slugs with MkDocs Material generation
- **2 external file warnings** — converted `SOC_Manual_Consolidated.md` and `.agent/workflows` links to GitHub URLs
- **2 mangled sigma rule paths** in Data_Collection.en.md — fixed sed concatenation error
- **2 duplicate sigma rules** removed from nested `sigma_rules/sigma/` subdirectory
- **YARA rule name collision** — renamed `webshell_php_generic` → `webshell_php_generic_sig` in `file_signatures/`
- **YARA count** in README — corrected 5 → 8 (includes `file_signatures/` directory)
- **Duplicate Phishing link** in Typosquatting.en.md — removed
- **IR Framework cross-reference** added to Typosquatting EN/TH playbooks
- **9 stale sigma paths** — updated references to removed `sigma_rules/sigma/` directory

### Changed
- **Playbook Quick Reference** — moved from gitignored `docs/` to tracked project root with symlinks
- **setup_docs.sh** — updated directory list to match current structure, added all top-level file symlinks
- **Nav readability** — sorted PBs ascending within groups, removed stray blank lines, fixed "Data Governance" label → "Database Management"
- **GitHub About description** — updated from "33 playbooks, 33 Sigma" → "50 playbooks, 36 Sigma rules"
- MkDocs build now **0 warnings, 0 errors** (previously 46+ INFO warnings + 2 WARNINGs)

---

## [2.11.0] - 2026-02-17

### Added
- **ISO 27001 Controls Mapping** (EN/TH) — Maps 52/93 Annex A controls to SOC documents with coverage chart and gap analysis
- **PCI-DSS v4.0 SOC Requirements** (EN/TH) — Covers Req 10, 11, 12.10 with audit preparation checklist and v3.2.1→v4.0 migration guide
- **Playbook Quick Reference Card** — Print-friendly 1-page summary of all 50 playbooks with severity, key actions, escalation guide, fillable contacts
- **MITRE ATT&CK Coverage Map** in README — Shows 12/14 tactics covered across 50 playbooks with heatmap indicators

### Changed
- **README Playbook Grouping** — Reorganized from 7 numeric groups (PB-01→10, etc.) to 7 attack-category groups (Email, Malware, Identity, Network, Cloud, Data, Physical) matching mkdocs nav
- **mkdocs.yml Navigation** — Playbooks grouped by attack category with PB IDs; Operations split into 5 named sub-groups with emoji headers
- **Stale number fixes** — Corrected 14+ stale references across 6+ files:
  - Sigma Rules: 50→36 (README badge + table + section header)
  - Playbooks: 20→50 (SOC_101 EN/TH, Quickstart EN, AGENTS.md, SOC_Manual)
  - PB range: PB-01 to PB-20→PB-50 (AGENTS.md, SOC_Manual)
- **IBM statistics updated** — 204→194 days breach detection, $4.45M→$4.88M cost (IBM 2024) in SOC_101 EN/TH

---

## [2.10.0] - 2026-02-16

### Added
- **15 new incident response playbooks** (PB-36 to PB-50) with full EN/TH coverage
  - PB-36 Credential Dumping (T1003) — LSASS, SAM, DCSync, Kerberoasting
  - PB-37 SQL Injection (T1190) — SQLi detection, WAF, database forensics
  - PB-38 Wiper Attack (T1485/T1561) — Destructive malware, integrity monitoring
  - PB-39 Living Off The Land (T1059/T1218) — LOLBins, fileless attacks
  - PB-40 USB Removable Media (T1091/T1052) — USB threats, BadUSB, DLP
  - PB-41 VPN Abuse (T1133) — Unauthorized VPN, impossible travel, MFA bypass
  - PB-42 Email Account Takeover (T1114) — BEC, inbox rules, OAuth abuse
  - PB-43 Watering Hole (T1189) — Trusted site compromise, exploit kits
  - PB-44 Drive-By Download (T1189) — Browser exploits, TDS, malvertising
  - PB-45 Rootkit/Bootkit (T1014/T1542) — Kernel, UEFI, firmware persistence
  - PB-46 SIM Swap (T1111) — SIM hijacking, SMS MFA bypass, carrier fraud
  - PB-47 Cloud Cryptojacking (T1496) — Crypto mining, cost spikes, API key abuse
  - PB-48 Deepfake Social Engineering (T1598) — AI voice/video, exec impersonation
  - PB-49 Typosquatting (T1583.001) — Domain impersonation, brand abuse, takedown
  - PB-50 Unauthorized Scanning (T1046) — Port scan, recon, network sweep
- Each playbook includes 7-8 Mermaid diagrams, Sigma detection rules, and PDPA references
- Total: 30 new files, 7,230+ lines added across EN and TH versions

## [2.9.0] - 2026-02-16

### Added
- **Comprehensive document enhancement** — 64 files expanded across 6 batches (+3,249 lines total)
  - All EN documents now above 160 lines (previously 20+ files were under 150)
  - PDPA Compliance: penalty table, cross-border guidance, 72h breach workflow, DPIA checklist
  - SOC Communication: crisis plan, war room activation, on-call procedures
  - Simulation Guide: lab environment setup, 3 detailed test scenarios, debrief template
  - SOC Team Structure: interview questions (T1/T2/T3), skills matrix, salary benchmarks
  - Data Handling Protocol: TLP marking in practice, DLP controls, TLP quick reference card
  - Common Issues: SIEM/EDR/log source troubleshooting scripts, escalation matrix
  - SOC Assessment Checklist: scoring rubric, industry maturity benchmarks
  - Threat Intelligence Lifecycle: TI report template, Diamond Model, STIX/TAXII reference
  - Access Control: break-glass emergency access, PAM workflow
  - Lessons Learned Template: common patterns, facilitator checklist, blameless culture
  - Detection Rule Testing: TDD workflow, CI/CD pipeline, quality benchmarks
  - Data Governance Policy: SOC data classification, lifecycle management
  - Monthly SOC Report: dashboard visualization guide, trend analysis, executive summary
  - Quickstart Guide: 10-item FAQ section
  - Analyst Onboarding Path: 90-day structured onboarding plan
  - System Activation: pre-flight checklist, log sources priority, go-live notification template
  - Database Management: capacity planning, backup strategy, health check script
  - Deployment Procedures: rollback procedures, change window schedule, smoke test script
  - Executive Dashboard: KPI definitions with RAG thresholds
  - Interview Guide: 3 scenario-based questions, scoring rubric
  - Templates: handover example, incident timeline, RFC risk assessment, approval matrix
  - SLA Template: penalty/credit structure, quarterly review agenda
  - Change Management: emergency change process, post-implementation review
  - Atomic Test Map: testing frequency matrix (12 tactics), result tracking
  - Vendor Evaluation: 3-year TCO model, POC checklist
- **Full TH-EN parity maintained** — All 32 enhanced EN files have matching TH versions

### Changed
- **Directory refactoring** — Improved project organization
  - Moved Tier 1/2/3 Runbooks to `05_Incident_Response/Runbooks/` subfolder
  - Merged `templates/` into `11_Reporting_Templates/` (single location for all templates)
  - Updated 100+ cross-references across 118 files (zero stale links)
- Project total now **86,564 lines** across 244 documents

---

## [2.8.0] - 2026-02-16

### Added
- **Complete TH-EN parity** — All 244 files now have near-identical line counts between Thai and English versions
  - Non-playbook documents: max gap ≤ 3 lines (120 file pairs)
  - Playbook documents: max gap ≤ 5 lines (35 file pairs)
  - Total lines added for parity: +3,416 across 13 expansion batches
- **Tier 1 Runbook v2.0** — Complete rewrite (229 → 519 lines EN, 227 → 517 lines TH)
  - Added: SIEM query templates, 10 alert types, FP cheat sheet, first-day checklist, log source reference, KPIs, 3 Mermaid flow diagrams
- **Tier 2 Runbook** — New (383 lines EN/TH)
  - Investigation methodology, SIEM correlation queries, containment framework, MITRE ATT&CK mapping, incident documentation template, T1 mentoring guide
- **Tier 3 Runbook** — New (429 lines EN, 428 lines TH)
  - Threat hunting framework, LOLBin/persistence/C2 hunt queries, malware analysis workflow, Sigma/YARA templates, forensics commands, purple team guide, TI report template
- **Targeted content additions** — Tables, checklists, quick reference cards, decision matrices, and workflow templates added to all Thai documents to achieve content equivalence

### Changed
- **Project directory reorganization** — Consolidated from 25 overlapping directories to 12 clean directories with unique prefixes (00–11)
  - Merged `07_Compliance_Privacy/` → `07_Compliance_Privacy/`
  - Unified detection engineering (`07_Detection_Rules` + `10_File_Signatures` → `08_Detection_Engineering`)
  - Consolidated onboarding (`01_Onboarding` + `01_SOC_Overview` + `09_Training` → `10_Training_Onboarding`)
  - Renumbered `08_Simulation_Testing` → `09_Simulation_Testing`
  - Removed 5 duplicate files (Escalation_Matrix, Alert_Tuning_SOP, Communication_SOP duplicates)
- Updated all 237 `mkdocs.yml` navigation paths to match new structure
- Updated `README.md` directory tree (26 path references)

### Statistics
- **Total files**: 240 (120 EN + 120 TH)
- **Total lines**: 81,036
- **Max TH-EN gap**: 5 lines (1 file), all others ≤ 3

---

## [2.7.0] - 2026-02-16

### Added
- **350 Mermaid diagrams** across all 70 playbooks (35 EN + 35 TH), 5 diagrams per playbook
  - Phase 1: Base 3 diagrams per playbook (decision flowchart, attack/detection visualization, response sequence)
  - Phase 2: 2 extra diagrams for 15 shortest playbooks (hardening/prevention + forensic artifacts)
  - Phase 3: 2 extra diagrams for remaining 20 playbooks (security architecture + operational workflow)
- **Diagram topics include**: Password Hardening, Conditional Access, BEC Kill Chain, C2 Framework Classification, Beacon Detection, Least Privilege, Mining Pool Detection, Container Security, DDoS Mitigation, Exfiltration Channels, UEBA Indicators, Log Protection Architecture, MFA Comparison (SMS→FIDO2), Malware Analysis Pipeline, EDR Response Flow, BYOD Architecture, OT/IT Convergence, Email Security Stack (SPF/DKIM/DMARC), AMSI Detection, Secure SDLC, PAM Architecture, SBOM Management, Vendor Risk Assessment, CSPM Pipeline, PDPA Notification
- **Sigma cross-references** — All 70 playbooks now link to their matching Sigma detection rules (1-4 rules per playbook)
- **Post-Incident sections** — Added to all 34 TH playbooks (หลังเหตุการณ์) with 6 topic-specific action items each

### Improved
- **12 short EN playbooks** expanded: Network Discovery (156→210), Data Collection (176→230), and 10 others
  - Added eradication, IoC collection, escalation criteria, recovery, and post-incident sections
- Repository visual guidance significantly enhanced: 350 diagrams total
- Every playbook now includes both architectural reference diagrams and operational workflows
- Consistent 5-diagram structure across all playbooks for uniform quality
- Complete IR lifecycle coverage: Analysis → Containment → Eradication → Recovery → Escalation → Post-Incident

---

## [2.6.0] - 2026-02-16

### Added
- **PB-34 Network Discovery** (EN+TH) — Discovery tactic coverage: T1046, T1135, T1018 (port scanning, AD enumeration, net commands)
- **PB-35 Data Collection** (EN+TH) — Collection tactic coverage: T1560, T1119, T1074 (archive staging, bulk access, cloud downloads)
- **Sigma: win_network_discovery.yml** — Discovery tools detection (nmap, net commands, AD queries)
- **Sigma: win_data_collection_staging.yml** — Password-protected archiving and data staging detection
- **Escalation_Matrix** (EN+TH) — Severity-based escalation paths, contact list template, flowchart
- **Alert_Tuning_SOP** (EN+TH) — False positive reduction workflow, tuning methods
- **SOC_Communication** (EN+TH) — Communication channels, notification templates, escalation matrix
- **PDPA_Compliance** (EN+TH) — PDPA data classification, breach notification (72h), IR integration
- **Data_Governance_Policy** (EN+TH) — Data classification levels L1–L4, handling requirements

### Changed
- **change_request_rfc** (EN+TH) — Expanded 35→130 lines: implementation plan, testing, CAB approval, post-review
- **incident_report** (EN+TH) — Expanded 43→140 lines: structured timeline, IoCs table, VERIS RCA, approvals
- **Quarterly_Business_Review** (EN+TH) — Expanded 42→170 lines: KPI dashboard, MITRE coverage, budget, risk register
- **Atomic_Test_Map** (EN+TH) — Expanded 50→160 lines: 28 tests by ATT&CK tactic, install guide, testing cadence
- **GitHub Topics** — Optimized 14→20 topics: added `nist`, `dfir`, `detection-engineering`, `soar`, `threat-intelligence`, `edr`
- **mkdocs.yml** — Added 10 new nav entries for Escalation Matrix, Alert Tuning SOP, SOC Communication, PDPA Compliance, Data Governance Policy, Network Discovery, Data Collection

### Improved
- MITRE ATT&CK tactic coverage: 11/14 → 13/14 (added Discovery + Collection)
- Playbooks: 33 → 35
- Sigma rules: 33 → 35

---

## [2.5.0] - 2026-02-16

### Changed
- **Framework.en/th.md** — Expanded from 54 to 300 lines: RACI matrix, containment decision matrix, severity SLA table, triage flowchart, evidence preservation checklist, PIR agenda
- **Shift_Handoff.en/th.md** — Expanded from 60 to 192 lines: coverage models, 30-min meeting agenda, start/end-of-shift checklists, communication protocols, fatigue management, handoff quality audit
- **SOC_Metrics.en/th.md** — Expanded from 59 to 247 lines: MTTC, dwell time, escalation accuracy, FPR action table, capacity/business metrics, dashboard panels, reporting cadence
- **Training_Checklist.en/th.md** — Expanded from 39 to 180 lines: 8-week program (was 4), formal assessment criteria, graduation sign-off, certification roadmap
- **shift_handover.en/th.md** — Expanded from 33 to 139 lines: checkbox system health, TI/vulnerability sections, statistics, compliance deadlines, dual sign-off

### Fixed
- Removed duplicate lines in SOC_Metrics.en.md and Shift_Handoff.en.md
- `check_links.py` — Added `.agent` to EXCLUDE_DIRS to fix CI false positives

---

## [2.4.0] - 2026-02-16

### Added
- **TRAINING.md** — Comprehensive 6-course training catalog with modules, labs, outcomes, deliverables
- **CONTRIBUTING.md** — Contribution guide with document standards, naming conventions, checklist
- README dynamic badges (Stars, Last Commit, CI Status, Docs, Training)
- Personal brand section (About the Author, services, contact badges)

### Changed
- Updated `mkdocs.yml` site_author to personal name
- Added Training Course Catalog to mkdocs navigation

---

## [2.3.0] - 2026-02-16

### Added
- **Compliance Gap Analysis** (EN+TH) — 6 frameworks, gap analysis process, SOC controls matrix
- **Playbook Development Guide** (EN+TH) — Structure standard, MITRE coverage, tabletop testing
- **SOC Capacity Planning** (EN+TH) — Staffing model, SIEM sizing, budget planning, automation ROI
- **CHANGELOG.md** — This file
- **VERSION_TRACKER.md** — Document version tracker with review status

### Changed
- None

---

## [2.2.0] - 2026-02-16

### Added
- **DLP SOP** (EN+TH) — Data classification, 10 policies, PDPA breach assessment
- **Network Security Monitoring** (EN+TH) — 22 detections, zone matrix, DNS security

### Changed
- Reorganized README.md into logical sub-categories (6 Operations groups, 3 IR groups)
- Reorganized mkdocs.yml navigation with YAML comment separators
- Removed all `(NEW)` tags from README
- Added bilingual sub-headings throughout

---

## [2.1.0] - 2026-02-15

### Added
- **Cloud Security Monitoring** (EN+TH) — Multi-cloud architecture, 20+ detections
- **Insider Threat Program** (EN+TH) — Behavioral indicators, investigation workflow
- **Vulnerability Management** (EN+TH) — CVSS scoring, patching SLA, scanning procedures
- **Phishing Simulation Program** (EN+TH) — Campaign management, metrics, training

### Fixed
- Cross-directory links in Phishing_Simulation.en.md

---

## [2.0.0] - 2026-02-15

### Added
- **Threat Hunting Playbook** (EN+TH) — 8 hunt hypotheses, MITRE mapped
- **Log Source Matrix** (EN+TH) — 20+ sources with priority and retention
- **Escalation Matrix** (EN+TH) — P1–P4 escalation paths with SLAs
- **Disaster Recovery / BCP** (EN+TH) — RTO/RPO targets, DR procedures
- **Incident Classification** (EN+TH) — Taxonomy with 10 categories
- **SOC Automation Catalog** (EN+TH) — 15+ automation use cases
- **Forensic Investigation** (EN+TH) — Evidence handling, chain of custody
- **KPI Dashboard Template** (EN+TH) — 8 key metrics with targets
- **Threat Landscape Report** (EN+TH) — Regional threat analysis
- **Third-Party Risk** (EN+TH) — Vendor assessment, monitoring
- **SOC Maturity Assessment** (EN+TH) — 7 domains, scoring model
- **Alert Tuning SOP** (EN+TH) — FP reduction, tuning lifecycle
- **Purple Team Exercise Guide** (EN+TH) — 9 exercises, scoring
- **SOC Analyst Onboarding** (EN+TH) — 90-day curriculum
- `export_pdf.py` — Client-ready PDF/HTML export tool

### Changed
- Rewrote README.md for readability with collapsible playbook sections

### Fixed
- Broken links in SOC_Onboarding, SOC_Automation_Catalog
- 3 broken cross-directory links

---

## [1.2.0] - 2026-02-15

### Added
- **Compliance Mapping** (EN+TH) — ISO 27001, NIST CSF, PCI DSS
- **PDPA Incident Response** (EN+TH) — 72-hour notification
- **Monthly SOC Report** template (EN+TH)
- **Quarterly Business Review** template (EN+TH)
- **Executive Dashboard** template (EN+TH)
- 6 Budget/Staffing guides and Analyst Training Path (EN+TH)
- SOC Checklists, Interview Guide, SLA Template (EN+TH)

---

## [1.1.0] - 2026-02-15

### Added
- SOC Building Roadmap (zero-to-SOC guide)
- Technology Stack Selection, Infrastructure Setup, Use Case Prioritization (EN+TH)
- PB-26 through PB-33 (MFA Bypass, Cloud Storage, Mobile, Shadow IT, OT/ICS, AWS, Azure)
- SOAR Playbook Templates (6 templates)
- TI Feeds Integration guide
- Grafana (14 panels) + Kibana (11 panels) dashboards
- 5 YARA rules + Sigma validator

---

## [1.0.0] - 2026-02-15

### Added
- Initial SOC SOP repository
- Bilingual structure (EN/TH) for all documents
- IR Framework (NIST-based), Severity Matrix
- PB-01 through PB-25 (25 core playbooks)
- 33 Sigma detection rules
- Simulation & Testing Guide with Atomic Red Team mapping
- SOC Metrics, Shift Handoff, Operational Templates
- Incident Report, Shift Handover, RFC templates
- SOC 101, Quickstart Guide, Glossary
- `check_links.py`, `new_playbook.py`, `export_docs.py`, `validate_sigma.py`
- SOC Maturity Scorer (interactive HTML)
- MITRE ATT&CK Heatmap (interactive HTML)
- MkDocs configuration for documentation site
