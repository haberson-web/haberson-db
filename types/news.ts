export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category?: string; // Custom field for our internal categorization if needed
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
