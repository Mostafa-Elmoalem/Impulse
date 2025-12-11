export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface SubTask {
  id: number;
  name: string;
  description?: string;
  priority?: Priority; // ✅ Use type
  done: boolean;
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  day: string; // ISO Date string
  priority: Priority; // ✅ Use type
  done: boolean;
  
    /** Expected time in minutes */
  expectedTime?: number;
  /** Start time (0-23 hour format) */
  startTime?: number;
  /** End time (0-23 hour format) */
  endTime?: number;
  points?: number;
  
  subTasks?: SubTask[];
}