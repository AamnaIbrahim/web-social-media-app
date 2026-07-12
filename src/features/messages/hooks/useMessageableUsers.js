import { useQuery } from '@tanstack/react-query';
import { fetchMessageableUsers } from '@/api/messageApi';
import { useAuth } from '@/hooks/useAuth';

export function useMessageableUsers(query) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['messageableUsers', user?.id, query],
    queryFn: () => fetchMessageableUsers(user.id, query),
    enabled: !!user?.id,
  });
}