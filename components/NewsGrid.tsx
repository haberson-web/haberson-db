import Link from "next/link";
import NewsCard from "./NewsCard";
import { Article } from "@/types/news";

interface NewsGridProps {
  title: string;
  items: Article[];
}

export default function NewsGrid({ title, items }: NewsGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between border-b border-zinc-200 pb-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 border-l-4 border-red-600 pl-3">
          {title}
        </h2>
        <Link
          href="#"
          className="text-sm font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline"
        >
          Tümünü Gör
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <NewsCard key={index} article={item} />
        ))}
      </div>
    </section>
  );
}
