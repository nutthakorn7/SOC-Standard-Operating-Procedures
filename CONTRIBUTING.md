# 🤝 Contributing Guide / คู่มือการมีส่วนร่วม

Thank you for your interest in contributing to the SOC Standard Operating Procedures!
ขอบคุณที่สนใจมีส่วนร่วมในโครงการ SOC SOP!

---

## 📋 How to Contribute / วิธีการมีส่วนร่วม

### 1. Report Issues / แจ้งปัญหา

- Found a broken link, typo, or outdated information?
- Open a [GitHub Issue](https://github.com/nutthakorn7/SOC-SOP/issues) with:
  - **Title**: Clear description of the issue
  - **File**: Which file(s) are affected
  - **Description**: What's wrong and suggested fix

### 2. Suggest New Content / เสนอเนื้อหาใหม่

- Have an idea for a new SOP, playbook, or template?
- Open an issue with the `enhancement` label
- Include: topic, target audience, why it's needed

### 3. Submit Changes / ส่งการแก้ไข

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feat/my-new-document

# 3. Make your changes (see guidelines below)

# 4. Commit with conventional commit message
git commit -m "feat: add [Document Name] (EN+TH)"

# 5. Push and create a Pull Request
git push origin feat/my-new-document
```

---

## 📝 Document Standards / มาตรฐานเอกสาร

### File Naming

```
[Directory]/[Document_Name].[lang].md

Example:
06_Operations_Management/DLP_SOP.en.md
06_Operations_Management/DLP_SOP.th.md
```

### Required: Bilingual Pairs

Every document **must** have both English (`.en.md`) and Thai (`.th.md`) versions.

| ✅ Correct | ❌ Incorrect |
|:---|:---|
| `DLP_SOP.en.md` + `DLP_SOP.th.md` | `DLP_SOP.en.md` only |

### Document Structure

Each SOP should include these sections:

```markdown
# Document Title

## Purpose / วัตถุประสงค์
Brief description of what this document covers.

## Scope / ขอบเขต
Who and what this applies to.

## [Main Content Sections]
The core content of the SOP.

## Related Documents / เอกสารที่เกี่ยวข้อง
Links to related SOPs in this repository.

## References / อ้างอิง
External references, standards, frameworks.
```

### Directory Structure

| Directory | Content |
|:---|:---|
| `00_Getting_Started/` | Introductory materials |
| `01_SOC_Fundamentals/` | Building and planning SOC |
| `05_Incident_Response/` | IR framework, playbooks, forensics |
| `06_Operations_Management/` | Day-to-day operations SOPs |
| `08_Simulation_Testing/` | Purple team, phishing sim, atomic tests |
| `10_Training_Onboarding/` | Analyst training materials |
| `07_Compliance_Privacy/` | Regulatory compliance |
| `11_Reporting_Templates/` | Reports and dashboards |
| `11_Reporting_Templates/` | Operational form templates |
| `sigma_rules/` | Detection rules (YAML) |
| `tools/` | Scripts and interactive tools |

---

## ✅ Checklist Before Submitting / เช็คลิสต์ก่อนส่ง

- [ ] Both `.en.md` and `.th.md` versions exist
- [ ] Internal links work (`python3 tools/check_links.py`)
- [ ] Document has Required Sections (Purpose, Scope, Related Documents, References)
- [ ] Added to `README.md` in the appropriate section
- [ ] Added to `mkdocs.yml` navigation
- [ ] Updated `CHANGELOG.md` with the change
- [ ] Updated `VERSION_TRACKER.md` with new/modified document
- [ ] Commit message follows [Conventional Commits](https://www.conventionalcommits.org/) format

---

## 💬 Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add [Document Name] (EN+TH)           # New document
fix: correct broken links in [File]          # Bug fix
refactor: reorganize [Section] structure     # Restructuring
docs: update README with new entries         # Documentation update
```

---

## 🔄 Update Workflow

When adding new documents, update these files (see [workflow](https://github.com/nutthakorn7/SOC-SOP/blob/main/.agent/workflows/update-docs.md)):

| # | File | Action |
|:---:|:---|:---|
| 1 | New `.en.md` + `.th.md` | Create the documents |
| 2 | `README.md` | Add entry in appropriate section |
| 3 | `mkdocs.yml` | Add navigation entry |
| 4 | `CHANGELOG.md` | Add version entry |
| 5 | `VERSION_TRACKER.md` | Add tracking row |

---

## 📬 Questions? / มีคำถาม?

- Open a [GitHub Discussion](https://github.com/nutthakorn7/SOC-SOP/discussions) or [Issue](https://github.com/nutthakorn7/SOC-SOP/issues)
- Contact: [Nutthakorn [Pop]](https://www.linkedin.com/in/nutthakorn/) via LinkedIn or Line: `pop7`

---

<p align="center">
  <i>Every contribution makes SOC operations better for everyone! 🛡️</i>
</p>
