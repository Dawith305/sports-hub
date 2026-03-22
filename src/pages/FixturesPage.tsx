import { useMemo, useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { CalendarStrip } from '../components/fixtures/CalendarStrip';
import { MatchNavigationBar } from '../components/fixtures/MatchNavigationBar';
import { MatchTabs, type TabId } from '../components/fixtures/MatchNavigationTabs';
import { LeagueSection } from '../components/fixtures/LeagueSection';
import { FixtureRowSkeleton } from '../components/fixtures/MatchCardSkeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { useUpcomingMatches } from '../hooks/useUpcomingMatches';
import { getDefaultLeagueId } from '../lib/env';
import { groupEventsByLeague } from '../utils/groupByLeague';
import { isLiveMatch } from '../utils/matchState';

export function FixturesPage() {
  const leagueId = getDefaultLeagueId();
  const { events, loading, error, refetch } = useUpcomingMatches(leagueId);
  const [activeTab, setActiveTab] = useState<TabId>('all');

  const filteredEvents = useMemo(() => {
    if (activeTab === 'all') return events;
    if (activeTab === 'live') return events.filter(isLiveMatch);
    return [];
  }, [events, activeTab]);

  const grouped = useMemo(() => groupEventsByLeague(filteredEvents), [filteredEvents]);

  const liveCount = useMemo(() => events.filter(isLiveMatch).length, [events]);

  return (
    <MainLayout>
      <CalendarStrip />

      <div className="flex w-full flex-1 flex-col gap-4 p-4">
        <h1 className="hidden text-xl font-semibold leading-[26px] text-hub-fg lg:block">
          Matches
        </h1>

        <div className="hidden lg:block">
          <MatchNavigationBar />
        </div>

        <MatchTabs
          active={activeTab}
          onChange={setActiveTab}
          counts={{
            all: events.length,
            live: liveCount,
            favorites: 0,
          }}
        />

        {loading && (
          <div className="rounded-[var(--hub-radius-md)] bg-hub-surface p-4">
            {['a', 'b', 'c', 'd', 'e'].map((id) => (
              <FixtureRowSkeleton key={id} />
            ))}
          </div>
        )}

        {error && (
          <ErrorState
            message="Could not load fixtures. Check your connection and API base URL."
            onRetry={refetch}
          />
        )}

        {!loading && !error && grouped.size === 0 && <EmptyState />}

        {!loading &&
          !error &&
          Array.from(grouped.entries()).map(([league, list]) => (
            <LeagueSection
              key={league}
              title={league}
              events={list}
            />
          ))}
      </div>
    </MainLayout>
  );
}
