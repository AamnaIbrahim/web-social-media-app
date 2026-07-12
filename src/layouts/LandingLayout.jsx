import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';

export default function LandingLayout() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar variant="marketing" />
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}