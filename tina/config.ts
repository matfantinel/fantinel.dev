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
      mediaRoot: process.env.TINA_MEDIA_ROOT ?? "images",
      publicFolder: process.env.TINA_PUBLIC_FOLDER ?? 'static',
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
              'General',
              'Uncategorized',
              'Tech News',
              'Hacking',
              'Tutorials',
              'Programming',
              'Tips & Tricks',
              'Internet',
              'SEO',
              'Review',
              'Cyber Security',
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
      {
        name: "workExperience",
        label: "Work Experiences",
        path: "cms/work-experiences",
        fields: [
          {
            type: "string",
            name: "company",
            label: "Company",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "companySlug",
            label: "Company Slug",
            required: true,
          },
          {
            type: "string",
            name: "jobTitle",
            label: "Job Title",
            required: true,
          },
          {
            type: "string",
            name: "timeframe",
            label: "Timeframe",
            required: true,
            description: "e.g. '2019 -> 2020'"
          },
          {
            type: "boolean",
            name: "current",
            label: "Is Current Job?",
          },
          {
            type: "string",
            name: "location",
            label: "Location",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "object",
            name: "technologies",
            label: "Technologies",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
              {
                type: "string",
                name: "color",
                label: "Color",
                required: true,
                options: [
                  "primary",
                  "secondary"
                ]
              },
            ]
          },
        ]
      },
      {
        name: "project",
        label: "Projects",
        path: "cms/projects",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true,
          },
          {
            type: "string",
            name: "link",
            label: "Link",
          },
          {
            type: "string",
            name: "sourceCode",
            label: "Source Code",
          },
          {
            type: "object",
            name: "labels",
            label: "Labels",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
              {
                type: "string",
                name: "color",
                label: "Color",
                required: true,
                options: [
                  "primary",
                  "secondary"
                ]
              },
            ]
          },
        ]
      }
    ],
  },
});
