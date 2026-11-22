# Project Proposals & Decision

## Options considered (2026-11-11)

| Option | Learning value | Complexity | Cost | Fit to 90 days |
|---|---|---|---|---|
| 1. **Restaurant DB Lab**: schema explorer, ER diagram, query-plan & index experiments | Broad: modeling, indexes, plans | Medium | €0 | Strong in weeks 1–6 |
| 2. **Order/Payment/Inventory Transaction Simulator**: multiple workers interleave operations | Highest for concurrency, isolation, locks | High (timeline modeling) | €0 | Strong in weeks 3, 7–8 |
| 3. **Query Performance Observatory**: benchmarks, latency histograms, pool queueing | Strong for performance | Medium | €0 | Weak before week 9 |

## Decision: approved by the learner, 2026-11-11

**Hybrid:** Option 1 is the shell, Option 2 is the centerpiece module, and Option 3 is added as a panel in weeks 9–10. The project grows with the curriculum (see ROADMAP.md, "Learning-app increments").

## Shape

```
3_database/
├── learning-app/   Next.js App Router + TypeScript. /tutorial/[day], interactive teaching simulations.
│                   Mostly static → Vercel Hobby (personal, non-commercial; verify limits before deploying).
└── db-lab/         Node + TypeScript API + Prisma + raw SQL experiments against REAL PostgreSQL.
                    Primary: local Docker PostgreSQL. Secondary: Neon (only after learner approval).
```

Boundary: **learning-app = teaching models (simplified, labeled), db-lab = real measurements.** When a learning-app panel shows real numbers, it says where they came from (lab run, date, machine).

See `docs/adr/` for the reasoning behind each choice.
