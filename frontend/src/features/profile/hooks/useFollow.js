import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFollow } from '@/api/userApi';
import { useAuth } from '@/hooks/useAuth';

export function useFollow(username) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetUserId) => toggleFollow(user.id, targetUserId),
    onSuccess: ({ isFollowing }) => {
      queryClient.setQueryData(['profile', username], (old) =>
        old ? { ...old, isFollowing, followerCount: old.followerCount + (isFollowing ? 1 : -1) } : old
      );
    },
  });
}