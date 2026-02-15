---
description: How to update documentation when adding, modifying, or removing SOC SOPs
---

# Update SOC Documentation Workflow

When adding, modifying, or removing SOC SOP documents, follow these steps to keep versioning and tracking up to date.

// turbo-all

## 1. Create or modify the document

- Create both EN (`.en.md`) and TH (`.th.md`) versions
- Include standard metadata at the top of each document:
  ```markdown
  **Document ID**: [SECTION]-SOP-[NUMBER]
  **Version**: 1.0
  **Classification**: Internal
  **Last Updated**: YYYY-MM-DD
  ```
- Place the file in the correct directory (e.g., `06_Operations_Management/`, `05_Incident_Response/`)

## 2. Update README.md

- Add the new document to the appropriate section table in `README.md`
- Use the format: `| **📌 Document Name** | [Read](path/to/file.en.md) | [อ่าน](path/to/file.th.md) |`
- Place it in the correct sub-group within the section

## 3. Update mkdocs.yml

- Add nav entries for both EN and TH versions under the appropriate section
- Place them near related documents

## 4. Update CHANGELOG.md

- Add a new version entry at the top of `CHANGELOG.md` (below the header)
- Follow [Keep a Changelog](https://keepachangelog.com) format:
  ```markdown
  ## [X.Y.Z] - YYYY-MM-DD

  ### Added
  - **Document Name** (EN+TH) — Brief description

  ### Changed
  - Description of any modifications to existing documents
  ```
- Version bump rules:
  - **Patch** (X.Y.Z+1): Typo fixes, formatting
  - **Minor** (X.Y+1.0): New documents, content updates
  - **Major** (X+1.0.0): Major restructuring, breaking changes

## 5. Update VERSION_TRACKER.md

- Add a new row in the appropriate section table:
  ```markdown
  | [Document Name](path/to/file.en.md) | 1.0 | YYYY-MM-DD | ✅ Current | YYYY+1-MM-DD |
  ```
- If modifying an existing document, update its Version, Last Updated, and Next Review columns
- Update the **Summary** table at the bottom if document counts changed
- Update the `Repository version` and `Last tracker update` at the bottom

## 6. Validate and push

```bash
cd /Users/pop7/Code/SOCSOP
python3 tools/check_links.py
python3 tools/export_docs.py
git add -A
git commit -m "feat: add [Document Name] (EN+TH)"
git push
```

## 7. Tag version (for minor/major releases)

```bash
git tag -a vX.Y.Z -m "Description of changes"
git push origin vX.Y.Z
```

## Quick Reference

| File | When to update |
|:---|:---|
| `README.md` | Every new/removed document |
| `mkdocs.yml` | Every new/removed document |
| `CHANGELOG.md` | Every commit batch |
| `VERSION_TRACKER.md` | Every new/modified document |
| Git tag | Minor and major releases |
