import axios from 'axios'
import { getAuthToken } from './axiosClient'

// Same JWT the Laravel client sends — Node verifies it against the
// shared JWT_SECRET, no separate login for this service.
const nodeApiClient = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_URL || 'http://127.0.0.1:3000/api',
})

nodeApiClient.interceptors.request.use((config) => {
  const token = getAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default nodeApiClient
