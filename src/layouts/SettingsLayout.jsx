import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import LeftSidebar from '@/components/common/LeftSidebar';

const settingsNav = [
  'Account', 'Privacy', 'Notifications', 'Appearance', 'Security',
];

export default function SettingsLayout() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar variant="app" />
      <div className="max-w-screen-2xl mx-auto flex">
        <LeftSidebar />
        <div className="flex flex-1 min-w-0 max-w-4xl mx-auto py-6 px-4 sm:px-6 gap-8">
          <nav
            className="
              hidden md:flex flex-col gap-1
              w-48 shrink-0
              sticky top-20 h-fit
            "
          >
            {settingsNav.map((item) => (
              <button
                key={item}
                className="
                  text-left px-3 py-2 rounded-md text-sm font-medium
                  text-text-secondary hover:bg-bg-subtle hover:text-text-primary
                  transition-colors duration-150
                "
              >
                {item}
              </button>
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