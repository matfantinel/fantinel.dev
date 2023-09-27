import { getPosts } from '$lib/data/blog-posts/api';
import projects from '$lib/data/projects';
import { getWorkExperience, yearsOfExperience } from '$lib/data/work-experience/api';

export async function load() {
  const posts = (await getPosts(0, 4)).items;
  const workExperience = await getWorkExperience();

  return {
    yearsOfExperience,
    experienceEntries: workExperience,
    projects,
    posts
  };
}
