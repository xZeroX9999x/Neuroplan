'use client';

import { useState } from 'react';
import { QUIZ_POOL } from '@/lib/quiz';
import type { AppState, QuizQuestion } from '@/lib/types';

type Props = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
};

type Answer = { q: QuizQuestion; picked: number; correct: boolean };

export default function Quiz({ state, setState }: Props) {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'done'>('intro');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const start = () => {
    const shuffled = [...QUIZ_POOL].sort(() => Math.random() - 0.5).slice(0, 7);
    setQuestions(shuffled);
    setIdx(0);
    setScore(0);
    setSelected(null);
    setAnswers([]);
    setPhase('playing');
  };

  const answer = (optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
    const isCorrect = optIdx === questions[idx].correct;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((a) => [
      ...a,
      { q: questions[idx], picked: optIdx, correct: isCorrect },
    ]);
    setTimeout(() => {
      if (idx < questions.length - 1) {
        setIdx(idx + 1);
        setSelected(null);
      } else {
        const final = score + (isCorrect ? 1 : 0);
        setState((s) => ({
          ...s,
          quizHistory: [
            ...s.quizHistory,
            {
              date: new Date().toISOString(),
              score: final,
              total: questions.length,
            },
          ],
        }));
        setPhase('done');
      }
    }, 900);
  };

  const best = Math.max(
    0,
    ...state.quizHistory.map((h) => (h.score / h.total) * 100)
  );
  const last = state.quizHistory[state.quizHistory.length - 1];

  if (phase === 'intro') {
    return (
      <div className="animate-slide-in max-w-[620px] mx-auto text-center">
        <div className="font-mono text-accent text-[11px] tracking-[0.15em] mb-3">
          ACTIVE RECALL · META
        </div>
        <h2 className="font-serif text-[54px] m-0 leading-none">
          Quiz de
          <br />
          <em>metodología</em>
        </h2>
        <p className="text-muted text-[15px] leading-relaxed mt-4 mb-8">
          Te pregunta sobre las propias técnicas del plan. Cada vez que lo haces
          las grabas más. 7 preguntas aleatorias del pool.
        </p>
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          <Stat label="Intentos" value={state.quizHistory.length} />
          <Stat label="Mejor" value={best ? `${Math.round(best)}%` : '—'} />
          <Stat
            label="Último"
            value={last ? `${Math.round((last.score / last.total) * 100)}%` : '—'}
          />
        </div>
        <button
          onClick={start}
          className="np-btn np-btn-primary px-8 py-4 rounded-xl border-none cursor-pointer text-[15px] font-semibold"
        >
          Empezar quiz →
        </button>
      </div>
    );
  }

  if (phase === 'playing') {
    const question = questions[idx];
    return (
      <div className="animate-slide-in max-w-[680px] mx-auto">
        <div className="np-progress-track mb-5">
          <div
            className="np-progress-fill"
            style={{ width: `${((idx + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="font-mono text-muted text-[11px] mb-4 text-center">
          PREGUNTA {idx + 1} / {questions.length}
        </div>
        <p className="font-serif text-[28px] leading-snug mb-7 text-center">
          {question.q}
        </p>
        <div className="grid gap-2.5">
          {question.opts.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === question.correct;
            let bg = '#141413';
            let border = 'rgba(232,228,217,0.1)';
            let color = '#e8e4d9';
            if (selected !== null) {
              if (isCorrect) {
                bg = 'rgba(212,255,58,0.12)';
                border = '#d4ff3a';
                color = '#d4ff3a';
              } else if (isSelected) {
                bg = 'rgba(255,123,107,0.12)';
                border = '#ff7b6b';
                color = '#ff7b6b';
              }
            }
            return (
              <button
                key={i}
                onClick={() => answer(i)}
                disabled={selected !== null}
                className="np-btn p-[18px] rounded-xl text-left text-[15px] font-sans"
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  color,
                  cursor: selected === null ? 'pointer' : 'default',
                }}
              >
                <span className="font-mono text-muted text-[10px] mr-3">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-in max-w-[680px] mx-auto">
      <div className="text-center mb-8">
        <div className="font-mono text-accent text-[11px] tracking-[0.15em] mb-3">
          RESULTADO
        </div>
        <div className="font-serif text-[100px] leading-none">
          {score}
          <span className="text-muted text-[40px]">/{questions.length}</span>
        </div>
        <p className="text-muted text-[15px] mt-2">
          {Math.round((score / questions.length) * 100)}% de aciertos
        </p>
      </div>
      <div className="np-card p-6 mb-5">
        <div className="font-mono text-muted text-[10px] tracking-[0.12em] mb-3.5">
          REVISIÓN
        </div>
        <div className="grid gap-2.5">
          {answers.map((a, i) => (
            <div
              key={i}
              className="p-3.5 bg-surface-2 rounded-lg"
              style={{
                borderLeft: `3px solid ${a.correct ? '#d4ff3a' : '#ff7b6b'}`,
              }}
            >
              <div className="text-[13px] mb-1.5">{a.q.q}</div>
              <div className="font-mono text-[11px]">
                <span className="text-muted">respuesta: </span>
                <span className="text-accent">{a.q.opts[a.q.correct]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={start}
        className="np-btn np-btn-primary py-3.5 rounded-xl border-none cursor-pointer text-sm font-semibold w-full"
      >
        Repetir con otras 7 preguntas →
      </button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="np-card p-4">
      <div className="font-mono text-muted text-[9px] tracking-[0.1em]">
        {label.toUpperCase()}
      </div>
      <div className="font-serif text-[28px] mt-1">{value}</div>
    </div>
  );
}
