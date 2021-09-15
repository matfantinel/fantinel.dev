import Prism from 'prismjs';
import 'prism-svelte';
import readingTime from 'reading-time';

const imports = import.meta.globEager('./posts/*.md');

const posts = [];
for (const path in imports) {
	const post = imports[path];
	if (post) {
		posts.push({
			...post.metadata,
			...post.default.render()
		});
	}
}

const allTagsAndPosts = posts
	.filter((x) => !x.hidden)
	.map((post) =>
		post.tags.map((tag) => {
			return { tag: tag, post: post };
		})
	)
	.flat();

export const categories = groupByTags(allTagsAndPosts);

function groupByTags(array) {
	return array.reduce((acc, value) => {
		const property = value['tag'];
		acc[property] = acc[property] || [];
		acc[property].push(value['post']);
		return acc;
	}, {});
}

const filteredPosts = posts
	.filter((post) => !post.hidden)
	.sort((a, b) =>
		new Date(a.date).getTime() > new Date(b.date).getTime()
			? -1
			: new Date(a.date).getTime() < new Date(b.date).getTime()
			? 1
			: 0
	)
	.map((post) => {
		const readingTimeDuration = readingTime(post.html).text;

		let allRelatedPosts = [];
		// Get posts with same tags
		for (const tag of post.tags) {
			allRelatedPosts = allRelatedPosts.concat(categories[tag]);
		}

    let relatedPosts = [];
    // Sort by number of similar tags
    for (const relPost of allRelatedPosts) {
      if (relPost.slug === post.slug) {
        continue;
      }
      const rel = relatedPosts.find(x => x.post.slug === relPost.slug);
      if (rel) {
        rel.count++;
      } else {
        relatedPosts.push({post: { ...relPost, readingTime: readingTime(relPost.html).text }, count: 1});
      }
    }

		return {
			...post,
			readingTime: readingTimeDuration,
      relatedPosts: relatedPosts.sort((a, b) => b.count - a.count).slice(0, 3).map(x => x.post)
		};
	});

export default filteredPosts;
