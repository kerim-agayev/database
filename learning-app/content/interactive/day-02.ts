import type { InteractiveDay } from "./types";

export const interactive02: InteractiveDay = {
  day: 2,
  title: "Restoranda kim kim? Oynayarak öğren",
  intro:
    "Bu sayfada okumak yerine oynayacaksın. Her oyunun bir amacı var; hata yapmak serbest, yanlış kartı geri alıp yeniden deneyebilirsin. Önce dersi okumadıysan sorun değil: oyunlar da aynı dört kelimeyi öğretir.",
  activities: [
    {
      kind: "sort",
      id: "who-is-who",
      title: "Restoranda kim kim?",
      purpose:
        "Dört yeni kelimeyi (ve SQL sorgusunu) tanıdık restoran rolleriyle eşleştirmek. Benzetme kafanda yerleşince teknik kelimeler korkutucu olmaktan çıkar.",
      instructions: "Her kelime kartını, restorandaki karşılığı olan kutuya sürükle.",
      buckets: [
        { id: "depot", label: "Depodaki malzemeler", detail: "Saklanan şeylerin kendisi" },
        { id: "business", label: "Restoranın tüm işletmesi", detail: "Personel, mutfak, kurallar" },
        { id: "keeper", label: "Depo sorumlusu", detail: "Yerleştirir, bulur, kaybolmasın diye kayıt tutar" },
        { id: "waiter", label: "Masana ayrılmış garson", detail: "Her müşteriye bir garson" },
        { id: "ticket", label: "Sipariş fişi", detail: "Ne istediğin yazılıdır" },
      ],
      items: [
        { id: "conn", label: "Bağlantı (connection)", bucket: "waiter" },
        { id: "db", label: "Veritabanı (database)", bucket: "depot" },
        { id: "sql", label: "SQL sorgusu", bucket: "ticket" },
        { id: "engine", label: "Storage engine", bucket: "keeper" },
        { id: "dbms", label: "DBMS (PostgreSQL)", bucket: "business" },
      ],
      success:
        "Hepsi doğru! Veritabanı = malzemeler, DBMS = işletme, storage engine = depo sorumlusu, bağlantı = garson, SQL = sipariş fişi.",
    },
    {
      kind: "widget",
      id: "journey",
      title: "Bir siparişin yolculuğu",
      purpose:
        "Bir sorgunun baştan sona kimin elinden geçtiğini sırayla görmek. Her adımda restorandaki karşılığı ve veritabanındaki gerçeği yan yana duruyor.",
      widget: "kitchen-journey",
    },
    {
      kind: "widget",
      id: "waiters",
      title: "Kaç garson çalışıyor?",
      purpose:
        "Lab'da gördüğün client backend sayısının neden bağlantı sayısına eşit olduğunu deneyerek anlamak.",
      widget: "waiter-sim",
    },
    {
      kind: "sort",
      id: "data-or-software",
      title: "Veri mi, yazılım mı, yazılımın parçası mı?",
      purpose:
        "Aynı kelimeleri bu kez gerçek örneklerle ayırt etmek. Benzetmeden gerçeğe geçiş.",
      instructions: "Her kartı doğru kutuya sürükle.",
      buckets: [
        { id: "data", label: "Veri (veritabanının içindekiler)" },
        { id: "software", label: "DBMS (bir yazılım ürünü)" },
        { id: "part", label: "DBMS'in bir parçası" },
      ],
      items: [
        { id: "pg", label: "PostgreSQL", bucket: "software" },
        { id: "orders", label: "orders tablosundaki 5.000 sipariş", bucket: "data" },
        { id: "heap", label: "heap (PostgreSQL'in tabloları saklama yöntemi)", bucket: "part" },
        { id: "mssql", label: "SQL Server", bucket: "software" },
        { id: "prices", label: "Menüdeki ürün fiyatları", bucket: "data" },
        { id: "backend", label: "Bir bağlantıya hizmet eden sunucu süreci (client backend)", bucket: "part" },
      ],
      success:
        "Tam isabet. Veri senin işinin bilgisidir; DBMS onu yöneten üründür; heap ve client backend o ürünün içindeki parçalardır.",
    },
  ],
  closing:
    "Şimdi kâğıda 4–5 cümle yaz: veritabanı, DBMS, storage engine ve bağlantı nedir? Restoran benzetmesini kullan. Hangi kelimede takıldıysan onu işaretle ve bana gönder. Takıldığın yer, bir sonraki adımımızın başlangıcı olacak.",
};
