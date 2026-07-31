import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from './useAuth'

export function useLoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)

    try {
      await login(email, password)
      navigate('/', { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return { email, setEmail, password, setPassword, submitting, handleSubmit }
}
