# ADR-0002: Local Docker PostgreSQL as the primary lab, Neon as secondary

- Status: Accepted (learner approved, 2026-11-11)

## Context

The learner proposed Neon (hosted PostgreSQL). Many internals labs need full control of the server: inspecting WAL (`pg_waldump`), checkpoints, `synchronous_commit`, hard-killing the server for crash recovery, VACUUM/bloat observation, streaming replication between instances, server config like `shared_buffers`, superuser extensions (`pageinspect`, `pg_buffercache`).

Neon separates storage from compute and runs its own WAL and storage services. It does not offer full superuser access, and it can suspend when idle. To be verified against current Neon docs before use.

## Decision

- **Primary:** PostgreSQL in Docker Desktop on the learner's machine. Free, fully controllable, disposable.
- **Secondary:** Neon, used for deploy-shaped and serverless lessons (connection pooling, cold starts; ROADMAP Day 62). Only after the learner creates the account and the current free-tier limits are checked.

## Consequences

- (+) Every internals lab is possible, and breaking the database is safe.
- (+) Zero cost, no account needed to start.
- (−) Docker VM has about 2.8 GB RAM. Multi-container labs (replication) use small memory settings.
- Credentials: the learner writes `.env` locally. Only `.env.example` with placeholders is committed. Secrets are never pasted in chat.
