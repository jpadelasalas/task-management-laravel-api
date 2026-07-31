import { useAnalyticsData } from '../hooks/useAnalyticsData'
import { StatTile } from '../../../shared/components/StatTile'

export default function Analytics() {
  const { teams, teamId, setTeamId, productivity, summary, upcomingDeadlines, loading, error } =
    useAnalyticsData()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Analytics</h1>

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
      ) : error ? (
        <p className="text-sm text-danger-600">
          {error.response?.data?.message || "Couldn't load analytics for this team."}
        </p>
      ) : loading || !summary ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatTile label="Total Tasks" value={summary.total_tasks} />
            <StatTile label="Completed" value={summary.completed_tasks} accent="success" />
            <StatTile label="Pending" value={summary.pending_tasks} accent="warning" />
            <StatTile
              label="Avg. Completion Time"
              value={summary.avg_completion_time != null ? `${summary.avg_completion_time}h` : '—'}
            />
          </div>

          <div className="mb-8 overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-inset text-xs font-medium text-muted">
                <tr>
                  <th className="px-4 py-2.5">Member</th>
                  <th className="px-4 py-2.5">Tasks</th>
                  <th className="px-4 py-2.5">Completed</th>
                  <th className="px-4 py-2.5">Completion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-surface">
                {productivity.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                    <td className="px-4 py-3 text-muted">{row.total}</td>
                    <td className="px-4 py-3 text-muted">{row.completed}</td>
                    <td className="px-4 py-3 text-muted">{row.completion_rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="mb-3 text-sm font-medium text-foreground">
              Upcoming Deadlines (next 7 days)
            </h2>

            {upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-muted">Nothing due soon.</p>
            ) : (
              <div className="space-y-3">
                {upcomingDeadlines.map((group) => (
                  <div key={group.assigned_to}>
                    <p className="text-sm font-medium text-foreground">{group.memberName}</p>
                    <ul className="mt-1 space-y-1">
                      {group.tasks.map((task) => (
                        <li key={task.id} className="text-sm text-muted">
                          {task.title} — due {new Date(task.due_date).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
