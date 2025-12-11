import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Settings, HelpCircle, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

// Interface for props if we pass stats from parent
interface SidebarProps {
  stats?: {
    done: number;
    deleted: number;
    delayed: number;
  };
}

export const Sidebar = ({ stats = { done: 0, deleted: 0, delayed: 0 } }: SidebarProps) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: CheckSquare, label: 'To-Do List', path: '/tasks' },
  ];

  return (
    <aside className="w-[280px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen flex flex-col fixed left-0 top-0 z-30 shadow-sm">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-brand-sm">
          I
        </div>
        <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Impulse</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
              "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium",
              isActive && "bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 font-semibold shadow-sm"
            )}
          >
            <item.icon size={20} className={cn("transition-colors")} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Tasks Summary Widget */}
      <div className="px-6 py-6 border-t border-gray-100 dark:border-gray-800">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Tasks Summary
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 group cursor-default">
            <span className="flex items-center gap-2 group-hover:text-success-600 transition-colors">
              <CheckCircle2 size={16} /> Done
            </span>
            <span className="font-bold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md min-w-[30px] text-center">
              {stats.done}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 group cursor-default">
            <span className="flex items-center gap-2 group-hover:text-danger-600 transition-colors">
              <Trash2 size={16} /> Deleted
            </span>
            <span className="font-bold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md min-w-[30px] text-center">
              {stats.deleted}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 group cursor-default">
            <span className="flex items-center gap-2 group-hover:text-warning-600 transition-colors">
              <Clock size={16} /> Delayed
            </span>
            <span className="font-bold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md min-w-[30px] text-center">
              {stats.delayed}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Settings */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
        <button className="flex items-center gap-3 px-4 py-2 w-full text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors">
          <Settings size={18} /> Settings
        </button>
        <button className="flex items-center gap-3 px-4 py-2 w-full text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-sm transition-colors">
          <HelpCircle size={18} /> Help
        </button>
      </div>
    </aside>
  );
};