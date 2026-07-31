import axiosClient from '../../shared/api/axiosClient'
import nodeApiClient from '../../shared/api/nodeApiClient'

export function fetchTasks(teamId, params) {
  return axiosClient.get(`/teams/${teamId}/tasks`, { params })
}

export function fetchTask(taskId) {
  return axiosClient.get(`/tasks/${taskId}`)
}

export function createTask(teamId, data) {
  return axiosClient.post(`/teams/${teamId}/tasks`, data)
}

export function updateTask(taskId, data) {
  return axiosClient.patch(`/tasks/${taskId}`, data)
}

export function deleteTask(taskId) {
  return axiosClient.delete(`/tasks/${taskId}`)
}

export function updateTaskStatus(taskId, status) {
  return axiosClient.patch(`/tasks/${taskId}/status`, { status })
}

// hits the Node service, not Laravel — different base URL, blob
// response since this comes back as a file, not JSON
export function exportTasks(teamId, format, filters) {
  return nodeApiClient.post(
    '/export/tasks',
    { team_id: teamId, format, filters },
    { responseType: 'blob' },
  )
}
