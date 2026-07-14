import { AlertCircle } from 'lucide-react';
import Button from './Button';

export default function ErrorState({ title = "Something went wrong", description, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-16 px-4">
      <AlertCircle size={40} strokeWidth={1.5} className="text-error" />
      <p className="text-base font-semibold text-text-primary">{title}</p>
      {description && <p className="text-sm text-text-secondary max-w-xs">{description}</p>}
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}