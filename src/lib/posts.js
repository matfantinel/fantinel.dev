// Disabling eslint because importing Prism is needed
// even if not directly used in this file
// eslint-disable-next-line no-unused-vars
import Prism from 'prismjs';
import 'prism-svelte';
import readingTime from 'reading-time';

const imports = import.meta.glob('./posts/*.md', { eager: true });

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

function getRelatedPosts(post) {
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
		const rel = relatedPosts.find((x) => x.post.slug === relPost.slug);
		if (rel) {
			rel.count++;
		} else {
			relatedPosts.push({
				post: { ...relPost, readingTime: readingTime(relPost.html).text },
				count: 1,
				date: relPost.date
			});
		}
	}

	// If there are no related posts, just grab all
	if (relatedPosts.length === 0) {
		relatedPosts = posts
			.filter((x) => x.slug !== post.slug)
			.map((x) => ({
				post: { ...x, readingTime: readingTime(x.html).text },
				count: 0,
				date: x.date
			}));
	}

	return relatedPosts;
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

		const relatedPosts = getRelatedPosts(post);

		return {
			...post,
			readingTime: readingTimeDuration,
			relatedPosts: relatedPosts
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
				.sort((a, b) => b.count - a.count)
				.slice(0, 3)
				.map((x) => x.post)
		};
	});

export default filteredPosts;
