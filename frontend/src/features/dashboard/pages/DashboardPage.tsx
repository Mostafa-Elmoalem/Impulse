import { useQuery } from '@tanstack/react-query';
import { CheckSquare, CheckCircle2, Clock } from 'lucide-react';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { getDashboardStats } from '../api/dashboardApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { StatsCard } from '@/shared/components/ui/Card';
import { DashboardSkeleton } from '@/shared/components/ui/Skeletion';

export const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  
  const { data: stats, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_STATS,
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const formatFocusTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-brand-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Pending Tasks"
          value={stats?.pendingTasks || 0}
          icon={<CheckSquare size={24} />}
          color="brand"
        />
        <StatsCard
          title="Completed"
          value={stats?.completedTasks || 0}
          icon={<CheckCircle2 size={24} />}
          color="success"
        />
        <StatsCard
          title="Total Focus Time"
          value={formatFocusTime(stats?.totalFocusTime || 0)}
          icon={<Clock size={24} />}
          color="warning" // Changed to match your palette (blue was not in config, mapped to warning or you can add blue)
        />
      </div>
    </div>
  );
};