"use client";

import { useEffect, useState } from "react";
import { journeyModel, journeySteps } from "@/content/visuals/kitchen-journey";

/**
 * Animated step-through: the order ticket moves station by station.
 * Restaurant side and real database side are shown together (dual coding).
 * Autoplay is optional; motion is removed for prefers-reduced-motion.
 */
export function KitchenJourney() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = journeySteps.length - 1;
  const current = journeySteps[step];
  // Playback stops by itself at the last station (derived, no setState inside the effect).
  const isPlaying = playing && step < last;

  useEffect(() => {
    if (!isPlaying) return;
    const t = setTimeout(() => setStep((s) => s + 1), 1800);
    return () => clearTimeout(t);
  }, [isPlaying, step]);

  return (
    <div>
      <p className="text-sm">
        <strong>Neyi modeller:</strong> {journeyModel.models}
      </p>
      <p className="mt-1 text-sm">
        <strong>Neyi basitleştirir:</strong> {journeyModel.simplifies}
      </p>

      <ol aria-label="Siparişin istasyonları" className="mt-4 flex flex-wrap items-center gap-1">
        {journeySteps.map((s, i) => (
          <li key={s.id} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setStep(i);
              }}
              aria-current={i === step ? "step" : undefined}
              className={`relative rounded-full border-2 px-3 py-1.5 text-sm transition-colors motion-reduce:transition-none ${
                i === step
                  ? "border-blue-700 bg-blue-700 text-white"
                  : i < step
                    ? "border-blue-300 bg-blue-50 dark:bg-blue-950"
                    : "border-zinc-400"
              }`}
            >
              {s.station}
              {i === step ? (
                <span
                  key={`ticket-${step}`}
                  aria-hidden="true"
                  className="animate-drop absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-amber-400 px-1 text-[10px] font-bold text-black"
                >
                  FİŞ
                </span>
              ) : null}
            </button>
            {i < last ? (
              <span aria-hidden="true" className="text-zinc-400">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>

      <div
        key={step}
        aria-live="polite"
        data-testid="journey-detail"
        className="animate-slide mt-4 grid gap-3 rounded-md bg-zinc-100 p-4 sm:grid-cols-2 dark:bg-zinc-800"
      >
        <p className="text-xs font-medium sm:col-span-2">
          Adım {step + 1} / {journeySteps.length}: {current.station}
        </p>
        <div>
          <h4 className="font-semibold">Restoranda</h4>
          <p className="mt-1">{current.restaurant}</p>
        </div>
        <div>
          <h4 className="font-semibold">Gerçekte (PostgreSQL)</h4>
          <p className="mt-1">{current.real}</p>
          {current.code ? (
            <pre className="mt-2 overflow-x-auto rounded bg-white p-2 text-xs dark:bg-zinc-900">
              <code>{current.code}</code>
            </pre>
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            setStep((s) => Math.max(0, s - 1));
          }}
          disabled={step === 0}
          className="rounded-md border border-zinc-400 px-3 py-1.5 text-sm disabled:opacity-50"
        >
          Önceki adım
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            setStep((s) => Math.min(last, s + 1));
          }}
          disabled={step === last}
          className="rounded-md border border-zinc-400 px-3 py-1.5 text-sm disabled:opacity-50"
        >
          Sonraki adım
        </button>
        <button
          type="button"
          onClick={() => {
            if (isPlaying) {
              setPlaying(false);
              return;
            }
            if (step === last) setStep(0);
            setPlaying(true);
          }}
          className="rounded-md bg-blue-700 px-3 py-1.5 text-sm text-white"
        >
          {isPlaying ? "Durdur" : "Otomatik oynat"}
        </button>
      </div>

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer underline">Aynı yolculuk düz metin olarak</summary>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          {journeySteps.map((s) => (
            <li key={s.id}>
              <strong>{s.station}:</strong> {s.restaurant} Gerçekte: {s.real}
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
