import type { BlogPost } from '@schemas/blog';
import type { CoolLink } from '@schemas/cool-link';
import type { Photography } from '@schemas/photography';
import type { QuickReview } from '@schemas/quick-review';

export function blogPostToBlogPostCardProps(post: BlogPost) {
  return {
    title: post.title,
    slug: post.slug,
    url: `/blog/${post.slug}`,
    image: post.coverImage as string | undefined,
    imageAlt: post.coverImageAlt as string | undefined,
    readingTime: post.readingTime as string | undefined,
    excerpt: post.excerpt,
    tags: post.categories?.slice(0, 1),
  };
}

export function coolLinkToCoolLinkCardProps(link: CoolLink) {
  return {
    title: link.title as string,
    url: link.url,
    author: link.author as string | undefined,
    date: link.savedOn as any,
    tags: link.tags,
    content: link.content as string | undefined,
  };
}

export function photographyToPhotographyCardProps(photography: Photography) {
  return {
    title: photography.title,
    slug: photography.slug,
    image: photography.image,
    photoDate: photography.photoDate,
    publishedDate: photography.publishedDate,
    imageAlt: photography.imageAlt as string | undefined,
    content: photography.content as string,
    additionalImages: photography.additionalImages as any,
  };
}

export function quickReviewToQuickReviewCardProps(review: QuickReview) {
  return {
    title: review.title,
    metadata: review.metadata as string | undefined,
    slug: review.slug,
    image: review.image as string | undefined,
    rating: review.rating,
    theme: review.theme,
    customBg: review.customBg as string | undefined,
    content: review.content as string,
    type: review.type,
    date: review.date as any,
  };
}