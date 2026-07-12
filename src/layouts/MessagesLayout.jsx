import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import LeftSidebar from '@/components/common/LeftSidebar';

export default function MessagesLayout() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navbar variant="app" />
      <div className="max-w-screen-2xl mx-auto flex flex-1 w-full">
        <LeftSidebar />
        <div className="flex flex-1 min-w-0 h-[calc(100vh-4rem)]">
          {/* Conversation list pane */}
          <div
            className="
              w-full sm:w-80 shrink-0
              border-r border-border
              overflow-y-auto scrollbar-hide
            "
          >
            {/* conversation list content slot */}
          </div>

          {/* Active thread pane */}
          <div className="hidden sm:flex flex-col flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}