import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import LeftSidebar from '@/components/common/LeftSidebar';
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

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar variant="app" />
      <div className="max-w-screen-2xl mx-auto flex">
        <LeftSidebar />
        <div className="flex flex-1 min-w-0 max-w-4xl mx-auto py-6 px-4 sm:px-6 gap-8">
          <nav className="hidden md:flex flex-col gap-1 w-48 shrink-0 sticky top-20 h-fit">
            {settingsNav.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
                  location.pathname === to
                    ? 'bg-bg-subtle text-text-primary'
                    : 'text-text-secondary hover:bg-bg-subtle hover:text-text-primary'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}