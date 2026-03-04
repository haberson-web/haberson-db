import Link from "next/link";
export default function Home() {
  const mockNews: {
    id: string;
    title: string;
    description: string;
    category: "Gündem" | "Ekonomi" | "Spor" | "Teknoloji" | "Dünya";
    image: string;
    time: string;
  }[] = [
    {
      id: "n1",
      title:
        "Merkez Bankası yılın ilk enflasyon raporunu açıkladı: Beklentiler yukarı revize edildi",
      description:
        "Para Politikası Kurulu metninde çekirdek enflasyondaki katılığa dikkat çekildi. Analistler rapor sonrası faiz patikasına ilişkin öngörülerini güncelledi.",
      category: "Ekonomi",
      image:
        "https://images.unsplash.com/photo-1517638851339-66bcc0a361b2?q=80&w=1600&auto=format&fit=crop",
      time: "10 dk önce",
    },
    {
      id: "n2",
      title:
        "İstanbul’da sahur vakti denetimler: Ulaşım ve gıda işletmelerinde sıkı kontrol",
      description:
        "Büyükşehir ekipleri toplu taşıma ve açık olan işletmelerde standartlara uyumu denetledi. Vatandaşlar uygulamadan memnun olduklarını söyledi.",
      category: "Gündem",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop",
      time: "28 dk önce",
    },
    {
      id: "n3",
      title:
        "Süper Lig’de şampiyonluk yarışı kızıştı: Lider puan farkını korudu",
      description:
        "Haftanın maçlarında üst sıralardaki ekipler puan kaybetmedi. Teknik direktörlerden dikkat çeken açıklamalar geldi.",
      category: "Spor",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bf39c03f0?q=80&w=1600&auto=format&fit=crop",
      time: "1 saat önce",
    },
    {
      id: "n4",
      title:
        "Yerli batarya yatırımı büyüyor: Yeni fabrika için ÇED süreci başladı",
      description:
        "Türkiye’nin enerji depolama ekosisteminde kritik bir adım daha atıldı. Projenin bölge istihdamına katkısı vurgulandı.",
      category: "Teknoloji",
      image:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1600&auto=format&fit=crop",
      time: "2 saat önce",
    },
    {
      id: "n5",
      title:
        "AB’den yapay zekâ yasası için son onay: Startuplar için esneklik, BigTech için sıkı kurallar",
      description:
        "Yeni düzenleme yüksek riskli sistemlere sert standartlar getiriyor. Geliştiriciler uyum takvimini dikkatle takip ediyor.",
      category: "Dünya",
      image:
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
      time: "3 saat önce",
    },
    {
      id: "n6",
      title:
        "Asgari ücret sonrası fiyatlar: Perakende ve hizmet sektöründe güncellemeler sürüyor",
      description:
        "İşletmeler maliyet artışlarını yönetmek için paket ve kampanyaları gözden geçiriyor. Uzmanlar fiyatlama davranışını analiz ediyor.",
      category: "Ekonomi",
      image:
        "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1600&auto=format&fit=crop",
      time: "4 saat önce",
    },
    {
      id: "n7",
      title:
        "Milli takım, Avrupa Şampiyonası hazırlıklarına başladı: Geniş kadro açıklandı",
      description:
        "Kadroda genç oyuncuların sayısı arttı. Teknik ekip, hazırlık maçlarıyla form durumunu test edecek.",
      category: "Spor",
      image:
        "https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1600&auto=format&fit=crop",
      time: "5 saat önce",
    },
    {
      id: "n8",
      title:
        "İstanbul Finans Merkezi’nde yeni ofis açılışları: Uluslararası ilgi yükseliyor",
      description:
        "Bölgeye taşınan kurum sayısı artarken, fintech girişimleri de kümelenme avantajı yakalıyor.",
      category: "Ekonomi",
      image:
        "https://images.unsplash.com/photo-1517638851339-66bcc0a361b2?q=80&w=1600&auto=format&fit=crop",
      time: "6 saat önce",
    },
    {
      id: "n9",
      title:
        "Yerli ucuz internet atağı: Fiber erişimde pilot ilçe uygulaması başladı",
      description:
        "Operatörler altyapı paylaşımı için protokol üzerinde uzlaştı. Kullanıcılar deneme sürecinde hız ve fiyat avantajı görüyor.",
      category: "Teknoloji",
      image:
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600&auto=format&fit=crop",
      time: "7 saat önce",
    },
    {
      id: "n10",
      title:
        "İstanbul Havalimanı kış operasyonu: Karla mücadele planı devreye alındı",
      description:
        "Yoğun yağış beklenirken ekipler piste hazır. Yolcular için bilgilendirme ve ek sefer planlandı.",
      category: "Gündem",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop",
      time: "8 saat önce",
    },
    {
      id: "n11",
      title:
        "Borsa İstanbul’da rekor işlem hacmi: Bankacılık endeksi öne çıktı",
      description:
        "Risk iştahı artarken yabancı katılımında ivme gözlendi. Analistler kâr realizasyonuna karşı uyarıyor.",
      category: "Ekonomi",
      image:
        "https://images.unsplash.com/photo-1517638851339-66bcc0a361b2?q=80&w=1600&auto=format&fit=crop",
      time: "9 saat önce",
    },
    {
      id: "n12",
      title:
        "Süper Lig’de VAR tartışması: Kulüpler birliği toplantı yapacak",
      description:
        "Son haftalarda artan karar hataları gündemde. Teknolojik iyileştirmeler ve eğitim programı masada.",
      category: "Spor",
      image:
        "https://images.unsplash.com/photo-1534762654453-88fc2f466c8b?q=80&w=1600&auto=format&fit=crop",
      time: "Dün",
    },
    {
      id: "n13",
      title:
        "Türkiye’den sınai mülkiyet atılımı: Patent başvurularında çift haneli artış",
      description:
        "KOBİ’ler Ar-Ge bütçelerini yükseltiyor. Üniversite–sanayi iş birlikleri yeni projelere kapı aralıyor.",
      category: "Teknoloji",
      image:
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
      time: "Dün",
    },
    {
      id: "n14",
      title:
        "Orta Doğu’da diplomasi trafiği: Ateşkes için yeni taslak gündemde",
      description:
        "Taraflar güvenlik garantileri üzerinde çalışıyor. Uluslararası toplum sürece destek veriyor.",
      category: "Dünya",
      image:
        "https://images.unsplash.com/photo-1496307042754-b4b7e3b1c5b2?q=80&w=1600&auto=format&fit=crop",
      time: "Dün",
    },
    {
      id: "n15",
      title:
        "Deprem sonrası güçlendirme: Belediyeler yeni yapı envanteri paylaştı",
      description:
        "Kentsel dönüşümde risk analizi hızlanıyor. Uzmanlar doğru malzeme ve denetimin önemine dikkat çekiyor.",
      category: "Gündem",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop",
      time: "2 gün önce",
    },
    {
      id: "n16",
      title:
        "Kripto varlıklarda düzenleme paketi Meclis’e geliyor: Lisans ve saklama şartı",
      description:
        "Paket, tüketiciyi korumayı hedefliyor. Piyasa profesyonelleri taslağın ayrıntılarını değerlendiriyor.",
      category: "Ekonomi",
      image:
        "https://images.unsplash.com/photo-1520975122240-2501b5d066e9?q=80&w=1600&auto=format&fit=crop",
      time: "2 gün önce",
    },
    {
      id: "n17",
      title:
        "Savunma teknolojilerinde ihracat hedefi: Yeni platformlar vitrine çıkıyor",
      description:
        "Sektörde yerlilik oranı yükseliyor. Test faaliyetleri ve sertifikasyon süreçleri hız kazandı.",
      category: "Teknoloji",
      image:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1600&auto=format&fit=crop",
      time: "3 gün önce",
    },
    {
      id: "n18",
      title:
        "Küresel piyasalar ABD verilerini bekliyor: Dolar endeksi yatay",
      description:
        "Tahvil faizlerinde sınırlı oynaklık izleniyor. Altın ve petrol fiyatları dar bantta.",
      category: "Dünya",
      image:
        "https://images.unsplash.com/photo-1517638851339-66bcc0a361b2?q=80&w=1600&auto=format&fit=crop",
      time: "3 gün önce",
    },
  ];

  const featured = mockNews[0];
  const secondary = mockNews.slice(1, 5);
  const latest = mockNews.slice(5);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />
      <main>
        <Hero featured={featured} secondary={secondary} />
        <LatestNews items={latest} />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const nav = ["Gündem", "Ekonomi", "Spor", "Teknoloji", "Dünya"];
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="select-none font-extrabold text-2xl">
            <span className="text-black">Son</span>
            <span className="text-red-600">Haber</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {nav.map((n) => (
                <li key={n}>
                  <a
                    href="#"
                    className="relative inline-block px-1 text-sm font-medium text-zinc-800 transition-colors hover:text-black"
                  >
                    <span>{n}</span>
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <button
              aria-label="Ara"
              className="group rounded-full border border-zinc-200 p-2 transition-colors hover:border-zinc-300"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-zinc-700 transition-colors group-hover:text-black"
              >
                <path
                  d="M15.5 15.5L21 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Canlı Yayın
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({
  featured,
  secondary,
}: {
  featured: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    time: string;
  };
  secondary: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    time: string;
  }[];
}) {
  return (
    <section className="border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <a
            href="#"
            className="group relative col-span-1 flex h-[420px] overflow-hidden rounded-xl lg:col-span-2"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${featured.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />
            <div className="relative mt-auto flex w-full flex-col gap-3 p-6 text-white">
              <span className="inline-flex w-fit items-center rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold">
                {featured.category}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
                {featured.title}
              </h2>
              <div className="flex items-center justify-between text-sm text-zinc-200">
                <p className="max-w-2xl">
                  {featured.description}
                </p>
                <span className="ml-4 shrink-0">{featured.time}</span>
              </div>
            </div>
          </a>
          <div className="grid grid-cols-1 gap-4">
            {secondary.map((item) => (
              <a
                key={item.id}
                href="#"
                className="group relative flex h-[100px] overflow-hidden rounded-xl sm:h-[120px]"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative mt-auto w-full p-4 text-white">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="inline-flex rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-semibold">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-zinc-200">{item.time}</span>
                  </div>
                  <h3 className="line-clamp-2 text-sm font-bold tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LatestNews({
  items,
}: {
  items: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    time: string;
  }[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold tracking-tight">
          Güncel Haberler
        </h2>
        <a
          href="#"
          className="text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
        >
          Tümünü Gör
        </a>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute left-3 top-3 inline-flex rounded-full bg-red-600/90 px-2.5 py-1 text-xs font-semibold text-white shadow">
                {item.category}
              </span>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <h3 className="line-clamp-2 text-base font-bold tracking-tight text-zinc-900">
                {item.title}
              </h3>
              <p
                className="text-sm text-zinc-600"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.description}
              </p>
              <div className="mt-1 flex items-center justify-between text-xs text-zinc-500">
                <span>{item.time}</span>
                <a
                  href="#"
                  className="font-semibold text-red-600 transition-colors hover:text-red-700"
                >
                  Oku
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-8 border-t border-zinc-200 bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm">
            © {new Date().getFullYear()} SonHaber. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
              f
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
              x
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
              in
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
