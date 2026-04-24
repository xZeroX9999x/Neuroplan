'use client';

import { useState } from 'react';
import { useNeuroplan } from '@/lib/store';
import { dayToWeek, weekPlan } from '@/lib/plan';
import type { View } from '@/lib/types';
import Setup from './Setup';
import Header from './Header';
import Nav from './Nav';
import Dashboard from './Dashboard';
import PlanView from './PlanView';
import Pomodoro from './Pomodoro';
import Cards from './Cards';
import Quiz from './Quiz';
import Habits from './Habits';
import ResetModal from './ResetModal';

export default function Neuroplan() {
  const np = useNeuroplan();
  const [view, setView] = useState<View>('dashboard');
  const [showReset, setShowReset] = useState(false);

  if (!np.loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-mono text-muted text-xs">cargando…</div>
      </div>
    );
  }

  if (!np.state.setupDone) {
    return <Setup onStart={np.startPlan} />;
  }

  const week = weekPlan(np.currentDay);

  return (
    <>
      <Header
        weekNum={dayToWeek(np.currentDay)}
        weekName={week.name}
        currentDay={np.currentDay}
        progress={np.progress}
        onReset={() => setShowReset(true)}
      />
      <Nav view={view} setView={setView} />

      <main className="max-w-[1100px] mx-auto px-7 pt-8 pb-20">
        {view === 'dashboard' && (
          <Dashboard
            state={np.state}
            currentDay={np.currentDay}
            todayData={np.todayData}
            setTodayData={np.setTodayData}
            completedDays={np.completedDays}
          />
        )}
        {view === 'plan' && <PlanView currentDay={np.currentDay} />}
        {view === 'pomodoro' && (
          <Pomodoro
            todayData={np.todayData}
            setTodayData={np.setTodayData}
          />
        )}
        {view === 'cards' && (
          <Cards state={np.state} setState={np.setState} />
        )}
        {view === 'quiz' && (
          <Quiz state={np.state} setState={np.setState} />
        )}
        {view === 'habits' && (
          <Habits
            state={np.state}
            setState={np.setState}
            currentDay={np.currentDay}
          />
        )}
      </main>

      {showReset && (
        <ResetModal
          onCancel={() => setShowReset(false)}
          onConfirm={() => {
            np.reset();
            setShowReset(false);
            setView('dashboard');
          }}
        />
      )}
    </>
  );
}
