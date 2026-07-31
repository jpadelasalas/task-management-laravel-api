import { Link } from 'react-router-dom'
import { PriorityBadge, StatusBadge } from './StatusBadge'

export function TaskCard({ task }) {
  return (
    <Link
      to={`/tasks/${task.id}`}
      className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-line-strong"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{task.title}</p>
        <p className="mt-0.5 text-xs text-subtle">
          {task.assignee?.name ?? 'Unassigned'}
          {task.due_date && ` · due ${new Date(task.due_date).toLocaleDateString()}`}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <PriorityBadge priority={task.priority} />
        <StatusBadge status={task.status} />
      </div>
    </Link>
  )
}
