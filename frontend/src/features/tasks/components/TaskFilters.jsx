import { PRIORITY_LABELS, STATUS_LABELS, TASK_PRIORITIES, TASK_STATUSES } from '../constants'

const selectClass =
  'rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'

export function TaskFilters({
  teams,
  teamId,
  onTeamChange,
  filters,
  onFilterChange,
  members,
  showAssigneeFilter = true,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={teamId ?? ''}
        onChange={(event) => onTeamChange(Number(event.target.value))}
        className={selectClass}
      >
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(event) => onFilterChange({ status: event.target.value })}
        className={selectClass}
      >
        <option value="">All statuses</option>
        {TASK_STATUSES.map((status) => (
          <option key={status} value={status}>
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>

      <select
        value={filters.priority}
        onChange={(event) => onFilterChange({ priority: event.target.value })}
        className={selectClass}
      >
        <option value="">All priorities</option>
        {TASK_PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {PRIORITY_LABELS[priority]}
          </option>
        ))}
      </select>

      {showAssigneeFilter && (
        <select
          value={filters.assigned_to}
          onChange={(event) => onFilterChange({ assigned_to: event.target.value })}
          className={selectClass}
        >
          <option value="">Everyone</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
