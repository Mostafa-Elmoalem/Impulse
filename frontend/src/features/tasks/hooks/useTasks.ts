import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, updateTask, deleteTask } from '../api/taskApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { toast } from 'sonner';
import type { Task } from '../types';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD_STATS });
      toast.success('Task created successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create task');
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Task> }) =>
      updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD_STATS });
      toast.success('Task updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update task');
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD_STATS });
      toast.success('Task deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete task');
    },
  });
};

export const useToggleTaskDone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, done }: { id: number; done: boolean }) =>
      updateTask(id, { done }),
    onMutate: async ({ id, done }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.TASKS });
      
      const previousTasks = queryClient.getQueryData<Task[]>(QUERY_KEYS.TASKS);
      
      queryClient.setQueryData<Task[]>(QUERY_KEYS.TASKS, (old) =>
        old?.map((task) => (task.id === id ? { ...task, done } : task))
      );
      
      return { previousTasks };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousTasks) {
        queryClient.setQueryData(QUERY_KEYS.TASKS, context.previousTasks);
      }
      toast.error('Failed to update task');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD_STATS });
    },
  });
};