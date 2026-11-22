import type { CodeBlock, Lesson } from "@/content/lessons/types";
import type { RoadmapDay } from "@/lib/days";
import { KnowledgeCheck } from "@/components/knowledge-check";
import { QueryPathExplorer } from "@/components/query-path-explorer";

function Code({ block }: { block: CodeBlock }) {
  return (
    <figure className="my-3">
      <figcaption className="text-xs font-medium uppercase tracking-wide">
        {block.label}
      </figcaption>
      <pre className="mt-1 overflow-x-auto rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <code>{block.text}</code>
      </pre>
    </figure>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-10 text-xl font-semibold">
      {children}
    </h2>
  );
}

/**
 * Lesson order follows TEACHING_METHOD.md: recall first, everyday analogy before jargon,
 * at most a handful of new words, then the idea, a worked example, a task,
 * a knowledge check and a Feynman-style explanation in the learner's own words.
 */
export function LessonView({ lesson, plan }: { lesson: Lesson; plan: RoadmapDay }) {
  return (
    <article>
      <H2 id="goals">Bugün ne öğreneceksin?</H2>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {lesson.goals.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>

      <H2 id="recap">Nerede kaldık</H2>
      <p className="mt-2">{lesson.recap}</p>

      {lesson.recall && lesson.recall.length > 0 ? (
        <>
          <H2 id="recall">Önce hatırla (notlara bakmadan)</H2>
          <p className="mt-2 text-sm">
            Cevabı önce kafanda ya da kâğıtta söyle, sonra aç. Hatırlamaya çalışmak, tekrar
            okumaktan daha kalıcı öğretir.
          </p>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            {lesson.recall.map((r) => (
              <li key={r.question}>
                {r.question}
                <details className="mt-1">
                  <summary className="cursor-pointer text-sm underline">Cevabı göster</summary>
                  <p className="mt-1 text-sm">{r.answer}</p>
                </details>
              </li>
            ))}
          </ol>
        </>
      ) : null}

      <H2 id="analogy">Bugünün benzetmesi</H2>
      <p className="mt-2">{lesson.analogy.intro}</p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th scope="col" className="border-b border-zinc-400 p-2 text-left">
                Veritabanı dünyasında
              </th>
              <th scope="col" className="border-b border-zinc-400 p-2 text-left">
                Restoranda
              </th>
            </tr>
          </thead>
          <tbody>
            {lesson.analogy.rows.map((row) => (
              <tr key={row.term}>
                <th scope="row" className="border-b border-zinc-200 p-2 text-left align-top font-medium dark:border-zinc-800">
                  {row.term}
                </th>
                <td className="border-b border-zinc-200 p-2 align-top dark:border-zinc-800">
                  {row.analogy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="new-terms">Bugün yalnızca {lesson.newTerms.length} yeni kelime</H2>
      <dl className="mt-2 space-y-2">
        {lesson.newTerms.map((t) => (
          <div key={t.term}>
            <dt className="font-medium">{t.term}</dt>
            <dd className="text-sm">{t.plain}</dd>
          </div>
        ))}
      </dl>

      <H2 id="concept">Ana fikir</H2>
      {lesson.concept.map((section) => (
        <section key={section.heading} className="mt-5">
          <h3 className="text-lg font-semibold">{section.heading}</h3>
          {section.paragraphs.map((p) => (
            <p key={p} className="mt-2">
              {p}
            </p>
          ))}
        </section>
      ))}

      {lesson.visual === "query-path" && <QueryPathExplorer />}

      <H2 id="worked-example">Çözümlü örnek: {lesson.workedExample.title}</H2>
      <ol className="mt-2 list-decimal space-y-1 pl-5">
        {lesson.workedExample.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      {lesson.workedExample.code && <Code block={lesson.workedExample.code} />}

      <H2 id="challenge">Görev</H2>
      <p className="mt-2">{lesson.challenge.task}</p>
      <p className="mt-2">
        <strong>Önce tahmin et:</strong> {lesson.challenge.predictFirst}
      </p>

      <details className="mt-3 rounded-md border border-zinc-300 p-3 dark:border-zinc-700">
        <summary className="cursor-pointer font-medium">İpuçları (sırayla, birer birer aç)</summary>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          {lesson.challenge.hints.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ol>
      </details>

      <details className="mt-3 rounded-md border border-zinc-300 p-3 dark:border-zinc-700">
        <summary className="cursor-pointer font-medium">
          Beklenen çıktı ve çözüm (önce kendin dene)
        </summary>
        <p className="mt-2">{lesson.challenge.expectedOutput}</p>
        {lesson.challenge.code && <Code block={lesson.challenge.code} />}
      </details>

      <H2 id="check">Bilgi kontrolü</H2>
      <div className="mt-3">
        <KnowledgeCheck questions={lesson.knowledgeCheck} />
      </div>

      <H2 id="feynman">Kendi cümlelerinle anlat (Feynman)</H2>
      <p className="mt-2">{lesson.feynman}</p>

      <H2 id="reflection">Düşünme notu</H2>
      <p className="mt-2">{lesson.reflection}</p>

      <H2 id="references">Kaynakça</H2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {lesson.references.map((r) => (
          <li key={r.title}>
            {r.url ? (
              <a href={r.url} className="underline" rel="noopener noreferrer">
                {r.title}
              </a>
            ) : (
              r.title
            )}
            , {r.by}
            {r.accessed ? ` (erişim: ${r.accessed})` : ""}
            {r.note ? `. ${r.note}` : ""}
          </li>
        ))}
      </ul>

      <details className="mt-10 text-sm">
        <summary className="cursor-pointer font-medium">Günün plandaki teknik özeti</summary>
        <dl className="mt-2 space-y-1">
          <div>
            <dt className="inline font-medium">Hedef: </dt>
            <dd className="inline">{plan.objective}</dd>
          </div>
          <div>
            <dt className="inline font-medium">Okuma kaynakları: </dt>
            <dd className="inline">{plan.source}</dd>
          </div>
          <div>
            <dt className="inline font-medium">Uygulama: </dt>
            <dd className="inline">{plan.handsOn}</dd>
          </div>
          <div>
            <dt className="inline font-medium">Öz-kontrol: </dt>
            <dd className="inline">{plan.selfCheck}</dd>
          </div>
        </dl>
      </details>
    </article>
  );
}

/** Shown for days whose full lesson is not written yet. Honest, not decorative. */
export function PlannedDay({ plan }: { plan: RoadmapDay }) {
  return (
    <article>
      <p className="rounded-md border border-amber-600 p-3">
        Bu günün tam etkileşimli dersi henüz yazılmadı. Dersler, müfredat ilgili konuya
        geldikçe adım adım hazırlanır. Aşağıda günün onaylı planı var.
      </p>
      <dl className="mt-4 space-y-2">
        <div>
          <dt className="font-medium">Hedef</dt>
          <dd>{plan.objective}</dd>
        </div>
        <div>
          <dt className="font-medium">Okuma kaynakları</dt>
          <dd>{plan.source}</dd>
        </div>
        <div>
          <dt className="font-medium">Uygulama ve çıktı</dt>
          <dd>{plan.handsOn}</dd>
        </div>
        <div>
          <dt className="font-medium">Öz-kontrol</dt>
          <dd>{plan.selfCheck}</dd>
        </div>
      </dl>
    </article>
  );
}
