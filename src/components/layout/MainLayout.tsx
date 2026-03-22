import type { ReactNode } from 'react';
import { TopNavigation } from '../navigation/TopNavigation';

export function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col bg-hub-canvas">
      <TopNavigation />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}
