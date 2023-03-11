import { filterPosts, importPosts } from './utils';

export const allPosts = importPosts(true);
export const filteredPosts = filterPosts(allPosts);