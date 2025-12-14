import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import { cn } from '@/shared/utils/cn';
import { format, addDays, isSameDay, differenceInMinutes, parse } from 'date-fns';
import { TaskFormValues } from '../TaskFormModal';

export const TaskScheduling = () => {
  const { register, watch, setValue } = useFormContext<TaskFormValues>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const selectedDay = watch('day');
  const startTime = watch('startTime');
  const endTime = watch('endTime');

  // Dates Logic
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const afterTomorrow = addDays(today, 2); // اليوم الثالث

  const setDate = (date: Date) => {
    setValue('day', format(date, 'yyyy-MM-dd'));
    setShowDatePicker(false);
  };

  const isSelected = (date: Date) => isSameDay(new Date(selectedDay), date);

  // Duration Logic
  let duration = 0;
  try {
    const s = parse(startTime, 'HH:mm', new Date());
    const e = parse(endTime, 'HH:mm', new Date());
    let diff = differenceInMinutes(e, s);
    if (diff < 0) diff += 1440;
    duration = diff;
  } catch (e) {}

  return (
    <div className="space-y-4">
      {/* 1. Date Selection */}
      <div>
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">When?</label>
        <div className="flex flex-wrap items-center gap-2">
          {/* Today */}
          <button
            type="button"
            onClick={() => setDate(today)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold transition-all border",
              isSelected(today)
                ? "bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50"
            )}
          >
            Today
          </button>

          {/* Tomorrow */}
          <button
            type="button"
            onClick={() => setDate(tomorrow)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold transition-all border",
              isSelected(tomorrow)
                ? "bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50"
            )}
          >
            Tomorrow
          </button>

          {/* After Tomorrow (e.g. Mon, Tue) */}
          <button
            type="button"
            onClick={() => setDate(afterTomorrow)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold transition-all border",
              isSelected(afterTomorrow)
                ? "bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50"
            )}
          >
            {format(afterTomorrow, 'EEE')}
          </button>
          
          <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1" />

          {/* Custom Date Picker Toggle */}
          <button
            type="button"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={cn(
              "p-2 rounded-lg transition-all border",
              showDatePicker 
                 ? "bg-gray-100 border-gray-300 text-gray-900"
                 : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 hover:text-brand-600"
            )}
          >
            <CalendarIcon size={18} />
          </button>
        </div>

        {/* Fallback Date Picker */}
        {showDatePicker && (
          <div className="mt-2 animate-scale-in origin-top-left">
            <Input type="date" {...register('day')} className="w-auto bg-white dark:bg-gray-900" />
          </div>
        )}
      </div>

      {/* 2. Time Blocking */}
      <div>
         <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Time Block</label>
         <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 w-full sm:w-fit">
            <Input type="time" {...register('startTime')} className="bg-transparent border-none h-8 p-0 text-center font-semibold text-sm w-24 focus:ring-0" />
            <ArrowRight size={14} className="text-gray-400 shrink-0" />
            <Input type="time" {...register('endTime')} className="bg-transparent border-none h-8 p-0 text-center font-semibold text-sm w-24 focus:ring-0" />
         </div>
         <div className="text-[10px] text-gray-400 mt-1 font-medium ml-1">
            Duration: {duration}m
         </div>
      </div>
    </div>
  );
};