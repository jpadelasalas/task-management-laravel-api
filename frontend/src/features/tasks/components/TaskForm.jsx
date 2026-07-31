import { useState } from 'react'
import { PRIORITY_LABELS, TASK_PRIORITIES } from '../constants'

const fieldClass =
  'w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-60'
const labelClass = 'mb-1.5 block text-sm font-medium text-foreground'

export function TaskForm({
  initialValues,
  members,
  onSubmit,
  submitting,
  canEditFull = true,
  submitLabel = 'Save',
}) {
  const [values, setValues] = useState({
    title: initialValues?.title ?? '',
    description: initialValues?.description ?? '',
    priority: initialValues?.priority ?? 'medium',
    due_date: initialValues?.due_date ? initialValues.due_date.slice(0, 10) : '',
    assigned_to: initialValues?.assigned_to ?? '',
  })

  const set = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = canEditFull
      ? { ...values, due_date: values.due_date || null, assigned_to: Number(values.assigned_to) }
      : { description: values.description }

    Promise.resolve(onSubmit(payload)).catch(() => {})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Title</label>
        <input
          required
          disabled={!canEditFull}
          value={values.title}
          onChange={(event) => set('title', event.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          rows={4}
          value={values.description}
          onChange={(event) => set('description', event.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Priority</label>
          <select
            disabled={!canEditFull}
            value={values.priority}
            onChange={(event) => set('priority', event.target.value)}
            className={fieldClass}
          >
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Due date</label>
          <input
            type="date"
            disabled={!canEditFull}
            value={values.due_date}
            onChange={(event) => set('due_date', event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Assignee</label>
        <select
          required
          disabled={!canEditFull}
          value={values.assigned_to}
          onChange={(event) => set('assigned_to', event.target.value)}
          className={fieldClass}
        >
          <option value="" disabled>
            Select a team member
          </option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}
