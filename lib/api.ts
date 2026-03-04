import { Article, NewsResponse } from "@/types/news";

// Placeholder for API key - user can plug theirs in later
const NEWS_API_KEY = process.env.NEWS_API_KEY || "YOUR_API_KEY_HERE";
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

// Fallback Mock Data Generator (High Quality, Realistic)
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600", // Tech/News
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600", // Newspaper
  "https://images.unsplash.com/photo-1526304640152-d4619684e484?q=80&w=1600", // Economy
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600", // Sports
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600", // Tech
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600", // Business
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1600", // Health
  "https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?q=80&w=1600", // General
];

const MOCK_TITLES = [
  "Türkiye'nin Yeni Yapay Zeka Stratejisi Açıklandı: 2026 Hedefleri",
  "Borsa İstanbul'da Rekor Kapanış: Yatırımcılar Ne Yapmalı?",
  "Süper Lig'de Derbi Heyecanı: Takımların Son Durumu",
  "Küresel İklim Zirvesi'nde Kritik Kararlar Alındı",
  "Yerli Otomobil Togg'un Yeni Modeli Tanıtıldı",
  "Merkez Bankası Faiz Kararını Açıkladı: Piyasalar Nasıl Tepki Verdi?",
  "İstanbul'da Toplu Taşıma Düzenlemesi: Metro Seferleri Artırılıyor",
  "Teknoloji Devinden Şok İşten Çıkarma Kararı",
  "Avrupa Birliği'nden Türkiye Raporu: Ekonomik Büyüme Beklentisi",
  "Milli Takım Avrupa Şampiyonası Hazırlıklarına Başladı"
];

function generateMockArticles(count: number, category: string = "General"): Article[] {
  return Array.from({ length: count }).map((_, i) => ({
    source: { id: "mock-news", name: "SonHaber Ajansı" },
    author: "Editör Masası",
    title: MOCK_TITLES[i % MOCK_TITLES.length] + ` - ${category} Gündemi`,
    description: `Bu haber, ${category.toLowerCase()} kategorisindeki en son gelişmeleri ve analizleri içermektedir. Detaylar için haberi okumaya devam edin. Uzman görüşleri ve saha raporları ile derlenen bu içerik, gündemin nabzını tutuyor.`,
    url: `/news/${Math.random().toString(36).substr(2, 9)}`, // Internal link for mock
    urlToImage: MOCK_IMAGES[i % MOCK_IMAGES.length],
    publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
    content: "Bu haberin detaylı içeriği şu anda hazırlanmaktadır. Lütfen daha sonra tekrar ziyaret ediniz veya kaynak linkinden orijinal habere ulaşınız. (Mock Data)",
    category: category
  }));
}

export async function fetchNews(category: string = "general", pageSize: number = 10): Promise<Article[]> {
  // If no API key is set or it's the placeholder, return mock data immediately
  // Also, for 'production' demo stability without a real paid key, we might prefer mock data
  // unless specifically configured.
  if (!process.env.NEWS_API_KEY || process.env.NEWS_API_KEY === "YOUR_API_KEY_HERE") {
    console.warn("Using Mock Data (No API Key found)");
    return generateMockArticles(pageSize, category === "general" ? "Gündem" : category);
  }

  try {
    const url = `${NEWS_API_BASE_URL}/top-headlines?country=tr&category=${category}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

    if (!res.ok) {
      throw new Error(`NewsAPI Error: ${res.statusText}`);
    }

    const data: NewsResponse = await res.json();
    
    // Filter out articles without images to keep UI clean
    const cleanArticles = data.articles.filter(a => a.urlToImage && a.title && a.description);
    
    if (cleanArticles.length === 0) {
       return generateMockArticles(pageSize, category);
    }

    return cleanArticles;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return generateMockArticles(pageSize, category); // Fallback to mock on error
  }
}

export async function fetchNewsById(id: string): Promise<Article | null> {
  // Since NewsAPI doesn't support fetching by ID efficiently for free,
  // we will simulate finding it or returning a generic mock detail.
  // In a real app with a DB, we would query the DB.
  
  // For this demo, we'll return a rich mock object
  const mockArticle = generateMockArticles(1, "Detay")[0];
  mockArticle.title = "Haber Detayı: " + id; // Just to show it's dynamic
  return mockArticle;
}
