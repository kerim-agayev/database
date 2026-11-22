/**
 * Data for the "path of a query" explorer (Day 2). Text is in Turkish for the learner.
 * Sources: PostgreSQL 18 docs "51.1 The Path of a Query" and "1.2 Architectural Fundamentals"
 * (accessed 2026-11-11); Petrov, Database Internals, Ch. 1 "DBMS Architecture".
 */

export interface QueryPathStep {
  id: string;
  name: string;
  /** Which layer of the DBMS map this belongs to (Petrov's vocabulary). */
  layer: string;
  what: string;
}

export const queryPathModel = {
  models:
    "PostgreSQL'de bir SELECT'in geçtiği ana aşamaların sırasını ve bunların Database Internals kitabındaki DBMS haritasıyla eşleşmesini.",
  simplifies:
    "Kimlik doğrulama ve yetki kontrolleri, transaction'lar ve kilitleme, prepared statement'lar, paralel işçiler, plan önbellekleme ve hata yönetimi dışarıda bırakıldı. Gerçek sistemler çok daha fazlasını yapar ve bileşenler arasındaki sınırlar kutuların gösterdiğinden daha bulanıktır.",
};

export const queryPathSteps: QueryPathStep[] = [
  {
    id: "client",
    name: "İstemci SQL gönderir",
    layer: "İstemci",
    what: "Uygulaman ya da SQL aracın, SQL metnini bir bağlantı üzerinden sunucuya gönderir ve sonucu bekler.",
  },
  {
    id: "connection",
    name: "Bağlantı",
    layer: "Sunucu süreci",
    what: "PostgreSQL'de istemcileri dinleyen bir gözetmen (supervisor) süreç vardır. Her bağlantı için ayrı bir sunucu süreci başlatır (fork); bu süreç yalnızca o istemciye hizmet eder.",
  },
  {
    id: "parser",
    name: "Parser",
    layer: "Sorgu işlemcisi (query processor)",
    what: "Sorgunun söz dizimini kontrol eder ve bir sorgu ağacı (query tree) oluşturur. Yazım hatası burada, hiçbir veriye dokunulmadan yakalanır.",
  },
  {
    id: "rewrite",
    name: "Rewrite sistemi",
    layer: "Sorgu işlemcisi (query processor)",
    what: "Sistem kataloglarında saklanan kuralları uygular. View'lar böyle çalışır: bir view'a yazılan sorgu, alttaki tabloları okuyacak şekilde yeniden yazılır.",
  },
  {
    id: "planner",
    name: "Planner / optimizer",
    layer: "Sorgu optimizer'ı",
    what: "Aynı sonucu üretmenin aday yollarını çıkarır, örneğin sequential scan ya da index scan. Her birinin maliyetini tahmin eder ve en ucuzunu plan olarak seçer.",
  },
  {
    id: "executor",
    name: "Executor",
    layer: "Yürütme motoru (execution engine)",
    what: "Planı yürütür: depolama sisteminden satırları ister, sıralama ve join işlemlerini yapar, koşulları kontrol eder ve sonuç satırlarını üretir.",
  },
  {
    id: "storage",
    name: "Depolama (ön izleme)",
    layer: "Depolama motoru (storage engine)",
    what: "Heap tabloları ve B-tree index'leri gibi erişim yöntemleri (access method) page'leri okur ve yazar. Bellekteki bir page önbelleği ve write-ahead log da bu katmandadır. Bunları 5. ve 6. haftada işleyeceğiz; şimdilik haritada yalnızca bir etiket.",
  },
  {
    id: "result",
    name: "Sonuç döner",
    layer: "İstemci",
    what: "Sonuç satırları aynı bağlantı üzerinden istemciye döner ve istemci bunları gösterir.",
  },
];
