import { useQuery } from '@tanstack/react-query';
import { fetchConversations } from '@/api/messageApi';
import { useAuth } from '@/hooks/useAuth';

export function useConversations() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: () => fetchConversations(user.id),
    enabled: !!user?.id,
  });
}