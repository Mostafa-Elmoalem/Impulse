import { apiClient } from '@/shared/api/apiClient';
import { Task, SubTask } from '../types';
import { format } from 'date-fns';

export const getTasks = async (date: Date = new Date()): Promise<Task[]> => {
  const dateStr = format(date, 'yyyy-MM-dd');
  const response = await apiClient.get(`/task/get-task/date/${dateStr}`);
  return response.data;
};

export const createTask = async (taskData: Partial<Task>): Promise<Task> => {
  const payload = {
    name: taskData.name,
    description: taskData.description,
    day: taskData.day, 
    startTime: taskData.startTime,
    endTime: taskData.endTime,
    priority: taskData.priority?.toUpperCase(),
    done: false,
    points: taskData.points || 10
  };
  
  const response = await apiClient.post('/task/add', payload);
  return response.data;
};

export const createBigTask = async (taskData: Task): Promise<Task> => {
  const payload = {
    task: {
       name: taskData.name,
       description: taskData.description,
       day: taskData.day,
       startTime: taskData.startTime,
       endTime: taskData.endTime,
       priority: taskData.priority?.toUpperCase(),
       points: taskData.points || 30
    },
    subTasks: taskData.subTasks?.map(sub => ({
        name: sub.name,
        time: sub.timeEstimate,
        done: false
    }))
  };

  const response = await apiClient.post('/task/add-big-task', payload);
  const resData = response.data;
  return { ...resData.task, subTasks: resData.subTasks };
};

export const updateTask = async (task: Task): Promise<Task> => {
  const payload = {
    ...task,
    priority: task.priority?.toUpperCase(),
    subTasks: task.subTasks?.map(sub => ({
      id: sub.id,
      name: sub.name,
      time: sub.timeEstimate, 
      done: sub.isCompleted
    }))
  };

  const response = await apiClient.post('/task/update', payload);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete('/task/delete', {
    data: { id: id } 
  });
};

export const updateSubTask = async (subTask: SubTask): Promise<SubTask> => {
  const payload = {
    id: subTask.id,
    name: subTask.name,
    time: subTask.timeEstimate,
    done: subTask.isCompleted
  };
  
  const response = await apiClient.post('/sub-task/update', payload);
  
  const data = response.data;
  return {
      id: data.id,
      name: data.name,
      timeEstimate: data.time,
      isCompleted: data.done
  };
};

export const getPoints = async (): Promise<number> => {
  const response = await apiClient.get('/task/points');
  return response.data;
};

// --- 8. حذف مهمة فرعية (DELETE SubTask) ---
export const deleteSubTask = async (id: string): Promise<void> => {
  await apiClient.delete('/sub-task/delete', {
    data: { id: id }
  });
};