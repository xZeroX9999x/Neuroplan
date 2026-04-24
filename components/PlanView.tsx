'use client';

import { useState } from 'react';
import { PLAN, dayToWeek } from '@/lib/plan';

export default function PlanView({ currentDay }: { currentDay: number }) {
  const [open, setOpen] = useState(dayToWeek(currentDay));

  return (
    <div className="animate-slide-in grid gap-4">
      <div className="mb-2">
        <h2 className="font-serif text-[42px] m-0 leading-none">
          Las <em>4 semanas</em>
        </h2>
        <p className="text-muted text-sm mt-2">
          Una técnica nueva por semana (Kaizen). No acumulas hábitos — los apilas
          sobre una base sólida.
        </p>
      </div>
      {PLAN.map((w) => (
        <div
          key={w.num}
          onClick={() => setOpen(open === w.num ? 0 : w.num)}
          className={`np-card p-6 cursor-pointer ${
            open === w.num ? 'np-card-accent' : ''
          }`}
        >
          <div className="flex justify-between items-center gap-5">
            <div className="flex gap-5 items-baseline">
              <span
                className="font-serif text-accent text-[44px] leading-none italic"
              >
                0{w.num}
              </span>
              <div>
                <h3 className="font-serif text-2xl m-0 leading-tight">
                  {w.name}
                </h3>
                <p className="text-muted text-[13px] m-0 mt-1">{w.tagline}</p>
              </div>
            </div>
            <span className="font-mono text-muted text-lg">
              {open === w.num ? '−' : '+'}
            </span>
          </div>
          {open === w.num && (
            <div
              className="animate-slide-in mt-5 pt-5 grid gap-4"
              style={{ borderTop: '1px solid rgba(232,228,217,0.08)' }}
            >
              <Detail label="TAREA" body={w.task} />
              <div>
                <div className="font-mono text-muted text-[10px] tracking-[0.12em] mb-2.5">
                  PASO A PASO
                </div>
                <ol className="pl-0 list-none m-0">
                  {w.steps.map((s, i) => (
                    <li key={i} className="flex gap-3 py-2">
                      <span className="font-mono text-accent text-xs min-w-[20px]">
                        0{i + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <Detail label="META" body={w.goal} serif />
              <Detail label="NEUROCIENCIA" body={w.neuro} muted />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Detail({
  label,
  body,
  serif,
  muted,
}: {
  label: string;
  body: string;
  serif?: boolean;
  muted?: boolean;
}) {
  return (
    <div>
      <div className="font-mono text-muted text-[10px] tracking-[0.12em] mb-1.5">
        {label}
      </div>
      <p
        className={`${serif ? 'font-serif italic' : ''} ${
          muted ? 'text-muted' : ''
        } leading-relaxed m-0`}
        style={{ fontSize: serif ? 20 : 14 }}
      >
        {body}
      </p>
    </div>
  );
}
