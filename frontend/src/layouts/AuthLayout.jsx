import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-bg-base">
      <div
        className="
          hidden lg:flex flex-col justify-end
          bg-gradient-to-br from-accent to-accent-hover
          p-12 relative overflow-hidden
        "
      >
        <div className="relative z-10 text-text-inverse">
          <div className="flex items-center gap-2 mb-auto">
            <div className="w-8 h-8 rounded-full bg-white/20" />
            <span className="text-lg font-bold">hue</span>
          </div>
        </div>
        {/* testimonial / quote slot renders here*/}
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}