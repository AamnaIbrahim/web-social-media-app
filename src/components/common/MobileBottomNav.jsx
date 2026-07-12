import { NavLink } from 'react-router-dom';
import { Home, Compass, MessageCircle, Bell, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function MobileBottomNav({ className }) {
  const { user } = useAuth();

  const items = [
    { icon: Home, to: ROUTES.HOME, label: 'Home' },
    { icon: Compass, to: ROUTES.EXPLORE, label: 'Explore' },
    { icon: MessageCircle, to: ROUTES.MESSAGES, label: 'Messages' },
    { icon: Bell, to: ROUTES.NOTIFICATIONS, label: 'Notifications' },
    { icon: User, to: user ? `/profile/${user.username}` : '#', label: 'Profile' },
  ];

  return (
    <nav
      className={cn(
        'lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-surface/90 backdrop-blur-md border-t border-border flex items-center justify-around h-14',
        className
      )}
      aria-label="Primary"
    >
      {items.map(({ icon: Icon, to, label }) => (
        <NavLink
          key={label}
          to={to}
          aria-label={label}
          className={({ isActive }) =>
            cn('flex flex-col items-center justify-center gap-0.5 flex-1 h-full', isActive ? 'text-accent' : 'text-text-tertiary')
          }
        >
          <Icon size={20} strokeWidth={1.75} />
        </NavLink>
      ))}
    </nav>
  );
}