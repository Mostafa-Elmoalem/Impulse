import type { Task } from '@/features/tasks/types';

export interface DashboardStats {
  pendingTasks: number;
  completedTasks: number;
  totalFocusTime: number; // in minutes
  dailyScore: number;
  dailyTarget: number;
}

// Helper to get data directly (bypassing the async API for calculation)
const getLocalTasks = (): Task[] => {
  const data = localStorage.getItem('impulse_tasks_db');
  return data ? JSON.parse(data) : [];
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const tasks = getLocalTasks();
  const today = new Date().toISOString().split('T')[0];

  // Calculate stats dynamically from local data
  const pending = tasks.filter(t => !t.done).length;
  const completed = tasks.filter(t => t.done).length;
  
  // Calculate focus time (sum of expectedTime for completed tasks)
  const focusTime = tasks
    .filter(t => t.done)
    .reduce((acc, curr) => acc + (curr.expectedTime || 0), 0);

  // Calculate Score (Simple logic: 10 pts per task + bonus for priority)
  const score = tasks
    .filter(t => t.done)
    .reduce((acc, curr) => {
      let multiplier = 1;
      if (curr.priority === 'urgent') multiplier = 2;
      if (curr.priority === 'high') multiplier = 1.5;
      return acc + (10 * multiplier);
    }, 0);

  return {
    pendingTasks: pending,
    completedTasks: completed,
    totalFocusTime: focusTime,
    dailyScore: Math.round(score),
    dailyTarget: 100 // Hardcoded target for now
  };
};