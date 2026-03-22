import type { SportsDbEvent } from '../types/sportsdb';

export function formatScoreLine(event: SportsDbEvent): {
  home: string
  away: string
  isScheduled: boolean
} {
  const h = event.intHomeScore;
  const a = event.intAwayScore;
  const hasScore =
    h !== null &&
    h !== undefined &&
    h !== '' &&
    a !== null &&
    a !== undefined &&
    a !== '';

  if (hasScore) {
    return { home: String(h), away: String(a), isScheduled: false };
  }
  return { home: '–', away: '–', isScheduled: true };
}

export function formatKickoffTime(event: SportsDbEvent): string {
  if (event.strTime) {
    const [hh, mm] = event.strTime.split(':');
    if (hh && mm) return `${hh}:${mm.slice(0, 2)}`;
  }
  if (event.strTimestamp) {
    const d = new Date(event.strTimestamp);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    }
  }
  return '—';
}

export function matchStatusLabel(event: SportsDbEvent): string {
  if (event.strStatus) return event.strStatus;
  const { isScheduled } = formatScoreLine(event);
  if (!isScheduled) return 'Full Time';
  return 'Upcoming';
}
