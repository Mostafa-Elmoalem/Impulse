import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Calendar, Bell, ChevronDown, RotateCcw, Search, Plus, X } from 'lucide-react';
import { format, isSameDay, differenceInCalendarDays, startOfToday } from 'date-fns';
import { useDateStore } from '@/shared/stores/useDateStore';
import { useUIStore } from '@/shared/stores/useUIStore';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/shared/components/ui/Button';

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
  // Stores
  const { selectedDate, setSelectedDate, resetToToday } = useDateStore();
  const { openTaskModal, searchQuery, setSearchQuery } = useUIStore();
  
  const dateInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const today = startOfToday();

  useEffect(() => {
    // Theme
    const dark = localStorage.getItem('theme') === 'dark' || 
                 (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);

    // Clock
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Focus input when search expands
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

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
    <header className="h-[80px] px-8 flex items-center justify-between gap-4">
      {/* 1. Left: Date Navigation */}
      <div className="flex items-center gap-4 min-w-fit">
        <div 
          className="group relative cursor-pointer"
          onClick={() => dateInputRef.current?.showPicker()}
        >
          <div className="flex items-center gap-3">
            {/* Calendar Icon Box */}
            <div className={cn(
              "hidden md:flex p-2.5 rounded-xl shadow-sm transition-all duration-300",
              isToday 
                ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-100 ring-2 ring-brand-100 dark:ring-brand-900/30"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}>
               <Calendar size={18} />
            </div>

            {/* Date Text */}
            <div>
              <h2 className="text-sm md:text-base font-bold text-foreground dark:text-white tracking-tight flex items-center gap-2 group-hover:text-brand-600 transition-colors">
                {format(selectedDate, 'EEEE, MMM d')}
                <ChevronDown size={14} className="text-gray-400 group-hover:text-brand-500 transition-transform group-hover:rotate-180" />
                
                {/* Hidden Native Input */}
                <input 
                  ref={dateInputRef}
                  type="date" 
                  className="absolute inset-0 opacity-0 cursor-pointer -z-10"
                  onChange={handleDateChange}
                  value={format(selectedDate, 'yyyy-MM-dd')}
                />
              </h2>
              
              <p className={cn(
                "text-xs font-medium mt-0.5 flex items-center gap-1.5",
                isToday ? "text-brand-600 dark:text-brand-400" : "text-foreground-muted dark:text-foreground-muted-dark"
              )}>
                {isToday && <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"/>}
                {relativeText}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Today Button */}
        {!isToday && (
          <button
            onClick={resetToToday}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-600 bg-brand-50 
                       dark:bg-brand-900/20 dark:text-brand-200 rounded-lg 
                       hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-all animate-fade-in"
          >
            <RotateCcw size={12} />
            Today
          </button>
        )}
      </div>

      {/* 2. Center: Live Time (Hidden if search expands on mobile) */}
      <div className={cn(
        "absolute left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center transition-opacity duration-300",
        isSearchExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <span className="text-3xl font-black text-foreground/80 dark:text-white/80 tabular-nums tracking-tighter">
          {format(currentTime, 'h:mm')}
          <span className="text-sm font-medium text-foreground-muted ml-1 relative -top-1.5">
            {format(currentTime, 'a')}
          </span>
        </span>
      </div>

      {/* 3. Right: Search & Actions */}
      <div className="flex items-center gap-3 justify-end flex-1 md:flex-none">
        
        {/* Expandable Search */}
        <div className={cn(
          "flex items-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden shadow-sm",
          isSearchExpanded ? "w-full md:w-64 px-3" : "w-10 h-10 justify-center border-transparent bg-transparent shadow-none"
        )}>
          <button 
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className={cn(
              "text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors",
              !isSearchExpanded && "p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Search size={20} />
          </button>
          
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "bg-transparent border-none outline-none text-sm ml-2 text-foreground dark:text-white placeholder:text-gray-400 w-full",
              !isSearchExpanded && "hidden"
            )}
            onBlur={() => !searchQuery && setIsSearchExpanded(false)}
          />
          
          {searchQuery && isSearchExpanded && (
            <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1 hidden md:block" />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl flex items-center justify-center
                     text-foreground-muted hover:bg-gray-100 dark:hover:bg-gray-800
                     transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Add Task Button (Primary Action) */}
        <Button 
          onClick={openTaskModal}
          size="sm"
          className="rounded-xl px-4 shadow-lg shadow-brand-500/20 hidden md:flex"
          leftIcon={<Plus size={18} />}
        >
          Add Task
        </Button>
        
        {/* Mobile Add Button (Icon Only) */}
        <button 
          onClick={openTaskModal}
          className="w-10 h-10 rounded-xl bg-brand-500 text-white flex md:hidden items-center justify-center shadow-lg shadow-brand-500/20 active:scale-95 transition-transform"
        >
          <Plus size={20} />
        </button>
      </div>
    </header>
  );
};