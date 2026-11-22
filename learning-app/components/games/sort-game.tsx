"use client";

import { useState } from "react";
import type { SortActivity } from "@/content/interactive/types";

const card =
  "rounded-md border px-3 py-2 text-left text-sm shadow-sm transition-transform motion-reduce:transition-none";

/**
 * Drag cards into boxes. Mouse: drag and drop. Touch and keyboard: tap a card
 * (it lifts), then press "… kutusuna koy". Feedback uses ✓/✗ text, not only color.
 */
export function SortGame({ activity }: { activity: SortActivity }) {
  const { buckets, items, instructions, success } = activity;
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [over, setOver] = useState<string | null>(null);

  const pool = items.filter((i) => !(i.id in placed));
  const correct = items.filter((i) => placed[i.id] === i.bucket).length;
  const solved = checked && correct === items.length;

  const place = (itemId: string, bucketId: string) => {
    setPlaced((p) => ({ ...p, [itemId]: bucketId }));
    setSelected(null);
    setChecked(false);
  };
  const unplace = (itemId: string) => {
    setPlaced((p) => {
      const next = { ...p };
      delete next[itemId];
      return next;
    });
    setChecked(false);
  };
  const reset = () => {
    setPlaced({});
    setSelected(null);
    setChecked(false);
  };
  const dragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData("text/plain", itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <p>{instructions}</p>
      <p className="mt-1 text-xs">
        Fareyle sürükle-bırak yapabilirsin. Telefonda ya da klavyede: önce karta dokun, sonra
        kutudaki &quot;koy&quot; düğmesine bas. Yanlış kartı geri almak için ona tekrar dokun.
      </p>

      <div
        role="group"
        aria-label="Kart havuzu"
        data-testid="pool"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const id = e.dataTransfer.getData("text/plain");
          if (id) unplace(id);
        }}
        className="mt-3 flex min-h-14 flex-wrap gap-2 rounded-md border-2 border-dashed border-zinc-400 p-2"
      >
        {pool.length === 0 ? (
          <span className="self-center text-xs">Tüm kartlar yerleştirildi.</span>
        ) : null}
        {pool.map((item) => (
          <button
            key={item.id}
            type="button"
            draggable
            aria-pressed={selected === item.id}
            onDragStart={(e) => dragStart(e, item.id)}
            onClick={() => setSelected((s) => (s === item.id ? null : item.id))}
            className={`${card} animate-pop cursor-grab bg-white dark:bg-zinc-900 ${
              selected === item.id ? "-translate-y-1 border-blue-700 ring-2 ring-blue-600" : "border-zinc-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {buckets.map((b) => {
          const inside = items.filter((i) => placed[i.id] === b.id);
          return (
            <div
              key={b.id}
              role="group"
              aria-label={b.label}
              data-testid={`bucket-${b.id}`}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(b.id);
              }}
              onDragLeave={() => setOver(null)}
              onDrop={(e) => {
                e.preventDefault();
                setOver(null);
                const id = e.dataTransfer.getData("text/plain");
                if (id) place(id, b.id);
              }}
              className={`rounded-lg border-2 p-3 transition-colors motion-reduce:transition-none ${
                over === b.id ? "border-blue-600 bg-blue-50 dark:bg-blue-950" : "border-zinc-300 dark:border-zinc-700"
              }`}
            >
              <p className="font-medium">{b.label}</p>
              {b.detail ? <p className="text-xs">{b.detail}</p> : null}
              <ul className="mt-2 space-y-1">
                {inside.map((item) => {
                  const ok = item.bucket === b.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        draggable
                        onDragStart={(e) => dragStart(e, item.id)}
                        onClick={() => unplace(item.id)}
                        aria-label={`${item.label}: havuza geri al`}
                        className={`${card} animate-pop w-full ${
                          checked ? (ok ? "border-green-700" : "border-red-700") : "border-zinc-400"
                        }`}
                      >
                        {checked ? (ok ? "✓ " : "✗ ") : ""}
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                disabled={!selected}
                onClick={() => selected && place(selected, b.id)}
                aria-label={`Seçili kartı "${b.label}" kutusuna koy`}
                className="mt-2 rounded-md border border-zinc-400 px-2 py-1 text-xs disabled:opacity-40"
              >
                Buraya koy
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={pool.length > 0}
          onClick={() => setChecked(true)}
          className="rounded-md bg-blue-700 px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          Kontrol et
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-zinc-400 px-3 py-1.5 text-sm"
        >
          Baştan başla
        </button>
      </div>
      <p role="status" className="mt-2 text-sm">
        {checked
          ? solved
            ? success
            : `${correct} / ${items.length} doğru. ✗ işaretli kartlara dokunup havuza geri al ve yeniden dene.`
          : ""}
      </p>
    </div>
  );
}
