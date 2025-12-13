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

export const AppLayout = () => {
  const { isTaskModalOpen, closeTaskModal } = useUIStore();
  
  const { data: stats } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_STATS,
    queryFn: getDashboardStats,
  });

  // Calculate Progress Score (0-100)
  const score = stats?.dailyScore || 0;
  const progressPercentage = Math.min(100, (score / 150) * 100); 

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark transition-colors flex">
      
      {/* 1. Sidebar (Fixed Left) */}
      <Sidebar stats={stats} />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 md:pl-[280px] flex flex-col min-h-screen transition-all duration-300 relative">
        
        {/* Header (Sticky Top) */}
        <Header />

        {/* Progress Bar (Normal Flow - Not Sticky) */}
        {/* Removed 'sticky' and background/shadow classes to save space */}
        <div className="w-full z-50 px-8 md:px-8 mt-0">
           <ProgressBar progress={Math.round(progressPercentage)} />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 pt-4 max-w-7xl mx-auto w-full animate-fade-in">
          <Outlet />
        </main>

        {/* Footer (Developers - Centered) */}
        <footer className="py-8 border-t border-gray-200 dark:border-gray-800/50 mt-auto">
          <div className="container mx-auto px-6 text-center">
            
            {/* Wisdom Quote */}
            <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-4 font-medium font-serif">
              "Time is like a sword; if you don't cut it, it cuts you." — Imam Al-Shafi'i
            </p>

            {/* Developers Info */}
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

      {/* Task Modal (Global) */}
      <TaskFormModal 
        isOpen={isTaskModalOpen} 
        onClose={closeTaskModal} 
      />
    </div>
  );
};