import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articles, principles, profile, projects } from "@/lib/content";

const textLinkClasses =
  "flex items-center gap-[7px] text-dim text-[0.72rem] transition-colors duration-[160ms] ease-[var(--ease-hover)] hover:text-text";
const heroLinkClasses =
  "flex items-center gap-1.5 text-dim text-[0.76rem] transition-colors duration-[160ms] ease-[var(--ease-hover)] hover:text-text";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1040px] px-7 max-[640px]:px-5">
        <section className="flex flex-col justify-between min-h-[calc(100svh-88px)] pt-[70px] pb-[54px] max-[640px]:min-h-[calc(100svh-76px)] max-[640px]:pt-[46px] max-[640px]:pb-[30px]">
          <p className="m-0 text-dim text-[0.72rem] uppercase">
            <span
              aria-hidden="true"
              className="relative mr-2 inline-block size-[7px] rounded-full bg-[#65b978] shadow-[0_0_0_4px_rgba(101,185,120,0.1)] after:absolute after:inset-0 after:rounded-full after:content-[''] after:[animation:availability-pulse_2.8s_var(--ease-fluid)_infinite]"
            />{" "}
            {profile.availability}
          </p>
          <div data-reveal className="mt-[78px] mb-[90px] max-w-[810px] max-[640px]:mt-[60px] max-[640px]:mb-[60px]">
            <h1 className="m-0 mb-[38px] font-heading text-[6.5rem] font-medium leading-[0.86] max-[840px]:text-[5rem] max-[640px]:text-[4rem] max-[640px]:mb-[30px]">
              {profile.name}
              <span className="text-primary">.</span>
            </h1>
            <p className="m-0 mb-5 max-w-[690px] font-heading text-[1.85rem] font-medium leading-[1.2] text-text max-[640px]:text-[1.5rem]">
              {profile.role}.
            </p>
            <p className="m-0 max-w-[680px] leading-[1.75] text-dim">{profile.intro}</p>
          </div>
          <div className="grid grid-cols-5 min-h-[58px] border-y border-line max-[640px]:grid-cols-4" aria-label="Profile links">
            <a href={`mailto:${profile.email}`} className={heroLinkClasses}>
              Email <ArrowUpRight size={14} />
            </a>
            <a href={profile.github} className={heroLinkClasses}>
              GitHub <ArrowUpRight size={14} />
            </a>
            <a href={profile.linkedin} className={heroLinkClasses}>
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a href={profile.x} className={heroLinkClasses}>
              X <ArrowUpRight size={14} />
            </a>
            <span className="flex items-center justify-end gap-1.5 text-quiet text-[0.72rem] uppercase max-[640px]:hidden">
              {profile.location}
            </span>
          </div>
        </section>

        <section className="border-t border-line pt-[116px] pb-[132px] max-[640px]:pt-[82px] max-[640px]:pb-[94px]" aria-labelledby="selected-work">
          <div data-reveal className="grid grid-cols-[58px_minmax(0,1fr)_auto] gap-6 items-start mb-[62px] max-[640px]:grid-cols-[34px_minmax(0,1fr)] max-[640px]:mb-[44px]">
            <p className="m-0 text-quiet text-[0.7rem] uppercase">01</p>
            <div>
              <p className="m-0 mb-[15px] text-primary text-[0.7rem] uppercase">Selected work</p>
              <h2 id="selected-work" className="m-0 max-w-[650px] font-heading text-[2.55rem] font-medium leading-[1.08] max-[640px]:text-[2.05rem]">
                Systems built for the real world.
              </h2>
            </div>
            <Link href="/projects" className={`${textLinkClasses} self-end max-[640px]:col-start-2 max-[640px]:mt-4 max-[640px]:w-fit`}>
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="border-t border-line">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>

        <section
          className="border-t border-line pt-[116px] pb-[132px] grid grid-cols-[minmax(280px,0.82fr)_minmax(420px,1.18fr)] gap-[82px] max-[640px]:pt-[82px] max-[640px]:pb-[94px] max-[840px]:grid-cols-[minmax(0,1fr)] max-[840px]:gap-[52px]"
          aria-labelledby="technical-writing"
        >
          <div data-reveal className="grid grid-cols-[42px_minmax(0,1fr)] m-0 sticky top-[126px] max-[840px]:static max-[640px]:grid-cols-[34px_minmax(0,1fr)] max-[640px]:mb-[44px]">
            <p className="m-0 text-quiet text-[0.7rem] uppercase">02</p>
            <div>
              <p className="m-0 mb-[15px] text-primary text-[0.7rem] uppercase">Technical writing</p>
              <h2 id="technical-writing" className="m-0 max-w-[650px] font-heading text-[2.55rem] font-medium leading-[1.08] max-[640px]:text-[2.05rem]">
                Notes on making software hold up.
              </h2>
              <p className="mt-6 max-w-[560px] leading-[1.7] text-dim">
                Long-form writing about architecture, AI systems, product decisions,
                and the lessons that only appear after shipping.
              </p>
            </div>
            <Link href="/articles" className={`${textLinkClasses} self-end col-start-2 mt-7 w-fit max-[640px]:mt-4`}>
              Read all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="border-t border-line">
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </section>

        <section className="border-t border-line pt-[116px] pb-[80px] max-[640px]:pt-[82px] max-[640px]:pb-[94px]" aria-labelledby="principles">
          <div data-reveal className="grid grid-cols-[58px_minmax(0,1fr)_auto] gap-6 items-start mb-[62px] max-[640px]:grid-cols-[34px_minmax(0,1fr)] max-[640px]:mb-[44px]">
            <p className="m-0 text-quiet text-[0.7rem] uppercase">03</p>
            <div>
              <p className="m-0 mb-[15px] text-primary text-[0.7rem] uppercase">Working principles</p>
              <h2 id="principles" className="m-0 max-w-[650px] font-heading text-[2.55rem] font-medium leading-[1.08] max-[640px]:text-[2.05rem]">
                How I approach the work.
              </h2>
            </div>
          </div>
          <div className="border-t border-line grid grid-cols-2 max-[640px]:grid-cols-1">
            {principles.map((principle, index) => (
              <article
                data-reveal
                style={{ "--reveal-delay": `${(index % 2) * 60}ms` } as CSSProperties}
                className="border-b border-line grid gap-[14px] grid-cols-[38px_1fr] min-h-[190px] pt-7 pr-[34px] pb-7 pl-0 odd:border-r odd:border-line even:pl-[34px] max-[640px]:odd:border-r-0 max-[640px]:even:pl-0 max-[640px]:py-[26px] max-[640px]:pr-0"
                key={principle.title}
              >
                <span className="text-quiet text-[0.68rem]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="m-0 text-base font-medium leading-[1.4]">{principle.title}</h3>
                <p className="col-start-2 m-0 leading-[1.65] text-dim">{principle.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
