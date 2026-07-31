import { useAuth } from '../../auth/hooks/useAuth'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Welcome, {user.name}</h1>
      <p className="mt-1 text-sm text-muted">Role: {user.role}</p>
    </div>
  )
}
