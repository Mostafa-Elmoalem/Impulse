import { apiClient } from '@/shared/lib/api-client';
import type { Task } from '../types';

const BASE_URL = '/tasks';

export const getTasks = (): Promise<Task[]> => {
  return apiClient.get(BASE_URL);
};

export const createTask = (data: Partial<Task>): Promise<Task> => {
  return apiClient.post(BASE_URL, data);
};

export const updateTask = (id: number, updates: Partial<Task>): Promise<Task> => {
  return apiClient.put(`${BASE_URL}/${id}`, updates);
};

export const deleteTask = (id: number): Promise<void> => {
  return apiClient.delete(`${BASE_URL}/${id}`);
};