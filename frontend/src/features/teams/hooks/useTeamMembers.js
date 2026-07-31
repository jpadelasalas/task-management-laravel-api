import { useQuery } from '@tanstack/react-query'
import * as teamsApi from '../api'

export function useTeamMembers(teamId) {
  const { data, isLoading } = useQuery({
    queryKey: ['teams', teamId, 'members'],
    queryFn: async () => {
      const { data } = await teamsApi.fetchTeam(teamId)
      return data.data.members
    },
    enabled: !!teamId,
  })

  return { members: data ?? [], loading: isLoading }
}
