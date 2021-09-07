<script context="module">
	export async function load({ fetch }) {
		const url = '/posts.json?limit=4';
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					posts: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	import Hero from '$lib/components/home/hero.svelte';
	import About from '$lib/components/home/about.svelte';
	import RecentPosts from '$lib/components/home/recent-posts.svelte';
	import Experience from '$lib/components/home/experience.svelte';
	import Projects from '$lib/components/home/projects.svelte';

	export let posts;
</script>

<div class="container">
	<Hero />
	<About />
	<RecentPosts {posts} />
	<Projects />
	<Experience />
</div>
