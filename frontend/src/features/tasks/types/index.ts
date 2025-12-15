export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskType = 'regular' | 'big_task';

export interface SubTask {
  id: string;
  name: string;
  isCompleted: boolean;
  timeEstimate?: number;
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  day: string;
  
  // Planned Time
  startTime?: string; // "HH:mm"
  endTime?: string;   // "HH:mm"
  
  priority: Priority;
  type: TaskType;
  done: boolean;
  
  expectedTime: number; // minutes
  
  // Actual Performance
  actualTime?: number;      // minutes duration
  actualStartTime?: string; // [NEW] "HH:mm"
  actualEndTime?: string;   // [NEW] "HH:mm"
  
  points: number;
  subTasks?: SubTask[];
  
  createdAt: number;
  completedAt?: number;
}