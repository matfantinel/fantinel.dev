import { componentToPng } from "@utils/opengraph";
import CoolLinksOpengraphImage from "@components/opengraph/CoolLinksOpengraphImage";
import { getCollection } from "astro:content";
import type { BlogPost } from "@schemas/blog";
import { sanitizeBlogPostData } from "@data/blogPosts";

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const sanitizedPosts = posts.map((post) => {
    return {
      data: sanitizeBlogPostData(post.data as unknown as BlogPost, post.body, post.rendered, posts.map(p => p.data as unknown as BlogPost)),
      body: post.body,
    };
  });

  // Only for cool links posts
  const filteredPosts = sanitizedPosts
    .filter((post) => Boolean(post.data.ogImage?.includes('/opengraph/cool-links')))
    .map((post) => {
      const urlParams = post.data.ogImage?.split('/');
      return {
        title: urlParams?.[urlParams.length - 3],
        date: urlParams?.[urlParams.length - 2]
      }
    });

  return filteredPosts.map(({ title, date }) => {
    return {
      params: {
        title,
        date,
      }
    }
  });
}

export async function GET({ params }: { params: { title: string; date: string } }) {
  const { title, date } = params;

  if (!title) {
    return new Response('Title param is mandatory', { status: 400 });
  }

  const decodedTitle = decodeURIComponent(atob(title));
  const decodedDate = decodeURIComponent(atob(date));

  let dateObj: Date | undefined;
  if (decodedDate) {
    try {
      dateObj = new Date(decodedDate);
    } catch (e) {
      return new Response('Date param is invalid', { status: 400 });
    }
  }

  return componentToPng(CoolLinksOpengraphImage, { title: decodedTitle, date: dateObj, willRenderWithSatori: true })
}
