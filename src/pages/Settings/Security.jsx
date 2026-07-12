import { useForm } from 'react-hook-form';
import { useChangePassword } from '@/features/settings/hooks/useChangePassword';
import SettingsSection from '@/components/common/SettingsSection';
import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';

export default function Security() {
  const changePasswordMutation = useChangePassword();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    if (formData.newPassword !== formData.confirmPassword) {
      setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    try {
      await changePasswordMutation.mutateAsync(formData);
      reset();
    } catch (err) {
      setError('root', { message: err.message });
    }
  };

  return (
    <SettingsSection title="Security" description="Update your password.">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-5">
        <PasswordInput
          label="Current password"
          error={errors.currentPassword?.message}
          {...register('currentPassword', { required: 'Current password is required' })}
        />
        <PasswordInput
          label="New password"
          error={errors.newPassword?.message}
          {...register('newPassword', {
            required: 'New password is required',
            minLength: { value: 8, message: 'Must be at least 8 characters' },
          })}
        />
        <PasswordInput
          label="Confirm new password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', { required: 'Please confirm your new password' })}
        />

        {errors.root && <p className="error-inline">{errors.root.message}</p>}

        <div className="flex justify-end">
          <Button type="submit" isLoading={isSubmitting}>Update password</Button>
        </div>
      </form>
    </SettingsSection>
  );
}