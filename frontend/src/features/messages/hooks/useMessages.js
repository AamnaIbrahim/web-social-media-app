import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMessages, sendMessage, fetchConversationById } from '@/api/messageApi';
import { useAuth } from '@/hooks/useAuth';

export function useConversation(conversationId) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => fetchConversationById(conversationId, user.id),
    enabled: !!conversationId && !!user?.id,
  });
}

export function useMessages(conversationId) {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => fetchMessages(conversationId),
    enabled: !!conversationId,
  });
}

export function useSendMessage(conversationId) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text) => sendMessage({ conversationId, senderId: user.id, text }),

    onMutate: async (text) => {
      await queryClient.cancelQueries({ queryKey: ['messages', conversationId] });
      const previous = queryClient.getQueryData(['messages', conversationId]);
      const optimisticMessage = {
        id: `optimistic-${Date.now()}`,
        conversationId,
        senderId: user.id,
        sender: user,
        text,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };
      queryClient.setQueryData(['messages', conversationId], (old) => [...(old ?? []), optimisticMessage]);
      return { previous };
    },
    onError: (err, text, context) => {
      queryClient.setQueryData(['messages', conversationId], context.previous);
    },
    onSuccess: (realMessage) => {
      queryClient.setQueryData(['messages', conversationId], (old) =>
        old.map((m) => (m.isOptimistic ? realMessage : m))
      );
      queryClient.invalidateQueries({ queryKey: ['conversations', user.id] });
    },
  });
}