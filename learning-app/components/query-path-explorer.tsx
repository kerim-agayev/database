"use client";

import { useState } from "react";
import { queryPathModel, queryPathSteps } from "@/content/visuals/query-path";

/**
 * Step-through explorer. Works with buttons (keyboard and touch friendly),
 * has no animation, and repeats everything as plain text below for readers
 * who cannot or do not want to use the widget.
 */
export function QueryPathExplorer() {
  const [index, setIndex] = useState(0);
  const step = queryPathSteps[index];
  const last = queryPathSteps.length - 1;

  return (
    <section
      aria-labelledby="qpe-title"
      className="my-6 rounded-lg border border-zinc-300 p-4 dark:border-zinc-700"
    >
      <h3 id="qpe-title" className="text-lg font-semibold">
        Etkileşimli: bir sorgunun yolu
      </h3>

      <p className="mt-2 text-sm">
        <strong>Neyi modeller:</strong> {queryPathModel.models}
      </p>
      <p className="mt-1 text-sm">
        <strong>Neyi basitleştirir:</strong> {queryPathModel.simplifies}
      </p>

      <ol aria-label="Bir sorgunun aşamaları" className="mt-4 flex flex-wrap gap-2">
        {queryPathSteps.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              aria-current={i === index ? "step" : undefined}
              onClick={() => setIndex(i)}
              className={`rounded-md border px-3 py-1.5 text-sm transition-colors motion-reduce:transition-none ${
                i === index
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {i + 1}. {s.name}
            </button>
          </li>
        ))}
      </ol>

      <div
        aria-live="polite"
        data-testid="qpe-detail"
        className="mt-4 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800"
      >
        <p className="text-xs font-medium uppercase tracking-wide">
          Aşama {index + 1} / {queryPathSteps.length} · Katman: {step.layer}
        </p>
        <h4 className="mt-1 text-base font-semibold">{step.name}</h4>
        <p className="mt-1">{step.what}</p>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-md border border-zinc-400 px-3 py-1.5 text-sm disabled:opacity-50"
        >
          Önceki aşama
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(last, i + 1))}
          disabled={index === last}
          className="rounded-md border border-zinc-400 px-3 py-1.5 text-sm disabled:opacity-50"
        >
          Sonraki aşama
        </button>
      </div>

      <h4 className="mt-5 text-sm font-semibold">Aynı içerik düz metin olarak</h4>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
        {queryPathSteps.map((s) => (
          <li key={s.id}>
            <strong>{s.name}</strong> ({s.layer}): {s.what}
          </li>
        ))}
      </ol>
    </section>
  );
}
