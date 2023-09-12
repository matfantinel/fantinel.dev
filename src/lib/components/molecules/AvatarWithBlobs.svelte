<script>
	import Avatar from '../atoms/Avatar.svelte';
</script>

<div class="avatar">
	<div class="blob one" />
	<div class="blob two" />
	<div class="blob three" />
	<div class="image">
		<Avatar />
	</div>
</div>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.avatar {
		width: 250px;
		height: 250px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		.image {
			width: 80%;
			height: 80%;
			position: relative;
			border-radius: 50%;
			overflow: hidden;
		}

		.blob {
			position: absolute;
			animation: spin 2s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
			animation-fill-mode: forwards;
			animation-play-state: paused;
			background: rgba(var(--color--primary-shade-rgb), 0.2);

			&.one {
				height: 80%;
				width: 80%;
				border-radius: var(--radius-blob-1);
				animation-duration: 4s;
			}
			&.two {
				height: 90%;
				width: 90%;
				border-radius: var(--radius-blob-2);
				animation-duration: 2.5s;
			}
			&.three {
				height: 100%;
				width: 100%;
				border-radius: var(--radius-blob-3);
				animation-duration: 1.5s;
			}
		}

		&:hover {
			@media screen and (prefers-reduced-motion: no-preference) {
				.blob {
					animation-play-state: running;
				}
			}
		}
	}
</style>
