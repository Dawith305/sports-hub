interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: Readonly<ErrorStateProps>) {
  return (
    <div
      role="alert"
      className="rounded-[var(--hub-radius-lg)] border border-hub-danger/40 bg-hub-danger/10 px-4 py-6 text-center"
    >
      <p className="text-sm text-hub-fg">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-[var(--hub-radius-md)] bg-hub-primary px-4 py-2 text-sm font-medium leading-5 text-hub-fg hover:opacity-90"
        >
          Try again
        </button>
      )}
    </div>
  );
}
