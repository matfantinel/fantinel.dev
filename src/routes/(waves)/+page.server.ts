import { getPosts } from '$lib/data/blog-posts/api';
// import projects from '$lib/data/projects';
import { getProjects } from '$lib/data/projects/api';
import { getWorkExperience, yearsOfExperience } from '$lib/data/work-experiences/api';

export async function load() {
  const posts = (await getPosts(0, 4)).items;
  const workExperience = await getWorkExperience();
  const projects = await getProjects();

  return {
    yearsOfExperience,
    experienceEntries: workExperience,
    projects,
    posts
  };
}
