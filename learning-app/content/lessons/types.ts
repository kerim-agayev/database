/**
 * Structured lesson content. Presentation lives in components/lesson-view.tsx.
 * Teaching rules behind these fields: see ../../TEACHING_METHOD.md (repo root).
 */

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
  /** Retrieval practice at the start: questions about earlier days, answers hidden. */
  recall?: { question: string; answer: string }[];
  /** Everyday analogy shown BEFORE any jargon (restaurant world). */
  analogy: { intro: string; rows: { term: string; analogy: string }[] };
  /** The only new words of the day. Rule: at most 5 (TEACHING_METHOD.md). */
  newTerms: { term: string; plain: string }[];
  concept: { heading: string; paragraphs: string[] }[];
  /** Which interactive visual to show inside the lesson (see components/lesson-view.tsx). */
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
  /** Feynman closing: explain it simply in your own words, find the gaps. */
  feynman: string;
  references: Reference[];
  reflection: string;
}
