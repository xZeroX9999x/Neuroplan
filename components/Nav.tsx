'use client';

import type { View } from '@/lib/types';

const TABS: [View, string][] = [
  ['dashboard', 'Hoy'],
  ['plan', 'Plan completo'],
  ['pomodoro', 'Pomodoro'],
  ['cards', 'Tarjetas'],
  ['quiz', 'Quiz metodología'],
  ['habits', 'Hábitos'],
];

type Props = {
  view: View;
  setView: (v: View) => void;
};

export default function Nav({ view, setView }: Props) {
  return (
    <nav className="px-7 py-4 border-b border-fg/5">
      <div className="max-w-[1100px] mx-auto flex gap-1 overflow-x-auto">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`np-tab whitespace-nowrap bg-none ${
              view === id ? 'np-tab-active' : ''
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
