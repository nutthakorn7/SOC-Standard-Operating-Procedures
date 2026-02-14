# Database & Secrets Management

**Source**: zcrAI Platform Operations & Industrialization Master

## 1. Data Persistence & Resilience

-   **PostgreSQL (`zcrai`)**: Stores alerts, integrations, detection rules, and compliance snapshots.
-   **ClickHouse (`montara_analytics`)**: Columnar storage for security events.
-   **Redis**: Used for session caching; system is designed to fail-open if Redis is unreachable.

## 2. Background Rule Seeding

On backend startup, detection rules are automatically seeded:
-   **Verification**: Check logs for `✨ Seeding Complete!`.
-   **Conflict Warning**: Manual SQL updates to default rules will be overwritten by the seeding script on restart. Only update rules via source seeding scripts (`backend/api/scripts/seed-detection-rules-v2.ts`).

## 3. Operations

### Content Library Persistence
The `content_packs` table tracks installed status and versioning for the 2,660+ Sigma rules.
-   **Management**: Use `forensics.controller.ts` logic which queries `content_packs`.

### Troubleshooting Data Visibility
If alerts are missing from the UI:
1.  **Tenant ID Check**: Ensure SuperAdmin session matches the data's `tenant_id`.
2.  **Time Windows**: Check filters (last 24h vs 7d).
3.  **Entity Mapping**: Ensure `affectedUser` or `sourceIp` are populated.
