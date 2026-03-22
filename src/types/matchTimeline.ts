export type TimelineSide = 'home' | 'away';

export type TimelineEventKind =
  | 'goal'
  | 'substitution'
  | 'yellow'
  | 'red'
  | 'corner'
  | 'injury'
  | 'goalPost';

export interface TimelineEventItem {
  id: string;
  minute: string;
  side: TimelineSide;
  kind: TimelineEventKind;
  title: string;
  subtitle?: string;
  highlightMinute?: boolean;
}

export interface MatchTimelineMock {
  fulltimeLabel: string;
  halftimeLabel: string;
  kickoffLabel: string;
  secondHalf: TimelineEventItem[];
  firstHalf: TimelineEventItem[];
}
