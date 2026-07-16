import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFollow } from '@/api/userApi';

export function useFollow(username) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ targetUserId, isCurrentlyFollowing }) =>
      toggleFollow(null, targetUserId, isCurrentlyFollowing),
    onSuccess: ({ isFollowing }) => {
      queryClient.setQueryData(['profile', username], (old) =>
        old ? { ...old, isFollowing, followerCount: old.followerCount + (isFollowing ? 1 : -1) } : old
      );
    },
  });
}