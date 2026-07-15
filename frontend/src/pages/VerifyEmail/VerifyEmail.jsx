import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import OtpInput from '@/components/ui/OtpInput';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { showToast } from '@/components/ui/toast';
import { ROUTES } from '@/constants/routes';

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail, resendOtp } = useAuth();
  const email = location.state?.email;

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  if (!email) return <Navigate to={ROUTES.REGISTER} replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 6) return;
    setError('');
    setIsSubmitting(true);
    try {
      await verifyEmail({ email, code });
      showToast.success('Email verified! Please log in to continue.');
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (err) {
     setError(getErrorMessage(err, 'Incorrect code. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendOtp(email);
      showToast.success('A new code has been sent');
    } catch (err) {
      showToast.error(getErrorMessage(err, "Couldn't resend the code. Try again."));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary text-center">Verify your email</h1>
      <p className="text-sm text-text-secondary text-center mt-1.5 mb-8">
        We sent a 6-digit code to <span className="font-medium text-text-primary">{email}</span>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
        <OtpInput value={code} onChange={setCode} />

        {error && <p className="error-inline">{error}</p>}

        <Button type="submit" size="lg" isLoading={isSubmitting} disabled={code.length !== 6} className="w-full">
          Verify
        </Button>

        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-sm font-medium text-accent hover:underline disabled:opacity-50"
        >
          {isResending ? 'Sending...' : "Didn't get a code? Resend"}
        </button>
      </form>
    </div>
  );
}