import { getAllPosts } from "@data/everything";
import { blogPostToRssItem } from "@data/blogPosts";
import { quickReviewToRssItem } from "@data/quickReviews";
import { coolLinkToRssItem } from "@data/coolLinks";
import { photographyToRssItem } from "@data/photographies";
import type { BlogPost } from "@schemas/blog";
import type { CoolLink } from "@schemas/cool-link";
import type { Photography } from "@schemas/photography";
import { PostType } from "@schemas/post-types";
import type { QuickReview } from "@schemas/quick-review";
import { generateRssFeed, createRssResponse, siteMeta } from "@utils/rss";

export async function GET() {
  const posts = await getAllPosts();

  // Let's not add links saved before 01/11/2025 to the feed, to avoid polluting
  // existing subscribers' feeds with old stuff
  const filteredPosts = posts.filter(post => {
    return post.type !== PostType.COOL_LINK || (post.data as CoolLink).savedOn >= new Date('2025-11-01');
  });

  const items = filteredPosts.map(item => {
    if (item.type === PostType.BLOG_POST) {
      return blogPostToRssItem(item.data as BlogPost, { excerptOnly: true });
    } else if (item.type === PostType.QUICK_REVIEW) {
      return quickReviewToRssItem(item.data as QuickReview);
    } else if (item.type === PostType.COOL_LINK) {
      return coolLinkToRssItem(item.data as CoolLink);
    } else if (item.type === PostType.PHOTOGRAPHY) {
      return photographyToRssItem(item.data as Photography);
    }
    return '';
  });

  const body = generateRssFeed(items, {
    title: siteMeta.title,
    description: siteMeta.description,
    feedUrl: '/rss.xml'
  });

  return createRssResponse(body);
}
