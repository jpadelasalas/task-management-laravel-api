import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useMyTeams } from '../../teams/hooks/useMyTeams'
import { useTeamMembers } from '../../teams/hooks/useTeamMembers'
import * as analyticsApi from '../api'

export function useAnalyticsData() {
  const { teams, loading: teamsLoading } = useMyTeams()
  const [teamId, setTeamId] = useState(null)
  const { members } = useTeamMembers(teamId)

  useEffect(() => {
    if (!teamId && teams.length > 0) {
      setTeamId(teams[0].id)
    }
  }, [teams, teamId])

  // all three come from the Node service (not Laravel) — it owns the
  // aggregation, we just render what it hands back
  const summaryQuery = useQuery({
    queryKey: ['analytics', 'task-summary', teamId],
    queryFn: () => analyticsApi.fetchTaskSummary(teamId).then((res) => res.data),
    enabled: !!teamId,
  })

  const productivityQuery = useQuery({
    queryKey: ['analytics', 'team-productivity', teamId],
    queryFn: () => analyticsApi.fetchTeamProductivity(teamId).then((res) => res.data.data),
    enabled: !!teamId,
  })

  const deadlinesQuery = useQuery({
    queryKey: ['analytics', 'upcoming-deadlines', teamId],
    queryFn: () => analyticsApi.fetchUpcomingDeadlines(teamId).then((res) => res.data.data),
    enabled: !!teamId,
  })

  const memberName = (id) => members.find((member) => member.id === id)?.name ?? `User #${id}`

  const upcomingDeadlines = (deadlinesQuery.data ?? []).map((group) => ({
    ...group,
    memberName: memberName(group.assigned_to),
  }))

  return {
    teams,
    teamId,
    setTeamId,
    summary: summaryQuery.data ?? null,
    productivity: productivityQuery.data ?? [],
    upcomingDeadlines,
    loading: teamsLoading || summaryQuery.isLoading || productivityQuery.isLoading,
    error: summaryQuery.error || productivityQuery.error,
  }
}
