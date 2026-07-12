import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleRef } from "@/components/ArticleRef";
import { toolLogos } from "@/components/ToolLogos";
import type { ArticleFrontmatter } from "@/lib/articles";

export function ArticleLayout({
  frontmatter,
  children,
}: {
  frontmatter: ArticleFrontmatter;
  children: React.ReactNode;
}) {
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
            <p className="m-0 text-[0.7rem] uppercase text-quiet">Article / {frontmatter.readTime}</p>
            <h1 className="mt-6 mb-[30px] font-heading text-[4.35rem] font-medium leading-[0.96] max-[640px]:mt-[22px] max-[640px]:text-[3rem]">
              {frontmatter.title}
            </h1>
            <p className="mb-0 max-w-[650px] text-dim leading-[1.75]">{frontmatter.deck}</p>
            <div className="mt-9 flex items-center gap-5 text-[0.68rem] uppercase text-quiet max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-[9px]">
              <time dateTime={frontmatter.date}>{frontmatter.date}</time>
              <span>{frontmatter.tags.join(" · ")}</span>
              {frontmatter.heroLogos?.length ? (
                <span className="ml-auto flex items-center gap-4 max-[640px]:ml-0">
                  {frontmatter.heroLogos.map((kind) => {
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

          <div className="article-body pt-[68px]">
            {children}
          </div>

          {frontmatter.references?.length ? (
            <footer data-reveal className="mt-[74px] border-t border-line pt-[38px]">
              <p className="m-0 mb-5 text-[0.7rem] uppercase text-quiet">References</p>
              <div className="flex flex-col items-start gap-[9px]">
                {frontmatter.references.map((reference) => (
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
