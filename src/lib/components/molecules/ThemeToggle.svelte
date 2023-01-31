<script lang="ts">
	import { theme } from '$lib/stores/theme';

	function toggleTheme() {
		if ($theme === 'auto') {
			theme.set('light');
		} else if ($theme === 'light') {
			theme.set('dark');
		} else {
			theme.set('auto');
		}
	}
</script>

<noscript>
	<!-- Hide the theme toggle if JavaScript is disabled -->
	<style>
		.theme-toggle {
			display: none !important;
		}
	</style>
</noscript>

<button
	class="theme-toggle"
	title="Toggle between light and dark theme"
	data-theme={$theme}
	on:click={toggleTheme}
>
	<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
		<mask id="moon">
			<rect x="0" y="0" width="100%" height="100%" fill="white" />
			<circle cx="40" cy="8" r="11" fill="black" />
		</mask>
		<circle id="sun" cx="12" cy="12" r="11" mask="url(#moon)" />
		<g id="sun-beams">
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</g>
	</svg>

	<span class="label">Auto</span>
</button>

<style lang="scss">
	.theme-toggle {
		height: 24px;
		padding: 0;
		appearance: none;
		border: none;
		background: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 5px;

		&:hover {
			.label {
				color: var(--color--primary);
			}

			#moon,
			#sun {
				fill: var(--color--primary);
				> * {
					filter: drop-shadow(0px 0px 3px var(--color--primary));
				}
			}

			#sun-beams {
				stroke: var(--color--primary);

				line {
					filter: drop-shadow(0px 0px 3px var(--color--primary));
				}
			}
		}
	}

	.label {
		transition: all 0.5s var(--ease-4);
		text-transform: uppercase;
		font-size: 0.6rem;
		opacity: 0;
		transform-origin: left;
		transform: scaleX(0);
		max-width: 0;
		color: var(--color--text);
	}

	#moon,
	#sun {
		fill: var(--color--text);
		stroke: none;
	}

	#sun {
		transition: all 0.5s var(--ease-4);
		transform-origin: center center;
	}

	#sun-beams {
		--_opacity-dur: 0.15s;
		stroke: var(--color--text);
		stroke-width: 2px;
		transform-origin: center center;
		transition: all 0.5s var(--ease-elastic-4), opacity var(--_opacity-dur) var(--ease-3);
	}

	#moon > circle {
		transition: all 0.5s var(--ease-out-3);
	}

	@mixin light-icon {
		& #sun {
			transform: scale(0.5);
		}

		& #sun-beams {
			transform: rotateZ(0.25turn);
			--_opacity-dur: 0.5s;
		}
	}

	@mixin dark-icon {
		& #moon > circle {
			transform: translateX(-20px);
		}

		& #sun-beams {
			opacity: 0;
		}
	}

	.theme-toggle:not([data-theme]) {
		@include light-icon;
	}

	[data-theme='auto'] {
		.label {
			opacity: 1;
			transform: scaleX(1);
			max-width: 30px;
		}

		@media not all and (prefers-color-scheme: dark) {
			@include light-icon;
		}

		@media (prefers-color-scheme: dark) {
			@include dark-icon;
		}
	}

	[data-theme='light'] {
		@include light-icon;
	}

	[data-theme='dark'] {
		@include dark-icon;
	}
</style>
