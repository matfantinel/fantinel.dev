import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { blogSchema } from "@schemas/blog";
import { quickReviewSchema } from "@schemas/quick-review";
import { coolLinkSchema } from "@schemas/cool-link";
import { photographySchema } from "@schemas/photography";
import { mdPageSchema } from "@schemas/md-pages";

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

const mdPages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./public/cms/md-pages" }),
  schema: mdPageSchema
});

export const collections = { blog, quickReviews, coolLinks, photographies, mdPages };