import { Skeleton } from '../ui/Skeleton';

export function MatchDetailSkeleton() {
  return (
    <div className="bg-hub-surface">
      <div className="flex items-center gap-4 px-4 py-3">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex items-center px-4 pb-4">
        <div className="flex flex-1 flex-col items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex flex-col items-center gap-2 px-4">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-5 w-14 rounded" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="flex gap-4 border-t border-hub-border px-4 py-3">
        {['a', 'b', 'c', 'd', 'e'].map((id) => (
          <Skeleton key={id} className="h-4 w-14" />
        ))}
      </div>
    </div>
  );
}
