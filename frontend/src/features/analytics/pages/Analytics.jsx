import { useAnalyticsData } from '../hooks/useAnalyticsData'
import { StatTile } from '../../../shared/components/StatTile'

export default function Analytics() {
  const { teams, teamId, setTeamId, productivity, summary, loading } = useAnalyticsData()

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

      <div className="mb-4 rounded-lg border border-line-strong bg-surface-inset px-4 py-3 text-sm text-muted">
        Showing counts derived from currently loaded task data. Full analytics (date-range
        filtering, cross-team rollups, caching) are handled by a separate Node.js service, not
        built in this repo.
      </div>

      {teams.length === 0 ? (
        <p className="text-sm text-muted">You're not part of any team yet.</p>
      ) : loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-3 gap-4">
            <StatTile label="Total Tasks" value={summary.total} />
            <StatTile label="Completed" value={summary.completed} accent="success" />
            <StatTile label="Pending" value={summary.pending} accent="warning" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-line">
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
                    <td className="px-4 py-3 text-muted">{row.completionRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
