# CLAUDE.md — Database Engineering Track (session entry point)

This file loads automatically at the start of every session, including after `/clear`.

## Full contract (always applies)

@DATABASE_CLAUDE.md

## Session start — do this first, every time

0. Run `git status` and `git log -1 --format=%cd` (the learner works on several computers). If the working tree is clean and the remote is ahead, ask once, then `git pull`. Never discard or overwrite local changes.
1. Read the **last 3 entries** of [SESSION_LOG.md](SESSION_LOG.md). That tells you where we are, what is waiting on whom, and the next step.
2. If they exist, read [ROADMAP.md](ROADMAP.md) (the plan) and [LEARNING_PROGRESS.md](LEARNING_PROGRESS.md) (the evidence).
3. Greet the learner with a 2–3 line status ("We are at …, the next step is …") before doing anything else.
4. Do not redo work the log marks as done. Do not re-ask questions the log marks as decided.

## Session log rule — do this after every meaningful step

Append an entry to the **end** of SESSION_LOG.md after each completed step: a file created or changed, a decision made, a lesson taught, an environment change. Do not wait for the end of the session, because the learner may run `/clear` at any time.

Entry format (keep it short, 3–8 lines):

```
## YYYY-MM-DD HH:MM — <short title>
- Done: <what changed, which files>
- Decided: <decisions + who decided> (omit if none)
- Open: <questions waiting for the learner> (omit if none)
- Next: <the single next step>
```

Never rewrite or delete old entries. Corrections go in a new entry. Get the date and time with a shell command, do not guess them.

## Decisions locked so far (details in SESSION_LOG.md)

- Engine: **PostgreSQL** (current stable version, to be confirmed in official docs). Synthetic restaurant SaaS app built from scratch. **No company (Clopos) repo or data, ever.**
- Two projects: `learning-app/` (Next.js + TS, `/tutorial/[day]`, simulations, Vercel Hobby) and `db-lab/` (Node + TS API, Prisma + raw SQL, real experiments).
- Database: **local PostgreSQL in Docker is the primary lab.** Neon is a secondary environment (deploy, serverless/pooling lessons), only after the learner creates the account and the limits are verified.
- Credentials: never pasted in chat. The learner writes `.env` locally; Claude only writes `.env.example`.
- Hussein Nasser course: **not purchased.** Used only as a topic checklist ([COURSE_MAP_HUSSEIN_NASSER.md](COURSE_MAP_HUSSEIN_NASSER.md)).
- Project concept: hybrid of DB Lab (shell) + Transaction Simulator (centerpiece) + Performance panel (weeks 9–10). **Approved 2026-11-11.** 90-day ROADMAP.md approved.

## Environment notes (Windows 10)

- Node 24, npm 11, git 2.45. No `psql` on the host: use `docker exec … psql`.
- Docker Desktop 29.9.3 (WSL2, 4 CPU, ~2.8 GB RAM) at `C:\Users\Karim\AppData\Local\Programs\DockerDesktop\resources\bin`. If `docker` is not found, the shell started before the PATH was updated. Restart VS Code or prepend that folder to PATH.
- Git: see "Multi-computer and Git" below.
- The host already runs a **native PostgreSQL 18 service on port 5432** and **MS SQL Server**. They belong to the learner: never touch them.
- Lab DB: `db-lab/docker-compose.yml` → container `dblab-postgres`, **PostgreSQL 18.6**, `127.0.0.1:5433`, db `restaurant`, user `lab` (password in `db-lab/.env`, local only). Schema `practice` = SQL warm-up playground (seeded by `db-lab/sql/init/001_practice_schema.sql`); `search_path` defaults to `practice`. Quick shell: `docker exec -it dblab-postgres psql -U lab -d restaurant`.
- `learning-app/` (Next.js 16.4.6, Cache Components on, Vitest). Start: `cd learning-app && npm run dev` → http://localhost:3000/tutorial/2. Checks: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. After editing ROADMAP.md or marking a day ☑ in LEARNING_PROGRESS.md run `npm run sync:content` there. Day lessons: `content/lessons/day-NN.ts` + register in `content/lessons/index.ts`.
- Known quirk: npm skipped the Windows rolldown binding, so Vitest failed to start. Fixed locally with `npm install --no-save @rolldown/binding-win32-x64-msvc@1.2.19` (deliberately NOT saved to package.json). If `npm install`/`node_modules` is ever recreated and Vitest says "Cannot find native binding", run that command again.
- Next.js with Cache Components has no `dynamicParams = false`; `/tutorial/[day]` is validated by `lib/parse-day.ts` + `proxy.ts` (real 404) + the page itself.
- The learner learned SQL on **MS SQL Server (T-SQL)**. Point out PostgreSQL syntax differences when they come up.

## Multi-computer and Git

- The project lives in Git: remote `origin` = `https://github.com/kerim-agayev/database.git` (branch `main`). The learner continues on several computers via `git clone`/`git pull`. Claude's own memory does NOT move between computers, so **every important fact must be written into the repo files** (CLAUDE.md, SESSION_LOG.md, ROADMAP.md, LEARNING_PROGRESS.md).
- Commit and push **only when the learner asks or agrees**. At the end of a session (or a finished day) remind the learner once: "Commit + push yapalım mı?". Commit messages end with the attribution line given in the system reminder.
- Never commit: `*.pdf` (copyrighted books), `.env*` (except `.env.example`), `node_modules`, `.next`. They are in `.gitignore`; do not use `git add -f` on them.
- Commits use the learner's configured GitHub noreply identity. Never put the learner's work email in any file or commit.
- The environment notes below were written on the **first computer (Windows 10)**. On another computer paths, ports and tool versions can differ: check `docker --version`, `node --version` (needs Node 22.12+ for Vitest; Next needs 20.9+), then follow README.md. If something is machine-specific, write it in SESSION_LOG.md with the machine type.
- The repo README.md (Turkish) is the learner's "how do I start on a new computer" guide. Keep it in sync when setup steps change.

## Language

- **Turkish** for everything the learner reads while learning: conversation, the learning app (UI text, lessons, visuals, tests' expected strings), `ROADMAP.md`, `DATABASE_GLOSSARY.md`, lesson explanations and exercises. Keep established technical terms in English (WAL, B-tree, MVCC, index, transaction, planner, executor, grain…), explained in Turkish on first use.
- Decision (learner, 2026-11-22): the learner explicitly asked for Turkish ("kim sana ingilizce yap söyledi"). DATABASE_CLAUDE.md allows this ("unless the learner explicitly asks otherwise"). **Do not switch back to English.** When unsure which language a new learner-facing text should use, use Turkish.
- English is kept for code, identifiers, code comments, commit messages and engineering docs the learner does not study from (ADRs in `docs/adr/`, `SOURCE_CATALOG.md`, `COURSE_MAP_HUSSEIN_NASSER.md`, `learning-app/README.md`, `LEARNING_PROGRESS.md`) unless the learner asks to translate them too.
- Never again assume a language rule from a file without telling the learner. If a file rule and the learner's preference could differ, ask once.
- `learning-app/scripts/sync-content.mjs` parses `ROADMAP.md` by its Turkish headings (`## Hafta N — … (Gün a–b)`) and gate words (`değerlendirme`, `sözlü savunma`, `Tekrar…`). Keep those patterns when editing the roadmap.
