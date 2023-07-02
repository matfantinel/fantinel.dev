import { apiPlugin, storyblokInit } from '@storyblok/svelte';

// const components = {

// };

export const initializeStoryblok = () => {
  storyblokInit({
    accessToken: import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
    // components,
  });
}