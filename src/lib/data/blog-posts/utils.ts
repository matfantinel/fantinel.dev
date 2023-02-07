// Disabling eslint because importing Prism is needed
// even if not directly used in this file
// eslint-disable-next-line no-unused-vars
import Prism from 'prismjs';
// Here we assign it to a variable so the import above 
// is not removed automatically on build
const ifYouRemoveMeTheBuildFails = Prism;
import 'prism-svelte';
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
      return {
        ...post,
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

// #endregion