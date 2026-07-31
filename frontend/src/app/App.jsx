import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../features/auth/AuthContext'
import { queryClient } from './queryClient'
import router from './router'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--color-surface)',
              color: 'var(--color-foreground)',
              border: '1px solid var(--color-line)',
              fontSize: '0.875rem',
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  )
}
