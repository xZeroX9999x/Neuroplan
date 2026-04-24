'use client';

import { useEffect, useRef, useState } from 'react';
import type { DayData } from '@/lib/types';

const WORK = 25 * 60;
const BREAK = 5 * 60;

type Props = {
  todayData: DayData;
  setTodayData: (patch: Partial<DayData>) => void;
};

export default function Pomodoro({ todayData, setTodayData }: Props) {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [secs, setSecs] = useState(WORK);
  const [running, setRunning] = useState(false);
  const totalRef = useRef(WORK);

  useEffect(() => {
    totalRef.current = mode === 'work' ? WORK : BREAK;
  }, [mode]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
          clearInterval(id);
          setRunning(false);
          if (mode === 'work') {
            setTodayData({ pomodoros: (todayData.pomodoros || 0) + 1 });
            setMode('break');
            setTimeout(() => setSecs(BREAK), 0);
          } else {
            setMode('work');
            setTimeout(() => setSecs(WORK), 0);
          }
          if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(mode === 'work' ? 'Pomodoro completo' : 'Pausa terminada', {
              body: mode === 'work' ? 'Pausa de 5 min' : 'A por el siguiente pomodoro',
              icon: '/icon-192.png',
            });
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode, todayData.pomodoros, setTodayData]);

  const reset = () => {
    setRunning(false);
    setMode('work');
    setSecs(WORK);
  };

  const requestNotifications = () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission();
    }
  };

  const pct = 1 - secs / totalRef.current;
  const circum = 2 * Math.PI * 120;

  return (
    <div
      className="animate-slide-in grid gap-6 items-start"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
    >
      <div className="np-card p-10 text-center">
        <div className="font-mono text-muted text-[10px] tracking-[0.15em] mb-1.5">
          {mode === 'work' ? 'FOCO · 25 MIN' : 'PAUSA · 5 MIN'}
        </div>
        <div className="relative w-[260px] h-[260px] mx-auto my-5">
          <svg
            className="np-pomodoro-ring"
            width="260"
            height="260"
            viewBox="0 0 260 260"
          >
            <circle
              cx="130"
              cy="130"
              r="120"
              fill="none"
              stroke="rgba(232,228,217,0.08)"
              strokeWidth="6"
            />
            <circle
              cx="130"
              cy="130"
              r="120"
              fill="none"
              stroke={mode === 'work' ? '#d4ff3a' : '#8a8a82'}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circum}
              strokeDashoffset={circum * (1 - pct)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-serif text-[72px] leading-none">
              {String(Math.floor(secs / 60)).padStart(2, '0')}:
              {String(secs % 60).padStart(2, '0')}
            </div>
            <div className="font-mono text-muted text-[11px] mt-1">
              {running ? 'EN CURSO' : 'DETENIDO'}
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 justify-center">
          <button
            onClick={() => setRunning(!running)}
            className={`np-btn px-7 py-3 rounded-lg border-none cursor-pointer text-sm font-semibold ${
              running ? 'np-btn-ghost' : 'np-btn-primary'
            }`}
          >
            {running ? 'Pausar' : 'Empezar'}
          </button>
          <button
            onClick={reset}
            className="np-btn np-btn-ghost px-5 py-3 rounded-lg cursor-pointer text-sm"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div className="np-card p-7">
        <div className="font-mono text-muted text-[10px] tracking-[0.12em] mb-2.5">
          POMODOROS DE HOY
        </div>
        <div className="flex items-baseline gap-2 mb-5">
          <span className="font-serif text-[72px] leading-none">
            {todayData.pomodoros}
          </span>
          <span className="text-muted text-sm">/ 8 objetivo</span>
        </div>
        <div className="np-progress-track mb-6">
          <div
            className="np-progress-fill"
            style={{
              width: `${Math.min(100, (todayData.pomodoros / 8) * 100)}%`,
            }}
          />
        </div>
        <p className="text-muted text-[13px] leading-relaxed m-0 mb-4">
          Cada pomodoro completado incrementa el contador. Tras 4 pomodoros haz
          pausa larga de 20 min sin pantallas.
        </p>
        <div className="flex gap-1.5 mb-3">
          <button
            onClick={() =>
              setTodayData({
                pomodoros: Math.max(0, todayData.pomodoros - 1),
              })
            }
            className="np-btn np-btn-ghost flex-1 py-2.5 rounded-lg cursor-pointer text-xs"
          >
            − 1
          </button>
          <button
            onClick={() =>
              setTodayData({ pomodoros: todayData.pomodoros + 1 })
            }
            className="np-btn np-btn-ghost flex-1 py-2.5 rounded-lg cursor-pointer text-xs"
          >
            + 1 manual
          </button>
        </div>
        <button
          onClick={requestNotifications}
          className="np-btn np-btn-ghost w-full py-2 rounded-lg cursor-pointer text-[11px] opacity-70"
        >
          Activar notificaciones
        </button>
      </div>
    </div>
  );
}
