"use client";

import { useState } from "react";
import type { SequenceActivity } from "@/content/interactive/types";

/** Put cards in order: drag a card onto another position, or use ↑ / ↓. */
export function SequenceGame({ activity }: { activity: SequenceActivity }) {
  const { items, startOrder, instructions, success } = activity;
  const byId = Object.fromEntries(items.map((i) => [i.id, i]));
  const [order, setOrder] = useState<string[]>(startOrder);
  const [checked, setChecked] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);

  const move = (from: number, to: number) => {
    if (from === to || to < 0 || to >= order.length) return;
    setOrder((o) => {
      const next = [...o];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setChecked(false);
  };
  const isRight = (index: number) => order[index] === items[index].id;
  const correct = order.filter((_, i) => isRight(i)).length;
  const solved = checked && correct === items.length;

  return (
    <div>
      <p>{instructions}</p>
      <ol className="mt-3 space-y-2" aria-label="Sıralanacak kartlar">
        {order.map((id, index) => {
          const item = byId[id];
          return (
            <li
              key={id}
              draggable
              onDragStart={() => setDragging(id)}
              onDragEnd={() => setDragging(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragging) move(order.indexOf(dragging), index);
                setDragging(null);
              }}
              className={`animate-pop flex items-center gap-2 rounded-md border bg-white p-2 dark:bg-zinc-900 ${
                checked ? (isRight(index) ? "border-green-700" : "border-red-700") : "border-zinc-400"
              } ${dragging === id ? "opacity-50" : ""}`}
            >
              <span className="w-6 text-center font-semibold">{index + 1}</span>
              <span className="flex-1">
                {checked ? (isRight(index) ? "✓ " : "✗ ") : ""}
                <strong>{item.label}</strong>
                {solved ? <span className="block text-xs">{item.detail}</span> : null}
              </span>
              <button
                type="button"
                onClick={() => move(index, index - 1)}
                disabled={index === 0}
                aria-label={`${item.label}: yukarı taşı`}
                className="rounded border border-zinc-400 px-2 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, index + 1)}
                disabled={index === order.length - 1}
                aria-label={`${item.label}: aşağı taşı`}
                className="rounded border border-zinc-400 px-2 disabled:opacity-30"
              >
                ↓
              </button>
            </li>
          );
        })}
      </ol>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="rounded-md bg-blue-700 px-3 py-1.5 text-sm text-white"
        >
          Kontrol et
        </button>
        <button
          type="button"
          onClick={() => {
            setOrder(startOrder);
            setChecked(false);
          }}
          className="rounded-md border border-zinc-400 px-3 py-1.5 text-sm"
        >
          Baştan başla
        </button>
      </div>
      <p role="status" className="mt-2 text-sm">
        {checked
          ? solved
            ? success
            : `${correct} / ${items.length} kart doğru yerde. ✗ olanları taşı ve yeniden kontrol et.`
          : ""}
      </p>
    </div>
  );
}
