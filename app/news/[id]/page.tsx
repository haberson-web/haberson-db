import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Share2, Clock, User, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { fetchNewsById } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({ params }: PageProps) {
  // Decode the title from the URL to use as ID/Lookup
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  
  // Fetch article (in a real app, this would be by UUID)
  const article = await fetchNewsById(decodedId);

  if (!article) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Haber Bulunamadı</h1>
        <Link href="/" className="text-red-600 hover:underline">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  const formattedTime = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true, locale: tr })
    : "Az önce";
    
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
            <span className="inline-block rounded bg-red-600 px-3 py-1 text-sm font-bold mb-4">
              {article.category || "Haber"}
            </span>
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl drop-shadow-lg">
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
          <p className="lead text-xl md:text-2xl font-medium text-zinc-900 leading-relaxed mb-8">
            {article.description}
          </p>
          
          <p>
            {article.content 
              ? article.content.split("[")[0] 
              : "Bu haberin detaylı içeriği şu anda hazırlanmaktadır. Gelişmeler oldukça sayfamız güncellenecektir."
            }
          </p>
          
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
          </p>
          
          {/* External Link */}
          <div className="my-10 rounded-xl bg-zinc-50 p-6 border border-zinc-200">
            <h3 className="text-lg font-bold mb-2">Haberin Kaynağı</h3>
            <p className="text-sm text-zinc-600 mb-4">
              Bu haberin orijinaline ulaşmak ve daha fazla detay okumak için aşağıdaki bağlantıyı kullanabilirsiniz.
            </p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
            >
              Kaynağa Git <Tag size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
