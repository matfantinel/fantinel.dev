// Disabling eslint because importing Prism is needed
// even if not directly used in this file
// eslint-disable-next-line no-unused-vars
import Prism from 'prismjs';
// Here we assign it to a variable so the import above 
// is not removed automatically on build
const ifYouRemoveMeTheBuildFails = Prism;
import 'prism-svelte';
import readingTime from 'reading-time';
import striptags from 'striptags';
import type { BlogPost } from "$lib/utils/types";

export const importPosts = (render = false) => {
  const blogImports = import.meta.glob('$routes/*/*/*.md', { eager: true });
  const innerImports = import.meta.glob('$routes/*/*/*/*.md', { eager: true });

  const imports = { ...blogImports, ...innerImports };

  const posts: BlogPost[] = [];
  for (const path in imports) {
    const post = imports[path] as any;
    if (post) {
      posts.push({
        ...post.metadata,
        html: render ? post.default.render()?.html : undefined,
      });
    }
  }

  return posts;
}

export const filterPosts = (posts: BlogPost[]) => {
  return posts.filter((post) => !post.hidden)
    .sort((a, b) =>
      new Date(a.date).getTime() > new Date(b.date).getTime()
        ? -1
        : new Date(a.date).getTime() < new Date(b.date).getTime()
          ? 1
          : 0
    )
    .map((post) => {
      const readingTimeResult = post.html ? readingTime(striptags(post.html) || '') : undefined;
      const relatedPosts = getRelatedPosts(posts, post);

      return {
        ...post,
        readingTime: readingTimeResult ? readingTimeResult.text : '',
        relatedPosts: relatedPosts,
      } as BlogPost;
    });
}

// #region Unexported Functions

const getRelatedPosts = (posts: BlogPost[], post: BlogPost) => {
  // Get the first 3 posts that share the same category and the highest number of tags in common
  const relatedPosts = posts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.categories.some((c) => post.categories.includes(c)))
    .sort((a, b) => {
      const aTags = a.tags.filter((t) => post.tags.includes(t));
      const bTags = b.tags.filter((t) => post.tags.includes(t));
      return aTags.length > bTags.length ? -1 : aTags.length < bTags.length ? 1 : 0;
    })
  
  return relatedPosts.slice(0, 3).map((p) => ({
    ...p,
    readingTime: p.html ? readingTime(striptags(p.html) || '').text : '',
  }));
}

// #endregion