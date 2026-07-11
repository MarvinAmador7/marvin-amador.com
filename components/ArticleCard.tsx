import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Article } from "@/lib/content";

export function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
      className="border-b border-line"
    >
      <Link
        href={`/articles/${article.slug}`}
        className="group grid grid-cols-[112px_minmax(0,1fr)_20px] items-start gap-6 min-h-[190px] py-[26px] origin-center transition-transform duration-[200ms] ease-[var(--ease-fluid)] active:scale-[0.995] max-[640px]:grid-cols-[1fr_18px] max-[640px]:min-h-0"
      >
        <p className="m-0 grid gap-2 text-[0.7rem] uppercase text-quiet max-[640px]:col-span-full max-[640px]:flex max-[640px]:justify-between">
          <time dateTime={article.date}>{article.date}</time>
          <span className="text-quiet">{article.readTime}</span>
        </p>
        <div>
          <h3 className="m-0 mb-[13px] text-base font-medium leading-[1.4]">{article.title}</h3>
          <p className="m-0 leading-[1.65] text-dim">{article.deck}</p>
        </div>
        <ArrowRight
          className="text-quiet transition-[color,translate] duration-[220ms] ease-[var(--ease-fluid)] group-hover:-translate-y-[3px] group-hover:translate-x-[3px] group-hover:text-primary"
          size={18}
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
