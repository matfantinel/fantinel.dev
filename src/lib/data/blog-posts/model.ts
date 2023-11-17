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
  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    content: content,
    date: frontmatter.date,
    updated: frontmatter.updated,
    coverImage: frontmatter.coverImage ? {
      src: '/images' + frontmatter.coverImage,
      alt: frontmatter.coverImageAlt
    } : undefined,
    showImage: frontmatter.showImage,
    socialImage: frontmatter.socialImage ? {
      src: '/images' + frontmatter.socialImage,
      alt: ''
    } : undefined,
    tags: frontmatter.tags.sort((a: string, b: string) => a.localeCompare(b)),
    categories: frontmatter.categories,
    showToc: frontmatter.showToc,
    hidden: frontmatter.hidden,
    readingTime: readingTime(striptags(content) || '').text
  }
}

export default BlogPost;