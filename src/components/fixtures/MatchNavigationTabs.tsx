import heartActiveUrl from '../../assets/icons/tab-heart-active.svg';
import heartInactiveUrl from '../../assets/icons/tab-heart-inactive.svg';
import liveActiveUrl from '../../assets/icons/tab-live-active.svg';
import liveInactiveUrl from '../../assets/icons/tab-live-inactive.svg';

export type TabId = 'all' | 'live' | 'favorites';

interface MatchTabsProps {
  active: TabId;
  counts?: { all?: number; live?: number; favorites?: number };
  onChange?: (id: TabId) => void;
}

const tabs: { id: TabId; label: string; icon?: 'live' | 'heart' }[] = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live', icon: 'live' },
  { id: 'favorites', label: 'Favorites', icon: 'heart' },
];

export function MatchTabs({ active, counts = {}, onChange }: Readonly<MatchTabsProps>) {
  return (
    <div className="flex gap-4">
      {tabs.map(({ id, label, icon }) => {
        const isActive = active === id;
        const count = counts[id];
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange?.(id)}
            className={[
              'flex items-center gap-2 rounded-[var(--hub-radius-md)] px-3 py-2 text-sm font-medium leading-5 transition-colors',
              isActive
                ? 'bg-hub-secondary text-hub-fg-inverse'
                : 'bg-hub-surface text-hub-fg-muted',
            ].join(' ')}
          >
            {icon === 'live' && (
              <img src={isActive ? liveActiveUrl : liveInactiveUrl} alt="" className="h-5 w-5" />
            )}
            {icon === 'heart' && (
              <img src={isActive ? heartActiveUrl : heartInactiveUrl} alt="" className="h-4 w-4" />
            )}
            {label}
            {count !== undefined && (
              <span
                className={[
                  'flex h-4 min-w-4 items-center justify-center rounded-xl text-xs font-semibold leading-4',
                  isActive
                    ? 'bg-hub-canvas text-hub-secondary'
                    : 'bg-hub-canvas text-hub-fg',
                ].join(' ')}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
