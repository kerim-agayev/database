import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// "latin-ext" is needed for Turkish letters (ş, ğ, ı, İ, ç, ö, ü) to use the same font.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Veritabanı Mühendisliği Programı",
    template: "%s · Veritabanı Mühendisliği Programı",
  },
  description:
    "Veritabanı internals'ı, eşzamanlılık, performans ve güvenilirlik üzerine 90 günlük etkileşimli bir yol.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-background focus:p-2"
        >
          İçeriğe geç
        </a>
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <nav
            aria-label="Site"
            className="mx-auto flex max-w-3xl items-center gap-5 px-4 py-3 text-sm"
          >
            <Link href="/" className="font-semibold">
              DB Programı
            </Link>
            <Link href="/tutorial" className="underline">
              Tüm günler
            </Link>
          </nav>
        </header>
        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-zinc-200 px-4 py-4 text-center text-xs dark:border-zinc-800">
          Öğretim modelleri basitleştirilmiştir. Gerçek ölçümler db-lab projesinden gelir.
        </footer>
      </body>
    </html>
  );
}
