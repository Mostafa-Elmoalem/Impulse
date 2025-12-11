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

export const TaskItem = React.memo<TaskItemProps>(
  ({ task, onEdit }) => {
    const toggleDone = useToggleTaskDone();
    const deleteTask = useDeleteTask();

    const handleToggle = () => {
      toggleDone.mutate({ id: task.id, done: !task.done });
    };

    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this task?')) {
        deleteTask.mutate(task.id);
      }
    };

    const priorityColors = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-warning-100 text-warning-700',
      urgent: 'bg-danger-100 text-danger-700',
    };
    const isDeleting = deleteTask.isPending; // ✅ Add this
    const isToggling = toggleDone.isPending; // ✅ Add this

    return (
      <div
        className={cn(
          'p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition-all duration-200',
          task.done && 'opacity-60 bg-gray-50',
          isDeleting && 'opacity-50 pointer-events-none'
        )}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={handleToggle}
            disabled={isToggling}
            className={cn(
              'mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
              task.done
                ? 'bg-success-500 border-success-500'
                : 'border-gray-300 hover:border-brand-500',
                isToggling && 'cursor-wait'
            )}
          >
            {task.done && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                'font-semibold text-gray-900',
                task.done && 'line-through text-gray-500'
              )}
            >
              {task.name}
            </h3>

            {task.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {/* Priority Badge */}
              <span
                className={cn(
                  'px-2 py-1 text-xs font-medium rounded-full',
                  priorityColors[task.priority as keyof typeof priorityColors] ||
                    priorityColors.low
                )}
              >
                {task.priority}
              </span>

              {/* Expected Time */}
              {task.expectedTime && (
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={14} />
                  {Math.round(task.expectedTime / 60)}h {task.expectedTime % 60}m
                </span>
              )}

              {/* Date */}
              <span className="text-xs text-gray-500">
                  {task.day ? format(new Date(task.day), 'MMM d, yyyy') : 'No date'}              </span>

              {/* Points */}
              {task.points !== undefined && (
                <span className="text-xs font-semibold text-brand-600">
                  +{task.points} pts
                </span>
              )}

              {/* Subtasks Count */}
              {task.subTasks && task.subTasks.length > 0 && (
                <span className="text-xs text-gray-500">
                  {task.subTasks.filter((st) => st.done).length}/{task.subTasks.length}{' '}
                  subtasks
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {onEdit && (
              <button
                onClick={() => onEdit(task)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-brand-600"
                title="Edit task"
              >
                <Edit2 size={16} />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-danger-50 rounded-lg transition-colors text-gray-600 hover:text-danger-600"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  },
  (prev, next) =>
    prev.task.id === next.task.id &&
    prev.task.done === next.task.done &&
    prev.task.name === next.task.name
);

TaskItem.displayName = 'TaskItem';