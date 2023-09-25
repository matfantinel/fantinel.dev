<script lang="ts">
	import ListIcon from '$lib/icons/list.svelte';
	import Toc from 'svelte-toc';
</script>

<noscript style="display: none;">
	<!-- Hide if JavaScript is disabled -->
	<!-- Hide if JavaScript is disabled -->
	<style>
		.table-of-contents {
			display: none !important;
		}
	</style>
</noscript>

<div class="table-of-contents">
	<div class="wrapper">
		<Toc keepActiveTocItemInView={false} breakpoint={900} blurParams={{ duration: 0 }}>
			<strong class="title" slot="title">Table of Contents</strong>

			<ListIcon slot="open-toc-icon" />
		</Toc>
	</div>
</div>

<style lang="scss">
	@import '$lib/scss/_mixins.scss';

	.table-of-contents {
		position: sticky;
		top: 0;
		width: 100%;
		height: fit-content;
		padding: 20px;
		z-index: 1;
		backdrop-filter: blur(10px);
		background-color: rgba(var(--body-background-color-rgb), 0.8);
		border-radius: 10px;

		@include for-tablet-portrait-down {
			background-color: var(--color--primary);
			color: var(--color--primary-contrast);
			box-shadow: var(--card-shadow-hover);
			position: fixed;
			border-radius: 16px;
			width: 48px;
			height: 48px;
			padding: 0;
			right: 10px;
			top: calc(100dvh - 48px - 10px);
			transition: all 0.2s ease;
			z-index: 2;
		}
	}
	.wrapper {
		--toc-active-bg: transparent;
		--toc-active-color: var(--color--primary);
		--toc-li-hover-color: var(--color--primary);
		--toc-li-hover-bg: rgba(var(--color--card-background-rgb), 0.3);
		--toc-overflow: auto;
		--toc-font-size: 1rem;
		--toc-padding: 0;
		--toc-li-margin: 5px 0;

		@include for-tablet-portrait-down {
			width: 100%;
			height: 100%;
		}

		:global(.toc ol li) {
			border-radius: 6px;
		}
	}

	.title {
		display: inline-block;
		margin-bottom: 10px;
	}

	.mobile-toggle {
		font-size: 0.8rem;
		line-height: 1rem;
		white-space: nowrap;
	}

	@include for-tablet-portrait-down {
		:global(.toc.mobile) {
			--toc-mobile-bottom: 10px;
			--toc-mobile-right: 10px;
			--toc-mobile-width: min(calc(100dvw - 40px), 324px);
			--toc-ol-padding: 0 40px 0 0;
			--toc-mobile-btn-color: var(--color--text-inverse);

			position: absolute;
			:global(button) {
				position: relative;
				transition: all 0.2s ease;
				appearance: none;
				background: transparent;
				width: 48px;
				height: 48px;
				padding: 6px;
				top: 10px;
				left: 10px;
			}
			:global(nav) {
				background: var(--color--card-background);
				box-shadow: var(--card-shadow-hover);
				border-radius: 16px;
				padding: 12px 8px;
				color: var(--color--text);
			}
		}
	}
</style>
