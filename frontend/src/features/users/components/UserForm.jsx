import { useState } from 'react'

const fieldClass =
  'w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'
const labelClass = 'mb-1.5 block text-sm font-medium text-foreground'

export function UserForm({ initialValues, isCreate = false, onSubmit, submitting, submitLabel = 'Save' }) {
  const [values, setValues] = useState({
    name: initialValues?.name ?? '',
    email: initialValues?.email ?? '',
    password: '',
    role: initialValues?.role ?? 'team_member',
  })

  const set = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = isCreate
      ? values
      : { name: values.name, email: values.email, role: values.role }

    Promise.resolve(onSubmit(payload)).catch(() => {})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Name</label>
        <input
          required
          value={values.name}
          onChange={(event) => set('name', event.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input
          type="email"
          required
          value={values.email}
          onChange={(event) => set('email', event.target.value)}
          className={fieldClass}
        />
      </div>

      {isCreate && (
        <div>
          <label className={labelClass}>Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={values.password}
            onChange={(event) => set('password', event.target.value)}
            className={fieldClass}
          />
        </div>
      )}

      <div>
        <label className={labelClass}>Role</label>
        <select
          value={values.role}
          onChange={(event) => set('role', event.target.value)}
          className={fieldClass}
        >
          <option value="team_member">Team Member</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
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
