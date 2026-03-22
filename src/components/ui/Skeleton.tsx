import type { HTMLAttributes } from 'react';

export function Skeleton({
  className = '',
  ...rest
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`animate-pulse rounded-[var(--hub-radius-md)] bg-hub-surface-muted/80 ${className}`}
      {...rest}
    />
  );
}
