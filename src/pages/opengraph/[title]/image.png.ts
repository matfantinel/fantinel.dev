import { componentToPng } from "@utils/opengraph";
import OpengraphImage from "@components/opengraph/OpengraphImage";
import { getCollection } from "astro:content";
import type { BlogPost } from "@schemas/blog";
import { sanitizePostData } from "@data/blogPosts";

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const sanitizedPosts = posts.map((post) => {
    return {
      data: sanitizePostData(post.data as unknown as BlogPost, post.body, post.rendered, posts.map(p => p.data as unknown as BlogPost)),
      body: post.body,
    };
  });

  // Only for posts with no cover image
  // And no date (the ones with a date will match another endpoint)
  const filteredPosts = sanitizedPosts
    .filter((post) => !post.data.coverImage && post.data.ogImage && !post.data.date)
    .map((post) => {
      const urlParams = post.data.ogImage?.split('/');
      return {
        title: urlParams?.[urlParams.length - 2]
      }
    });

  return filteredPosts.map(({ title }) => {
    return {
      params: {
        title,
      }
    }
  });
}

export async function GET({ params }: { params: { title: string } }) {
  const { title } = params;

  if (!title) {
    return new Response('Title param is mandatory', { status: 400 });
  }

  const decodedTitle = decodeURIComponent(atob(title));

  return componentToPng(OpengraphImage, { title: decodedTitle })
}