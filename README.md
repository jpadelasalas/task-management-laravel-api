# Task Management & Analytics Platform

Laravel 11 API + Node.js/Express microservice + React (Vite/Tailwind)
SPA. Built as a CF Outsourcing skills-test submission.

- [`backend/`](backend/README.md) — Laravel API, JWT auth, layered
  Request → Controller → Service → Repository architecture
- [task-management-node-services](https://github.com/jpadelasalas/task-management-node-services) —
  separate repo, notifications/analytics/export/cron. No DB of its
  own; talks to the Laravel API over HTTP.
- [`frontend/`](frontend/README.md) — React SPA, feature-based
  folders, TanStack Query + axios, consumes both APIs

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
2. Node service (clone
   [task-management-node-services](https://github.com/jpadelasalas/task-management-node-services)
   as a sibling folder — see its README):
   ```bash
   npm install
   cp .env.example .env
   # JWT_SECRET must match the backend's exactly
   npm start
   ```
3. Frontend (see [frontend/README.md](frontend/README.md)):
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```
4. Open the frontend dev server URL Vite prints, log in with a seeded account.

## Test credentials

| Email | Password | Role |
|---|---|---|
| admin@test.com | password123 | admin |
| manager@test.com | password123 | manager |
| member@test.com | password123 | team_member |

## Tests

```bash
cd backend && php artisan test
```

5 Feature test suites (13 tests) covering auth, task status
transitions, task delete/archive authorization, team-scoped task
access, and role-restricted user creation — run against in-memory
SQLite, not the dev DB.

## Deployment

| Service | Platform | Live URL |
|---|---|---|
| Laravel API | Render (Docker) | _not yet deployed_ |
| Node services | Render (native Node) | _not yet deployed_ |
| Database | Render (free Postgres, auto-expires in 30 days) | — |
| Frontend | _TBD_ | _not yet deployed_ |

See each repo's README for exact deployment steps.
