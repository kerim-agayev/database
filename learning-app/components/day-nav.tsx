import Link from "next/link";
import { TOTAL_DAYS, getAdjacent } from "@/lib/days";

export function DayNav({ day }: { day: number }) {
  const { prev, next } = getAdjacent(day);
  return (
    <nav aria-label="Gün gezintisi" className="flex items-center justify-between gap-3 text-sm">
      {prev ? (
        <Link href={`/tutorial/${prev}`} rel="prev" className="underline">
          ← {prev}. gün
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      <Link href="/tutorial" className="underline">
        Tüm {TOTAL_DAYS} gün
      </Link>
      {next ? (
        <Link href={`/tutorial/${next}`} rel="next" className="underline">
          {next}. gün →
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
