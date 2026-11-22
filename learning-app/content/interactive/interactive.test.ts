import { describe, expect, it } from "vitest";
import { getInteractive, registeredInteractiveDays } from "./index";
import { INTERACTIVE_DAYS } from "@/lib/interactive-days";
import { hasLesson } from "@/content/lessons";

describe("interactive pages", () => {
  it("the proxy list and the content registry name the same days", () => {
    expect(registeredInteractiveDays()).toEqual([...INTERACTIVE_DAYS]);
  });

  it.each([...INTERACTIVE_DAYS])("day %i: every activity is well-formed", (day) => {
    const page = getInteractive(day)!;
    expect(page.day).toBe(day);
    expect(hasLesson(day)).toBe(true);
    expect(page.activities.length).toBeGreaterThanOrEqual(2);
    expect(page.closing.length).toBeGreaterThan(20);

    const ids = page.activities.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const a of page.activities) {
      expect(a.purpose.length, `${a.id} needs a purpose`).toBeGreaterThan(20);
      if (a.kind === "sort") {
        const bucketIds = new Set(a.buckets.map((b) => b.id));
        for (const item of a.items) expect(bucketIds.has(item.bucket), `${a.id}/${item.id}`).toBe(true);
        expect(new Set(a.items.map((i) => i.id)).size).toBe(a.items.length);
        // Every box receives at least one card, so no box is a trick.
        for (const b of a.buckets) expect(a.items.some((i) => i.bucket === b.id), `${a.id}/${b.id}`).toBe(true);
      }
      if (a.kind === "sequence") {
        const correct = a.items.map((i) => i.id);
        expect([...a.startOrder].sort()).toEqual([...correct].sort());
        expect(a.startOrder).not.toEqual(correct);
      }
    }
  });
});
