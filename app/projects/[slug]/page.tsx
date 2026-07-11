import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Mail } from "lucide-react";
import { CaseStudyDiagram } from "@/components/CaseStudyDiagram";
import { ProjectVisual } from "@/components/ProjectVisual";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { profile, projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return {
    title: project ? `${project.title} | Marvin` : "Project | Marvin",
    description: project?.summary,
  };
}

const textLinkClass =
  "mb-[10px] gap-[7px] self-end text-[0.72rem] text-dim transition-colors duration-[160ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-text";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-[calc(100vh-88px)] max-w-[1040px] px-7 pb-[112px] max-[640px]:px-5">
        <Link
          href="/projects"
          className="flex w-fit items-center gap-[7px] pt-[38px] text-[0.72rem] text-dim transition-colors duration-[160ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-text"
        >
          <ArrowLeft size={16} /> Projects
        </Link>

        <section className="grid grid-cols-[minmax(0,1fr)_390px] items-end gap-[68px] pt-[90px] pb-[100px] max-[840px]:grid-cols-1 max-[840px]:items-start max-[640px]:gap-[46px] max-[640px]:pt-[68px] max-[640px]:pb-[76px]">
          <div className="animate-[reveal_600ms_both]">
            <p className="m-0 text-[0.7rem] uppercase text-quiet">Project / {project.year}</p>
            <h1 className="mt-6 mb-[30px] font-heading text-[4.35rem] font-medium leading-[0.96] max-[640px]:mt-[22px] max-[640px]:text-[3rem]">
              {project.title}
            </h1>
            <p className="mb-0 text-dim leading-[1.75]">{project.summary}</p>
          </div>
          <div className="animate-[reveal_600ms_both]">
            <ProjectVisual project={project} />
          </div>
        </section>

        {project.caseStudy ? (
          <>
            <section className="grid grid-cols-[58px_minmax(0,1fr)_270px] items-start gap-[38px] border-t border-line pt-[104px] pb-[116px] max-[840px]:grid-cols-1 max-[840px]:gap-[34px] max-[640px]:pt-[76px] max-[640px]:pb-[88px]">
              <p className="m-0 text-[0.7rem] uppercase text-quiet">The thesis</p>
              <div>
                <h2 className="m-0 max-w-[680px] font-heading text-[3rem] font-medium leading-[1.04] max-[640px]:text-[2.25rem]">
                  {project.caseStudy.lede}
                </h2>
                <p className="mt-[30px] max-w-[680px] text-[0.94rem] leading-[1.9] text-[#aaa9a4]">
                  {project.caseStudy.thesis}
                </p>
              </div>
              <dl className="m-0 border-t border-line max-[840px]:max-w-[520px]">
                <div className="border-b border-line py-[17px]">
                  <dt className="mb-[7px] text-[0.65rem] uppercase text-quiet">Stage</dt>
                  <dd className="m-0 text-[0.72rem] leading-[1.55] text-dim">{project.caseStudy.stage}</dd>
                </div>
                <div className="border-b border-line py-[17px]">
                  <dt className="mb-[7px] text-[0.65rem] uppercase text-quiet">Scope</dt>
                  <dd className="m-0 text-[0.72rem] leading-[1.55] text-dim">{project.caseStudy.role}</dd>
                </div>
              </dl>
            </section>

            <section className="border-t border-line pt-24 pb-[116px] max-[640px]:pt-[74px] max-[640px]:pb-[88px]" aria-labelledby="architecture-heading">
              <div className="mb-[50px] grid grid-cols-[58px_minmax(0,1fr)] gap-6 max-[640px]:grid-cols-1">
                <p className="m-0 text-[0.7rem] uppercase text-quiet">System map</p>
                <h2
                  id="architecture-heading"
                  className="m-0 max-w-[620px] font-heading text-[2.55rem] font-medium leading-[1.08] max-[640px]:text-[2.05rem]"
                >
                  One authority, multiple execution surfaces.
                </h2>
              </div>
              <div className="grid grid-cols-4 border-t border-b border-line max-[840px]:grid-cols-2 max-[640px]:grid-cols-1">
                {project.caseStudy.architecture.map((layer) => (
                  <article
                    key={layer.label}
                    className="min-h-[270px] border-r border-line px-[22px] py-6 last:border-r-0 max-[840px]:[&:nth-child(-n+2)]:border-b max-[840px]:[&:nth-child(-n+2)]:border-line max-[840px]:[&:nth-child(2)]:border-r-0 max-[640px]:min-h-0 max-[640px]:border-r-0 max-[640px]:border-b max-[640px]:border-line max-[640px]:px-0 max-[640px]:pt-6 max-[640px]:pb-7 max-[640px]:last:border-b-0"
                  >
                    <p className="m-0 mb-[54px] text-[0.64rem] uppercase text-primary max-[640px]:mb-8">{layer.label}</p>
                    <h3 className="mb-4 font-heading text-base font-medium leading-[1.35]">{layer.title}</h3>
                    <span className="text-[0.7rem] leading-[1.65] text-dim">{layer.detail}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-[minmax(0,1fr)_270px] items-start gap-[90px] border-t border-line pt-[112px] max-[840px]:grid-cols-1 max-[640px]:gap-7 max-[640px]:pt-20">
              <article className="max-w-[680px] max-[640px]:min-w-0 max-[640px]:w-full">
                {project.caseStudy.chapters.map((chapter) => (
                  <section
                    key={chapter.kicker}
                    className="mb-[132px] scroll-mt-[110px] [content-visibility:auto] [contain-intrinsic-size:auto_1000px] max-[640px]:mb-24"
                  >
                    <p className="m-0 text-[0.7rem] uppercase text-quiet">{chapter.kicker}</p>
                    <h2 className="mt-4 mb-[34px] font-heading text-[2.7rem] font-medium leading-[1.06] max-[640px]:text-[2.1rem]">
                      {chapter.title}
                    </h2>
                    <CaseStudyDiagram kind={chapter.visual} />
                    {chapter.body.map((paragraph) => (
                      <p key={paragraph} className="mb-6 text-[0.94rem] leading-[1.9] text-[#aaa9a4]">
                        {paragraph}
                      </p>
                    ))}
                    {chapter.details ? (
                      <ul className="m-0 mt-[38px] grid list-none grid-cols-2 gap-x-7 border-t border-line p-0 max-[640px]:grid-cols-1">
                        {chapter.details.map((detail) => (
                          <li
                            key={detail}
                            className="border-b border-line py-[14px] text-[0.68rem] leading-[1.55] text-dim before:mr-2 before:text-primary before:content-['+']"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {chapter.principle ? (
                      <blockquote className="mt-11 border-l-2 border-primary py-1 pl-[26px] font-heading text-[1.65rem] font-medium leading-[1.3] text-text max-[640px]:pl-5 max-[640px]:text-[1.35rem]">
                        <span className="mb-[13px] block font-ui text-[0.62rem] font-normal uppercase text-quiet">
                          Foundational decision
                        </span>
                        {chapter.principle}
                      </blockquote>
                    ) : null}
                  </section>
                ))}
              </article>

              <aside className="sticky top-[116px] grid gap-8 border-t border-line pt-[22px] max-[840px]:static">
                <div>
                  <h3 className="m-0 mb-4 text-[0.72rem] font-medium uppercase leading-[1.4]">Stack</h3>
                  <div className="flex flex-col items-start gap-[9px]">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="text-[0.68rem] text-quiet before:mr-1.5 before:text-primary before:content-['+']"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="m-0 mb-4 text-[0.72rem] font-medium uppercase leading-[1.4]">Architecture signals</h3>
                  <ul className="m-0 list-none p-0">
                    {project.metrics.map((metric) => (
                      <li key={metric} className="mb-2 text-[0.74rem] leading-[1.65] text-dim">
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="m-0 mb-4 text-[0.72rem] font-medium uppercase leading-[1.4]">Product</h3>
                  {project.links.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className={textLinkClass}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                      >
                        {link.label} <ExternalLink size={15} />
                      </a>
                    );
                  })}
                </div>
              </aside>
            </section>

            <section className="grid grid-cols-[58px_minmax(0,1fr)] gap-[38px] border-t border-line pt-[116px] pb-12 max-[640px]:grid-cols-1 max-[640px]:pt-[84px] max-[640px]:pb-7">
              <p className="m-0 text-[0.7rem] uppercase text-quiet">What this demonstrates</p>
              <div className="max-w-[740px]">
                <h2 className="m-0 mb-9 font-heading text-[3rem] font-medium leading-[1.04] max-[640px]:text-[2.25rem]">
                  {project.caseStudy.closing.title}
                </h2>
                {project.caseStudy.closing.body.map((paragraph) => (
                  <p key={paragraph} className="mb-6 text-[0.94rem] leading-[1.9] text-[#aaa9a4]">
                    {paragraph}
                  </p>
                ))}
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-7 inline-flex min-h-[44px] items-center gap-[10px] border border-text px-4 text-[0.72rem] transition-colors duration-[160ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-text hover:text-canvas"
                >
                  Discuss an agentic platform <Mail size={16} />
                </a>
              </div>
            </section>
          </>
        ) : (
          <section className="grid grid-cols-[minmax(0,1fr)_270px] items-start gap-[90px] border-t border-line pt-[88px] max-[840px]:grid-cols-1 max-[840px]:gap-[34px] max-[640px]:pt-[66px]">
            <article className="max-w-[650px]">
              <section className="mb-[74px]">
                <p className="m-0 text-[0.7rem] uppercase text-quiet">01 / Context</p>
                <h2 className="mt-[14px] mb-6 font-heading text-[2.1rem] font-medium leading-[1.12] max-[640px]:text-[1.75rem]">
                  Problem
                </h2>
                <p className="font-ui text-[0.94rem] leading-[1.9] text-[#aaa9a4]">{project.problem}</p>
              </section>
              <section className="mb-[74px]">
                <p className="m-0 text-[0.7rem] uppercase text-quiet">02 / Approach</p>
                <h2 className="mt-[14px] mb-6 font-heading text-[2.1rem] font-medium leading-[1.12] max-[640px]:text-[1.75rem]">
                  Technical approach
                </h2>
                <p className="font-ui text-[0.94rem] leading-[1.9] text-[#aaa9a4]">
                  The implementation prioritized explicit boundaries, observable state,
                  and a data model that could explain user-visible behavior after the
                  fact. The stack was chosen to keep iteration fast while leaving enough
                  structure for production support.
                </p>
              </section>
              <section className="mb-[74px]">
                <p className="m-0 text-[0.7rem] uppercase text-quiet">03 / Result</p>
                <h2 className="mt-[14px] mb-6 font-heading text-[2.1rem] font-medium leading-[1.12] max-[640px]:text-[1.75rem]">
                  Outcome
                </h2>
                <p className="font-ui text-[0.94rem] leading-[1.9] text-[#aaa9a4]">{project.outcome}</p>
              </section>
            </article>

            <aside className="sticky top-[116px] grid gap-8 border-t border-line pt-[22px] max-[840px]:static">
              <div>
                <h3 className="m-0 mb-4 text-[0.72rem] font-medium uppercase leading-[1.4]">Stack</h3>
                <div className="flex flex-col items-start gap-[9px]">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="text-[0.68rem] text-quiet before:mr-1.5 before:text-primary before:content-['+']"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="m-0 mb-4 text-[0.72rem] font-medium uppercase leading-[1.4]">Signals</h3>
                <ul className="m-0 list-none p-0">
                  {project.metrics.map((metric) => (
                    <li key={metric} className="mb-2 text-[0.74rem] leading-[1.65] text-dim">
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="m-0 mb-4 text-[0.72rem] font-medium uppercase leading-[1.4]">Links</h3>
                {project.links.map((link) => (
                  <a key={link.label} href={link.href} className={textLinkClass}>
                    {link.label} <ExternalLink size={15} />
                  </a>
                ))}
              </div>
            </aside>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
