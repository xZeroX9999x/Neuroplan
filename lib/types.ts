export type BdnfHabits = {
  sleep: boolean;
  cardio: boolean;
  sun: boolean;
};

export type DayData = {
  pomodoros: number;
  recall: string;
  bdnf: BdnfHabits;
  journal: string;
  done: boolean;
};

export type Card = {
  id: string;
  q: string;
  a: string;
  intervalIdx: number;
  nextReview: number;
  lapses: number;
  created: number;
};

export type QuizAttempt = {
  date: string;
  score: number;
  total: number;
};

export type AppState = {
  startDate: string | null;
  dayData: Record<number, DayData>;
  cards: Card[];
  quizHistory: QuizAttempt[];
  setupDone: boolean;
};

export type WeekPlan = {
  num: number;
  name: string;
  tagline: string;
  task: string;
  steps: string[];
  goal: string;
  neuro: string;
  dailyTargets: {
    pomodoros: number;
    recall: boolean;
    bdnf: boolean;
  };
};

export type QuizQuestion = {
  q: string;
  opts: string[];
  correct: number;
};

export type View =
  | 'dashboard'
  | 'plan'
  | 'pomodoro'
  | 'cards'
  | 'quiz'
  | 'habits';
