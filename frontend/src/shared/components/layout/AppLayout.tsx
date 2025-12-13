import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ProgressBar } from '../ui/ProgressBar';
import { TaskFormModal } from '@/features/tasks/components/TaskFormModal';
import { useUIStore } from '@/shared/stores/useUIStore';
import { getDashboardStats } from '@/features/dashboard/api/dashboardApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { Heart } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export const AppLayout = () => {
  const { isTaskModalOpen, closeTaskModal, isSidebarCollapsed } = useUIStore();
  
  const { data: stats } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_STATS,
    queryFn: getDashboardStats,
  });

  const score = stats?.dailyScore || 0;
  const progressPercentage = Math.min(100, (score / 150) * 100); 

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark transition-colors flex">
      
      {/* 1. Sidebar */}
      <Sidebar stats={stats} />

      {/* 2. Main Content Wrapper */}
      {/* Dynamic Padding based on Sidebar state */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300 relative",
        isSidebarCollapsed ? "md:pl-[80px]" : "md:pl-[280px]"
      )}>
        
        {/* Header */}
        <Header />

        {/* Progress Bar */}
        <div className="w-full px-4 md:px-8 mt-2 z-50">
           <ProgressBar progress={Math.round(progressPercentage)} />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 pt-4 max-w-7xl mx-auto w-full animate-fade-in">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-200 dark:border-gray-800/50 mt-auto">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-4 font-medium font-serif">
              "Time is like a sword; if you don't cut it, it cuts you." — Imam Al-Shafi'i
            </p>

            <div className="flex flex-col items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-600">
              <div className="flex items-center gap-1.5">
                <span>Developed with</span>
                <Heart size={10} className="text-red-500 fill-current animate-pulse" />
                <span>by</span>
              </div>
              
              <div className="flex items-center gap-4 font-semibold text-gray-600 dark:text-gray-400">
                <a href="#" className="hover:text-brand-600 transition-colors">Mostafa Elmoalem</a>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                <a href="#" className="hover:text-brand-600 transition-colors">Backend Developer</a>
              </div>

              <div className="mt-2 text-[10px] uppercase tracking-widest opacity-60">
                © 2025 Impulse Project. All rights reserved.
              </div>
            </div>
          </div>
        </footer>

      </div>

      <TaskFormModal 
        isOpen={isTaskModalOpen} 
        onClose={closeTaskModal} 
      />
    </div>
  );
};