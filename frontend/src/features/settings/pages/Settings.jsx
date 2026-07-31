import { useAuth } from '../../auth/hooks/useAuth'

const ROLE_LABELS = { admin: 'Admin', manager: 'Manager', team_member: 'Team Member' }

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Settings() {
  const { user } = useAuth()

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-xl font-semibold text-foreground">Settings</h1>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-lg font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
            {initials(user.name)}
          </div>
          <div>
            <p className="text-base font-medium text-foreground">{user.name}</p>
            <p className="text-sm text-subtle">{ROLE_LABELS[user.role] ?? user.role}</p>
          </div>
        </div>

        <dl className="space-y-4 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Email</dt>
            <dd className="text-foreground">{user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Role</dt>
            <dd className="text-foreground">{ROLE_LABELS[user.role] ?? user.role}</dd>
          </div>
          {user.teams?.length > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted">Teams</dt>
              <dd className="text-right text-foreground">
                {user.teams.map((team) => team.name).join(', ')}
              </dd>
            </div>
          )}
        </dl>

        <p className="mt-6 border-t border-line pt-4 text-xs text-subtle">
          Profile editing is managed by an admin. Contact one to change your name or email.
        </p>
      </div>
    </div>
  )
}
