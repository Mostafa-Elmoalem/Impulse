import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Github, Linkedin, GitBranch, Heart } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ProgressBar } from '@/shared/components/ui/ProgressBar';
import { getDashboardStats } from '@/features/dashboard/api/dashboardApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { TaskFormModal } from '@/features/tasks/components/TaskFormModal';
import { useUIStore } from '@/shared/stores/useUIStore';
import { useDateStore } from '@/shared/stores/useDateStore';

export const AppLayout = () => {
  const { isTaskModalOpen, closeTaskModal } = useUIStore();
  const { selectedDate } = useDateStore();

  const { data: stats } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_STATS,
    queryFn: getDashboardStats,
    refetchInterval: 5000,
  });

  const dailyProgress = stats 
    ? Math.min(Math.round((stats.dailyScore / stats.dailyTarget) * 100), 100)
    : 0;

  return (
    <div className="flex h-screen w-full bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark transition-colors duration-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar stats={stats} /> 

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[280px] h-full relative">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-background/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
          <Header />
          <div className="px-8 pb-0 -mt-1">
             <ProgressBar progress={dailyProgress} />
          </div>
        </div>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto px-8 py-8 scrollbar-hide flex flex-col">
          <div className="max-w-6xl mx-auto w-full flex-1">
            <Outlet />
          </div>

          {/* Athar (The Quote) - Distinctive Section */}
          <div className="max-w-4xl mx-auto w-full mt-16 mb-24 animate-fade-in">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-100 dark:border-amber-800/30 text-center overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Decorative Quote Icon */}
              <div className="absolute top-4 left-6 text-6xl text-amber-200 dark:text-amber-800/20 font-serif opacity-50">"</div>
              
              <p className="relative z-10 text-lg md:text-xl text-amber-900 dark:text-amber-100 font-medium leading-relaxed font-serif">
                أبا عبد الله أحمد بن محمد بن حنبل يقول : <br/>
                <span className="block mt-2 italic">
                " أصول السنة عندنا : التمسك بما كان عليه أصحاب رسول الله - صلى الله عليه وسلم - والاقتداء بهم ، وترك البدع ، وكل بدعة فهي ضلالة "
                </span>
              </p>
              
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-1 bg-amber-200 dark:bg-amber-800 rounded-full opacity-50" />
              </div>
            </div>
          </div>
        </main>

        {/* Fixed Footer */}
        <footer className="absolute bottom-0 left-0 right-0 h-[60px] flex items-center justify-between px-8
                         bg-white/90 dark:bg-background-paper-dark/90 backdrop-blur-md
                         border-t border-gray-100 dark:border-gray-800
                         text-xs z-30 transition-colors shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
          
          {/* Left: Project Repo */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/Mostafa-Elmoalem/impulse" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-foreground-muted hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
              <GitBranch size={14} />
              <span>Impulse Repository</span>
            </a>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <span className="text-foreground-muted">© 2025 Impulse</span>
          </div>

          {/* Right: Developers */}
          <div className="flex items-center gap-6">
            {/* Mostafa */}
            <div className="flex items-center gap-2">
              <span className="text-foreground-muted hidden sm:inline">Mostafa Elmoalem</span>
              <div className="flex gap-1">
                <a href="https://github.com/Mostafa-Elmoalem" target="_blank" rel="noreferrer" 
                   className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#333] dark:text-gray-400 dark:hover:text-white transition-colors">
                  <Github size={14} />
                </a>
                <a href="https://www.linkedin.com/in/mostafa-elmoalem-782a821ba/" target="_blank" rel="noreferrer"
                   className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#0077b5] dark:text-gray-400 dark:hover:text-[#0077b5] transition-colors">
                  <Linkedin size={14} />
                </a>
              </div>
            </div>

            <span className="text-gray-300 dark:text-gray-700">|</span>

            {/* Ahmed */}
            <div className="flex items-center gap-2">
              <span className="text-foreground-muted hidden sm:inline">Ahmed Fekry</span>
              <a href="https://github.com/A-Fekry/" target="_blank" rel="noreferrer"
                 className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#333] dark:text-gray-400 dark:hover:text-white transition-colors">
                <Github size={14} />
              </a>
            </div>
          </div>
        </footer>
      </div>

      <TaskFormModal 
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        initialDate={selectedDate}
      />
    </div>
  );
};