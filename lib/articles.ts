import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  deck: z.string(),
  // Must be a quoted YYYY-MM-DD string. Unquoted YAML dates parse to a Date
  // object (not a string) and fail here, which is the intended guard.
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be a quoted YYYY-MM-DD string"),
  readTime: z.string(),
  tags: z.array(z.string()),
  heroLogos: z.array(z.enum(["pi", "smithers"])).optional(),
  references: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
  draft: z.boolean().optional().default(false),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
export type ArticleMeta = ArticleFrontmatter & { slug: string };

function readArticleFile(slug: string): string {
  return fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.mdx`), "utf8");
}

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getArticleMeta(slug: string): ArticleMeta {
  const { data } = matter(readArticleFile(slug));
  const frontmatter = articleFrontmatterSchema.parse(data);
  return { ...frontmatter, slug };
}

export function getAllArticleMeta(): ArticleMeta[] {
  return getArticleSlugs()
    .map(getArticleMeta)
    .filter((meta) => !meta.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticleSource(slug: string): string {
  return readArticleFile(slug);
}
