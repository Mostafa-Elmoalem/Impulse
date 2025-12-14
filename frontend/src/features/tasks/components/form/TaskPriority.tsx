import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/utils/cn';
import { TaskFormValues } from '../TaskFormModal';

export const TaskPriority = () => {
  const { setValue, watch } = useFormContext<TaskFormValues>();
  const selectedPriority = watch('priority');

  const priorities = [
    { id: 'low', label: 'Low', color: 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200', active: 'bg-emerald-600 text-white border-emerald-600 shadow-md' },
    { id: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200', active: 'bg-blue-600 text-white border-blue-600 shadow-md' },
    { id: 'high', label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200', active: 'bg-orange-500 text-white border-orange-500 shadow-md' },
    { id: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200', active: 'bg-red-600 text-white border-red-600 shadow-md' },
  ] as const;

  return (
    <div>
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Priority</label>
      <div className="grid grid-cols-4 gap-2">
        {priorities.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setValue('priority', p.id)}
            className={cn(
              "py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all duration-200",
              selectedPriority === p.id 
                ? p.active 
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};