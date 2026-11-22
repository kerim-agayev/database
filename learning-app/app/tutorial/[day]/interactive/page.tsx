import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InteractiveView } from "@/components/interactive-view";
import { getInteractive } from "@/content/interactive";
import { INTERACTIVE_DAYS } from "@/lib/interactive-days";
import { parseDay } from "@/lib/parse-day";

// Same reasoning as the lesson page: all valid values are prerendered and proxy.ts
// rejects the rest, so the dev-only instant-navigation check is not needed here.
export const instant = false;

export function generateStaticParams() {
  return INTERACTIVE_DAYS.map((d) => ({ day: String(d) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tutorial/[day]/interactive">): Promise<Metadata> {
  const { day } = await params;
  const n = parseDay(day);
  const page = n === null ? undefined : getInteractive(n);
  if (!page) return { title: "Sayfa bulunamadı" };
  return { title: `${page.day}. gün oyunları: ${page.title}` };
}

export default async function InteractivePage({
  params,
}: PageProps<"/tutorial/[day]/interactive">) {
  const { day: raw } = await params;
  const n = parseDay(raw);
  if (n === null) notFound();
  const page = getInteractive(n);
  if (!page) notFound();

  return (
    <div>
      <nav aria-label="Ders gezintisi" className="text-sm">
        <Link href={`/tutorial/${n}`} className="underline">
          ← {n}. günün dersine dön
        </Link>
      </nav>
      <p className="mt-4 text-sm">{n}. gün · Etkileşimli</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">{page.title}</h1>
      <InteractiveView page={page} />
    </div>
  );
}
