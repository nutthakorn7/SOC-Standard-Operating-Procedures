# Data Governance Policy

This policy defines the standards for data classification, handling, retention, and disposal within the SOC environment.

---

## Data Classification Levels

| Level | Label | Examples | Access |
|:---|:---|:---|:---|
| **L4** | Restricted | Credentials, encryption keys, PII (sensitive) | Named individuals only |
| **L3** | Confidential | Investigation details, IoCs, incident reports | SOC team + management |
| **L2** | Internal | SOPs, procedures, operational metrics | All employees |
| **L1** | Public | Published advisories, open-source tools | Anyone |

## Handling Requirements

| Classification | Storage | Transmission | Retention | Disposal |
|:---|:---|:---|:---|:---|
| **Restricted** | Encrypted, access-controlled | Encrypted channel only | Per regulation | Secure delete + log |
| **Confidential** | Access-controlled | Encrypted preferred | 1 year after case close | Secure delete |
| **Internal** | Standard storage | Internal channels | Per policy | Standard delete |
| **Public** | Any | Any | Indefinite | Standard delete |

## SOC-Specific Guidelines

1. **Log Data** — Retain for minimum 90 days, archive up to 1 year
2. **Incident Evidence** — Retain for 1 year after case closure (or per legal hold)
3. **Threat Intelligence** — Refresh daily, archive historical IoCs
4. **Personal Data (PII)** — Follow [PDPA Compliance](PDPA_Compliance.en.md) requirements
5. **Third-Party Data** — Handle per vendor agreement terms

## Related Documents

- [PDPA Compliance](PDPA_Compliance.en.md)
- [Data Handling Protocol](../06_Operations_Management/Data_Handling_Protocol.en.md)
- [Forensic Investigation](../05_Incident_Response/Forensic_Investigation.en.md)

## References

- [ISO 27001 — Information Security Management](https://www.iso.org/iso-27001-information-security.html)
- [NIST SP 800-53 — Security Controls](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
