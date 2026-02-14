# YARA Rules (File Signatures)

This directory contains YARA rules for detecting malicious files. These rules can be used with the `yara` command line tool or integrated into EDR/Forensic tools.

| Rule File | Description | Severity |
| :--- | :--- | :--- |
| `webshell_php_generic.yar` | Detects common PHP Webshells (c99, r57, etc.) | Critical |
| `ransomware_generic_encrypt.yar` | Detects mass file encryption behavior and ransom notes | Critical |
| `hacktool_mimikatz.yar` | Detects Mimikatz credential dumping artifacts | High |

## Usage
```bash
yara -r 10_File_Signatures/ /path/to/scan
```
