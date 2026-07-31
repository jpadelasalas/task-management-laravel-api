import axiosClient from '../../shared/api/axiosClient'

export function fetchUsers(params) {
  return axiosClient.get('/users', { params })
}

export function fetchUser(userId) {
  return axiosClient.get(`/users/${userId}`)
}

export function createUser(data) {
  return axiosClient.post('/users', data)
}

export function updateUser(userId, data) {
  return axiosClient.patch(`/users/${userId}`, data)
}

export function toggleUserStatus(userId, isActive) {
  return axiosClient.patch(`/users/${userId}/status`, { is_active: isActive })
}
