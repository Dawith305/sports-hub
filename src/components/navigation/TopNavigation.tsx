import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../../assets/logo.png';
import globeUrl from '../../assets/icons/globe.svg';
import soccerBallUrl from '../../assets/icons/soccer-ball.svg';
import flagEnglandUrl from '../../assets/icons/flag-england.svg';
import flagUkUrl from '../../assets/icons/flag-uk.svg';
import chevronDownUrl from '../../assets/icons/chevron-down.svg';
import closeUrl from '../../assets/icons/close.svg';
import menuHamburgerUrl from '../../assets/icons/menu-hamburger.svg';
import { ROUTES } from '../../lib/constants';

interface MenuItem {
  label: string;
  key: string;
}

const menuItems: MenuItem[] = [
  { label: 'Live', key: 'live', },
  { label: 'Matches', key: 'matches' },
  { label: 'Standings', key: 'standings' },
  { label: 'Teams', key: 'teams' },
  { label: 'Comparison', key: 'comparison' },
  { label: 'Statistics', key: 'statistics' },
  { label: 'Venues', key: 'venues' },
];

export function TopNavigation() {
  const [navActive] = useState<string>('live');
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerId = useId();
  const menuDialogRef = useRef<HTMLDialogElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useLayoutEffect(() => {
    if (!menuOpen) return;
    const d = menuDialogRef.current;
    if (!d) return;
    d.showModal();
    return () => {
      if (d.open) d.close();
    };
  }, [menuOpen]);

  return (
    <header className="shrink-0 border-b border-hub-outline-variant bg-hub-primary py-1">
      <div className="mx-auto flex w-full max-w-[1440px] min-w-0 items-center justify-between gap-2 px-3 sm:px-4">
        <Link
          to={ROUTES.HOME}
          className="flex min-w-0 flex-1 items-center lg:flex-none"
          onClick={closeMenu}
        >
          <img
            src={logoUrl}
            alt="Statscore"
            className="h-[26px] w-auto max-w-full object-contain object-left sm:h-[52px] lg:max-w-[280px]"
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {menuItems.map(({ label, key }) => {
            const isActive = key === navActive;
            return (
              <span
                key={key}
                className="inline-flex cursor-default flex-col items-stretch gap-0.5 px-2.5 py-2 font-display text-lg leading-[1.5] whitespace-nowrap"
              >
                <span className={`text-center ${isActive ? 'text-hub-secondary' : 'text-hub-fg'}`}>{label}</span>
                <span
                  className={`h-0.5 w-full min-w-[1em] shrink-0 rounded-full ${isActive ? 'bg-hub-secondary' : 'bg-transparent'}`}
                />
              </span>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <RoundButton aria-label="Region">
            <img src={globeUrl} alt="" className="h-[24px] w-[24px]" />
          </RoundButton>
          <RoundButton aria-label="Sport">
            <img src={soccerBallUrl} alt="" className="h-[24px] w-[24px]" />
          </RoundButton>
          <FilterChip>
            <img src={flagEnglandUrl} alt="" className="h-[18px] w-[18px] shrink-0 rounded-full object-cover" />
            <span className="text-xs font-normal leading-4 text-hub-on-surface">Premier League</span>
          </FilterChip>
          <FilterChip>
            <span className="text-xs font-normal leading-4 text-hub-on-surface">2024/25</span>
          </FilterChip>
          <RoundButton aria-label="Language">
            <img src={flagUkUrl} alt="" className="h-[24px] w-[24px] rounded-full object-cover" />
          </RoundButton>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 xl:hidden">
          <RoundButton aria-label="Region" sizeClassName="h-6 w-6 sm:h-10 sm:w-10">
            <img src={globeUrl} alt="" className="h-[16px] w-[16px] sm:h-[24px] sm:w-[24px]" />
          </RoundButton>
          <RoundButton aria-label="Sport" sizeClassName="h-6 w-6 sm:h-10 sm:w-10">
            <img src={soccerBallUrl} alt="" className="h-[16px] w-[16px] sm:h-[24px] sm:w-[24px]" />
          </RoundButton>
          <RoundButton aria-label="Language" sizeClassName="h-6 w-6 sm:h-10 sm:w-10">
            <img src={flagEnglandUrl} alt="" className="h-[16px] w-[16px] sm:h-[24px] sm:w-[24px] rounded-full object-cover" />
          </RoundButton>
          <FilterChip>
            <span className="text-xs font-normal leading-4 text-hub-on-surface">2024/25</span>
          </FilterChip>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-hub-fg sm:h-10 sm:w-10"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls={drawerId}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <img src={menuHamburgerUrl} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <dialog
          ref={menuDialogRef}
          className="fixed inset-0 z-50 m-0 h-full max-h-full w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-transparent lg:hidden"
          aria-labelledby={`${drawerId}-title`}
          onClose={() => setMenuOpen(false)}
        >
          <div className="flex h-full w-full">
            <button
              type="button"
              className="min-h-0 flex-1 cursor-default bg-black/50"
              aria-label="Close menu"
              onClick={closeMenu}
            />
            <div
              id={drawerId}
              className="flex h-full w-[min(100%,320px)] shrink-0 flex-col bg-hub-surface shadow-xl"
            >
            <div className="flex items-center justify-between border-b border-hub-border px-4 py-3">
              <span id={`${drawerId}-title`} className="font-display text-lg font-semibold text-hub-fg">
                Menu
              </span>
              <button
                type="button"
                className="rounded-full p-2 text-hub-fg-muted hover:bg-hub-surface-muted"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <img src={closeUrl} alt="" className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile navigation">
              {menuItems.map(({ label, key }) => {
                const isActive = key === navActive;
                const itemClass = isActive
                  ? 'border-l-4 border-hub-secondary bg-hub-surface-muted/50 pl-3 text-hub-secondary'
                  : 'text-hub-fg';
                return (
                  <span
                    key={key}
                    className={`block rounded-[var(--hub-radius-md)] px-3 py-3 font-display text-base leading-6 ${itemClass}`}
                  >
                    {label}
                  </span>
                );
              })}
            </nav>
            </div>
          </div>
        </dialog>
      )}
    </header>
  );
}

interface RoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  sizeClassName?: string;
}

function RoundButton({
  children,
  className,
  sizeClassName = 'h-10 w-10',
  ...props
}: Readonly<RoundButtonProps>) {
  return (
    <button
      type="button"
      className={`flex ${sizeClassName} items-center justify-center rounded-full bg-black/15 ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

function FilterChip({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-black/15 px-4 py-2">
      {children}
      <img src={chevronDownUrl} alt="" className="h-4 w-4 shrink-0" />
    </div>
  );
}
