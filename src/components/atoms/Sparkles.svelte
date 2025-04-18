<script lang="ts">
	import Sparkle from '@components/atoms/SingleSparkle.svelte';
	import type { SparkleType } from '@utils/types';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

	let {
		children
	} : {
		children?: Snippet;
	} = $props();

	const generateSparkle = (): SparkleType => {
		return {
			id: String(random(10000, 99999)),
			createdAt: Date.now(),
			color: '#FFFF00',
			size: random(10, 20),
			style: {
				// Pick a random spot in the available space
				top: random(-10, 80) + '%',
				left: random(0, 100) + '%'
			}
		};
	};

	let sparkles: SparkleType[] = $state([]);
	let sparklesInterval: number;

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

<span class="a-sparkles">
	{#each sparkles as sparkle (sparkle.id)}
		<Sparkle color={sparkle.color} size={sparkle.size} style={sparkle.style} />
	{/each}
	<span class="a-sparkles__slot">
		{@render children?.()}
	</span>
</span>

<style lang="scss">
	.a-sparkles {
		position: relative;
		display: inline-block;

		&__slot {
			position: relative;
			z-index: 1;
		}
	}
</style>
