import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import LeftSidebar from '@/components/common/LeftSidebar';

export default function ProfileLayout() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar variant="app" />
      <div className="max-w-screen-2xl mx-auto flex">
        <LeftSidebar />
        <main className="flex-1 min-w-0 px-4 sm:px-6 py-6 max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}