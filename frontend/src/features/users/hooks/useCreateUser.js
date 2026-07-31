import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import * as usersApi from '../api'

export function useCreateUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data) => usersApi.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Could not create user'),
  })

  return { createUser: mutation.mutateAsync, creating: mutation.isPending }
}
