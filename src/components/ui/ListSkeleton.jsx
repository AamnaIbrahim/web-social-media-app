import { SkeletonAvatar, SkeletonText } from './Skeleton';

export default function ListSkeleton({ count = 4, lines = 2 }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-1 py-1">
          <SkeletonAvatar size="md" />
          <SkeletonText lines={lines} className="flex-1" />
        </div>
      ))}
    </div>
  );
}