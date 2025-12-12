import React, { useState } from 'react';
import { CheckCircle2, Clock, Zap, Award } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Task } from '../types';
import { cn } from '@/shared/utils/cn';

interface TaskCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (actualTime: number) => void;
  task: Task;
}

export const TaskCompletionModal: React.FC<TaskCompletionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  task
}) => {
  // الافتراضي: الوقت المخطط له هو الوقت الفعلي (يمكن للمستخدم تعديله)
  const [actualTime, setActualTime] = useState(task.expectedTime);

  // حساب النقاط التقريبي (مجرد عرض)
  const calculatePoints = (time: number) => {
    let multiplier = 1;
    if (task.priority === 'urgent') multiplier = 2.0;
    if (task.priority === 'high') multiplier = 1.7;
    if (task.priority === 'medium') multiplier = 1.3;
    
    // معادلة بسيطة: (الوقت / 10) * الأولوية
    return Math.round((time / 10) * multiplier * 10) / 10;
  };

  const points = calculatePoints(actualTime);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-end sm:items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 animate-slide-in-up sm:animate-scale-in">
        
        {/* Header with Celebration Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400 shadow-sm animate-bounce">
            <CheckCircle2 size={36} strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Task Completed!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-1 px-4">
            "{task.name}"
          </p>
        </div>

        {/* Time Confirmation Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <Clock size={16} /> Planned Time
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">{task.expectedTime} min</span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Actual Time (minutes)
            </label>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActualTime(Math.max(5, actualTime - 5))}
                className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <div className="flex-1 text-center font-bold text-2xl text-brand-600 dark:text-brand-400">
                {actualTime}
              </div>
              <button 
                onClick={() => setActualTime(actualTime + 5)}
                className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Points Preview */}
        <div className="flex items-center justify-center gap-2 text-amber-500 font-bold text-lg mb-8">
          <Zap size={20} fill="currentColor" />
          <span>+{points} Points Earned</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => onConfirm(actualTime)} 
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20"
          >
            Confirm & Collect
          </Button>
        </div>

      </div>
    </div>
  );
};