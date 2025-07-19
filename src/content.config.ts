import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { blogSchema } from "@schemas/blog";
import { quickReviewSchema } from "@schemas/quick-review";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./public/cms/articles" }),
  schema: blogSchema
});

const quickReviews = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./public/cms/quick-reviews" }),
  schema: quickReviewSchema
});

export const collections = { blog, quickReviews };