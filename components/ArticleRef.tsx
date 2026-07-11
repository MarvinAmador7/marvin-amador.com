import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ArticleRefProps = {
  href: string;
  label: string;
  className?: string;
};

/**
 * A standalone, primary-colored link that points from a project case study
 * into a deeper article. Renders internal hrefs via next/link and external
 * ones as a plain anchor opening in a new tab.
 */
export function ArticleRef({ href, label, className }: ArticleRefProps) {
  const isExternal = href.startsWith("http");

  const classes = cn(
    "group inline-flex w-fit items-center gap-[7px] py-1 text-[0.82rem] font-medium text-primary underline-offset-[5px] transition-colors duration-[160ms] ease-[var(--ease-fluid)] hover:underline",
    className,
  );

  const content = (
    <>
      {label}
      <ArrowRight
        className="transition-transform duration-[220ms] ease-[var(--ease-fluid)] group-hover:-translate-y-[2px] group-hover:translate-x-[3px]"
        size={16}
        aria-hidden="true"
      />
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
