import type { Lesson } from "./types";

export const day02: Lesson = {
  day: 2,
  title: "Veritabanı, DBMS ve storage engine: harita",
  goals: [
    "Sık karıştırılan üç kelimeyi ayırt etmek: veritabanı (database), DBMS ve storage engine.",
    "Bir DBMS'in ana bileşenlerini ve her birinin sorumluluğunu adlandırmak.",
    "Bir sorguyu PostgreSQL'de, istemciden geri dönen satırlara kadar izlemek.",
    "Bu parçalardan bazılarını kendi lab veritabanında çalışırken görmek.",
  ],
  recap:
    "Dün her sonucun bir grain'i olduğunu ve SQL'in yazıldığından farklı bir sırayla işlendiğini (FROM, SELECT'ten önce) öğrendin. Bugün bir adım geri çekilip Execute'a bastığın an ile satırların ekrana geldiği an arasında veritabanının ne yaptığına bakıyoruz. İfadelerin sırası bu hikâyenin yalnızca ilk kısmıydı.",
  concept: [
    {
      heading: "Kolayca karıştırılan üç kelime",
      paragraphs: [
        "Veritabanı (database), verinin kendisi, yani düzenlenmiş veri topluluğudur; örneğin bir restoran şirketinin verisi. PostgreSQL'de bir sunucu adlandırılmış birkaç veritabanı barındırabilir; bizimkinin adı restaurant.",
        "DBMS (veritabanı yönetim sistemi), veritabanlarını yöneten yazılımdır: bağlantıları kabul eder, sorgularını anlar, birçok kullanıcının aynı anda çalışmasına izin verir ve veriyi güvende tutar. PostgreSQL, SQL Server ve MySQL birer DBMS'tir. İnsanlar \"veritabanı yavaş\" dediğinde genellikle DBMS'i ya da onun bir parçasını kastederler.",
        "Storage engine (depolama motoru), DBMS'in veriyi diskte saklamaktan, bulmaktan ve kurtarmaktan sorumlu parçasıdır. PostgreSQL'de tablo depolaması, table access method adlı takılabilir bir bileşendir ve yerleşik varsayılan heap'tir. Bizim lab'da SHOW default_table_access_method komutu heap döndürüyor. MySQL gibi bazı sistemler motoru tablo başına seçmene izin verir. Bu son nokta genel bir bilgidir ve 40. günde doğrulayacağız.",
      ],
    },
    {
      heading: "Bir DBMS'in haritası",
      paragraphs: [
        "Petrov, Database Internals, 1. bölüm, yaygın bir yerleşim anlatır. İstemci istekleri bir transport alt sistemi üzerinden gelir. Bir sorgu işlemcisi (query processor) sorguyu ayrıştırır ve doğrular. Optimizer, onu yanıtlamanın en ucuz yolunu arar ve bir yürütme planı (execution plan) üretir. Yürütme motoru (execution engine) planı uygular. Yerel veri işini storage engine yapar; onun bir transaction manager'ı, bir lock manager'ı, erişim yöntemleri (heap dosyaları, B-tree'ler, LSM-tree'ler), page'leri bellekte tutan bir buffer manager'ı ve günlüğü tutan bir recovery manager'ı vardır.",
        "Aynı bölüm ortak bir plan olmadığı konusunda da uyarır: her veritabanı biraz farklı kurulur ve kâğıt üzerinde var olan sınırlar, performans optimizasyonları yüzünden kodda bulanıklaşabilir. Yani \"storage engine nerede biter, sorgu işlemcisi nerede başlar?\" sorusunun dürüst cevabı iki parçalıdır. Fikir olarak: sorgu işlemcisi ne yapılacağına karar verir, storage engine bunu yerel veriye güvenle uygular. Gerçek kodda: çizgi tam keskin değildir.",
      ],
    },
    {
      heading: "PostgreSQL'de bir sorgunun yolu",
      paragraphs: [
        "PostgreSQL dokümanı yolu beş aşamada anlatır: bağlantı, parser, rewrite sistemi, planner/optimizer, executor. Parser söz dizimini kontrol eder ve bir sorgu ağacı kurar. Rewrite sistemi sistem kataloglarında saklanan kuralları uygular; view'lar böyle çalışır, çünkü bir view'a yazılan sorgu alttaki tabloları okuyacak şekilde yeniden yazılır. Planner, aynı sonucu elde etmek için birkaç aday yol çıkarır, örneğin sequential scan ya da index scan, her birinin maliyetini tahmin eder ve en ucuzunu tutar. Executor planı yürür, depolama sisteminden satırları ister ve sıralama, join ve filtrelemeyi yapar.",
        "Aşağıdaki gezgini kullan. Bu basitleştirilmiş bir modeldir ve neyi dışarıda bıraktığını söyler.",
      ],
    },
    {
      heading: "Bir sunucu, birden fazla süreçtir",
      paragraphs: [
        "PostgreSQL istemci/sunucu modeli kullanır. Gözetmen (supervisor) bir süreç sürekli yeni istemcileri dinler ve her bağlantı için, yalnızca o istemciye hizmet eden yeni bir sunucu süreci başlatır (fork eder). PostgreSQL'de bağlantıların bedava olmaması bu yüzdendir; bu bilgi connection pooling haftasında önem kazanacak.",
        "Bağlantı başına bu süreçlerin yanında, kimin bağlı olduğundan bağımsız olarak yapılması gereken işler için çalışan arka plan süreçleri de vardır. Lab'ında bunları kendin listeleyebilirsin; bugünün deneyi bu.",
      ],
    },
  ],
  visual: "query-path",
  workedExample: {
    title: "Çalışan PostgreSQL'inin içine bak",
    steps: [
      "Bir terminal aç ve lab container'ının içinde psql'i başlat.",
      "psql'de bir SQL ifadesi ancak noktalı virgülle (;) biter. Prompt restaurant=# ise yeni komut hazırdır; restaurant-# ise psql ifadenin devamını bekliyordur: ; yaz ya da Ctrl+C ile vazgeç. Çıkmak için \q yaz. Ayrıca cmd'de yapıştırmak için sağ tık ya da Shift+Insert kullan; Ctrl+V bazı konsollarda gizli bir ^V karakteri ekler.",
      "Varsayılan table access method'un hangisi olduğunu ve hangi erişim yöntemlerinin var olduğunu sor.",
      "Sunucunun süreçlerini pg_stat_activity ile listele.",
      "Her backend_type'ı haritayla eşleştir: hangileri bağlantı başına, hangileri arka plan işi?",
    ],
    code: {
      label: "Bir terminalde çalıştır (Docker Desktop açık olmalı)",
      language: "bash",
      text: `# 1) Terminalde (cmd ya da PowerShell) psql'i aç:
docker exec -it dblab-postgres psql -U lab -d restaurant

-- 2) psql'in içinde, her ifadeyi ; ile bitir ve ayrı ayrı gönder:
SHOW default_table_access_method;
SELECT amname, amtype FROM pg_am ORDER BY amtype, amname;
SELECT backend_type FROM pg_stat_activity ORDER BY backend_type;`,
    },
  },
  challenge: {
    task: "İki oturum açıkken client backend sayısını say.",
    predictFirst:
      "İkinci bir terminalde başka bir psql oturumu açıp pg_stat_activity sorgusunu yeniden çalıştırırsan, backend_type = 'client backend' olan kaç satır beklersin ve neden?",
    hints: [
      "Kuralı hatırla: bağlantı başına bir sunucu süreci.",
      "Sorguyu çalıştıran oturum da bir bağlantıdır.",
      "Grafik arayüzlü bir SQL istemcisi kendi bağlantılarını açabilir. Önce onu kapat, yoksa fazladan satır bekle.",
    ],
    expectedOutput:
      "Açık her bağlantı için bir client backend, sorguyu çalıştıran da dahil. Bağlı başka bir şey yokken iki psql oturumuyla 2 görmelisin. Biz lab'ımızda tek oturum açıkken bunu çalıştırdığımızda 1 client backend gördük; yanında checkpointer, background writer, walwriter, autovacuum launcher, logical replication launcher ve üç io worker gibi arka plan süreçleri de vardı. Bu liste PostgreSQL 18.6'ya ve varsayılan ayarlara özgüdür; başka sürümlerde ya da ayarlarda farklı olabilir.",
    code: {
      label: "İlk oturumda çalıştırılacak sorgu",
      language: "sql",
      text: `SELECT backend_type, count(*)
FROM pg_stat_activity
GROUP BY backend_type
ORDER BY backend_type;`,
    },
  },
  knowledgeCheck: [
    {
      id: "d2-dbms",
      prompt: "Bunlardan hangisi bir DBMS'tir?",
      options: [
        "orders tablosu",
        "restaurant adlı bir veritabanı",
        "PostgreSQL",
        "heap table access method'u",
      ],
      answer: 2,
      explanation:
        "PostgreSQL, veritabanlarını yöneten yazılımdır. restaurant bir veritabanı, orders onun içindeki bir tablo, heap ise DBMS'in bir depolama bileşenidir.",
    },
    {
      id: "d2-planner",
      prompt:
        "Sorgun için sequential scan ile index scan arasında hangi aşama seçim yapar?",
      options: ["Parser", "Rewrite sistemi", "Planner/optimizer", "Executor"],
      answer: 2,
      explanation:
        "Planner aday yollar üretir, maliyetlerini tahmin eder ve en ucuzunu seçer. Seçilen planı sonra executor uygular.",
    },
    {
      id: "d2-views",
      prompt:
        "PostgreSQL'de bir view'a yazılan sorgu hangi aşamada alttaki tablolara açılır?",
      options: ["Parser", "Rewrite sistemi", "Planner/optimizer", "Storage engine"],
      answer: 1,
      explanation:
        "Rewrite sistemi sistem kataloglarındaki kuralları uygular; view'lar böyle çalışır.",
    },
    {
      id: "d2-connections",
      prompt: "PostgreSQL aynı anda birçok istemciye nasıl hizmet verir?",
      options: [
        "Tüm istemcileri tek bir süreç içinde çalıştırır",
        "Her bağlantı için yeni bir sunucu süreci başlatır",
        "İlki bitene kadar ikinci bir bağlantıyı reddeder",
        "Her sorguyu farklı bir sunucuya gönderir",
      ],
      answer: 1,
      explanation:
        "Gözetmen bir süreç istemcileri bekler ve PostgreSQL dokümanında anlatıldığı gibi her bağlantı için ayrı bir sunucu süreci fork eder.",
    },
    {
      id: "d2-boundary",
      prompt:
        "Petrov'a göre DBMS bileşenleri arasındaki sınırlar ne kadar nettir?",
      options: [
        "Her zaman tamamen keskin ve her veritabanında aynı",
        "Görmesi biraz zor; ortak bir plan yok ve kod, performans için bileşenleri birbirine bağlayabilir",
        "Hiç bileşen yok",
        "Yalnızca storage engine'in sınırları vardır",
      ],
      answer: 1,
      explanation:
        "Petrov, her veritabanının biraz farklı kurulduğunu ve bileşen sınırlarının görülmesinin ve tanımlanmasının biraz zor olduğunu söyler.",
    },
  ],
  references: [
    {
      title: "51.1. The Path of a Query (PostgreSQL 18 documentation)",
      by: "The PostgreSQL Global Development Group",
      url: "https://www.postgresql.org/docs/18/query-path.html",
      accessed: "2026-11-11",
      note: "Beş aşama: bağlantı, parser, rewrite sistemi, planner/optimizer, executor.",
    },
    {
      title: "1.2. Architectural Fundamentals (PostgreSQL 18 documentation)",
      by: "The PostgreSQL Global Development Group",
      url: "https://www.postgresql.org/docs/18/tutorial-arch.html",
      accessed: "2026-11-11",
      note: "İstemci/sunucu modeli; bağlantı başına bir sunucu süreci.",
    },
    {
      title: "Chapter 62. Table Access Method Interface Definition (PostgreSQL 18)",
      by: "The PostgreSQL Global Development Group",
      url: "https://www.postgresql.org/docs/18/tableam.html",
      accessed: "2026-11-11",
      note: "Tablo depolaması takılabilirdir; heap referans uygulamadır.",
    },
    {
      title: "Database Internals, 1. bölüm, \"DBMS Architecture\" kısmı",
      by: "Alex Petrov, O'Reilly, 2019",
      note: "Bir DBMS'in bileşenleri; sınırlar bulanıktır.",
    },
    {
      title: "Ders lab'ında gözlem: Docker'da PostgreSQL 18.6",
      by: "Bu deponun db-lab'ında 2026-11-11'de çalıştırıldı",
      note: "default_table_access_method = heap; backend türleri görevde listelendi.",
    },
  ],
  reflection:
    "Raporların bazen yavaş çalışıyor, stok sayıların bazen yanlış çıkıyor. Her durumda haritanın hangi kutularından şüphelenirdin ve neden? Tek bir doğru cevap yok; bunu programın sonunda yeniden ele alacağız.",
};
