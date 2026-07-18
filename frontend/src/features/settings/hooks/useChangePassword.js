import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/api/settingsApi';
import { showToast } from '@/components/ui/toast';
import { getErrorMessage } from '@/utils/getErrorMessage';

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => showToast.success('Password updated'),
    onError: (err) => showToast.error(getErrorMessage(err, "Couldn't update password. Try again.")),
  });
}