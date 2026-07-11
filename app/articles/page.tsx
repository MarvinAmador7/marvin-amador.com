import type { CSSProperties } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articles } from "@/lib/content";

export const metadata = {
  title: "Articles | Marvin",
  description: "Deep technical articles on software architecture, AI systems, and operations.",
};

export default function ArticlesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1040px] px-7 min-h-[calc(100vh-88px)] pb-[112px] max-[640px]:px-5">
        <section className="grid grid-cols-[1fr_2.2fr] min-h-[58vh] pt-[108px] pb-[92px] max-[640px]:block max-[640px]:min-h-[62vh] max-[640px]:pt-[80px] max-[640px]:pb-[72px]">
          <p data-reveal className="m-0 text-quiet text-[0.7rem] uppercase">02 / Articles</p>
          <h1 data-reveal style={{ "--reveal-delay": "70ms" } as CSSProperties} className="m-0 max-w-[720px] font-heading text-[4.4rem] font-medium leading-[0.96] max-[640px]:text-[3rem] max-[640px]:mt-[22px]">
            Deep technical writing, without the hand-waving.
          </h1>
          <p data-reveal style={{ "--reveal-delay": "140ms" } as CSSProperties} className="col-start-2 mt-[30px] max-w-[620px] leading-[1.75] text-dim max-[640px]:mt-[26px]">
            Architecture notes, implementation walkthroughs, production lessons,
            and the tradeoffs behind engineering decisions.
          </p>
        </section>

        <section className="border-t border-line mb-[60px] min-[641px]:[&>article>a]:grid-cols-[150px_minmax(0,1fr)_24px]">
          {articles.map((article, index) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
