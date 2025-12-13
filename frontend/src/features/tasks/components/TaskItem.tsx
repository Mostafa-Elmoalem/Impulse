import React, { useState } from 'react';
import { Trash2, Edit2, Clock, Check, Calendar, Zap, AlignLeft } from 'lucide-react';
import { Task } from '../types';
import { useToggleTaskDone, useDeleteTask } from '../hooks/useTasks';
import { cn } from '@/shared/utils/cn';
import { format } from 'date-fns';
import { TaskCompletionModal } from './TaskCompletionModal';

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

export const TaskItem = React.memo(({ task, onEdit }: TaskItemProps) => {
  const toggleDone = useToggleTaskDone();
  const deleteTask = useDeleteTask();
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const handleCheckClick = () => {
    if (!task.done) {
      setShowCompletionModal(true);
    } else {
      toggleDone.mutate({ id: task.id, done: false });
    }
  };

  const handleConfirmCompletion = () => {
    toggleDone.mutate({ id: task.id, done: true });
    setShowCompletionModal(false);
  };

  // --- Styles Logic ---
  const getPriorityStyles = () => {
    if (task.done) return { 
      border: 'border-l-gray-300', 
      bg: 'bg-gray-50', 
      badge: 'text-gray-500 bg-gray-100' 
    };
    
    switch (task.priority) {
      case 'urgent': return { border: 'border-l-red-600', bg: 'bg-white', badge: 'text-red-700 bg-red-50' }; 
      case 'high': return { border: 'border-l-orange-500', bg: 'bg-white', badge: 'text-orange-700 bg-orange-50' };
      case 'medium': return { border: 'border-l-blue-500', bg: 'bg-white', badge: 'text-blue-700 bg-blue-50' };
      case 'low': default: return { border: 'border-l-emerald-500', bg: 'bg-white', badge: 'text-emerald-700 bg-emerald-50' };
    }
  };

  const styles = getPriorityStyles();

  // Format Time Block Display
  const timeDisplay = task.startTime && task.endTime 
    ? `${task.startTime} - ${task.endTime}` 
    : `${task.expectedTime}m`;

  return (
    <>
      <div className={cn(
        "group relative p-4 rounded-lg transition-all duration-200 ease-out",
        "border border-gray-200 dark:border-gray-800",
        "border-l-[4px]",
        styles.border,
        styles.bg,
        "dark:bg-background-paper-dark dark:hover:bg-gray-800/60",
        !task.done && "hover:shadow-md hover:-translate-y-[1px]",
        task.done && "opacity-70 grayscale-[0.5]"
      )}>
        
        <div className="flex items-start gap-3.5">
          
          <button
            onClick={handleCheckClick}
            className={cn(
              "mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 shrink-0",
              task.done ? "bg-brand-600 border-brand-600" : "border-gray-300 bg-white hover:border-brand-500 dark:border-gray-600 dark:bg-transparent"
            )}
          >
            {task.done && <Check size={12} className="text-white" strokeWidth={3} />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1.5">
              <h3 className={cn("text-sm sm:text-base font-semibold transition-all truncate pr-3 text-gray-900 dark:text-gray-100", task.done && "text-gray-500 line-through")}>
                {task.name}
              </h3>
              
              <div className="flex gap-2 shrink-0">
                {task.type === 'big_task' && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:border-purple-800 dark:text-purple-300">
                    Big Task
                  </span>
                )}
                <span className={cn("px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border", styles.badge, "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700")}>
                  {task.priority}
                </span>
              </div>
            </div>

            {task.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-2.5 font-normal">
                {task.description}
              </p>
            )}

            {task.type === 'big_task' && task.subTasks && task.subTasks.length > 0 && (
               <div className="mb-3 pl-3 border-l-2 border-purple-100 dark:border-gray-700 space-y-1">
                 {task.subTasks.slice(0, 3).map((sub, idx) => (
                   <div key={idx} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                     <div className={cn("w-1.5 h-1.5 rounded-full", sub.isCompleted ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600")} />
                     <span className={cn(sub.isCompleted && "line-through opacity-60")}>{sub.name}</span>
                   </div>
                 ))}
                 {task.subTasks.length > 3 && (
                   <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium pl-3.5 block pt-0.5">
                     + {task.subTasks.length - 3} more items...
                   </span>
                 )}
               </div>
            )}

            <div className="flex items-center gap-4 mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
               <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-mono tracking-tight">{timeDisplay}</span> 
               </div>
               
               {task.points > 0 && (
                 <span className="ml-auto flex items-center gap-1 font-bold text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-1.5 py-0.5 rounded border border-brand-100 dark:border-brand-800">
                   <Zap size={12} fill="currentColor" /> {task.points} pts
                 </span>
               )}
            </div>
          </div>
        </div>

        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onEdit && (
            <button onClick={() => onEdit(task)} className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
              <Edit2 size={14} />
            </button>
          )}
          <button onClick={() => deleteTask.mutate(task.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <TaskCompletionModal 
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onConfirm={handleConfirmCompletion}
        task={task}
      />
    </>
  );
});