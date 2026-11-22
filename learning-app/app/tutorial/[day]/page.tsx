import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DayNav } from "@/components/day-nav";
import { LessonView, PlannedDay } from "@/components/lesson-view";
import { getLesson } from "@/content/lessons";
import Link from "next/link";
import { hasInteractive } from "@/lib/interactive-days";
import {
  TOTAL_DAYS,
  dayParams,
  getDay,
  getWeek,
  isCompleted,
  parseDay,
} from "@/lib/days";

// Opt out of the dev-only "instant navigation" check. It warns that `await params` is not
// inside <Suspense> (it cannot know the values). Here every valid day is prerendered at build
// time, and proxy.ts rejects every other value before rendering, so valid pages never block.
// See: Next.js docs, route segment config "instant" (Disabling instant), checked 2026-11-22.
export const instant = false;

// All 90 days are generated at build time. Anything else (/tutorial/0, /tutorial/91,
// /tutorial/abc) is rejected by parseDay() below, because `dynamicParams = false`
// is not available when Cache Components is enabled (Next.js docs, checked 2026-11-11).
export function generateStaticParams() {
  return dayParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/tutorial/[day]">): Promise<Metadata> {
  const { day } = await params;
  const n = parseDay(day);
  const plan = n === null ? undefined : getDay(n);
  if (!plan) return { title: "Gün bulunamadı" };
  const lesson = getLesson(plan.day);
  return {
    title: `${plan.day}. gün: ${lesson?.title ?? plan.objective}`,
    description: plan.objective,
  };
}

export default async function DayPage({ params }: PageProps<"/tutorial/[day]">) {
  const { day: raw } = await params;
  const n = parseDay(raw);
  if (n === null) notFound();

  const plan = getDay(n);
  if (!plan) notFound();

  const lesson = getLesson(n);
  const week = getWeek(plan.week);
  const done = isCompleted(n);

  return (
    <div className="space-y-6">
      <DayNav day={n} />

      <header>
        <p className="text-sm">
          Gün {n} / {TOTAL_DAYS} · Hafta {plan.week}
          {week ? `: ${week.title}` : ""}
          {plan.kind === "gate" ? " · Değerlendirme kapısı" : ""}
          {plan.kind === "review" ? " · Tekrar günü" : ""}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          {lesson?.title ?? plan.objective}
        </h1>
        <p className="mt-2 text-sm">
          Durum:{" "}
          <strong>{done ? "Tamamlandı" : "Henüz tamamlanmadı"}</strong>
          {" "}(bir gün ancak öz-kontrol geçildikten sonra tamamlanmış sayılır, bkz.
          LEARNING_PROGRESS.md)
        </p>
        <progress
          value={n}
          max={TOTAL_DAYS}
          aria-label={`Plandaki konum: ${n}. gün, toplam ${TOTAL_DAYS}`}
          className="mt-3 h-2 w-full"
        />
      </header>

      {hasInteractive(n) ? (
        <p className="rounded-lg border-2 border-blue-700 p-4">
          <strong>Oynayarak öğren:</strong> bu günün sürükle-bırak oyunları ve animasyonları
          hazır.{" "}
          <Link href={`/tutorial/${n}/interactive`} className="font-semibold underline">
            {n}. günün etkileşimli sayfasını aç →
          </Link>
        </p>
      ) : null}

      {lesson ? <LessonView lesson={lesson} plan={plan} /> : <PlannedDay plan={plan} />}

      <DayNav day={n} />
    </div>
  );
}
