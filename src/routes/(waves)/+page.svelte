<script lang="ts">
	import AvatarWithBlobs from '$lib/components/molecules/AvatarWithBlobs.svelte';
	import Socials from '$lib/components/molecules/Socials.svelte';
	import SparklingHighlight from '$lib/components/molecules/SparklingHighlight.svelte';
	import ContentWithImage from '$lib/components/organisms/ContentWithImage.svelte';
	import Experience from '$lib/components/organisms/Experience.svelte';
	import Hero from '$lib/components/organisms/Hero.svelte';
	import Projects from '$lib/components/organisms/Projects.svelte';
	import RecentPosts from '$lib/components/organisms/RecentPosts.svelte';
	import type BlogPost from '$lib/data/blog-posts/model';
	import type { Project } from '$lib/utils/types';
	import type WorkExperience from '$lib/data/work-experiences/model';

	export let data: {
		yearsOfExperience: number;
		experienceEntries: WorkExperience[];
		projects: Project[];
		posts: BlogPost[];
	};

	let { yearsOfExperience, experienceEntries, projects, posts } = data;
</script>

<div class="container">
	<Hero />

	<ContentWithImage>
		<div slot="title">
			<span style="display: none;">My name is Matheus Fantinel</span>
			I'm a developer aiming to build things that
			<SparklingHighlight color="secondary">spark joy</SparklingHighlight>
		</div>
		<div slot="content">
			<p>
				I believe software should be great for everyone — those who write it and those who use it —
				and that bringing joy to problem-solving is the key to that.
			</p>
		</div>
		<div slot="image">
			<AvatarWithBlobs />
		</div>
	</ContentWithImage>

	{#if posts && posts.length > 0}
		<RecentPosts {posts} />
	{/if}
	<Projects {projects} />
	<Experience {yearsOfExperience} entries={experienceEntries} />
</div>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';
</style>
