import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import * as tasksApi from '../api'

export function useCreateTask(teamId) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (payload) => tasksApi.createTask(teamId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams', teamId, 'tasks'] })
      toast.success('Task created')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Could not create task'),
  })

  return { createTask: mutation.mutateAsync, creating: mutation.isPending }
}
