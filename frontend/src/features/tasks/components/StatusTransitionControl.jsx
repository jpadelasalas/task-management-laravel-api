import { STATUS_LABELS, legalNextStatuses } from '../constants'

export function StatusTransitionControl({ status, onChange, disabled }) {
  const nextStatuses = legalNextStatuses(status)

  if (nextStatuses.length === 0) {
    return <p className="text-sm text-subtle">This task is in a final state.</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {nextStatuses.map((next) => (
        <button
          key={next}
          type="button"
          disabled={disabled}
          onClick={() => onChange(next)}
          className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Mark as {STATUS_LABELS[next]}
        </button>
      ))}
    </div>
  )
}
