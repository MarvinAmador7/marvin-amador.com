import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArticleLayout } from "@/components/ArticleLayout";
import { mdxComponents } from "@/components/mdx-components";
import {
  articleFrontmatterSchema,
  getArticleMeta,
  getArticleSlugs,
  getArticleSource,
  type ArticleFrontmatter,
} from "@/lib/articles";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const meta = getArticleMeta(slug);
    return { title: `${meta.title} | Marvin`, description: meta.deck };
  } catch {
    return { title: "Article | Marvin" };
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getArticleSlugs().includes(slug)) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<ArticleFrontmatter>({
    source: getArticleSource(slug),
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  const validated = articleFrontmatterSchema.parse(frontmatter);

  return <ArticleLayout frontmatter={validated}>{content}</ArticleLayout>;
}
