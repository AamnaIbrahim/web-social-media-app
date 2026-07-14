import { cn } from '@/utils/cn';

export default function Switch({ checked, onChange, disabled, label, description }) {
  return (
    <label className={cn('flex items-center justify-between gap-4 py-3', disabled && 'opacity-50')}>
      <div className="min-w-0">
        {label && <p className="text-sm font-medium text-text-primary">{label}</p>}
        {description && <p className="text-xs text-text-tertiary mt-0.5">{description}</p>}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative shrink-0 w-10 h-6 rounded-full transition-colors duration-150',
          checked ? 'bg-accent' : 'bg-bg-inset'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-bg-surface shadow-sm transition-transform duration-150',
            checked && 'translate-x-4'
          )}
        />
      </button>
    </label>
  );
}