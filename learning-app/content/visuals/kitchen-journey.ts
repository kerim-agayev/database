/**
 * Day 2 "journey of an order" simulation data (restaurant analogy, Turkish).
 * Real-side facts: PostgreSQL 18 docs "1.2 Architectural Fundamentals" (one server
 * process per connection) and Petrov, Database Internals Ch. 1 (DBMS components).
 */

export interface JourneyStep {
  id: string;
  station: string;
  restaurant: string;
  real: string;
  code?: string;
}

export const journeyModel = {
  models: "Bir SELECT sorgusunun sen, bağlantı, DBMS, storage engine ve veritabanı arasındaki yolculuğu.",
  simplifies:
    "Mutfağın içi (sorgunun okunması ve planlanması) tek adımda gösterildi; 3. günde açacağız. Kimlik doğrulama, kilitler ve önbellek de dışarıda bırakıldı.",
};

export const journeySteps: JourneyStep[] = [
  {
    id: "customer",
    station: "Müşteri",
    restaurant: "Masaya oturur ve sipariş fişini yazar: \"Menüdeki ürünleri getirin.\"",
    real: "Sen ya da programın bir SQL sorgusu yazar.",
    code: "SELECT name, price FROM menu_items;",
  },
  {
    id: "waiter",
    station: "Garson",
    restaurant: "Fişi alır ve mutfağa götürür. Bu garson yalnızca senin masana bakar.",
    real: "Sorgu bağlantın üzerinden sunucuya gider. PostgreSQL bu bağlantı için ayrı bir sunucu süreci (client backend) ayırmıştır.",
  },
  {
    id: "kitchen",
    station: "Mutfak",
    restaurant: "Şef fişi okur, ne istendiğini anlar ve en hızlı nasıl hazırlanacağına karar verir.",
    real: "DBMS (PostgreSQL) sorguyu anlar ve nasıl çalıştıracağına karar verir. Ayrıntılar 3. günde.",
  },
  {
    id: "keeper",
    station: "Depo sorumlusu",
    restaurant: "Gereken malzemeyi raflardan bulup getirir. Bir şey değişirse önce deftere yazar.",
    real: "Storage engine, istenen satırları diskteki dosyalardan bulup getirir.",
  },
  {
    id: "depot",
    station: "Depo",
    restaurant: "Malzemenin kendisi burada durur: 20 çeşit ürün.",
    real: "Veritabanı (restaurant) verinin kendisidir: menu_items tablosundaki 20 satır.",
  },
  {
    id: "plate",
    station: "Tabak masada",
    restaurant: "Hazırlanan tabak aynı garsonla masana gelir.",
    real: "Sonuç satırları aynı bağlantı üzerinden sana döner ve ekranda tablo olarak görünür.",
  },
];
