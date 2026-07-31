import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as tasksApi from '../api'

export function useTasks(teamId) {
  const [filters, setFilters] = useState({ status: '', priority: '', assigned_to: '' })
  const [page, setPage] = useState(1)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['teams', teamId, 'tasks', { page, ...filters }],
    queryFn: async () => {
      const params = { page }
      if (filters.status) params.status = filters.status
      if (filters.priority) params.priority = filters.priority
      if (filters.assigned_to) params.assigned_to = filters.assigned_to

      const { data } = await tasksApi.fetchTasks(teamId, params)
      return data
    },
    enabled: !!teamId,
  })

  const updateFilters = (next) => {
    setPage(1)
    setFilters((current) => ({ ...current, ...next }))
  }

  return {
    tasks: data?.data ?? [],
    meta: data?.meta ?? null,
    loading: isLoading,
    error,
    filters,
    updateFilters,
    page,
    setPage,
    refetch,
  }
}
