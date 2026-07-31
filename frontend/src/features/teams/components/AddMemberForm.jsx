import { useState } from 'react'
import { useUsers } from '../../users/hooks/useUsers'

const fieldClass =
  'rounded-lg border border-line bg-background px-3.5 py-2 text-sm text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'

export function AddMemberForm({ existingMemberIds, onAdd, saving }) {
  const { users, loading } = useUsers()
  const [userId, setUserId] = useState('')
  const [role, setRole] = useState('member')

  const availableUsers = users.filter((user) => !existingMemberIds.includes(user.id))

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!userId) return

    await onAdd({ user_id: Number(userId), role })
    setUserId('')
    setRole('member')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      <select
        required
        disabled={loading}
        value={userId}
        onChange={(event) => setUserId(event.target.value)}
        className={fieldClass}
      >
        <option value="" disabled>
          Select a user
        </option>
        {availableUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <select value={role} onChange={(event) => setRole(event.target.value)} className={fieldClass}>
        <option value="member">Member</option>
        <option value="lead">Lead</option>
      </select>

      <button
        type="submit"
        disabled={saving || !userId}
        className="rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Add Member
      </button>
    </form>
  )
}
