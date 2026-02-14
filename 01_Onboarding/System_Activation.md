# System Activation & Startup Sequence

**Source**: zcrAI Platform Operations & Industrialization Master

## 1. Infrastructure Initialization (Docker)

The SOC platform depends on a multi-service architecture:
-   **PostgreSQL**: Transactional Store (Port 5432)
-   **ClickHouse**: Analytics (Port 8123/9000)
-   **Redis**: Cache (Port 6379)

### Steps
1.  **Start Docker Desktop**: Ensure the daemon is healthy.
2.  **Launch Services**:
    ```bash
    docker compose up -d postgres redis clickhouse
    ```
3.  **Verify Port Mappings**:
    -   PostgreSQL: `5433` -> `5432`
    -   Redis: `6379`
    -   ClickHouse: `9000` (Native) / `8123` (HTTP)

## 2. Database Initialization

### PostgreSQL (Drizzle)
Push schema changes and seed initial data:

```bash
# Push schema to PostgreSQL container
ssh zcrAI "docker exec zcrai_backend bun run db:push"

# Initialize Administrative Data & SuperAdmin
bun run scripts/seed-superadmin.ts
```

### ClickHouse Initialization
Required after an environment wipe:

1.  **Create Database**:
    ```bash
    ssh zcrAI "docker exec zcrai_clickhouse clickhouse-client --query='CREATE DATABASE IF NOT EXISTS zcrai'"
    ```
2.  **Sync Schema**:
    Ensure `security_events` table and materialized views are created (refer to `collector/infra/db/clickhouse/migrations/001_init_schema.sql`).
3.  **Validation**:
    ```bash
    ssh zcrAI "docker exec zcrai_clickhouse clickhouse-client --query='SHOW TABLES FROM zcrai'"
    ```

## 3. Content Library Initialization

The persistent content library (Sigma rules) requires the `content_packs` table.

1.  **Generate Migration**:
    ```bash
    ssh zcrAI "docker exec zcrai_backend bun run db:generate"
    ```
2.  **Apply Migration**:
    ```bash
    ssh zcrAI "docker exec zcrai_backend cat drizzle/0035_striped_groot.sql | docker exec -i zcrai_postgres psql -U postgres -d zcrai"
    ```
3.  **Verification**:
    Check if the table exists:
    ```bash
    ssh zcrAI "docker exec zcrai_postgres psql -U postgres -d zcrai -c '\dt content_packs'"
    ```

## 4. Local Service Architecture

| Service | Local Port | Description |
| :--- | :--- | :--- |
| **Frontend** | `5173` | React/HeroUI Dev Server |
| **SOC API** | `8000` | Bun/Elysia Backend |
| **PostgreSQL** | `5433` | Metadata Store |
| **ClickHouse** | `8123` | Analytics Warehouse |
| **Redis** | `6380` | Session/Lockout Cache |
