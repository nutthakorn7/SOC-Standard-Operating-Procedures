# Incident Response Framework

This document outlines the standard phases of Incident Response (IR) at zcrAI, aligned with NIST SP 800-61.

## 1. Preparation
- **Tools**: Ensure EDR (SentinelOne/CrowdStrike), SIEM, and Ticketing systems are integrated via the Integration Hub.
- **Access**: Verify analyst access to the zcrAI portal and third-party consoles.
- **Training**: Regular review of playbooks.

## 2. Identification
- **Triage**: Analyze initial alerts in the `Alerts` queue.
- **Verification**:
    -   Check `affectedUser` and `sourceIp`.
    -   Correlate with Threat Intelligence (VirusTotal/URLScan).
-   **Classification**: Assign Severity (Low, Medium, High, Critical) and Type (Phishing, Malware, etc.).

## 3. Containment
- **Short-term**: Isolate affected host via EDR, block network traffic on Firewall/WAF.
- **Long-term**: Patch vulnerabilities, reset compromised credentials (force logout via Identity Provider).

## 4. Eradication
-   Remove malicious artifacts (files, registry keys).
-   Re-image infected systems if necessary.
-   Verify removal via follow-up scans.

## 5. Recovery
-   Restore systems to production.
-   Monitor for re-infection (24-48 hours).

## 6. Lessons Learned
-   Conduct Post-Incident Review (PIR) within 72 hours.
-   Update Detection Rules and Playbooks based on findings.
