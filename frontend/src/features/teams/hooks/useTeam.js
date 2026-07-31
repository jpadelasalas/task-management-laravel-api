import { useQuery } from '@tanstack/react-query'
import * as teamsApi from '../api'

export function useTeam(teamId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['teams', teamId],
    queryFn: async () => {
      const { data } = await teamsApi.fetchTeam(teamId)
      return data.data
    },
    enabled: !!teamId,
  })

  return { team: data ?? null, loading: isLoading, error }
}
