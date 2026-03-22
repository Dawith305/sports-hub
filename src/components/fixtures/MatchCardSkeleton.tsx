import { Skeleton } from '../ui/Skeleton';

export function FixtureRowSkeleton() {
  return (
    <div className="flex items-center border-b border-hub-border py-2">
      <div className="flex h-[60px] flex-1 items-start border-l-[3px] border-hub-border-muted">
        <div className="flex h-full w-14 flex-col items-center justify-center">
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex w-10 flex-col items-center gap-2 py-1">
          <Skeleton className="h-3 w-4" />
          <Skeleton className="h-3 w-4" />
        </div>
        <Skeleton className="h-4 w-4" />
      </div>
    </div>
  );
}
