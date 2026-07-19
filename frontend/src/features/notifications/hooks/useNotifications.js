import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotifications, markAsRead, markAllAsRead } from '@/api/notificationApi';
import { useAuth } from '@/hooks/useAuth';

export function useNotifications() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: fetchNotifications,
    enabled: !!user?.id,
  });
}

export function useMarkAsRead() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAsRead,
    onSuccess: (updated) => {
      queryClient.setQueryData(['notifications', user.id], (old) =>
        old?.map((n) => (n.id === updated.id ? updated : n))
      );
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount', user.id] });
    },
  });
}

export function useMarkAllAsRead() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllAsRead,
    onSuccess: (updated) => {
      queryClient.setQueryData(['notifications', user.id], updated);
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount', user.id] });
    },
  });
}