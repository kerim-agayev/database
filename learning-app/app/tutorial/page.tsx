import type { Metadata } from "next";
import Link from "next/link";
import { hasLesson } from "@/content/lessons";
import {
  TOTAL_DAYS,
  completedCount,
  daysInWeek,
  isCompleted,
  nextUnfinishedDay,
  weeks,
} from "@/lib/days";

export const metadata: Metadata = {
  title: "Tüm 90 gün",
  description: "90 günlük veritabanı mühendisliği programının gün listesi.",
};

export default function TutorialIndex() {
  const done = completedCount();
  const next = nextUnfinishedDay();
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">90 günlük plan</h1>
      <p className="mt-2">
        {done} / {TOTAL_DAYS} gün tamamlandı.
        {next ? (
          <>
            {" "}
            Sıradaki:{" "}
            <Link href={`/tutorial/${next}`} className="underline">
              {next}. gün
            </Link>
            .
          </>
        ) : null}
      </p>
      <progress
        value={done}
        max={TOTAL_DAYS}
        aria-label={`${done} / ${TOTAL_DAYS} gün tamamlandı`}
        className="mt-2 h-2 w-full"
      />
      <p className="mt-3 text-sm">
        Bir gün, gösterildiğinde değil, konuyu anladığını gösterdiğinde tamamlandı sayılır.
        &quot;Ders hazır&quot; etkileşimli dersin yazıldığı anlamına gelir; &quot;planlandı&quot;
        günlerde yalnızca onaylı plan görünür.
      </p>

      {weeks.map((w) => (
        <section key={w.week} className="mt-8" aria-labelledby={`week-${w.week}`}>
          <h2 id={`week-${w.week}`} className="text-xl font-semibold">
            Hafta {w.week}: {w.title}
          </h2>
          <ul className="mt-2 divide-y divide-zinc-200 dark:divide-zinc-800">
            {daysInWeek(w.week).map((d) => (
              <li key={d.day} className="py-2">
                <Link href={`/tutorial/${d.day}`} className="underline">
                  {d.day}. gün
                </Link>
                {": "}
                {d.objective}
                <span className="ml-2 text-sm">
                  {d.kind === "gate" ? "[değerlendirme kapısı] " : ""}
                  {d.kind === "review" ? "[tekrar] " : ""}
                  {isCompleted(d.day)
                    ? "[tamamlandı] "
                    : hasLesson(d.day)
                      ? "[ders hazır] "
                      : "[planlandı] "}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
