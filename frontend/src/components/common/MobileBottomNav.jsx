import { NavLink } from 'react-router-dom';
import { Home, Compass, MessageCircle, Bell, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';
import NavBadge from '@/components/ui/NavBadge';
import { useUnreadNotificationsCount } from '@/hooks/useUnreadCounts';

export default function MobileBottomNav({ className }) {
  const { user } = useAuth();
  const unreadNotifications = useUnreadNotificationsCount();

  const items = [
    { icon: Home, to: ROUTES.HOME, label: 'Home', badge: 0 },
    { icon: Compass, to: ROUTES.EXPLORE, label: 'Explore', badge: 0 },
    { icon: MessageCircle, to: ROUTES.MESSAGES, label: 'Messages', badge: 0 },
    { icon: Bell, to: ROUTES.NOTIFICATIONS, label: 'Notifications', badge: unreadNotifications },
    { icon: User, to: user ? `/profile/${user.username}` : '#', label: 'Profile', badge: 0 },
  ];

  return (
    <nav
      className={cn(
        'lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-surface/90 backdrop-blur-md border-t border-border flex items-center justify-around h-14',
        className
      )}
      aria-label="Primary"
    >
      {items.map(({ icon: Icon, to, label, badge }) => (
        <NavLink
          key={label}
          to={to}
          aria-label={label}
          className={({ isActive }) =>
            cn('flex flex-col items-center justify-center gap-0.5 flex-1 h-full', isActive ? 'text-accent' : 'text-text-tertiary')
          }
        >
          <span className="relative inline-flex">
            <Icon size={20} strokeWidth={1.75} />
            {badge > 0 && <NavBadge count={badge} />}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}