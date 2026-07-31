import axiosClient from '../../shared/api/axiosClient'

export function login(email, password) {
  return axiosClient.post('/auth/login', { email, password })
}

export function register(data) {
  return axiosClient.post('/auth/register', data)
}

export function logout() {
  return axiosClient.post('/auth/logout')
}

export function fetchMe() {
  return axiosClient.get('/auth/me')
}
