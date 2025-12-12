import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, CalendarDays } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { getTasks } from '../api/taskApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { TaskItem } from '../components/TaskItem';
import { TaskFormModal } from '../components/TaskFormModal';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { useDateStore } from '@/shared/stores/useDateStore';
import { format, isSameDay } from 'date-fns';

export const TasksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get selected date from global store
  const { selectedDate } = useDateStore();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: QUERY_KEYS.TASKS,
    queryFn: getTasks,
  });

  // Filter tasks by Search Query AND Selected Date
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = isSameDay(new Date(task.day), selectedDate);
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Tasks 
            <span className="text-lg font-normal text-gray-400 dark:text-gray-500">
              for {format(selectedDate, 'MMM do')}
            </span>
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {filteredTasks.length} tasks scheduled for this day
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
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
              <CalendarDays size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              No tasks for {format(selectedDate, 'EEEE')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-6">
              Your schedule is clear for this day. Click the button below to add a new task.
            </p>
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
              Create First Task
            </Button>
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
        // Pre-fill the date with the selected date from header
        initialDate={selectedDate}
      />
    </div>
  );
};