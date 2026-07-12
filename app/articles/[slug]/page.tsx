import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleDiagram } from "@/components/ArticleDiagram";
import { ArticleRef } from "@/components/ArticleRef";
import { toolLogos } from "@/components/ToolLogos";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { articles } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  return {
    title: article ? `${article.title} | Marvin` : "Article | Marvin",
    description: article?.deck,
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-[calc(100vh-88px)] max-w-[830px] px-7 pb-[112px] max-[640px]:px-5">
        <Link
          href="/articles"
          className="flex w-fit items-center gap-[7px] pt-[38px] text-[0.72rem] text-dim transition-colors duration-[160ms] ease-[var(--ease-hover)] hover:text-text"
        >
          <ArrowLeft size={16} /> Articles
        </Link>

        <article className="pt-[74px]">
          <header data-reveal className="border-b border-line pb-[54px]">
            <p className="m-0 text-[0.7rem] uppercase text-quiet">Article / {article.readTime}</p>
            <h1 className="mt-6 mb-[30px] font-heading text-[4.35rem] font-medium leading-[0.96] max-[640px]:mt-[22px] max-[640px]:text-[3rem]">
              {article.title}
            </h1>
            <p className="mb-0 max-w-[650px] text-dim leading-[1.75]">{article.deck}</p>
            <div className="mt-9 flex items-center gap-5 text-[0.68rem] uppercase text-quiet max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-[9px]">
              <time dateTime={article.date}>{article.date}</time>
              <span>{article.tags.join(" · ")}</span>
              {article.heroLogos?.length ? (
                <span className="ml-auto flex items-center gap-4 max-[640px]:ml-0">
                  {article.heroLogos.map((kind) => {
                    const { Logo, href, label } = toolLogos[kind];
                    return (
                      <a
                        key={kind}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="text-quiet transition-colors duration-[160ms] ease-[var(--ease-fluid)] hover:text-text"
                      >
                        <Logo size={22} />
                      </a>
                    );
                  })}
                </span>
              ) : null}
            </div>
          </header>

          {article.sections.map((section, index) => (
            <section key={section.heading} data-reveal className="mb-[74px] pt-[68px]">
              <p className="m-0 text-[0.7rem] uppercase text-quiet">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-[14px] mb-6 font-heading text-[2.1rem] font-medium leading-[1.12] max-[640px]:text-[1.75rem]">
                {section.heading}
              </h2>
              {section.visual ? <ArticleDiagram kind={section.visual} /> : null}
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mb-6 font-ui text-[0.94rem] leading-[1.9] text-[#aaa9a4] last:mb-0">
                  {paragraph}
                </p>
              ))}
              {section.code ? (
                <pre className="mt-[30px] overflow-x-auto border border-line bg-surface-raised p-6 font-ui text-[0.78rem] leading-[1.75] text-[#d7d7d1]">
                  <code>{section.code}</code>
                </pre>
              ) : null}
            </section>
          ))}

          {article.references ? (
            <footer data-reveal className="border-t border-line pt-[38px]">
              <p className="m-0 mb-5 text-[0.7rem] uppercase text-quiet">References</p>
              <div className="flex flex-col items-start gap-[9px]">
                {article.references.map((reference) => (
                  <ArticleRef key={reference.href} href={reference.href} label={reference.label} />
                ))}
              </div>
            </footer>
          ) : null}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
