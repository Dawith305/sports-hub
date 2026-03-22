import chevronDownUrl from '../../assets/icons/chevron-down.svg';
import timelineCornerFlagUrl from '../../assets/icons/timeline-corner-flag.svg';
import timelineGoalBallUrl from '../../assets/icons/timeline-goal-ball.svg';
import timelineGoalPostUrl from '../../assets/icons/timeline-goal-post.svg';
import timelineInjuryUrl from '../../assets/icons/timeline-injury.svg';
import timelineRedCardUrl from '../../assets/icons/timeline-red-card.svg';
import timelineSubstitutionUrl from '../../assets/icons/timeline-substitution.svg';
import timelineYellowCardUrl from '../../assets/icons/timeline-yellow-card.svg';
import { getTimelineForEvent } from '../../data/getMatchTimeline';
import type { TimelineEventItem } from '../../types/matchTimeline';
import type { SportsDbEvent } from '../../types/sportsdb';

interface EventTimelineProps {
  event: SportsDbEvent
}

/** Event Timeline Data Not Available Component Uses Mock Data */
export function EventTimeline({ event }: Readonly<EventTimelineProps>) {
  const timeline = getTimelineForEvent(event.idEvent);

  return (
    <div className="p-4 sm:py-4 sm:px-0">
      <div className="rounded-[var(--hub-radius-md)] bg-hub-surface">
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-sm font-normal leading-5 text-hub-fg">Events</span>
          <img src={chevronDownUrl} alt="" className="h-[18px] w-[18px] shrink-0 opacity-80" />
        </div>

        <div className="px-4 pb-4">
          <TimelineDivider label={timeline.fulltimeLabel} />

          <div className="space-y-2 py-3">
            {timeline.secondHalf.map((row) => (
              <TimelineEventRow key={row.id} row={row} />
            ))}
          </div>

          <TimelineDivider label={timeline.halftimeLabel} />

          <div className="space-y-2 py-3">
            {timeline.firstHalf.map((row) => (
              <TimelineEventRow key={row.id} row={row} />
            ))}
          </div>

          <TimelineDivider label={timeline.kickoffLabel} />
        </div>
      </div>
    </div>
  );
}

function TimelineEventRow({ row }: Readonly<{ row: TimelineEventItem }>) {
  return (
    <div className="flex min-h-8 items-center gap-1">
      <div className="flex min-w-0 flex-1 items-center justify-end">
        {row.side === 'home' ? <TimelineSideContent row={row} side="home" /> : <div className="h-8" />}
      </div>

      <MinutePill row={row} />

      <div className="flex min-w-0 flex-1 items-center">
        {row.side === 'away' ? <TimelineSideContent row={row} side="away" /> : <div className="h-8" />}
      </div>
    </div>
  );
}

function TimelineSideContent({
  row,
  side,
}: Readonly<{
  row: TimelineEventItem
  side: 'home' | 'away'
}>) {
  const isHome = side === 'home';

  return (
    <div className={`flex w-full items-center ${isHome ? 'justify-end' : ''}`}>
      {isHome ? (
        <>
          <div className="flex items-center gap-2.5">
            <TwoLineLabel row={row} side={side} />
            <TimelineIcon row={row} />
          </div>
          <div className="mx-1 h-px w-4 bg-hub-border sm:w-6" />
        </>
      ) : (
        <>
          <div className="mx-1 h-px w-4 bg-hub-border sm:w-6" />
          <div className="flex items-center gap-2.5">
            <TimelineIcon row={row} />
            <TwoLineLabel row={row} side={side} />
          </div>
        </>
      )}
    </div>
  );
}

function TimelineDivider({ label }: Readonly<{ label: string }>) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="h-px flex-1 bg-hub-border" />
      <span className="whitespace-nowrap text-center text-xs font-normal leading-4 text-hub-fg-muted">
        {label}
      </span>
      <div className="h-px flex-1 bg-hub-border" />
    </div>
  );
}

function MinutePill({ row }: Readonly<{ row: TimelineEventItem }>) {
  const highlight = row.highlightMinute;
  return (
    <span
      className={`flex h-5 w-12 shrink-0 items-center justify-center rounded-full border text-center text-[11px] font-normal leading-[15px] tabular-nums ${
        highlight
          ? 'border-hub-border bg-hub-secondary text-hub-fg-inverse'
          : 'border-transparent bg-hub-surface-muted text-hub-fg'
      }`}
    >
      {row.minute}
    </span>
  );
}

function TwoLineLabel({
  row,
  side,
}: Readonly<{
  row: TimelineEventItem
  side: 'home' | 'away'
}>) {
  const alignClass = side === 'home' ? 'text-right' : 'text-left';
  return (
    <div className={`w-[54px] sm:w-[64px] ${alignClass}`}>
      <p className="truncate text-xs font-normal leading-4 text-hub-fg">{row.title}</p>
      {row.subtitle && <p className="truncate text-[11px] font-normal leading-[15px] text-hub-fg-subtle">{row.subtitle}</p>}
    </div>
  );
}

function TimelineIcon({ row }: Readonly<{ row: TimelineEventItem }>) {
  switch (row.kind) {
    case 'goal':
      return <img src={timelineGoalBallUrl} alt="" className="h-3 w-3 shrink-0" />;
    case 'substitution':
      return <img src={timelineSubstitutionUrl} alt="" className="h-3 w-3 shrink-0" />;
    case 'corner':
      return <img src={timelineCornerFlagUrl} alt="" className="h-3 w-3 shrink-0" />;
    case 'injury':
      return <img src={timelineInjuryUrl} alt="" className="h-3 w-3 shrink-0" />;
    case 'goalPost':
      return <img src={timelineGoalPostUrl} alt="" className="h-3 w-3 shrink-0" />;
    case 'yellow':
      return <CardIcon src={timelineYellowCardUrl} alt="Yellow card" />;
    case 'red':
      return <CardIcon src={timelineRedCardUrl} alt="Red card" />;
  }
}

function CardIcon({
  src,
  alt,
}: Readonly<{
  src: string
  alt: string
}>) {
  return (
    <img src={src} alt={alt} className="h-3 w-3 shrink-0" />
  );
}

