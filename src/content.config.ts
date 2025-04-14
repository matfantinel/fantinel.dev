import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { blogSchema } from "@schemas/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./public/cms/articles" }),
  schema: blogSchema
});

export const collections = { blog };