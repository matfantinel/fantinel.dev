import { handleCmsMediaPath } from "@utils/functions";
import type { RenderedContent } from "astro:content";
import { getCollection } from "astro:content";
import type { MdPage } from "@schemas/md-pages";

/**
 * Sanitizes an MdPage to make it ready for using it in the UI.
 * @param page The MdPage to sanitize.
 * @param renderedPage The rendered page.
 * @returns The sanitized page.
 */
export function sanitizeMdPageData(page: MdPage, renderedPage?: RenderedContent) {
  page.content = renderedPage?.html;

  if (page.heroImage) {
    page.heroImage = handleCmsMediaPath(page.heroImage);
  }

  if (page.showToc && renderedPage?.metadata?.headings) {
    page.toc = (renderedPage.metadata.headings as any[]).map((heading: any) => {
      return {
        slug: heading.slug,
        text: heading.text,
        depth: heading.depth
      }
    }).filter((heading) => heading !== null);
  }

  return page;
}

/**
 * Gets all MdPages.
 * @returns All MdPages.
 */
export async function getAllMdPages(): Promise<MdPage[]> {
  const pages = await getCollection("mdPages");
  return pages.map((page) => sanitizeMdPageData(page.data as unknown as MdPage, page.rendered));
}

/**
 * Gets a single MdPage by slug.
 * @param slug The slug of the page to get.
 * @returns The MdPage or undefined if not found.
 */
export async function getMdPageBySlug(slug: string): Promise<MdPage | undefined> {
  const pages = await getAllMdPages();
  return pages.find((page) => page.slug === slug);
}
