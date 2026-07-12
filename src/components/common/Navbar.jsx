import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Bell, User, Settings, LogOut } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import SearchBar from '@/components/ui/SearchBar';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Dropdown, { DropdownItem } from '@/components/ui/Dropdown';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

export default function Navbar({ variant = 'app' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LANDING);
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="h-full max-w-screen-2xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo size="md" />

        {/* Marketing nav links (landing page only) */}
        {variant === 'marketing' && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
            <a href="#preview" className="hover:text-text-primary transition-colors">Preview</a>
            <a href="#values" className="hover:text-text-primary transition-colors">Values</a>
          </nav>
        )}

        {/* Search (app only) */}
        {variant === 'app' && (
          <div className="flex-1 max-w-md hidden md:flex">
            <SearchBar placeholder="Search" className="w-full" />
          </div>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-3 shrink-0">
          {variant === 'marketing' && (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Log in
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}

          {variant === 'app' && (
            <>
              <ThemeToggle />

              <Link to={ROUTES.MESSAGES} className="btn-ghost !p-2 rounded-full" aria-label="Messages">
                <MessageCircle size={20} strokeWidth={1.75} />
              </Link>

              <Link to={ROUTES.NOTIFICATIONS} className="btn-ghost !p-2 rounded-full" aria-label="Notifications">
                <Bell size={20} strokeWidth={1.75} />
              </Link>

              <Dropdown
                align="right"
                trigger={
                  <button aria-label="Account menu" className="rounded-full">
                    <Avatar src={user?.avatarUrl} name={user?.name} size="sm" />
                  </button>
                }
              >
                <div className="px-4 py-2.5 border-b border-border mb-1">
                  <p className="text-sm font-semibold text-text-primary truncate">{user?.name}</p>
                  <p className="text-xs text-text-tertiary truncate">@{user?.username}</p>
                </div>

                <DropdownItem
                  icon={<User size={16} strokeWidth={1.75} />}
                  onClick={() => navigate(`/profile/${user?.username}`)}
                >
                  Profile
                </DropdownItem>

                <DropdownItem
                  icon={<Settings size={16} strokeWidth={1.75} />}
                  onClick={() => navigate(ROUTES.SETTINGS)}
                >
                  Settings
                </DropdownItem>

                <DropdownItem
                  icon={<LogOut size={16} strokeWidth={1.75} />}
                  onClick={handleLogout}
                  danger
                >
                  Log out
                </DropdownItem>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </header>
  );
}