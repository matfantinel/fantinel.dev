import { useStoryblokApi } from "@storyblok/svelte";

/** @type {import('./$types').LayoutLoadEvent} */
export async function load({ params }) {
  const { slug } = params;

  if (!slug) {
    return {
      status: 404
    };
  }

  const storyblokApi = useStoryblokApi();
  const dataStory = await storyblokApi.get(`cdn/stories/articles/${slug}`);

  return {
    story: dataStory.data.story
  };
}
