import type { Lesson } from "./types";
import { day01 } from "./day-01";
import { day02 } from "./day-02";

/** Days that have a written lesson. All other days show their roadmap entry only. */
const lessons: Record<number, Lesson> = {
  1: day01,
  2: day02,
};

export function getLesson(day: number): Lesson | undefined {
  return lessons[day];
}

export function hasLesson(day: number): boolean {
  return day in lessons;
}
