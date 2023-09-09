<script lang="ts">
	import '$lib/scss/global.scss';
	import { beforeNavigate, afterNavigate, onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	// Add smooth-scrolling to the entire website
	let root: HTMLElement;
	onMount(async () => {
		root = document.getElementsByTagName('html')[0];
		root.classList.add('smooth-scroll');

		// Send page view event to Plausible
		// The pageview is registed automatically, but this allows
		// us to send additional data, such as the theme preference
		if (window) {
			// @ts-ignore
			const { plausible } = window;
			if (plausible) {
				if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
					plausible('pageview', { props: { theme_preference: 'Dark' } });
				} else if (
					window.matchMedia &&
					window.matchMedia('(prefers-color-scheme: light)').matches
				) {
					plausible('pageview', { props: { theme_preference: 'Light' } });
				} else {
					plausible('pageview', { props: { theme_preference: 'None' } });
				}
			}
		}
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

	// Use view transitions if available
	onNavigate((navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<slot />
