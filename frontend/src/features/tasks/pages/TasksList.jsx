import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useMyTeams } from '../../teams/hooks/useMyTeams'
import { useTeamMembers } from '../../teams/hooks/useTeamMembers'
import { useTasks } from '../hooks/useTasks'
import { useCreateTask } from '../hooks/useCreateTask'
import { TaskFilters } from '../components/TaskFilters'
import { TaskCard } from '../components/TaskCard'
import { TaskForm } from '../components/TaskForm'
import { Pagination } from '../../../shared/components/Pagination'

export default function TasksList() {
  const { user } = useAuth()
  const { teams, loading: teamsLoading } = useMyTeams()
  const [teamId, setTeamId] = useState(null)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!teamId && teams.length > 0) {
      setTeamId(teams[0].id)
    }
  }, [teams, teamId])

  const { members } = useTeamMembers(teamId)
  const { tasks, meta, loading, filters, updateFilters, setPage } = useTasks(teamId)
  const { createTask, creating: submitting } = useCreateTask(teamId)

  const canCreate = user.role === 'admin' || user.role === 'manager'

  const handleCreate = async (payload) => {
    try {
      await createTask(payload)
      setCreating(false)
    } catch {
      // error toast already shown by the mutation's onError
    }
  }

  if (teamsLoading) {
    return <p className="text-sm text-muted">Loading…</p>
  }

  if (teams.length === 0) {
    return <p className="text-sm text-muted">You're not part of any team yet.</p>
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Tasks</h1>
        {canCreate && (
          <button
            type="button"
            onClick={() => setCreating((current) => !current)}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            {creating ? 'Cancel' : 'New Task'}
          </button>
        )}
      </div>

      {creating && (
        <div className="mb-6 rounded-2xl border border-line bg-surface p-6">
          <TaskForm
            initialValues={{ priority: 'medium' }}
            members={members}
            onSubmit={handleCreate}
            submitting={submitting}
            submitLabel="Create Task"
          />
        </div>
      )}

      <div className="mb-4">
        <TaskFilters
          teams={teams}
          teamId={teamId}
          onTeamChange={setTeamId}
          filters={filters}
          onFilterChange={updateFilters}
          members={members}
          showAssigneeFilter={user.role !== 'team_member'}
        />
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="text-sm text-muted">No tasks match these filters.</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      <Pagination meta={meta} onPageChange={setPage} />
    </div>
  )
}
