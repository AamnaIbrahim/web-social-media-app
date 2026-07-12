import { cn } from '@/utils/cn';

const variants = {
  neutral: 'bg-bg-subtle text-text-secondary',
  success: 'bg-success-subtle text-success',
  warning: 'bg-warning-subtle text-warning',
  error: 'bg-error-subtle text-error',
  accent: 'bg-accent-subtle text-accent',
};

export default function Badge({ variant = 'neutral', children, className }) {
  return (
    <span className={cn('badge', variants[variant], className)}>
      {children}
    </span>
  );
}