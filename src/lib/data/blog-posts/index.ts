import { filterPosts, getPostCategories, importPosts } from './utils';

export const allPosts = importPosts();
export const categories = getPostCategories(allPosts);
export const filteredPosts = filterPosts(allPosts, categories);