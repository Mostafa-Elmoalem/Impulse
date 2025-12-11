// src/features/tasks/pages/TasksPage.tsx
import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { getTasks } from '../api/taskApi';
import type { Task } from '../types';
import { TaskItem } from '../components/TaskItem';
import { toast } from 'sonner';

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ✅ TODO: Backend needs to implement GET /api/tasks endpoint
    // Currently returns 401/403 because endpoint doesn't exist
    getTasks()
      .then(setTasks)
      .catch((err) => {
        console.error("Failed to load tasks", err);
        setError(err.message);
        toast.error('Failed to load tasks. Backend endpoint may not be implemented yet.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your daily tasks and goals
          </p>
        </div>
        <Button leftIcon={<Plus size={20} />}>Add Task</Button>
      </header>

      {/* Search Bar */}
      <div className="flex gap-4">
        <Input 
          placeholder="Search tasks..." 
          leftIcon={<Search size={18} />}
        />
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : error ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ <strong>Backend TODO:</strong> Implement GET /api/tasks endpoint
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
              Error: {error}
            </p>
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No tasks yet. Click "Add Task" to create one.
          </p>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};