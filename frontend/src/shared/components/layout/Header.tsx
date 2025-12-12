import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Calendar, Bell, ChevronLeft, RotateCcw } from 'lucide-react';
import { format, addDays, isSameDay, differenceInCalendarDays, startOfToday } from 'date-fns';
import { useDateStore } from '@/shared/stores/useDateStore';
import { cn } from '@/shared/utils/cn';

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Global Date State
  const { selectedDate, setSelectedDate, resetToToday } = useDateStore();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const today = startOfToday();

  useEffect(() => {
    // Theme initialization
    const dark = localStorage.getItem('theme') === 'dark' || 
                 (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);

    // Live Clock
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.valueAsDate) {
      setSelectedDate(e.target.valueAsDate);
    }
  };

  // Calculate relative date text (e.g., "Tomorrow", "+5 Days")
  const getRelativeDateText = () => {
    const diff = differenceInCalendarDays(selectedDate, today);
    
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "Yesterday";
    
    const sign = diff > 0 ? "+" : "";
    return `${sign}${diff} Days from Today`;
  };

  const relativeText = getRelativeDateText();
  const isToday = isSameDay(selectedDate, today);

  return (
    <header className="h-[80px] px-8 flex items-center justify-between">
      {/* Left: Date Picker & Navigation */}
      <div className="flex items-center gap-4">
        {/* Date Display (Clickable) */}
        <div 
          className="group relative cursor-pointer"
          onClick={() => dateInputRef.current?.showPicker()}
        >
          <div className="flex items-start gap-3">
            <div className={cn(
              "hidden md:flex p-3 rounded-2xl shadow-sm transition-colors",
              isToday 
                ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-100"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500"
            )}>
               <Calendar size={20} />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-foreground dark:text-white tracking-tight flex items-center gap-2 group-hover:text-brand-600 transition-colors">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                {/* Hidden Date Input */}
                <input 
                  ref={dateInputRef}
                  type="date" 
                  className="absolute inset-0 opacity-0 cursor-pointer -z-10"
                  onChange={handleDateChange}
                  value={format(selectedDate, 'yyyy-MM-dd')}
                />
              </h2>
              
              <p className={cn(
                "text-xs font-medium mt-0.5 flex items-center gap-1",
                isToday ? "text-brand-600 dark:text-brand-400" : "text-foreground-muted dark:text-foreground-muted-dark"
              )}>
                {isToday && <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"/>}
                {relativeText}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Today Button (Visible only if not today) */}
        {!isToday && (
          <button
            onClick={resetToToday}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-600 bg-brand-50 
                       dark:bg-brand-900/20 dark:text-brand-200 rounded-lg 
                       hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-all animate-fade-in"
          >
            <RotateCcw size={12} />
            Back to Today
          </button>
        )}
      </div>

      {/* Center: Live Time */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center">
        <span className="text-3xl font-black text-foreground/80 dark:text-white/80 tabular-nums tracking-tighter">
          {format(currentTime, 'h:mm')}
          <span className="text-sm font-medium text-foreground-muted ml-1 relative -top-1.5">
            {format(currentTime, 'a')}
          </span>
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground-muted hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-status-danger rounded-full border-2 border-white dark:border-background-dark"></span>
        </button>

        <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1" />

        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl flex items-center justify-center
                     bg-white dark:bg-background-paper-dark border border-gray-200 dark:border-gray-700
                     text-foreground-muted hover:text-brand-600 dark:hover:text-brand-400 
                     transition-all shadow-sm hover:shadow-md"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};