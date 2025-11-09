import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { blogSchema } from "@schemas/blog";
import { quickReviewSchema } from "@schemas/quick-review";
import { coolLinkSchema } from "@schemas/cool-link";
import { photographySchema } from "@schemas/photography";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./public/cms/articles" }),
  schema: blogSchema
});

const quickReviews = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./public/cms/quick-reviews" }),
  schema: quickReviewSchema
});

const coolLinks = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./public/cms/cool-links" }),
  schema: coolLinkSchema
});

const photographies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./public/cms/photographies" }),
  schema: photographySchema
});

export const collections = { blog, quickReviews, coolLinks, photographies };