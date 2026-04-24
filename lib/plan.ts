import type { WeekPlan } from './types';

export const PLAN: WeekPlan[] = [
  {
    num: 1,
    name: 'Micro-sesiones de foco',
    tagline: 'Entrenas la atención antes que la memoria',
    task: '2 bloques diarios de 4 pomodoros (25 min + 5 min)',
    steps: [
      'Elige UNA subárea del tema por bloque. Nada de multitarea',
      'Teléfono fuera de la habitación. Navegador con bloqueador',
      'Tras cada pomodoro escribes 1 frase en papel de lo que hiciste',
      'Tras 4 pomodoros: pausa larga de 20 min sin pantallas',
    ],
    goal: '5 días seguidos completando ambos bloques. Si rompes uno, el contador vuelve a 0',
    neuro: 'Los ciclos ultradianos de atención duran ~90 min. Los pomodoros se alinean con eso y evitan el agotamiento de la corteza prefrontal.',
    dailyTargets: { pomodoros: 8, recall: false, bdnf: false },
  },
  {
    num: 2,
    name: 'Recuerdo activo',
    tagline: 'Dejas de releer. Empiezas a extraer',
    task: 'Cada pomodoro termina con 5 min de recuerdo en hoja en blanco',
    steps: [
      'Estudias 20 min, cierras todo, hoja en blanco',
      'Escribes de memoria lo que puedas: conceptos, ejemplos, conexiones',
      'Abres la fuente y marcas en rojo lo que fallaste',
      'Técnica Feynman: explica en voz alta como si enseñaras a alguien que no sabe nada',
    ],
    goal: 'Lista de fallos con 30-50 puntos al final de la semana',
    neuro: 'Releer da sensación de aprender sin aprender. El recuerdo activo fuerza la reconsolidación sináptica.',
    dailyTargets: { pomodoros: 8, recall: true, bdnf: false },
  },
  {
    num: 3,
    name: 'Repetición espaciada',
    tagline: 'Vences la curva de Ebbinghaus',
    task: 'Sistema de revisión con intervalos crecientes (1→3→7→14→30 días)',
    steps: [
      'Convierte cada fallo en una tarjeta pregunta/respuesta',
      'Intervalos: día 1 → día 3 → día 7 → día 14 → día 30',
      'Si fallas una tarjeta vuelve al intervalo 1',
      '15-20 min diarios de revisión. Nunca más, no es eficiente',
    ],
    goal: '150-200 tarjetas activas con ≥85% de acierto en intervalo día-7',
    neuro: 'Sin repaso olvidas el 70% en 7 días. Los intervalos crecientes refuerzan la memoria de largo plazo.',
    dailyTargets: { pomodoros: 8, recall: true, bdnf: false },
  },
  {
    num: 4,
    name: 'Optimización BDNF',
    tagline: 'Subes el combustible del cerebro',
    task: 'Integrar 3 hábitos BDNF sin soltar lo anterior',
    steps: [
      'Cardio zona 2 o HIIT: 30 min, 4×/semana',
      'Sueño 7-8h. No negociable. Consolidación de memoria',
      'Luz solar matinal 10-15 min en las primeras 2h tras despertar',
      'Opcional: ayuno intermitente, ducha fría, omega-3',
    ],
    goal: '3 hábitos consolidados 6 de 7 días. El sueño es obligatorio',
    neuro: 'BDNF = Brain-Derived Neurotrophic Factor. Hace que las neuronas formen conexiones nuevas. El cardio es lo que más lo sube.',
    dailyTargets: { pomodoros: 8, recall: true, bdnf: true },
  },
];

export const INTERVALS = [1, 3, 7, 14, 30];

export const dayToWeek = (day: number): number =>
  Math.min(4, Math.max(1, Math.ceil(day / 7)));

export const weekPlan = (day: number): WeekPlan => PLAN[dayToWeek(day) - 1];

export const getDefaultDay = () => ({
  pomodoros: 0,
  recall: '',
  bdnf: { sleep: false, cardio: false, sun: false },
  journal: '',
  done: false,
});
