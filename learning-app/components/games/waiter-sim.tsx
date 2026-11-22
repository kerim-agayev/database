"use client";

import { useState } from "react";
import { MAX_SESSIONS, backgroundStaff, waiterModel } from "@/content/visuals/waiter-sim";

/** Open/close sessions and watch the simulated pg_stat_activity summary change. */
export function WaiterSim() {
  const [sessions, setSessions] = useState(1);

  const rows = [
    ...backgroundStaff.map((s) => ({ type: s.backendType, count: s.count })),
    ...(sessions > 0 ? [{ type: "client backend", count: sessions }] : []),
  ].sort((a, b) => a.type.localeCompare(b.type));

  return (
    <div>
      <p className="text-sm">
        <strong>Neyi modeller:</strong> {waiterModel.models}
      </p>
      <p className="mt-1 text-sm">
        <strong>Neyi basitleştirir:</strong> {waiterModel.simplifies}
      </p>
      <p className="mt-3">
        <strong>Önce tahmin et:</strong> 4 oturum (4 psql penceresi) açıkken client backend kaç
        olur? Tahminini söyle, sonra düğmelerle dene.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSessions((n) => Math.min(MAX_SESSIONS, n + 1))}
          disabled={sessions >= MAX_SESSIONS}
          className="rounded-md bg-blue-700 px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          Yeni oturum aç (bir müşteri gelir)
        </button>
        <button
          type="button"
          onClick={() => setSessions((n) => Math.max(0, n - 1))}
          disabled={sessions <= 0}
          className="rounded-md border border-zinc-400 px-3 py-1.5 text-sm disabled:opacity-50"
        >
          Bir oturumu kapat (\q)
        </button>
      </div>

      <p className="mt-3" data-testid="session-count" aria-live="polite">
        Açık oturum: <strong>{sessions}</strong>. Masaya bakan garson:{" "}
        <strong>{sessions}</strong>.
      </p>
      <ul aria-label="Garsonlar" className="mt-2 flex flex-wrap gap-2">
        {Array.from({ length: sessions }, (_, i) => (
          <li
            key={i}
            className="animate-pop rounded-full border-2 border-blue-700 px-3 py-1 text-sm"
          >
            Garson {i + 1}
          </li>
        ))}
        {sessions === 0 ? (
          <li className="text-sm">
            Kimse bağlı değil. (Sorguyu çalıştıracak kimse de yok; ama arka plan ekibi yine
            çalışır.)
          </li>
        ) : null}
      </ul>

      <figure className="mt-4">
        <figcaption className="text-xs font-medium">
          Simüle edilmiş psql çıktısı: SELECT backend_type, count(*) FROM pg_stat_activity GROUP
          BY backend_type ORDER BY 1;
        </figcaption>
        <div className="mt-1 overflow-x-auto">
          <table className="w-full border-collapse font-mono text-sm" data-testid="sim-table">
            <thead>
              <tr>
                <th scope="col" className="border-b border-zinc-400 p-1 text-left">backend_type</th>
                <th scope="col" className="border-b border-zinc-400 p-1 text-right">count</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.type} className={r.type === "client backend" ? "bg-blue-50 font-bold dark:bg-blue-950" : ""}>
                  <td className="border-b border-zinc-200 p-1 dark:border-zinc-800">{r.type}</td>
                  <td className="border-b border-zinc-200 p-1 text-right dark:border-zinc-800">{r.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </figure>

      <h4 className="mt-4 font-semibold">Arka plan ekibi kim? (ön bilgi)</h4>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
        {backgroundStaff.map((s) => (
          <li key={s.backendType}>
            <code>{s.backendType}</code>: {s.role}
            {s.laterDay ? ` Ayrıntısı ${s.laterDay}. günde.` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
