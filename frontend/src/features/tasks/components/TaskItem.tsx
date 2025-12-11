import React from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export const TaskItem = React.memo(
  ({ task }: { task: Task }) => {
    return (
      <div>
        <h3>{task.title}</h3>
        <p>{task.completed ? 'Completed' : 'Incomplete'}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.task.id === nextProps.task.id &&
      prevProps.task.completed === nextProps.task.completed
    );
  }
);