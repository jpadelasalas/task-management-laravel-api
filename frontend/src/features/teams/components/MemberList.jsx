const ROLE_STYLES = {
  lead: 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300',
  member: 'bg-surface-inset text-muted',
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function MemberList({ members, canManage, onRemove, removing }) {
  if (members.length === 0) {
    return <p className="text-sm text-muted">No members yet.</p>
  }

  return (
    <div className="space-y-2">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2.5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-inset text-xs font-semibold text-muted">
              {initials(member.name)}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{member.name}</p>
              <p className="text-xs text-subtle">{member.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_STYLES[member.role]}`}
            >
              {member.role === 'lead' ? 'Lead' : 'Member'}
            </span>

            {canManage && (
              <button
                type="button"
                disabled={removing}
                onClick={() => onRemove(member.id)}
                className="text-xs font-medium text-danger-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
