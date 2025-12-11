import { cn } from '@/shared/utils/cn';

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
}

export const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  // Dynamic color logic based on percentage requirements
  let colorClass = "bg-danger-500";
  let bgClass = "bg-danger-50";
  
  if (progress > 30 && progress <= 60) {
    colorClass = "bg-warning-500";
    bgClass = "bg-warning-50";
  } else if (progress > 60 && progress <= 85) {
    colorClass = "bg-blue-500";
    bgClass = "bg-blue-50";
  } else if (progress > 85) {
    colorClass = "bg-success-500";
    bgClass = "bg-success-50";
  }

  return (
    <div className={cn("w-full h-1.5 relative overflow-hidden", bgClass, className)}>
      <div 
        className={cn("h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]", colorClass)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};