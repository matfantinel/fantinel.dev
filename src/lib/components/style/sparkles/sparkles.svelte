<script>
	import Sparkle from '$lib/components/style/sparkles/single-sparkle.svelte';
	import { onDestroy, onMount } from 'svelte';
	const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

	// Default color is a bright yellow
	const DEFAULT_COLOR = 'hsl(50deg, 100%, 50%)';
	const generateSparkle = (color = DEFAULT_COLOR) => {
		return {
			id: String(random(10000, 99999)),
			createdAt: Date.now(),
			color,
			size: random(10, 20),
			style: {
				// Pick a random spot in the available space
				top: random(-10, 80) + '%',
				left: random(0, 100) + '%'
			}
		};
	};

	let sparkles = [];
	let sparklesInterval;

	onMount(() => {
		sparklesInterval = setInterval(() => {
			const now = Date.now();
			// Create a new sparkle
			const sparkle = generateSparkle();
			// Clean up any "expired" sparkles
			const nextSparkles = sparkles.filter((sparkle) => {
				const delta = now - sparkle.createdAt;
				return delta < 1500;
			});
			// Include our new sparkle
			nextSparkles.push(sparkle);
			sparkles = nextSparkles;
		}, 400);
	});

	onDestroy(() => {
		clearInterval(sparklesInterval);
	});
</script>

<div class="sparkle-wrapper">
	{#each sparkles as sparkle (sparkle.id)}
		<Sparkle color={sparkle.color} size={sparkle.size} style={sparkle.style} />
	{/each}
	<div class="slot-wrapper">
		<slot />
	</div>
</div>

<style lang="scss">
	.sparkle-wrapper {
		position: relative;
		display: inline-block;

		.slot-wrapper {
			position: relative;
			z-index: 1;
		}
	}
</style>
