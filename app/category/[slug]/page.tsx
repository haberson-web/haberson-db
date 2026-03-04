import { fetchNews } from "@/lib/api";
import NewsGrid from "@/components/NewsGrid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Map our slug to NewsAPI categories
  // general, business, entertainment, health, science, sports, technology
  const categoryMap: Record<string, string> = {
    gundem: "general",
    general: "general",
    ekonomi: "business",
    business: "business",
    spor: "sports",
    sports: "sports",
    teknoloji: "technology",
    technology: "technology",
    dunya: "general", // Fallback
    world: "general"  // Fallback
  };

  const apiCategory = categoryMap[slug.toLowerCase()] || "general";
  const news = await fetchNews(apiCategory, 20);
  
  const titleMap: Record<string, string> = {
    general: "Gündem Haberleri",
    business: "Ekonomi Dünyası",
    sports: "Spor Haberleri",
    technology: "Teknoloji Gündemi"
  };

  return (
    <div className="min-h-screen py-8">
      <NewsGrid title={titleMap[apiCategory] || "Haberler"} items={news} />
    </div>
  );
}
