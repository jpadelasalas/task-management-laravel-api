import { useEffect, useMemo, useState } from 'react'
import { useMyTeams } from '../../teams/hooks/useMyTeams'
import { useTeamMembers } from '../../teams/hooks/useTeamMembers'
import { useTaskSummary } from '../../tasks/hooks/useTaskSummary'

export function useAnalyticsData() {
  const { teams, loading: teamsLoading } = useMyTeams()
  const [teamId, setTeamId] = useState(null)

  useEffect(() => {
    if (!teamId && teams.length > 0) {
      setTeamId(teams[0].id)
    }
  }, [teams, teamId])

  const { members } = useTeamMembers(teamId)
  const { tasks, loading: tasksLoading } = useTaskSummary(teamId)

  const productivity = useMemo(
    () =>
      members.map((member) => {
        const memberTasks = tasks.filter((task) => task.assigned_to === member.id)
        const completed = memberTasks.filter((task) => task.status === 'completed').length

        return {
          id: member.id,
          name: member.name,
          total: memberTasks.length,
          completed,
          completionRate: memberTasks.length ? Math.round((completed / memberTasks.length) * 100) : 0,
        }
      }),
    [members, tasks],
  )

  const summary = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'completed').length
    const pending = tasks.filter((task) => task.status !== 'completed' && task.status !== 'cancelled').length

    return { total: tasks.length, completed, pending }
  }, [tasks])

  return {
    teams,
    teamId,
    setTeamId,
    productivity,
    summary,
    loading: teamsLoading || tasksLoading,
  }
}
