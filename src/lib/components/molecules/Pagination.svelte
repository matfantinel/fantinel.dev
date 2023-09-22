<script lang="ts">
	export let totalPages: number;
	export let currentPage: number;
	export let baseUrl: string;

	function range(start: number, end: number) {
		const length = end - start + 1;
		return Array.from({ length }, (_, i) => start + i);
	}

	// How many pages to show at the beginning and end of the pagination (first and last pages)
	const boundaryCount = 1;
	// How many pages to show before and after the current page
	const paddingCount = 1;

	const startPages = range(1, Math.min(boundaryCount, totalPages));
	const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

	const paddingStart = Math.max(
		Math.min(currentPage - paddingCount, totalPages - boundaryCount - paddingCount * 2 - 1),
		boundaryCount + 2
	);

	const paddingEnd = Math.min(
		Math.max(currentPage + paddingCount, boundaryCount + paddingCount * 2 + 2),
		endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
	);

	const items = [
		...startPages,
		...(paddingStart > boundaryCount + 2
			? ['ellipsis']
			: boundaryCount + 1 < totalPages - boundaryCount
			? [boundaryCount + 1]
			: []),
		...range(paddingStart, paddingEnd),
		...(paddingEnd < totalPages - boundaryCount - 1
			? ['ellipsis']
			: totalPages - boundaryCount > boundaryCount
			? [totalPages - boundaryCount]
			: []),
		...endPages
	];
</script>

<ul>
	{#each items as item}
		{#if item === 'ellipsis'}
			<li>...</li>
		{:else}
			<li>
				<a href={`${baseUrl}/${item}`} target="_self" class:active={item === currentPage}>
					{item}
				</a>
			</li>
		{/if}
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;

		li {
			a {
				transition: all 0.2s ease-in-out;
				border-radius: 10px;
				padding: 5px 10px;
				aspect-ratio: 1/1;
				display: grid;
				place-items: center;
				text-decoration: none;
				font-weight: 700;

				@media (hover: hover) {
					&:hover {
						background-color: rgba(var(--color--card-background-rgb), 1);
					}
				}

				&.active {
					background-color: var(--color--card-background);
					box-shadow: var(--card-shadow);
					color: var(--color--primary);
				}
			}
		}
	}
</style>
