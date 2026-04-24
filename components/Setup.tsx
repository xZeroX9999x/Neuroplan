'use client';

import { PLAN } from '@/lib/plan';

export default function Setup({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-7">
      <div className="animate-slide-in max-w-[560px] w-full text-center">
        <div className="font-mono text-muted text-[10px] tracking-[0.15em] uppercase mb-5">
          — Neuroplan · Protocolo 28 días
        </div>
        <h1 className="font-serif text-[64px] leading-[0.95] mb-6">
          De <em className="text-accent">0 a 100</em>
          <br />
          en 28 días.
        </h1>
        <p className="text-muted text-[15px] leading-relaxed mb-9 max-w-[440px] mx-auto">
          Cuatro semanas, una técnica nueva cada siete días. Micro-foco →
          recuerdo activo → repetición espaciada → hábitos BDNF. Kaizen puro.
        </p>
        <div className="grid grid-cols-4 gap-1.5 mb-8 max-w-[440px] mx-auto">
          {PLAN.map((w) => (
            <div
              key={w.num}
              className="px-2 py-3 bg-surface border border-border rounded-lg text-left"
            >
              <div className="font-mono text-accent text-[9px] tracking-[0.1em]">
                SEM {w.num}
              </div>
              <div className="text-[11px] mt-1 leading-tight">{w.name}</div>
            </div>
          ))}
        </div>
        <button
          onClick={onStart}
          className="np-btn np-btn-primary px-10 py-[18px] rounded-xl text-[15px] border-none"
          style={{ letterSpacing: '0.02em' }}
        >
          Iniciar · Día 1 →
        </button>
        <p className="font-mono text-muted text-[10px] mt-6 tracking-wider">
          auto-guardado · offline · sin cuentas
        </p>
      </div>
    </div>
  );
}
