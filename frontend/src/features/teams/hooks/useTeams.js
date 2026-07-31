import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as teamsApi from '../api'

export function useTeams() {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['teams', 'list', page],
    queryFn: async () => {
      const { data } = await teamsApi.fetchTeams({ page })
      return data
    },
  })

  return {
    teams: data?.data ?? [],
    meta: data?.meta ?? null,
    loading: isLoading,
    page,
    setPage,
  }
}
