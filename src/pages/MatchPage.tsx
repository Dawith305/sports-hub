import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { MatchHero } from '../components/match/MatchHero';
import { EventTimeline } from '../components/match/EventTimeline';
import { MatchDetailSkeleton } from '../components/match/MatchDetailSkeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { useMatchDetails } from '../hooks/useMatchDetails';

interface LocationState {
  homeBadge?: string | null;
  awayBadge?: string | null;
}

export function MatchPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { match, loading, error, refetch } = useMatchDetails(eventId);

  const routeState = (location.state ?? {}) as LocationState;
  const homeBadge = match?.strHomeTeamBadge || routeState.homeBadge || null;
  const awayBadge = match?.strAwayTeamBadge || routeState.awayBadge || null;

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-[707px] flex-1 p-0 sm:p-4">
        {loading && <MatchDetailSkeleton />}

        {error && (
          <ErrorState
            message="Could not load match details."
            onRetry={refetch}
          />
        )}

        {!loading && !error && !match && (
          <div className="rounded-[var(--hub-radius-md)] bg-hub-surface p-8 text-center">
            <p className="mb-4 text-sm text-hub-fg-muted">Match not found.</p>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-[var(--hub-radius-md)] bg-hub-primary px-4 py-2 text-sm font-medium leading-5 text-hub-fg hover:opacity-90"
            >
              Go back
            </button>
          </div>
        )}

        {!loading && !error && match && (
          <div className="overflow-hidden sm:rounded-[var(--hub-radius-md)]">
            <MatchHero
              event={match}
              homeBadgeOverride={homeBadge}
              awayBadgeOverride={awayBadge}
            />
            <EventTimeline event={match} />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
