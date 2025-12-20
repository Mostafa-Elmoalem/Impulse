import { apiClient } from '@/shared/lib/api-client';
import { Task, SubTask } from '../types';
import { format } from 'date-fns';

// --- Helpers: Data Transformers 🔄 ---

const parseTime = (timeStr: string): Date => {
  if (!timeStr) return new Date();
  const date = new Date();
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
  return date;
};

// هذا المحول الجديد يتعامل مع هيكلية ResponseSub القادمة من الباك إند
// { task: {...}, subTasks: [...] }
const transformResponseSubToTask = (responseItem: any): Task => {
  const { task, subTasks } = responseItem; // فك الكائن القادم من السيرفر
  
  return {
    ...task,
    // دمج المهام الفرعية داخل التاسك
    subTasks: subTasks || [],
    
    // تحويل التواريخ والأوقات
    day: task.day ? new Date(task.day) : new Date(),
    startTime: task.startTime ? parseTime(task.startTime) : undefined,
    endTime: task.endTime ? parseTime(task.endTime) : undefined,
    actualStartTime: task.actualStartTime ? parseTime(task.actualStartTime) : undefined,
    actualendTime: task.actualendTime ? parseTime(task.actualendTime) : undefined,
  };
};

const transformTaskToBackend = (task: Partial<Task>): any => ({
  ...task,
  day: task.day ? format(task.day, 'yyyy-MM-dd') : undefined,
  startTime: task.startTime ? format(task.startTime, 'HH:mm:ss') : null,
  endTime: task.endTime ? format(task.endTime, 'HH:mm:ss') : null,
  actualStartTime: task.actualStartTime ? format(task.actualStartTime, 'HH:mm:ss') : null,
  actualendTime: task.actualendTime ? format(task.actualendTime, 'HH:mm:ss') : null,
});

// --- API Functions (Updated Endpoints) 🚀 ---

// 1. GET: جلب المهام (تم تصحيح الرابط)
export const getTasks = async (date: Date): Promise<Task[]> => {
  const dateString = format(date, 'yyyy-MM-dd');
  // الرابط الصحيح حسب TaskController
  const response = await apiClient.get<any[]>(`/task/get-task/date/${dateString}`);
  
  // الباك إند يرجع قائمة من ResponseSub، نحولها لـ Task
  return response.data.map(transformResponseSubToTask);
};

// 2. POST: إنشاء مهمة (تم تصحيح الرابط)
export const createTask = async (taskData: Partial<Task>): Promise<Task> => {
  const payload = transformTaskToBackend(taskData);
  // الرابط الصحيح: /task/add
  const response = await apiClient.post<any>('/task/add', payload);
  // الباك إند هنا يرجع TaskDto فقط (بدون subTasks مبدئياً)، نحوله لتاسك
  // ملاحظة: لو الباك إند رجع TaskDto، نحوله مباشرة. لو رجع ResponseSub نستخدم المحول الآخر.
  // حسب الكود: addTask بترجع TaskDto.
  return transformResponseSubToTask({ task: response.data, subTasks: [] });
};

// 3. POST: إنشاء مشروع (Big Task)
export const createBigTask = async (taskData: Task): Promise<Task> => {
  // الرابط الصحيح: /task/add-big-task
  // هذا الاندبوينت ينتظر ResponseSub كـ Body
  const payload = {
      task: transformTaskToBackend(taskData),
      subTasks: taskData.subTasks || []
  };
  
  const response = await apiClient.post<any>('/task/add-big-task', payload);
  return transformResponseSubToTask(response.data);
};

// 4. UPDATE: تحديث مهمة (تم تصحيح الرابط واستخدام POST)
export const updateTask = async (task: Task): Promise<Task> => {
  const payload = transformTaskToBackend(task);
  // حسب الكونترولر: التحديث يتم عبر POST /task/update
  const response = await apiClient.post<any>('/task/update', payload);
  // الرد عبارة عن TaskDto
  return transformResponseSubToTask({ task: response.data, subTasks: task.subTasks });
};

// 5. DELETE: حذف مهمة (تم تصحيح الطريقة)
export const deleteTask = async (id: string | number): Promise<void> => {
  // الكونترولر يطلب @RequestBody TaskDto للحذف، وهذا غير قياسي في DELETE
  // لذلك نستخدم خيار `data` في axios لإرسال البودي مع الحذف
  await apiClient.delete('/task/delete', {
    data: { id: id } // نرسل الـ ID داخل كائن
  });
};

// --- SubTasks APIs (Optional - if needed separately) ---
export const updateSubTask = async (subTask: SubTask): Promise<SubTask> => {
  // تأكد من روابط SubTaskController إذا كنت تستخدمها
  const response = await apiClient.post<SubTask>('/sub-task/update', subTask); 
  return response.data;
};

export const deleteSubTask = async (id: string | number): Promise<void> => {
  await apiClient.delete('/sub-task/delete', { data: { id } });
};

// --- Points ---
export const getPoints = async (): Promise<number> => {
    const response = await apiClient.get<number>('/task/points');
    return response.data; 
};