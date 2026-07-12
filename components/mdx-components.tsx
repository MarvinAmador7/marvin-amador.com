import type { MDXComponents } from "mdx/types";
import { ArticleDiagram, type ArticleDiagramKind } from "@/components/ArticleDiagram";
import { ArticleRef } from "@/components/ArticleRef";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-[68px] mb-6 font-heading text-[2.1rem] font-medium leading-[1.12] max-[640px]:text-[1.75rem]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-10 mb-4 font-heading text-[1.4rem] font-medium leading-[1.2]" {...props} />
  ),
  p: (props) => (
    <p className="mb-6 font-ui text-[0.94rem] leading-[1.9] text-[#aaa9a4]" {...props} />
  ),
  ul: (props) => <ul className="mb-6 list-none p-0" {...props} />,
  li: (props) => (
    <li
      className="mb-2 pl-4 text-[0.9rem] leading-[1.8] text-dim before:mr-2 before:-ml-4 before:text-primary before:content-['+']"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-9 border-l-2 border-primary pl-[26px] font-heading text-[1.5rem] font-medium leading-[1.3] text-text max-[640px]:pl-5 max-[640px]:text-[1.25rem]"
      {...props}
    />
  ),
  a: (props) => (
    <a className="text-primary underline underline-offset-[3px] hover:opacity-80" {...props} />
  ),
  pre: (props) => (
    <pre
      className="mb-6 mt-[30px] overflow-x-auto border border-line bg-surface-raised p-6 font-ui text-[0.78rem] leading-[1.75] text-[#d7d7d1]"
      {...props}
    />
  ),
  Diagram: ({ kind }: { kind: ArticleDiagramKind }) => <ArticleDiagram kind={kind} />,
  ArticleRef,
};
