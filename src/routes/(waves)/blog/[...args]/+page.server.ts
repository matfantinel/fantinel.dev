import { getPosts, getPostsByCategory } from '$lib/data/blog-posts/api';

export async function load({ params }) {
  let category;
  let currentPage = 1;

  const { args } = params;
  const argsArray = args?.split('/');
  if (argsArray) {
    const firstArg = argsArray[0];
    if (/^\d+$/.test(firstArg)) {
      currentPage = parseInt(firstArg);
    } else {
      category = firstArg;
    }

    const secondArg = argsArray[1];
    if (/^\d+$/.test(secondArg)) {
      currentPage = parseInt(secondArg);
    }
  }

  let response;
  if (category) {
    response = await getPostsByCategory(category, currentPage);
  } else {
    response = await getPosts(currentPage);
  }

  return response;
}
