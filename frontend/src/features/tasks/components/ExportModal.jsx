import { useState } from 'react'
import { STATUS_LABELS, TASK_STATUSES } from '../constants'
import { useExportTasks } from '../hooks/useExportTasks'

const FORMATS = [
  { value: 'csv', label: 'CSV' },
  { value: 'json', label: 'JSON' },
  { value: 'xlsx', label: 'Excel' },
]

export function ExportModal({ teamId, onClose }) {
  const [format, setFormat] = useState('csv')
  const [status, setStatus] = useState('')
  const { exportTasks, exporting } = useExportTasks()

  const handleExport = async () => {
    await exportTasks({ teamId, format, filters: status ? { status } : {} })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-6">
        <h2 className="mb-4 text-base font-semibold text-foreground">Export Tasks</h2>

        <label className="mb-1 block text-xs font-medium text-muted">Format</label>
        <div className="mb-4 flex gap-2">
          {FORMATS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormat(option.value)}
              className={`flex-1 rounded-lg border px-3 py-1.5 text-sm ${
                format === option.value
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300'
                  : 'border-line text-muted'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="mb-1 block text-xs font-medium text-muted">Status filter</label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="mb-6 w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="">All statuses</option>
          {TASK_STATUSES.map((value) => (
            <option key={value} value={value}>
              {STATUS_LABELS[value]}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm text-muted hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {exporting ? 'Exporting…' : 'Export'}
          </button>
        </div>
      </div>
    </div>
  )
}
