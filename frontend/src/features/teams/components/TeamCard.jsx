import { Link } from 'react-router-dom'
import { Icon } from '../../../shared/components/Icon'

export function TeamCard({ team }) {
  return (
    <Link
      to={`/teams/${team.id}`}
      className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-line-strong"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
          <Icon name="teams" className="h-4.5 w-4.5" />
        </div>
        <p className="text-sm font-medium text-foreground">{team.name}</p>
      </div>

      {team.members && (
        <p className="text-xs text-subtle">
          {team.members.length} member{team.members.length === 1 ? '' : 's'}
        </p>
      )}
    </Link>
  )
}
