/**
 * Data for the /tutorial/[day]/interactive pages. Every activity states its purpose
 * (TEACHING_METHOD.md: no decoration). Simulations also state what they model and simplify.
 */

/** Drag cards into boxes (also works by tapping: card first, then "kutusuna koy"). */
export interface SortActivity {
  kind: "sort";
  id: string;
  title: string;
  purpose: string;
  instructions: string;
  buckets: { id: string; label: string; detail?: string }[];
  /** Listed in the order they appear in the pool (pre-mixed, deterministic). */
  items: { id: string; label: string; bucket: string }[];
  success: string;
}

/** Put cards in the right order (drag, or ↑/↓ buttons). */
export interface SequenceActivity {
  kind: "sequence";
  id: string;
  title: string;
  purpose: string;
  instructions: string;
  /** The CORRECT order. */
  items: { id: string; label: string; detail: string }[];
  /** Starting (mixed) order of item ids. Must not already be correct. */
  startOrder: string[];
  success: string;
}

/** A purpose-built simulation component. */
export interface WidgetActivity {
  kind: "widget";
  id: string;
  title: string;
  purpose: string;
  widget: "kitchen-journey" | "waiter-sim";
}

export type Activity = SortActivity | SequenceActivity | WidgetActivity;

export interface InteractiveDay {
  day: number;
  title: string;
  intro: string;
  activities: Activity[];
  /** Feynman-style closing for the page. */
  closing: string;
}
