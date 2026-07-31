import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useTheme } from '../shared/hooks/useTheme'
import { Icon } from '../shared/components/Icon'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: 'dashboard', roles: null },
  { to: '/tasks', label: 'Tasks', icon: 'tasks', roles: null },
  { to: '/teams', label: 'Teams', icon: 'teams', roles: ['admin', 'manager'] },
  { to: '/users', label: 'Users', icon: 'users', roles: ['admin'] },
  { to: '/analytics', label: 'Analytics', icon: 'analytics', roles: ['admin', 'manager'] },
  { to: '/settings', label: 'Settings', icon: 'settings', roles: null },
]

const ROLE_LABEL = {
  admin: 'Admin',
  manager: 'Manager',
  team_member: 'Team Member',
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function AppLayout() {
  const { user, logout } = useAuth()
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  const visibleItems = NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(user.role))

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="flex w-60 flex-col border-r border-line bg-surface">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Icon name="logo" className="h-4.5 w-4.5" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold text-foreground">Task Management</span>
        </div>

        <nav className="flex-1 space-y-0.5 px-3">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'text-muted hover:bg-surface-inset hover:text-foreground'
                }`
              }
            >
              <Icon name={item.icon} className="h-4.5 w-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-line p-3">
          <button
            onClick={toggle}
            className="mb-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-inset hover:text-foreground"
          >
            <Icon name={isDark ? 'sun' : 'moon'} className="h-4.5 w-4.5" />
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>

          <div className="flex items-center gap-2.5 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
              {initials(user.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-foreground">{user.name}</div>
              <div className="text-xs text-subtle">{ROLE_LABEL[user.role] ?? user.role}</div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="rounded-lg p-1.5 text-subtle transition-colors hover:bg-surface-inset hover:text-danger-600"
            >
              <Icon name="logout" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
