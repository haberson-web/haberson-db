import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/news";

interface HeroProps {
  featured: Article;
  secondary: Article[];
}

export default function Hero({ featured, secondary }: HeroProps) {
  // Use a fallback if image is missing
  const featuredImage = featured.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600";
  
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Main Featured Article */}
        <Link 
          href={`/news/${encodeURIComponent(featured.title)}`}
          className="group relative col-span-1 flex h-[420px] overflow-hidden rounded-xl lg:col-span-2 shadow-lg"
        >
          <Image
            src={featuredImage}
            alt={featured.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 text-white md:p-8">
            <span className="inline-flex w-fit items-center rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-sm mb-3">
              {featured.category || "Manşet"}
            </span>
            <h2 className="text-2xl font-extrabold leading-tight md:text-4xl lg:text-3xl xl:text-4xl drop-shadow-md line-clamp-2 md:line-clamp-3 group-hover:text-red-400 transition-colors">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-zinc-200 line-clamp-2 drop-shadow-sm hidden md:block">
              {featured.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>Canlı Gelişme</span>
              <span className="mx-1">•</span>
              <span>Son Dakika</span>
            </div>
          </div>
        </Link>

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {secondary.map((item, index) => {
            const secondaryImage = item.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600";
            return (
              <Link
                key={index}
                href={`/news/${encodeURIComponent(item.title)}`}
                className="group relative flex h-[200px] lg:h-[100px] xl:h-[98px] overflow-hidden rounded-xl shadow-md border border-zinc-200/50"
              >
                <div className="relative w-1/3 h-full shrink-0">
                   <Image
                    src={secondaryImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                </div>
                
                <div className="relative flex flex-col justify-center w-2/3 p-4 bg-white hover:bg-zinc-50 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 uppercase tracking-wider">
                      {item.category || "Haber"}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium">Yeni</span>
                  </div>
                  <h3 className="line-clamp-2 text-sm font-bold leading-snug text-zinc-900 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
