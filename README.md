# Task Management & Analytics Platform

Laravel 11 API + React (Vite/Tailwind) SPA. Built as a CF Outsourcing
skills-test submission.

- [`backend/`](backend/README.md) — Laravel API, JWT auth, layered
  Request → Controller → Service → Repository architecture
- [`frontend/`](frontend/README.md) — React SPA, feature-based
  folders, TanStack Query + axios

## Quick start

1. Backend (see [backend/README.md](backend/README.md)):
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan jwt:secret
   # set DB_* in .env for your MySQL instance
   php artisan migrate --seed
   php artisan serve --port=8000
   ```
2. Frontend (see [frontend/README.md](frontend/README.md)):
   ```bash
   cd frontend
   npm install
   echo VITE_API_URL=<backend-url>/api > .env
   npm run dev
   ```
3. Open the frontend dev server URL Vite prints, log in with a seeded account.

## Test credentials

| Email | Password | Role |
|---|---|---|
| admin@test.com | password123 | admin |
| manager@test.com | password123 | manager |
| member@test.com | password123 | team_member |

## Scope note

The original spec describes a third service — a Node.js microservice
for notifications/analytics/export/cron. That's intentionally out of
scope for this repo (separate repo, built on request later). Where
the Laravel API would call it (task-assignment/status-change
notifications), a swappable `NotificationService` interface exists in
`backend/app/Services/Notifications/` with a `Log`-based
implementation standing in for now.

## Tests

```bash
cd backend && php artisan test
```

5 Feature test suites (11 tests) covering auth, task status
transitions, task delete authorization, team-scoped task access, and
role-restricted user creation — run against in-memory SQLite, not the
dev DB.

## Deployment

Not deployed yet.
