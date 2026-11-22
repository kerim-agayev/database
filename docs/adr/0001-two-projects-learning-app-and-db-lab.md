# ADR-0001: Two projects, learning-app and db-lab

- Status: Accepted (learner approved, 2026-11-11)

## Context

The track needs interactive teaching visuals and real database experiments. Simulated behavior and real database behavior must never be confused (DATABASE_CLAUDE.md). Vercel Hobby can host a mostly static UI but not a persistent database.

## Decision

Split the work into `learning-app/` (Next.js + TypeScript, simulations, `/tutorial/[day]`) and `db-lab/` (Node + TypeScript API, Prisma, raw SQL, real PostgreSQL).

## Consequences

- (+) Clear boundary: anything in learning-app is a model, anything in db-lab is measured.
- (+) learning-app can deploy statically with no database secrets.
- (−) Two package.json files to maintain. Kept light: no monorepo tooling unless it becomes necessary.
- Alternative rejected: a single Next.js app with route handlers hitting the database. Simpler, but it mixes the simulated/real boundary and drags database credentials into the deployable UI.
