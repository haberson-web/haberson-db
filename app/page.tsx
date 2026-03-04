import { fetchNews } from "@/lib/news";
import Hero from "@/components/Hero";
import NewsGrid from "@/components/NewsGrid";

export const revalidate = 60;

export default async function Home() {
  try {
    // Parallel fetching for performance
    const [generalNews, sportsNews, techNews, economyNews] = await Promise.all([
      fetchNews("general", 5),
      fetchNews("sports", 4),
      fetchNews("technology", 4),
      fetchNews("business", 4)
    ]);

    // Combine for Hero section
    // If generalNews is empty (rare due to fallback), use empty object or handle gracefully
    const featured = generalNews[0] || null;
    const secondary = generalNews.slice(1, 5);

    if (!featured) {
      return <div className="p-8 text-center">Haberler yüklenirken bir sorun oluştu.</div>;
    }

    return (
      <div className="space-y-8">
        {/* Hero Section */}
        <Hero featured={featured} secondary={secondary} />
        
        {/* Category Grids */}
        <NewsGrid title="Spor Haberleri" items={sportsNews} />
        <NewsGrid title="Teknoloji Gündemi" items={techNews} />
        <NewsGrid title="Ekonomi ve Finans" items={economyNews} />
      </div>
    );
  } catch (error) {
    console.error("Page Load Error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Bir şeyler yanlış gitti</h1>
          <p className="text-zinc-600">Haberler şu anda yüklenemiyor. Lütfen sayfayı yenileyin.</p>
        </div>
      </div>
    );
  }
}
