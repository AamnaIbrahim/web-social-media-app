import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-3xl font-bold text-text-primary">404</p>
      <p className="text-text-secondary max-w-sm">
        This page doesn't exist, or you don't have access to it.
      </p>
      <Link to={ROUTES.LANDING} className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}