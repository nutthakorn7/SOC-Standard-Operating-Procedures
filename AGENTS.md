# AGENTS.md — SOC Standard Operating Procedures Repository

This file defines the conventions, rules, and context for any AI agent or contributor working on this repository.

## Project Overview

This is a **vendor-agnostic SOC Standard Operating Procedures (SOP)** repository containing bilingual (English/Thai) documentation for Security Operations Centers. It covers Incident Response Playbooks, Operations Management, Detection Engineering, Simulation Testing, Training, and Executive Reporting.

**Maintained by**: [cyberdefense.co.th](https://cyberdefense.co.th)

---

## File Naming Conventions

| Rule | Example |
|---|---|
| English docs end with `.en.md` | `Phishing.en.md` |
| Thai docs end with `.th.md` | `Phishing.th.md` |
| Bilingual docs **always** come in pairs (EN + TH) | `Framework.en.md` + `Framework.th.md` |
| Language-neutral docs use plain `.md` | `Atomic_Test_Map.md`, `README.md` |
| Use `PascalCase_With_Underscores` for filenames | `SOC_Team_Structure.en.md` |
| Detection rules use lowercase with underscores | `win_multiple_failed_logins.yml` |

---

## Directory Structure

```
SOCSOP/
├── 01_Onboarding/           # SOC infrastructure setup
├── 02_Platform_Operations/   # Data governance, deployment procedures
├── 03_User_Guides/           # Detection engineering, tool integration
├── 04_Troubleshooting/       # Standard troubleshooting methodology
├── 05_Incident_Response/     # IR Framework + 20 Playbooks
│   └── Playbooks/            # Individual incident playbooks (PB-01 to PB-20)
├── 06_Operations_Management/ # Shift handoff, metrics, team structure, TLP, CTI
├── 07_Detection_Rules/       # Sigma detection rules (.yml)
├── 08_Simulation_Testing/    # Purple team guides, Atomic Red Team maps
├── 09_Training_Onboarding/   # Analyst curriculum, training checklists
├── 10_File_Signatures/       # YARA rules
├── 11_Reporting_Templates/   # Monthly/quarterly executive reports
├── templates/                # Incident report, shift handover, RFC forms
├── tools/                    # Utility scripts (export, link check)
└── assets/                   # Images (hero banner, etc.)
```

---

## Document Structure Requirements

Every SOP document **MUST** contain these sections (in order):

### 1. Title & Metadata
```markdown
# Document Title

**ID**: PB-XX (for playbooks)
**Severity**: Low/Medium/High/Critical (for playbooks)
```

### 2. Mermaid Flowchart
Every document must include at least one `mermaid` diagram visualizing the process or workflow.

```markdown
## Section Name

​```mermaid
graph TD
    A[Start] --> B[Step 1]
    B --> C{Decision}
    C -->|Yes| D[Action]
    C -->|No| E[Other Action]
​```
```

**Rules for Mermaid diagrams**:
- Thai versions must have **localized labels** (not just English copy-pasted).
- Use `graph TD` (top-down) for process flows, `graph LR` (left-right) for timelines/career paths.
- Keep diagrams concise (max ~10 nodes).

### 3. Main Content
Structured with numbered sections (`## 1.`, `## 2.`, etc.) and actionable checklists where appropriate:
```markdown
-   [ ] **Action Item**: Description of what to do.
```

### 4. Related Documents
Cross-links to other documents in the repository. Insert **before** References.

```markdown
## Related Documents          <!-- English -->
## เอกสารที่เกี่ยวข้อง (Related Documents)  <!-- Thai -->

-   [Document Name](relative/path/to/file.en.md)
```

**Cross-link rules**:
- Playbooks → link to IR Framework, Incident Report Template, related Playbooks.
- Operations docs → link to SOC Metrics, Assessment Checklist, IR Framework.
- Use **relative paths** (e.g., `../05_Incident_Response/Framework.en.md`).

### 5. References
External links to authoritative sources. Always include at least 2 references.

```markdown
## References
-   [NIST SP 800-61r2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
-   [MITRE ATT&CK](https://attack.mitre.org/)
```

**Preferred reference sources**: NIST, MITRE ATT&CK, CISA, SANS, OWASP, ISO 27001/27035, SOC-CMM, FIRST.

---

## Bilingual Content Rules

| Rule | Details |
|---|---|
| Every EN doc must have a TH counterpart | No orphaned single-language files |
| Thai docs are **localized**, not literal translations | Adapt terminology naturally |
| Mermaid labels must be localized | `Alert[แจ้งเตือน]` not `Alert[Alert]` |
| Section headers include Thai + English | `## 1. นิยามปัญหา (Defining the Problem)` |
| Keep technical terms untranslated | SIEM, MITRE ATT&CK, IOC, TLP, etc. |
| References section header stays as `## References` | Same in both EN and TH versions |

---

## Playbook Conventions

- **ID format**: `PB-XX` (e.g., PB-01, PB-02)
- **Standard sections**: Analysis → Containment → Eradication → Recovery
- **Mermaid flow**: Must visualize the triage/decision process
- **MITRE ATT&CK mapping**: Reference relevant technique IDs in References
- **Severity levels**: Low, Medium, High, Critical

---

## Detection Rules (Sigma)

- **Format**: Sigma YAML specification
- **Location**: `07_Detection_Rules/`
- **Naming**: `<category>_<description>.yml` (e.g., `win_multiple_failed_logins.yml`)
- **Must include**: `title`, `status`, `description`, `logsource`, `detection`, `level`, `tags` (MITRE ATT&CK)

---

## Verification & Quality Checks

Before committing changes, **always** run:

```bash
# 1. Check all internal links are valid
python3 tools/check_links.py

# 2. Regenerate consolidated manual
python3 tools/export_docs.py
```

**Checklist before commit**:
- [ ] No broken internal links (`check_links.py` passes ✅)
- [ ] Consolidated manual regenerated (`export_docs.py`)
- [ ] Both EN and TH versions updated if content changed
- [ ] Mermaid diagrams render correctly
- [ ] Related Documents section present with cross-links
- [ ] References section present with credible sources
- [ ] README.md updated if new documents were added
- [ ] No duplicate lines (known issue with batch edits)

---

## Git Commit Conventions

Use descriptive commit messages:

```
Add SOC Team Structure document (EN/TH) with org chart, roles, career path
Fix duplicate lines from flow insertion, regenerate consolidated manual
Add cross-links between all documents (Related Documents sections)
Standardize Operations Management docs: Add flows and references
```

**Pattern**: `<Action> <What> (<Details>)`

---

## README Maintenance

When adding new documents, update the README table under the correct section:

```markdown
| **Document Title** | [Link](path/to/file.en.md) | [ลิ้งค์](path/to/file.th.md) |
```

---

## Do NOT

- ❌ Use vendor-specific terminology (e.g., "Splunk query" → use "SIEM query")
- ❌ Create single-language documents (always EN + TH pair)
- ❌ Skip the Mermaid flowchart in any SOP document
- ❌ Use absolute file paths in cross-links
- ❌ Commit without running `check_links.py`
- ❌ Leave References section empty
- ❌ Hardcode organization-specific details (keep vendor-agnostic)
