import type { Image } from "$lib/utils/types";
import readingTime from 'reading-time/lib/reading-time';
import striptags from 'striptags';

type BlogPost = {
  slug: string,
  title: string,
  excerpt: string,
  content: string,
  date?: string,
  updated?: string,
  coverImage?: Image,
  showImage?: boolean,
  socialImage?: Image,
  tags: string[],
  categories: string[],
  keywords?: string[],
  readingTime?: string,
  relatedPosts?: BlogPost[],
  showToc?: boolean,
  hidden?: boolean
}

export const frontmatterToBlogPost = (frontmatter: any, content: string): BlogPost => {

  // Count how many slashes are in the frontmatter.coverImage
  // If there are more than one, it means that the image is from a different folder than the article's
  // In that case, we don't add the /cms/articles/media/ prefix
  const coverImage = frontmatter.coverImage ? {
    src: frontmatter.coverImage.split('/').length > 1 ? frontmatter.coverImage : `/cms/articles/media/${frontmatter.slug}/${frontmatter.coverImage}`,
    alt: frontmatter.coverImageAlt
  } : undefined;

  const socialImage = frontmatter.socialImage ? {
    src: frontmatter.socialImage.split('/').length > 1 ? frontmatter.socialImage : `/cms/articles/media/${frontmatter.slug}/${frontmatter.socialImage}`,
    alt: ''
  } : undefined;


  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    content: content,
    date: frontmatter.date,
    updated: frontmatter.updated,
    coverImage,
    showImage: frontmatter.showImage,
    socialImage,
    tags: frontmatter.tags?.sort((a: string, b: string) => a.localeCompare(b)),
    categories: frontmatter.categories,
    showToc: frontmatter.showToc,
    hidden: frontmatter.hidden,
    readingTime: readingTime(striptags(content) || '').text
  }
}

export default BlogPost;