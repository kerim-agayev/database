/** Structured lesson content. Presentation lives in components/lesson-view.tsx. */

export interface Reference {
  title: string;
  /** Publisher or author. */
  by: string;
  url?: string;
  /** Date the source was opened (ISO), for web sources. */
  accessed?: string;
  /** What we used it for, in a few words. */
  note?: string;
}

export interface Question {
  id: string;
  prompt: string;
  options: string[];
  /** Index into options. */
  answer: number;
  explanation: string;
}

export interface CodeBlock {
  label: string;
  language: "sql" | "bash" | "text";
  text: string;
}

export interface Lesson {
  day: number;
  title: string;
  goals: string[];
  /** 2–4 sentences connecting to the previous day. */
  recap: string;
  concept: { heading: string; paragraphs: string[] }[];
  /** Which interactive visual to show (see components/lesson-view.tsx). */
  visual?: "query-path";
  workedExample: { title: string; steps: string[]; code?: CodeBlock };
  challenge: {
    task: string;
    predictFirst: string;
    hints: string[];
    expectedOutput: string;
    code?: CodeBlock;
  };
  knowledgeCheck: Question[];
  references: Reference[];
  reflection: string;
}
