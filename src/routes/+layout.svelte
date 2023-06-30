<script lang="ts">
	import '$lib/scss/global.scss';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	// Add smooth-scrolling to the entire website
	let root: HTMLElement;
	onMount(async () => {
		root = document.getElementsByTagName('html')[0];
		root.classList.add('smooth-scroll');
	});

	// Disable smooth scrolling when navigating
	// This is because, when navigating between pages using the same layout,
	// The page is scrolled to the top. With smooth scrolling enabled, this causes a
	// weird animation.
	beforeNavigate(() => {
		root.classList.remove('smooth-scroll');
	});
	afterNavigate(() => {
		root.classList.add('smooth-scroll');
	});
</script>

<slot />
