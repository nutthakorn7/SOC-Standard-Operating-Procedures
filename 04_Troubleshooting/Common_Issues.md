# Troubleshooting: Common Issues

**Source**: zcrAI Platform Operations & Industrialization Master

## 1. Infrastructure & Docker

### Corrupted Metadata (500/EOF Errors)
If Docker returns `input/output error`:
1.  Kill Docker: `pkill -9 -f Docker`
2.  Remove lock file: `rm -rf ~/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw.lock`
3.  Restart Docker.

### Port Conflicts
**Symptom**: `address already in use` (Port 8000)
**Fix**:
1.  Identify process: `lsof -i :8000`
2.  Kill process: `kill -9 <PID>`
3.  Check for zombies: `ssh zcrAI "fuser -k 8000/tcp"`

### Nginx SSL Failures
**Symptom**: `BIO_new_file() failed`
**Cause**: Mismatch between host path and container mount for certificates.
**Fix**: Ensure `nginx.conf` points to the correct host-mounted path `/etc/letsencrypt/live/...`.

## 2. Backend Issues

### Connection Timeouts & High CPU
**Symptom**: `zcrai_backend` at 100% CPU, `CONNECT_TIMEOUT` logs.
**Cause**:
-   Redis/Postgres unreachability causing retry loops.
-   Password mismatch in `.env`.
**Fix**:
-   Verify `REDIS_PASSWORD` and `DATABASE_URL`.
-   Ensure backend container is on the same network as databases (`zcrai_default`).

### "Module not found" / Binary Mismatch
**Cause**: Syncing `node_modules` from macOS to Linux.
**Fix**:
1.  Delete `node_modules` on server.
2.  Run `npm install` or `bun install` on the target environment.

## 3. Frontend Issues

### Missing JS Bundle (404)
**Symptom**: Blank page after hotfix.
**Cause**: `index.html` updated but new JS hash file missing.
**Fix**:
1.  Verify file exists on host `dist/`.
2.  Re-run `docker cp` to container.
3.  Clear browser cache.

### Hardcoded API URLs
**Symptom**: Integrations fail on production but work locally.
**Cause**: `localhost:8000` baked into the bundle.
**Fix**:
-   Add `.env` to `.dockerignore`.
-   Rebuild with `--no-cache`.
