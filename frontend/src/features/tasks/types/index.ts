export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// Matches backend SubTask.java
export interface SubTask {
  id: number;
  name: string;
  description?: string;
  priority?: string;
  done: boolean;
}

// Matches backend Task.java
export interface Task {
  id: number;
  name: string; // Backend uses 'name', not 'title'
  description?: string;
  day: string; // ISO Date string
  priority: string;
  done: boolean; // Backend uses 'done', not 'completed'
  
  // Time & Scoring (Backend specific fields)
  expectedTime?: number;
  startTime?: number;
  endTime?: number;
  points?: number;
  
  subTasks?: SubTask[];
}