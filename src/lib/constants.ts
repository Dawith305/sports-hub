export const ROUTES = {
  HOME: '/',
  MATCH: '/match/:eventId',
} as const;

export const paths = {
  match: (eventId: string) => `/match/${encodeURIComponent(eventId)}`,
} as const;

export const SPORTSDB = {
  eventsNext: 'eventsnext.php',
  eventsNextLeague: 'eventsnextleague.php',
  lookupEvent: 'lookupevent.php',
} as const;
