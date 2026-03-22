import { useCallback, useEffect, useState } from 'react';
import { SPORTSDB } from '../lib/constants';
import { useApi } from './useApi';
import type { EventsResponse, SportsDbEvent } from '../types/sportsdb';

const POLL_MS = 15_000;

export interface UseUpcomingMatchesResult {
  events: SportsDbEvent[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useUpcomingMatches(leagueId: string): UseUpcomingMatchesResult {
  const { request } = useApi();
  const [events, setEvents] = useState<SportsDbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(
    async (showSkeleton: boolean) => {
      if (showSkeleton) setLoading(true);
      try {
        const json = await request<EventsResponse>(SPORTSDB.eventsNextLeague, {
          method: 'GET',
          query: { id: leagueId },
        });
        setEvents(json.events ?? []);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
        setEvents([]);
      } finally {
        if (showSkeleton) setLoading(false);
      }
    },
    [request, leagueId],
  );

  useEffect(() => {
    load(true);
    const intervalId = globalThis.setInterval(() => {
      load(false);
    }, POLL_MS);

    return () => {
      globalThis.clearInterval(intervalId);
    };
  }, [load]);

  const refetch = useCallback(async () => {
    await load(true);
  }, [load]);

  return { events, loading, error, refetch };
}
