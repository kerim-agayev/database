import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Sayfa bulunamadı</h1>
      <p className="mt-3">
        Böyle bir sayfa yok. Dersler <code>/tutorial/1</code> ile <code>/tutorial/90</code>{" "}
        arasındadır; başka bir gün numarası yoktur.
      </p>
      <p className="mt-3">
        <Link href="/tutorial" className="underline">
          Gün listesini aç
        </Link>{" "}
        ya da{" "}
        <Link href="/" className="underline">
          ana sayfaya git
        </Link>
        .
      </p>
    </div>
  );
}
