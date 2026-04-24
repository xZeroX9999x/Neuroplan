# Neuroplan · 28 días

Protocolo de aprendizaje acelerado basado en neurociencia. PWA instalable en móvil y escritorio. Funciona offline.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · localStorage · Service Worker

---

## Qué hace

Un plan de 4 semanas con una técnica nueva cada 7 días (Kaizen):

1. **Semana 1** — Micro-sesiones de foco (pomodoros)
2. **Semana 2** — Recuerdo activo
3. **Semana 3** — Repetición espaciada (intervalos 1→3→7→14→30)
4. **Semana 4** — Hábitos BDNF (sueño, cardio, luz solar)

Incluye: dashboard diario, temporizador pomodoro con notificaciones, sistema de tarjetas con SRS, quiz de metodología (active recall sobre las propias técnicas), tracker de hábitos, diario diario, progreso global. Todo se auto-guarda en `localStorage`.

---

## Desarrollo local

Requisitos: Node.js ≥ 18, pnpm (o npm/yarn).

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

Build de producción:

```bash
pnpm build
pnpm start
```

---

## Deploy a Vercel

1. `git init && git add . && git commit -m "initial"`
2. Crea un repo en GitHub y haz push
3. Ve a [vercel.com/new](https://vercel.com/new), importa el repo
4. Deploy sin tocar nada (Vercel detecta Next.js automáticamente)
5. Tendrás una URL pública tipo `neuroplan-xxx.vercel.app`

Custom domain opcional: Project Settings → Domains.

---

## Instalar como app

**Android (Chrome):** abre la URL → menú ⋮ → "Añadir a pantalla de inicio"
**iOS (Safari):** abre la URL → botón compartir → "Añadir a pantalla de inicio"
**Desktop (Chrome/Edge):** icono de instalar en la barra de URL (derecha)

Una vez instalada funciona como app nativa: icono en home, pantalla completa, offline.

---

## Arquitectura

```
app/               # Next.js App Router
  layout.tsx       # Root layout + PWA meta + SW registration
  page.tsx         # Entry point
  globals.css      # Tailwind + design tokens
components/        # React components (client-side)
  Neuroplan.tsx    # Root component with view routing
  Setup.tsx        # Onboarding (botón "Iniciar")
  Dashboard.tsx    # Vista "Hoy"
  PlanView.tsx     # Plan completo de las 4 semanas
  Pomodoro.tsx     # Temporizador con ciclo work/break
  Cards.tsx        # SRS con intervalos crecientes
  Quiz.tsx         # Quiz de metodología
  Habits.tsx       # Tracker de hábitos BDNF
  ResetModal.tsx   # Confirmación de borrado
  Header.tsx, Nav.tsx
lib/
  types.ts         # TypeScript types
  plan.ts          # Datos de las 4 semanas
  quiz.ts          # Pool de 20 preguntas
  store.ts         # Hook useNeuroplan + localStorage
public/
  manifest.json    # PWA manifest
  sw.js            # Service worker (cache-first)
  icon-*.png       # PWA icons (192, 512, maskable, apple)
```

---

## Extender

**Añadir preguntas al quiz:** `lib/quiz.ts` → añade objetos al array `QUIZ_POOL`.

**Cambiar intervalos SRS:** `lib/plan.ts` → modifica `INTERVALS` (array de días).

**Añadir hábitos BDNF:** `components/Habits.tsx` → añade al array `HABITS` + actualiza el tipo `BdnfHabits` en `lib/types.ts`.

**Cambiar colores:** `tailwind.config.ts` → sección `colors`.

---

## Licencia

MIT. Úsalo como quieras.
