import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';

const DashboardPage = lazy(() =>
  import('@/features/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);

const TasksPage = lazy(() =>
  import('@/features/tasks/pages/TasksPage').then((m) => ({ default: m.TasksPage }))
);

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
  </div>
);

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Suspense>
  );
};