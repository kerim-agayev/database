import roadmapData from "@/content/roadmap.json";
import progressData from "@/content/progress.json";
import { TOTAL_DAYS, parseDay } from "./parse-day";

export { TOTAL_DAYS, parseDay };

export type DayKind = "lesson" | "review" | "gate";

export interface RoadmapDay {
  day: number;
  week: number;
  kind: DayKind;
  objective: string;
  source: string;
  handsOn: string;
  selfCheck: string;
}

export interface RoadmapWeek {
  week: number;
  title: string;
  firstDay: number;
  lastDay: number;
}

export const weeks = roadmapData.weeks as RoadmapWeek[];
export const days = roadmapData.days as RoadmapDay[];

const completed = new Set<number>(progressData.completed);

export function getDay(n: number): RoadmapDay | undefined {
  return days[n - 1];
}

export function getAdjacent(n: number): { prev: number | null; next: number | null } {
  return { prev: n > 1 ? n - 1 : null, next: n < TOTAL_DAYS ? n + 1 : null };
}

/** A day is completed only if LEARNING_PROGRESS.md marks it ☑ (see scripts/sync-content.mjs). */
export function isCompleted(n: number): boolean {
  return completed.has(n);
}

export function completedCount(): number {
  return completed.size;
}

export function nextUnfinishedDay(): number | null {
  for (let n = 1; n <= TOTAL_DAYS; n++) if (!completed.has(n)) return n;
  return null;
}

export function getWeek(weekNumber: number): RoadmapWeek | undefined {
  return weeks.find((w) => w.week === weekNumber);
}

export function daysInWeek(weekNumber: number): RoadmapDay[] {
  return days.filter((d) => d.week === weekNumber);
}

export function dayParams(): { day: string }[] {
  return days.map((d) => ({ day: String(d.day) }));
}
