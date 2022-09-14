

<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

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
