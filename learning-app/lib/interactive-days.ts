/**
 * Days that have a /tutorial/[day]/interactive page. Kept tiny (no content imports)
 * so proxy.ts can use it. content/interactive/index.ts must register exactly these days
 * (checked by a test).
 */
export const INTERACTIVE_DAYS: readonly number[] = [1, 2];

export function hasInteractive(day: number): boolean {
  return INTERACTIVE_DAYS.includes(day);
}
