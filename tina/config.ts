import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.VITE_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "cms/articles",
        defaultItem: () => {
          return {
            title: "New Post",
            date: new Date().toISOString(),
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "coverImageAlt",
            label: "Cover Image Alt Text",
          },
          {
            type: "boolean",
            name: "showImage",
            label: "Show Cover Image",
            description: "Whether to actually show the cover image on the page or just use it as a preview for social media links"
          },
          {
            type: "image",
            name: "socialImage",
            label: "Social Image",
            description: "Image to use when sharing on social media. If not provided, the cover image will be used instead."
          },
          {
            type: "boolean",
            name: "showToc",
            label: "Show Table of Contents",
          },
          {
            type: "boolean",
            name: "hidden",
            label: "Is hidden",
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
            options: [
              'Angular',
              'Back-End',
              'Dev',
              'Front-End',
              'Games',
              'Meta',
              'Misc',
              'Personal',
              'Reading Recs',
              'Retrospective',
              'Svelte',
            ],
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
          },
          {
            type: "datetime",
            name: "updated",
            label: "Last modified date",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
