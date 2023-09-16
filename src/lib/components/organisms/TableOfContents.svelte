<script lang="ts">
	import Toc from 'svelte-toc';
</script>

<div class="table-of-contents">
	<div class="wrapper">
		<Toc keepActiveTocItemInView={false}>
			<strong slot="title">Table of Contents</strong>
		</Toc>
	</div>
</div>

<style lang="scss">
	.table-of-contents {
		position: sticky;
		top: 0;
		width: 100%;
		height: fit-content;
		padding: 20px;
		z-index: 1;
		backdrop-filter: blur(10px);
		background-color: rgba(var(--body-background-color-rgb), 0.5);
		border-radius: 10px;
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

		:global(.toc ol li) {
			border-radius: 6px;
		}
	}
</style>
