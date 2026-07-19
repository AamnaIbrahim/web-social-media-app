import { useQuery } from '@tanstack/react-query';
import { fetchMyWeeklyInsights } from '@/api/userApi';
import { useAuth } from '@/hooks/useAuth';

export function useWeeklyInsights() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['weeklyInsights', user?.id],
    queryFn: fetchMyWeeklyInsights,
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });
}