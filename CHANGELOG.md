# Changelog

All notable changes to the SOC Standard Operating Procedures will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
