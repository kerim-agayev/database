# Learning Progress

A day is marked complete only after the learner shows understanding (self-check passed) or explicitly records it as done.

## Current position

- Next: **Day 2** (DBMS architecture). Lesson is written (`/tutorial/2`); waiting for the learner's self-check. SQL warm-up (Q1 LEFT JOIN with zero rows) comes with it.
- Gates: Day 30 ☐ · Day 60 ☐ · Day 90 ☐

## Baseline (Day 1 diagnostic, 2026-11-11)

Self-reported by the learner instead of answering the 25 questions. "I don't know any of these" is accepted as an honest baseline.

| Area | Baseline | Note |
|---|---|---|
| SQL querying | Intermediate in the past, **rusty now** | From a data-analyst course. Calibration check pending (Day 1, part 2). |
| A. Architecture & foundations | 0 / none | Start from first principles |
| B. Modeling & integrity | 0 / none | |
| C. Query execution & indexes | 0 / none | |
| D. Storage internals | 0 / none | |
| E. Transactions & concurrency | 0 / none | Highest relevance to work domain (inventory, stock, payments) |
| F. Performance & operations | 0 / none | |
| TypeScript/Node, Docker, Git | 3 / 5 | Enough to follow the labs; Claude explains tooling steps as they come |

**Motivation and context:** The learner works in restaurant management software (orders, warehouse, inventory), where the database is the central topic every day. Goal: push hard and reach at least a mid-level understanding. The learner explicitly accepts going **beyond 90 calendar days** if needed. Learning comes first, not the calendar.

**Teaching implications:**
- Every concept is taught step by step from zero. Jargon is defined on first use.
- A 10–15 minute SQL warm-up is added to Days 2–21 (see ROADMAP.md, "Adjustments"). No separate SQL weeks.
- Pace is set by mastery. Remediation days are inserted freely.

## Day log

| Day | Status | Date | Evidence | Confidence (1–5) | Open questions / gaps |
|---|---|---|---|---|---|
| 1 | ☑ complete | 2026-11-11 | Honest self-assessment baseline. SQL Q3 attempt: correct JOIN, but compared the order total per line (grain error, missing GROUP BY/HAVING). Q1, Q2, Q4, Q5 not attempted ("forgot") | SQL 2/5 now (window functions were strong before) | Aggregation grain; WHERE vs HAVING; LEFT JOIN for zero rows |
| 2 | ◐ re-teaching (v2, 2026-11-22) | 2026-11-22 | v1 not understood ("hiçbir şey anlamadım": too many new terms). Lab experiment done correctly: heap, pg_am list, client backend = 2 with two sessions. v2 lesson + /tutorial/2/interactive built with the restaurant analogy | — | Needs a Feynman explanation of the 4 terms in own words |

## Weak areas (updated after reviews)

- 2026-11-22: Gets lost when many abstract terms come at once. Needs the restaurant analogy first, at most 5 new words per day, games and step-by-step (see TEACHING_METHOD.md).

- Everything beyond basic SQL. Priority order follows the roadmap dependency map.
- SQL refresh order for warm-ups: GROUP BY/HAVING + grain → LEFT JOIN (zero rows) → date filters (T-SQL vs PostgreSQL) → TOP/LIMIT → window functions (running totals).
