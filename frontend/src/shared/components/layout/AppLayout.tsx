import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ProgressBar } from '@/shared/components/ui/ProgressBar';

export const AppLayout = () => {
  // In a real app, these would come from a global store or React Query
  // For now, we pass them as props to the structure we built
  const dailyProgress = 45; 
  const stats = { done: 12, deleted: 3, delayed: 2 };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar is fixed width */}
      <Sidebar stats={stats} />

      {/* Main Content flows to the right */}
      <div className="flex-1 flex flex-col ml-[280px] transition-all duration-300">
        <Header />
        
        {/* Progress Bar sits directly under header */}
        <ProgressBar progress={dailyProgress} />

        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
          
          {/* Footer Requirement */}
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