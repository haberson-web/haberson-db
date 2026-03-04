import { fetchNews } from "@/lib/news";
import NewsGrid from "@/components/NewsGrid";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Auto-update every minute

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Normalize slug to match our internal category keys
  const categoryMap: Record<string, string> = {
    gundem: "general",
    general: "general",
    ekonomi: "business",
    business: "business",
    spor: "sports",
    sports: "sports",
    teknoloji: "technology",
    technology: "technology",
    dunya: "world",
    world: "world",
    saglik: "health",
    health: "health",
    bilim: "science",
    science: "science"
  };

  const apiCategory = categoryMap[slug.toLowerCase()] || "general";
  
  // Fetch real data
  const news = await fetchNews(apiCategory, 20);
  
  const titleMap: Record<string, string> = {
    general: "Gündem Haberleri",
    business: "Ekonomi Dünyası",
    sports: "Spor Haberleri",
    technology: "Teknoloji Gündemi",
    world: "Dünya Gündemi",
    health: "Sağlık Haberleri",
    science: "Bilim ve Teknoloji"
  };

  if (news.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-zinc-800">Bu kategoride şu an haber bulunamadı.</h2>
        <Link href="/" className="text-red-600 hover:underline font-medium">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <NewsGrid title={titleMap[apiCategory] || "Haberler"} items={news} />
    </div>
  );
}
