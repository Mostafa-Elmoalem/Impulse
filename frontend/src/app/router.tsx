import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
// ✅ Removed unused useAuthStore
import { AppLayout } from '@/shared/components/layout/AppLayout';

const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);

const DashboardPage = lazy(() =>
  import('@/features/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);

const TasksPage = lazy(() =>
  import('@/features/tasks/pages/TasksPage').then((m) => ({ default: m.TasksPage }))
);

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin text-brand-500 mx-auto" />
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const RedirectIfAuth = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <LoginPage />
            </RedirectIfAuth>
          }
        />

        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </Suspense>
  );
};

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  TASKS: '/tasks',
} as const;

export type RouteKey = keyof typeof ROUTES;