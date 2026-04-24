'use client';

import { dayToWeek, weekPlan } from '@/lib/plan';
import type { AppState, DayData } from '@/lib/types';

type Props = {
  state: AppState;
  currentDay: number;
  todayData: DayData;
  setTodayData: (patch: Partial<DayData>) => void;
  completedDays: number;
};

export default function Dashboard({
  state,
  currentDay,
  todayData,
  setTodayData,
  completedDays,
}: Props) {
  const week = weekPlan(currentDay);
  const targets = week.dailyTargets;
  const pomodoroProgress = Math.min(
    100,
    (todayData.pomodoros / targets.pomodoros) * 100
  );

  return (
    <div className="animate-slide-in grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <div className="np-card np-card-accent p-7 col-span-full">
        <div className="flex justify-between items-start gap-5 flex-wrap mb-4">
          <div>
            <div className="font-mono text-accent text-[11px] tracking-[0.1em]">
              SEMANA {week.num} · DÍA {((currentDay - 1) % 7) + 1}
            </div>
            <h2 className="font-serif text-4xl m-0 mt-1.5 mb-1 leading-none">
              <em>{week.name}</em>
            </h2>
            <p className="text-muted text-sm m-0">{week.tagline}</p>
          </div>
          <button
            onClick={() => setTodayData({ done: !todayData.done })}
            className={`np-btn px-5 py-2.5 rounded-lg text-[13px] border-none cursor-pointer font-semibold ${
              todayData.done
                ? 'bg-accent text-bg'
                : 'bg-fg/5 text-fg'
            }`}
          >
            {todayData.done ? '✓ Día completado' : 'Marcar día como hecho'}
          </button>
        </div>

        <div className="mt-6">
          <div className="flex justify-between mb-1.5">
            <span className="font-mono text-[11px]">TAREA HOY</span>
            <span className="font-mono text-muted text-[11px]">
              {todayData.pomodoros}/{targets.pomodoros} pomodoros
            </span>
          </div>
          <div className="np-progress-track">
            <div
              className="np-progress-fill"
              style={{ width: `${pomodoroProgress}%` }}
            />
          </div>
          <p className="text-[15px] mt-2.5 leading-relaxed">{week.task}</p>
        </div>
      </div>

      <div className="np-card p-6">
        <div className="font-mono text-muted text-[10px] tracking-[0.12em] mb-2.5">
          PASO A PASO
        </div>
        <ol className="pl-0 list-none m-0">
          {week.steps.map((s, i) => (
            <li
              key={i}
              className="flex gap-3 py-2.5"
              style={{
                borderBottom:
                  i < week.steps.length - 1
                    ? '1px solid rgba(232,228,217,0.06)'
                    : 'none',
              }}
            >
              <span className="font-mono text-accent text-xs w-[18px]">
                0{i + 1}
              </span>
              <span className="text-sm leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="np-card p-6">
        <div className="font-mono text-muted text-[10px] tracking-[0.12em] mb-2.5">
          META SEMANAL
        </div>
        <p className="font-serif text-[22px] leading-snug m-0 mb-5">
          <em>{week.goal}</em>
        </p>
        <div className="font-mono text-muted text-[10px] tracking-[0.12em] mb-2">
          NEUROCIENCIA
        </div>
        <p className="text-muted text-[13px] leading-relaxed m-0">
          {week.neuro}
        </p>
      </div>

      {targets.recall && (
        <div className="np-card p-6">
          <div className="font-mono text-muted text-[10px] tracking-[0.12em] mb-2.5">
            RECUERDO ACTIVO DEL DÍA
          </div>
          <p className="text-muted text-[13px] leading-relaxed mb-3">
            ¿Qué recuerdas de lo estudiado hoy? Escribe de memoria antes de
            consultar la fuente.
          </p>
          <textarea
            className="np-input resize-y"
            rows={5}
            value={todayData.recall}
            onChange={(e) => setTodayData({ recall: e.target.value })}
            placeholder="Conceptos, ejemplos, conexiones..."
          />
        </div>
      )}

      <div className="np-card p-6">
        <div className="font-mono text-muted text-[10px] tracking-[0.12em] mb-2.5">
          DIARIO
        </div>
        <textarea
          className="np-input resize-y"
          rows={4}
          value={todayData.journal}
          onChange={(e) => setTodayData({ journal: e.target.value })}
          placeholder="Una frase sobre qué hiciste, qué falló, qué vas a ajustar..."
        />
      </div>

      <div className="np-card p-6 col-span-full">
        <div className="flex justify-between items-center mb-4">
          <div className="font-mono text-muted text-[10px] tracking-[0.12em]">
            PROGRESO GLOBAL
          </div>
          <div className="font-mono text-xs">
            <span className="text-accent">{completedDays}</span>
            <span className="text-muted"> / 28 días completados</span>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(28,1fr)] gap-[3px]">
          {Array.from({ length: 28 }, (_, i) => {
            const d = i + 1;
            const done = state.dayData[d]?.done;
            const isCurrent = d === currentDay;
            const isPast = d < currentDay;
            return (
              <div
                key={d}
                title={`Día ${d} · Sem ${dayToWeek(d)}`}
                className="h-8 rounded"
                style={{
                  background: done
                    ? '#d4ff3a'
                    : isCurrent
                    ? 'rgba(212,255,58,0.2)'
                    : isPast
                    ? 'rgba(255,123,107,0.15)'
                    : 'rgba(232,228,217,0.04)',
                  border: isCurrent
                    ? '1px solid #d4ff3a'
                    : '1px solid transparent',
                }}
              />
            );
          })}
        </div>
        <div className="mt-2.5 flex gap-3.5 text-[11px] font-mono text-muted flex-wrap">
          <LegendDot color="#d4ff3a" label="Completado" />
          <LegendDot
            color="rgba(212,255,58,0.2)"
            border="#d4ff3a"
            label="Hoy"
          />
          <LegendDot color="rgba(255,123,107,0.3)" label="Saltado" />
          <LegendDot color="rgba(232,228,217,0.08)" label="Bloqueado" />
        </div>
      </div>
    </div>
  );
}

function LegendDot({
  color,
  border,
  label,
}: {
  color: string;
  border?: string;
  label: string;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="w-2 h-2 rounded-full"
        style={{
          background: color,
          border: border ? `1px solid ${border}` : undefined,
        }}
      />
      {label}
    </span>
  );
}
