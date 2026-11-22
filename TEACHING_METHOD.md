# Öğretim Yöntemi — bu programda nasıl öğretilir

Bu dosya **zorunludur**. Claude her ders yazmadan ve her gün öğretmeden önce bunu okur ve uygular (bkz. CLAUDE.md). Başka bilgisayarda da aynı kurallar geçerlidir.

## Öğrenci kim?

- **Sıfırdan başlıyor.** SQL sorgusu yazmayı biliyor ama paslı; veritabanının iç yapısını hiç bilmiyor.
- İş alanı **restoran yönetimi, depo ve envanter**. Bu dünyayı çok iyi biliyor; her benzetme oradan gelir.
- **2026-11-22 dersi:** 2. günün ilk sürümünde tek derste 15'ten fazla yeni kavram vardı (DBMS, storage engine, parser, rewrite, planner, executor, heap, pg_am, backend…). Öğrenci "hiçbir şey anlamadım" dedi. Kural: bir daha asla bu kadar çok kavram tek seferde verilmez.
- Öğrenci adım adım, oynayarak ve kendi cümleleriyle anlatarak öğrenmek istiyor. Takvimden önce anlamak gelir.

## Kanıta dayalı ilkeler

Kanıt gücü kaynaktan kaynağa değişir; aşağıda belirtildi. Hepsine 2026-11-22'de erişildi.

| # | İlke | Bu programda nasıl uygulanır | Dayanak |
|---|---|---|---|
| 1 | **Çalışma belleği çok sınırlıdır.** Yeni başlayanın yükü uzmana göre ağırdır | Bir günde **en fazla 5 yeni kelime** (sayı bizim kuralımız; kaynak sayı vermez). Fazlası sonraki güne kalır | Bilişsel yük kuramı [6] |
| 2 | **Karmaşık konuyu parçalara böl, sonra birleştir** | Bir gün = bir fikir. Ön bilgi gerekirse önce o parça öğretilir | [6] |
| 3 | **Önce somut örnek / benzetme, sonra terim** | Her ders, teknik kelimeden ÖNCE restoran benzetmesi tablosuyla başlar | Somut örnekler [4] |
| 4 | **Yeni başlayana önce çözümlü örnek, sonra kendi başına problem**; ilerledikçe adımları azalt | Her günde bir çözümlü örnek ve bir bağımsız görev. Öğrenci ilerledikçe ipuçları ve hazır adımlar azalır | Worked-example etkisi [5]. Uyarı: uzmanlık arttıkça etkisi azalır, hatta tersine döner |
| 5 | **Öğrenciye adımları kendi sözleriyle açıklat** | Her gün "Kendi cümlelerinle anlat (Feynman)" ile biter; öğrenci yazar, Claude boşlukları bulur | Self-explanation [5]; Feynman tekniği [1]. Uyarı: fs.blog bir rehberdir ve araştırma göstermez |
| 6 | **Hatırlama pratiği:** bilgiyi kafadan geri çağırmak öğrenmeyi güçlendirir | Her ders "Önce hatırla" ile başlar: önceki günlerden 2–3 soru, cevaplar gizli. Bilgi kontrolü soruları da bu amaçla | Retrieval practice [3]; practice testing yüksek fayda [2] |
| 7 | **Aralıklı tekrar:** aynı konuyu zamana yayarak tekrarlamak | Tekrar günleri, ısınmalarda eski kavramların geri gelmesi, haftalık tekrar | Distributed practice yüksek fayda [2]; spacing [4] |
| 8 | **Metin ve görsel yan yana** (ayrık değil) | Simülasyonlarda "Restoranda" ile "Gerçekte (PostgreSQL)" aynı kutuda yan yana | Split-attention [5]; dual coding [4] |
| 9 | **Yeniden okuma ve altını çizme ana yöntem olmamalı** | Ders "oku ve geç" değil; her bölümde yap, tahmin et, anlat | Düşük fayda [2] |
| 10 | **Zorlanmak iyidir** (istenen zorluk) | Önce tahmin istenir, sonra cevap gösterilir. Yanlış tahmin ceza değil, öğrenme fırsatıdır | [3] |

## Her günün ders sayfası (`/tutorial/N`), sırayla

1. **Bugün ne öğreneceksin?** (en fazla 3 hedef)
2. **Nerede kaldık** (2–4 cümle)
3. **Önce hatırla:** önceki günlerden 2–3 soru, cevaplar gizli (1. gün hariç)
4. **Bugünün benzetmesi:** iki sütunlu tablo, "Veritabanı dünyasında" ve "Restoranda"
5. **Bugün yalnızca N yeni kelime** (N ≤ 5), her biri sade bir cümleyle
6. **Ana fikir:** kısa paragraflar, yalnızca bugünün kelimeleriyle
7. **Çözümlü örnek** (adım adım, gerçek komut ve SQL, lab'da çalıştırılabilir)
8. **Görev:** önce tahmin et, ipuçları sırayla, beklenen çıktı gizli
9. **Bilgi kontrolü:** yanlış cevapta doğruyu hemen göstermez, yeniden denetir
10. **Kendi cümlelerinle anlat (Feynman)**
11. **Düşünme notu**, iş hayatına bağlanır
12. **Kaynakça** (web kaynaklarında erişim tarihiyle)

## Her günün etkileşimli sayfası (`/tutorial/N/interactive`), zorunlu

- **Her günün** bir etkileşimli sayfası olur ve ders sayfası ona büyük bir düğmeyle bağlanır.
- En az **2–3 aktivite**. Türler (gerekirse yenileri eklenir):
  - **Sürükle-bırak eşleştirme / sınıflandırma** (`sort`): kelime ↔ restoran rolü, örnek ↔ kategori
  - **Sıralama** (`sequence`): işlem sırası, adımlar
  - **Adım adım animasyonlu simülasyon** (`widget`): bir sürecin yolculuğu, sayaçlar, "aç/kapat, ne değişti?"
- Her aktivitenin bir **Amaç** cümlesi vardır; süs için oyun yapılmaz.
- Her simülasyon **neyi modellediğini ve neyi basitleştirdiğini** söyler; gerçek lab sonuçlarıyla karıştırılmaz.
- Erişilebilirlik:
  - Sürükle-bırakın her zaman **dokun/klavye** karşılığı vardır.
  - Animasyonlar "hareketi azalt" ayarında kapanır.
  - Her simülasyonun düz metin karşılığı vardır.
  - Doğru/yanlış yalnızca renkle değil ✓/✗ ile de gösterilir.
- Sayfa bir **Feynman kapanışıyla** biter: "Şimdi kendi cümlelerinle anlat."
- Teknik yer: içerik `learning-app/content/interactive/day-NN.ts`, kayıt `content/interactive/index.ts`, gün listesi `lib/interactive-days.ts` (üçü birlikte güncellenir; test kontrol eder).

## Sohbette öğretim akışı (her gün)

1. **Hatırlat:** önceki günden 2 kısa soru. Cevabı önce öğrenci verir.
2. **Benzetme:** restorandan tanıdık bir sahne.
3. **Yeni kelimeler:** en fazla 5, her biri tek cümle.
4. **Etkileşimli sayfa:** "Şimdi /tutorial/N/interactive sayfasını oyna."
5. **Çözümlü örnek ve deney:** önce tahmin, sonra lab'da çalıştırma, sonra karşılaştırma.
6. **Bilgi kontrolü.**
7. **Feynman:** öğrenci 4–5 cümleyle anlatır; Claude eksik ya da yanlış yeri nazikçe gösterir ve o parçayı yeniden, daha basit anlatır.
8. Gün ancak öğrenci anladığını gösterince tamamlanır (LEARNING_PROGRESS.md).

## Öğrenci "anlamadım" derse

- Suçlama yok; sorun öğretimdedir. Önce ne anlaşılmadığını tek bir soruyla bul ("Hangi kelimede koptun?").
- **Daha küçük parça, daha basit benzetme, daha somut örnek.** Yeni terim ekleme.
- Gerekirse günü ikiye böl (telafi günü) ve ROADMAP'e not düş.
- Yöntemi bu dosyada güncelle ve SESSION_LOG.md'ye yaz.

## Kaynaklar (erişim: 2026-11-22)

1. Shane Parrish, "The Feynman Technique", Farnam Street. https://fs.blog/feynman-technique/ (rehber yazısı; araştırma göstermez)
2. Dunlosky, Rawson, Marsh, Nathan, Willingham (2013), "Improving Students' Learning With Effective Learning Techniques", Psychological Science in the Public Interest. Özet: https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html (practice testing ve distributed practice yüksek fayda; highlighting ve rereading düşük fayda)
3. Pooja K. Agarwal, Retrieval Practice. https://www.retrievalpractice.org/why-it-works
4. Megan Smith ve Yana Weinstein, The Learning Scientists, "Six Strategies for Effective Learning" (2016-08-18). https://www.learningscientists.org/blog/2016/8/18-1 (yazarlar elaboration'ın kanıtının daha sınırlı olduğunu belirtir)
5. "Worked-example effect", Wikipedia. https://en.wikipedia.org/wiki/Worked-example_effect (ikincil kaynak; expertise reversal uyarısı)
6. "Cognitive load", Wikipedia. https://en.wikipedia.org/wiki/Cognitive_load (ikincil kaynak)
