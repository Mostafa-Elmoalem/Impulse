import React from 'react';
import { Task } from '../types';
import { RegularTaskView } from './RegularTaskView';
import { BigTaskView } from './BigTaskView';

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
  className?: string;
}

export const TaskItem = React.memo(({ task, onEdit, className }: TaskItemProps) => {
  const isBigTask = task.type === 'big_task';

  if (isBigTask) {
    return <BigTaskView task={task} onEdit={onEdit} className={className} />;
  }

  return <RegularTaskView task={task} onEdit={onEdit} className={className} />;
});