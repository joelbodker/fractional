# Fractional Sense Bootcamp

A fraction comparison practice app for building visual intuition. Students work through comparison problems with a scratchpad, get immediate feedback with bar models, and receive follow-up problems when they need to reinforce a strategy.

## Features

- **Logo reveal** — Einstein + Learn With AI splash on load
- **5-step intro** — Back to the basics (numerator/denominator), same denominator, same numerator, scratchpad, and mistakes-as-learning
- **15-problem sessions** — Mix of same-denominator, same-numerator, and unlike-denominators
- **Smart follow-ups** — Wrong answers insert an extra problem of the same type (e.g. “Focus Strategy: Same numerator”) so students can apply the strategy right away
- **Session summary** — Stats, confetti, and options to finish for the day (back to logo) or start another set

## Tech stack

- **React 18** + **TypeScript**
- **Vite** — dev server and build
- **React Router** — logo → practice → summary
- **Motion** — animations
- **Tailwind CSS** — styling
- **canvas-confetti** — celebration on session complete

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`. Preview the production build:

```bash
npm run preview
```

## Project structure

- `src/app/` — App shell, routing, Practice flow, Summary, SessionContext, AppContext (logo reveal state)
- `src/app/components/` — LogoReveal, Header, ProblemCard, Workpad, BarModel
- `src/app/data/problems.ts` — 15 initial problems, follow-up generator, explanations, strategy hints
- `src/assets/` — Einstein and Learn With AI logos

## License

Private. See repo for terms.
