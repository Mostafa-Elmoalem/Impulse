// src/shared/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import { Plus, Moon, Sun } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { format, addDays } from 'date-fns';
export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <header className="h-20 px-8 flex items-center justify-between
                       bg-white dark:bg-gray-950
                       border-b border-gray-200 dark:border-gray-800
                       transition-colors">
      
      {/* Left: Date Info */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Target: {format(addDays(new Date(), 3), 'MMM d')} (+3 Days)
        </p>
      </div>

      {/* Center: Live Clock */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-2xl font-semibold text-brand-600 dark:text-brand-400 
                        tracking-tight tabular-nums">
          {format(currentTime, 'h:mm a')}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-lg text-gray-600 dark:text-gray-400
                     hover:bg-gray-100 dark:hover:bg-gray-900
                     transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Button leftIcon={<Plus size={18} />}>
          Add Task
        </Button>
      </div>
    </header>
  );
};