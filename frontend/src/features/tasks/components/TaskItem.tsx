import React from 'react';
import { Task } from '../types'; // Import the correct type

interface TaskItemProps {
  task: Task;
}

export const TaskItem = React.memo(
  ({ task }: TaskItemProps) => {
    return (
      <div className="p-4 border rounded shadow-sm">
        {/* Changed task.title -> task.name */}
        <h3 className="font-bold">{task.name}</h3> 
        
        {/* Changed task.completed -> task.done */}
        <p className="text-sm text-gray-500">
          {task.done ? 'Completed' : 'Incomplete'}
        </p>
      </div>
    );
  },
  (prev, next) => prev.task.id === next.task.id && prev.task.done === next.task.done
);