import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/api/userApi';
import { useAuth } from '@/hooks/useAuth';
import { showToast } from '@/components/ui/toast';

export function useUpdateProfile() {
  const { setUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.setQueryData(['profile', updatedUser.username], (old) =>
        old ? { ...old, ...updatedUser } : old
      );
      showToast.success('Profile updated');
    },
    onError: () => showToast.error('Could not update profile. Try again.'),
  });
}