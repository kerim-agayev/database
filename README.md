# Veritabanı Mühendisliği: 90 Günlük Program

Analitik SQL bilgisinden, veritabanlarının içeriden nasıl çalıştığını ve production'da nasıl davrandığını anlamaya uzanan, Claude Code ile birlikte yürütülen bir öğrenme programı. Hedef: veritabanı konularında en az middle düzeyinde kavramsal anlayış ve pratik beceri. (90 gün gerçekçi bir alt sınırdır; anlama hızına göre 100–120 gün sürebilir.)

Her şey **sentetik restoran verisiyle** yapılır. Hiçbir şirket verisi, şeması ya da kaynak kodu bu depoda yoktur.

## Klasörler

| Yol | Ne içerir |
|---|---|
| `CLAUDE.md` | Claude Code'un her oturumda **otomatik okuduğu** giriş dosyası: kurallar, kesinleşen kararlar, dil kuralı |
| `DATABASE_CLAUDE.md` | Programın tam sözleşmesi (öğretim ilkeleri, teslimatlar, güvenlik kuralları) |
| `SESSION_LOG.md` | **Nerede kaldığımızın günlüğü.** Her adımdan sonra bir kayıt eklenir |
| `ROADMAP.md` | Onaylı 90 günlük plan (gün gün hedef, kaynak, uygulama, öz-kontrol) |
| `LEARNING_PROGRESS.md` | İlerleme kanıtları: hangi gün tamamlandı, güven düzeyi, açık sorular |
| `DATABASE_GLOSSARY.md` | Terim sözlüğü |
| `SOURCE_CATALOG.md`, `COURSE_MAP_HUSSEIN_NASSER.md` | Kaynak envanteri ve konu kontrol listesi |
| `PROJECT_PROPOSALS.md`, `docs/adr/` | Proje kararı ve mimari karar kayıtları |
| `learning-app/` | Next.js öğrenme uygulaması: `/tutorial/1` … `/tutorial/90` |
| `db-lab/` | Docker'da gerçek PostgreSQL 18 laboratuvarı ve alıştırma verisi |

## Başka bir bilgisayarda devam etmek

Gerekenler: **Git**, **Node.js 24** (en az 22.12), **Docker Desktop** ve **Claude Code** (VS Code eklentisi ya da terminal).

```bash
# 1. Depoyu indir
git clone https://github.com/kerim-agayev/database.git
cd database

# 2. Lab veritabanını başlat (Docker Desktop açık olmalı)
cd db-lab
cp .env.example .env          # Windows PowerShell: Copy-Item .env.example .env
#    .env içindeki POSTGRES_PASSWORD değerini istersen değiştir (yalnızca bu bilgisayardaki lab için)
docker compose up -d --wait
docker exec dblab-postgres psql -U lab -d restaurant -c "SELECT count(*) FROM practice.orders;"   # 5000 görmelisin
cd ..

# 3. Uygulamayı başlat
cd learning-app
npm install
npm run dev                   # http://localhost:3000/tutorial/2
```

4. **Klasörü Claude Code ile aç** ve "devam" yaz. Claude `CLAUDE.md`'yi otomatik okur, `SESSION_LOG.md`'nin son kayıtlarına bakar ve nerede kaldığımızı söyler. Başka bir şey anlatman gerekmez.

5. **Kitap PDF'lerini** (aşağıda) yasal olarak edindiğin kopyalarla klasörün köküne koy. Git bunları bilerek takip etmez.

### Her oturumun başı ve sonu

- **Başı:** `git pull` (başka bilgisayarda yaptığın işi getirir). Sonra Claude Code'u aç.
- **Sonu:** Claude, `SESSION_LOG.md`'yi güncel tutar. Sonra: `git add -A`, `git commit -m "…"`, `git push`. Unutursan diğer bilgisayarda eski yerden devam edersin.
- İki bilgisayarda aynı anda çalışma; her zaman önce `git pull`.

## Git'te olmayanlar ve nasıl yeniden oluşurlar

| Ne | Neden yok | Yeniden oluşturma |
|---|---|---|
| Kitap PDF'leri | Telifli | Kendi kopyalarını köke koy (liste aşağıda) |
| `db-lab/.env` | Şifre içerir | `.env.example`'ı kopyala |
| Docker veritabanı verisi | Yerel birim | `docker compose up -d`: `sql/init/` içindeki script ilk başlatmada tohum verisini kurar |
| `node_modules/`, `.next/` | Üretilebilir | `npm install`, `npm run dev` |
| Claude'un kendi hafızası | Bilgisayara özel | **Gerek yok:** her önemli şey `CLAUDE.md`, `SESSION_LOG.md`, `ROADMAP.md` ve `LEARNING_PROGRESS.md` içinde |

Not: Tohum verisi her kurulumda aynı satırları üretir ama tarihler "şimdiye göre" hesaplandığından kurulum gününe göre kayar. Alıştırma sonuçlarındaki sayılar bu yüzden küçük farklar gösterebilir.

## Kitaplar (depoda yok, kendi kopyanı koy)

| Dosya adı (köke) | Kitap | Not |
|---|---|---|
| `Designing-Data-Intensive-Applications.pdf` | Kleppmann, *Designing Data-Intensive Applications* | Elimizdeki kopya 1. baskının 2016 tarihli erken sürümü; Bölüm 12 eksik |
| `Database Internals.pdf` | Petrov, *Database Internals* (O'Reilly, 2019) | 1. baskı |
| `Systems_Performance.pdf` | Gregg, *Systems Performance* | 1. baskı (2014) |
| `database_reliability_engineering.pdf` | Campbell ve Majors, *Database Reliability Engineering* | 1. baskı (2017) |

## Sık karşılaşılan sorunlar

- **`docker` komutu bulunamıyor (Windows):** Docker Desktop kurulumundan sonra VS Code'u kapatıp yeniden aç.
- **Port 5432 dolu:** Lab zaten **5433** portunu kullanır, çakışma olmaz. Yerel bir PostgreSQL varsa ona dokunulmaz.
- **`npm run test` ya da Vitest "Cannot find native binding" diyor:** npm'in bilinen bir hatası, işletim sistemine özel paketi atlıyor. Çözüm (kendi sisteminin adını seç):
  ```bash
  cd learning-app
  npm install --no-save @rolldown/binding-win32-x64-msvc@1.2.19    # Windows
  npm install --no-save @rolldown/binding-darwin-arm64@1.2.19      # Apple Silicon
  npm install --no-save @rolldown/binding-darwin-x64@1.2.19        # Intel Mac
  npm install --no-save @rolldown/binding-linux-x64-gnu@1.2.19     # Linux
  ```
  `--no-save` bilerek kullanılır: `package.json` bozulmasın.
- **`localhost:3000` açılmıyor:** Sunucu çalışmıyordur. `cd learning-app && npm run dev` yaz. İlk açılış geliştirme modunda 10–25 saniye sürebilir.
- **Plan ya da ilerleme uygulamada güncel görünmüyor:** `cd learning-app && npm run sync:content` (`ROADMAP.md` ve `LEARNING_PROGRESS.md`'den veriyi yeniler).

## Uygulama komutları (`learning-app/`)

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu |
| `npm test` | Testler |
| `npm run lint` | ESLint |
| `npm run typecheck` | Tip kontrolü |
| `npm run build` | Üretim derlemesi (ilk seferde Google Fonts için internet ister) |
| `npm run sync:content` | Plan ve ilerleme verisini yeniler |

## Önemli notlar

- Uygulamadaki etkileşimli parçalar **öğretim modelleridir**: gerçeği basitleştirirler ve her biri neyi modellediğini söyler. Gerçek ölçümler `db-lab/` içindeki PostgreSQL'den gelir.
- Şifreler, anahtarlar ve token'lar hiçbir zaman sohbete yapıştırılmaz ve depoya konmaz.
- Bu program sürekli bir öğretmen-öğrenci akışıdır: bir gün ancak öz-kontrol geçildiğinde tamamlanmış sayılır.
