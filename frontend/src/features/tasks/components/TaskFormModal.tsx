import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input, Textarea } from '@/shared/components/ui/Input';
import { useCreateTask, useUpdateTask } from '../hooks/useTasks';
import type { Task } from '../types';

const taskSchema = z.object({
  name: z.string().min(1, 'Task name is required').max(200, 'Name too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  day: z.string().min(1, 'Date is required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  expectedTime: z.number().min(1, 'Expected time must be at least 1 minute'),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task; // For editing existing task
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const isEditing = !!task;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          name: task.name,
          description: task.description || '',
          day: task.day,
          priority: task.priority as any,
          expectedTime: task.expectedTime || 60,
        }
      : {
          day: new Date().toISOString().split('T')[0],
          priority: 'medium',
          expectedTime: 60,
        },
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      if (isEditing) {
        await updateTask.mutateAsync({ id: task.id, updates: data });
      } else {
        await createTask.mutateAsync(data);
      }
      reset();
      onClose();
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Task Name"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Enter task name..."
            required
          />

          <Textarea
            label="Description (Optional)"
            {...register('description')}
            error={errors.description?.message}
            placeholder="Add more details about this task..."
            rows={3}
          />

          <Input
            label="Date"
            type="date"
            {...register('day')}
            error={errors.day?.message}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority <span className="text-danger-500">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['low', 'medium', 'high', 'urgent'].map((priority) => (
                <label
                  key={priority}
                  className="relative flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer hover:border-brand-500 transition-colors"
                >
                  <input
                    type="radio"
                    value={priority}
                    {...register('priority')}
                    className="sr-only peer"
                  />
                  <span className="text-sm font-medium capitalize peer-checked:text-brand-600">
                    {priority}
                  </span>
                  <div className="absolute inset-0 border-2 border-brand-500 rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity" />
                </label>
              ))}
            </div>
            {errors.priority && (
              <p className="text-danger-600 text-sm mt-1">{errors.priority.message}</p>
            )}
          </div>

          <Input
            label="Expected Time (minutes)"
            type="number"
            {...register('expectedTime', { valueAsNumber: true })}
            error={errors.expectedTime?.message}
            placeholder="60"
            required
          />

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting} fullWidth>
              {isEditing ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};