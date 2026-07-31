import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import * as usersApi from '../api'

export function useUser(userId) {
  const queryClient = useQueryClient()
  const queryKey = ['users', userId]

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await usersApi.fetchUser(userId)
      return data.data
    },
    enabled: !!userId,
  })

  const invalidateRelated = () => {
    queryClient.invalidateQueries({ queryKey })
    queryClient.invalidateQueries({ queryKey: ['users', 'list'] })
  }

  const updateMutation = useMutation({
    mutationFn: (fields) => usersApi.updateUser(userId, fields),
    onSuccess: () => {
      invalidateRelated()
      toast.success('User updated')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed'),
  })

  const toggleStatusMutation = useMutation({
    mutationFn: (isActive) => usersApi.toggleUserStatus(userId, isActive),
    onSuccess: () => {
      invalidateRelated()
      toast.success('Status updated')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Status change failed'),
  })

  return {
    user: data ?? null,
    loading: isLoading,
    error,
    saving: updateMutation.isPending || toggleStatusMutation.isPending,
    update: updateMutation.mutateAsync,
    toggleStatus: toggleStatusMutation.mutateAsync,
  }
}
