<script lang="ts">
	import { HttpRegex } from '$lib/utils/regex';

	export let color: 'primary' | 'secondary' = 'primary';
	export let style: 'solid' | 'understated' | 'clear' = 'solid';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let href: string | undefined = undefined;

	export let additionalClass: string | undefined = undefined;

	const isExternalLink = !!href && HttpRegex.test(href);
	export let target: '_self' | '_blank' = isExternalLink ? '_blank' : '_self';
	export let rel = isExternalLink ? 'noopener noreferrer' : undefined;

	$: tag = href ? 'a' : 'button';
	$: linkProps = {
		href,
		target,
		rel
	};
</script>

<svelte:element
	this={tag}
	{...linkProps}
	class={['button', `style--${style}`, `size--${size}`, `color--${color}`, additionalClass].join(
		' '
	)}
	data-sveltekit-preload-data
	on:click
	{...$$restProps}
>
	{#if $$slots['icon']}
		<div class="icon">
			<slot name="icon" />
		</div>
	{/if}
	<slot />
</svelte:element>

<style lang="scss">
	.button {
		--main-color: red;
		--light-color: blue;
		--contrast-color: green;

		-webkit-appearance: none;
		appearance: none;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.2s ease-in-out;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;

		border: none;
		border-radius: 20px;
		font-weight: 700;

		.icon {
			width: 24px;
			height: 24px;
		}

		&.color {
			&--primary {
				--main-color: var(--color--primary-rgb);
				--light-color: var(--color--primary-tint-rgb);
				--contrast-color: var(--color--primary-contrast);
			}
			&--secondary {
				--main-color: var(--color--secondary-rgb);
				--light-color: var(--color--secondary-tint-rgb);
				--contrast-color: var(--color--secondary-contrast);
			}
		}

		&.style {
			&--solid {
				background-color: rgb(var(--main-color));
				color: var(--contrast-color);

				&:hover {
					box-shadow: 0px 0px 1px 7px rgba(var(--main-color), 0.3);
				}
			}
			&--understated {
				background-color: rgb(var(--light-color));
				color: rgb(var(--main-color));

				&:hover {
					box-shadow: 0px 0px 1px 7px rgba(var(--main-color), 0.3);
				}
			}
			&--clear {
				background-color: transparent;
				color: rgb(var(--main-color));

				&:hover {
					background-color: rgb(var(--light-color));
				}
			}
		}

		&.size {
			&--small {
				padding: 5px 10px;
				font-size: 0.75rem;

				.icon {
					width: 20px;
					height: 20px;
				}
			}
			&--medium {
				padding: 10px 20px;
				font-size: 1rem;
			}
			&--large {
				padding: 15px 30px;
				font-size: 1.15rem;

				.icon {
					width: 28px;
					height: 28px;
				}
			}
		}
	}
</style>
