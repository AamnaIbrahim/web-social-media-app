import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike, toggleSave } from '@/api/postApi';
import { showToast } from '@/components/ui/toast';

// Shared optimistic-update logic for like/save — both mutate the same
// cached infinite-query shape, so the update function is written once and reused.
function updatePostInCache(queryClient, updatedPost) {
  queryClient.setQueryData(['posts'], (old) => {
    if (!old) return old;
    return {
      ...old,
      pages: old.pages.map((page) => ({
        ...page,
        data: page.data.map((p) => (p.id === updatedPost.id ? updatedPost : p)),
      })),
    };
  });
}

export function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleLike,
    onSuccess: (updatedPost) => updatePostInCache(queryClient, updatedPost),
    onError: () => showToast.error('Could not update like. Try again.'),
  });
}

export function useSavePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleSave,
    onSuccess: (updatedPost) => {
      updatePostInCache(queryClient, updatedPost);
      showToast.success(updatedPost.saved ? 'Saved to your shelf' : 'Removed from saved');
    },
    onError: () => showToast.error('Could not save post. Try again.'),
  });
}