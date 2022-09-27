<script>
	import Blob1 from '$lib/svg/blobs/blob1.svelte';
	import Blob2 from '$lib/svg/blobs/blob2.svelte';
	import Blob3 from '$lib/svg/blobs/blob3.svelte';
	import Blob4 from '$lib/svg/blobs/blob4.svelte';
	import Blob5 from '$lib/svg/blobs/blob5.svelte';
	import Blob6 from '$lib/svg/blobs/blob6.svelte';
	import Blob7 from '$lib/svg/blobs/blob7.svelte';

	const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

	export let quantity = 1;
	export let minLeft = 0;
	export let maxLeft = 80;
	export let minTop = 0;
	export let maxTop = 80;

	const generateBlob = () => {
		return {
			size: random(200, 300) + 'px',
			left: random(minLeft, maxLeft) + '%',
			top: random(minTop, maxTop) + '%',
			model: random(1, 7),
			animationDuration: random(4, 8)
		};
	};

	let blobs = [];
	for (let i = 0; i < quantity; i++) {
		blobs.push(generateBlob());
	}
</script>

<div class="blobs-container">
	{#each blobs as blob}
		<div
			class="blob"
			style="height:{blob.size};width:{blob.size};margin-left:{blob.left};margin-top:{blob.top};animation-duration:{blob.animationDuration}s;"
		>
			{#if blob.model === 1}
				<Blob1 />
			{:else if blob.model === 2}
				<Blob2 />
			{:else if blob.model === 3}
				<Blob3 />
			{:else if blob.model === 4}
				<Blob4 />
			{:else if blob.model === 5}
				<Blob5 />
			{:else if blob.model === 6}
				<Blob6 />
			{:else}
				<Blob7 />
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	.blobs-container {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;

		display: flex;
		flex-direction: column;
		align-items: flex-start;

		.blob {
			@media screen and (prefers-reduced-motion: no-preference) {
				animation: float cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
			}
		}

		@keyframes float {
			0% {
				transform: translateY(-10px);
			}
			50% {
				transform: translateY(10px);
			}
			100% {
				transform: translateY(-10px);
			}
		}
	}
</style>
