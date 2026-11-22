# Course Map — Fundamentals of Database Engineering (Hussein Nasser, Udemy)

Status: **draft v0.1** (2026-11-11). This mapping is a proposal and is not locked yet. It becomes final once ROADMAP.md is approved.

> **Course not purchased (2026-11-11).** This file is used as a **topic checklist**, not as a viewing schedule. Every topic is taught in the track with original explanations, the local PostgreSQL lab, the books and free sources. If the course is bought later, the week column shows where each lecture fits.

## What is verified and what is assumed

- **Verified (from the learner):** the course curriculum as pasted from Udemy on 2026-11-11: 18 sections, 167 lectures, 30h 59m. The parsed list below has 167 lectures plus 2 quizzes, and its durations add up to exactly 30h 59m.
- **Assumed:** section names. The pasted list had no section headers, so groups S0–S17 are inferred from lecture order and titles.
- **Assumed:** lecture content. Every priority and week assignment is based on titles only. No lecture has been watched yet. We correct the map whenever a lecture turns out different from its title.

## Observations about the course

1. **Mostly Postgres, with MySQL/InnoDB for comparison.** The hands-on demos use Docker + Postgres. That fits a PostgreSQL local lab well. The track still has to identify the learner's real engine first. If it is MySQL, the InnoDB lectures (locking, clustered index) move from Recommended to Core.
2. **The course order is not the track order.** Nasser starts with ACID. This track first covers data modeling, then indexes, storage, and only then concurrency. We watch the ACID basics (atomicity, consistency, durability) in Week 3 as a preview. Isolation and its anomalies come in Weeks 7–8, together with DDIA Ch 7.
3. **The best material sits in S15 (Q&A) and S16 (Discussions).** Lectures such as "Why does an update in Postgres touch all indexes?", "WAL, Redo and Undo logs" and "Postgres Architecture" are deep internals content. They are spread across the weeks where each one belongs.
4. **The archived lectures (S17) are older versions** of the ACID lectures. Skip them.
5. **"Postgres Locks - A Deep Dive" shows 0:03,** so it is probably a link or article rather than a video. Check it when we get there.
6. **The two Memcached lectures (14m and 1h 05m) probably overlap.** Watch the short one, and the long one only if you are curious.
7. **Things the course covers lightly or not at all,** filled in from books and docs: crash recovery/ARIES in depth (Petrov Ch 5), LSM compaction (Petrov Ch 7, DDIA Ch 3), write skew and serializability theory (DDIA Ch 7), consensus (DDIA Ch 9, Petrov Ch 14), backup/PITR/restore drills (DRE Ch 7), schema migrations in deployment pipelines (DRE Ch 8), observability and SLOs (DRE Ch 2, 4), performance methodology (Gregg Ch 2, 12).

## Priority meaning

- **Core:** required. The day's self-check covers it.
- **Recommended:** watch if the week has room. It deepens a core idea.
- **Optional:** deep dive or side topic. Not on any assessment.
- **Skip:** redundant (archived versions).

## Workload check

The track budget is about 6–8 h per week. Video should take at most about 40% of that, leaving the rest for reading, labs and retrieval practice.

- **Week 4 is overloaded** (about 5h of video). Proposed fix: watch the Recommended items in Week 4 at 1.25×, or move them into the Day 30 review. "How Shopify Switched from UUID as Primary Key" can also go to Week 5 if needed.
- **Week 11 is heavy only because of Recommended hands-on demos** (shard writing/reading, replication demo). Run them as labs in place of separate reading time.
- **Weeks 9–10 and 13 are light on video** on purpose. That time goes to performance experiments (Gregg) and the capstone.

## How each lecture is taught (step-by-step protocol)

1. **Predict:** before the video, 1–2 questions ("Which index will the planner choose here, and why?").
2. **Watch:** the assigned lecture(s), at most about 45 min of video per day.
3. **Retrieve:** explain it back in 3–5 sentences without notes. Claude checks and fixes gaps.
4. **Reproduce:** if the lecture has a demo, rerun it in the local lab with synthetic restaurant data. Record commands and results in `docs/experiments/`.
5. **Connect:** link it to the matching book chapter, add new terms to `DATABASE_GLOSSARY.md`, and note engine-specific vs portable behavior.
6. **Record:** tick the lecture below only after step 3 is done. Evidence goes to `LEARNING_PROGRESS.md`.

## Summary

Parsed items: **169** (lectures + 2 quizzes) in **18** groups. Sum of listed durations: **30h 59m**.

| Priority | Items | Video time |
|---|---|---|
| Core | 105 | 16h 43m |
| Recommended | 31 | 7h 21m |
| Optional | 26 | 6h 03m |
| Skip | 7 | 52m |

### Video load per roadmap week

| Week | Core | Recommended | Core + Rec |
|---|---|---|---|
| 1 | 43m | 23m | 1h 07m |
| 2 | 0m | 43m | 43m |
| 3 | 52m | 0m | 52m |
| 4 | 4h 04m | 58m | 5h 03m |
| 5 | 2h 17m | 13m | 2h 31m |
| 6 | 1h 20m | 0m | 1h 20m |
| 7 | 1h 58m | 0m | 1h 58m |
| 8 | 2h 09m | 40m | 2h 50m |
| 9 | 33m | 20m | 53m |
| 10 | 0m | 14m | 14m |
| 11 | 1h 28m | 2h 14m | 3h 42m |
| 12 | 1h 14m | 6m | 1h 21m |
| 13 | 0m | 1h 25m | 1h 25m |

## Lecture-by-lecture map

### S0 — Welcome & course notes (6 items, 25m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 1 | Welcome to the Course | 6:36 | Core | 1 | ☐ |
| 2 | Course Note 1 | 0:37 | Recommended | 1 | ☐ |
| 3 | Course Note 2 | 7:36 | Recommended | 1 | ☐ |
| 4 | Course Note 3 | 9:24 | Recommended | 1 | ☐ |
| 5 | Note about Docker | 0:44 | Core | 1 | ☐ |
| 6 | Slides | 0:04 | Recommended | 1 | ☐ |

### S1 — ACID (11 items, 2h 15m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 7 | Introduction to ACID | 3:54 | Core | 3 | ☐ |
| 8 | What is a Transaction? | 13:34 | Core | 3 | ☐ |
| 9 | Atomicity | 9:57 | Core | 3 | ☐ |
| 10 | Isolation | 31:53 | Core | 7 | ☐ |
| 11 | Consistency | 12:41 | Core | 3 | ☐ |
| 12 | Durability | 12:12 | Core | 3 | ☐ |
| 13 | ACID by Practical Examples | 21:21 | Core | 7 | ☐ |
| 14 | Phantom Reads | 7:35 | Core | 7 | ☐ |
| 15 | Serializable vs Repeatable Read | 8:17 | Core | 7 | ☐ |
| 16 | Eventual Consistency | 14:33 | Recommended | 11 | ☐ |
| 17 | ACID Quiz | quiz | Core | 7 | ☐ |

### S2 — Understanding database internals (4 items, 1h 11m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 18 | How tables and indexes are stored on disk (MUST WATCH before continue) | 21:03 | Core | 1 | ☐ |
| 19 | Row-Based vs Column-Based Databases | 34:15 | Core | 5 | ☐ |
| 20 | Primary Key vs Secondary Key - What you probably didn't know | 10:56 | Core | 4 | ☐ |
| 21 | Databases Pages (Article) | 5:30 | Core | 1 | ☐ |

### S3 — Database indexing (15 items, 2h 24m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 22 | Create Postgres Table with a million Rows (from scratch) | 4:22 | Core | 4 | ☐ |
| 23 | Getting Started with Indexing | 18:18 | Core | 4 | ☐ |
| 24 | Understanding The SQL Query Planner and Optimizer with Explain | 10:16 | Core | 4 | ☐ |
| 25 | Bitmap Index Scan vs Index Scan vs Table Scan | 11:24 | Core | 4 | ☐ |
| 26 | Key vs Non-Key Column Database Indexing | 17:02 | Core | 4 | ☐ |
| 27 | Index Scan vs Index Only Scan | 8:08 | Core | 4 | ☐ |
| 28 | Combining Database Indexes for Better Performance | 14:07 | Core | 4 | ☐ |
| 29 | How Database Optimizers Decide to Use Indexes | 11:19 | Core | 4 | ☐ |
| 30 | Create Index Concurrently - Avoid Blocking Production Database Writes | 3:10 | Core | 4 | ☐ |
| 31 | Bloom Filters | 9:18 | Core | 6 | ☐ |
| 32 | Working with Billion-Row Table | 13:08 | Recommended | 4 | ☐ |
| 33 | How UUIDs in B+Tree Indexes can affect performance | 18:50 | Core | 4 | ☐ |
| 34 | Article - The Cost of Long running Transactions | 1:40 | Core | 8 | ☐ |
| 35 | Article - Microsoft SQL Server Clustered Index Design | 3:18 | Optional | 4 | ☐ |
| 36 | Indexing Quiz | quiz | Core | 4 | ☐ |

### S4 — B-Tree vs B+Tree in production database systems (9 items, 42m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 37 | B-Tree Section's Introduction & Agenda | 3:34 | Core | 4 | ☐ |
| 38 | Full Table Scans | 3:27 | Core | 4 | ☐ |
| 39 | Original B-Tree | 4:46 | Core | 4 | ☐ |
| 40 | How the Original B-Tree Helps Performance | 7:56 | Core | 4 | ☐ |
| 41 | Original B-Tree Limitations | 6:31 | Core | 4 | ☐ |
| 42 | B+Tree | 6:17 | Core | 4 | ☐ |
| 43 | B+Tree DBMS Considerations | 4:27 | Core | 4 | ☐ |
| 44 | B+Tree Storage Cost in MySQL vs Postgres | 4:45 | Core | 4 | ☐ |
| 45 | B-Tree Section's Summary | 1:07 | Core | 4 | ☐ |

### S5 — Database partitioning (14 items, 49m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 46 | Introduction to Database Partitioning | 1:26 | Core | 11 | ☐ |
| 47 | What is Partitioning? | 3:28 | Core | 11 | ☐ |
| 48 | Vertical vs Horizontal Partitioning | 2:07 | Core | 11 | ☐ |
| 49 | Partitioning Types | 1:32 | Core | 11 | ☐ |
| 50 | The Difference Between Partitioning and Sharding | 2:43 | Core | 11 | ☐ |
| 51 | Preparing: Postgres, Database, Table, Indexes | 5:22 | Core | 11 | ☐ |
| 52 | Execute Multiple Queries on the Table | 1:18 | Core | 11 | ☐ |
| 53 | Create and Attach Partitioned Tables | 3:46 | Core | 11 | ☐ |
| 54 | Populate the Partitions and Create Indexes | 3:59 | Core | 11 | ☐ |
| 55 | Class Project - Querying and Checking the Size of Partitions | 5:32 | Core | 11 | ☐ |
| 56 | The Advantages of Partitioning | 4:41 | Core | 11 | ☐ |
| 57 | The Disadvantages of Partitioning | 2:48 | Core | 11 | ☐ |
| 58 | Section Summary - Partitioning | 1:10 | Core | 11 | ☐ |
| 59 | How to Automate Partitioning in Postgres | 10:06 | Recommended | 11 | ☐ |

### S6 — Database sharding (12 items, 1h 16m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 60 | Introduction to Database Sharding | 1:06 | Core | 11 | ☐ |
| 61 | What is Database Sharding? | 3:31 | Core | 11 | ☐ |
| 62 | Consistent Hashing | 2:41 | Core | 11 | ☐ |
| 63 | Horizontal partitioning vs Sharding | 1:08 | Core | 11 | ☐ |
| 64 | Sharding with Postgres | 1:05 | Core | 11 | ☐ |
| 65 | Spin up Docker Postgres Shards | 7:23 | Recommended | 11 | ☐ |
| 66 | Writing to a Shard | 21:58 | Recommended | 11 | ☐ |
| 67 | Reading from a Shard | 11:19 | Recommended | 11 | ☐ |
| 68 | Advantages of Database Sharding | 1:59 | Core | 11 | ☐ |
| 69 | Disadvantages of Database Sharding | 3:33 | Core | 11 | ☐ |
| 70 | Database Sharding Section Summary | 0:45 | Core | 11 | ☐ |
| 71 | When Should you consider Sharding your Database? | 20:06 | Core | 11 | ☐ |

### S7 — Concurrency control (+ pagination, pooling) (7 items, 1h 15m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 72 | Shared vs Exclusive Locks | 11:04 | Core | 8 | ☐ |
| 73 | Dead Locks | 5:31 | Core | 8 | ☐ |
| 74 | Two-phase Locking | 7:08 | Core | 8 | ☐ |
| 75 | Solving the Double Booking Problem (Code Example) | 13:42 | Core | 8 | ☐ |
| 76 | Double Booking Problem Part 2 ( Alternative Solution and explination) | 17:49 | Core | 8 | ☐ |
| 77 | SQL Pagination With Offset is Very Slow | 9:09 | Core | 4 | ☐ |
| 78 | Database Connection Pooling | 10:50 | Core | 9 | ☐ |

### S8 — Database replication (6 items, 32m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 79 | Introduction to Database Replication | 1:19 | Core | 11 | ☐ |
| 80 | Master/Standby Replication | 3:45 | Core | 11 | ☐ |
| 81 | Multi-master Replication | 1:23 | Core | 11 | ☐ |
| 82 | Synchronous vs Asynchronous Replication | 3:06 | Core | 11 | ☐ |
| 83 | Replication Demo with Postgres | 19:20 | Recommended | 11 | ☐ |
| 84 | Pros and Cons of Replication | 3:28 | Core | 11 | ☐ |

### S9 — Database system design (2 items, 1h 49m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 85 | Twitter System Design Database Design | 71:56 | Optional | 13 | ☐ |
| 86 | Building a Short URL System Database Backend | 37:50 | Recommended | 13 | ☐ |

### S10 — Database engines (12 items, 1h 03m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 87 | Database Engines Introduction | 2:44 | Core | 1 | ☐ |
| 88 | What is a Database Engine? | 6:41 | Core | 1 | ☐ |
| 89 | XtraDB | 2:05 | Optional | 5 | ☐ |
| 90 | SQLite | 3:44 | Recommended | 1 | ☐ |
| 91 | Aria | 2:27 | Optional | 5 | ☐ |
| 92 | BerkeleyDB | 2:40 | Optional | 5 | ☐ |
| 93 | LevelDB | 6:20 | Core | 6 | ☐ |
| 94 | RocksDB | 4:05 | Core | 6 | ☐ |
| 95 | Popular Database Engines | 2:31 | Recommended | 1 | ☐ |
| 96 | MyISAM | 6:49 | Recommended | 5 | ☐ |
| 97 | InnoDB | 6:45 | Core | 5 | ☐ |
| 98 | Switching Database Engines with mySQL | 17:08 | Optional | 5 | ☐ |

### S11 — Database cursors (6 items, 29m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 99 | What are Database Cursors? | 9:31 | Core | 9 | ☐ |
| 100 | Server Side vs Client Side Database Cursors | 1:44 | Core | 9 | ☐ |
| 101 | Inserting Million Rows with Python in Postgres using Client Side Cursor | 3:29 | Recommended | 9 | ☐ |
| 102 | Querying with Server Side Cursor | 1:24 | Recommended | 9 | ☐ |
| 103 | Pros and Cons of Server vs Client Side Cursors | 4:38 | Core | 9 | ☐ |
| 104 | Article - Server Side Cursor Types in SQL Server | 8:17 | Optional | 9 | ☐ |

### S12 — SQL vs NoSQL architecture (8 items, 3h 48m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 105 | SQL vs NoSQL and how MongoDB Revolutionized NoSQL | 43:24 | Recommended | 2 | ☐ |
| 106 | MongoDB Internals | 7:00 | Optional | 6 | ☐ |
| 107 | MongoDB Clustered Collections | 26:13 | Optional | 6 | ☐ |
| 108 | Querying with Client Side Cursor | 4:42 | Recommended | 9 | ☐ |
| 109 | MemCached In-Memory database Architecture | 14:40 | Recommended | 10 | ☐ |
| 110 | Memcached NoSQL Architecture | 64:50 | Optional | 10 | ☐ |
| 111 | NOSQL Redis Internals | 50:00 | Optional | 10 | ☐ |
| 112 | CAP Theorem Explained | 17:32 | Core | 12 | ☐ |

### S13 — Database security & protocols (6 items, 1h 30m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 113 | How to Secure Your Postgres Database by Enabling TLS/SSL | 12:01 | Core | 12 | ☐ |
| 114 | Deep Look into Postgres Wire Protocol with Wireshark | 14:07 | Optional | 9 | ☐ |
| 115 | Deep Look Into MongoDB Wire Protocol with Wireshark | 24:04 | Optional | 9 | ☐ |
| 116 | What is the Largest SQL Statement that You can Send to Your Database | 9:43 | Optional | 9 | ☐ |
| 117 | Best Practices Working with REST & Databases | 6:53 | Recommended | 12 | ☐ |
| 118 | Database Permissions and Best Practices for Building REST API | 23:40 | Core | 12 | ☐ |

### S14 — Homomorphic encryption (9 items, 22m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 119 | Introduction to Homomorphic Encryption | 1:52 | Optional | 12 | ☐ |
| 120 | What is Encryption? | 1:29 | Optional | 12 | ☐ |
| 121 | Why Can't we always Encrypt? | 4:32 | Optional | 12 | ☐ |
| 122 | What is Homomorphic Encryption | 5:00 | Optional | 12 | ☐ |
| 123 | Homomorphic Encryption Demo | 0:35 | Optional | 12 | ☐ |
| 124 | Clone and Build the Code | 2:35 | Optional | 12 | ☐ |
| 125 | Going Through the Code and the Database | 1:05 | Optional | 12 | ☐ |
| 126 | Searching The Encrypted Database | 3:10 | Optional | 12 | ☐ |
| 127 | Is Homomorphic Encryption Ready? | 2:30 | Optional | 12 | ☐ |

### S15 — Answering your questions (Q&A) (20 items, 4h 27m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 128 | Heap Index scan instead of Index only scan why? | 12:54 | Core | 8 | ☐ |
| 129 | What is the unit of the Cost in Postgres Planner? | 6:15 | Core | 4 | ☐ |
| 130 | All Isolation Levels - Explained Details | 26:07 | Core | 7 | ☐ |
| 131 | Snapshot and Repeatable Read Isolation difference? | 7:55 | Core | 7 | ☐ |
| 132 | I have an Index why is the database doing a full table scan? | 7:37 | Core | 4 | ☐ |
| 133 | Why Databases Read Pages instead of Rows? | 11:02 | Core | 5 | ☐ |
| 134 | How does Indexing a column with duplicate values work? | 10:53 | Recommended | 4 | ☐ |
| 135 | Should I drop unused indexes? | 8:45 | Recommended | 4 | ☐ |
| 136 | Why use serializable Isolation Level when we have SELECT FOR UPDATE? | 6:59 | Core | 8 | ☐ |
| 137 | Can I use the same database connection for multiple clients? | 7:00 | Core | 9 | ☐ |
| 138 | Do I need a transaction if I'm only reading? | 15:47 | Core | 7 | ☐ |
| 139 | Why does an update in Postgres touches all indexes? | 23:49 | Core | 8 | ☐ |
| 140 | What is the value of bitmap index scan? | 25:45 | Recommended | 4 | ☐ |
| 141 | What does Explain Analyze actually do? | 19:37 | Core | 4 | ☐ |
| 142 | Postgres vs MySQL (The fundamental differences) | 8:12 | Core | 5 | ☐ |
| 143 | Does Create Index block writes and Why? | 11:15 | Core | 8 | ☐ |
| 144 | Postgres Process Architecture | 12:05 | Core | 5 | ☐ |
| 145 | Index Scan vs Index Seek | 3:05 | Optional | 4 | ☐ |
| 146 | SELECT COUNT (*) can impact your Backend Application performance, here is why | 10:36 | Recommended | 9 | ☐ |
| 147 | How Shopify Switched from UUID as Primary Key | 31:22 | Core | 4 | ☐ |

### S16 — Database discussions (deep dives) (15 items, 5h 42m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 148 | How does the Database Store Data On Disk? | 18:55 | Core | 5 | ☐ |
| 149 | Postgres Architecture | 33:15 | Core | 5 | ☐ |
| 150 | Is QUIC a Good Protocol for Databases? | 12:15 | Optional | 9 | ☐ |
| 151 | What is a Distributed Transaction? | 21:28 | Core | 12 | ☐ |
| 152 | Hash Tables and Consistent Hashing | 49:22 | Recommended | 11 | ☐ |
| 153 | Indexing in PostgreSQL vs MySQL | 13:01 | Core | 5 | ☐ |
| 154 | Why Uber Moved from Postgres to MySQL (Discussion) | 47:13 | Recommended | 13 | ☐ |
| 155 | Can NULLs Improve your Database Queries Performance? | 21:12 | Optional | 4 | ☐ |
| 156 | Write Amplification Explained in Backend Apps, Database Systems and SSDs | 21:15 | Core | 6 | ☐ |
| 157 | WAL, Redo and Undo logs | 39:10 | Core | 6 | ☐ |
| 158 | Optimistic vs Pessmistic Concurrency Control | 17:36 | Core | 8 | ☐ |
| 159 | Avoid SELECT *, even on a single-column tables | 4:10 | Recommended | 5 | ☐ |
| 160 | Postgres Locks - A Deep Dive | 0:03 | Recommended | 8 | ☐ |
| 161 | How Slow is select * in row store | 2:55 | Recommended | 5 | ☐ |
| 162 | MySQL InnoDB Advanced Locking Techniques | 40:33 | Recommended | 8 | ☐ |

### S17 — Archived (older versions of ACID lectures) (7 items, 52m)

| # | Lecture | Length | Priority | Week | Done |
|---|---|---|---|---|---|
| 163 | Introduction to ACID (Archived) | 1:39 | Skip | - | ☐ |
| 164 | What is a Transaction? (Archived) | 2:31 | Skip | - | ☐ |
| 165 | Atomicity (Archived 2022) | 2:39 | Skip | - | ☐ |
| 166 | Isolation (Archived 2022) | 20:35 | Skip | - | ☐ |
| 167 | Consistency (Archived 2022) | 13:06 | Skip | - | ☐ |
| 168 | Durability (Archived 2022) | 1:44 | Skip | - | ☐ |
| 169 | Atomicity (Archived 2024) | 9:57 | Skip | - | ☐ |

