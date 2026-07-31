export const TASK_STATUSES = ['pending', 'in_progress', 'completed', 'cancelled']
export const TASK_PRIORITIES = ['low', 'medium', 'high']

export const STATUS_LABELS = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

// mirrors backend/app/Enums/TaskStatus.php canTransitionTo() — server is
// still authoritative, this only drives which options the UI offers
const TRANSITIONS = {
  pending: ['in_progress', 'cancelled'],
  in_progress: ['completed', 'pending'],
  completed: [],
  cancelled: [],
}

export function legalNextStatuses(status) {
  return TRANSITIONS[status] ?? []
}
