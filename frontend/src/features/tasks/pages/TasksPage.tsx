import { useQuery } from '@tanstack/react-query';
import { CalendarDays, Inbox } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { getTasks } from '../api/taskApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { TaskItem } from '../components/TaskItem';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { useDateStore } from '@/shared/stores/useDateStore';
import { useUIStore } from '@/shared/stores/useUIStore';
import { format, isSameDay } from 'date-fns';

export const TasksPage = () => {
  // Global State
  const { selectedDate } = useDateStore();
  const { searchQuery, openTaskModal } = useUIStore();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: QUERY_KEYS.TASKS,
    queryFn: getTasks,
  });

  // Filter Logic: Date AND Search Query
  const filteredTasks = tasks.filter(task => {
    // 1. Filter by Date (Exact match)
    const matchesDate = isSameDay(new Date(task.day), selectedDate);
    
    // 2. Filter by Search (if exists)
    // Note: If search is active, we might want to search ALL history or just this day.
    // The requirement "General Search" usually means searching everything.
    // Let's implement: If search query exists -> Search ALL. If not -> Filter by Date.
    if (searchQuery.trim()) {
      return task.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Clean Header - Just Title & Count */}
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

      {/* Tasks List */}
      <div className="space-y-3 min-h-[300px]">
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
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};