export interface SportsDbEvent {
  idEvent: string;
  strEvent?: string | null;
  strSport?: string | null;
  idLeague?: string | null;
  strLeague?: string | null;
  strLeagueBadge?: string | null;
  strSeason?: string | null;
  strHomeTeam: string;
  strAwayTeam: string;
  idHomeTeam?: string | null;
  idAwayTeam?: string | null;
  strHomeTeamBadge?: string | null;
  strAwayTeamBadge?: string | null;
  intHomeScore?: string | null;
  intAwayScore?: string | null;
  intScore?: string | null;
  strResult?: string | null;
  dateEvent?: string | null;
  dateEventLocal?: string | null;
  strTime?: string | null;
  strTimeLocal?: string | null;
  strTimestamp?: string | null;
  strStatus?: string | null;
  strVenue?: string | null;
  strCountry?: string | null;
  strCity?: string | null;
  strThumb?: string | null;
  strPostponed?: string | null;
}

export interface EventsResponse {
  events: SportsDbEvent[] | null;
}
