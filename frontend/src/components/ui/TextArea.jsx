import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import FieldWrapper from './FieldWrapper';
import CharacterCounter from './CharacterCounter';

const Textarea = forwardRef(function Textarea(
  { label, error, helperText, required, maxLength, value, className, id, rows = 4, ...props },
  ref
) {
  return (
    <FieldWrapper label={label} error={error} helperText={helperText} required={required} id={id}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        maxLength={maxLength}
        value={value}
        aria-invalid={!!error}
        className={cn('input w-full resize-none', className)}
        {...props}
      />
      {maxLength && (
        <div className="flex justify-end">
          <CharacterCounter current={value?.length ?? 0} max={maxLength} />
        </div>
      )}
    </FieldWrapper>
  );
});

export default Textarea;