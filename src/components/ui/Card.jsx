import { cn } from '@/utils/cn';

export default function Card({ children, hoverable = true, padded = true, className, ...props }) {
  return (
    <div
      className={cn(
        'card',
        !padded && '!p-0',
        !hoverable && 'hover:shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}