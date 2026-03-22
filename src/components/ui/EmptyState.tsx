interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'No upcoming fixtures right now.' }: Readonly<EmptyStateProps>) {
  return (
    <div className="rounded-[var(--hub-radius-lg)] border border-hub-border bg-hub-surface/60 px-4 py-12 text-center">
      <p className="text-sm text-hub-fg-muted">{message}</p>
    </div>
  );
}
