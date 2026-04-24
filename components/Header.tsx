'use client';

type Props = {
  weekNum: number;
  weekName: string;
  currentDay: number;
  progress: number;
  onReset: () => void;
};

export default function Header({
  weekNum,
  weekName,
  currentDay,
  progress,
  onReset,
}: Props) {
  return (
    <header className="border-b border-border px-7 py-5 sticky top-0 backdrop-blur-xl z-10" style={{ background: 'rgba(14,14,12,0.85)' }}>
      <div className="max-w-[1100px] mx-auto flex justify-between items-center gap-4 flex-wrap">
        <div>
          <div className="font-mono text-muted text-[10px] tracking-[0.12em] uppercase mb-0.5">
            Neuroplan · Semana {weekNum}
          </div>
          <h1 className="font-serif text-[28px] m-0 leading-none">
            <em>{weekName}</em>
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-right">
            <div className="font-mono text-[11px]">
              <span className="text-accent">día {currentDay}</span>
              <span className="text-muted"> / 28</span>
            </div>
            <div className="w-[140px] mt-1.5 np-progress-track">
              <div
                className="np-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            onClick={onReset}
            className="np-btn np-btn-danger px-3.5 py-2 text-xs rounded-lg cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}
