import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './AppLayout'
import { ProtectedRoute } from '../features/auth/ProtectedRoute'
import Login from '../features/auth/pages/Login'
import Dashboard from '../features/dashboard/pages/Dashboard'

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [{ path: '/', element: <Dashboard /> }],
      },
    ],
  },
])

export default router
