# Playbook: Audit Log Clearing (Defense Evasion)

**ID**: PB-20
**Severity**: Critical
**Trigger**: SIEM Alert ("Event Log Cleared", "Audit Policy Disabled").

## 1. Analysis (Triage)
-   **Event ID**: Windows Security Log ID 1102 ("The audit log was cleared").
-   **User**: Who cleared it? Was it System or a User?
-   **Correlation**: What happened *immediately before* or *after* the clearing? (Often used to hide malware installation).

## 2. Containment
-   **Isolate Host**: Assume the host is fully compromised. Isolate immediately.
-   **Reset Admin**: Reset the password of the account used to clear logs.

## 3. Investigation
-   **Recover Logs**: Check if logs were forwarded to SIEM *before* they were cleared locally. (This is why SIEM is crucial).
-   **Forensics**: Analyze disk artifacts ($MFT) to see what files were accessed during the "blind" spot.

## 4. Recovery
-   **Re-image**: A system with cleared logs cannot be trusted. Re-image is recommended.
