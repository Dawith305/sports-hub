import { Link } from 'react-router-dom';
import backArrowUrl from '../../assets/icons/back-arrow.svg';
import type { SportsDbEvent } from '../../types/sportsdb';
import { ROUTES } from '../../lib/constants';
import { formatScoreLine, matchStatusLabel } from '../../utils/score';

interface MatchHeroProps {
  event: SportsDbEvent;
  homeBadgeOverride?: string | null;
  awayBadgeOverride?: string | null;
}

const subTabs = ['Details', 'Odds', 'Lineups', 'Events', 'Stats', 'Standings'] as const;

export function MatchHero({ event, homeBadgeOverride, awayBadgeOverride }: Readonly<MatchHeroProps>) {
  const { home, away, isScheduled } = formatScoreLine(event);
  const status = matchStatusLabel(event);
  const date = event.dateEvent
    ? new Date(event.dateEvent).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
      }).toUpperCase()
    : '';

  const homeBadge = homeBadgeOverride ?? event.strHomeTeamBadge;
  const awayBadge = awayBadgeOverride ?? event.strAwayTeamBadge;

  return (
    <div className="bg-hub-surface">
      <div className="flex items-center gap-4 px-4 py-3">
        <Link to={ROUTES.HOME} className="inline-flex shrink-0 text-hub-fg hover:opacity-80" aria-label="Back to matches">
          <img src={backArrowUrl} alt="" className="h-6 w-6 shrink-0" />
        </Link>
        <span className="text-sm font-normal leading-5 text-hub-fg">
          {event.strLeague || 'Match'}
        </span>
      </div>

      <div className="flex items-center px-4 pb-3">
        <div className="flex flex-1 flex-col items-center gap-2">
          <TeamBadge src={homeBadge} size={48} />
          <span className="text-center text-sm font-medium leading-5 text-hub-fg">
            {event.strHomeTeam}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 px-6">
          <span className="text-[11px] font-normal leading-[15px] text-hub-fg-subtle">
            {date}
          </span>
          <span className="text-[22px] font-semibold leading-7 tracking-tight text-hub-fg">
            {isScheduled ? 'vs' : `${home} - ${away}`}
          </span>
          {!isScheduled && (
            <span className="rounded-[var(--hub-radius-sm)] bg-hub-secondary px-2.5 py-0.5 text-[11px] font-normal leading-[15px] text-hub-fg-inverse">
              {status === 'Full Time' ? 'Finished' : status}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col items-center gap-2">
          <TeamBadge src={awayBadge} size={48} />
          <span className="text-center text-sm font-medium leading-5 text-hub-fg">
            {event.strAwayTeam}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-0 overflow-x-auto border-t border-hub-border px-4">
        {subTabs.map((tab) => {
          const isActive = tab === 'Events';
          return (
            <span
              key={tab}
              className={[
                'shrink-0 cursor-default px-3 py-2.5 text-sm font-normal leading-5 whitespace-nowrap sm:px-4',
                isActive
                  ? 'border-b-2 border-hub-secondary text-hub-fg'
                  : 'text-hub-fg-muted',
              ].join(' ')}
            >
              {tab}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function TeamBadge({ src, size }: Readonly<{ src: string | null | undefined; size: number }>) {
  if (!src) {
    return (
      <div
        className="rounded-full bg-hub-surface-muted"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <img
      src={src}
      alt=""
      className="object-contain"
      style={{ width: size, height: size }}
      loading="lazy"
    />
  );
}
