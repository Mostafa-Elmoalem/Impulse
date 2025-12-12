import React, { useState } from 'react';
import { Trash2, Edit2, Clock, Check, Calendar, ListTodo, Zap } from 'lucide-react'; // ✅ Added Zap here
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

  // Logic: When checking (Undone -> Done), show Modal. 
  // When unchecking (Done -> Undone), just toggle immediately.
  const handleCheckClick = () => {
    if (!task.done) {
      setShowCompletionModal(true);
    } else {
      toggleDone.mutate({ id: task.id, done: false });
    }
  };

  const handleConfirmCompletion = (actualTime: number) => {
    // Here we would ideally update the 'actualTime' and 'points' in the backend too
    toggleDone.mutate({ id: task.id, done: true });
    setShowCompletionModal(false);
  };

  const priorityStyles = {
    low: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-500/20' },
    medium: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20' },
    high: { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-500/20' },
    urgent: { bg: 'bg-red-500', text: 'text-white', border: 'border-red-600' },
  };

  const priority = priorityStyles[task.priority];

  return (
    <>
      <div className={cn(
        "group relative p-5 rounded-2xl transition-all duration-300 border",
        "bg-background-paper dark:bg-background-paper-dark",
        task.done 
          ? "border-transparent opacity-60 grayscale-[0.3]" 
          : "border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-900 shadow-soft hover:shadow-card hover:-translate-y-1"
      )}>
        <div className="flex items-start gap-4">
          <button
            onClick={handleCheckClick}
            className={cn(
              "mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
              task.done
                ? "bg-brand-500 border-brand-500 scale-110"
                : "border-gray-300 dark:border-gray-600 hover:border-brand-400 bg-gray-50 dark:bg-gray-800"
            )}
          >
            {task.done && <Check size={14} className="text-white" strokeWidth={3} />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className={cn(
                "text-base font-bold transition-all truncate pr-4",
                task.done ? "text-foreground-muted line-through decoration-2 decoration-gray-300" : "text-foreground dark:text-white"
              )}>
                {task.name}
              </h3>
              
              <div className="flex gap-2 shrink-0">
                {task.type === 'project' && (
                  <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border bg-purple-50 text-purple-600 border-purple-100">
                    Project
                  </span>
                )}
                <span className={cn(
                  "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border", 
                  priority.bg, priority.text, priority.border
                )}>
                  {task.priority}
                </span>
              </div>
            </div>

            {task.description && (
              <p className="text-sm text-foreground-muted dark:text-foreground-muted-dark line-clamp-1 mb-3 font-medium">
                {task.description}
              </p>
            )}

            {task.type === 'project' && task.subTasks && task.subTasks.length > 0 && (
               <div className="mb-3 pl-2 border-l-2 border-gray-100 dark:border-gray-700 space-y-1">
                 {task.subTasks.slice(0, 2).map((sub, idx) => (
                   <div key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                     {sub.name}
                   </div>
                 ))}
                 {task.subTasks.length > 2 && (
                   <div className="text-[10px] text-gray-400 pl-3.5">+ {task.subTasks.length - 2} more...</div>
                 )}
               </div>
            )}

            <div className="flex items-center gap-3 text-xs font-semibold text-foreground-muted dark:text-gray-500 mt-3">
               <div className="flex items-center gap-1.5 bg-background dark:bg-background-dark px-2.5 py-1.5 rounded-md border border-gray-100 dark:border-gray-800">
                  <Clock size={13} className="text-brand-500" />
                  <span>{task.expectedTime}m</span> 
               </div>
               
               <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="mb-0.5" />
                  <span>{format(new Date(task.day), 'MMM d')}</span>
               </div>
               
               {task.points && task.points > 0 && (
                 <span className="text-brand-600 dark:text-brand-400 font-bold ml-auto bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded-md flex items-center gap-1">
                   <Zap size={10} fill="currentColor" /> {task.points} pts
                 </span>
               )}
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          {onEdit && (
            <button onClick={() => onEdit(task)} className="p-2 text-gray-400 hover:text-brand-500 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
              <Edit2 size={14} />
            </button>
          )}
          <button onClick={() => deleteTask.mutate(task.id)} className="p-2 text-gray-400 hover:text-status-danger bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
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