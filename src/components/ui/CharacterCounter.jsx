import { cn } from '@/utils/cn';

export default function CharacterCounter({ current, max }) {
  const remaining = max - current;
  const isNearLimit = remaining <= max * 0.1;
  const isOver = remaining < 0;

  return (
    <span
      className={cn(
        'text-xs tabular-nums',
        isOver ? 'text-error font-medium' : isNearLimit ? 'text-warning' : 'text-text-tertiary'
      )}
    >
      {current}/{max}
    </span>
  );
}