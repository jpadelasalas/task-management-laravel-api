import { useParams } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useTeam } from '../hooks/useTeam'
import { useTeamMembership } from '../hooks/useTeamMembership'
import { MemberList } from '../components/MemberList'
import { AddMemberForm } from '../components/AddMemberForm'

export default function TeamDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { team, loading, error } = useTeam(id)
  const { addMember, removeMember, saving } = useTeamMembership(id)

  if (loading) {
    return <p className="text-sm text-muted">Loading…</p>
  }

  if (error || !team) {
    return (
      <p className="text-sm text-muted">
        {error?.response?.status === 403 ? "You don't have access to this team." : 'Team not found.'}
      </p>
    )
  }

  const membership = team.members.find((member) => member.id === user.id)
  const canManage = user.role === 'admin' || membership?.role === 'lead'

  const handleRemove = async (userId) => {
    if (!window.confirm('Remove this member from the team?')) {
      return
    }

    try {
      await removeMember(userId)
    } catch {
      // error toast already shown by the mutation's onError
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-xl font-semibold text-foreground">{team.name}</h1>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <h2 className="mb-3 text-sm font-medium text-foreground">Members</h2>
        <MemberList
          members={team.members}
          canManage={canManage}
          onRemove={handleRemove}
          removing={saving}
        />

        {canManage && (
          <div className="mt-4 border-t border-line pt-4">
            <AddMemberForm
              existingMemberIds={team.members.map((member) => member.id)}
              onAdd={addMember}
              saving={saving}
            />
          </div>
        )}
      </div>
    </div>
  )
}
