import React from 'react';
import { Trash2, Edit2, Clock, MoreVertical } from 'lucide-react';
import { Task } from '../types';
import { useToggleTaskDone, useDeleteTask } from '../hooks/useTasks';
import { cn } from '@/shared/utils/cn';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';



interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
}
export const TaskItem = React.memo(({ task, onEdit }) => {
  const toggleDone = useToggleTaskDone();
  const deleteTask = useDeleteTask();

  
  const priorityColors = {
    low: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    medium: 'bg-info-100 dark:bg-info-900/30 text-info-700 dark:text-info-400',
    high: 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400',
    urgent: 'bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400',
  };

  return (
    <div className={cn(
      "p-4 rounded-xl transition-all duration-200",
      "bg-white dark:bg-gray-900",
      "border border-gray-200 dark:border-gray-800",
      "hover:shadow-card-hover hover:-translate-y-0.5",
      task.done && "opacity-60"
    )}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => toggleDone.mutate({ id: task.id, done: !task.done })}
          className={cn(
            "mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center",
            "transition-all duration-200 shrink-0",
            task.done
              ? "bg-success-500 border-success-500"
              : "border-gray-300 dark:border-gray-600 hover:border-brand-500 dark:hover:border-brand-400"
          )}
        >
          {task.done && (
            <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" 
                 strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-semibold text-gray-900 dark:text-white",
            task.done && "line-through text-gray-500 dark:text-gray-600"
          )}>
            {task.name}
          </h3>

          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {/* Priority Badge */}
            <span className={cn(
              "px-2.5 py-1 text-xs font-medium rounded-full",
              priorityColors[task.priority]
            )}>
              {task.priority}
            </span>

            {/* Time */}
            {task.expectedTime && (
              <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Clock size={14} />
                {Math.floor(task.expectedTime / 60)}h {task.expectedTime % 60}m
              </span>
            )}

            {/* Date */}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {format(new Date(task.day), 'MMM d')}
            </span>

            {/* Points */}
            {task.points && (
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                +{task.points} pts
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="p-2 rounded-lg text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Edit2 size={16} />
            </button>
          )}
          <button
            onClick={() => deleteTask.mutate(task.id)}
            className="p-2 rounded-lg text-gray-400 hover:text-danger-600 dark:hover:text-danger-400 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
});