<script lang="ts">
	import Sparkle from '$lib/components/atoms/SingleSparkle.svelte';
	import type { SparkleType } from '$lib/utils/types';
	import { onDestroy, onMount } from 'svelte';
	const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

	export let color: 'default' | 'primary' | 'secondary' = 'default';

	const generateSparkle = (): SparkleType => {
		return {
			id: String(random(10000, 99999)),
			createdAt: Date.now(),
			color:
				color === 'primary'
					? 'var(--color--primary)'
					: color === 'secondary'
					? 'var(--color--secondary)'
					: 'var(--color--yellow',
			size: random(10, 20),
			style: {
				// Pick a random spot in the available space
				top: random(-10, 80) + '%',
				left: random(0, 100) + '%'
			}
		};
	};

	let sparkles: SparkleType[] = [];
	let sparklesInterval: NodeJS.Timer;

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
	<span class="slot-wrapper">
		<slot />
	</span>
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
