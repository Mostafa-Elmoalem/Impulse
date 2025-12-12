import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ProgressBar } from '@/shared/components/ui/ProgressBar';
import { getDashboardStats } from '@/features/dashboard/api/dashboardApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';

export const AppLayout = () => {
  // Fetch real data (via the LocalStorage API we set up)
  const { data: stats } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_STATS,
    queryFn: getDashboardStats,
    refetchInterval: 5000, // Frequent updates for snappy feel
  });

  const dailyProgress = stats 
    ? Math.min(Math.round((stats.dailyScore / stats.dailyTarget) * 100), 100)
    : 0;

  return (
    <div className="flex h-screen w-full bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark transition-colors duration-300 font-sans overflow-hidden">
      {/* Sidebar - Fixed Left */}
      <Sidebar stats={stats} /> 

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[280px] h-full relative">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-background/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
          <Header />
          {/* Progress Bar embedded in Header area for visibility */}
          <div className="px-8 pb-0 -mt-1">
             <ProgressBar progress={dailyProgress} />
          </div>
        </div>

        {/* Scrollable Page Content */}
        {/* Padding bottom ensures content isn't hidden behind the fixed footer */}
        <main className="flex-1 overflow-y-auto px-8 py-8 pb-[80px] scrollbar-hide">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Fixed Footer - Always visible at bottom */}
        <footer className="absolute bottom-0 left-0 right-0 h-[50px] flex items-center justify-center 
                         bg-white/80 dark:bg-background-paper-dark/80 backdrop-blur-sm
                         border-t border-gray-100 dark:border-gray-800
                         text-xs text-foreground-muted dark:text-foreground-muted-dark z-30 transition-colors">
          <div className="flex gap-4 items-center">
             <span className="font-medium italic">"Time is like a sword" - Imam Shafi'i</span>
             <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
             <span>Dev: Mostafa Elmoalem & Ahmed Fekry</span>
             <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
             <span>© 2025 Impulse</span>
          </div>
        </footer>
      </div>
    </div>
  );
};