import { useMutation, useQueryClient } from '@tanstack/react-query';
import { findOrCreateDirectConversation } from '@/api/messageApi';
import { useAuth } from '@/hooks/useAuth';

export function useStartConversation() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (otherUserId) => findOrCreateDirectConversation(otherUserId), // no currentUserId arg
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations', user.id] });
    },
  });
}