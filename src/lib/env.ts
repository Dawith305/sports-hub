export function getApiBase(): string {
  const base = import.meta.env.VITE_THESPORTSDB_API_BASE;
  if (!base?.trim()) {
    throw new Error('Missing VITE_THESPORTSDB_API_BASE');
  }
  return base.replace(/\/$/, '');
}

export function getDefaultLeagueId(): string {
  return import.meta.env.VITE_DEFAULT_LEAGUE_ID?.trim() || '4328';
}
