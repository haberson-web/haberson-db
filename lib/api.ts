import { Article, NewsResponse } from "@/types/news";
import Parser from "rss-parser";

// Initialize RSS Parser
const parser = new Parser({
  customFields: {
    item: ['media:content', 'media:thumbnail', 'enclosure', 'image'],
  }
});

// RSS Feeds for Turkish News (Reliable Sources)
const RSS_FEEDS: Record<string, string> = {
  general: "https://www.trthaber.com/xml/sondakika.xml",
  business: "https://www.trthaber.com/xml/ekonomi.xml",
  sports: "https://www.trthaber.com/xml/spor.xml",
  technology: "https://www.donanimhaber.com/rss/tum/",
  world: "https://www.trthaber.com/xml/dunya.xml",
  health: "https://www.trthaber.com/xml/saglik.xml",
  science: "https://www.trthaber.com/xml/bilim-teknoloji.xml"
};

// Fallback Mock Data Generator (Used only if RSS fails completely)
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600", // Tech/News
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600", // Newspaper
  "https://images.unsplash.com/photo-1526304640152-d4619684e484?q=80&w=1600", // Economy
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600", // Sports
];

function generateMockArticles(count: number, category: string = "General"): Article[] {
  return Array.from({ length: count }).map((_, i) => ({
    source: { id: "mock-news", name: "SonHaber Ajansı" },
    author: "Editör Masası",
    title: `Örnek Haber Başlığı ${i + 1} - ${category}`,
    description: `Bu haber, ${category.toLowerCase()} kategorisindeki en son gelişmeleri ve analizleri içermektedir. Detaylar için haberi okumaya devam edin.`,
    url: `/news/${Math.random().toString(36).substr(2, 9)}`,
    urlToImage: MOCK_IMAGES[i % MOCK_IMAGES.length],
    publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
    content: "Bu haberin detaylı içeriği şu anda hazırlanmaktadır.",
    category: category
  }));
}

// Helper to clean HTML tags from description
function stripHtml(html: string) {
   return html.replace(/<[^>]*>?/gm, '');
}

// Helper to extract image from RSS item
function extractImage(item: any): string | null {
  if (item.enclosure && item.enclosure.url) return item.enclosure.url;
  if (item['media:content'] && item['media:content'].url) return item['media:content'].url;
  if (item['media:thumbnail'] && item['media:thumbnail'].url) return item['media:thumbnail'].url;
  if (item.image && item.image.url) return item.image.url;
  
  // Try to find img src in content or description
  const content = item.content || item.description || "";
  const imgMatch = content.match(/<img[^>]+src="?([^"\s]+)"?\s*/);
  if (imgMatch) return imgMatch[1];
  
  return null;
}

export async function fetchNews(category: string = "general", pageSize: number = 10): Promise<Article[]> {
  try {
    // 1. Try fetching from RSS Feed (Primary for Demo/Free usage)
    const feedUrl = RSS_FEEDS[category] || RSS_FEEDS.general;
    const feed = await parser.parseURL(feedUrl);
    
    const articles: Article[] = feed.items.slice(0, pageSize).map((item: any) => {
      const imageUrl = extractImage(item);
      
      return {
        source: { 
          id: null, 
          name: feed.title || "Haber Kaynağı" 
        },
        author: item.creator || item.author || "Editör",
        title: item.title || "Başlıksız Haber",
        description: item.contentSnippet || stripHtml(item.description || item.content || ""),
        url: item.link || "",
        urlToImage: imageUrl,
        publishedAt: item.pubDate || new Date().toISOString(),
        content: item.content || item.contentSnippet || "",
        category: category
      };
    });
    
    // Filter valid articles
    const validArticles = articles.filter(a => a.title && a.url);
    
    if (validArticles.length > 0) {
      return validArticles;
    }
    
    throw new Error("No articles found in RSS");

  } catch (error) {
    console.error(`RSS Fetch Error for ${category}:`, error);
    
    // 2. Fallback to Mock Data
    console.warn("Falling back to Mock Data");
    return generateMockArticles(pageSize, category === "general" ? "Gündem" : category);
  }
}

export async function fetchNewsById(id: string): Promise<Article | null> {
  // Since we don't have a real DB, we simulate finding by ID
  // In a real app, we would query our DB or CMS.
  // For now, we return a high-quality mock detail page or try to find in recent cache if possible.
  
  const mockArticle = generateMockArticles(1, "Detay")[0];
  mockArticle.title = id; // Use the ID (which is the title in our URL structure) as the title
  mockArticle.description = "Bu haberin detayları şu anda canlı yayında güncellenmektedir. Lütfen daha sonra tekrar kontrol ediniz.";
  
  return mockArticle;
}
