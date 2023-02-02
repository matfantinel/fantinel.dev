<script lang="ts">
	import Hero from '$lib/components/organisms/Hero.svelte';
	import About from '$lib/components/organisms/About.svelte';
	import RecentPosts from '$lib/components/organisms/RecentPosts.svelte';
	import Experience from '$lib/components/organisms/Experience.svelte';
	import Projects from '$lib/components/organisms/Projects.svelte';
	import type { ExperienceEntry, Project, BlogPost } from '$lib/utils/types';

	// Importing these images here even if they're not used
	// So that Vite preprocesses them
	// Otherwise, because they're only imported on the server side
	// Vite is not picking them up
	// https://github.com/sveltejs/kit/issues/5240
	import PersonalWebsiteImage from '$lib/images/projects/personal-website.png?width=500&format=avif;webp;png&meta&imagetools';
	import PocketCompanionImage from '$lib/images/projects/pocket-companion.png?width=500&format=avif;webp;png&meta&imagetools';
	import GestekImage from '$lib/images/projects/gestek.png?width=500&format=avif;webp;png&meta&imagetools';
	import MonetaImage from '$lib/images/projects/moneta.png?width=500&format=avif;webp;png&meta&imagetools';
	import ReminduckImage from '$lib/images/projects/reminduck.png?width=500&format=avif;webp;png&meta&imagetools';

	export let data: {
		yearsOfExperience: number;
		experienceEntries: ExperienceEntry[];
		projects: Project[];
		posts: BlogPost[];
	};

	let { yearsOfExperience, experienceEntries, projects, posts } = data;
</script>

<div class="container">
	<Hero />
	<About />
	{#if posts && posts.length > 0}
		<RecentPosts {posts} />
	{/if}
	<Projects {projects} />
	<Experience {yearsOfExperience} entries={experienceEntries} />
</div>
