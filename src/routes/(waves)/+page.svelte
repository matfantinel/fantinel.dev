<script lang="ts">
	import Hero from '$lib/components/organisms/Hero.svelte';
	import About from '$lib/components/organisms/About.svelte';
	import RecentPosts from '$lib/components/organisms/RecentPosts.svelte';
	import Experience from '$lib/components/organisms/Experience.svelte';
	import Projects from '$lib/components/organisms/Projects.svelte';
	import type { ExperienceEntry, Project, BlogPost } from '$lib/utils/types';

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
	<RecentPosts {posts} />
	<Projects {projects} />
	<Experience {yearsOfExperience} entries={experienceEntries} />
</div>
