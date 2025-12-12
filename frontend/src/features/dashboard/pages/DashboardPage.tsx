import { useQuery } from '@tanstack/react-query';
import { CheckSquare, CheckCircle2, Clock } from 'lucide-react';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { getDashboardStats } from '../api/dashboardApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { StatsCard } from '@/shared/components/ui/Card';
import { DashboardSkeleton } from '@/shared/components/ui/Skeleton';

// Utility function to format focus time
const formatFocusTime = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
};

export const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  
  const { data: stats, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_STATS,
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back, {user?.name || 'User'}!
        </p>
      </header>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Pending Tasks"
          value={stats?.pendingTasks || 0}
          icon={<CheckSquare size={24} />}
          color="info"
        />
        <StatsCard
          title="Completed Tasks"
          value={stats?.completedTasks || 0}
          icon={<CheckCircle2 size={24} />}
          color="success"
        />
        <StatsCard
          title="Focus Time"
          value={formatFocusTime(stats?.totalFocusTime || 0)}
          icon={<Clock size={24} />}
          color="warning"
        />
      </div>
    </div>
  );
};