import { siteBaseUrl, title } from '$lib/data/meta';

/** @type {import('./$types').PageLoad} */
export function load() {
  return {
    metaTitle: `Subscribe to ${title}`,
    metaImage: `${siteBaseUrl}/images/subscribe.png`
  }
}