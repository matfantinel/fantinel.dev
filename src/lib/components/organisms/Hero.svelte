<script>
	import ProjectsIcon from '$lib/icons/projects.svelte';
	import BlogIcon from '$lib/icons/blog.svelte';
	import ExperienceIcon from '$lib/icons/experience.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
</script>

<section id="hero">
	<h1 class="hello">Hello, I'm Matt!</h1>
	<p class="intro">
		<span class="left">I build fun stuff on the web,</span>
		<span class="right">and sometimes write about it.</span>
	</p>
	<div class="ctas">
		<Button ref="projects-btn" style="understated" href="#projects">
			<ProjectsIcon slot="icon" />
			Projects
		</Button>
		<Button ref="blog-btn" href="/blog">
			<BlogIcon slot="icon" />
			Blog
		</Button>
		<Button ref="experience-btn" style="understated" color="secondary" href="#experience">
			<ExperienceIcon slot="icon" />
			Experience
		</Button>
	</div>
</section>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	#hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;
		position: relative;
		padding: 80px 0;

		@include for-phone-only {
			padding: 40px 0 50px;
		}

		.hello {
			text-align: center;
		}

		.intro {
			font-weight: 500;
			font-size: 1.4rem;
			width: min(100%, 440px);
			display: flex;
			flex-direction: column;

			.left {
				text-align: left;
			}
			.right {
				text-align: right;
			}

			@include for-phone-only {
				display: none;
			}
		}

		.ctas {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: 10px;
			width: 100%;

			@include for-phone-only {
				display: none;
			}
		}
	}

	:global([ref='projects-btn']) {
		order: 1;
		flex: 0 0 180px;
	}
	:global([ref='blog-btn']) {
		order: 2;
		flex: 0 0 180px;
	}
	:global([ref='experience-btn']) {
		order: 3;
		flex: 0 0 180px;
	}
</style>
