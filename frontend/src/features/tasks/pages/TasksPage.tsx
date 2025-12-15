import { useQuery } from '@tanstack/react-query';
import { CalendarDays, Inbox, AlertCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { getTasks } from '../api/taskApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { TaskItem } from '../components/TaskItem';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { useDateStore } from '@/shared/stores/useDateStore';
import { useUIStore } from '@/shared/stores/useUIStore';
import { format, isSameDay, isValid } from 'date-fns';

export const TasksPage = () => {
  const { selectedDate } = useDateStore();
  const { searchQuery, openTaskModal } = useUIStore();

  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.TASKS,
    queryFn: getTasks,
  });

  const filteredTasks = tasks.filter(task => {
    try {
      if (!task.day) return false;
      
      const taskDate = new Date(task.day);
      if (!isValid(taskDate)) return false;

      const matchesDate = isSameDay(taskDate, selectedDate);
      
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return task.name.toLowerCase().includes(query) || 
               (task.description && task.description.toLowerCase().includes(query));
      }
      
      return matchesDate;
    } catch (e) {
      console.warn("Skipping invalid task data:", task);
      return false;
    }
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle size={40} className="text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Error loading tasks</h3>
        <p className="text-gray-500">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {searchQuery ? (
              <span>Search Results</span>
            ) : (
              <>
                Tasks 
                <span className="text-base font-normal text-gray-400 dark:text-gray-500">
                  for {format(selectedDate, 'MMMM do')}
                </span>
              </>
            )}
          </h1>
        </div>
        
        <div className="text-xs font-semibold px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-lg">
          {filteredTasks.length} Tasks
        </div>
      </div>

      {/* List / Grid */}
      <div className="min-h-[300px]">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-4 shadow-inner">
              {searchQuery ? (
                <Inbox size={32} className="text-gray-300" />
              ) : (
                <CalendarDays size={32} className="text-brand-200 dark:text-gray-600" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {searchQuery ? "No tasks found" : "No tasks for today"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-6 text-sm">
              {searchQuery 
                ? `We couldn't find any tasks matching "${searchQuery}"`
                : "Your schedule is clear. Enjoy your free time or add a new task to stay productive."}
            </p>
            {!searchQuery && (
              <Button variant="secondary" onClick={openTaskModal}>
                Create First Task
              </Button>
            )}
          </div>
        ) : (
          // ✅ GRID LAYOUT
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {filteredTasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                // Big Tasks take full width, Regulars take 1 column
                className={task.type === 'big_task' ? 'col-span-1 md:col-span-2' : ''}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};