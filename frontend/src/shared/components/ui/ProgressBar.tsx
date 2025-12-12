import { cn } from '@/shared/utils/cn';

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
}
export const ProgressBar = ({ progress }: { progress: number }) => {
  // Smoother color transitions
  let colorClass = "bg-danger-500 dark:bg-danger-600";
  let bgClass = "bg-danger-50 dark:bg-danger-900/20";
  
  if (progress > 30 && progress <= 60) {
    colorClass = "bg-warning-500 dark:bg-warning-600";
    bgClass = "bg-warning-50 dark:bg-warning-900/20";
  } else if (progress > 60 && progress <= 85) {
    colorClass = "bg-info-500 dark:bg-info-600";
    bgClass = "bg-info-50 dark:bg-info-900/20";
  } else if (progress > 85) {
    colorClass = "bg-success-500 dark:bg-success-600";
    bgClass = "bg-success-50 dark:bg-success-900/20";
  }

  return (
    <div className={cn("w-full h-1.5 relative overflow-hidden transition-colors duration-500", bgClass)}>
      <div 
        className={cn(
          "h-full transition-all duration-700 ease-out",
          colorClass
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};