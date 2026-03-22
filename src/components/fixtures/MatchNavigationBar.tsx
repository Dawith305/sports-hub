import calendarOutlineUrl from '../../assets/icons/calendar-outline.svg';
import chevronLeftUrl from '../../assets/icons/chevron-left.svg';
import chevronRightUrl from '../../assets/icons/chevron-right.svg';

interface MatchNavigationBarProps {
  label?: string;
}

export function MatchNavigationBar({ label = 'Today' }: Readonly<MatchNavigationBarProps>) {
  return (
    <div className="flex items-center gap-6 rounded-[var(--hub-radius-md)] bg-hub-surface px-4 py-2">
      <div className="flex items-center justify-center rounded-[var(--hub-radius-sm)] p-2 text-hub-fg-muted">
        <img src={chevronLeftUrl} alt="" className="h-[20px] w-[20px]" />
      </div>
      <div className="flex flex-1 items-center justify-center gap-2.5 py-2">
        <img src={calendarOutlineUrl} alt="" className="h-6 w-6 shrink-0" />
        <span className="text-sm font-medium leading-5 text-hub-fg">{label}</span>
      </div>
      <div className="flex items-center justify-center rounded-[var(--hub-radius-sm)] p-2 text-hub-fg-muted">
        <img src={chevronRightUrl} alt="" className="h-[20px] w-[20px]" />
      </div>
    </div>
  );
}
