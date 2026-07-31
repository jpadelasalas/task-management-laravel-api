import nodeApiClient from '../../shared/api/nodeApiClient'

export function fetchTaskSummary(teamId) {
  return nodeApiClient.get('/analytics/task-summary', { params: { team_id: teamId } })
}

export function fetchTeamProductivity(teamId) {
  return nodeApiClient.get('/analytics/team-productivity', { params: { team_id: teamId } })
}

export function fetchUpcomingDeadlines(teamId) {
  return nodeApiClient.get('/analytics/upcoming-deadlines', { params: { team_id: teamId } })
}
