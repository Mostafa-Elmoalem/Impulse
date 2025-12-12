export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskType = 'regular' | 'project';

export interface SubTask {
  id: string;
  name: string;
  isCompleted: boolean;
  timeEstimate?: number; // minutes
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  day: string; // ISO Date string
  priority: Priority;
  type: TaskType;
  done: boolean;
  
  /** Expected time in minutes (Planned) */
  expectedTime: number;
  /** Actual time spent in minutes (tracked or confirmed) */
  actualTime?: number;
  
  /** Points earned upon completion */
  points: number;
  
  subTasks?: SubTask[];
  
  createdAt: number; // Timestamp
  completedAt?: number; // Timestamp
}