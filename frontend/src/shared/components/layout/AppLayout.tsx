import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer'; // ✅ Import Footer
import { ProgressBar } from '../ui/ProgressBar';
import { TaskFormModal } from '@/features/tasks/components/TaskFormModal';
import { GlobalTaskCompletion } from '@/features/tasks/components/GlobalTaskCompletion';
import { useUIStore } from '@/shared/stores/useUIStore';
import { getDashboardStats } from '@/features/dashboard/api/dashboardApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { cn } from '@/shared/utils/cn';

export const AppLayout = () => {
  const { isTaskModalOpen, closeTaskModal, isSidebarCollapsed } = useUIStore();
  
  const { data: stats } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_STATS,
    queryFn: getDashboardStats,
  });

  const score = stats?.dailyScore || 0;
  const target = stats?.dailyTarget || 100;
  const progressPercentage = (score / target) * 100;

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark transition-colors flex relative isolate">
      
      {/* 1. Sidebar */}
      <Sidebar stats={stats} />

      {/* 2. Main Content Wrapper */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300 relative z-0",
        isSidebarCollapsed ? "md:pl-[80px]" : "md:pl-[280px]"
      )}>
        
        {/* Header */}
        <Header />

        {/* Progress Bar */}
        <div className="w-full px-4 md:px-8 mt-4 relative ">
           <ProgressBar progress={Math.round(progressPercentage)} />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 pt-4 max-w-7xl mx-auto w-full animate-fade-in relative z-0">
          <Outlet />
        </main>

        {/* ✅ Footer Component */}
        <Footer />

      </div>

      {/* Global Modals */}
      <div className="relative z-[1200]">
        <TaskFormModal 
          isOpen={isTaskModalOpen} 
          onClose={closeTaskModal} 
        />
      </div>

      <div className="relative z-[1300]">
        <GlobalTaskCompletion />
      </div>

    </div>
  );
};