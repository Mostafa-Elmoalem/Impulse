// src/shared/components/Sidebar/Sidebar.tsx
import { Home, ListTodo, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { cn } from '@/shared/utils/cn';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/tasks', icon: ListTodo, label: 'Tasks' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = () => {
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-[280px] bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-brand-600">Impulse</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-brand-50 text-brand-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
            <span className="text-brand-600 font-semibold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;