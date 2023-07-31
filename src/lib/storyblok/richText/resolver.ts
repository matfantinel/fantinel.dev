import emojis from 'unicode-emoji-json/data-by-emoji.json';
import { RichtextResolver } from "storyblok-js-client";
import type { ISbRichtext } from "@storyblok/svelte";
import richTextSchema from "$lib/storyblok/richText/schema";

const resolver = new RichtextResolver(richTextSchema);

(resolver as any).renderEmoji = (item: ISbRichtext) => {
  // Find the emoji unicode character by its name
  // This is needed because Storyblok replaces the unicode character with an image, which is dumb
  const emoji = Object.keys(emojis)
    .find(key => ((emojis as any)[key] as any).slug === item.attrs.name);
  return emoji ?? item.attrs.name;
};

// From https://github.com/storyblok/storyblok-svelte/issues/439
const resolveFn = (_: any, blok: any) => {
  return `__BLOK__!!!${JSON.stringify(blok)}__BLOK__`;
};

resolver.addNode("blok", (node) => {
  let html = "";

  node.attrs.body.forEach((blok: any) => {
    html += resolveFn(blok.component, blok);
  });

  return {
    html: html,
  };
});

export default resolver;