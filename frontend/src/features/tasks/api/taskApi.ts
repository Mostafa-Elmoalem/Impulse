import type { Task } from '../types';

// Key for storing data in browser
const STORAGE_KEY = 'impulse_tasks_db';

// Helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get data
const getLocalTasks = (): Task[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save data
const saveLocalTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const getTasks = async (): Promise<Task[]> => {
  await delay(400); // Fast load
  const tasks = getLocalTasks();
  
  // If empty, return some dummy data to start
  if (tasks.length === 0) {
    const dummyTasks: Task[] = [
      {
        id: 1,
        name: "Welcome to Impulse",
        description: "This is a local task. Try editing or deleting it!",
        day: new Date().toISOString().split('T')[0],
        priority: "high",
        done: false,
        expectedTime: 30,
        points: 10,
        type: 'regular', // ✅ Added missing field
        createdAt: Date.now() // ✅ Added missing field
      },
      {
        id: 2,
        name: "Try Dark Mode",
        description: "Click the moon icon in the header.",
        day: new Date().toISOString().split('T')[0],
        priority: "medium",
        done: true,
        expectedTime: 15,
        points: 5,
        type: 'regular', // ✅ Added missing field
        createdAt: Date.now() // ✅ Added missing field
      }
    ];
    saveLocalTasks(dummyTasks);
    return dummyTasks;
  }
  
  return tasks;
};

export const createTask = async (data: Partial<Task>): Promise<Task> => {
  await delay(600);
  const tasks = getLocalTasks();
  
  const newTask: Task = {
    id: Date.now(),
    name: data.name || 'New Task',
    description: data.description || '',
    day: data.day || new Date().toISOString().split('T')[0],
    priority: data.priority || 'medium',
    done: false,
    expectedTime: data.expectedTime || 60,
    points: 10,
    type: data.type || 'regular', // ✅ Ensure fallback to 'regular' if undefined
    createdAt: Date.now(),
    subTasks: data.subTasks || [],
    ...data
  };

  tasks.push(newTask);
  saveLocalTasks(tasks);
  return newTask;
};

export const updateTask = async ({ id, updates }: { id: number; updates: Partial<Task> }): Promise<Task> => {
  await delay(300);
  const tasks = getLocalTasks();
  const index = tasks.findIndex(t => t.id === id);
  
  if (index === -1) throw new Error("Task not found");

  tasks[index] = { ...tasks[index], ...updates };
  saveLocalTasks(tasks);
  
  return tasks[index];
};

export const deleteTask = async (id: number): Promise<void> => {
  await delay(300);
  const tasks = getLocalTasks();
  const filtered = tasks.filter(t => t.id !== id);
  saveLocalTasks(filtered);
};