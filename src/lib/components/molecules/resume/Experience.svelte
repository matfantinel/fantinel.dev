<script lang="ts">
	import PinIcon from '$lib/icons/pin.svelte';
	import CircleIcon from '$lib/icons/circle.svelte';
	import type WorkExperience from '$lib/data/work-experience/model';
	import TintHighlight from '$lib/components/molecules/TintHighlight.svelte';

	export let entries: WorkExperience[];
</script>

<div class="resume-experience">
	{#each entries as entry}
		<div class="experience" class:current={entry.current}>
			<div class="timeline">
				<div class="time">
					{#if entry.current}Current{/if}
					<CircleIcon />
					{entry.timeframe.split(' ')[0]}
				</div>
				<div class="line" />
			</div>
			<div class="content">
				<div class="title">
					<div>
						<span class="company-name">
							<TintHighlight color={entry.companySlug}>{entry.company}</TintHighlight>
						</span>
					</div>
					<small>{entry.jobTitle} | <span class="icon"><PinIcon /></span> {entry.location}</small>
				</div>

				<p>{entry.description}</p>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.resume-experience {
		.experience {
			display: flex;
			gap: 10px;

			.timeline {
				width: 60px;
				margin-bottom: -16px;
				display: flex;
				flex-direction: column;
				align-items: center;

				.line {
					border-left: 2px dashed var(--color--primary);
					width: 2px;
					flex: 1;
				}

				.time {
					color: var(--color--text-shade);
					width: 24px;
					padding: 2px;
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 2px;
					font-size: 12px;
					word-wrap: none;
					white-space: nowrap;

					:global(svg) {
						width: 20px;
						height: 20px;
						color: var(--color--primary);
					}
				}
			}

			&.current {
				.time {
					:global(svg) {
						padding: 2px;
						background: var(--color--card-background);
						border: 1px solid var(--color--primary);
						border-radius: 50%;
						fill: var(--color--primary);
					}
				}
			}

			&:not(:last-child) {
				padding-bottom: 16px;
			}

			&:last-child {
				.timeline {
					.line {
						display: none;
					}
				}
			}

			.content {
				flex: 1;
			}

			.title {
				div {
					font-size: 18px;
					display: block;
				}

				.company-name {
					color: var(--color--text);
					font-size: 22px;
					font-family: var(--font--title);
					font-weight: 600;
				}

				.icon {
					:global(svg) {
						width: 14px;
						height: 14px;
					}
				}

				small {
					font-size: 14px;
					font-weight: 300;
					color: var(--color--text-shade);
					fill: var(--color--text-shade);
				}
			}

			.icon {
				display: inline-block;
			}

			p {
				margin-top: 10px;
				text-align: justify;
			}
		}
	}
</style>
