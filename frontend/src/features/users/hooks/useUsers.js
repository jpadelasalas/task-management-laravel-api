import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as usersApi from '../api'

export function useUsers(filters = {}) {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['users', 'list', page, filters],
    queryFn: async () => {
      const { data } = await usersApi.fetchUsers({ page, ...filters })
      return data
    },
  })

  return {
    users: data?.data ?? [],
    meta: data?.meta ?? null,
    loading: isLoading,
    page,
    setPage,
  }
}
