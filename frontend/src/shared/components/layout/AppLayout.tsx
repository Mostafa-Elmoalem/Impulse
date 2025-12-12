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
    refetchInterval: 30000,
  });

  const dailyProgress = stats 
    ? Math.round((stats.dailyScore / stats.dailyTarget) * 100) 
    : 0;

  const taskStats = {
    done: stats?.completedTasks || 0,
    deleted: 0, 
    delayed: 0, 
  };

  return (
    <div className="flex h-screen bg-background dark:bg-background-dark transition-colors">
      <Sidebar stats={taskStats} />

      <div className="flex-1 flex flex-col ml-[280px]">
        <Header />
        <ProgressBar progress={dailyProgress} />

        {/* Main Content - with min-height for footer positioning */}
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="min-h-[calc(100vh-160px)] page-padding">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>

          {/* Fixed Footer */}
          <footer className="border-t border-gray-200 dark:border-gray-800 
                            bg-white dark:bg-gray-950 
                            py-6 text-center
                            mt-auto">
            <p className="mb-2 text-sm italic text-gray-600 dark:text-gray-400 font-medium">
              "الوقت كالسيف إن لم تقطعه قطعك" - الإمام الشافعي
            </p>
            <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
              <p>Developed by: Mostafa Elmoalem (Frontend) & Ahmed Fekry (Backend)</p>
              <p>© 2025 Impulse. All rights reserved.</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};