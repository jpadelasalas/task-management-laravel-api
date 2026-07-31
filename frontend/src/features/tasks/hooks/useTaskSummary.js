import { useQuery } from '@tanstack/react-query'
import * as tasksApi from '../api'

/**
 * Unpaginated task fetch for dashboard/analytics stat tiles — useTasks is
 * paginated (15/page) and would undercount teams with more tasks than that.
 */
export function useTaskSummary(teamId) {
  const { data, isLoading } = useQuery({
    queryKey: ['teams', teamId, 'tasks', 'summary'],
    queryFn: async () => {
      const { data } = await tasksApi.fetchTasks(teamId, { per_page: 100 })
      return data.data
    },
    enabled: !!teamId,
  })

  return { tasks: data ?? [], loading: isLoading }
}
