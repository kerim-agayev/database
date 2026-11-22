// Builds content/roadmap.json and content/progress.json from the repo-level
// ROADMAP.md and LEARNING_PROGRESS.md, so the plan has ONE source of truth.
// Run: npm run sync:content   (from learning-app/)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const out = join(here, "..", "content");
mkdirSync(out, { recursive: true });

const clean = (s) => s.replace(/\*\*/g, "").trim();

// ---- ROADMAP.md -> roadmap.json --------------------------------------------
const lines = readFileSync(join(root, "ROADMAP.md"), "utf8").split(/\r?\n/);
const weeks = [];
const days = [];
let week = null;

for (const line of lines) {
  const h = line.match(/^## Hafta (\d+) — (.+?) \(Gün (\d+)–(\d+)\)/);
  if (h) {
    week = { week: Number(h[1]), title: h[2], firstDay: Number(h[3]), lastDay: Number(h[4]) };
    weeks.push(week);
    continue;
  }
  // Any other "## " heading ends the current week's tables (e.g. "learning-app artışları").
  if (/^## /.test(line)) week = null;
  if (!week || !/^\| \d+ \|/.test(line)) continue;
  const cells = line.split("|").slice(1, -1).map((c) => c.trim());
  const day = Number(cells[0]);
  // Hafta 1–12: Gün | Hedef | Kaynak | Uygulama | Öz-kontrol. Hafta 13'te Kaynak sütunu yok.
  const hasSource = cells.length === 5;
  const objective = clean(cells[1]);
  days.push({
    day,
    week: week.week,
    kind: /değerlendirme|sözlü savunma/i.test(objective) ? "gate" : /^Tekrar/i.test(objective) ? "review" : "lesson",
    objective,
    source: hasSource ? clean(cells[2]) : "Capstone çalışması (tüm kaynaklar)",
    handsOn: clean(cells[hasSource ? 3 : 2]),
    selfCheck: clean(cells[hasSource ? 4 : 3]),
  });
}

days.sort((a, b) => a.day - b.day);
if (days.length !== 90 || days.some((d, i) => d.day !== i + 1)) {
  throw new Error(`Expected days 1..90 in order, got ${days.length} rows`);
}
if (weeks.length !== 13) throw new Error(`Expected 13 weeks, got ${weeks.length}`);
writeFileSync(join(out, "roadmap.json"), JSON.stringify({ weeks, days }, null, 2) + "\n");

// ---- LEARNING_PROGRESS.md -> progress.json ---------------------------------
// A day counts as completed ONLY if its row in the Day log says "☑".
const progress = readFileSync(join(root, "LEARNING_PROGRESS.md"), "utf8").split(/\r?\n/);
const completed = [];
for (const line of progress) {
  const m = line.match(/^\| (\d+) \| ☑/);
  if (m) completed.push(Number(m[1]));
}
writeFileSync(join(out, "progress.json"), JSON.stringify({ completed }, null, 2) + "\n");

console.log(`roadmap.json: ${days.length} days, ${weeks.length} weeks. progress.json: completed = [${completed.join(", ")}]`);
