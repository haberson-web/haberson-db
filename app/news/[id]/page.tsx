import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Share2, Clock, User, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { fetchNewsById } from "@/lib/news";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60; // Auto-update every minute

export default async function NewsDetailPage({ params }: PageProps) {
  // Decode the title from the URL to use as ID/Lookup
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  
  // Fetch article (using robust search logic)
  const article = await fetchNewsById(decodedId);

  if (!article) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="text-2xl font-bold text-zinc-900">Aradığınız haber bulunamadı veya yayından kaldırıldı.</h1>
        <p className="text-zinc-600">Haber başlığı: {decodedId}</p>
        <Link href="/" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white font-medium hover:bg-red-700 transition">
          <ArrowLeft size={18} />
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  const formattedTime = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true, locale: tr })
    : "Az önce";
    
  // Ensure we have a valid image even if API returns null
  const imageUrl = article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600";

  return (
    <article className="min-h-screen bg-white pb-16">
      {/* Header Image */}
      <div className="relative h-[400px] w-full md:h-[500px]">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-6 left-4 md:left-8 z-10">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-medium text-white transition hover:bg-white/30"
          >
            <ArrowLeft size={18} />
            Ana Sayfaya Dön
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
          <div className="mx-auto max-w-4xl">
            <span className="inline-block rounded bg-red-600 px-3 py-1 text-sm font-bold mb-4 uppercase tracking-wider">
              {article.category || "Haber"}
            </span>
            <h1 className="text-2xl font-extrabold leading-tight md:text-4xl lg:text-5xl drop-shadow-lg">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-6 mb-8 text-sm text-zinc-600">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <User size={18} className="text-red-600" />
              <span className="font-medium text-zinc-900">{article.author || "Editör Masası"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-red-600" />
              <span>{formattedTime}</span>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 hover:bg-zinc-50 transition">
            <Share2 size={16} />
            <span className="font-medium">Paylaş</span>
          </button>
        </div>

        {/* Body Text */}
        <div className="prose prose-lg prose-red max-w-none text-zinc-800">
          {/* Lead Paragraph / Description */}
          {article.description && (
            <p className="lead text-xl md:text-2xl font-medium text-zinc-900 leading-relaxed mb-8 border-l-4 border-red-600 pl-4">
              {article.description}
            </p>
          )}
          
          {/* Main Content */}
          <div dangerouslySetInnerHTML={{ __html: article.content || "" }} />
          
          {/* External Link Box */}
          <div className="my-10 rounded-xl bg-zinc-50 p-6 border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-6 bg-red-600 rounded-full"></span>
              Haberin Devamı
            </h3>
            <p className="text-sm text-zinc-600 mb-4">
              Bu haberin tüm detaylarına ve orijinal kaynağına ulaşmak için aşağıdaki bağlantıyı kullanabilirsiniz.
            </p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800 w-full sm:w-auto"
            >
              Kaynağa Git <Tag size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
