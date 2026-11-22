import type { Lesson } from "./types";

export const day01: Lesson = {
  day: 1,
  title: "Seviye tespiti ve grain kavramı",
  goals: [
    "Dürüst bir başlangıç noktası kaydetmek, böylece plan sana göre ayarlanabilsin.",
    "Grain kelimesini öğrenmek: sonuçtaki bir satırın neyi temsil ettiği.",
    "Değerleri doğru grain'de karşılaştırmak için GROUP BY ve HAVING kullanmak.",
  ],
  recap:
    "Bugün programın ilk günü, o yüzden hatırlanacak bir şey yok. Başlangıç seviyen LEARNING_PROGRESS.md dosyasına yazıldı: SQL paslı, veritabanı mühendisliğinin geri kalanı sıfırdan başlıyor ve bu, başlamak için gayet iyi bir yer.",
  analogy: {
    intro:
      "Grain'i restorandaki bir fişle düşün. Bir fişin bir toplamı ve birkaç kalemi vardır.",
    rows: [
      { term: "orders tablosu", analogy: "Fişin kendisi: fiş numarası, tarih ve fişin altında yazan TOPLAM." },
      { term: "order_lines tablosu", analogy: "Fişin kalemleri: 1 Pizza 12,50; 1 Salata 9,00; …" },
      { term: "JOIN sonrası bir satır", analogy: "Bir kalem, yanında fişin toplamı da yazılı olarak. Toplam her kalemde tekrar eder." },
      { term: "GROUP BY order_id", analogy: "Kalemleri yeniden kendi fişlerinin altında toplamak." },
    ],
  },
  newTerms: [
    { term: "Grain", plain: "Sonuçtaki bir satırın neyi temsil ettiği: bir fiş mi, bir kalem mi?" },
    { term: "GROUP BY", plain: "Satırları gruplara toplar; örneğin kalemleri fişlerine göre." },
    { term: "HAVING", plain: "Gruplar oluştuktan sonra grupları filtreler (WHERE ise önce tek tek satırları)." },
  ],
  concept: [
    {
      heading: "Neden bir seviye tespiti?",
      paragraphs: [
        "Zaten bildiklerini yok sayan bir plan zaman kaybettirir, çok şey varsayan bir plan ise seni kaybeder. Seviye tespiti bir not değildir. Dürüst bir \"bilmiyorum\" en işe yarar cevaptır, çünkü planın nerede yavaşlaması gerektiğini söyler.",
      ],
    },
    {
      heading: "Grain: bir satır neyi temsil ediyor?",
      paragraphs: [
        "Her sorgu sonucunun bir grain'i (ayrıntı düzeyi) vardır: bir satırın temsil ettiği şey. order_lines tablosunda bir satır, bir siparişteki bir üründür. orders tablosunda bir satır, bir siparişin kendisidir. İkisini JOIN edince grain hâlâ sipariş satırı başına bir satırdır ve siparişin toplamı, o siparişin her satırında tekrar görünür.",
        "Sonra siparişin toplamını tek bir satırın tutarıyla karşılaştırırsan, farklı grain'deki şeyleri karşılaştırmış olursun. Karşılaştırma hiç hata vermeden çalışır ve yanlış sonuç verir. Tehlikeli hatalar bunlardır.",
        "GROUP BY order_id grain'i değiştirir: birçok satır sipariş başına tek satıra iner ve SUM tutarları toplar. HAVING da bu gruplanmış satırları filtreler; WHERE ise gruplamadan önce tek tek satırları filtreler.",
      ],
    },
    {
      heading: "SQL, yazdığın sırayla değil başka bir sırayla işlenir",
      paragraphs: [
        "SELECT'i ilk yazarsın, ama veritabanı mantıksal olarak önce FROM'u, sonra WHERE'i, GROUP BY'ı, HAVING'i işler ve SELECT en sona kalır. Bu sırayı bilmek, SELECT'te tanımladığın bir kolon takma adının (alias) neden WHERE'de kullanılamadığını açıklar. Yarın Execute'a bastıktan sonra veritabanının içinde gerçekte ne olduğuna bakacağız.",
      ],
    },
  ],
  workedExample: {
    title: "Saklanan toplamı satırlarıyla uyuşmayan siparişleri bul",
    steps: [
      "Satır grain'inde başla: her sipariş satırı için bir satır.",
      "orders ile order_lines'ı JOIN et; böylece her satır kendi siparişinin toplamını taşır.",
      "Siparişe (id ve total) göre GROUP BY yap; böylece bir satır bir siparişi temsil eder.",
      "Her siparişin satırlarını toplamak için SUM(qty * unit_price) kullan.",
      "HAVING ile yalnızca saklanan toplamı bu toplamdan farklı olan siparişleri bırak.",
    ],
    code: {
      label: "PostgreSQL (T-SQL sürümü birebir aynı)",
      language: "sql",
      text: `SELECT o.id,
       o.total,
       SUM(ol.qty * ol.unit_price) AS line_sum
FROM orders AS o
JOIN order_lines AS ol ON ol.order_id = o.id
GROUP BY o.id, o.total
HAVING o.total <> SUM(ol.qty * ol.unit_price);`,
    },
  },
  challenge: {
    task: "Tam olarak bir ürün içeren siparişleri bul.",
    predictFirst:
      "Her sipariş eşit olasılıkla 1, 2, 3 ya da 4 ürünle üretildi. 5.000 siparişin yaklaşık ne kadarı tam bir ürün içerir?",
    hints: [
      "Sipariş başına bir satır gerekiyor; hangi ifade bunu sağlar?",
      "COUNT(*) her grubun içindeki satırları sayar.",
      "Gruplar sayıldıktan sonra onları hangi ifade filtreler?",
    ],
    expectedOutput:
      "Siparişlerin yaklaşık dörtte biri, yani 1.250 satır civarı. Kesin sayı rastgele veriye göre değişir.",
    code: {
      label: "Çözüm (önce kendin dene!)",
      language: "sql",
      text: `SELECT order_id, COUNT(*) AS item_count
FROM order_lines
GROUP BY order_id
HAVING COUNT(*) = 1;`,
    },
  },
  knowledgeCheck: [
    {
      id: "d1-grain",
      prompt:
        "orders ile order_lines'ı JOIN ettikten sonra sonuçtaki bir satır neyi temsil eder?",
      options: [
        "Bir sipariş",
        "Bir sipariş satırı (bir siparişteki bir ürün)",
        "Bir menü ürünü",
        "Bir şube",
      ],
      answer: 1,
      explanation:
        "JOIN, eşleşen her satır için bir satır tutar. Üç satırı olan bir sipariş artık üç kez görünür ve her seferinde aynı sipariş toplamını taşır.",
    },
    {
      id: "d1-having",
      prompt: "GROUP BY grupları oluşturduktan SONRA hangi ifade grupları filtreler?",
      options: ["WHERE", "HAVING", "ORDER BY", "FROM"],
      answer: 1,
      explanation:
        "WHERE tek tek satırları gruplamadan önce filtreler. HAVING ise grupları filtreler; bu yüzden SUM ve COUNT gibi toplamları kullanabilir.",
    },
    {
      id: "d1-silent",
      prompt:
        "Bir sorgu siparişin toplamını tek bir satırın tutarıyla karşılaştırıyor ve hatasız bir liste döndürüyor. Risk nedir?",
      options: [
        "Veritabanı sorguyu çalıştırmayı reddeder",
        "Çalışır, ama farklı grain'deki değerleri sessizce karşılaştırır ve yanlış sonuç verebilir",
        "Yavaş olur ama doğru olur",
        "Tabloyu kilitler",
      ],
      answer: 1,
      explanation:
        "Veritabanları söz dizimini kontrol eder, anlamı değil. Grain hatası makul görünen yanlış bir sonuç üretir; bu yüzden hep \"bir satır neyi temsil ediyor?\" diye sor.",
    },
  ],
  feynman:
    "Bir arkadaşına fiş örneğiyle anlat: grain nedir, fişin toplamını tek bir kalemle karşılaştırmak neden yanlıştır, GROUP BY bunu nasıl düzeltir? 3–4 cümle yeter. Takıldığın yeri işaretle ve bana gönder.",
  references: [
    {
      title: "Alıştırma veri seti (sentetik restoran verisi)",
      by: "Bu depodaki db-lab/sql/init/001_practice_schema.sql dosyası",
      note: "Bu sayfadaki tüm sayılar yalnızca sentetik veriden gelir.",
    },
  ],
  reflection:
    "Siparişler ve stokla yaptığın işte, farklı grain'deki bir satır ile bir değer kimse fark etmeden nerede karşılaştırılabilir? Kendi cümlelerinle bir örnek yaz.",
};
