import { describe, expect, it } from "vitest";
import {
  TOTAL_DAYS,
  completedCount,
  dayParams,
  days,
  daysInWeek,
  getAdjacent,
  getDay,
  isCompleted,
  nextUnfinishedDay,
  parseDay,
  weeks,
} from "./days";

describe("parseDay (URL validation for /tutorial/[day])", () => {
  it.each(["1", "2", "9", "10", "42", "89", "90"])("accepts %s", (raw) => {
    expect(parseDay(raw)).toBe(Number(raw));
  });

  it.each(["0", "91", "100", "-1", "07", "01", "1.5", "abc", "", " 3", "3 ", "1e1", "９"])(
    "rejects %j",
    (raw) => {
      expect(parseDay(raw)).toBeNull();
    },
  );
});

describe("roadmap data", () => {
  it("has exactly 90 days numbered 1..90 in order", () => {
    expect(days).toHaveLength(TOTAL_DAYS);
    days.forEach((d, i) => expect(d.day).toBe(i + 1));
  });

  it("gives every day an objective, source, hands-on task and self-check", () => {
    for (const d of days) {
      expect(d.objective.length, `day ${d.day} objective`).toBeGreaterThan(3);
      expect(d.source.length, `day ${d.day} source`).toBeGreaterThan(0);
      expect(d.handsOn.length, `day ${d.day} handsOn`).toBeGreaterThan(0);
      expect(d.selfCheck.length, `day ${d.day} selfCheck`).toBeGreaterThan(0);
    }
  });

  it("has 13 contiguous weeks covering every day exactly once", () => {
    expect(weeks).toHaveLength(13);
    let expectedFirst = 1;
    for (const w of weeks) {
      expect(w.firstDay).toBe(expectedFirst);
      expect(daysInWeek(w.week).map((d) => d.day)).toEqual(
        Array.from({ length: w.lastDay - w.firstDay + 1 }, (_, i) => w.firstDay + i),
      );
      expectedFirst = w.lastDay + 1;
    }
    expect(expectedFirst).toBe(TOTAL_DAYS + 1);
  });

  it("marks the three assessment gates", () => {
    const gates = days.filter((d) => d.kind === "gate").map((d) => d.day);
    expect(gates).toEqual(expect.arrayContaining([30, 60, 90]));
  });

  it("generates static params for all 90 days as strings", () => {
    const params = dayParams();
    expect(params).toHaveLength(90);
    expect(params[0]).toEqual({ day: "1" });
    expect(params[89]).toEqual({ day: "90" });
  });
});

describe("navigation", () => {
  it("has no previous on day 1 and no next on day 90", () => {
    expect(getAdjacent(1)).toEqual({ prev: null, next: 2 });
    expect(getAdjacent(90)).toEqual({ prev: 89, next: null });
  });

  it("links neighbours in the middle", () => {
    expect(getAdjacent(45)).toEqual({ prev: 44, next: 46 });
  });

  it("looks days up by number", () => {
    expect(getDay(2)?.objective).toMatch(/storage engine/);
    expect(getDay(91)).toBeUndefined();
  });
});

describe("progress", () => {
  it("counts only days that LEARNING_PROGRESS.md marks complete", () => {
    expect(isCompleted(1)).toBe(true);
    expect(isCompleted(90)).toBe(false);
    expect(completedCount()).toBeGreaterThanOrEqual(1);
  });

  it("points at the first unfinished day", () => {
    const next = nextUnfinishedDay();
    expect(next).not.toBeNull();
    expect(isCompleted(next as number)).toBe(false);
  });
});
