"use client";

import { useState } from "react";
import type { Question } from "@/content/lessons/types";

/**
 * Retrieval practice. Pick an answer, press "Cevabı kontrol et".
 * A wrong answer does not reveal the right one: think and try again.
 * A right answer shows the explanation.
 */
export function KnowledgeCheck({ questions }: { questions: Question[] }) {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => {
        const choice = selected[q.id];
        const isChecked = checked[q.id] === true;
        const isCorrect = isChecked && choice === q.answer;
        return (
          <fieldset
            key={q.id}
            className="rounded-lg border border-zinc-300 p-4 dark:border-zinc-700"
          >
            <legend className="px-1 font-medium">
              {qi + 1}. {q.prompt}
            </legend>
            <div className="mt-2 space-y-2">
              {q.options.map((option, oi) => (
                <label key={oi} className="flex cursor-pointer items-start gap-2">
                  <input
                    type="radio"
                    name={q.id}
                    value={oi}
                    checked={choice === oi}
                    onChange={() => {
                      setSelected((s) => ({ ...s, [q.id]: oi }));
                      setChecked((c) => ({ ...c, [q.id]: false }));
                    }}
                    className="mt-1"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              disabled={choice === undefined}
              onClick={() => setChecked((c) => ({ ...c, [q.id]: true }))}
              className="mt-3 rounded-md border border-zinc-400 px-3 py-1.5 text-sm disabled:opacity-50"
            >
              Cevabı kontrol et
            </button>
            <p role="status" className="mt-2 text-sm">
              {isChecked
                ? isCorrect
                  ? `Doğru. ${q.explanation}`
                  : "Tam değil. Biraz düşün ve başka bir seçenek dene."
                : ""}
            </p>
          </fieldset>
        );
      })}
    </div>
  );
}
