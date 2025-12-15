import React, { useState } from 'react';
import { Trash2, Edit2, Clock, Check, Zap, CalendarClock, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';
import { Task } from '../types';
import { useDeleteTask, useUpdateTask } from '../hooks/useTasks';
import { useUIStore } from '@/shared/stores/useUIStore';
import { cn } from '@/shared/utils/cn';
import { parse, format, isValid } from 'date-fns';

interface BigTaskViewProps {
  task: Task;
  onEdit?: (task: Task) => void;
  className?: string;
}

export const BigTaskView = React.memo(({ task, onEdit, className }: BigTaskViewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();
  const setTaskToComplete = useUIStore((state) => state.setTaskToComplete);

  const subTasks = task.subTasks || [];
  const completedCount = subTasks.filter(st => st.isCompleted).length;
  const totalCount = subTasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;

  const handleSubtaskToggle = (subTaskId: string, currentStatus: boolean) => {
    const updatedSubtasks = subTasks.map(st => 
      st.id === subTaskId ? { ...st, isCompleted: !currentStatus } : st
    );
    
    updateTask.mutate({ id: task.id, updates: { subTasks: updatedSubtasks } });

    const willBeAllCompleted = updatedSubtasks.every(st => st.isCompleted);
    if (willBeAllCompleted && !task.done) {
        setTaskToComplete({ ...task, subTasks: updatedSubtasks }); 
    }
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return '';
    const date = parse(timeStr, 'HH:mm', new Date());
    return isValid(date) ? format(date, 'h:mm a') : timeStr;
  };

  const getPriorityStyles = () => {
    switch (task.priority) {
      case 'urgent': return 'text-red-700 bg-red-50 border-red-100 dark:text-red-400 dark:bg-red-900/20 dark:border-red-900/30';
      case 'high': return 'text-orange-700 bg-orange-50 border-orange-100 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-900/30';
      case 'medium': return 'text-blue-700 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-900/30';
      case 'low': default: return 'text-emerald-700 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/20 dark:border-emerald-900/30';
    }
  };

  return (
    <div className={cn(
      "group relative flex flex-col rounded-xl transition-all duration-300 border h-fit",
      "bg-purple-50/40 dark:bg-purple-900/5 hover:bg-purple-50/70 dark:hover:bg-purple-900/10",
      "border-purple-200 dark:border-purple-800/50",
      isAllCompleted && "opacity-75 grayscale-[0.2]",
      className
    )}>
      
      {/* 1. Header */}
      <div className="p-4 pb-2 cursor-pointer select-none" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 overflow-hidden w-full">
            {/* Icon */}
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
              isAllCompleted 
                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
            )}>
              {isAllCompleted ? <CheckCircle2 size={20} /> : <Layers size={20} />}
            </div>

            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              {/* Title & Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate max-w-[200px]">
                  {task.name}
                </h3>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border border-purple-200 text-purple-700 bg-white/50 dark:bg-black/20 dark:border-purple-800 dark:text-purple-300">
                  Project
                </span>
                <span className={cn("px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border", getPriorityStyles())}>
                  {task.priority}
                </span>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">{completedCount}/{totalCount} Steps</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                   <Zap size={12} fill="currentColor" /> {task.points} pts
                </div>
              </div>
            </div>
          </div>

          <div className="p-1 text-purple-400 dark:text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full h-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 transition-all duration-500 ease-out rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      {/* 2. Time Block */}
      <div className="px-4 pb-3 flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-transparent">
         <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-400" />
            <span className="font-mono text-gray-600 dark:text-gray-300">
              {task.startTime ? formatTime(task.startTime) : '--:--'}
              <span className="mx-1 text-gray-300">-</span>
              {task.endTime ? formatTime(task.endTime) : '--:--'}
            </span>
            <span className="bg-white/50 dark:bg-black/20 px-1.5 rounded text-gray-500 border border-gray-100 dark:border-gray-800">
              {task.expectedTime}m
            </span>
         </div>

         {task.done && task.actualStartTime && (
           <div className="flex items-center gap-1.5 text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/10 px-2 py-0.5 rounded-md border border-brand-100 dark:border-brand-900/30 ml-auto sm:ml-0">
              <CalendarClock size={14} />
              <span className="font-mono font-semibold">
                {formatTime(task.actualStartTime)}
                <span className="opacity-40 mx-1">-</span>
                {formatTime(task.actualEndTime)}
              </span>
              <span className="font-bold ml-1">({task.actualTime}m)</span>
           </div>
         )}
      </div>

      {/* 3. Subtasks List */}
      {isOpen && (
        <div className="px-4 pb-4 pt-2 animate-fade-in border-t border-purple-100/50 dark:border-purple-800/30">
          <div className="space-y-1.5">
            {subTasks.map((sub) => (
              <div 
                key={sub.id} 
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/60 dark:hover:bg-white/5 transition-colors cursor-pointer group/sub border border-transparent hover:border-purple-100 dark:hover:border-purple-900/30"
                onClick={(e) => { e.stopPropagation(); handleSubtaskToggle(sub.id, sub.isCompleted); }}
              >
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0",
                  sub.isCompleted 
                    ? "bg-purple-500 border-purple-500" 
                    : "border-purple-300 dark:border-purple-700 bg-white dark:bg-transparent group-hover/sub:border-purple-500"
                )}>
                  {sub.isCompleted && <Check size={10} className="text-white" strokeWidth={3} />}
                </div>
                
                {/* Task Name */}
                <span className={cn(
                  "text-sm font-medium transition-colors flex-1",
                  sub.isCompleted ? "text-gray-400 line-through decoration-purple-300" : "text-gray-700 dark:text-gray-200"
                )}>
                  {sub.name}
                </span>

                {/* ✅ Task Time Estimate Display */}
                {sub.timeEstimate && (
                  <span className={cn(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded",
                    sub.isCompleted ? "text-gray-300 bg-transparent" : "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                  )}>
                    {sub.timeEstimate}m
                  </span>
                )}
              </div>
            ))}
            
            {subTasks.length === 0 && (
              <p className="text-xs text-center text-gray-400 italic py-2">No subtasks added.</p>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="absolute top-3 right-12 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {onEdit && <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-white/80 dark:hover:bg-purple-900/30 rounded-md transition-colors"><Edit2 size={14} /></button>}
        <button onClick={(e) => { e.stopPropagation(); deleteTask.mutate(task.id); }} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-white/80 dark:hover:bg-red-900/30 rounded-md transition-colors"><Trash2 size={14} /></button>
      </div>

    </div>
  );
});