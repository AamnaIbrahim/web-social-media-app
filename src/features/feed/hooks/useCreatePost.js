import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/api/postApi';
import { showToast } from '@/components/ui/toast';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts'], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: [
            { ...old.pages[0], data: [newPost, ...old.pages[0].data] },
            ...old.pages.slice(1),
          ],
        };
      });
      showToast.success('Posted');
    },
    onError: () => showToast.error('Could not publish your post. Try again.'),
  });
}