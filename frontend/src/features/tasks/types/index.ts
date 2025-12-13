export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskType = 'regular' | 'big_task'; // Changed from 'project'

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
  
  // Time Blocking
  startTime?: string; // "HH:mm" 24h format
  endTime?: string;   // "HH:mm" 24h format
  
  priority: Priority;
  type: TaskType;
  done: boolean;
  
  /** Expected time in minutes (Calculated from start/end) */
  expectedTime: number;
  
  /** Actual time spent in minutes */
  actualTime?: number;
  
  /** Points earned upon completion */
  points: number;
  
  subTasks?: SubTask[];
  
  createdAt: number;
  completedAt?: number;
}