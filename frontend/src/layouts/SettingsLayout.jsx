import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

const settingsNav = [
  { label: 'Account', to: ROUTES.SETTINGS_ACCOUNT },
  { label: 'Privacy', to: ROUTES.SETTINGS_PRIVACY },
  { label: 'Notifications', to: ROUTES.SETTINGS_NOTIFICATIONS },
  { label: 'Appearance', to: ROUTES.SETTINGS_APPEARANCE },
  { label: 'Security', to: ROUTES.SETTINGS_SECURITY },
];

export default function SettingsLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar variant="app" />
      <div className="max-w-screen-2xl mx-auto flex">
        <aside className="hidden lg:flex flex-col sticky top-16 h-[calc(100vh-4rem)] w-60 shrink-0 px-3 py-6 border-r border-border overflow-y-auto scrollbar-hide">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 mb-4 rounded-md text-sm font-medium text-text-secondary hover:bg-bg-subtle hover:text-text-primary transition-colors duration-150"
          >
            <ArrowLeft size={18} strokeWidth={1.75} />
            Back
          </button>

          <p className="px-3 text-xs font-semibold text-text-tertiary uppercase tracking-wide mb-2">
            Settings
          </p>

          <nav className="flex flex-col gap-1">
            {settingsNav.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'bg-accent-subtle text-accent'
                      : 'text-text-secondary hover:bg-bg-subtle hover:text-text-primary'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 min-w-0 max-w-3xl mx-auto py-6 px-4 sm:px-6 pb-24 lg:pb-6">
          <div className="lg:hidden mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary mb-4"
            >
              <ArrowLeft size={18} strokeWidth={1.75} />
              Back
            </button>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
              {settingsNav.map(({ label, to }) => {
                const isActive = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={cn(
                      'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap',
                      isActive
                        ? 'bg-accent text-text-inverse'
                        : 'bg-bg-subtle text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <Outlet />
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}