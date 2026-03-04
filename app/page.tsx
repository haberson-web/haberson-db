import { fetchNews } from "@/lib/news";
import Hero from "@/components/Hero";
import NewsGrid from "@/components/NewsGrid";

export const revalidate = 60;

export default async function Home() {
  // Parallel fetching for performance
  const [generalNews, sportsNews, techNews, economyNews] = await Promise.all([
    fetchNews("general", 5),
    fetchNews("sports", 4),
    fetchNews("technology", 4),
    fetchNews("business", 4)
  ]);

  // Combine for Hero section
  const featured = generalNews[0];
  const secondary = generalNews.slice(1, 5);

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
}
