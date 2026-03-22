import chevronRightUrl from '../../assets/icons/chevron-right.svg';
import type { SportsDbEvent } from '../../types/sportsdb';
import { FixtureRow } from './FixtureRow';

interface LeagueSectionProps {
  title: string
  events: SportsDbEvent[]
}

export function LeagueSection({ title, events }: Readonly<LeagueSectionProps>) {
  return (
    <div className="rounded-[var(--hub-radius-md)] bg-hub-surface p-4">
      <div className="mb-2 flex items-start justify-between">
        <span className="text-sm font-normal leading-5 text-hub-fg">{title}</span>
        <img src={chevronRightUrl} alt="" className="h-[18px] w-[18px] shrink-0" />
      </div>
      <div>
        {events.map((e) => (
          <FixtureRow key={e.idEvent} event={e} />
        ))}
      </div>
    </div>
  );
}

