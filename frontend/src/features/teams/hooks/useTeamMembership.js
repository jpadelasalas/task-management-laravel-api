import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import * as teamsApi from '../api'

export function useTeamMembership(teamId) {
  const queryClient = useQueryClient()

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['teams', teamId] })

  const addMutation = useMutation({
    mutationFn: (data) => teamsApi.addTeamMember(teamId, data),
    onSuccess: () => {
      invalidate()
      toast.success('Member added')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Could not add member'),
  })

  const removeMutation = useMutation({
    mutationFn: (userId) => teamsApi.removeTeamMember(teamId, userId),
    onSuccess: () => {
      invalidate()
      toast.success('Member removed')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Could not remove member'),
  })

  return {
    addMember: addMutation.mutateAsync,
    removeMember: removeMutation.mutateAsync,
    saving: addMutation.isPending || removeMutation.isPending,
  }
}
