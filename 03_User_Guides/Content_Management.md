# Content Management Guide

**Source**: zcrAI System & Engineering Guides

## Overview
The Content Management page is the central hub for managing Detection Rules (Sigma/SNR) and Rule Templates.

## Features

### 1. Filters & Search
-   **Categories**: Filter by threat category (e.g., `privilege-escalation`, `reconnaissance`).
-   **Severity**: High, Critical, Medium, Low.
-   **Status**: Enabled/Disabled.

### 2. Actions
-   **Bulk Actions**: Enable or disable multiple rules simultaneously.
-   **Rule Status**:
    -   **Event**: Rules that log general security events.
    -   **Finding**: Rules that generate high-fidelity security findings/alerts.

## Rule Catalogs

### Content Packs
-   **Sigma Core**: 2,660+ rules (Endpoint, Network, Cloud).
-   **Windows Security**: Enhanced OS visibility.
-   **Ransomware**: Specialized detection bundle.

### Rule Templates
Standardized patterns for creating new rules:
-   **IAM**: MFA bypass, privileged account creation.
-   **Cloud**: S3 public access, root login.
-   **Email**: Phishing, BEC patterns.
