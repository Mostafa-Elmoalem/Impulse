import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ProgressBar } from '@/shared/components/ui/ProgressBar';
import { getDashboardStats } from '@/features/dashboard/api/dashboardApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';

export const AppLayout = () => {
  const { data: stats } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_STATS,
    queryFn: getDashboardStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Calculate progress percentage
  const dailyProgress = stats 
    ? Math.round((stats.dailyScore / stats.dailyTarget) * 100) 
    : 0;

  // Task stats from backend for the Sidebar
  const taskStats = {
    done: stats?.completedTasks || 0,
    // Assuming these might be added to the backend API later, 
    // or you can calculate them if you fetch all tasks here.
    // For now, defaulting to 0 if not in DashboardStats
    deleted: 0, 
    delayed: 0, 
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar gets real stats */}
      <Sidebar stats={taskStats} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[280px] transition-all duration-300">
        <Header />
        
        {/* Progress Bar driven by real score */}
        <ProgressBar progress={dailyProgress} />

        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
          
          <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="mb-2 italic text-gray-600 dark:text-gray-400 font-medium">
              "الوقت كالسيف إن لم تقطعه قطعك" - الإمام الشافعي
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Developed by: Mostafa Elmoalem (Frontend) & Ahmed Fekry (Backend)</p>
              <p>© 2025 Impulse. All rights reserved.</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};