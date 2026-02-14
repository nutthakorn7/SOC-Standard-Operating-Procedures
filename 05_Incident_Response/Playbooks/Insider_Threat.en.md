# Playbook: Insider Threat

**ID**: PB-14
**Severity**: High
**Trigger**: UEBA Alert (Abnormal Access Hours), Data Access Logs (Bulk File Copy).

## 1. Analysis (Triage)
-   **Context**: Is the user leaving the company (Notice period)?
-   **Baseline**: Is this normal behavior for their role (e.g., Backup Administrator)?
-   **HR Check**: Check employment status.

## 2. Containment
-   **Suspend Access**: Temporarily suspend computer and application access.
-   **Physical Security**: If onsite, notify physical security/HR to escort.

## 3. Investigation (Forensic)
-   **Device Seizure**: Secure the laptop/mobile for forensic imaging.
-   **Email Review**: Check for data sent to personal email.
-   **USB History**: Check for recent USB storage connections.

## 4. Recovery
-   **Legal Action**: HR and Legal to determine employment termination or legal proceedings.
