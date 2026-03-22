import calendarUrl from '../../assets/icons/calendar.svg';
import { useMemo, useState } from 'react';

const RANGE = 14;

function localDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function buildDays() {
  const today = new Date();
  return Array.from({ length: RANGE * 2 + 1 }, (_, i) => {
    const offset = i - RANGE;
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    const dayName = d.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase();
    const dayNum = d.getDate();
    const monthName = d.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();
    const key = localDateKey(d);
    return { key, dayName, line2: `${dayNum} ${monthName}` };
  });
}

export function CalendarStrip() {
  const todayKey = useMemo(() => localDateKey(new Date()), []);
  const days = useMemo(() => buildDays(), []);

  const [selectedKey, setSelectedKey] = useState(todayKey);

  return (
    <div className="relative flex items-stretch border-b border-hub-border bg-hub-surface lg:hidden">
      <div className="relative min-w-0 flex-1">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-hub-surface to-transparent"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-hub-surface to-transparent"
        />
        <div className="scrollbar-none flex snap-x snap-mandatory gap-1 overflow-x-auto px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {days.map(({ key, dayName, line2 }) => {
            const isSelected = key === selectedKey;
            const isToday = key === todayKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedKey(key)}
                className={[
                  'flex min-w-[56px] shrink-0 snap-center flex-col items-center justify-center rounded-lg px-2 py-2 text-center transition-colors',
                  isSelected
                    ? 'bg-hub-surface-muted text-hub-secondary'
                    : 'text-hub-fg-muted',
                ].join(' ')}
              >
                <span className="text-[11px] font-normal leading-[15px]">
                  {isToday ? 'Today' : dayName}
                </span>
                <span
                  className={[
                    'text-xs font-semibold leading-4',
                    isSelected ? 'text-hub-secondary' : 'text-hub-fg-strong',
                  ].join(' ')}
                >
                  {line2}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-center self-stretch px-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-hub-surface-muted shadow-[0_0_0_1px_rgba(0,255,165,0.25),0_4px_12px_rgba(0,0,0,0.35)]">
          <img src={calendarUrl} alt="" className="h-6 w-6" />
        </span>
      </div>
    </div>
  );
}
