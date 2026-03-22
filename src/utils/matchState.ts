import type { SportsDbEvent } from '../types/sportsdb';

export type MatchState = 'live' | 'finished' | 'scheduled';

export function getMatchState(event: SportsDbEvent): MatchState {
  const status = event.strStatus?.toLowerCase() ?? '';
  if (status === 'not started' || status === '') return 'scheduled';
  if (
    status.includes('live') ||
    status.includes("'") ||
    status === 'ht' ||
    status === '1h' ||
    status === '2h'
  )
    return 'live';
  return 'finished';
}

export function isLiveMatch(event: SportsDbEvent): boolean {
  return getMatchState(event) === 'live';
}
