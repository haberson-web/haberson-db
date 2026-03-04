import { Article } from "@/types/news";
import Parser from "rss-parser";

// 1. Initialize RSS Parser with custom fields to catch images
const parser = new Parser({
  customFields: {
    item: ['media:content', 'media:thumbnail', 'enclosure', 'image', 'content:encoded'],
  }
});

// 2. Define Reliable RSS Sources (Turkish)
const RSS_FEEDS: Record<string, string> = {
  general: "https://www.trthaber.com/xml/sondakika.xml",
  business: "https://www.trthaber.com/xml/ekonomi.xml",
  sports: "https://www.trthaber.com/xml/spor.xml",
  technology: "https://www.donanimhaber.com/rss/tum/",
  world: "https://www.trthaber.com/xml/dunya.xml",
  health: "https://www.trthaber.com/xml/saglik.xml",
  science: "https://www.trthaber.com/xml/bilim-teknoloji.xml"
};

// 3. High-Quality Fallback Images by Category
const FALLBACK_IMAGES: Record<string, string> = {
  general: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600",
  business: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600",
  sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600",
  technology: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600",
  world: "https://images.unsplash.com/photo-1529101091760-61df6be21879?q=80&w=1600",
  default: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600"
};

// Helper: Strip HTML tags
function stripHtml(html: string) {
   return html.replace(/<[^>]*>?/gm, '').trim();
}

// Helper: Robust Image Extractor
function extractImage(item: any, category: string): string {
  // Try RSS standard fields
  if (item.enclosure?.url) return item.enclosure.url;
  if (item['media:content']?.url) return item['media:content'].url;
  if (item['media:thumbnail']?.url) return item['media:thumbnail'].url;
  if (item.image?.url) return item.image.url;
  
  // Try regex in content
  const content = item['content:encoded'] || item.content || item.description || "";
  const imgMatch = content.match(/<img[^>]+src="?([^"\s]+)"?\s*/);
  if (imgMatch) return imgMatch[1];
  
  // Return category specific fallback
  return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;
}

// Helper: Generate ID from title (slugify)
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

export async function fetchNews(category: string = "general", pageSize: number = 10): Promise<Article[]> {
  try {
    const feedUrl = RSS_FEEDS[category] || RSS_FEEDS.general;
    const feed = await parser.parseURL(feedUrl);
    
    // Transform RSS items to our Article interface
    const articles: Article[] = feed.items.slice(0, pageSize).map((item: any) => {
      const title = item.title || "Başlıksız Haber";
      const imageUrl = extractImage(item, category);
      const description = item.contentSnippet || stripHtml(item.description || "");
      
      // Use URL as ID if possible, otherwise generate a slug
      // We'll store the slug in the 'url' field for internal routing, 
      // and the real link in 'source.id' or similar if needed. 
      // But for this project, let's keep 'url' as the external link 
      // and use a computed ID for internal routing.
      
      return {
        source: { 
          id: null, 
          name: feed.title?.replace("TRT Haber - ", "") || "Haber Kaynağı" 
        },
        author: item.creator || "Editör Masası",
        title: title,
        description: description.substring(0, 150) + "...",
        url: item.link || "", // External Link
        urlToImage: imageUrl,
        publishedAt: item.pubDate || new Date().toISOString(),
        content: item['content:encoded'] || item.content || description,
        category: category
      };
    });
    
    return articles;

  } catch (error) {
    console.error(`RSS Fetch Error (${category}):`, error);
    return []; // Return empty array so UI can handle it gracefully (or show skeleton)
  }
}

export async function fetchNewsById(slug: string): Promise<Article | null> {
  // Since we don't have a DB, we'll try to find this article in our known feeds.
  // We'll search across all categories to find a matching title/slug.
  // This is inefficient but necessary without a real backend/DB.
  
  const categories = Object.keys(RSS_FEEDS);
  
  for (const cat of categories) {
    const articles = await fetchNews(cat, 20); // Check last 20 items per category
    const found = articles.find(a => generateSlug(a.title) === slug || a.title === decodeURIComponent(slug));
    if (found) return found;
  }
  
  return null;
}
