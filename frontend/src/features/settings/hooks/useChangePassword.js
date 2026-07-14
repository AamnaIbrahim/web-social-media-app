import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/api/settingsApi';
import { showToast } from '@/components/ui/toast';

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => showToast.success('Password updated'),
  });
}