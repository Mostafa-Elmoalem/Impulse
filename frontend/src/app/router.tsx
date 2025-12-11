// src/app/router.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { AppLayout } from '@/shared/components/layout/AppLayout';

// ============================================
// LAZY LOAD PAGES
// ============================================
const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);

const DashboardPage = lazy(() =>
  import('@/features/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);

const TasksPage = lazy(() =>
  import('@/features/tasks/pages/TasksPage').then((m) => ({ default: m.TasksPage }))
);

const SettingsPage = lazy(() =>
  import('@/features/settings/pages/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);

// ============================================
// LOADING FALLBACK
// ============================================
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin text-brand-500 mx-auto" />
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

// ============================================
// AUTH GUARD - Protect Private Routes
// ============================================
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// ============================================
// REDIRECT IF AUTHENTICATED
// ============================================
const RedirectIfAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// ============================================
// MAIN ROUTER
// ============================================
export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <LoginPage />
            </RedirectIfAuth>
          }
        />

        {/* Protected Routes with Layout */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

// ============================================
// ROUTE CONSTANTS (for navigation)
// ============================================
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  TASKS: '/tasks',
  SETTINGS: '/settings',
} as const;

// Type-safe navigation helper
export type RouteKey = keyof typeof ROUTES;