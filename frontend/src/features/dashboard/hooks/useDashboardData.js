import { useEffect, useMemo, useState } from 'react'
import { useMyTeams } from '../../teams/hooks/useMyTeams'
import { useTaskSummary } from '../../tasks/hooks/useTaskSummary'

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export function useDashboardData() {
  const { teams, loading: teamsLoading } = useMyTeams()
  const [teamId, setTeamId] = useState(null)

  useEffect(() => {
    if (!teamId && teams.length > 0) {
      setTeamId(teams[0].id)
    }
  }, [teams, teamId])

  const { tasks, loading: tasksLoading } = useTaskSummary(teamId)

  const summary = useMemo(() => {
    const byStatus = { pending: 0, in_progress: 0, completed: 0, cancelled: 0 }
    const now = Date.now()

    const upcoming = []

    for (const task of tasks) {
      byStatus[task.status] = (byStatus[task.status] ?? 0) + 1

      if (
        task.due_date &&
        task.status !== 'completed' &&
        task.status !== 'cancelled' &&
        new Date(task.due_date).getTime() - now <= SEVEN_DAYS_MS &&
        new Date(task.due_date).getTime() >= now
      ) {
        upcoming.push(task)
      }
    }

    upcoming.sort((a, b) => new Date(a.due_date) - new Date(b.due_date))

    return { total: tasks.length, byStatus, upcoming }
  }, [tasks])

  return {
    teams,
    teamId,
    setTeamId,
    summary,
    loading: teamsLoading || tasksLoading,
  }
}
