import { Heart, UserPlus, MessageCircle, FileText } from 'lucide-react';
import { useWeeklyInsights } from '@/features/explore/hooks/useWeeklyInsights';
import { Skeleton } from '@/components/ui/Skeleton';

const STAT_CONFIG = [
  { key: 'newFollowers', icon: UserPlus, label: 'new followers', bg: 'bg-success-subtle', color: 'text-success' },
  { key: 'likesReceived', icon: Heart, label: 'likes received', bg: 'bg-error-subtle', color: 'text-error' },
  { key: 'commentsReceived', icon: MessageCircle, label: 'comments received', bg: 'bg-accent-subtle', color: 'text-accent' },
  { key: 'postsThisWeek', icon: FileText, label: 'posts shared', bg: 'bg-warning-subtle', color: 'text-warning' },
];

export default function WeekInReviewCard() {
  const { data, isLoading } = useWeeklyInsights();

  if (isLoading) {
    return (
      <div className="card !p-4 flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  const hasActivity = data && Object.values(data).some((v) => v > 0);
  if (!hasActivity) return null;

  return (
    <div className="card !p-4">
      <h3 className="text-sm font-semibold text-text-secondary mb-3">Your week</h3>
      <div className="grid grid-cols-2 gap-3">
        {STAT_CONFIG.map(({ key, icon: Icon, label, bg, color }) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center shrink-0`}>
              <Icon size={15} strokeWidth={1.75} className={color} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-text-primary leading-none">{data[key]}</p>
              <p className="text-xs text-text-tertiary truncate">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}