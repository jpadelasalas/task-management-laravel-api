import { useTeam } from './useTeam'

export function useTeamMembers(teamId) {
  const { team, loading } = useTeam(teamId)

  return { members: team?.members ?? [], loading }
}
