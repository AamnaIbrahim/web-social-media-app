import { cn } from '@/utils/cn';

const sizeMap = { sm: 'w-4 h-4 border-2', md: 'w-6 h-6 border-2', lg: 'w-9 h-9 border-[3px]' };

export default function Loader({ size = 'md', className }) {
  return (
    <span
      className={cn(
        'inline-block rounded-full border-border-strong border-t-accent animate-spin',
        sizeMap[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}