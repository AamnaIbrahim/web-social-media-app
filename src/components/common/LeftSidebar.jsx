import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, MessageCircle, Bell, Bookmark, User, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function LeftSidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', to: ROUTES.HOME, match: (path) => path === ROUTES.HOME },
    { icon: Compass, label: 'Explore', to: ROUTES.EXPLORE, match: (path) => path === ROUTES.EXPLORE },
    { icon: MessageCircle, label: 'Messages', to: ROUTES.MESSAGES, match: (path) => path.startsWith('/messages') },
    { icon: Bell, label: 'Notifications', to: ROUTES.NOTIFICATIONS, match: (path) => path === ROUTES.NOTIFICATIONS },
    { icon: Bookmark, label: 'Saved', to: ROUTES.SAVED, match: (path) => path === ROUTES.SAVED },
    {
      icon: User,
      label: 'Profile',
      to: user ? `/profile/${user.username}` : '#',
      match: (path) => path.startsWith('/profile/'),
    },
    { icon: Settings, label: 'Settings', to: ROUTES.SETTINGS, match: (path) => path.startsWith('/settings') },
  ];

  return (
    <aside
      className="
        hidden lg:flex flex-col
        sticky top-16 h-[calc(100vh-4rem)]
        w-60 shrink-0
        px-3 py-6
        border-r border-border
        overflow-y-auto scrollbar-hide
      "
    >
      <nav className="flex flex-col gap-1">
        {navItems.map(({ icon: Icon, label, to, match }) => {
          const isActive = match(location.pathname);

          return (
            <Link
              key={label}
              to={to}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-150 text-sm font-medium',
                isActive
                  ? 'bg-bg-subtle text-text-primary'
                  : 'text-text-secondary hover:bg-bg-subtle hover:text-text-primary'
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.75} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}