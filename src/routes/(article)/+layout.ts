import { useStoryblokApi } from "@storyblok/svelte";
import { browser, dev } from "$app/environment";

/** @type {import('./$types').LayoutLoadEvent} */
export async function load({ params, url }) {
  // TODO: figure a way of not having to repeat this request
  // When page loads (hydration). Disabling CSR is not a good option as it disables JS
  // So maybe use the "browser" variable to check if it's a browser request
  // And if it is, don't make the request
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
