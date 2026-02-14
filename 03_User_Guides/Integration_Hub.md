# Integration Hub Guide

**Source**: zcrAI System & Engineering Guides

## Overview
The Integration Hub supports **43+ security providers** across various tiers (EDR, SIEM, Cloud, Identity, Email, Threat Intel).

## Key Components

### 1. Community Feeds (Abuse.ch)
The following are integrated as "No-Key" feeds:
-   ThreatFox
-   URLhaus
-   MalwareBazaar
-   Feodo Tracker

### 2. Health Monitoring
-   **Status Checks**: Runs every 30 seconds.
-   **Troubleshooting**:
    -   If the UI shows "Error" but the global key is valid, verify **tenant-specific credentials** in the `api_keys` table.

## Development & Troubleshooting

-   **Dev Mode**: Use `VITE_BYPASS_AUTH=true` in `frontend/.env` to access the catalog without a running backend/database.
-   **Connectivity**: If `localhost` fails, try `http://127.0.0.1:8000`.
