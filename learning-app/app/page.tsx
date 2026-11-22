import Link from "next/link";
import { TOTAL_DAYS, completedCount, nextUnfinishedDay } from "@/lib/days";

export default function Home() {
  const next = nextUnfinishedDay();
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Veritabanı Mühendisliği Programı</h1>
      <p className="mt-3">
        Analitik SQL&apos;den, veritabanlarının içeriden nasıl çalıştığını bilen, production
        bilincine sahip bir anlayışa uzanan {TOTAL_DAYS} günlük bir yol. Her ders, resmi
        dokümanlara ve kitaplara dayanan özgün bir anlatımdır ve yalnızca sentetik restoran
        verisi kullanır.
      </p>
      <p className="mt-3">
        {completedCount()} / {TOTAL_DAYS} gün tamamlandı.
      </p>
      <p className="mt-5 flex flex-wrap gap-3">
        {next ? (
          <Link
            href={`/tutorial/${next}`}
            className="rounded-md bg-blue-700 px-4 py-2 font-medium text-white"
          >
            {next}. günle devam et
          </Link>
        ) : null}
        <Link href="/tutorial" className="rounded-md border border-zinc-400 px-4 py-2">
          Tüm {TOTAL_DAYS} gün
        </Link>
      </p>

      <h2 className="mt-10 text-xl font-semibold">Simülasyon mu, gerçek veritabanı mı?</h2>
      <p className="mt-2">
        Bu uygulamadaki etkileşimli parçalar <strong>öğretim modelleridir</strong>: gerçeği
        basitleştirirler ve her biri neyi modellediğini, neyi dışarıda bıraktığını söyler.
        Gerçek davranış, ayrı <code>db-lab</code> projesinde, gerçek bir PostgreSQL
        sunucusuna karşı ölçülür. Lab&apos;dan gelen sayılar bu şekilde etiketlenir. Buradaki
        hiçbir şey bir production benchmark&apos;ı değildir.
      </p>
    </div>
  );
}
