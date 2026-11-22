# learning-app

Interactive lessons for the 90-day database engineering track. Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind 4.

## Run

```bash
cd learning-app
npm install
npm run dev          # http://localhost:3000, lesson at /tutorial/2
```

## Commands

| Command | What it does |
|---|---|
| `npm test` | Unit and component tests (Vitest + Testing Library) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates route types, then runs `tsc` |
| `npm run build` | Production build (needs internet once for Google Fonts) |
| `npm run sync:content` | Rebuilds `content/roadmap.json` and `content/progress.json` from `../ROADMAP.md` and `../LEARNING_PROGRESS.md` |

## How content works

- The 90-day plan has one source of truth: `../ROADMAP.md`. Run `npm run sync:content` after editing it (or after marking a day complete in `../LEARNING_PROGRESS.md`).
- Written lessons live in `content/lessons/day-NN.ts` as typed data and are registered in `content/lessons/index.ts`. Days without a lesson show their roadmap entry honestly.
- Interactive visuals take their data from `content/visuals/` and must state what they model and what they simplify.
- `/tutorial/[day]` accepts only 1–90. `proxy.ts` answers a real 404 for anything else; the page validates too.

## Teaching models vs real behavior

Visuals here are simplified teaching models. Real measurements come from `../db-lab` (PostgreSQL in Docker).
