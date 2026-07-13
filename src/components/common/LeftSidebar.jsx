import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, MessageCircle, Bookmark } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function LeftSidebar() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', to: ROUTES.HOME, match: (path) => path === ROUTES.HOME },
    { icon: Compass, label: 'Explore', to: ROUTES.EXPLORE, match: (path) => path === ROUTES.EXPLORE },
    { icon: MessageCircle, label: 'Messages', to: ROUTES.MESSAGES, match: (path) => path.startsWith('/messages') },
    { icon: Bookmark, label: 'Saved', to: ROUTES.SAVED, match: (path) => path === ROUTES.SAVED },
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
                  ? 'bg-accent-subtle text-accent'
                  : 'text-text-secondary hover:bg-bg-subtle hover:text-text-primary'
              )}
            >
            <Icon size={20} strokeWidth={isActive ? 2 : 1.75} className={isActive ? 'text-accent' : undefined} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}