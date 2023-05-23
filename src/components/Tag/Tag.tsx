import { PropsWithChildren } from 'react';

export function Tag({ children }: PropsWithChildren) {
  return (
    <div className="text-xs px-2 rounded-full h-6 text-violet-400 bg-violet-600/10 font-semibold inline-flex items-center gap-px min-w-[4em] justify-center">
      <span>#</span>
      <span>{children}</span>
    </div>
  );
}
