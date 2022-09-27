<script>
	import Avatar from '$lib/svg/avatar.svelte';
	import Blob1 from '$lib/svg/blobs/blob1.svelte';
	import Blob2 from '$lib/svg/blobs/blob2.svelte';
	import Blob3 from '$lib/svg/blobs/blob3.svelte';
	import SparklingHighlight from '../style/sparkling-highlight.svelte';
</script>

<section id="about">
	<div class="info">
		<h2>
			I'm a developer aiming to build things that
			<SparklingHighlight>spark joy</SparklingHighlight>
		</h2>
		<p>
			I believe software should be great for everyone — those who write it and those who use it —
			and that bringing joy to problem-solving is the key to that.
		</p>
	</div>
	<div class="avatar">
		<div class="blob one"><Blob1 /></div>
		<div class="blob two"><Blob2 /></div>
		<div class="blob three"><Blob3 /></div>
		<div class="image">
			<Avatar />
		</div>
	</div>
</section>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	#about {
		position: relative;
		display: grid;
		grid-template-columns: 500px 250px;
		align-items: center;
		justify-content: space-between;

		@include for-phone-only {
			grid-template-columns: 1fr;
			justify-items: center;
		}

		.info {
			display: flex;
			flex-direction: column;
			gap: 10px;
			h2 {
				@include for-phone-only {
					text-align: center;
				}
			}

			p {
				@include for-phone-only {
					text-align: justify;
				}
			}
		}

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

				&.one {
					height: 130%;
					width: 130%;
					animation-duration: 4s;
				}
				&.two {
					height: 140%;
					width: 140%;
					animation-duration: 2.5s;
				}
				&.three {
					height: 150%;
					width: 150%;
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
	}

	@keyframes spin {
		from {
			transform: rotate(0turn);
		}
		to {
			transform: rotate(1turn);
		}
	}
</style>
