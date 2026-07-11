import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/content";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="border-b border-line [animation:reveal_600ms_both] [&:nth-child(2)]:[animation-delay:70ms] [&:nth-child(3)]:[animation-delay:140ms]">
      <Link
        href={`/projects/${project.slug}`}
        className="group grid grid-cols-[58px_minmax(0,1fr)_24px] gap-6 min-h-[200px] py-[30px] transition-[background-color,padding] duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-surface hover:px-[14px] max-[640px]:grid-cols-[30px_minmax(0,1fr)_18px] max-[640px]:gap-3 max-[640px]:min-h-0 max-[640px]:py-[26px] max-[640px]:hover:px-0"
      >
        <span className="m-0 text-[0.7rem] uppercase text-quiet">{String(index + 1).padStart(2, "0")}</span>
        <div className="grid grid-cols-[minmax(180px,0.8fr)_minmax(260px,1.2fr)] gap-x-[42px] gap-y-[18px] max-[640px]:block">
          <p className="col-span-full m-0 text-[0.7rem] uppercase text-quiet">
            {project.eyebrow} · {project.year}
          </p>
          <h3 className="m-0 text-base font-medium leading-[1.4] max-[640px]:my-3">{project.title}</h3>
          <p className="m-0 leading-[1.65] text-dim">{project.summary}</p>
          <div className="col-span-full flex flex-wrap gap-x-[18px] gap-y-2 max-[640px]:mt-[18px]">
            {project.stack.slice(0, 4).map((item) => (
              <span key={item} className="text-[0.68rem] text-quiet before:mr-1.5 before:text-primary before:content-['+']">
                {item}
              </span>
            ))}
          </div>
        </div>
        <ArrowUpRight
          className="text-quiet transition-[color,transform] duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-[3px] group-hover:translate-x-[3px] group-hover:text-primary"
          size={19}
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
