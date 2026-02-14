# Deployment Procedures

**Source**: zcrAI Platform Operations & Industrialization Master

## 1. Production Deployment

Target: `https://app.zcr.ai` (Server IP: `45.118.132.160`)

### Standard Pipeline
-   **Trigger**: GitHub Actions on `main` merge.
-   **Sync**: `rsync` to server.
-   **Orchestration**:
    ```bash
    docker compose -f docker-compose.prod.yml up -d --build
    ```

### Direct IP Access & SSH
Use direct IP if DNS/SSH via `zcr.ai` fails.
**SSH Config (`~/.ssh/config`)**:
```ssh
Host zcrAI
  HostName 45.118.132.160
  User root
  IdentityFile ~/.ssh/id_rsa
  IdentitiesOnly yes
```

## 2. Manual Hotfix Patterns

### Frontend Hotfix (No Rebuild)
For rapid UI fixes:
1.  **Local Build**:
    ```bash
    cd frontend && npm run build
    ```
2.  **Sync**:
    ```bash
    rsync -avz --progress frontend/dist/* zcrAI:/var/www/app.zcr.ai/
    ```
3.  **Bypass Cache**: Instruct users to Hard Refresh (Ctrl+Shift+R).

### Frontend Persistence Warning
Modifying `dist/` on the host does NOT affect the running container if it doesn't mount that volume. For containerized updates:
1.  **Copy Assets**:
    ```bash
    ssh zcrAI "docker cp /root/zcrAI/frontend/dist/. zcrai_frontend:/usr/share/nginx/html/"
    ```

### Backend Selective Rebuild
If a full build fails:
```bash
ssh zcrAI "cd /root/zcrAI && docker compose -f docker-compose.prod.yml up -d --build backend"
```

## 3. Environment Variables

**Critical**: `docker restart` does **NOT** reload `.env` changes.

**Procedure for .env updates**:
1.  Verify file location (root vs nested).
2.  **Recreate Container**:
    ```bash
    ssh zcrAI "docker rm -f zcrai_backend && docker run -d --name zcrai_backend --env-file /root/zcrAI/backend/api/.env ... zcrai-backend"
    ```

## 4. Emergency Restoration

### Disabling Components
If a new dependency causes a crash loop (502 Gateway), temporarily comment out the initialization (e.g., `scheduler.init()`) and `rsync` the specific file to restore core API availability.
