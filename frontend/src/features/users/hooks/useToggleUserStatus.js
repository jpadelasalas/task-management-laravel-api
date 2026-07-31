import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import * as usersApi from '../api'

/**
 * Standalone toggle for the list table's inline action — doesn't require
 * fetching the full user first (unlike useUser, which is for the detail page).
 */
export function useToggleUserStatus() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ userId, isActive }) => usersApi.toggleUserStatus(userId, isActive),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'list'] })
      queryClient.invalidateQueries({ queryKey: ['users', userId] })
      toast.success('Status updated')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Status change failed'),
  })

  return { toggleStatus: mutation.mutate, togglingId: mutation.isPending ? mutation.variables?.userId : null }
}
