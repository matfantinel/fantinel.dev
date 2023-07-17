import { useStoryblokApi } from "@storyblok/svelte";
import { browser, dev } from "$app/environment";

/** @type {import('./$types').LayoutLoadEvent} */
export async function load({ params, url }) {
  const { slug } = params;

  if (!slug) {
    return {
      status: 404
    };
  }

  let loadDraft = false;
  if (browser || dev) {
    loadDraft = Boolean(url.searchParams.get("_storyblok"));
  }

  const storyblokApi = useStoryblokApi();
  const dataStory = await storyblokApi.get(`cdn/stories/articles/${slug}`, { version: loadDraft ? 'draft' : 'published' });

  return {
    story: dataStory.data.story
  };
}
