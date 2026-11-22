export const TOTAL_DAYS = 90;

/**
 * Parses the `[day]` URL segment. Only canonical integers 1–90 are valid:
 * "7" is valid; "07", "0", "91", "abc", "1.5" and "" are not.
 * Kept in its own tiny file so proxy.ts can use it without bundling the roadmap data.
 */
export function parseDay(raw: string): number | null {
  if (!/^[1-9]\d?$/.test(raw)) return null;
  const n = Number(raw);
  return n >= 1 && n <= TOTAL_DAYS ? n : null;
}
