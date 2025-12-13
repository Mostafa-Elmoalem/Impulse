import { NavLink } from 'react-router-dom';
import { LayoutGrid, ListTodo, CheckCircle2, Clock, Zap, Hourglass } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { DashboardStats } from '@/features/dashboard/api/dashboardApi';
import { useUIStore } from '@/shared/stores/useUIStore';

interface SidebarProps {
  stats?: DashboardStats;
}

export const Sidebar = ({ stats }: SidebarProps) => {
  const { isSidebarOpen, closeSidebar } = useUIStore();

  const doneCount = stats?.completedTasks || 0;
  const pendingCount = stats?.pendingTasks || 0;
  const score = stats?.dailyScore || 0;
  
  const focusMinutes = stats?.totalFocusTime || 0;
  const hours = Math.floor(focusMinutes / 60);
  const minutes = focusMinutes % 60;
  const focusTimeText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  const navItems = [
    { icon: LayoutGrid, label: 'Overview', path: '/dashboard' },
    { icon: ListTodo, label: 'To-Do List', path: '/tasks' },
  ];

  return (
    // SIDEBAR ISOLATION:
    // - bg-white (Clean background)
    // - border-r border-gray-200 (Distinct right border)
    <aside className={cn(
      "w-[280px] h-full fixed left-0 top-0 z-50 flex flex-col transition-transform duration-300 ease-out",
      "bg-white dark:bg-background-paper-dark border-r border-gray-200 dark:border-gray-800",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full",
      "md:translate-x-0"
    )}>
      
      {/* Logo Area */}
      <div className="h-[72px] flex items-center gap-3 px-6 border-b border-gray-100 dark:border-gray-800/50">
        <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-500/20">
          I
        </div>
        <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Impulse</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-1 mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => closeSidebar()}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group font-medium text-sm",
              isActive 
                ? "bg-gray-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-100 border border-gray-200 dark:border-transparent" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            {/* ✅ الحل هنا: استخدام دالة للوصول لـ isActive */}
            {({ isActive }) => (
              <>
                <item.icon 
                  size={18} 
                  className={cn(
                    "transition-transform group-hover:scale-105 opacity-80 group-hover:opacity-100", 
                    isActive && "text-brand-600 dark:text-brand-400"
                  )} 
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Tasks Summary Widget */}
      <div className="mx-3 mb-6 p-4 rounded-xl bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 relative overflow-hidden">
        
        <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          Daily Summary
        </h3>
        <div className="space-y-2.5">
          <SummaryRow icon={CheckCircle2} color="text-emerald-600" label="Done" value={doneCount} />
          <SummaryRow icon={Clock} color="text-amber-600" label="Pending" value={pendingCount} />
          <SummaryRow icon={Hourglass} color="text-blue-600" label="Focus" value={focusTimeText} />
          
          <div className="pt-2.5 border-t border-gray-200 dark:border-gray-700 mt-2.5">
             <SummaryRow icon={Zap} color="text-brand-600" label="Score" value={score} isScore />
          </div>
        </div>
      </div>
    </aside>
  );
};

const SummaryRow = ({ icon: Icon, color, label, value, isScore }: any) => (
  <div className="flex justify-between items-center text-xs">
    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
      <Icon size={14} className={color} />
      <span className="font-medium">{label}</span>
    </div>
    <span className={cn("font-bold tabular-nums", isScore ? "text-brand-700 dark:text-brand-400" : "text-gray-900 dark:text-white")}>{value}</span>
  </div>
);