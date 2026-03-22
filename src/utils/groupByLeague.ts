import type { SportsDbEvent } from '../types/sportsdb';

export function groupEventsByLeague(events: SportsDbEvent[]): Map<string, SportsDbEvent[]> {
  const map = new Map<string, SportsDbEvent[]>();
  for (const e of events) {
    const key = e.strLeague?.trim() || 'Other';
    const list = map.get(key) ?? [];
    list.push(e);
    map.set(key, list);
  }
  return map;
}
