import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/api/settingsApi';
import { useAuth } from '@/hooks/useAuth';
import { showToast } from '@/components/ui/toast';

export function useUpdateProfile() {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates) => updateProfile(user.id, updates),
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