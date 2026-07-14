import { AlertCircle, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications, useMarkAsRead, useMarkAllAsRead } from '@/features/notifications/hooks/useNotifications';
import NotificationCard from '@/components/ui/NotificationCard';
import { SkeletonAvatar, SkeletonText } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import { formatTimeAgo } from '@/utils/formatDate';

export default function Notifications() {
  const { data: notifications, isLoading, isError, refetch } = useNotifications();
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const navigate = useNavigate();

  const hasUnread = notifications?.some((n) => !n.read);

  const handleNotificationClick = (notification) => {
    if (!notification.read) markAsReadMutation.mutate(notification.id);
    if (notification.targetPostId) {

      navigate(`/profile/${notification.user?.username}`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Notifications</h1>
          <p className="text-sm text-text-secondary">Likes, comments, and follows</p>
        </div>
        {hasUnread && (
          <Button
            variant="ghost"
            size="sm"
            isLoading={markAllAsReadMutation.isPending}
            onClick={() => markAllAsReadMutation.mutate()}
          >
            Mark all as read
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <SkeletonAvatar size="md" />
              <SkeletonText lines={2} className="flex-1" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center text-center gap-3 py-16">
          <AlertCircle size={40} strokeWidth={1.5} className="text-error" />
          <p className="text-base font-semibold text-text-primary">Couldn't load notifications</p>
          <p className="text-sm text-text-secondary max-w-xs">
            Something went wrong. Check your connection and try again.
          </p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>Retry</Button>
        </div>
      )}

      {!isLoading && !isError && notifications?.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center gap-3 py-16">
          <Bell size={40} strokeWidth={1.5} className="text-text-tertiary" />
          <p className="text-base font-semibold text-text-primary">No notifications yet</p>
          <p className="text-sm text-text-secondary max-w-xs">
            When someone likes, comments, or follows you, it'll show up here.
          </p>
        </div>
      )}

      {!isLoading && !isError && notifications?.length > 0 && (
        <div className="flex flex-col gap-1">
          {notifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={{ ...n, timeAgo: formatTimeAgo(n.createdAt) }}
              onClick={() => handleNotificationClick(n)}
            />
          ))}
        </div>
      )}
    </div>
  );
}