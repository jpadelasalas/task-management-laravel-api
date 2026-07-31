import { createContext, useCallback, useEffect, useState } from 'react'
import * as authApi from './api'
import { getAuthToken, onUnauthorized, setAuthToken } from '../../shared/api/axiosClient'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(getAuthToken())
  const [loading, setLoading] = useState(true)

  const clearAuth = useCallback(() => {
    setAuthToken(null)
    setToken(null)
    setUser(null)
  }, [])

  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const { data } = await authApi.fetchMe()
        setUser(data.data)
      } catch {
        clearAuth()
      } finally {
        setLoading(false)
      }
    }

    restoreSession()
    // only run once on mount to restore a session from a stored token
  }, [])

  useEffect(() => onUnauthorized(clearAuth), [clearAuth])

  const login = useCallback(async (email, password) => {
    const { data } = await authApi.login(email, password)
    setAuthToken(data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (payload) => {
    const { data } = await authApi.register(payload)
    setAuthToken(data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      clearAuth()
    }
  }, [clearAuth])

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
