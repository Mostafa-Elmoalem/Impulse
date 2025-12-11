import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { getTasks } from '../api/taskApi';
import type { Task } from '../types';
import { TaskItem } from '../components/TaskItem';

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch real data on mount
    getTasks()
      .then(setTasks)
      .catch((err) => console.error("Failed to load tasks", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        <Button leftIcon={<Plus size={20} />}>Add Task</Button>
      </header>

      {/* Render list */}
      <div className="space-y-4">
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};