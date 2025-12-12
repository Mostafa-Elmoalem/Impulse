import { NavLink } from 'react-router-dom';
import { LayoutGrid, ListTodo, CheckCircle2, Trash2, Clock, Settings, HelpCircle, Zap } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { DashboardStats } from '@/features/dashboard/api/dashboardApi';

interface SidebarProps {
  stats?: DashboardStats;
}

export const Sidebar = ({ stats }: SidebarProps) => {
  // Mapping stats from the API
  const doneCount = stats?.completedTasks || 0;
  const pendingCount = stats?.pendingTasks || 0;
  const score = stats?.dailyScore || 0;

  const navItems = [
    { icon: LayoutGrid, label: 'Overview', path: '/dashboard' },
    { icon: ListTodo, label: 'To-Do List', path: '/tasks' },
  ];

  return (
    <aside className="w-[280px] h-full fixed left-0 top-0 bg-background-paper dark:bg-background-paper-dark 
                      border-r border-gray-100 dark:border-gray-800 shadow-soft z-30 flex flex-col transition-colors">
      {/* Logo Area */}
      <div className="p-8 pb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-glow">
          I
        </div>
        <span className="text-2xl font-bold text-foreground dark:text-white tracking-tight">Impulse</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group font-medium text-sm",
              isActive 
                ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-100 shadow-sm" 
                : "text-foreground-muted dark:text-foreground-muted-dark hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-foreground dark:hover:text-white"
            )}
          >
            <item.icon size={20} className={cn("transition-transform group-hover:scale-110")} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Tasks Summary Widget (Design Doc Section 1) */}
      <div className="mx-4 mb-6 p-5 rounded-3xl bg-background dark:bg-background-dark border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
        {/* Decorative background blob */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-colors" />
        
        <h3 className="text-xs font-bold text-foreground-muted dark:text-foreground-muted-dark uppercase tracking-wider mb-4 flex items-center gap-2">
          Daily Summary
        </h3>
        <div className="space-y-4">
          <SummaryRow icon={CheckCircle2} color="text-status-success" label="Done" value={doneCount} />
          <SummaryRow icon={Clock} color="text-status-warning" label="Pending" value={pendingCount} />
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
             <SummaryRow icon={Zap} color="text-brand-500" label="Score" value={score} />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 mb-6">
        <button className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-foreground-muted hover:text-brand-600 dark:text-gray-400 dark:hover:text-white transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
          <Settings size={18} /> Settings
        </button>
      </div>
    </aside>
  );
};

const SummaryRow = ({ icon: Icon, color, label, value }: any) => (
  <div className="flex justify-between items-center text-sm">
    <div className="flex items-center gap-2.5 text-foreground dark:text-gray-300">
      <div className={cn("p-1.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm", color)}>
        <Icon size={14} />
      </div>
      <span className="font-medium">{label}</span>
    </div>
    <span className="font-bold text-foreground dark:text-white">{value}</span>
  </div>
);