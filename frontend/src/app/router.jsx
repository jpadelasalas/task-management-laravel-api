import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './AppLayout'
import { ProtectedRoute } from '../features/auth/ProtectedRoute'
import Login from '../features/auth/pages/Login'
import Dashboard from '../features/dashboard/pages/Dashboard'
import TasksList from '../features/tasks/pages/TasksList'
import TaskDetail from '../features/tasks/pages/TaskDetail'

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
        ],
      },
    ],
  },
])

export default router
