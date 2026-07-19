import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchUnreadNotificationsCount } from '@/api/notificationApi';
import { useAuth } from './useAuth';
import { getSocket } from '@/services/socketService';
import { fetchUnreadConversationsCount } from '@/api/messageApi';

export function useUnreadNotificationsCount() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['notifications', 'unreadCount', user?.id],
    queryFn: fetchUnreadNotificationsCount,
    enabled: !!user?.id,
  });

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    const handler = () => queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount', user?.id] });
    socket.on('notification:new', handler);
    return () => socket.off('notification:new', handler);
  }, [queryClient, user?.id]);

  return query.data ?? 0;
}

export function useUnreadMessagesCount() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['messages', 'unreadCount', user?.id],
    queryFn: fetchUnreadConversationsCount,
    enabled: !!user?.id,
  });

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    const handler = () => queryClient.invalidateQueries({ queryKey: ['messages', 'unreadCount', user?.id] });
    socket.on('message:new', handler);
    return () => socket.off('message:new', handler);
  }, [queryClient, user?.id]);

  return query.data ?? 0;
}
