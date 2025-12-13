import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Calendar, Search, Plus, X, ChevronDown, RotateCcw, Menu } from 'lucide-react';
import { format, isSameDay, differenceInCalendarDays, startOfToday } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDateStore } from '@/shared/stores/useDateStore';
import { useUIStore } from '@/shared/stores/useUIStore';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/shared/components/ui/Button';

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
  const { selectedDate, setSelectedDate, resetToToday } = useDateStore();
  const { openTaskModal, searchQuery, setSearchQuery, toggleSidebar } = useUIStore();
  
  const dateInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const today = startOfToday();
  const navigate = useNavigate();

  useEffect(() => {
    const dark = localStorage.getItem('theme') === 'dark' || 
                 (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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

  const handleAddTask = () => {
    navigate('/tasks');
    openTaskModal();
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
    <header className="h-[72px] px-4 md:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 
                       bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl 
                       border-b border-gray-200/80 dark:border-gray-800/80 transition-all supports-[backdrop-filter]:bg-white/60">
      
      {/* 1. Left: Menu & Date */}
      <div className="flex items-center gap-3 min-w-fit">
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu size={22} />
        </button>

        {/* Logo (Mobile) - Only show if sidebar is closed otherwise it duplicates */}
        <div className="md:hidden flex items-center gap-2">
           <img src="/public/logo.webp" alt="Impulse Logo" className="w-8 h-8 object-contain" />
        </div>

        {/* Date Picker */}
        <div 
          className="group relative cursor-pointer flex items-center gap-3 select-none"
          onClick={() => dateInputRef.current?.showPicker()}
        >
          <div className={cn(
            "hidden md:flex p-2 rounded-lg shadow-sm transition-all duration-200 border",
            isToday 
              ? "bg-brand-50 border-brand-200 text-brand-600 dark:bg-brand-900/20 dark:border-brand-900/30 dark:text-brand-100"
              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          )}>
             <Calendar size={18} />
          </div>

          <div>
            <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2 group-hover:text-brand-600 transition-colors">
              {format(selectedDate, 'EEEE, MMM d')}
              <ChevronDown size={14} className="text-gray-400 group-hover:text-brand-500 transition-transform group-hover:rotate-180" />
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
              isToday ? "text-brand-600 dark:text-brand-400" : "text-gray-500 dark:text-gray-400"
            )}>
              {isToday && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>}
              {relativeText}
            </p>
          </div>
        </div>

        {!isToday && (
          <button
            onClick={resetToToday}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-100
                       dark:bg-brand-900/20 dark:text-brand-200 dark:border-brand-900/30 rounded-md
                       hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-all animate-fade-in"
          >
            <RotateCcw size={12} />
            Today
          </button>
        )}
      </div>

      {/* 2. Center: Live Time (Hidden on small screens) */}
      <div className={cn(
        "absolute left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center transition-opacity duration-300",
        isSearchExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <span className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums tracking-tight font-mono">
          {format(currentTime, 'h:mm')}
          <span className="text-sm font-sans font-medium text-gray-400 ml-1 relative -top-1">
            {format(currentTime, 'a')}
          </span>
        </span>
      </div>

      {/* 3. Right: Search & Actions */}
      <div className="flex items-center gap-2 md:gap-3 justify-end flex-1 md:flex-none">
        
        {/* Expandable Search */}
        <div className={cn(
          "flex items-center bg-white dark:bg-gray-800 rounded-lg border transition-all duration-300 overflow-hidden",
          isSearchExpanded 
            ? "w-full md:w-64 px-2 border-brand-500 ring-1 ring-brand-500/20 shadow-sm" 
            : "w-9 h-9 justify-center border-transparent bg-transparent shadow-none"
        )}>
          <button 
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className={cn(
              "text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors",
              !isSearchExpanded && "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Search size={18} />
          </button>
          
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "bg-transparent border-none outline-none text-sm ml-2 text-gray-900 dark:text-white placeholder:text-gray-400 w-full",
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

        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg flex items-center justify-center
                     text-gray-500 border border-transparent hover:border-gray-200 hover:bg-gray-50 
                     dark:hover:bg-gray-800 dark:hover:border-gray-700
                     transition-all"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Button 
          onClick={handleAddTask}
          size="sm"
          className="rounded-lg px-4 shadow-md shadow-brand-500/20 hidden md:flex font-semibold"
          leftIcon={<Plus size={16} />}
        >
          Add Task
        </Button>
        
        <button 
          onClick={handleAddTask}
          className="w-9 h-9 rounded-lg bg-brand-600 text-white flex md:hidden items-center justify-center shadow-md active:scale-95 transition-transform"
        >
          <Plus size={20} />
        </button>
      </div>
    </header>
  );
};