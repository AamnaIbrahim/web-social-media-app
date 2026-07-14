import { Heart, MessageCircle, UserPlus, AtSign } from 'lucide-react';
import Avatar from './Avatar';
import { cn } from '@/utils/cn';

const typeConfig = {
  like: { icon: Heart, color: 'text-error' },
  comment: { icon: MessageCircle, color: 'text-accent' },
  follow: { icon: UserPlus, color: 'text-success' },
  mention: { icon: AtSign, color: 'text-warning' },
};

export default function NotificationCard({ notification, onClick }) {
  const { icon: Icon, color } = typeConfig[notification.type];

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-start gap-3 px-4 py-3 rounded-md transition-colors duration-150 hover:bg-bg-subtle text-left',
        !notification.read && 'bg-accent-subtle/40'
      )}
    >
      <div className="relative shrink-0">
        <Avatar src={notification.user?.avatarUrl} name={notification.user?.name} size="md" />
        <span className={cn('absolute -bottom-1 -right-1 bg-bg-surface rounded-full p-1', color)}>
          <Icon size={12} strokeWidth={2} fill="currentColor" />
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary">
          <span className="font-semibold">{notification.user?.name}</span> {notification.message}
        </p>
        <p className="text-xs text-text-tertiary mt-0.5">{notification.timeAgo}</p>
      </div>

      {!notification.read && (
        <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5" aria-label="Unread" />
      )}
    </button>
  );
}