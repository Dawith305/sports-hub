import { Link } from 'react-router-dom';
import moreVerticalUrl from '../../assets/icons/more-vertical.svg';
import type { SportsDbEvent } from '../../types/sportsdb';
import { paths } from '../../lib/constants';
import { formatKickoffTime, formatScoreLine, matchStatusLabel } from '../../utils/score';
import { getMatchState, type MatchState } from '../../utils/matchState';

interface FixtureRowProps {
  event: SportsDbEvent
}

function borderColor(state: MatchState): string {
  switch (state) {
    case 'live':
      return 'border-hub-secondary';
    case 'finished':
      return 'border-hub-danger';
    case 'scheduled':
      return 'border-hub-border-muted';
  }
}

function timeColor(state: MatchState): string {
  switch (state) {
    case 'live':
      return 'text-hub-secondary';
    case 'finished':
      return 'text-hub-danger';
    case 'scheduled':
      return 'text-hub-fg';
  }
}

export function FixtureRow({ event }: Readonly<FixtureRowProps>) {
  const state = getMatchState(event);
  const { home, away, isScheduled } = formatScoreLine(event);
  const time = formatKickoffTime(event);
  const status = matchStatusLabel(event);

  const finishedOrStatus = state === 'finished' ? 'FT' : status;
  const timeLabel = isScheduled ? time : finishedOrStatus;

  const detailBg = state === 'live' ? 'bg-gradient-to-r from-[rgba(0,255,165,0.1)] to-[rgba(17,24,39,0)] to-[31%]' : '';

  return (
    <Link
      to={paths.match(event.idEvent)}
      state={{
        homeBadge: event.strHomeTeamBadge ?? null,
        awayBadge: event.strAwayTeamBadge ?? null,
      }}
      className="flex items-center overflow-hidden border-b border-hub-border py-[8px] transition-colors last:border-b-0 hover:bg-hub-surface-muted/30"
    >
      <div
        className={`flex h-[60px] flex-1 items-start justify-center border-l-[3px] ${borderColor(state)} ${detailBg}`}
      >
        <div className="flex h-full w-14 shrink-0 flex-col items-center justify-center gap-1">
          <span className={`text-center text-xs font-normal leading-4 ${timeColor(state)}`}>
            {timeLabel}
          </span>
          {state === 'live' && (
            <div className="h-0.5 w-4 rounded-full bg-hub-secondary" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-2">
          <TeamRow
            name={event.strHomeTeam}
            badge={event.strHomeTeamBadge}
          />
          <TeamRow
            name={event.strAwayTeam}
            badge={event.strAwayTeamBadge}
          />
        </div>
      </div>
      <div className="flex h-full items-center gap-2">
        {isScheduled ? (
          <div className="w-10 opacity-0" />
        ) : (
          <div className="flex w-10 flex-col items-center justify-between py-1 text-center text-xs font-semibold leading-4 text-hub-fg">
            <span>{home}</span>
            <span>{away}</span>
          </div>
        )}
        <div className="flex items-center pl-2">
          <img src={moreVerticalUrl} alt="" className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function TeamRow({
  name,
  badge,
}: Readonly<{
  name: string
  badge: string | null | undefined
}>) {
  return (
    <div className="flex h-[18px] items-center gap-2">
      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
        {badge ? (
          <img src={badge} alt="" className="h-4 w-4 object-contain" loading="lazy" />
        ) : (
          <div className="h-4 w-4 rounded-full bg-hub-surface-muted" />
        )}
      </div>
      <span className="truncate text-xs font-normal leading-4 text-hub-fg">{name}</span>
    </div>
  );
}

