import { describe, expect, it } from "vitest";
import { getLesson, hasLesson } from "./index";
import { getDay } from "@/lib/days";

const writtenDays = [1, 2];

describe("written lessons", () => {
  it.each(writtenDays)("day %i exists and matches its roadmap entry", (n) => {
    expect(hasLesson(n)).toBe(true);
    const lesson = getLesson(n);
    expect(lesson?.day).toBe(n);
    expect(getDay(n)).toBeDefined();
  });

  it("reports days without a lesson as planned", () => {
    expect(hasLesson(3)).toBe(false);
    expect(getLesson(90)).toBeUndefined();
  });

  it.each(writtenDays)("day %i has every required part", (n) => {
    const l = getLesson(n)!;
    expect(l.goals.length).toBeGreaterThan(0);
    expect(l.recap.length).toBeGreaterThan(20);
    expect(l.concept.length).toBeGreaterThan(0);
    expect(l.workedExample.steps.length).toBeGreaterThan(0);
    expect(l.challenge.predictFirst.length).toBeGreaterThan(10);
    expect(l.challenge.hints.length).toBeGreaterThanOrEqual(2);
    expect(l.challenge.expectedOutput.length).toBeGreaterThan(10);
    expect(l.knowledgeCheck.length).toBeGreaterThanOrEqual(3);
    expect(l.references.length).toBeGreaterThan(0);
    expect(l.reflection.length).toBeGreaterThan(10);
  });

  it.each(writtenDays)("day %i quiz answers point at real options and ids are unique", (n) => {
    const qs = getLesson(n)!.knowledgeCheck;
    const ids = qs.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of qs) {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
      expect(q.explanation.length).toBeGreaterThan(10);
    }
  });

  it.each(writtenDays)("day %i web references carry a URL and an access date", (n) => {
    for (const r of getLesson(n)!.references) {
      if (r.url) {
        expect(r.url).toMatch(/^https:\/\//);
        expect(r.accessed, `${r.title} needs an access date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });
});
