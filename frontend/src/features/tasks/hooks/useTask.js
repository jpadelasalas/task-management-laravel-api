import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import * as tasksApi from '../api'

export function useTask(taskId) {
  const queryClient = useQueryClient()
  const queryKey = ['tasks', taskId]

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await tasksApi.fetchTask(taskId)
      return data.data
    },
  })

  // task lists live under ['teams', teamId, 'tasks', ...] — invalidate
  // everything under 'teams' so any open list picks up the change too
  const invalidateRelated = () => {
    queryClient.invalidateQueries({ queryKey })
    queryClient.invalidateQueries({ queryKey: ['teams'] })
  }

  const updateMutation = useMutation({
    mutationFn: (fields) => tasksApi.updateTask(taskId, fields),
    onSuccess: () => {
      invalidateRelated()
      toast.success('Task updated')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed'),
  })

  const statusMutation = useMutation({
    mutationFn: (status) => tasksApi.updateTaskStatus(taskId, status),
    onSuccess: () => {
      invalidateRelated()
      toast.success('Status updated')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Status change failed'),
  })

  const deleteMutation = useMutation({
    mutationFn: () => tasksApi.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] })
      toast.success('Task deleted')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed'),
  })

  return {
    task: data ?? null,
    loading: isLoading,
    error,
    saving: updateMutation.isPending || statusMutation.isPending || deleteMutation.isPending,
    update: updateMutation.mutateAsync,
    changeStatus: statusMutation.mutateAsync,
    remove: deleteMutation.mutateAsync,
  }
}
