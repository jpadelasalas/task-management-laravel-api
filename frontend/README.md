# Task Management Frontend (React + Vite)

SPA for the Task Management & Analytics Platform. Feature-based
folders, TanStack Query + axios for data fetching, Context API for
auth only.

## Requirements

- Node 18+

## Setup

```bash
npm install
```

```bash
cp .env.example .env
```

- `VITE_API_URL` — the [Laravel API](../backend/README.md)
- `VITE_NODE_API_URL` — the
  [Node service](https://github.com/jpadelasalas/task-management-node-services)
  (analytics, export)

```bash
npm run dev
```

App at the URL Vite prints (default `http://localhost:5173`). Backend API must be running first —
see `backend/README.md`.

## Test credentials

Same seeded accounts as the backend: `admin@test.com`,
`manager@test.com`, `member@test.com`, password `password123` for
all. Nav and available actions change by role — see
`src/app/AppLayout.jsx` for the role gates.

## Structure

```
src/
  app/            router, layout (role-filtered nav), query client
  shared/         axios instance, generic components/hooks reused
                  across features
  features/
    auth/         AuthContext, useAuth, ProtectedRoute, Login page
    tasks/        task list/detail, status transitions
    teams/        team + member management
    users/        admin-only user management
    dashboard/    role-aware summary view
    analytics/    calls the Node service's analytics endpoints
    settings/     read-only profile view
```

Each feature: `api.js` (axios calls) + `hooks/` (TanStack Query
hooks) + `components/` (presentational) + thin `pages/` (composition
only). Cross-feature reuse only goes through `shared/`.

## Notes

- Analytics and task export both call the Node service directly
  (`shared/api/nodeApiClient.js`), separate from the Laravel axios
  client — same bearer token, different base URL.
- No Redux/global store beyond auth context — avoided for a CRUD-heavy
  app where TanStack Query already owns server-state caching.

## Build

```bash
npm run build
```

## Deployment

**Live URL:** _not yet deployed_

Deployed on [Render](https://render.com) as a free **Static Site**
(no server process — just the built `dist/` folder on a CDN, so it
never sleeps or expires like the web services do).

1. Push this repo to GitHub.
2. Render → New → Static Site → connect the repo, set:
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
3. Environment variables:
   - `VITE_API_URL` — the deployed Laravel API's URL + `/api`
   - `VITE_NODE_API_URL` — the deployed Node service's URL + `/api`
4. Deploy. No CORS setup needed on the Laravel side — it ships with
   `allowed_origins: ['*']` by default, which is fine here since this
   is a Bearer-token API with no cookies (no CSRF surface `*` would
   expose).
