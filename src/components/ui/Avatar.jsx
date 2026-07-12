import { cn } from '@/utils/cn';

const sizeMap = { sm: 'avatar-sm', md: 'avatar-md', lg: 'avatar-lg', xl: 'avatar-xl' };
const statusColor = { online: 'bg-success', offline: 'bg-text-tertiary', away: 'bg-warning' };

export default function Avatar({ src, name = '', size = 'md', status, className }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={cn('relative inline-flex shrink-0', sizeMap[size], className)}>
      {src ? (
        <img src={src} alt={name} className={cn('avatar w-full h-full', sizeMap[size])} />
      ) : (
        <div className={cn('avatar w-full h-full flex items-center justify-center text-text-secondary font-medium bg-bg-inset', sizeMap[size])}>
          {initials || '?'}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-bg-surface',
            statusColor[status],
            size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'
          )}
        />
      )}
    </div>
  );
}