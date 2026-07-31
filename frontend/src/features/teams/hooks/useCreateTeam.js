import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import * as teamsApi from '../api'

export function useCreateTeam() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data) => teamsApi.createTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] })
      toast.success('Team created')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Could not create team'),
  })

  return { createTeam: mutation.mutateAsync, creating: mutation.isPending }
}
