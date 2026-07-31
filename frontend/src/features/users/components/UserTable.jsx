import { Link } from 'react-router-dom'

const ROLE_LABELS = { admin: 'Admin', manager: 'Manager', team_member: 'Team Member' }
const ROLE_STYLES = {
  admin: 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300',
  manager: 'bg-info-50 text-info-700 dark:bg-info-500/10 dark:text-info-500',
  team_member: 'bg-surface-inset text-muted',
}

export function UserTable({ users, onToggleStatus, togglingId }) {
  if (users.length === 0) {
    return <p className="text-sm text-muted">No users found.</p>
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-inset text-xs font-medium text-muted">
          <tr>
            <th className="px-4 py-2.5">Name</th>
            <th className="px-4 py-2.5">Role</th>
            <th className="px-4 py-2.5">Status</th>
            <th className="px-4 py-2.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-surface">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-3">
                <Link to={`/users/${user.id}`} className="font-medium text-foreground hover:underline">
                  {user.name}
                </Link>
                <p className="text-xs text-subtle">{user.email}</p>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_STYLES[user.role]}`}
                >
                  {ROLE_LABELS[user.role]}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.is_active
                      ? 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-500'
                      : 'bg-danger-50 text-danger-700 dark:bg-danger-500/10 dark:text-danger-500'
                  }`}
                >
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  disabled={togglingId === user.id}
                  onClick={() => onToggleStatus(user)}
                  className="text-xs font-medium text-brand-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {user.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
