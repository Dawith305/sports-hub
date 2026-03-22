import { useCallback, useEffect, useState } from 'react';
import { SPORTSDB } from '../lib/constants';
import { useApi } from './useApi';
import type { EventsResponse, SportsDbEvent } from '../types/sportsdb';

export interface UseMatchDetailsResult {
  match: SportsDbEvent | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useMatchDetails(eventId: string | undefined): UseMatchDetailsResult {
  const { request } = useApi();
  const [match, setMatch] = useState<SportsDbEvent | null>(null);
  const [loading, setLoading] = useState(Boolean(eventId));
  const [error, setError] = useState<Error | null>(null);

  const fetchMatch = useCallback(async () => {
    if (!eventId) {
      setMatch(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const json = await request<EventsResponse>(SPORTSDB.lookupEvent, {
        method: 'GET',
        query: { id: eventId },
      });
      const first = json.events?.[0] ?? null;
      setMatch(first);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      setMatch(null);
    } finally {
      setLoading(false);
    }
  }, [eventId, request]);

  useEffect(() => {
    fetchMatch();
  }, [fetchMatch]);

  return { match, loading, error, refetch: fetchMatch };
}
