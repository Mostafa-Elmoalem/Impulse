import React, { useState, useEffect } from 'react';
import { Plus, Moon, Sun } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { format, addDays } from 'date-fns';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Real user score would come from a store or API
  const dailyScore = 78; 
  const dailyTarget = 100;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 h-20 transition-colors dark:bg-gray-900 dark:border-gray-800">
      {/* Left: Date */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </h2>
        <p className="text-xs text-gray-500">
          Target: {format(addDays(new Date(), 3), 'MMM d')} (+3 Days)
        </p>
      </div>

      {/* Center: Time & Score */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-2xl font-mono font-semibold text-brand-600 dark:text-brand-400">
          {format(currentTime, 'h:mm a')}
        </div>
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Score: <span className="text-brand-600 font-bold">{dailyScore}/{dailyTarget}</span> 🎯
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
        >
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <Button variant="primary" leftIcon={<Plus size={18} />}>
          Add New Task
        </Button>
      </div>
    </header>
  );
};