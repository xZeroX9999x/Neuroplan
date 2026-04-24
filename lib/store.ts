'use client';

import { useCallback, useEffect, useState } from 'react';
import type { AppState, DayData } from './types';
import { getDefaultDay } from './plan';

const STORAGE_KEY = 'neuroplan_v1';

export const DEFAULT_STATE: AppState = {
  startDate: null,
  dayData: {},
  cards: [],
  quizHistory: [],
  setupDone: false,
};

export function useNeuroplan() {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AppState;
        setState({ ...DEFAULT_STATE, ...parsed });
      }
    } catch (e) {
      console.error('Failed to load state', e);
    }
    setLoaded(true);
  }, []);

  // Auto-save on every state change
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state', e);
    }
  }, [state, loaded]);

  // Current day based on startDate
  const currentDay = (() => {
    if (!state.startDate) return 1;
    const start = new Date(state.startDate);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 86400000) + 1;
    return Math.min(28, Math.max(1, diff));
  })();

  const todayData: DayData = state.dayData[currentDay] || getDefaultDay();

  const setTodayData = useCallback(
    (patch: Partial<DayData>) => {
      setState((s) => ({
        ...s,
        dayData: {
          ...s.dayData,
          [currentDay]: {
            ...getDefaultDay(),
            ...(s.dayData[currentDay] || {}),
            ...patch,
          },
        },
      }));
    },
    [currentDay]
  );

  const completedDays = Object.values(state.dayData).filter((d) => d.done).length;
  const progress = (completedDays / 28) * 100;

  const startPlan = useCallback(() => {
    setState({
      ...DEFAULT_STATE,
      startDate: new Date().toISOString(),
      setupDone: true,
    });
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }, []);

  return {
    state,
    setState,
    loaded,
    currentDay,
    todayData,
    setTodayData,
    completedDays,
    progress,
    startPlan,
    reset,
  };
}
