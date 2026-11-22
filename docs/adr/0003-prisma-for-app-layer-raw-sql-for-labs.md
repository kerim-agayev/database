# ADR-0003: Prisma for the app layer, raw SQL for internals labs

- Status: Accepted (learner approved, 2026-11-11)

## Context

The learner wants Prisma ORM. Prisma is widely used, and it is a good subject for ORM lessons: N+1, eager/lazy loading, the SQL it generates, migrations. But an ORM hides SQL, and some PostgreSQL features need hand-written SQL inside migrations (for example `CREATE INDEX CONCURRENTLY`, some index types, RLS policies; to be verified against current Prisma docs).

## Decision

- Use Prisma for the API's domain logic, schema and migrations.
- Use raw SQL (`psql` in the container, Prisma `$queryRaw`, or hand-written SQL in migration files) for all internals and performance labs.
- Turn on query logging in labs, so every ORM call shows its SQL.

## Consequences

- (+) Learn how ORMs work in the real world and where they fall short.
- (−) Two ways to talk to the database. Each lab states which one it uses and why.
