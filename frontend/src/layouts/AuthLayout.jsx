import { Outlet } from 'react-router-dom';
import Logo from '@/components/ui/Logo';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-subtle via-bg-base to-bg-base flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8">
        <Logo size="md" />
      </div>

      <div className="w-full max-w-md bg-bg-surface border-t-4 border-t-accent border-x border-b border-border rounded-xl shadow-lg p-8 sm:p-10">
        <Outlet />
      </div>
    </div>
  );
}