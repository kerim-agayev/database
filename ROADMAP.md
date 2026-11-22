# YOL HARİTASI — 90 Günlük Veritabanı Mühendisliği ve Internals Programı

Durum: **onaylı v1.0** (2026-11-11). 2026-11-22'de öğrencinin isteğiyle Türkçeye çevrildi. Yapı onaylıdır; günler ilerledikçe tek tek iyileştirilebilir ve her değişiklik SESSION_LOG.md'ye yazılır.
Motor: **PostgreSQL** (güncel kararlı sürüm 18.6; 5. günde resmi dokümandan yeniden doğrulanacak). Alan: sentetik restoran SaaS'ı.
Bütçe: haftada yaklaşık 6–8 saat, günde kabaca 1 saat. 12 tam hafta ve son 6 günlük capstone/tekrar bloğu.

## Bu planı nasıl okumalı

- **Gün** = tek bir öğrenme hedefi, takvim tarihi değil. Bir günü kaçırdın mı? Tamamlanmamış bir sonraki günden devam edersin. Birikmiş borç yok, suçluluk yok.
- Bir gün ancak öz-kontrolü geçtiğinde ya da öğrenci günü açıkça tamamlandı olarak kaydettiğinde tamamlanmış sayılır (bkz. LEARNING_PROGRESS.md).
- Kaynak kodları:
  - **DDIA** = Kleppmann, 1. baskı erken sürüm (yerel PDF).
  - **DI** = Petrov, *Database Internals*.
  - **SP** = Gregg, *Systems Performance*, 1. baskı.
  - **DRE** = Campbell ve Majors, *Database Reliability Engineering*.
  - **PG** = resmi PostgreSQL dokümanı.
  - **NC** = Hussein Nasser konu listesi (COURSE_MAP_HUSSEIN_NASSER.md; kurs satın alınmadı, yalnızca konu referansı).
- **Lab** = Docker'daki gerçek PostgreSQL (`db-lab/`). **Sim** = `learning-app/` içindeki etkileşimli öğretim modeli; gerçeği basitleştirir ve sayfada neyi basitleştirdiğini söyler.
- **Çekirdek** konular zorunludur. *(opsiyonel)* ile işaretliler isteğe bağlı derinleşmedir.

## Bağımlılık haritası

```
Temeller (H1) → Modelleme ve kısıtlar (H2) → Uygulamada transaction, migration, sorgunun yolu (H3)
      → Index'ler ve planlar (H4) → [30. gün değerlendirmesi] → Depolama internals'ı: page, buffer, WAL, kurtarma, LSM (H5–6)
      → ACID ve izolasyon (H7) → Kilitler, MVCC, deadlock, eşzamanlılık lab'ı (H8)
      → Performans: gecikme, kuyruk, pooling [60. gün değerlendirmesi] (H9–10)
      → Replikasyon, partitioning, sharding, tutarlılık (H11) → Yedekleme, kurtarma, güvenlik, operasyon (H12)
      → Capstone ve sözlü savunma [90. gün değerlendirmesi] (H13)
```

İzolasyon (H7) bilerek depolamadan (H5–6) sonra geliyor: MVCC, satır sürümlerinin nerede durduğunu bilmeden anlamlı olmaz.

## Değerlendirme kapıları

| Kapı | Ne zaman | Biçim | Geçme koşulu |
|---|---|---|---|
| Haftalık tekrar | 7, 14, 21, 49, 56, 63, 70, 77, 84. günler | 10 hatırlama sorusu ve 1 kendi cümlelerinle anlatma | En az %70. Eksikler sonraki haftanın ısınmasına gider |
| **30. gün** | 30. gün | Şema ve index tasarım görevi, 3 planı okuma | Doğru index seçimi ve gerekçesi, planın darboğazının bulunması |
| **60. gün** | 60. gün | Bir eşzamanlılık hatasını yeniden üretip düzeltme ve depolamayı anlatma | Hata yeniden üretilmiş, düzeltilmiş ve izolasyon/kilit terimleriyle açıklanmış |
| **90. gün** | 89–90. günler | Yazılı senaryolar ve capstone'un sözlü savunması | Ödünleşimleri (trade-off), hata biçimlerini ve ölçümleri savunabilmek |

Kapıda zayıf sonuç çıkarsa devam etmeden önce telafi günleri eklenir. Takvim, anlamanın önüne geçmez.

---

## Hafta 1 — Temeller ve lab kurulumu (Gün 1–7)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 1 | Seviye tespiti ve grain kavramı: bildiklerin ile internals boşluklarının haritası | — | Kendi değerlendirmen ve SQL kalibrasyonu → LEARNING_PROGRESS.md'de başlangıç seviyesi | En zayıf 3 konu hangisi? |
| 2 | Veritabanı, DBMS ve storage engine farkı; bir DBMS'in bileşenleri | DI Böl. 1, NC S10 | **Sim:** DBMS mimarisi gezgini → kendi çizimin | Storage engine nerede biter, sorgu işlemcisi nerede başlar? |
| 3 | Bir sorgunun hayatı: istemci → parser → planner → executor → depolama | DI Böl. 1, PG "Overview of PostgreSQL Internals" | Bir SELECT'i katmanlardan izle → sıra diyagramı | Diske dokunmadan önce neler oluyor? |
| 4 | OLTP ve OLAP; satır ve kolon depolama (giriş) | DDIA Böl. 3 (kolon depolama), NC S2 | 10 restoran iş yükünü sınıflandır → tablo | Günlük satış raporu neden OLTP şemasında yavaş çalışır? |
| 5 | Yerel lab: Docker PostgreSQL, psql, compose, sürümü doğrula | PG kurulum dokümanı | **Lab:** `docker compose up`, bağlan, `SELECT version()` → `db-lab/` iskeleti ve deney günlüğü #1 | `docker compose down` sonrası ne kalır, ne gider? |
| 6 | Veri modelleri: ilişkisel, doküman, graf | DDIA Böl. 2 | Bir siparişi satırlar ve JSON doküman olarak modelle → karşılaştırma notu | Doküman modeli ne zaman canını yakar? |
| 7 | **Tekrar: Hafta 1** | — | Hatırlama testi ve "bir sorgunun hayatı"nı anlatma | En az %70 |

## Hafta 2 — Veri modelleme ve bütünlük (Gün 8–14)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 8 | Restoran SaaS alanının kavramsal modeli | DDIA Böl. 2 | Varlıklar: tenant, branch, user, menu_item, order, order_line, payment, inventory → ER taslağı | Hangi ilişkiler çoka-çok? |
| 9 | Anahtarlar: doğal ve vekil (surrogate), bigint ve UUID (v4/v7), birincil ve ikincil | NC S2, NC S15 (Shopify UUID) | **Lab:** çekirdek tabloları oluştur → `docs/architecture/schema-v1.md` | Rastgele UUID'ler B-tree eklemelerini neden yavaşlatabilir? |
| 10 | Kısıtlar (constraint) birer değişmez kural olarak: NOT NULL, CHECK, UNIQUE, FK davranışları, exclusion | PG "Constraints" | **Lab:** geçersiz siparişler eklemeyi dene → kısıt hata günlüğü | Hangi değişmez kuralı tek başına bir CHECK uygulayamaz? |
| 11 | Normalizasyon 1NF → 3NF/BCNF | DDIA Böl. 2 | **Sim:** dağınık bir sipariş çizelgesini sürükle-bırak ile normalleştir → normalleştirilmiş şema | 3NF hangi anomaliyi ortadan kaldırır? |
| 12 | Denormalizasyon ve türetilmiş veri: fiyat anlık görüntüsü, sipariş toplamı | DDIA Böl. 3/11 (türetilmiş veri) | Karar ver: `order_total` saklanır mı, hesaplanır mı? → ADR taslağı | Saklanan bir toplamın tutarlılık maliyeti nedir? |
| 13 | Çok kiracılık (multi-tenancy): paylaşılan şema ve tenant_id, tenant başına şema, tenant başına veritabanı; RLS giriş | PG "Row Security Policies", DRE Böl. 12 | 3 seçeneği karşılaştır → **ADR: tenant izolasyonu** | Eksik bir `WHERE tenant_id` nasıl veri sızıntısına dönüşür? |
| 14 | **Tekrar: Hafta 2** ve Prisma şeması, sentetik tohum verisi | Prisma dokümanı | **Lab:** `schema.prisma` ve tohum script'i (sahte veri) → doldurulmuş DB | Prisma modelini SQL DDL ile karşılaştır: Prisma neyi gizledi? |

## Hafta 3 — Uygulamada transaction, migration, sorgunun yolu (Gün 15–21)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 15 | Transaction nedir: BEGIN/COMMIT/ROLLBACK, autocommit | DDIA Böl. 7 (giriş), NC S1 | **Lab:** iki psql oturumu, commit edilmemiş verinin görünürlüğü → deney günlüğü | Her tek ifade bir transaction mıdır? |
| 16 | Atomiklik ve dayanıklılık temelleri; savepoint; Prisma `$transaction` | DDIA Böl. 7, PG "SAVEPOINT" | Bir siparişi atomik ver (sipariş, satırlar, stok) → kod ve test | Bir adım hata fırlatırsa Prisma ne yapar? |
| 17 | Idempotency ve tekrar denemeye güvenli işlemler (ödemeler) | DDIA Böl. 11 (tam-bir-kez fikirleri) | Ödemeler için idempotency-key tablosu → **Sim:** ödemeye çift tıklama | Anahtarsız "zaman aşımında tekrar dene" neden tehlikeli? |
| 18 | Şema evrimi: geriye/ileriye uyumluluk, expand/contract | DDIA Böl. 4, DRE Böl. 8 | Bir kolonu 3 deploy'da güvenle yeniden adlandır → migration planı | Eski uygulama sürümleri çalışırken neden tek adımda yeniden adlandıramazsın? |
| 19 | Sorgu işleme: parse, rewrite, plan, execute; EXPLAIN temelleri | PG "Using EXPLAIN", NC S3 | **Lab:** 5 sorguya EXPLAIN → notlu planlar | "Cost" neyle ölçülür? |
| 20 | İstatistikler, seçicilik (selectivity), kardinalite tahmini | PG "Statistics Used by the Planner" | **Lab:** `pg_stats`, ANALYZE, çarpık veride yanlış tahmin → not | Tahminler 100 kat yanlış olunca ne ters gider? |
| 21 | **Tekrar: Hafta 3** | — | Test ve expand/contract'ı bir "ekip arkadaşına" anlatma | En az %70 |

## Hafta 4 — Index'ler ve sorgu planları (Gün 22–28)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 22 | 1M+ siparişte tam tablo taraması (full table scan) referansı | NC S3/S4 | **Lab:** 1M sipariş üret, sequential scan süresini ölç → referans değer | Tarama maliyeti neden satır sayısıyla değil page sayısıyla artar? |
| 23 | B-tree / B+tree yapısı ve arama | DI Böl. 2, NC S4 | **Sim:** B+tree aramasını adım adım izle → kendi cümlelerinle anlat | B+tree yaprakları neden birbirine bağlıdır? |
| 24 | B-tree ekleme, page split, fill factor; index'in yazma maliyeti | DI Böl. 2/4 | **Sim:** page split animasyonu; **Lab:** 0/3/6 index ile ekleme maliyeti | Index'ler yazmayı neden yavaşlatır? |
| 25 | Index scan, index-only scan ve bitmap scan | PG "Index-Only Scans", NC S3/S15 | **Lab:** her tarama türünü zorla → plan karşılaştırması | Index-only scan neden yine de heap'i ziyaret edebilir? |
| 26 | Bileşik (composite) index'ler ve kolon sırası; hangi sorgunun fayda göreceğini tahmin et | *Use The Index, Luke!*, NC S3 | **Sim:** bileşik index kurma oyunu; **Lab:** tahminleri doğrula | `(branch_id, created_at)` neden bir sorguya yardım eder, diğerine etmez? |
| 27 | Kısmi (partial), kapsayıcı (INCLUDE), ifade (expression) index'leri; kullanılmayan index'ler | PG "Indexes" | **Lab:** açık siparişler için kısmi index → önce ve sonra | Bir index ne zaman saf maliyettir? |
| 28 | Join algoritmaları: nested loop, hash, merge | PG "Planner/Optimizer", DI Böl. 1 | **Lab:** aynı join'i 3 planla çalıştır (planner anahtarlarıyla) → karşılaştırma | Nested loop ne zaman kazanır? |

## Hafta 5 — 1. değerlendirme, sonra depolama internals'ı (Gün 29–35)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 29 | N+1 sorguları, ORM eager/lazy loading, toplu işlem; offset ve keyset sayfalama | Prisma dokümanı, NC S7 | **Lab:** Prisma N+1 ve `include` karşılaştırması (sorgu günlüğü); **Sim:** offset ve keyset | `OFFSET 100000` neden giderek yavaşlar? |
| 30 | **30. gün değerlendirmesi** | Hafta 1–4 | 5 restoran sorgusu için index tasarla ve 3 planı oku | Kapıyı geç |
| 31 | Page, tuple, heap dosyaları, page düzeni | DI Böl. 3, PG "Database Page Layout" | **Lab:** `pageinspect`, `ctid` → page anatomisi notu | Veritabanları neden satır yerine page okur? |
| 32 | Satır ve kolon depolama; sıkıştırma ve kodlama | DDIA Böl. 3, DI Böl. 1 | Satış raporunun satır ve kolon depolamada okuyacağı bayt miktarını tahmin et → hesap | Kolon depolar neden daha iyi sıkıştırır? |
| 33 | Buffer pool, bellek hiyerarşisi, sıralı ve rastgele I/O | SP Böl. 7–9 (seçili), DI Böl. 5 | **Lab:** `pg_buffercache`, soğuk ve sıcak sorgu süreleri | İkinci çalıştırma neden hızlıdır ve ne zaman yanıltıcıdır? |
| 34 | Write-ahead log: neden, LSN, redo | DI Böl. 5, NC S16 (WAL) | **Lab:** bir insert sonrası `pg_waldump`; **Sim:** WAL adım adım | Log neden veri page'inden önce yazılır? |
| 35 | Checkpoint, fsync, `synchronous_commit` ödünleşimi | PG "WAL Configuration" | **Lab:** sync açık ve kapalıyken commit gecikmesini ölç | Sync commit kapalıyken tam olarak ne kaybedebilirsin? |

## Hafta 6 — Kurtarma, LSM, MVCC depolama (Gün 36–42)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 36 | Çökme kurtarma (crash recovery): redo, ARIES kavramları | DI Böl. 5, ARIES makalesi *(opsiyonel)* | **Lab:** yük sırasında container'ı sert kapat, yeniden başlat, günlükleri oku → deney raporu | Commit edilmiş veri çökme sonrası neden güvendedir? |
| 37 | Undo ve sürüm depolama: PostgreSQL heap sürümleri ve InnoDB undo | DI Böl. 5, NC S16 | Diyagramları karşılaştır → not | Bir satırın eski sürümü her iki motorda nerede yaşar? |
| 38 | LSM-tree: memtable, SSTable, compaction | DDIA Böl. 3, DI Böl. 7 | **Sim:** LSM yazma ve compaction adım adım | LSM yazmaları neden ucuzdur? |
| 39 | Bloom filter, tombstone; okuma/yazma/alan amplifikasyonu | DI Böl. 7, NC S3/S16 | **Sim:** Bloom filter yanlış-pozitif kaydırıcısı | Silmeler LSM'de neden iş yaratır? |
| 40 | B-tree ve LSM ödünleşimleri; motor turu (InnoDB, RocksDB, SQLite) | DI Böl. 7, NC S10 | 3 iş yükü için motor seç → ADR tarzı not | Yalnızca ekleme yapılan bir olay günlüğü için hangisi? |
| 41 | VACUUM, bloat, HOT güncellemeler, bir update neden tüm index'lere dokunur | PG "Routine Vacuuming", NC S15 | **Lab:** update döngüsü, ölü tuple'ları ve bloat'u izle | VACUUM neyi geri kazanır, neyi kazanmaz? |
| 42 | **Tekrar: Hafta 5–6** | — | Depolama anlatımı (page → buffer → WAL → disk) | En az %70 |

## Hafta 7 — ACID ve izolasyon (Gün 43–49)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 43 | ACID: gerçek garantiler ve pazarlama dili; "C" uygulamanın işidir | DDIA Böl. 7 | Her harfi kesin bir garantiye yeniden yaz → not | Hangi ACID özelliği yalnızca veritabanına bağlı değildir? |
| 44 | Anomaliler: dirty read, non-repeatable read, phantom | DDIA Böl. 7, Berenson 1995 *(opsiyonel)* | **Sim:** iki işçili zaman çizelgesinde her anomaliyi göster | Read committed hangi anomaliye izin verir? |
| 45 | PostgreSQL'de Read Committed | PG "Transaction Isolation" | **Lab:** iki oturumla non-repeatable read'i yeniden üret | PostgreSQL neden hiç dirty read göstermez? |
| 46 | Snapshot isolation / Repeatable Read; xmin/xmax görünürlüğü | DDIA Böl. 7, PG "MVCC" | **Lab:** satır sürümlerini `xmin`/`xmax` ile oku | Snapshot ve Repeatable Read PostgreSQL'de aynı şey mi? |
| 47 | Kayıp güncellemeler (lost update): atomik UPDATE, `SELECT … FOR UPDATE`, sürüm kolonu (CAS) | DDIA Böl. 7 | **Lab:** bir stok kayıp güncellemesini yeniden üret, 3 yolla düzelt | Uygulama sunucuları arasında kilitsiz hangi düzeltme işe yarar? |
| 48 | Write skew ve phantom'lar: bir masaya çifte rezervasyon | DDIA Böl. 7, NC S7 | **Lab ve Sim:** bir masa için iki rezervasyon → düzelt | Satır kilitleme tek başına write skew'u neden engellemez? |
| 49 | **Tekrar: Hafta 7** | — | Test ve bir anomali zaman çizelgesini anlatma | En az %70 |

## Hafta 8 — Kilitler, MVCC, deadlock, eşzamanlılık lab'ı (Gün 50–56)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 50 | Serializable (SSI) ve uygulamada tekrar deneme döngüleri | PG "Serializable Isolation", DDIA Böl. 7 | **Lab:** serialization failure ve tekrar deneme sarmalayıcısı → kod ve test | Serializable transaction'lar neden tekrar denenebilir olmalı? |
| 51 | Lock ve latch farkı; satır ve tablo kilit modları; `pg_locks` | DI Böl. 5, PG "Explicit Locking" | **Lab:** bir update sırasında kilitleri `pg_locks`'ta izle | Lock ile latch arasındaki fark nedir? |
| 52 | Deadlock: yeniden üret, tespit et, kilit sırasıyla çöz | PG "Deadlocks", NC S7 | **Lab ve Sim:** iki işçi deadlock'a girer → düzelt | Tutarlı kilit sırası deadlock'u neden önler? |
| 53 | 2PL, MVCC ve iyimser/kötümser eşzamanlılık kontrolü | DI Böl. 5, NC S16 | Karşılaştırma tablosu → not | İyimser kontrol ne zaman çöker? |
| 54 | DDL ve kilitler: `CREATE INDEX CONCURRENTLY`, `lock_timeout`, güvenli migration | PG "CREATE INDEX", DRE Böl. 8 | **Lab:** yazmaları bloklayan index oluşturma ile eşzamanlı oluşturma | "Zararsız" bir ALTER production'ı nasıl düşürebilir? |
| 55 | **Eşzamanlılık lab'ı:** sipariş/ödeme/stok simülatörü (fazla satış, çift tahsilat) | — | **Sim ve Lab:** N işçi, iç içe geçmeler, düzeltmeler → deney raporu | Hangi düzeltmeyi seçtin ve bedeli ne? |
| 56 | **Tekrar: Hafta 8** ve uzun süren transaction'ın maliyeti | NC S3 makalesi | Test | En az %70 |

## Hafta 9 — Performans temelleri (Gün 57–63)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 57 | Gecikme ve verim (latency, throughput); p50/p95/p99; ortalamalar neden yalan söyler | DDIA Böl. 1, SP Böl. 2 | Üretilmiş bir gecikme günlüğünden yüzdelikleri hesapla | Tek bir kullanıcının sayfa yüklemesi için p99 neden önemli? |
| 58 | Kuyruk (queueing), Little yasası, doygunluk; USE yöntemi | SP Böl. 2 | **Sim:** kuyruk doygunluğu kaydırıcısı | %90 kullanımda gecikmeye ne olur? |
| 59 | PostgreSQL'in bağlantı başına süreç modeli; bağlantı maliyeti; cursor'lar | PG "Architecture", NC S11/S15 | **Lab:** 100 bağlantı aç, belleği izle | Bağlantılar PostgreSQL'de neden pahalıdır? |
| 60 | **60. gün değerlendirmesi** | Hafta 5–8 | Bir eşzamanlılık hatasını yeniden üret, düzelt ve depolamayı anlat | Kapıyı geç |
| 61 | Connection pooling: boyutlandırma, PgBouncer modları, zaman aşımları | PgBouncer dokümanı, NC S7 | **Lab:** pooler'lı ve pooler'sız pgbench → **Sim:** pool doygunluğu | Daha büyük bir pool neden daha yavaş olabilir? |
| 62 | Serverless bağlantılar; Neon pooler *(Neon kurulumu yalnızca öğrenci onayıyla)* | Neon dokümanı (doğrulanacak) | Deploy şekilli test: cold start ve pool'lanmış bağlantı | 1.000 fonksiyon ayrı ayrı bağlantı açınca ne bozulur? |
| 63 | **Tekrar: Hafta 9** | — | Test | En az %70 |

## Hafta 10 — Ayarlama, benchmark, önbellekleme (Gün 64–70)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 64 | Sorgu ayarlama yöntemi: `pg_stat_statements`, `auto_explain` | PG dokümanı, SP Böl. 5 | **Lab:** en pahalı 3 sorguyu bul | Neden tek bir sorgudan değil iş yükünden başlanır? |
| 65 | Benchmark tasarımı: pgbench, sıcak ve soğuk, temsil edici hacim | SP Böl. 12 | Bir benchmark planı yaz ve çalıştır → deney raporu | Bir benchmark'ın yalan söyleyebileceği 3 yolu say. |
| 66 | Önbellek katmanları, geçersiz kılma (invalidation), bayat veri | DDIA Böl. 11 (türetilmiş veri), NC S12 | **Sim:** bayat okumalı cache-aside | Bayat bir menü fiyatı ne zaman kabul edilebilir, ne zaman değil? |
| 67 | Zaman aşımları, tekrar denemeler, geri basınç (backpressure); `statement_timeout` | DRE Böl. 4, SP Böl. 2 | **Lab:** tekrar deneme fırtınası simülasyonu → jitter ve limitlerle düzelt | Tekrar denemeler bir kesintiyi nasıl kötüleştirir? |
| 68 | `COUNT(*)`, `SELECT *`, büyük sonuç kümeleri, NULL numaraları | NC S15/S16 | **Lab:** her birini ölç → not | `COUNT(*)` büyük bir PostgreSQL tablosunda neden yavaştır? |
| 69 | learning-app'te **performans paneli** ve deney yazısı | — | Gerçek lab sayılarıyla (açıkça etiketli) panel | Hangi sonuç seni şaşırttı ve neden? |
| 70 | **Tekrar: Hafta 10** | — | Test | En az %70 |

## Hafta 11 — Replikasyon, partitioning, sharding, tutarlılık (Gün 71–77)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 71 | Primary/replica; senkron ve asenkron; streaming replikasyon | DDIA Böl. 5, NC S8 | **Lab:** 2 container'lı streaming replikasyon | Asenkron replikasyon neyden vazgeçmek demektir? |
| 72 | Replikasyon gecikmesi; kendi yazdığını okuma (read-your-writes), monoton okumalar | DDIA Böl. 5 | **Lab ve Sim:** ödeme sonrası bayat okuma | Kullanıcıya kendi taze yazısını nasıl gösterirsin? |
| 73 | Failover, split brain, lider seçimi | DDIA Böl. 8–9, DI Böl. 10 | **Sim:** failover zaman çizelgesi → runbook taslağı | Otomatik failover neden risklidir? |
| 74 | Deklaratif partitioning (siparişleri aya göre) | PG "Table Partitioning", NC S5 | **Lab:** partition'lı siparişler ve planlarda partition pruning | Partitioning bir sorguyu ne zaman hızlandırmaz? |
| 75 | Sharding: anahtar seçimi, hash ve range, tutarlı hash, sıcak noktalar, yeniden dengeleme | DDIA Böl. 6, NC S6 | Tenant'lar için shard anahtarı seç → ADR | "Büyük bir tenant" neden sıcak noktadır? |
| 76 | Tutarlılık modelleri, CAP/PACELC, quorum'lar; 2PC; outbox deseni | DDIA Böl. 9, DI Böl. 11/13 | **Sim:** quorum R/W kaydırıcısı; outbox tasarımı | Dağıtık transaction yerine neden outbox tercih edilir? |
| 77 | **Tekrar: Hafta 11** | — | Test | En az %70 |

## Hafta 12 — Güvenilirlik, güvenlik, operasyon (Gün 78–84)

| Gün | Hedef | Kaynak | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|---|
| 78 | Yedekler: mantıksal ve fiziksel (`pg_dump` ve `pg_basebackup`); **geri yükleme tatbikatı** | DRE Böl. 7, PG "Backup and Restore" | **Lab:** yedek al, sil, geri yükle, satır sayılarını doğrula | Hiç geri yüklemediğin bir yedek nedir? |
| 79 | WAL arşivleme ile PITR; RPO/RTO | DRE Böl. 7, PG "Continuous Archiving" | **Lab:** hatalı bir DELETE'ten hemen öncesine kurtar | RPO'nu ne belirler? |
| 80 | SLO'lar, izleme, alarm, kapasite planlama | DRE Böl. 2/4 | Restoran API'si için 3 SLO ve alarm tanımla | Hangi metrik seni gece 3'te uyandırırdı? |
| 81 | Güvenlik: roller, en az ayrıcalık, tenant'lar için RLS, TLS, sırlar (secret) | DRE Böl. 9, PG "Client Authentication", NC S13 | **Lab:** DDL yetkisiz uygulama rolü ve RLS politikası testi | Uygulama kullanıcısı yapmaması gereken neyi yapabiliyor? |
| 82 | Veri yaşam döngüsü: saklama süresi, silme, gizlilik, güvenli test verisi, denetim | DRE Böl. 9 | Saklama politikası ve soft/hard delete ADR'si | "Satırı sil" neden KVKK/GDPR için yeterli değildir? |
| 83 | Veritabanı testi: entegrasyon testleri, fixture'lar, izolasyon, migration testleri | Prisma/PG dokümanı | **Lab:** her çalıştırmada test DB'si ve migration testi | Testlerin durumu paylaşmasını nasıl engellersin? |
| 84 | **Tekrar: Hafta 11–12** ve capstone kapsamı | — | Capstone kapsam belgesi | Kapsam üzerinde anlaşıldı |

## Hafta 13 — Capstone ve savunma (Gün 85–90)

| Gün | Hedef | Uygulama → Çıktı | Öz-kontrol |
|---|---|---|---|
| 85 | Capstone yapım 1: şema, index'ler ve transaction'ları birleştir | Çalışan bir özellik dilimi ve testler | Değişmez kuralları geçiyor mu? |
| 86 | Capstone yapım 2: eşzamanlılığa dayanıklı sipariş ve ödemeler | Simülatör senaryosu ve düzeltme | Fazla satışı yeniden üretip önleyebiliyor musun? |
| 87 | Capstone deneyleri: performans ve planlar | Önce/sonra karşılaştırmalı deney raporu | Sonuçlar tekrarlanabilir mi? |
| 88 | Arıza tatbikatları: çökme, replika gecikmesi, geri yükleme | Tatbikat raporları ve runbook | Ölçtüğün RTO neydi? |
| 89 | **90. gün değerlendirmesi, 1. kısım:** yazılı senaryolar | Senaryo cevapları | Kapıyı geç |
| 90 | **Sözlü savunma**, geriye bakış ve telafi planı | LEARNING_PROGRESS'te son kayıt | Dürüst seviye değerlendirmesi |

---

## learning-app artışları (yalnızca müfredat o konuya geldiğinde yapılır)

| Hafta | Artış |
|---|---|
| 1 | İskelet, `/tutorial/[day]` rotası, gün listesi, ilerleme, 1–2. gün içeriği, DBMS mimarisi diyagramı |
| 2 | Normalizasyon sürükle-bırak, ER şema gezgini |
| 3 | Idempotency (ödemeye çift tıklama) simülasyonu |
| 4 | B+tree arama ve page split adım adım, bileşik index oyunu |
| 5 | Offset ve keyset simülasyonu, WAL adım adım |
| 6 | LSM compaction ve Bloom filter simülasyonları |
| 7–8 | **Transaction ve eşzamanlılık simülatörü** (çok işçili zaman çizelgesi: anomaliler, deadlock'lar, fazla satış) |
| 9–10 | Kuyruk/pool doygunluğu simülasyonu, önbellek bayatlığı simülasyonu, performans paneli |
| 11 | Replikasyon gecikmesi, failover zaman çizelgesi, quorum kaydırıcısı |
| 12–13 | Şema sürüm geçmişi görünümü, capstone cilası |

## 1. gün başlangıç seviyesinden sonraki ayarlamalar (2026-11-11)

1. **SQL ısınması, 2–21. günler:** her gün restoran şemasında 10–15 dakikalık SQL pratiğiyle başlar: join'ler, GROUP BY/HAVING, alt sorgular/CTE'ler, window fonksiyonları, sonra DDL ve kısıtlar. Ayrı haftalar olarak eklenmedi, günlerin içine işlendi.
2. **Anlama hızında ilerleme:** 90 *hedef* aynı kalır, ama takvim uzayabilir (gerçekçi tahmin 100–120 gün). Zayıf bir öz-kontrol ya da kapı sonrasında telafi günleri serbestçe eklenir.
3. **Sıfırdan öğretim:** her ders "bu hangi sorunu çözüyor?" sorusu ve sade bir benzetmeyle başlar, internals'a ondan sonra geçilir.
4. **İş alanına bağlama:** öğrencinin günlük alanı (sipariş, depo, envanter) her yerde ana örnektir, her zaman sentetik veriyle. 7–8. haftalar (envanter eşzamanlılığı) ekstra lab süresi alır.

## Telafi politikası

Kaçırılan günler birikmez. Tamamlanmamış bir sonraki hedeften devam edilir. Bir kapı zayıf bir alan gösterirse telafi günleri eklenir ve geri kalan plan kaydırılır. Önde gidiyorsan tekrar günleri birleştirilebilir.

## Kapsam dışı (dürüstçe)

Her PostgreSQL parametresinin DBA düzeyinde ayarı, optimizer kaynak kodu, derin MySQL/NoSQL uzmanlığı (yalnızca karşılaştırma), sıfırdan dağıtık veritabanı yazmak ve production olay deneyimi. 90 gün, güçlü bir kavramsal middle düzeyi anlayış ve junior+ seviyesinden middle başlangıcına uzanan pratik beceriler kazandırır. Kimseyi senior mühendis yapmaz.
