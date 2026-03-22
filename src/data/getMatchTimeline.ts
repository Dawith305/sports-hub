import type { MatchTimelineMock } from '../types/matchTimeline';
import { matchTimelineDefault } from './matchTimelineDefault';

const timelineByEventId: Record<string, MatchTimelineMock> = {};

export function getTimelineForEvent(eventId: string): MatchTimelineMock {
  return timelineByEventId[eventId] ?? matchTimelineDefault;
}
