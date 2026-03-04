import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { Article } from "@/types/news";

interface NewsCardProps {
  article: Article;
  featured?: boolean;
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  // Format relative time (e.g., "5 dakika önce")
  const formattedTime = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true, locale: tr })
    : "Az önce";

  // Use a fallback if image is missing
  const imageUrl = article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600";
  
  // Clean up title (remove source name if present, e.g. "Title - Source")
  const cleanTitle = article.title.split(" - ")[0];

  return (
    <Link href={`/news/${encodeURIComponent(article.title)}`} className="group block h-full">
      <article className="h-full flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
        <div className={`relative overflow-hidden ${featured ? "aspect-[2/1]" : "aspect-[16/9]"}`}>
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity group-hover:opacity-50" />
          
          <span className="absolute left-3 top-3 inline-flex rounded-full bg-red-600/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-sm">
            {article.category || "Gündem"}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className={`font-bold text-zinc-900 group-hover:text-red-600 transition-colors ${featured ? "text-xl md:text-2xl line-clamp-2" : "text-base line-clamp-2"}`}>
            {cleanTitle}
          </h3>
          
          <p className="mt-2 line-clamp-2 text-sm text-zinc-600 flex-1">
            {article.description || "Haberin detayları için tıklayınız..."}
          </p>
          
          <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>{formattedTime}</span>
            <span className="text-red-600 group-hover:underline">Devamını Oku →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
