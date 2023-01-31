// Disabling eslint because importing Prism is needed
// even if not directly used in this file
// eslint-disable-next-line no-unused-vars
import Prism from 'prismjs';
// Here we assign it to a variable so the import above 
// is not removed automatically on build
const ifYouRemoveMeTheBuildFails = Prism;
import 'prism-svelte';
import type { BlogPost } from "$lib/utils/types";
// import readingTime from 'reading-time';
import striptags from 'striptags';

export const importPosts = () => {
  const imports = import.meta.glob('$routes/*/*/*.md', { eager: true });

  const posts: BlogPost[] = [];
  for (const path in imports) {
    const post = imports[path] as any;
    if (post) {
      posts.push({
        ...post.metadata
      });
    }
  }

  return posts;
}

export const getPostCategories = (posts: BlogPost[]) => {
  const allTagsAndPosts = posts
    .filter((x) => !x.hidden)
    .map((post) =>
      post.tags.map((tag: string) => {
        return { tag: tag, post: post };
      })
    )
    .flat();

  return groupPostsByTag(allTagsAndPosts);
};

export const filterPosts = (posts: BlogPost[], categories: { [key: string]: BlogPost[] }) => {
  return posts.filter((post) => !post.hidden)
    .sort((a, b) =>
      new Date(a.date).getTime() > new Date(b.date).getTime()
        ? -1
        : new Date(a.date).getTime() < new Date(b.date).getTime()
          ? 1
          : 0
    )
    .map((post) => {
      // const readingTimeDuration = readingTime(striptags(post.html)).text;

      const relatedPosts = getRelatedPosts(post, categories, posts);

      return {
        ...post,
        // readingTime: readingTimeDuration,
        relatedPosts: relatedPosts
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .sort((a, b) => b.count - a.count)
          .slice(0, 3)
          .map((x) => x.post)
      } as BlogPost;
    });
}

// #region Unexported Functions

const groupPostsByTag = (array: { tag: string; post: BlogPost }[]): { [key: string]: BlogPost[] } => {
  return array.reduce((acc: any, value) => {
    const property = value['tag'];
    acc[property] = acc[property] || [];
    acc[property].push(value['post']);
    return acc;
  }, {});
}

const getRelatedPosts = (post: BlogPost, categories: { [key: string]: BlogPost[] }, allPosts: BlogPost[]) => {
  let allRelatedPosts: BlogPost[] = [];
  // Get posts with same tags
  for (const tag of post.tags) {
    allRelatedPosts = allRelatedPosts.concat(categories[tag]);
  }

  let relatedPosts: {
    post: BlogPost;
    count: number;
    date: string;
  }[] = [];
  // Sort by number of similar tags
  for (const relPost of allRelatedPosts) {
    if (relPost.slug === post.slug) {
      continue;
    }
    const rel = relatedPosts.find((x) => x.post.slug === relPost.slug);
    if (rel) {
      rel.count++;
    } else {
      relatedPosts.push({
        post: {
          ...relPost,
          // readingTime: readingTime(striptags(relPost.html)).text 
        },
        count: 1,
        date: relPost.date
      });
    }
  }

  // If there are no related posts, just grab all
  if (relatedPosts.length === 0) {
    relatedPosts = allPosts
      .filter((x) => x.slug !== post.slug)
      .map((x) => ({
        post: {
          ...x,
          // readingTime: readingTime(striptags(x.html)).text
        },
        count: 0,
        date: x.date
      }));
  }

  return relatedPosts;
}

// #endregion