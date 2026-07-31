import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../auth/hooks/useAuth'
import * as teamsApi from '../api'

// stable reference so consumers depending on `teams` in a dependency array
// don't see a "new" array on every render while the query is still loading
const EMPTY_TEAMS = []

/**
 * Teams the current user can pick from when viewing tasks. Managers/team
 * members already got their memberships back on /auth/me. Admins have no
 * membership rows (they never join a team), so fall back to the full list.
 */
export function useMyTeams() {
  const { user } = useAuth()
  const hasMemberships = user.teams.length > 0

  const { data, isLoading } = useQuery({
    queryKey: ['teams', 'all'],
    queryFn: async () => {
      const { data } = await teamsApi.fetchTeams({ per_page: 100 })
      return data.data
    },
    enabled: !hasMemberships,
  })

  return {
    teams: hasMemberships ? user.teams : (data ?? EMPTY_TEAMS),
    loading: hasMemberships ? false : isLoading,
  }
}
