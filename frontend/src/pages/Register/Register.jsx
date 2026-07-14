import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { registerRules } from '@/features/auth/validation';
import { ROUTES } from '@/constants/routes';
import { showToast } from '@/components/ui/toast';
import { Camera } from 'lucide-react';
import { getErrorMessage } from '@/utils/getErrorMessage';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const avatarPreview = avatarFile ? URL.createObjectURL(avatarFile) : null;

  const onSubmit = async (formData) => {
    try {
      await registerUser(formData);
      showToast.success('Account created — welcome to hue');
      navigate(ROUTES.HOME, { replace: true });
    } catch (err) {
      setError('root', { message: getErrorMessage(err, "Couldn't create your account. Please try again.") });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary">Create your account</h1>
      <p className="text-sm text-text-secondary mt-1.5 mb-8">
        Takes about 20 seconds. No email verification for the demo.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex items-center gap-4 mb-1">
          <div className="relative">
            <Avatar src={avatarPreview} name="" size="lg" />
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-1 -right-1 bg-accent text-text-inverse rounded-full p-1.5 cursor-pointer hover:bg-accent-hover transition-colors"
            >
              <Camera size={14} strokeWidth={2} />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">Profile picture</p>
            <p className="text-xs text-text-tertiary">Square works best. Under 2MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="fullName"
            label="Full name"
            error={errors.fullName?.message}
            {...register('fullName', registerRules.fullName)}
          />
          <Input
            id="username"
            label="Username"
            error={errors.username?.message}
            {...register('username', registerRules.username)}
          />
        </div>

        <Input
          id="email"
          type="email"
          label="Email"
          error={errors.email?.message}
          {...register('email', registerRules.email)}
        />
        <PasswordInput
          id="password"
          label="Password"
          error={errors.password?.message}
          {...register('password', registerRules.password)}
        />

        {errors.root && <p className="error-inline">{errors.root.message}</p>}

        <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-2">
          Create account
        </Button>

        <p className="text-center text-sm text-text-secondary mt-2">
          Already registered?{' '}
          <Link to={ROUTES.LOGIN} className="text-accent font-medium hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}