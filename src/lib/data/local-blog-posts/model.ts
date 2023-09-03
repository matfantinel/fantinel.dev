import readingTime from 'reading-time/lib/reading-time';
import striptags from 'striptags';
import type BlogPost from "../blog-posts/model";

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
    tags: frontmatter.tags,
    categories: frontmatter.categories,
    readingTime: readingTime(striptags(content) || '').text
  }
}