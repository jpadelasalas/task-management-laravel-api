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
5 Feature test suites, 11 tests: login, task status transitions, task
delete authorization, team-scoped task access, user-creation role
restriction.

## Notes

- `NODE_SERVICE_URL` in `.env` is a placeholder seam for a future,
  separate Node.js microservice (notifications/analytics/export/cron)
  — not implemented in this repo.
- JWT chosen over Sanctum specifically so that seam can verify tokens
  by signature without sharing this app's DB.
