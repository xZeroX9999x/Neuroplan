import type { QuizQuestion } from './types';

export const QUIZ_POOL: QuizQuestion[] = [
  {
    q: '¿Cuál es el objetivo de la Semana 1 antes de memorizar nada?',
    opts: ['Leer todo el temario', 'Entrenar la atención sostenida', 'Hacer flashcards', 'Dormir más'],
    correct: 1,
  },
  {
    q: '¿Cuánto dura un pomodoro y su pausa corta?',
    opts: ['50 min + 10 min', '25 min + 5 min', '15 min + 3 min', '90 min + 20 min'],
    correct: 1,
  },
  {
    q: '¿Qué hay que hacer al terminar cada pomodoro en Semana 1?',
    opts: ['Revisar notificaciones', 'Empezar el siguiente', 'Escribir 1 frase de lo hecho', 'Tomar café'],
    correct: 2,
  },
  {
    q: 'Si rompes un bloque de pomodoros en Semana 1, ¿qué pasa?',
    opts: ['Sigues donde lo dejaste', 'El contador vuelve a 0', 'Haces el doble mañana', 'Saltas al siguiente día'],
    correct: 1,
  },
  {
    q: '¿Por qué releer es peor que el recuerdo activo?',
    opts: ['Es más lento', 'Cansa la vista', 'Da sensación de aprender sin aprender', 'Usa más memoria'],
    correct: 2,
  },
  {
    q: '¿En qué consiste la técnica Feynman?',
    opts: ['Memorizar fórmulas', 'Explicar en voz alta como a alguien que no sabe', 'Leer en voz alta', 'Resumir por escrito'],
    correct: 1,
  },
  {
    q: 'Sin repaso, ¿qué porcentaje se olvida en 7 días?',
    opts: ['10%', '30%', '50%', '70%'],
    correct: 3,
  },
  {
    q: '¿Cuáles son los intervalos de repetición espaciada del plan?',
    opts: ['1-2-4-8-16', '1-3-7-14-30', '1-7-30-90', '2-5-10-20-40'],
    correct: 1,
  },
  {
    q: 'Si fallas una tarjeta en repetición espaciada, ¿qué pasa?',
    opts: ['La eliminas', 'Vuelve al intervalo 1', 'La saltas 3 días', 'La marcas como difícil'],
    correct: 1,
  },
  {
    q: '¿Cuánto tiempo diario de revisión de tarjetas recomienda el plan?',
    opts: ['5 min', '15-20 min', '45 min', '1 hora'],
    correct: 1,
  },
  {
    q: '¿Qué significa BDNF?',
    opts: ['Brain-Derived Neurotrophic Factor', 'Basal Dopamine Neural Function', 'Brain Development Neural Fiber', 'Binary Deep Neural Framework'],
    correct: 0,
  },
  {
    q: '¿Qué hábito sube más el BDNF?',
    opts: ['Meditación', 'Cardio', 'Omega-3', 'Ayuno'],
    correct: 1,
  },
  {
    q: '¿Cuántas horas de sueño marca el plan como no negociables?',
    opts: ['5-6', '6-7', '7-8', '9-10'],
    correct: 2,
  },
  {
    q: '¿Cuánto tiempo de luz solar matinal recomienda?',
    opts: ['2-3 min', '10-15 min', '30-45 min', '1 hora'],
    correct: 1,
  },
  {
    q: '¿En qué fase del sueño se consolida la memoria?',
    opts: ['Solo REM', 'Solo ondas lentas', 'REM y ondas lentas', 'Ninguna'],
    correct: 2,
  },
  {
    q: '¿Cuántos bloques de pomodoros marca el plan por día?',
    opts: ['1', '2', '3', '4'],
    correct: 1,
  },
  {
    q: '¿Cuánto dura la pausa larga tras 4 pomodoros?',
    opts: ['5 min', '10 min', '20 min', '45 min'],
    correct: 2,
  },
  {
    q: 'Si una semana se desmorona, ¿qué hay que hacer?',
    opts: ['Saltar a la siguiente', 'Repetir la semana', 'Empezar de cero', 'Combinar con la siguiente'],
    correct: 1,
  },
  {
    q: '¿Por qué introducir una técnica nueva por semana (Kaizen)?',
    opts: ['Por costumbre japonesa', 'Para no acumular hábitos frágiles', 'Para vender más cursos', 'Sin razón específica'],
    correct: 1,
  },
  {
    q: '¿Cuál es el objetivo numérico de tarjetas al final de Semana 3?',
    opts: ['50-100', '150-200', '300-400', '500+'],
    correct: 1,
  },
];
