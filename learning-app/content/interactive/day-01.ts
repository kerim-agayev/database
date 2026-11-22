import type { InteractiveDay } from "./types";

export const interactive01: InteractiveDay = {
  day: 1,
  title: "Fişler ve kalemler: grain'i oynayarak öğren",
  intro:
    "Grain kelimesini bir restoran fişiyle öğreneceğiz. Bir fişin bir toplamı ve birkaç kalemi vardır. Kalemleri kendi fişlerine geri koymak, GROUP BY'ın tam olarak yaptığı iştir.",
  activities: [
    {
      kind: "sort",
      id: "lines-to-receipts",
      title: "Kalemleri fişlerine yerleştir",
      purpose:
        "JOIN sonrası satırların fiş değil kalem olduğunu, GROUP BY'ın kalemleri fişlerine topladığını elle yaparak görmek.",
      instructions:
        "JOIN'den gelen her satırı (kalemi) kendi fişinin kutusuna sürükle. Sonra kalemlerin toplamını fişin üstündeki toplamla karşılaştır.",
      buckets: [
        { id: "r42", label: "Fiş 42", detail: "Fişte yazan toplam: 31,00" },
        { id: "r43", label: "Fiş 43", detail: "Fişte yazan toplam: 23,00" },
      ],
      items: [
        { id: "l1", label: "Fiş 42 · Margherita Pizza · 12,50", bucket: "r42" },
        { id: "l2", label: "Fiş 43 · Beef Burger · 15,00", bucket: "r43" },
        { id: "l3", label: "Fiş 42 · Caesar Salad · 9,00", bucket: "r42" },
        { id: "l4", label: "Fiş 42 · Lentil Soup · 6,00", bucket: "r42" },
        { id: "l5", label: "Fiş 43 · Cola · 3,00", bucket: "r43" },
        { id: "l6", label: "Fiş 42 · Lemonade · 3,50", bucket: "r42" },
      ],
      success:
        "Doğru! Fiş 42: 12,50 + 9,00 + 6,00 + 3,50 = 31,00, toplamla aynı. Fiş 43: 15,00 + 3,00 = 18,00 ama fişte 23,00 yazıyor: hatalı fiş! GROUP BY kalemleri böyle fişlerine toplar, HAVING de hatalı fişleri ayıklar.",
    },
    {
      kind: "sequence",
      id: "sql-order",
      title: "SQL'in gerçek işlem sırası",
      purpose:
        "SQL'i yazdığın sırayla değil, veritabanının işlediği sırayla dizmek. Bu sıra, neyin neden çalışıp çalışmadığını açıklar.",
      instructions:
        "Kartları veritabanının işlediği sıraya koy. Sürükleyebilir ya da ↑ ↓ düğmelerini kullanabilirsin.",
      items: [
        { id: "from", label: "FROM / JOIN", detail: "Önce hangi tablolardan okuyacağını bulur ve satırları birleştirir." },
        { id: "where", label: "WHERE", detail: "Tek tek satırları eler (gruplamadan önce)." },
        { id: "group", label: "GROUP BY", detail: "Kalan satırları gruplara toplar: kalemler fişlerine." },
        { id: "having", label: "HAVING", detail: "Grupları eler: örneğin toplamı tutmayan fişler." },
        { id: "select", label: "SELECT", detail: "Gösterilecek kolonları hesaplar. Takma adlar (alias) burada doğar." },
        { id: "order", label: "ORDER BY", detail: "En sonda sıralar. Bu yüzden ORDER BY takma adı kullanabilir, WHERE kullanamaz." },
      ],
      startOrder: ["select", "having", "from", "order", "group", "where"],
      success:
        "Tebrikler! Sıra: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. SELECT'i en başa yazarsın ama veritabanı onu sona yakın işler.",
    },
    {
      kind: "sort",
      id: "where-or-having",
      title: "WHERE mi, HAVING mi?",
      purpose: "Hangi filtrenin satıra, hangisinin gruba uygulandığını ayırt etmek.",
      instructions: "Her koşulu, yazılması gereken yere sürükle.",
      buckets: [
        { id: "where", label: "WHERE (tek tek satırlara)" },
        { id: "having", label: "HAVING (gruplara)" },
      ],
      items: [
        { id: "c1", label: "Sadece status = 'paid' olan siparişler", bucket: "where" },
        { id: "c2", label: "3'ten fazla kalemi olan fişler (COUNT(*) > 3)", bucket: "having" },
        { id: "c3", label: "Son 30 günde verilen siparişler", bucket: "where" },
        { id: "c4", label: "Kalemlerinin toplamı fişin toplamına eşit olmayan fişler", bucket: "having" },
      ],
      success:
        "Doğru! Bir koşul COUNT veya SUM gibi bir toplamaya bakıyorsa HAVING'e, tek bir satırın değerine bakıyorsa WHERE'e yazılır.",
    },
  ],
  closing:
    "Şimdi bir arkadaşına fiş örneğiyle 3 cümlede anlat: grain nedir, neden toplamı tek bir kalemle karşılaştırmak yanlıştır, GROUP BY bunu nasıl düzeltir? Takıldığın yeri bana yaz.",
};
