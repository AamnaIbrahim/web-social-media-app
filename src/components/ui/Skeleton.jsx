import { cn } from '@/utils/cn';

export function Skeleton({ className }) {
  return <div className={cn('skeleton', className)} />;
}

export function SkeletonText({ lines = 1, className }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn('h-3.5 rounded', i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full')} />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 'md' }) {
  const map = { sm: 'w-7 h-7', md: 'w-10 h-10', lg: 'w-16 h-16' };
  return <Skeleton className={cn('rounded-full', map[size])} />;
}

export function SkeletonCard() {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <SkeletonText lines={2} className="flex-1" />
      </div>
      <Skeleton className="w-full h-48 rounded-md" />
    </div>
  );
}