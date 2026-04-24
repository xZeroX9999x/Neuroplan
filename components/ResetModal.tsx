'use client';

import { useState } from 'react';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ResetModal({ onCancel, onConfirm }: Props) {
  const [text, setText] = useState('');

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 flex items-center justify-center z-[100] p-5"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="np-card animate-slide-in p-9 max-w-[460px] w-full"
      >
        <div className="font-mono text-[10px] tracking-[0.15em] text-danger mb-2.5">
          — ZONA PELIGROSA
        </div>
        <h3 className="font-serif text-[32px] m-0 mb-3 leading-tight">
          ¿Empezar <em>desde 0</em>?
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-5">
          Se borra todo: progreso de días, pomodoros, tarjetas, historial de
          quiz, hábitos. No se puede deshacer.
        </p>
        <p className="text-[13px] mb-2 text-muted">
          Escribe{' '}
          <span className="font-mono text-danger">RESET</span> para
          confirmar:
        </p>
        <input
          className="np-input mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="np-btn np-btn-ghost flex-1 py-3 rounded-lg cursor-pointer text-[13px]"
          >
            Cancelar
          </button>
          <button
            disabled={text !== 'RESET'}
            onClick={onConfirm}
            className="np-btn flex-1 py-3 rounded-lg border-none text-[13px] font-semibold"
            style={{
              background:
                text === 'RESET' ? '#ff7b6b' : 'rgba(255,123,107,0.2)',
              color: text === 'RESET' ? '#0e0e0c' : '#ff7b6b',
              cursor: text === 'RESET' ? 'pointer' : 'not-allowed',
            }}
          >
            Borrar todo
          </button>
        </div>
      </div>
    </div>
  );
}
