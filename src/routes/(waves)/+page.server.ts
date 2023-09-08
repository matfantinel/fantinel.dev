import { getPosts } from '$lib/data/blog-posts/api';
import { yearsOfExperience, entries as experienceEntries } from '$lib/data/experience';
import projects from '$lib/data/projects';

export async function load() {
  const posts = (await getPosts(0, 4)).items;

  return {
    yearsOfExperience,
    experienceEntries,
    projects,
    posts
  };
}
