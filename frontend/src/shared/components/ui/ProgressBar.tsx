import { cn } from '@/shared/utils/cn';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  // تحديد الألوان بناءً على التقدم
  const getStyles = (p: number) => {
    if (p <= 30) return { 
      bar: 'bg-gradient-to-r from-red-400 to-red-500', 
      bg: 'bg-red-50 dark:bg-red-900/10',
      text: 'text-red-600 dark:text-red-400',
      bubble: 'bg-red-500 text-white',
      shadow: 'shadow-red-200 dark:shadow-none'
    };
    if (p <= 60) return { 
      bar: 'bg-gradient-to-r from-amber-400 to-amber-500', 
      bg: 'bg-amber-50 dark:bg-amber-900/10',
      text: 'text-amber-600 dark:text-amber-400',
      bubble: 'bg-amber-500 text-white',
      shadow: 'shadow-amber-200 dark:shadow-none'
    };
    if (p <= 85) return { 
      bar: 'bg-gradient-to-r from-blue-400 to-blue-600', 
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      text: 'text-blue-600 dark:text-blue-400',
      bubble: 'bg-blue-500 text-white',
      shadow: 'shadow-blue-200 dark:shadow-none'
    };
    return { 
      bar: 'bg-gradient-to-r from-emerald-400 to-emerald-500', 
      bg: 'bg-emerald-50 dark:bg-emerald-900/10',
      text: 'text-emerald-600 dark:text-emerald-400',
      bubble: 'bg-emerald-500 text-white',
      shadow: 'shadow-emerald-200 dark:shadow-none'
    };
  };

  const styles = getStyles(progress);

  // نضمن أن الفقاعة لا تخرج عن حدود الشاشة في البداية والنهاية
  const bubblePosition = Math.min(Math.max(progress, 5), 95);

  return (
    <div className="w-full pt-6 pb-2 relative group">
      {/* الخلفية الهادئة للشريط */}
      <div className={cn("w-full h-3 rounded-full overflow-visible relative transition-colors duration-500", styles.bg)}>
        
        {/* الشريط الملون المتحرك */}
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out relative shadow-sm",
            styles.bar,
            styles.shadow
          )}
          style={{ width: `${progress}%` }}
        >
          {/* تأثير لمعان خفيف جداً بدلاً من الموجات المزعجة */}
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-50" />
          
          {/* الفقاعة التي تتحرك مع الرقم */}
          <div 
            className={cn(
              "absolute -right-3 -top-8 px-2 py-1 rounded-lg text-[10px] font-bold shadow-md transition-all duration-500 transform",
              styles.bubble,
              "after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-current" // السهم الصغير تحت الفقاعة
            )}
          >
            {progress}%
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-80 mr-1 shadow-sm" />
        </div>
      </div>
    </div>
  );
};