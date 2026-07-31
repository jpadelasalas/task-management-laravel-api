# Task Management API (Laravel 11)

JSON API for the Task Management & Analytics Platform. Layered
`Request → Controller → Service → Repository → Model`, JWT auth
(`tymon/jwt-auth`), MySQL.

## Requirements

- PHP 8.2+, Composer
- MySQL
- `pdo_sqlite` extension (tests run against in-memory SQLite)

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
```

Edit `.env` — set `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` for your
MySQL instance (`DB_DATABASE=task_management` by default).

```bash
php artisan migrate --seed
php artisan serve --port=8000
```

API now at `<backend-url>/api` (default `http://127.0.0.1:8000/api` for local `artisan serve`).

## Test credentials (seeded)

| Email | Password | Role |
|---|---|---|
| admin@test.com | password123 | admin |
| manager@test.com | password123 | manager (lead on Engineering + Marketing) |
| member@test.com | password123 | team_member (Engineering) |

Seeder also creates extra team_member/manager accounts to fill out
Engineering, Marketing, Sales team rosters, and a sample task per
status/priority combination — see `database/seeders/`.

## Architecture

- `app/Repositories/` — one Eloquent repo per aggregate (Task, Team,
  User, TeamMember), interfaces bound in `RepositoryServiceProvider`.
  Only place raw Eloquent queries live.
- `app/Services/` — business rules and transactions (status
  transition legality, manager-can-only-create-team_member rule,
  team-lead invariant on team creation). Controllers never touch
  Eloquent or `DB::transaction()` directly.
- `app/Policies/` — authorization only (can this user act on this
  resource), checked via `$this->authorize()` before the service runs.
- `app/Enums/` — `UserRole`, `TeamMemberRole`, `TaskStatus` (with
  `canTransitionTo()`), `TaskPriority`.
- Team-lead authority always comes from a `team_members` row with
  `role=lead`, never `teams.created_by` (that column is audit-only).

## Testing

```bash
php artisan test
```

Runs against in-memory SQLite (`phpunit.xml`), not your dev MySQL DB.
5 Feature test suites, 13 tests: login, task status transitions, task
delete/archive authorization, team-scoped task access, user-creation
role restriction.

## Deployment

**Live URL:** _not yet deployed_

Deployed entirely on [Render](https://render.com): the API as a
Docker web service (free tier), the DB as Render's free managed
Postgres.

**Note:** Render's free Postgres auto-deletes after 30 days —
recreate it (and re-run migrate/seed below) if this has gone stale.

1. Push this repo to GitHub.
2. Render → New → PostgreSQL → free tier. Copy its internal connection
   details (host, port, database, username, password) from the
   dashboard once it's provisioned.
3. Render → New → Web Service → connect the repo → it detects
   `Dockerfile` automatically. Set environment variables:
   - `APP_KEY` — generate locally with `php artisan key:generate --show`
   - `APP_ENV=production`, `APP_DEBUG=false`
   - `JWT_SECRET` — generate locally with `php artisan jwt:secret --show`
     (must match the Node service's `JWT_SECRET` exactly)
   - `DB_CONNECTION=pgsql`, `DB_HOST`, `DB_PORT=5432`, `DB_DATABASE`,
     `DB_USERNAME`, `DB_PASSWORD` from step 2
   - `NODE_SERVICE_URL` — the deployed Node service's URL
4. Deploy. The container runs `migrate --force` then `db:seed --force`
   on every boot. Seeding only succeeds the first time (`UserSeeder`'s
   unique email constraint makes reruns fail harmlessly)

## Notes

- `NODE_SERVICE_URL` in `.env` points at the sibling
  [task-management-node-services](https://github.com/jpadelasalas/task-management-node-services)
  repo (notifications/analytics/export/cron — separate repo, separate
  process). `TaskObserver` and `TaskService::updateStatus()` call
  `NotificationService::taskAssigned()`/`taskStatusChanged()`, bound to
  `HttpNotificationService` (posts to Node) outside the `testing`
  environment, and to a `LogNotificationService` stub during tests and
  whenever `NODE_SERVICE_URL` is unset — see `AppServiceProvider`.
- JWT chosen over Sanctum specifically so that Node can verify tokens
  by signature (shared `JWT_SECRET`) without sharing this app's DB.
