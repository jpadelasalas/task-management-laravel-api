import axiosClient from '../../shared/api/axiosClient'

export function fetchTeams(params) {
  return axiosClient.get('/teams', { params })
}

export function fetchTeam(teamId) {
  return axiosClient.get(`/teams/${teamId}`)
}

export function createTeam(data) {
  return axiosClient.post('/teams', data)
}

export function addTeamMember(teamId, data) {
  return axiosClient.post(`/teams/${teamId}/members`, data)
}

export function removeTeamMember(teamId, userId) {
  return axiosClient.delete(`/teams/${teamId}/members/${userId}`)
}
