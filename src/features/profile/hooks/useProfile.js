import { useQuery } from '@tanstack/react-query';
import { fetchUserByUsername } from '@/api/userApi';
import { useAuth } from '@/hooks/useAuth';

export function useProfile(username) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['profile', username],
    queryFn: () => fetchUserByUsername(username, user?.id),
    enabled: !!username && !!user?.id,
  });
}