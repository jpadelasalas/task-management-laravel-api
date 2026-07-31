import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './AppLayout'
import { ProtectedRoute } from '../features/auth/ProtectedRoute'
import Login from '../features/auth/pages/Login'
import Dashboard from '../features/dashboard/pages/Dashboard'
import TasksList from '../features/tasks/pages/TasksList'
import TaskDetail from '../features/tasks/pages/TaskDetail'
import Teams from '../features/teams/pages/Teams'
import TeamDetail from '../features/teams/pages/TeamDetail'
import Users from '../features/users/pages/Users'
import UserDetail from '../features/users/pages/UserDetail'
import Analytics from '../features/analytics/pages/Analytics'
import Settings from '../features/settings/pages/Settings'

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Dashboard /> },
          { path: '/tasks', element: <TasksList /> },
          { path: '/tasks/:id', element: <TaskDetail /> },
          { path: '/settings', element: <Settings /> },
          {
            element: <ProtectedRoute roles={['admin', 'manager']} />,
            children: [
              { path: '/teams', element: <Teams /> },
              { path: '/teams/:id', element: <TeamDetail /> },
              { path: '/analytics', element: <Analytics /> },
            ],
          },
          {
            element: <ProtectedRoute roles={['admin']} />,
            children: [
              { path: '/users', element: <Users /> },
              { path: '/users/:id', element: <UserDetail /> },
            ],
          },
        ],
      },
    ],
  },
])

export default router
