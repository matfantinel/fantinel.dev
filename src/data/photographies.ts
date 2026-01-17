import type { Photography } from "@schemas/photography";
import { handleCmsMediaPath } from "@utils/functions";
import { getCollection } from "astro:content";
import { slug } from 'github-slugger';

/**
 * Sanitizes a photography post to make it ready for using it in the UI.
 * @param photography The photography post to sanitize.
 * @param filepath The path to the photography file.
 * @param body The body of the photography post.
 * @returns The sanitized photography post.
 */
export function sanitizePhotography(photography: Photography, filepath: string, body?: string) {
  photography.content = body;

  const title = filepath.split("/").pop()?.replace(".md", "") || "";

  photography.slug = slug(title);

  if (photography.image) {
    photography.image = handleCmsMediaPath(photography.image);
  }

  return photography;
}

/**
 * Gets paginated photography posts.
 * @param page The page number to get posts for.
 * @param options The options for the pagination.
 * @returns The paginated photography posts.
 */
export async function getPaginatedPhotographies(page: number, options: { postsPerPage?: number } = { postsPerPage: 20 }) {
  const { postsPerPage = 12 } = options;

  let photographies = await getCollection("photographies");
  let sanitizedPhotographies = photographies.map((photography) => sanitizePhotography(photography.data as unknown as Photography, photography.filePath ?? "", photography.rendered?.html));

  // Sort by date (newest first)
  sanitizedPhotographies = sanitizedPhotographies
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());

  const totalPages = Math.ceil(sanitizedPhotographies.length / postsPerPage);
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePhotographies = sanitizedPhotographies.slice(start, end);

  return {
    photographies: pagePhotographies,
    currentPage: page,
    totalPages,
    totalPhotographies: sanitizedPhotographies.length,
  };
}

/**
 * Gets the recent photography posts.
 * @param limit The number of posts to get.
 * @returns The recent photography posts.
 */
export async function getRecentPhotographies(limit: number = 4): Promise<Photography[]> {
  const { photographies } = await getPaginatedPhotographies(1, { postsPerPage: limit });
  return photographies;
}

/**
 * Gets all photography posts.
 * @returns All photography posts.
 */
export async function getAllPhotographyPosts(): Promise<Photography[]> {
  const { photographies } = await getPaginatedPhotographies(1, { postsPerPage: 1000 });
  return photographies;
}