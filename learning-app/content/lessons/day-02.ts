import type { Lesson } from "./types";

export const day02: Lesson = {
  day: 2,
  title: "Veritabanı bir restorandır: kim kimdir?",
  goals: [
    "Dört kelimeyi restoran benzetmesiyle ayırt etmek: veritabanı, DBMS, storage engine, bağlantı.",
    "Bir SQL sorgusunun restorandaki bir sipariş gibi yol aldığını görmek.",
    "Kendi lab'ında \"kaç garson çalışıyor?\" sorusunun cevabını görmek.",
  ],
  recap:
    "Dün grain kavramını öğrendin: sonuçtaki bir satırın neyi temsil ettiği. Bugün sorguların kendisinden bir adım geri çekiliyoruz ve şunu soruyoruz: sorguyu kime gönderiyorsun, kim cevaplıyor? Bugünkü dört kelimeyi tanıdık bir yerden, restorandan öğreneceğiz.",
  recall: [
    {
      question: "Sonuçtaki bir satırın neyi temsil ettiğine ne denir?",
      answer: "Grain (ayrıntı düzeyi). Örneğin JOIN'den sonra bir satır bir sipariş değil, bir sipariş kalemidir.",
    },
    {
      question: "GROUP BY gruplardan sonra grupları hangi ifade filtreler?",
      answer: "HAVING. WHERE ise gruplamadan önce tek tek satırları filtreler.",
    },
  ],
  analogy: {
    intro:
      "Veritabanı dünyasını bir restoran gibi düşün. Bu dünyayı işinden zaten çok iyi biliyorsun: sipariş, mutfak, depo, garson.",
    rows: [
      { term: "Veritabanı (database)", analogy: "Depodaki malzemeler. Yani verinin kendisi: siparişler, ürünler, fiyatlar." },
      { term: "DBMS (PostgreSQL, SQL Server)", analogy: "Restoranın tüm işletmesi: personel, mutfak, kurallar. Depoyu kullanan ve yöneten organizasyon." },
      { term: "Storage engine (depolama motoru)", analogy: "Depo sorumlusu. Malzemeyi rafa yerleştirir, istenince bulup getirir, kaybolmasın diye kayıt tutar." },
      { term: "Bağlantı (connection)", analogy: "Masana ayrılmış garson. Her müşteriye (her bağlantıya) ayrı bir garson." },
      { term: "SQL sorgusu", analogy: "Sipariş fişi. Ne istediğini yazarsın; nasıl hazırlanacağı mutfağın işidir." },
    ],
  },
  newTerms: [
    { term: "Veritabanı (database)", plain: "Verinin kendisi: düzenli tutulan bilgiler. Bizim lab'daki adı restaurant." },
    { term: "DBMS", plain: "Veritabanını yöneten yazılım. PostgreSQL ve SQL Server birer DBMS'tir." },
    { term: "Storage engine", plain: "DBMS'in, veriyi diske yazan, bulan ve kaybolmaktan koruyan parçası." },
    { term: "Bağlantı (connection)", plain: "Senin programınla veritabanı sunucusu arasındaki açık hat. PostgreSQL her bağlantıya ayrı bir sunucu süreci ayırır." },
  ],
  concept: [
    {
      heading: "Neden bu kelimeler önemli?",
      paragraphs: [
        "İşte biri \"veritabanı yavaş\" dediğinde aslında dört şeyden birini kastediyor olabilir: verinin kendisi çok mu büyüdü (veritabanı), yazılım mı zorlanıyor (DBMS), diske yazma okuma mı yavaş (storage engine), yoksa çok fazla kişi aynı anda mı bağlı (bağlantılar)? Doğru kelimeyi bilmek, doğru yeri aramak demektir.",
      ],
    },
    {
      heading: "Restoranda bir sipariş",
      paragraphs: [
        "Masaya oturursun, garsona sipariş fişini verirsin. Garson fişi mutfağa götürür. Mutfak fişi okur ve nasıl hazırlanacağına karar verir. Depo sorumlusu gereken malzemeyi depodan bulup getirir. Tabak hazırlanır ve masana gelir.",
        "Veritabanında da aynısı olur: sen (ya da programın) bir SQL sorgusu yazarsın, sorgu bağlantın üzerinden gider, DBMS onu anlar ve karar verir, storage engine veriyi diskten bulur, sonuç tablosu sana döner. Mutfağın içinde tam olarak neler olduğunu yarın (3. gün) adım adım göreceğiz.",
      ],
    },
    {
      heading: "Garson sayısı = bağlantı sayısı",
      paragraphs: [
        "PostgreSQL her bağlantı için ayrı bir sunucu süreci başlatır; bu süreç yalnızca o bağlantıya hizmet eder. Restoranda bu, her masaya ayrı bir garson demektir. Sen iki psql penceresi açınca client backend sayısı 2 çıktı: iki masa, iki garson.",
        "Bir de kimse gelmese de çalışan personel var: kayıt defterini yazan, temizliği başlatan, depoyu düzenleyen kişiler. Lab'da gördüğün checkpointer, walwriter, autovacuum launcher gibi satırlar bunlar. Her birini ileriki günlerde tek tek tanıyacağız; şimdilik \"arka planda çalışan ekip\" demen yeterli.",
      ],
    },
  ],
  workedExample: {
    title: "Kaç garson çalışıyor?",
    steps: [
      "Bir terminal aç ve psql'e bağlan (aşağıdaki ilk satır). Artık bir bağlantın, yani bir garsonun var.",
      "psql'de bir SQL ifadesi ancak noktalı virgülle (;) biter. Prompt restaurant=# ise yeni komut hazırdır; restaurant-# ise psql devamını bekliyordur: ; yaz ya da Ctrl+C ile vazgeç. Çıkmak için \\q yaz. cmd'de yapıştırmak için sağ tık ya da Shift+Insert kullan; Ctrl+V gizli bir ^V karakteri ekleyebilir.",
      "Sorguyu çalıştır ve client backend satırına bak: bu sayı, şu an açık olan bağlantı (garson) sayısıdır.",
      "Diğer satırlar arka plan ekibidir. Kimse bağlı olmasa da çalışırlar.",
    ],
    code: {
      label: "Bir terminalde çalıştır (Docker Desktop açık olmalı)",
      language: "bash",
      text: `# 1) Terminalde (cmd ya da PowerShell) psql'i aç:
docker exec -it dblab-postgres psql -U lab -d restaurant

-- 2) psql'in içinde (sonunda ; olsun):
SELECT backend_type, count(*) FROM pg_stat_activity GROUP BY backend_type ORDER BY 1;`,
    },
  },
  challenge: {
    task: "Üç oturum açıkken kaç garson olduğunu bul. Sonra birini kapat ve tekrar bak.",
    predictFirst:
      "Üç ayrı terminalde psql açıkken client backend kaç çıkar? Birini \\q ile kapatınca ne olur?",
    hints: [
      "Kural: her bağlantıya ayrı bir garson (sunucu süreci).",
      "Sorguyu çalıştırdığın pencere de bir bağlantıdır.",
      "DBeaver gibi bir program açıksa o da kendi bağlantılarını açar; sayı fazladan artabilir.",
    ],
    expectedOutput:
      "Üç oturum açıkken client backend = 3. Birini kapatınca 2'ye düşer. Arka plan ekibinin sayısı değişmez. Sen iki oturumla 2 gördün (2026-11-22, lab'ında), yani kural tuttu.",
  },
  knowledgeCheck: [
    {
      id: "d2-depot",
      prompt: "Restoran benzetmesinde \"depodaki malzemeler\" neyi temsil eder?",
      options: ["DBMS", "Veritabanı (verinin kendisi)", "Storage engine", "Bağlantı"],
      answer: 1,
      explanation:
        "Malzemeler verinin kendisidir, yani veritabanı. Onları yöneten organizasyon DBMS, yerleştirip bulan kişi storage engine'dir.",
    },
    {
      id: "d2-dbms",
      prompt: "PostgreSQL hangisidir?",
      options: ["Bir veritabanı", "Bir DBMS (veritabanını yöneten yazılım)", "Bir tablo", "Bir sorgu"],
      answer: 1,
      explanation:
        "PostgreSQL bir yazılımdır; içinde restaurant gibi veritabanlarını yönetir. Restoranda bu, işletmenin kendisidir.",
    },
    {
      id: "d2-engine",
      prompt: "Malzemeyi rafa yerleştiren, istenince bulup getiren ve kaybolmasın diye kayıt tutan kişi hangisidir?",
      options: ["Garson (bağlantı)", "Müşteri", "Depo sorumlusu (storage engine)", "Sipariş fişi (SQL)"],
      answer: 2,
      explanation:
        "Storage engine, DBMS'in veriyi diske yazan, bulan ve kaybolmaktan koruyan parçasıdır.",
    },
    {
      id: "d2-waiters",
      prompt: "İki psql penceresi açıkken client backend neden 2 çıktı?",
      options: [
        "PostgreSQL her bağlantıya ayrı bir sunucu süreci (garson) ayırır",
        "Her tablo için bir süreç vardır",
        "Docker her zaman iki tane başlatır",
        "Rastgele bir sayıdır",
      ],
      answer: 0,
      explanation:
        "İki bağlantı, iki sunucu süreci. Üçüncü pencereyi açarsan 3 olur.",
    },
  ],
  feynman:
    "Bir arkadaşına (ya da 12 yaşında birine) 4–5 cümleyle anlat: veritabanı, DBMS, storage engine ve bağlantı nedir? Restoran benzetmesini kullan, teknik kelimeleri olabildiğince az kullan. Takıldığın ya da emin olamadığın kelimeyi işaretle: o, geri dönüp bakman gereken yerdir. Yazdığını bana gönder; ben de boşlukları birlikte doldurayım.",
  references: [
    {
      title: "1.2. Architectural Fundamentals (PostgreSQL 18 documentation)",
      by: "The PostgreSQL Global Development Group",
      url: "https://www.postgresql.org/docs/18/tutorial-arch.html",
      accessed: "2026-11-11",
      note: "İstemci/sunucu modeli; her bağlantı için ayrı bir sunucu süreci.",
    },
    {
      title: "Database Internals, 1. bölüm, \"DBMS Architecture\" kısmı",
      by: "Alex Petrov, O'Reilly, 2019",
      note: "Bir DBMS'in bileşenleri ve storage engine'in görevleri.",
    },
    {
      title: "Senin lab gözlemin: Docker'da PostgreSQL 18.6",
      by: "2026-11-22, iki psql oturumuyla",
      note: "client backend = 2; arka plan ekibi: autovacuum launcher, background writer, checkpointer, io worker ×3, logical replication launcher, walwriter.",
    },
  ],
  reflection:
    "İşte biri \"veritabanı yavaş\" derse, bu dört parçadan hangisinde sorun olabilir? Henüz bilmen gerekmiyor, sadece tahmin et ve nedenini bir cümleyle yaz.",
};
