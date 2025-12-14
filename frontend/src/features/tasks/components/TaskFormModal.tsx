import React, { useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'; // ✅ Added SubmitHandler
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react'; // ✅ Removed unused icons
import { Button } from '@/shared/components/ui/Button';
import { useCreateTask, useUpdateTask } from '../hooks/useTasks';
import type { Task } from '../types';
import { cn } from '@/shared/utils/cn';
import { format, addMinutes, differenceInMinutes, parse } from 'date-fns';

// Sub-components
import { TaskHeader } from './form/TaskHeader';
import { TaskScheduling } from './form/TaskScheduling';
import { TaskPriority } from './form/TaskPriority';
import { TaskSubtasks } from './form/TaskSubtasks';

// --- Validation Schema ---
const taskSchema = z.object({
  name: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  day: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time required'),
  endTime: z.string().min(1, 'End time required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  type: z.enum(['regular', 'big_task']),
  subTasks: z.array(z.object({
    name: z.string().optional(), 
    isCompleted: z.boolean().default(false)
  })).optional()
});

export type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  initialDate?: Date;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  task,
  initialDate
}) => {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const isEditing = !!task;

  const now = new Date();
  const defaultStart = format(now, 'HH:00');
  const defaultEnd = format(addMinutes(now, 60), 'HH:00');

  const methods = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema) as any, // ✅ Cast to any to bypass strict type check conflict
    defaultValues: {
      name: '',
      description: '',
      day: format(new Date(), 'yyyy-MM-dd'),
      priority: 'medium',
      type: 'regular',
      startTime: defaultStart,
      endTime: defaultEnd,
      subTasks: []
    },
  });

  const { reset, handleSubmit, setValue, watch } = methods;
  const taskType = watch('type');

  // Load task data when editing
  useEffect(() => {
    if (isOpen) {
      if (task) {
        reset({
          name: task.name,
          description: task.description || '',
          day: task.day,
          priority: task.priority,
          type: task.type || 'regular',
          startTime: task.startTime || defaultStart,
          endTime: task.endTime || defaultEnd,
          subTasks: task.subTasks?.map(st => ({ name: st.name, isCompleted: st.isCompleted })) || []
        });
      } else {
        reset({
          name: '',
          description: '',
          day: initialDate ? format(initialDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
          priority: 'medium',
          type: 'regular',
          startTime: defaultStart,
          endTime: defaultEnd,
          subTasks: []
        });
      }
    }
  }, [isOpen, task, initialDate, reset]); // Removed defaultStart/End from deps to avoid loop

  const calculateDuration = (start: string, end: string) => {
    try {
      const s = parse(start, 'HH:mm', new Date());
      const e = parse(end, 'HH:mm', new Date());
      let diff = differenceInMinutes(e, s);
      if (diff < 0) diff += 1440;
      return diff;
    } catch { return 60; }
  };

  const onSubmit: SubmitHandler<TaskFormValues> = async (data) => {
    try {
      // Filter empty subtasks
      const validSubTasks = data.subTasks
        ?.filter(st => st.name && st.name.trim().length > 0)
        .map(st => ({
          id: crypto.randomUUID(),
          isCompleted: false,
          name: st.name!
        }));

      const formattedData: any = {
        ...data,
        expectedTime: calculateDuration(data.startTime, data.endTime),
        subTasks: validSubTasks
      };

      if (isEditing && task) {
        await updateTask.mutateAsync({ id: task.id, updates: formattedData });
      } else {
        await createTask.mutateAsync(formattedData);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-scale-in flex flex-col border border-gray-100 dark:border-gray-800">
        
        {/* Modal Header */}
        <div className="flex items-center justify-end px-4 py-3">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 pb-6 scrollbar-hide flex-1">
          <FormProvider {...methods}>
            <form id="task-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <TaskHeader />
              <TaskScheduling />
              <TaskPriority />

              <div className="pt-2">
                 <div className="flex items-center gap-4 mb-4">
                    <button
                       type="button"
                       onClick={() => setValue('type', 'regular')}
                       className={cn(
                         "flex items-center gap-2 text-sm font-semibold transition-colors",
                         taskType === 'regular' ? "text-gray-900 dark:text-white" : "text-gray-400 hover:text-gray-600"
                       )}
                    >
                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center", taskType === 'regular' ? "border-brand-600" : "border-gray-300")}>
                         {taskType === 'regular' && <div className="w-2 h-2 bg-brand-600 rounded-full" />}
                      </div>
                      Regular Task
                    </button>

                    <button
                       type="button"
                       onClick={() => setValue('type', 'big_task')}
                       className={cn(
                         "flex items-center gap-2 text-sm font-semibold transition-colors",
                         taskType === 'big_task' ? "text-purple-600" : "text-gray-400 hover:text-gray-600"
                       )}
                    >
                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center", taskType === 'big_task' ? "border-purple-600" : "border-gray-300")}>
                         {taskType === 'big_task' && <div className="w-2 h-2 bg-purple-600 rounded-full" />}
                      </div>
                      Big Task
                    </button>
                 </div>

                 {taskType === 'big_task' && <TaskSubtasks />}
              </div>

            </form>
          </FormProvider>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
          <span className="text-xs text-gray-400 font-medium hidden sm:block">
            {taskType === 'big_task' ? 'Press Enter to add next step' : ''}
          </span>
          <div className="flex gap-3 w-full sm:w-auto justify-end">
            <Button variant="ghost" onClick={onClose} size="sm" className="text-gray-500">Cancel</Button>
            <Button 
              type="submit" 
              form="task-form" 
              isLoading={methods.formState.isSubmitting} 
              size="sm" 
              className="px-8 shadow-lg shadow-brand-500/20 rounded-xl"
            >
              {isEditing ? 'Save' : 'Create'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};