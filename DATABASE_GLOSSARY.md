# Veritabanı Sözlüğü

Sade Türkçe tanımlar ve sentetik restoran verisinden örnekler. Terimler, ilk öğretildikleri gün eklenir. Terimlerin kendisi, sektörde böyle konuşulduğu için İngilizce bırakıldı.
**İlgili** satırı, sonra okunacak terimleri gösterir. *(PG)* PostgreSQL'e özgü davranış demektir; geri kalanı geneldir.

## A

**Access method (erişim yöntemi)** *(PG ifadesi)*: verinin diskte nasıl düzenlendiğini ve nasıl bulunduğunu bilen bileşen. PostgreSQL'de tablo erişim yöntemleri (varsayılan `heap`) ve index erişim yöntemleri (`btree`, `hash`, `gin`, `gist`, `spgist`, `brin`) vardır. Örnek: `SELECT amname, amtype FROM pg_am;`. İlgili: Heap, Storage engine. *(2. gün)*

## B

**Backend process (backend süreci)** *(PG)*: PostgreSQL'in bir istemci bağlantısı için başlattığı sunucu süreci. Yalnızca o istemciye hizmet eder. İlgili: Connection, DBMS. *(2. gün)*

## D

**Database (veritabanı)**: verinin kendisi, yani düzenlenmiş veri topluluğu. PostgreSQL'de bir sunucu adlandırılmış birkaç veritabanı barındırabilir; lab'daki `restaurant`. Onu yöneten yazılımla aynı şey değildir. İlgili: DBMS. *(2. gün)*

**DBMS (database management system, veritabanı yönetim sistemi)**: veritabanlarını yöneten yazılım: bağlantıları kabul eder, sorguları anlar, birçok kullanıcının aynı anda çalışmasına izin verir ve veriyi güvende tutar. Örnekler: PostgreSQL, SQL Server, MySQL. İlgili: Database, Storage engine. *(2. gün)*

## E

**Execution plan (yürütme planı)**: veritabanının bir sorguyu yanıtlamak için yapacağı işlemler dizisi (örneğin "bu tabloyu tara, sonra join et, sonra sırala"). Aynı sorgunun hızı çok farklı birçok planı olabilir. İlgili: Planner/optimizer, Executor. *(2. gün; derinlemesine 19. günden itibaren)*

**Executor**: seçilen planı uygulayan parça: depolama katmanından satırları ister, sıralama ve join işlemlerini yapar, koşulları kontrol eder ve sonuç satırlarını döndürür. İlgili: Planner/optimizer. *(2. gün)*

## G

**Grain (ayrıntı düzeyi)**: sonuçtaki bir satırın neyi temsil ettiği. `orders` ile `order_lines`'ı JOIN edince bir satır bir sipariş *satırıdır*, bir sipariş değil. Farklı grain'deki değerleri karşılaştırmak hatasız çalışır ve yanlış sonuç verebilir. Çözüm: grain'i GROUP BY ile değiştirmek. İlgili: GROUP BY, HAVING. *(1. gün)*

**GROUP BY**: birçok satırı grup başına tek satıra indirir (örneğin `order_id` başına bir satır), böylece `SUM` ve `COUNT` gibi toplamalar grup başına çalışır. Grain'i değiştirir. İlgili: Grain, HAVING. *(1. gün)*

## H

**HAVING**: GROUP BY grupları oluşturduktan sonra grupları filtreler, bu yüzden toplamaları kullanabilir (`HAVING COUNT(*) > 3`). `WHERE` ise gruplamadan önce tek tek satırları filtreler. İlgili: GROUP BY. *(1. gün)*

**Heap** *(PG)*: PostgreSQL'in bir tabloyu depolamasının varsayılan yolu: satırlar dosyalarda belirli bir sıra olmadan tutulur, index'ler onlara işaret eder. Lab'da doğrulandı: `SHOW default_table_access_method;` `heap` döndürür. İlgili: Access method. *(2. gün)*

## P

**Parser**: sorgu işlemenin ilk aşaması: SQL söz dizimini kontrol eder ve bir sorgu ağacı kurar. Yazım hatası burada, hiçbir veri okunmadan yakalanır. İlgili: Rewrite system. *(2. gün)*

**Planner / optimizer**: bir sorguyu nasıl yanıtlayacağını seçer. Aday yollar üretir (örneğin sequential scan ya da index scan), her birinin maliyetini tahmin eder ve en ucuzunu plan olarak tutar. İlgili: Execution plan, Executor. *(2. gün)*

## Q

**Query processor (sorgu işlemcisi)**: bir DBMS'in, sorguyu optimize edilip yürütülmeden önce ayrıştıran, yorumlayan ve doğrulayan parçası. Gerçek sistemlerde bileşenler arasındaki sınırlar bulanıktır (Petrov, Database Internals, 1. bölüm). İlgili: Parser, Planner/optimizer, Storage engine. *(2. gün)*

## R

**Rewrite system** *(PG)*: sistem kataloglarında saklanan kuralları sorgu ağacına uygular. View'lar böyle çalışır: bir view'a yazılan sorgu, alttaki tabloları okuyacak şekilde yeniden yazılır. İlgili: Parser. *(2. gün)*

## S

**Storage engine (depolama motoru)**: bir DBMS'in veriyi diskte saklayan, bulan ve kurtaran parçası. Petrov'un haritasında bir transaction manager, lock manager, access method'lar, buffer manager ve recovery manager içerir. Bazı sistemler (örneğin MySQL) motoru tablo başına seçmene izin verir; 40. günde doğrulanacak. İlgili: Access method, DBMS. *(2. gün)*
