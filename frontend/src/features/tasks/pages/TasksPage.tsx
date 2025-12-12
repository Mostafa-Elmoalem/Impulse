// src/features/tasks/pages/TasksPage.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { getTasks } from '../api/taskApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { TaskItem } from '../components/TaskItem';
import { TaskFormModal } from '../components/TaskFormModal';
import type { Task } from '../types';
import { Skeleton } from '@/shared/components/ui/Skeleton';
export const TasksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: QUERY_KEYS.TASKS,
    queryFn: getTasks,
  });

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tasks
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your daily tasks and goals
          </p>
        </div>
        <Button leftIcon={<Plus size={20} />} onClick={() => setIsModalOpen(true)}>
          Add Task
        </Button>
      </header>

      {/* Search */}
      <Input
        placeholder="Search tasks..."
        leftIcon={<Search size={18} />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Tasks List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery ? 'No tasks match your search.' : 'No tasks yet. Click "Add Task" to create one.'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};