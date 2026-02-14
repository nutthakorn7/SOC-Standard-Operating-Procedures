# Playbook: Lateral Movement

**ID**: PB-12
**Severity**: High
**Trigger**: EDR/SIEM Alert ("Remote Service Creation", "SMB/RDP to multiple hosts").

## 1. Analysis (Triage)
-   **Source**: Identify Patient Zero (First infected host).
-   **Method**: How are they moving? (PsExec, WMI, RDP, WinRM).
-   **Credentials**: Which user account is being leveraged?

## 2. Containment
-   **Block Account**: Disable the compromised account used for movement.
-   **Isolate Source**: Cut off the source machine.
-   **Block Protocol**: Temporarily block SMB/RDP port 445/3389 at the firewall for the segment.

## 3. Eradication
-   **Trace Forward**: Identify ALL hosts touched by the source machine.
-   **Scan/Clean**: Run scans on all touched hosts.

## 4. Recovery
-   **Segmentation**: Review network segmentation. Workstations should generally not talk to other workstations (Client-to-Client communication).
