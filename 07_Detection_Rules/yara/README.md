# YARA Detection Rules

This directory contains **10 YARA rules** across 5 files for **file-based threat detection**. Use these rules with YARA-compatible tools (YARA CLI, ClamAV, THOR, Velociraptor, etc.) to scan endpoints and file shares.

## How to Use

1. **Install YARA**: `brew install yara` (macOS) or `apt install yara` (Linux)
2. **Scan a file**: `yara -r ransomware_indicators.yar /path/to/suspect_file`
3. **Scan a directory**: `yara -r *.yar /path/to/directory/`
4. **Use in Velociraptor**: Import rules into `Yara.Scan` artifact for endpoint sweeps

---

## 📋 Rules Index

| File | Rules | Threat Category | Severity | Playbook | MITRE |
|:---|:---:|:---|:---:|:---|:---|
| [ransomware_indicators.yar](ransomware_indicators.yar) | 2 | Ransomware (ransom notes, shadow delete) | Critical | PB-02 | T1486 |
| [webshell_generic.yar](webshell_generic.yar) | 3 | Webshells (PHP, JSP, ASPX) | High | PB-10, PB-18 | T1505.003 |
| [cryptominer_detection.yar](cryptominer_detection.yar) | 2 | Cryptominers (binary + script) | High | PB-23 | T1496 |
| [cobalt_strike_beacon.yar](cobalt_strike_beacon.yar) | 2 | Cobalt Strike (beacon + stager) | Critical | PB-13, PB-12 | T1071.001 |
| [malicious_document.yar](malicious_document.yar) | 2 | Malicious docs (Office macros, PDF JS) | High | PB-01, PB-03 | T1566.001 |

**Total: 10 rules / 5 files**

---

## Rule Severity Guide

| Severity | Action |
|:---|:---|
| **Critical** | Block immediately + escalate to Tier 2 |
| **High** | Alert + quarantine + triage within 15 min |
| **Medium** | Alert + investigate within 1 hour |

---

## Integration Examples

### Velociraptor Artifact
```yaml
name: Custom.Yara.SOCScan
sources:
  - query: |
      SELECT * FROM yara(
        rules=read_file(filename="/path/to/yara/*.yar"),
        files=glob(globs="/tmp/**")
      )
```

### ClamAV
```bash
# Convert YARA to ClamAV signatures
sigtool --convert-yara ransomware_indicators.yar > ransomware.ldb
```

### THOR (Nextron Systems)
```bash
# Drop .yar files into THOR's custom-signatures directory
cp *.yar /opt/thor/custom-signatures/yara/
```
