'use client';

import { weekPlan, getDefaultDay } from '@/lib/plan';
import type { AppState, BdnfHabits } from '@/lib/types';

type Props = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  currentDay: number;
};

const HABITS: { k: keyof BdnfHabits; label: string; desc: string }[] = [
  {
    k: 'sleep',
    label: 'Sueño 7-8h',
    desc: 'Consolidación de memoria en REM + ondas lentas',
  },
  {
    k: 'cardio',
    label: 'Cardio 30 min',
    desc: 'Lo que más sube BDNF. 4×/semana mínimo',
  },
  {
    k: 'sun',
    label: 'Luz solar matinal',
    desc: '10-15 min en las 2h tras despertar',
  },
];

export default function Habits({ state, setState, currentDay }: Props) {
  const week = weekPlan(currentDay);
  const unlocked = week.dailyTargets.bdnf;
  const days = Array.from({ length: 28 }, (_, i) => i + 1);

  const toggle = (day: number, habit: keyof BdnfHabits) => {
    setState((s) => {
      const d = s.dayData[day] || getDefaultDay();
      return {
        ...s,
        dayData: {
          ...s.dayData,
          [day]: { ...d, bdnf: { ...d.bdnf, [habit]: !d.bdnf[habit] } },
        },
      };
    });
  };

  const counts = HABITS.reduce<Record<string, number>>((acc, h) => {
    acc[h.k] = days.filter((d) => state.dayData[d]?.bdnf?.[h.k]).length;
    return acc;
  }, {});

  return (
    <div className="animate-slide-in grid gap-6">
      <div>
        <h2 className="font-serif text-[42px] m-0 leading-none">
          Hábitos <em>BDNF</em>
        </h2>
        <p className="text-muted text-sm mt-1.5">
          {unlocked
            ? 'Desbloqueado. Apila sin soltar lo anterior.'
            : `Se desbloquea la Semana 4 (día 22). Ahora estás en día ${currentDay}.`}
        </p>
      </div>

      {HABITS.map((h) => (
        <div key={h.k} className="np-card p-6">
          <div className="flex justify-between items-start gap-4 mb-3.5">
            <div>
              <h3 className="font-serif text-[22px] m-0">{h.label}</h3>
              <p className="text-muted text-[13px] m-0 mt-1">{h.desc}</p>
            </div>
            <div className="text-right">
              <div className="font-serif text-accent text-[32px] leading-none">
                {counts[h.k]}
              </div>
              <div className="font-mono text-muted text-[10px]">DÍAS DONE</div>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(28,1fr)] gap-[3px]">
            {days.map((d) => {
              const checked = state.dayData[d]?.bdnf?.[h.k];
              const isFuture = d > currentDay;
              return (
                <button
                  key={d}
                  disabled={isFuture}
                  onClick={() => toggle(d, h.k)}
                  title={`Día ${d}`}
                  className="h-7 rounded border-none"
                  style={{
                    cursor: isFuture ? 'not-allowed' : 'pointer',
                    background: checked
                      ? '#d4ff3a'
                      : isFuture
                      ? 'rgba(232,228,217,0.03)'
                      : 'rgba(232,228,217,0.08)',
                    opacity: isFuture ? 0.3 : 1,
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
