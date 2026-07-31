import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useTeamMembers } from '../../teams/hooks/useTeamMembers'
import { useTask } from '../hooks/useTask'
import { TaskForm } from '../components/TaskForm'
import { StatusTransitionControl } from '../components/StatusTransitionControl'
import { PriorityBadge, StatusBadge } from '../components/StatusBadge'

export default function TaskDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { task, loading, error, saving, update, changeStatus, remove } = useTask(id)
  const { members } = useTeamMembers(task?.team_id)

  if (loading) {
    return <p className="text-sm text-muted">Loading…</p>
  }

  if (error || !task) {
    return (
      <p className="text-sm text-muted">
        {error?.response?.status === 403
          ? "You don't have access to this task."
          : 'Task not found.'}
      </p>
    )
  }

  const canEditFull = user.role === 'admin' || user.role === 'manager'
  const canDelete = user.role === 'admin' || task.created_by === user.id

  const handleDelete = async () => {
    if (!window.confirm('Delete this task? This cannot be undone.')) {
      return
    }

    try {
      await remove()
      navigate('/tasks')
    } catch {
      // error toast already shown by the mutation's onError
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">{task.title}</h1>
          <div className="mt-2 flex gap-2">
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={task.status} />
          </div>
        </div>

        {canDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-danger-600 transition-colors hover:border-danger-600"
          >
            Delete
          </button>
        )}
      </div>

      <div className="mb-6 rounded-2xl border border-line bg-surface p-6">
        <h2 className="mb-3 text-sm font-medium text-foreground">Status</h2>
        <StatusTransitionControl status={task.status} onChange={changeStatus} disabled={saving} />
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <TaskForm
          initialValues={task}
          members={members}
          onSubmit={update}
          submitting={saving}
          canEditFull={canEditFull}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  )
}
