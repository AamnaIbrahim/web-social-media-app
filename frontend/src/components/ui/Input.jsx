import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import FieldWrapper from './FieldWrapper';

const Input = forwardRef(function Input(
  { label, error, helperText, required, leftIcon, rightIcon, className, id, ...props },
  ref
) {
  return (
    <FieldWrapper label={label} error={error} helperText={helperText} required={required} id={id}>
      <div className="relative flex items-center">
        {leftIcon && <span className="absolute left-3 text-text-tertiary">{leftIcon}</span>}
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          className={cn('input w-full', leftIcon && 'pl-10', rightIcon && 'pr-10', className)}
          {...props}
        />
        {rightIcon && <span className="absolute right-3 text-text-tertiary">{rightIcon}</span>}
      </div>
    </FieldWrapper>
  );
});

export default Input;