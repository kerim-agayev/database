# Source Catalog — Database Engineering Track

Status: **draft v0.1** (2026-11-11). Local files were inspected with `pdftotext` (copyright page + table of contents).
External sources listed under "To verify" have **not** been opened yet. Treat them as leads, not evidence.

## 1. Local files (verified from the PDFs)

| File | Title / Author | Edition found | Date | Notes |
|---|---|---|---|---|
| `Designing-Data-Intensive-Applications.pdf` | *Designing Data-Intensive Applications*, Martin Kleppmann | **1st edition, Sixth Early Release** (pre-publication draft) | 2016-07-11 | **Not the 2nd edition** that DATABASE_CLAUDE.md names. The book says "several chapters are yet to be written". Chapters 1–11 are present, Chapter 12 ("The Future of Data Systems") is missing. Text may differ from the final 1st edition (2017). |
| `Database Internals.pdf` | *Database Internals*, Alex Petrov (O'Reilly) | 1st edition | Oct 2019 | Part I: storage engines (B-trees, file formats, transactions & recovery, B-tree variants, LSM). Part II: distributed systems (failure detection, leader election, replication & consistency, anti-entropy, distributed transactions, consensus). |
| `Systems_Performance.pdf` | *Systems Performance: Enterprise and the Cloud*, Brendan Gregg | **1st edition** | 2014 | A 2nd edition (2020) exists, with BPF/bpftrace and newer Linux tooling. Methodology chapters (2, 12) still hold up well; tool chapters are partly dated. |
| `database_reliability_engineering.pdf` | *Database Reliability Engineering*, Laine Campbell & Charity Majors | 1st edition | Nov 2017 | Ch 2 SLOs, 3 risk, 4 observability, 5–6 infrastructure, 7 backup/recovery, 8 release management (migrations), 9 security, 10 storage/indexing/replication, 11 datastore field guide, 12 architecture patterns. |

### Video course (curriculum supplied by learner, 2026-11-11). **Not purchased; optional.**

The learner has not bought this course and may never buy it. The track must not depend on it. Its curriculum is used only as a **topic checklist**. Each topic is taught from the books, official docs and free legitimate sources (for example CMU 15-445 lectures, PostgreSQL docs, *Use The Index, Luke!*, and Hussein Nasser's free YouTube channel, which still needs checking).

| Course | Instructor | Size | Notes |
|---|---|---|---|
| *Fundamentals of Database Engineering* (Udemy) | Hussein Nasser | 18 sections, 167 lectures + 2 quizzes, 30h 59m | Mostly Postgres hands-on, with MySQL/InnoDB comparisons. About 16h 43m Core, 7h 21m Recommended, 6h 03m Optional, 52m Skip (archived). Full lecture-by-lecture map, with week assignments and a checklist: [COURSE_MAP_HUSSEIN_NASSER.md](COURSE_MAP_HUSSEIN_NASSER.md). Lecture content is assumed from titles until watched. |

## 2. Chapter-to-topic map (draft)

| Subject area | DDIA (1st ed.) | Database Internals | Systems Performance (1st ed.) | DRE | Nasser course (groups) |
|---|---|---|---|---|---|
| 1. Foundations & modeling | Ch 1, 2, 4 | Ch 1 | — | Ch 11 (optional) | S0, S2, S10 intro, S12 (SQL vs NoSQL) |
| 2. Query execution & indexing | Ch 3 (indexes) | Ch 2, 4 | — | Ch 10 | S3, S4, S7 (pagination), S15 planner Q&A (**core**) |
| 3. Storage internals | Ch 3 | Ch 1–7 (**core**) | Ch 7, 8, 9 (selected) | — | S2, S10 engines, S16 (WAL, write amplification, Postgres architecture) |
| 4. Transactions & concurrency | Ch 7 (**core**) | Ch 5 | — | — | S1, S7, S15 isolation Q&A, S16 (optimistic/pessimistic, InnoDB locking) |
| 5. Performance | Ch 1 (latency percentiles) | — | Ch 2, 5, 12 (**core**) | Ch 4 | S7 (pooling), S11 cursors, S15 (COUNT(*)) |
| 6. Replication, distribution, reliability | Ch 5, 6, 8, 9 | Ch 8–14 (selected) | — | Ch 2, 3, 7, 9 (**core**) | S5, S6, S8, S12 (CAP), S13 security, S16 (distributed txn) |
| 7. Application DB engineering | Ch 4, 11 (CDC/outbox context) | — | — | Ch 8 | S13 (REST + permissions), S9 system design |

Coverage gaps the course leaves to the books: crash recovery/ARIES depth, LSM compaction, write skew theory, consensus, backup/PITR drills, migrations in CI/CD, SLOs/observability, performance methodology.

Redundancy note: DDIA Ch 3 and Database Internals Ch 2/7 overlap (B-tree vs LSM). Read DDIA for the big picture, then Petrov for the mechanics.

## 3. To verify (external, not yet opened)

- Official docs for the engine the learner's project uses (engine **not identified yet**).
- DDIA 2nd edition (Kleppmann & Riccomini): confirm publication status and chapter changes.
- CMU 15-445/645 Database Systems (Andy Pavlo): free lectures and course notes.
- *Use The Index, Luke!* (Markus Winand): free online book on indexing.
- Jepsen analyses (Kyle Kingsbury): real isolation and consistency anomalies.
- Original papers: Berenson et al. 1995 "A Critique of ANSI SQL Isolation Levels"; O'Neil et al. 1996 (LSM-tree); ARIES (Mohan et al. 1992).
- Next.js current stable App Router docs; Vercel Hobby limits and terms.
