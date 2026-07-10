import { ProjectCard } from "@/components/ProjectCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { projects } from "@/lib/content";

export const metadata = {
  title: "Projects | Marvin",
  description: "Selected software projects, case studies, and implementation notes.",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1040px] px-7 min-h-[calc(100vh-88px)] pb-[112px] max-[640px]:px-5">
        <section className="grid grid-cols-[1fr_2.2fr] min-h-[58vh] pt-[108px] pb-[92px] max-[640px]:block max-[640px]:min-h-[62vh] max-[640px]:pt-[80px] max-[640px]:pb-[72px]">
          <p className="m-0 text-quiet text-[0.7rem] uppercase [animation:reveal_600ms_both]">01 / Projects</p>
          <h1 className="m-0 max-w-[720px] font-heading text-[4.4rem] font-medium leading-[0.96] [animation:reveal_600ms_both] max-[640px]:text-[3rem] max-[640px]:mt-[22px]">
            Selected systems and the thinking behind them.
          </h1>
          <p className="col-start-2 mt-[30px] max-w-[620px] leading-[1.75] text-dim [animation:reveal_600ms_both] max-[640px]:mt-[26px]">
            Case studies covering the problem, constraints, technical path, and
            outcomes behind shipped software.
          </p>
        </section>

        <section className="border-t border-line mb-[60px]">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
