# Session Log — Database Engineering Track

Append-only. Newest entry at the bottom. Read the last 3 entries at session start (see CLAUDE.md).
Earlier entries on 2026-11-11 were reconstructed at 21:34, so their times are approximate.

## 2026-11-11 ~20:55 — First session: source inventory
- Done: Inspected the 4 PDFs (copyright pages and tables of contents). Created `SOURCE_CATALOG.md`.
- Findings: DDIA is a **1st-edition early-release draft (2016)**, not the 2nd edition, and Ch 12 is missing. Systems Performance is the 1st edition (2014). Database Internals is the 1st edition (2019). DRE is the 1st edition (2017).
- Done: Proposed a week-level 90-day roadmap (13 weeks) and 3 project options in chat (no file yet).

## 2026-11-11 ~21:10 — Hussein Nasser course mapped
- Done: Learner pasted the Udemy curriculum (167 lectures, 30h 59m). Created `COURSE_MAP_HUSSEIN_NASSER.md` (lecture → priority → week, checklist). Updated `SOURCE_CATALOG.md`.
- Finding: Week 4 video load is too heavy (~5h). Mitigation noted in the course map.

## 2026-11-11 ~21:20 — Architecture questions answered
- Decided (learner): Build a synthetic API from scratch, no company repo, so the engine is **PostgreSQL**. Use Prisma ORM. Neon is wanted.
- Decided (Claude, accepted): Two projects, `learning-app/` and `db-lab/`. **Local Docker Postgres is primary**, because Neon's storage architecture blocks the WAL/crash/vacuum/replication labs. Neon is secondary. Prisma for the app layer, raw SQL for internals labs.
- Decided: Credentials are never pasted in chat. Only `.env.example` gets committed.

## 2026-11-11 ~21:25 — Course not purchased
- Decided (learner): Will not buy the Hussein Nasser course for now. The course map now serves as a topic checklist only. Updated both md files.

## 2026-11-11 21:30 — Docker verified
- Done: Docker Desktop 29.9.3, Compose v5.7.0, engine running on WSL2 (4 CPU, ~2.8 GB RAM). `hello-world` ran successfully.
- Note: The current VS Code session had a stale PATH. The learner is restarting VS Code.

## 2026-11-11 21:34 — Session memory set up
- Done: Created `CLAUDE.md` (session entry point, imports DATABASE_CLAUDE.md, log rule, locked decisions, environment notes) and this `SESSION_LOG.md`.
- Open: (1) Explicit approval of the hybrid project concept. (2) Approval to write the day-by-day ROADMAP.md.
- Next: After the VS Code restart, check that `docker --version` works in a fresh shell. Then write `ROADMAP.md` (Day 1–90), `PROJECT_PROPOSALS.md` and the first ADRs in `docs/adr/` for approval. No code before approval.

## 2026-11-11 21:40 — Roadmap + project approved, planning docs written
- Decided (learner): Approved the hybrid project concept and the 90-day roadmap.
- Done: `ROADMAP.md` (Day 1–90, gates on D30/D60/D90, app increments per week), `PROJECT_PROPOSALS.md` (decision recorded), `docs/adr/0001–0003`, `LEARNING_PROGRESS.md` (empty, next = Day 1). Created folders `docs/architecture/` and `docs/experiments/`.
- Open: The learner is restarting VS Code. Docker PATH check is pending.
- Next: Check `docker --version` in a fresh shell, check current Next.js docs, explain the scaffold plan, then build `learning-app/` (Next.js + `/tutorial/[day]` + Day 1) after the learner says go.

## 2026-11-11 21:57 — New session: Docker OK, Day 1 started
- Done: In a fresh shell, `docker --version` (29.9.3), compose v5.7.0 and the engine all work. The PATH issue is resolved.
- Decided (Claude, default): Day 1 diagnostic runs in chat first, because it doesn't need the app. learning-app is scaffolded right after it.
- Open: Learner's answers to the 25-question diagnostic + 3 background questions.
- Next: Grade the diagnostic → baseline + weak areas in LEARNING_PROGRESS.md. Then check Next.js docs and scaffold learning-app.

## 2026-11-11 22:13 — Day 1 baseline recorded
- Done: The learner self-reported: SQL intermediate but rusty, no knowledge of the other areas, TS/Node/Docker/Git 3/5. Works in restaurant/warehouse/inventory software. Goal: mid-level, more than 90 days is OK. Updated `LEARNING_PROGRESS.md` (baseline) and `ROADMAP.md` ("Adjustments": SQL warm-ups D2–21, mastery pace, zero-baseline teaching).
- Open: Day 1 part 2: 5-question SQL calibration check sent, waiting for answers.
- Next: Grade the SQL check, mark Day 1 complete, then scaffold learning-app, then Day 2.

## 2026-11-11 22:25 — Local PostgreSQL lab is up (practice dataset)
- Done: Created `db-lab/` (docker-compose.yml, .env.example, .gitignore, `sql/init/001_practice_schema.sql`). Container `dblab-postgres` runs PostgreSQL 18.6 (18 = current stable per postgresql.org, checked today; 19 is still RC) on 127.0.0.1:5433. Seeded schema `practice`: 5 branches (Riverside has 0 orders), 20 menu items, 5,000 orders, 12,591 lines; 52 orders (id % 97 = 0) have deliberately wrong totals. `.env` copied from the example (local placeholder password).
- Found: A native PostgreSQL 18 service (port 5432) and MS SQL Server are installed on the host. Left untouched. The learner knows T-SQL.
- Decided (learner): Wants to learn SQL hands-on by trial and error rather than on paper.
- Open: The learner connects (DBeaver or psql) and tries the 5 SQL calibration questions.
- Next: Grade the SQL attempts, finish Day 1, scaffold learning-app, then Day 2.

## 2026-11-11 22:25 — Correction
- The deliberately wrong totals are 51 orders (id % 97 = 0), not 52 as written above.

## 2026-11-11 22:29 — T-SQL practice script for SSMS
- Decided (learner): Do the Day 1 SQL calibration in SSMS (familiar tool) instead of the Docker lab. Claude agreed for the warm-ups. The main track stays on PostgreSQL (ADR-0002); Docker access is taught step by step on Day 5.
- Done: `db-lab/sql/mssql/practice_tsql.sql` creates the database RestaurantPractice with the same 4 tables and the same traps. **Not run by Claude** (learner's SQL Server was left untouched), so it is untested on the learner's machine.
- Open: (1) The learner runs the script in SSMS and answers the 5 SQL questions. (2) Does the learner's workplace use SQL Server? If so, add SQL Server vs PostgreSQL comparison notes to lessons.
- Next: Grade the SQL answers, close Day 1, scaffold learning-app.

## 2026-11-11 22:39 — Day 1 complete
- Done: SQL Q3 attempt reviewed (JOIN correct, grain error: compared the total per line). Taught the "grain" concept and gave graduated hints (GROUP BY → HAVING) plus a predict-then-run task. Q1/2/4/5 move to the warm-ups. Marked Day 1 complete in `LEARNING_PROGRESS.md` (evidence + SQL refresh order).
- Open: Learner sends the fixed Q3 + row count (first Day 2 warm-up).
- Next: Check Next.js docs, scaffold learning-app (`/tutorial/[day]`, Day 1–2 content), then teach Day 2.

## 2026-11-11 22:45 — SQL warm-up: Q3 worked example
- Done: The learner could not write Q3. Gave a 2-step worked example (GROUP BY order_id → JOIN + GROUP BY + HAVING, expected 51 rows) and explained WHERE vs HAVING (half of Q5).
- Open: Independent transfer task: orders with more than 3 distinct items (COUNT + HAVING), predict the share first (~1/4).
- Next: Check the transfer task, then scaffold learning-app and start Day 2.

## 2026-11-11 22:49 — SQL warm-up: COUNT + HAVING explained
- Done: The learner asked for the transfer-task explanation. Explained COUNT(*) + HAVING, the logical processing order (FROM → GROUP BY → HAVING → SELECT), counting via a subquery, and why the PK makes COUNT(*) = distinct items (preview of Day 10).
- Open: Tiny one-change task: orders with exactly 1 item (predict ~1/4, then run).
- Next: Check the answer, then scaffold learning-app and start Day 2.

## 2026-11-22 10:52 — learning-app scaffolded (reconstructed entry; the work was done on 2026-11-11 ~23:00 and not logged then)
- Done: Learner answered the "exactly 1 item" task correctly (HAVING COUNT(*) = 1). Verified Next.js docs: current stable is Next 16.4.6, the generator enables Cache Components by default, and `dynamicParams` is NOT available with Cache Components (so `/tutorial/[day]` must validate the day itself, e.g. `notFound()` for days outside 1–90). Scaffolded `learning-app/` (Next 16.4.6, React 19.3, TypeScript, Tailwind 4, ESLint, App Router, npm, no git). `npm audit --omit=dev` = 0 vulnerabilities. Verified in the lab DB: default table access method = heap, one OS process per client connection, background processes (checkpointer, walwriter, autovacuum launcher…) — material for Day 2.
- Interrupted: Installing test tools failed because the template pins `@types/node@^20` while the latest Vitest needs ≥22 (npm peer conflict). The retry (`@types/node@^24` + vitest, jsdom, Testing Library) was stopped by the learner before finishing. **Nothing was added to package.json.**
- Open: Learner decision on whether to retry the test-tool install. Docker Desktop is not running right now (needed for lab work, not for the app).
- Next: Retry the install if approved, then build the `/tutorial/[day]` route + Day 1–2 content, then teach Day 2.

## 2026-11-22 11:04 — Test tools installed in learning-app
- Decided (learner): "Install whatever is needed" (approved the test tools and the @types/node 20→24 bump).
- Done: Installed as devDependencies: @types/node ^24.19.2, vitest ^5.1.1, @vitejs/plugin-react ^6.3.0, jsdom ^29.1.1, @testing-library/react ^16.3.3, /dom ^10.4.2, /user-event ^14.6.13, /jest-dom ^8.0.0. `npx vitest --version` works (5.1.1). The install ran in the background (exit code 0).
- Found: `npm audit` reports 7 moderate vulnerabilities, all in dev-only ESLint/typescript-eslint packages that came with the Next.js template (the same 7 were reported right after scaffolding). `npm audit --omit=dev` was 0 on 2026-11-11, so the shipped app is not affected. Did NOT run `npm audit fix` (it can change versions).
- Next: Add the Vitest config + a `test` script, build the `/tutorial/[day]` route (day validated by hand, 404 outside 1–90) with tests, add Day 1–2 content, then teach Day 2.

## 2026-11-22 11:25 — learning-app: /tutorial/[day] + Day 1–2 lessons built and verified
- Decided (learner): "devam et" (continue); Docker Desktop opened by the learner. Lab container was restarted with `docker compose up -d`; data survived (5,000 orders).
- Done: `learning-app/` now has: `scripts/sync-content.mjs` (ROADMAP.md → content/roadmap.json, LEARNING_PROGRESS.md → content/progress.json), `/` home, `/tutorial` day index (13 weeks, status per day), `/tutorial/[day]` (all 90 days prerendered, prev/next, progress bar, honest "planned" page for days without a lesson), typed lessons for Day 1 and Day 2, interactive `QueryPathExplorer` (buttons, no animation, plain-text twin, states model/simplification), `KnowledgeCheck`, `proxy.ts` (real HTTP 404 for invalid days), global not-found, `DATABASE_GLOSSARY.md`, `learning-app/README.md`. Day 2 content verified against PostgreSQL 18 docs, Petrov Ch. 1 text, and the lab (heap, pg_am, pg_stat_activity).
- Verified: 65 tests pass (vitest), eslint clean, typecheck clean, `next build` OK (96 pages), and with `next start` on port 3100: /tutorial/1,2,3,45,90 → 200; /tutorial/0,91,07,abc,1.5,%ZZ and /nonexistent → 404; /tutorial/%39 → 200. NOT verified: no visual check in a real browser, no automated accessibility audit (axe), no phone testing. The test server on 3100 was stopped.
- Found: Cache Components has no `dynamicParams=false`, and notFound() after streaming answers HTTP 200 with a blank first HTML, so `proxy.ts` was added. npm skipped the Windows rolldown binding (fixed locally with --no-save, noted in CLAUDE.md). Next also warns about a stray package-lock.json in C:\Users\Karim (home folder), not ours, harmless.
- Open: Learner opens http://localhost:3000/tutorial/2 (npm run dev) and answers Day 2's prediction + SQL warm-up (Q1, LEFT JOIN with zero rows).
- Next: Teach Day 2 in chat, grade the self-check, mark Day 2 ☑ only if understood, then run `npm run sync:content`.

## 2026-11-22 11:31 — "localhost:3000/tutorial/2 does not work" fixed
- Found: Nothing was listening on port 3000. The dev server had never been started (the learner had not run `npm run dev`, or it did not start). Claude started it in the background (`npm run dev`); /tutorial/2 → 200 (~0.6 s warm), /tutorial/91 → 404. The first load in dev is slow (about 10–25 s, Turbopack compiling 90 routes).
- Found: A dev-only Next.js "instant navigation" error pointed at `await params` in app/tutorial/[day]/page.tsx. Fixed by `export const instant = false` with a comment (all valid days are prerendered, proxy.ts rejects the rest). No new error lines after the change. Did not re-run `next build` (it shares the .next folder with the running dev server); lint and tsc are clean. Run `npm run build` + `npm test` once the dev server is stopped.
- Open: Learner confirms the page opens in the browser and answers the Day 2 prediction (client backends) + SQL warm-up (Q1).
- Next: Teach Day 2, grade the self-check.

## 2026-11-22 11:40 — Everything learner-facing switched to Turkish
- Decided (learner): "neden tüm dayler ingilizce, hepsini türkçe yap, kim sana ingilizce yap söyledi". Cause: DATABASE_CLAUDE.md says the app and notes are English unless the learner explicitly asks otherwise. Claude applied that default without asking. The learner now asked explicitly; recorded in CLAUDE.md ("Language") so it will not revert.
- Done: Translated `ROADMAP.md` (all 90 days, gates, adjustments; headings now "Hafta N — … (Gün a–b)"), `DATABASE_GLOSSARY.md`, and the whole learning-app UI (layout with lang="tr" and the latin-ext font subset so ş ğ ı İ render in Geist, home, day index, day page, not-found, nav, knowledge check, query-path explorer + its data) and the Day 1 and Day 2 lessons. Updated `scripts/sync-content.mjs` (Turkish headings, gate/review detection), regenerated `content/roadmap.json`, updated the 4 test files for the Turkish strings.
- Verified: 65 tests pass, eslint and typecheck clean, `next build` OK, live server: /tutorial/2 and /tutorial/45 → 200 with Turkish h1, /tutorial/91 → 404 with "Sayfa bulunamadı", html lang="tr". NOT verified: native-speaker proofreading of the Turkish by the learner, visual check in a browser.
- Not translated (still English): ADRs, SOURCE_CATALOG.md, COURSE_MAP_HUSSEIN_NASSER.md, learning-app/README.md, LEARNING_PROGRESS.md, code comments. Asked the learner whether to translate them too.
- Dev server (`npm run dev`) is running in the background again on port 3000 (my earlier one was stopped for the build).
- Open: Learner's reaction to the Turkish text (wording fixes welcome), the Day 2 prediction (client backends) and SQL warm-up Q1 (LEFT JOIN, Riverside = 0).
- Next: Teach Day 2, grade the self-check.

## 2026-11-22 11:45 — Git repository prepared (multi-computer continuation)
- Decided (learner): wants the project on GitHub (`https://github.com/kerim-agayev/database.git`, branch main) so it can be cloned and continued on other computers, with the best possible documentation and with Claude's memory carried in the files.
- Found: the remote repo already exists, is EMPTY and is **PUBLIC**. Git identity is already the GitHub noreply address (work email not exposed). The folder has 4 copyrighted book PDFs, so they are excluded (`*.pdf` in .gitignore). The company name "Clopos" appears in CLAUDE.md and DATABASE_CLAUDE.md (as a "never touch company data" rule); no company code, schema, data or work email is in the repo. `db-lab/.env` is ignored.
- Done: Root `.gitignore`, `.gitattributes`, Turkish root `README.md` (folder map, clone → docker → npm → Claude Code steps, session start/end routine, what is not in Git and how it is recreated, books table, troubleshooting incl. the npm native-binding bug per OS), and CLAUDE.md sections "Multi-computer and Git" and a git step in "Session start". Needs Node 22.12+ for Vitest (Next needs 20.9+).
- Open: **Visibility decision before the first push** (public vs private). Claude recommends private. Changing visibility is an account setting, so it needs the learner's explicit OK. Nothing has been pushed yet.
- Next: Local commit is made; after the learner decides, push to origin main (`git push -u origin main`).
