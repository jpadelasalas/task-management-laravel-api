export function StatTile({ label, value, accent = 'default' }) {
  const accentClass =
    {
      default: 'text-foreground',
      brand: 'text-brand-600 dark:text-brand-400',
      success: 'text-success-600 dark:text-success-500',
      warning: 'text-warning-600 dark:text-warning-500',
      danger: 'text-danger-600 dark:text-danger-500',
    }[accent] ?? 'text-foreground'

  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${accentClass}`}>{value}</p>
    </div>
  )
}
