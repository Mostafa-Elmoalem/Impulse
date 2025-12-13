import { NavLink } from 'react-router-dom';
import { LayoutGrid, ListTodo, CheckCircle2, Clock, Zap, Hourglass, X } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { DashboardStats } from '@/features/dashboard/api/dashboardApi';
import { useUIStore } from '@/shared/stores/useUIStore';

interface SidebarProps {
  stats?: DashboardStats;
}

export const Sidebar = ({ stats }: SidebarProps) => {
  const { isSidebarOpen, closeSidebar, isSidebarCollapsed } = useUIStore();

  const doneCount = stats?.completedTasks || 0;
  const pendingCount = stats?.pendingTasks || 0;
  const score = stats?.dailyScore || 0;
  
  const focusMinutes = stats?.totalFocusTime || 0;
  const hours = Math.floor(focusMinutes / 60);
  const minutes = focusMinutes % 60;
  // تنسيق الوقت ليظهر بشكل مختصر وواضح (مثلاً: 2h 30m)
  const focusTimeText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  const navItems = [
    { icon: LayoutGrid, label: 'Overview', path: '/dashboard' },
    { icon: ListTodo, label: 'To-Do List', path: '/tasks' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={closeSidebar}
      />

      {/* Sidebar Container */}
      <aside className={cn(
        "h-full fixed left-0 top-0 z-50 flex flex-col transition-all duration-300 ease-in-out",
        "bg-white dark:bg-background-paper-dark border-r border-gray-200 dark:border-gray-800",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0",
        isSidebarCollapsed ? "md:w-[80px]" : "md:w-[280px]"
      )}>
        
        {/* Logo Area */}
        <div className={cn(
          "h-[72px] flex items-center border-b border-gray-100 dark:border-gray-800/50 transition-all",
          isSidebarCollapsed ? "justify-center px-0" : "justify-between px-6"
        )}>
          <div className="flex items-center gap-3">
            <img 
              src="/logo.webp" 
              alt="Logo" 
              className="w-8 h-8 object-contain" 
            />
            <span className={cn(
              "text-xl font-bold text-gray-900 dark:text-white tracking-tight transition-opacity duration-200",
              isSidebarCollapsed ? "hidden opacity-0" : "block opacity-100"
            )}>
              Impulse
            </span>
          </div>
          
          <button 
            onClick={closeSidebar}
            className={cn("md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg", isSidebarCollapsed && "hidden")}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 space-y-2 mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => closeSidebar()}
              className={({ isActive }) => cn(
                "flex items-center rounded-xl transition-all duration-200 group font-medium text-sm relative",
                isSidebarCollapsed ? "justify-center py-3 px-0" : "gap-3 px-3 py-2.5",
                isActive 
                  ? "bg-gray-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-100" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
              )}
              title={isSidebarCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    size={22} 
                    className={cn(
                      "transition-transform group-hover:scale-110 opacity-80 group-hover:opacity-100", 
                      isActive && "text-brand-600 dark:text-brand-400"
                    )} 
                  />
                  <span className={cn(
                    "whitespace-nowrap transition-all duration-200",
                    isSidebarCollapsed ? "hidden w-0 opacity-0" : "block w-auto opacity-100"
                  )}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* --- Tasks Summary Widget --- */}
        <div className={cn(
          "transition-all duration-300",
          isSidebarCollapsed ? "px-2 mb-6" : "px-3 mb-6"
        )}>
          {!isSidebarCollapsed ? (
            // 1. Full Widget (Expanded State)
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 relative overflow-hidden animate-fade-in">
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
          ) : (
            // 2. Mini Widget (Collapsed State)
            <div className="py-4 flex flex-col items-center gap-4 bg-gray-50 dark:bg-background-dark rounded-xl border border-gray-200 dark:border-gray-800 animate-fade-in">
               
               {/* Done */}
               <div className="flex flex-col items-center gap-1 group relative cursor-help">
                 <CheckCircle2 size={18} className="text-emerald-600" />
                 <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{doneCount}</span>
                 <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">Done Tasks</span>
               </div>
               
               {/* Pending */}
               <div className="flex flex-col items-center gap-1 group relative cursor-help">
                 <Clock size={18} className="text-amber-600" />
                 <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{pendingCount}</span>
                 <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">Pending Tasks</span>
               </div>

               {/* Focus Time (Added Here) */}
               <div className="flex flex-col items-center gap-1 group relative cursor-help">
                 <Hourglass size={18} className="text-blue-600" />
                 {/* whitespace-nowrap يمنع النص من النزول لسطر جديد */}
                 <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap tracking-tight">
                   {focusTimeText}
                 </span>
                 <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">Focus Time</span>
               </div>

               {/* Divider */}
               <div className="w-8 h-[1px] bg-gray-200 dark:bg-gray-700 my-1" />
               
               {/* Score */}
               <div className="flex flex-col items-center gap-1 group relative cursor-help">
                 <Zap size={18} className="text-brand-600" />
                 <span className="text-[10px] font-bold text-brand-700 dark:text-brand-400">{score}</span>
                 <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">Daily Score</span>
               </div>
            </div>
          )}
        </div>
        
      </aside>
    </>
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