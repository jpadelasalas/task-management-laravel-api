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

Create `.env` in `frontend/`:

```
VITE_API_URL=<backend-url>/api
```

(Point this at wherever the [backend](../backend/README.md) is
running.)

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
    analytics/    client-derived stats stub (see note below)
    settings/     read-only profile view
```

Each feature: `api.js` (axios calls) + `hooks/` (TanStack Query
hooks) + `components/` (presentational) + thin `pages/` (composition
only). Cross-feature reuse only goes through `shared/`.

## Notes

- Analytics page shows counts derived from already-fetched task data.
  Full analytics (date-range filtering, cross-team rollups, caching)
  are scoped to a separate Node.js microservice — not built in this
  repo.
- No Redux/global store beyond auth context — avoided for a CRUD-heavy
  app where TanStack Query already owns server-state caching.

## Build

```bash
npm run build
```
