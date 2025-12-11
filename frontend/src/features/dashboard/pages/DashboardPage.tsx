import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-brand-dark">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder Stats */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Pending Tasks</h3>
          <p className="text-3xl font-bold text-brand-600 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">24</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Focus Time</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">4h 30m</p>
        </div>
      </div>
    </div>
  );
};