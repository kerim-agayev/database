import type { InteractiveDay } from "./types";
import { interactive01 } from "./day-01";
import { interactive02 } from "./day-02";

const pages: Record<number, InteractiveDay> = {
  1: interactive01,
  2: interactive02,
};

export function getInteractive(day: number): InteractiveDay | undefined {
  return pages[day];
}

export function registeredInteractiveDays(): number[] {
  return Object.keys(pages)
    .map(Number)
    .sort((a, b) => a - b);
}
