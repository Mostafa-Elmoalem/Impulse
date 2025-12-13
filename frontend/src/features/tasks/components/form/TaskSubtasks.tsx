import React, { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, ListTodo } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import { TaskFormValues } from '../TaskFormModal';

export const TaskSubtasks = () => {
  const { control, register, setFocus } = useFormContext<TaskFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks"
  });

  // Function to handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      append({ name: '', isCompleted: false });
    }
  };

  // Effect to focus the last element when a new one is added
  // We use a ref or simple logic: if length increased, focus last
  const mounted = React.useRef(false);
  useEffect(() => {
    if (mounted.current && fields.length > 0) {
        // Use a tiny timeout to ensure DOM is ready
        setTimeout(() => {
            setFocus(`subTasks.${fields.length - 1}.name`);
        }, 10);
    }
    mounted.current = true;
  }, [fields.length, setFocus]);

  return (
    <div className="animate-fade-in bg-purple-50/50 dark:bg-purple-900/10 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/20">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-bold text-purple-900 dark:text-purple-200 uppercase tracking-wider flex items-center gap-2">
          Checklist
        </label>
      </div>
      
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-3 items-center group">
            <div className="w-5 h-5 rounded border-2 border-purple-200 dark:border-purple-800 flex items-center justify-center bg-white dark:bg-gray-800 shrink-0 shadow-sm text-purple-600 text-[10px] font-bold">
               {index + 1}
            </div>
            <Input
              {...register(`subTasks.${index}.name`)}
              placeholder={`Step ${index + 1}`}
              className="flex-1 h-9 text-sm bg-transparent border-transparent border-b border-purple-100 dark:border-purple-900/30 rounded-none focus:border-purple-400 focus:bg-transparent px-0 placeholder:text-purple-300"
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => append({ name: '', isCompleted: false })}
          className="mt-3 w-full py-2 border border-dashed border-purple-200 dark:border-purple-800 text-purple-500 text-xs font-semibold rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus size={14} /> Add Step
        </button>
      </div>
    </div>
  );
};