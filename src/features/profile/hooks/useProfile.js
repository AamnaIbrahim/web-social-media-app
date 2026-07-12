import { useQuery } from '@tanstack/react-query';
import { fetchUserByUsername } from '@/api/userApi';

export function useProfile(username) {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: () => fetchUserByUsername(username),
    enabled: !!username,
  });
}