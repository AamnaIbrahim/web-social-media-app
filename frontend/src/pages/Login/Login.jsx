import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { loginRules } from '@/features/auth/validation';
import { ROUTES } from '@/constants/routes';
import { showToast } from '@/components/ui/toast';
import { getErrorMessage } from '@/utils/getErrorMessage';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      showToast.success('Welcome back');
      const redirectTo = location.state?.from?.pathname ?? ROUTES.HOME;
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError('root', { message: getErrorMessage(err, 'Invalid email or password') });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary">Welcome back</h1>
      <p className="text-sm text-text-secondary mt-1.5 mb-8">
        Log in to pick up where you left off.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', loginRules.email)}
        />
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="text-sm font-medium text-text-primary">Password</label>
            <Link to="/forgot-password" className="text-xs font-medium text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', loginRules.password)}
          />
        </div>

        {errors.root && (
          <p className="error-inline">{errors.root.message}</p>
        )}

        <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-2">
          Log in
        </Button>

        <p className="text-center text-sm text-text-secondary mt-2">
          New here?{' '}
          <Link to={ROUTES.REGISTER} className="text-accent font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}