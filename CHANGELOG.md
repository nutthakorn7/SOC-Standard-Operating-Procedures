# Changelog

All notable changes to the SOC Standard Operating Procedures will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

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
