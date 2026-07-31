import { PRIORITY_LABELS, STATUS_LABELS } from '../constants'

const STATUS_STYLES = {
  pending: 'bg-surface-inset text-muted',
  in_progress: 'bg-info-50 text-info-700 dark:bg-info-500/10 dark:text-info-500',
  completed: 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-500',
  cancelled: 'bg-danger-50 text-danger-700 dark:bg-danger-500/10 dark:text-danger-500',
}

const PRIORITY_STYLES = {
  low: 'bg-surface-inset text-muted',
  medium: 'bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-500',
  high: 'bg-danger-50 text-danger-700 dark:bg-danger-500/10 dark:text-danger-500',
}

function Badge({ className, children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  return <Badge className={STATUS_STYLES[status]}>{STATUS_LABELS[status] ?? status}</Badge>
}

export function PriorityBadge({ priority }) {
  return <Badge className={PRIORITY_STYLES[priority]}>{PRIORITY_LABELS[priority] ?? priority}</Badge>
}
