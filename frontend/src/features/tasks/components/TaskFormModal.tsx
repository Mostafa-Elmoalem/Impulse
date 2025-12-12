import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus, Trash2, ListTodo, CheckSquare } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input, Textarea } from '@/shared/components/ui/Input';
import { useCreateTask, useUpdateTask } from '../hooks/useTasks';
import type { Task, Priority, TaskType } from '../types';
import { cn } from '@/shared/utils/cn';

// Zod Schema
const taskSchema = z.object({
  name: z.string().min(1, 'Task name is required'),
  description: z.string().optional(),
  day: z.string().min(1, 'Date is required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  type: z.enum(['regular', 'project']),
  expectedTime: z.number().min(5, 'Minimum 5 minutes'),
  subTasks: z.array(z.object({
    name: z.string().min(1, 'Subtask name required'),
    timeEstimate: z.number().optional()
  })).optional()
});

type TaskFormValues = z.infer<typeof taskSchema>;

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

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          name: task.name,
          description: task.description || '',
          day: task.day,
          priority: task.priority,
          type: task.type || 'regular',
          expectedTime: task.expectedTime || 60,
          subTasks: task.subTasks?.map(st => ({ name: st.name, timeEstimate: st.timeEstimate })) || []
        }
      : {
          day: initialDate ? initialDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          priority: 'medium',
          type: 'regular',
          expectedTime: 60,
          subTasks: []
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks"
  });

  const taskType = watch('type');
  const selectedPriority = watch('priority');

  const onSubmit = async (data: TaskFormValues) => {
    try {
      const formattedData: any = {
        ...data,
        subTasks: data.subTasks?.map(st => ({
          id: crypto.randomUUID(), // Generate ID for subtasks
          isCompleted: false,
          ...st
        }))
      };

      if (isEditing && task) {
        await updateTask.mutateAsync({ id: task.id, updates: formattedData });
      } else {
        await createTask.mutateAsync(formattedData);
      }
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-modal w-full max-w-lg max-h-[90vh] overflow-hidden animate-scale-in flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {isEditing ? 'Edit Task' : 'New Task'}
            <span className="text-sm font-normal text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
              {watch('expectedTime')}m
            </span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-6 scrollbar-hide flex-1">
          <form id="task-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Task Name */}
            <div className="space-y-4">
              <Input
                placeholder="What needs to be done?"
                {...register('name')}
                className="text-lg font-medium border-transparent px-0 rounded-none border-b border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-brand-500 bg-transparent placeholder:text-gray-400"
                autoFocus
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              
              <Textarea
                {...register('description')}
                placeholder="Add details, notes, or links..."
                className="resize-none min-h-[80px] bg-gray-50 dark:bg-gray-800/50 border-0 focus:ring-1 focus:ring-brand-500/20"
              />
            </div>

            {/* Task Type Switcher */}
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setValue('type', 'regular')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                  taskType === 'regular' 
                    ? "bg-white dark:bg-gray-700 shadow-sm text-brand-600 dark:text-white" 
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                )}
              >
                <CheckSquare size={16} /> Regular
              </button>
              <button
                type="button"
                onClick={() => setValue('type', 'project')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                  taskType === 'project' 
                    ? "bg-white dark:bg-gray-700 shadow-sm text-brand-600 dark:text-white" 
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                )}
              >
                <ListTodo size={16} /> Project
              </button>
            </div>

            {/* Config Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Date"
                type="date"
                {...register('day')}
                className="bg-white dark:bg-gray-900"
              />
              
              <Input
                label="Duration (min)"
                type="number"
                {...register('expectedTime', { valueAsNumber: true })}
                className="bg-white dark:bg-gray-900"
              />
            </div>

            {/* Priority Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority Level</label>
              <div className="grid grid-cols-4 gap-2">
                {(['low', 'medium', 'high', 'urgent'] as Priority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setValue('priority', p)}
                    className={cn(
                      "py-2 px-1 rounded-lg text-xs font-bold uppercase tracking-wider border-2 transition-all",
                      selectedPriority === p
                        ? p === 'urgent' ? "bg-red-500 border-red-500 text-white" 
                        : p === 'high' ? "bg-orange-500 border-orange-500 text-white"
                        : p === 'medium' ? "bg-amber-500 border-amber-500 text-white"
                        : "bg-emerald-500 border-emerald-500 text-white"
                        : "bg-transparent border-gray-200 dark:border-gray-800 text-gray-500 hover:border-gray-300"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Subtasks (Only if Project) */}
            {taskType === 'project' && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subtasks</label>
                  <button
                    type="button"
                    onClick={() => append({ name: '', timeEstimate: 15 })}
                    className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Step
                  </button>
                </div>
                
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center group">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1" />
                      <Input
                        {...register(`subTasks.${index}.name`)}
                        placeholder={`Step ${index + 1}`}
                        className="flex-1 h-9 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {fields.length === 0 && (
                    <p className="text-xs text-gray-400 italic text-center py-2">No subtasks yet.</p>
                  )}
                </div>
              </div>
            )}

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" form="task-form" isLoading={isSubmitting} className="shadow-lg shadow-brand-500/20">
            {isEditing ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </div>
    </div>
  );
};