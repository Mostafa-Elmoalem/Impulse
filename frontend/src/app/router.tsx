import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'; // You need to create this placeholder
import { AppLayout } from '@/shared/components/layout/AppLayout'; // Create this placeholder

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        {/* Add Todo routes here later */}
      </Route>
    </Routes>
  );
};