import { useParams } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { UserForm } from '../components/UserForm'

export default function UserDetail() {
  const { id } = useParams()
  const { user, loading, error, saving, update, toggleStatus } = useUser(id)

  if (loading) {
    return <p className="text-sm text-muted">Loading…</p>
  }

  if (error || !user) {
    return <p className="text-sm text-muted">User not found.</p>
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">{user.name}</h1>
        <button
          type="button"
          disabled={saving}
          onClick={() => toggleStatus(!user.is_active)}
          className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {user.is_active ? 'Deactivate' : 'Activate'}
        </button>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <UserForm initialValues={user} onSubmit={update} submitting={saving} submitLabel="Save Changes" />
      </div>
    </div>
  )
}
