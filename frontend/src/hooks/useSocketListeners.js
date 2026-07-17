import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getSocket } from '@/services/socketService';
import { useAuth } from './useAuth';
import { showToast } from '@/components/ui/toast';

export function useSocketListeners() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (message) => {
      // Append into the specific thread's cache if it's open...
      queryClient.setQueryData(['messages', String(message.conversationId)], (old) =>
        old ? [...old, message] : old
      );
      // ...and refresh the conversation list so it reorders/shows the preview.
      queryClient.invalidateQueries({ queryKey: ['conversations', user?.id] });
    };

    const handleNewNotification = (notification) => {
      queryClient.setQueryData(['notifications', user?.id], (old) =>
        old ? [notification, ...old] : old
      );
      showToast.info(`${notification.user?.name} ${notification.message}`);
    };

    socket.on('message:new', handleNewMessage);
    socket.on('notification:new', handleNewNotification);

    return () => {
      socket.off('message:new', handleNewMessage);
      socket.off('notification:new', handleNewNotification);
    };
  }, [isAuthenticated, user?.id, queryClient]);
}