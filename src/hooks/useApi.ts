import { useCallback, useMemo } from 'react';
import { ofetch } from 'ofetch';
import { getApiBase } from '../lib/env';

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRequestOptions {
  method?: ApiMethod;
  query?: Record<string, string | undefined>;
  body?: Record<string, unknown> | BodyInit | null;
  headers?: HeadersInit;
}

function compactQuery(q?: Record<string, string | undefined>) {
  if (!q) return undefined;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(q)) {
    if (v !== undefined && v !== '') out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

export function useApi() {
  const client = useMemo(() => {
    const baseURL = `${getApiBase().replace(/\/$/, '')}/`;
    return ofetch.create({
      baseURL,
      headers: { Accept: 'application/json' },
    });
  }, []);

  const request = useCallback(
    async <T>(path: string, options?: ApiRequestOptions): Promise<T> => {
      const { method = 'GET', query, body, headers } = options ?? {};
      const result = await client<T>(path.replace(/^\//, ''), {
        method,
        query: compactQuery(query),
        body,
        headers,
      });
      return result;
    },
    [client],
  );

  return { request };
}
