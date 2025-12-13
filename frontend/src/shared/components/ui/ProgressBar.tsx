import { cn } from '@/shared/utils/cn';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  // Cap visual width to 100% so it doesn't overflow the container visually
  const visualWidth = Math.min(100, progress);
  
  // Is this a legendary achievement?
  const isOverachiever = progress > 100;

  const getStyles = (p: number) => {
    // --- 1. Traffic Light / Progression Stages (< 100%) ---
    if (p <= 30) return { 
      bar: 'bg-gradient-to-r from-red-500 to-red-600', 
      bg: 'bg-red-50 dark:bg-red-900/10',
      bubble: 'bg-red-500 text-white shadow-red-200 dark:shadow-none',
      shadow: 'shadow-sm'
    };
    if (p <= 60) return { 
      bar: 'bg-gradient-to-r from-amber-400 to-amber-500', 
      bg: 'bg-amber-50 dark:bg-amber-900/10',
      bubble: 'bg-amber-500 text-white shadow-amber-200 dark:shadow-none',
      shadow: 'shadow-sm'
    };
    if (p <= 85) return { 
      bar: 'bg-gradient-to-r from-blue-500 to-blue-600', 
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      bubble: 'bg-blue-600 text-white shadow-blue-200 dark:shadow-none',
      shadow: 'shadow-sm'
    };
    if (p <= 100) return { 
      bar: 'bg-gradient-to-r from-emerald-400 to-emerald-600', 
      bg: 'bg-emerald-50 dark:bg-emerald-900/10',
      bubble: 'bg-emerald-600 text-white shadow-emerald-200 dark:shadow-none',
      shadow: 'shadow-sm'
    };
    
    // --- 2. LEGENDARY MODE (> 100%) ---
    return { 
      // تدرج لوني أسطوري (بنفسجي إلى ذهبي) + أنيميشن
      bar: 'bg-[length:200%_100%] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-400 animate-shimmer shadow-[0_0_15px_rgba(168,85,247,0.6)]', 
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      bubble: 'bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white border border-white/20 shadow-lg shadow-purple-500/40',
      shadow: '' 
    };
  };

  const styles = getStyles(progress);

  return (
    <div className="w-full pt-6 pb-2 relative group isolate">
      {/* Track */}
      <div className={cn("w-full h-3 rounded-full overflow-visible relative transition-colors duration-500", styles.bg)}>
        
        {/* Bar */}
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out relative",
            styles.bar,
            styles.shadow
          )}
          style={{ width: `${visualWidth}%` }}
        >
          {/* Glass Shine (Common) */}
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-50" />
          
          {/* Special Texture for > 100% */}
          {isOverachiever && (
             <div className="absolute inset-0 w-full h-full" 
                  style={{
                    backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
                    backgroundSize: '1rem 1rem'
                  }} 
             />
          )}

          {/* Indicator Bubble */}
          <div 
            className={cn(
              "absolute -right-4 -top-9 px-2.5 py-1 rounded-xl text-[11px] font-bold shadow-md transition-all duration-500 transform z-20 flex items-center gap-1",
              styles.bubble,
              "after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-current"
            )}
          >
            {isOverachiever && <span className="animate-pulse">🔥</span>}
            {progress}%
          </div>

          {/* End Dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-80 mr-1 shadow-sm" />
        </div>
      </div>
    </div>
  );
};