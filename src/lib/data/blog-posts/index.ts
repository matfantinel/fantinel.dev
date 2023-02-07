import { filterPosts, importPosts } from './utils';

export const allPosts = importPosts();
export const filteredPosts = filterPosts(allPosts);