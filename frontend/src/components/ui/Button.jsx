import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import Loader from './Loader';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};

const sizes = {
  sm: 'text-sm px-3.5 py-1.5',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3',
};

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, className, children, disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(variants[variant], sizes[size], 'inline-flex items-center justify-center gap-2', className)}
      {...props}
    >
      {isLoading ? <Loader size="sm" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
});

export default Button;