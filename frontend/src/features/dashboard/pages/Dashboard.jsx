import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useDashboardData } from '../hooks/useDashboardData'
import { StatTile } from '../../../shared/components/StatTile'
import { StatusBadge, PriorityBadge } from '../../tasks/components/StatusBadge'

export default function Dashboard() {
  const { user } = useAuth()
  const { teams, teamId, setTeamId, summary, loading } = useDashboardData()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Welcome, {user.name}</h1>
          <p className="mt-1 text-sm text-muted">Role: {user.role}</p>
        </div>

        {teams.length > 1 && (
          <select
            value={teamId ?? ''}
            onChange={(event) => setTeamId(Number(event.target.value))}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {teams.length === 0 ? (
        <p className="text-sm text-muted">You're not part of any team yet.</p>
      ) : loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
            <StatTile label="Total Tasks" value={summary.total} />
            <StatTile label="Pending" value={summary.byStatus.pending} />
            <StatTile label="In Progress" value={summary.byStatus.in_progress} accent="brand" />
            <StatTile label="Completed" value={summary.byStatus.completed} accent="success" />
            <StatTile label="Cancelled" value={summary.byStatus.cancelled} accent="danger" />
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="mb-3 text-sm font-medium text-foreground">
              Due in the next 7 days ({summary.upcoming.length})
            </h2>

            {summary.upcoming.length === 0 ? (
              <p className="text-sm text-muted">Nothing due soon.</p>
            ) : (
              <div className="space-y-2">
                {summary.upcoming.map((task) => (
                  <Link
                    key={task.id}
                    to={`/tasks/${task.id}`}
                    className="flex items-center justify-between gap-4 rounded-lg border border-line px-3 py-2.5 transition-colors hover:border-line-strong"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{task.title}</p>
                      <p className="text-xs text-subtle">
                        {task.assignee?.name ?? 'Unassigned'} · due{' '}
                        {new Date(task.due_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <PriorityBadge priority={task.priority} />
                      <StatusBadge status={task.status} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
