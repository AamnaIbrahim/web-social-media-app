import Loader from '@/components/ui/Loader';
import Logo from '@/components/ui/Logo';

export default function FullScreenLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-bg-base">
      <Logo size="md" withText={false} />
      <Loader size="lg" />
    </div>
  );
}