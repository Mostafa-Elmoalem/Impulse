import type { Task } from '@/features/tasks/types';

export interface DashboardStats {
  pendingTasks: number;
  completedTasks: number;
  totalFocusTime: number; // in minutes
  dailyScore: number;
  dailyTarget: number;
}

// Helper to get data directly
const getLocalTasks = (): Task[] => {
  const data = localStorage.getItem('impulse_tasks_db');
  return data ? JSON.parse(data) : [];
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const tasks = getLocalTasks();

  const pending = tasks.filter(t => !t.done).length;
  const completed = tasks.filter(t => t.done).length;
  
  // Calculate focus time (sum of actualTime if available, else expectedTime)
  const focusTime = tasks
    .filter(t => t.done)
    .reduce((acc, curr) => acc + (curr.actualTime || curr.expectedTime || 0), 0);

  // ✅ CORRECT LOGIC: Sum the ACTUAL saved points
  const score = tasks
    .filter(t => t.done)
    .reduce((acc, curr) => acc + (curr.points || 0), 0);

  return {
    pendingTasks: pending,
    completedTasks: completed,
    totalFocusTime: focusTime,
    dailyScore: Math.round(score * 10) / 10,
    dailyTarget: 100 // Target from document
  };
};