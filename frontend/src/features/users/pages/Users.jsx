import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { useCreateUser } from '../hooks/useCreateUser'
import { useToggleUserStatus } from '../hooks/useToggleUserStatus'
import { UserTable } from '../components/UserTable'
import { UserForm } from '../components/UserForm'
import { Pagination } from '../../../shared/components/Pagination'

const selectClass =
  'rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'

export default function Users() {
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')
  const [showForm, setShowForm] = useState(false)

  const filters = {}
  if (role) filters.role = role
  if (status) filters.is_active = status === 'active'

  const { users, meta, loading, page, setPage } = useUsers(filters)
  const { createUser, creating } = useCreateUser()
  const { toggleStatus, togglingId } = useToggleUserStatus()

  const handleCreate = async (payload) => {
    try {
      await createUser(payload)
      setShowForm(false)
    } catch {
      // error toast already shown by the mutation's onError
    }
  }

  const handleToggle = (user) => {
    toggleStatus({ userId: user.id, isActive: !user.is_active })
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Users</h1>
        <button
          type="button"
          onClick={() => setShowForm((current) => !current)}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          {showForm ? 'Cancel' : 'New User'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-2xl border border-line bg-surface p-6">
          <UserForm isCreate onSubmit={handleCreate} submitting={creating} submitLabel="Create User" />
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <select value={role} onChange={(event) => setRole(event.target.value)} className={selectClass}>
          <option value="">All roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="team_member">Team Member</option>
        </select>

        <select value={status} onChange={(event) => setStatus(event.target.value)} className={selectClass}>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading users…</p>
      ) : (
        <UserTable users={users} onToggleStatus={handleToggle} togglingId={togglingId} />
      )}

      <Pagination meta={meta} onPageChange={setPage} />
    </div>
  )
}
