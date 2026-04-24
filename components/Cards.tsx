'use client';

import { useState } from 'react';
import { INTERVALS } from '@/lib/plan';
import type { AppState, Card } from '@/lib/types';

type Props = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
};

export default function Cards({ state, setState }: Props) {
  const [mode, setMode] = useState<'list' | 'review'>('list');
  const [q, setQ] = useState('');
  const [a, setA] = useState('');
  const [reviewIdx, setReviewIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const now = Date.now();
  const dueCards = state.cards.filter((c) => c.nextReview <= now);

  const addCard = () => {
    if (!q.trim() || !a.trim()) return;
    const card: Card = {
      id: String(Date.now() + Math.random()),
      q: q.trim(),
      a: a.trim(),
      intervalIdx: 0,
      nextReview: now + INTERVALS[0] * 86400000,
      lapses: 0,
      created: now,
    };
    setState((s) => ({ ...s, cards: [...s.cards, card] }));
    setQ('');
    setA('');
  };

  const grade = (correct: boolean) => {
    const card = dueCards[reviewIdx];
    setState((s) => ({
      ...s,
      cards: s.cards.map((c) => {
        if (c.id !== card.id) return c;
        if (correct) {
          const nextIdx = Math.min(c.intervalIdx + 1, INTERVALS.length - 1);
          return {
            ...c,
            intervalIdx: nextIdx,
            nextReview: now + INTERVALS[nextIdx] * 86400000,
          };
        }
        return {
          ...c,
          intervalIdx: 0,
          nextReview: now + INTERVALS[0] * 86400000,
          lapses: c.lapses + 1,
        };
      }),
    }));
    setShowAnswer(false);
    if (reviewIdx >= dueCards.length - 1) {
      setMode('list');
      setReviewIdx(0);
    } else {
      setReviewIdx(reviewIdx + 1);
    }
  };

  const deleteCard = (id: string) => {
    setState((s) => ({ ...s, cards: s.cards.filter((c) => c.id !== id) }));
  };

  if (mode === 'review' && dueCards.length > 0) {
    const card = dueCards[reviewIdx];
    return (
      <div className="animate-slide-in max-w-[680px] mx-auto">
        <div className="font-mono text-muted text-[11px] mb-4 text-center">
          TARJETA {reviewIdx + 1} / {dueCards.length} · INTERVALO DÍA-
          {INTERVALS[card.intervalIdx]}
        </div>
        <div
          onClick={() => !showAnswer && setShowAnswer(true)}
          className="np-card p-11 min-h-[260px] flex flex-col justify-center"
          style={{ cursor: showAnswer ? 'default' : 'pointer' }}
        >
          <div className="font-mono text-muted text-[10px] tracking-[0.15em] mb-4">
            PREGUNTA
          </div>
          <p className="font-serif text-[28px] leading-snug m-0">{card.q}</p>
          {showAnswer && (
            <div
              className="animate-slide-in mt-7 pt-6"
              style={{ borderTop: '1px solid rgba(232,228,217,0.1)' }}
            >
              <div className="font-mono text-accent text-[10px] tracking-[0.15em] mb-3">
                RESPUESTA
              </div>
              <p className="text-base leading-relaxed m-0">{card.a}</p>
            </div>
          )}
        </div>
        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="np-btn np-btn-primary mt-4 w-full py-4 rounded-xl border-none cursor-pointer text-sm font-semibold"
          >
            Mostrar respuesta
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            <button
              onClick={() => grade(false)}
              className="np-btn py-4 rounded-xl cursor-pointer text-sm font-semibold"
              style={{
                border: '1px solid rgba(255,123,107,0.4)',
                background: 'rgba(255,123,107,0.08)',
                color: '#ff7b6b',
              }}
            >
              Fallé · volver a día 1
            </button>
            <button
              onClick={() => grade(true)}
              className="np-btn np-btn-primary py-4 rounded-xl border-none cursor-pointer text-sm font-semibold"
            >
              Acerté → día{' '}
              {INTERVALS[Math.min(card.intervalIdx + 1, INTERVALS.length - 1)]}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-slide-in grid gap-6">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h2 className="font-serif text-[42px] m-0 leading-none">Tarjetas</h2>
          <p className="text-muted text-sm mt-1.5">
            {state.cards.length} totales ·{' '}
            <span className="text-accent">{dueCards.length}</span> pendientes
            hoy
          </p>
        </div>
        {dueCards.length > 0 && (
          <button
            onClick={() => {
              setMode('review');
              setReviewIdx(0);
              setShowAnswer(false);
            }}
            className="np-btn np-btn-primary px-5 py-3.5 rounded-xl border-none cursor-pointer text-sm font-semibold"
          >
            Repasar {dueCards.length} →
          </button>
        )}
      </div>

      <div className="np-card p-6">
        <div className="font-mono text-muted text-[10px] tracking-[0.12em] mb-3">
          AÑADIR TARJETA
        </div>
        <input
          className="np-input mb-2.5"
          placeholder="Pregunta..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <textarea
          className="np-input resize-y mb-3"
          placeholder="Respuesta..."
          value={a}
          onChange={(e) => setA(e.target.value)}
          rows={3}
        />
        <button
          onClick={addCard}
          disabled={!q.trim() || !a.trim()}
          className="np-btn np-btn-primary px-5 py-3 rounded-lg border-none text-[13px] font-semibold"
          style={{
            cursor: q && a ? 'pointer' : 'not-allowed',
            opacity: q && a ? 1 : 0.4,
          }}
        >
          + Añadir
        </button>
      </div>

      {state.cards.length > 0 && (
        <div className="np-card p-6">
          <div className="font-mono text-muted text-[10px] tracking-[0.12em] mb-3.5">
            MAZO · {state.cards.length} TARJETAS
          </div>
          <div className="grid gap-2 max-h-[500px] overflow-y-auto">
            {state.cards.map((c) => {
              const due = c.nextReview <= now;
              const daysLeft = Math.ceil((c.nextReview - now) / 86400000);
              return (
                <div
                  key={c.id}
                  className="flex gap-3 p-3.5 bg-surface-2 rounded-lg items-center"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: due ? '#d4ff3a' : '#8a8a82' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium truncate">
                      {c.q}
                    </div>
                    <div className="font-mono text-muted text-[10px] mt-0.5">
                      día-{INTERVALS[c.intervalIdx]} ·{' '}
                      {due ? 'pendiente' : `en ${daysLeft}d`} · {c.lapses}{' '}
                      fallos
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCard(c.id)}
                    className="text-muted bg-none border-none cursor-pointer text-base p-1"
                    title="Eliminar"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
