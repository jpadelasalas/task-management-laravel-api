import { useState } from 'react'
import { useTeams } from '../hooks/useTeams'
import { useCreateTeam } from '../hooks/useCreateTeam'
import { TeamCard } from '../components/TeamCard'
import { Pagination } from '../../../shared/components/Pagination'

export default function Teams() {
  const { teams, meta, loading, setPage } = useTeams()
  const { createTeam, creating } = useCreateTeam()
  const [name, setName] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await createTeam({ name })
      setName('')
      setShowForm(false)
    } catch {
      // error toast already shown by the mutation's onError
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Teams</h1>
        <button
          type="button"
          onClick={() => setShowForm((current) => !current)}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          {showForm ? 'Cancel' : 'New Team'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 flex items-end gap-2 rounded-2xl border border-line bg-surface p-6"
        >
          <div className="flex-1">
            <label className="mb-1.5 block text-sm font-medium text-foreground">Team name</label>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {creating ? 'Creating…' : 'Create Team'}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-muted">Loading teams…</p>
      ) : teams.length === 0 ? (
        <p className="text-sm text-muted">No teams yet.</p>
      ) : (
        <div className="space-y-2">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}

      <Pagination meta={meta} onPageChange={setPage} />
    </div>
  )
}
