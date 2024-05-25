<script lang="ts">
	import GitHubIcon from '$lib/icons/socials/github.svelte';
	import LinkedInIcon from '$lib/icons/socials/linkedin.svelte';
	import EmailIcon from '$lib/icons/socials/email.svelte';
	import PinIcon from '$lib/icons/pin.svelte';
	import ChatIcon from '$lib/icons/chat.svelte';
	import InternetIcon from '$lib/icons/internet.svelte';
	import ExperienceIcon from '$lib/icons/experience.svelte';
	import StarIcon from '$lib/icons/star.svelte';
	import { calculateYearsSince } from '$lib/utils/functions';

	export let yearsOfExperience: number;
</script>

<ul class="resume-contact">
	<li class="birthday">
		<span class="icon"><StarIcon /></span>
		<span>{calculateYearsSince(new Date('1998-08-15'))} years old</span>
	</li>
	<li class="experience">
		<span class="icon"><ExperienceIcon /></span>
		<span>
			{yearsOfExperience} years of experience
		</span>
	</li>
	<li class="location">
		<span class="icon"><PinIcon /></span>
		<span>Tangail, Dhaka, Bangladesh</span>
	</li>
	<li class="email">
		<span class="icon"><EmailIcon /></span>
		<a href="mailto:info@rasel.work.gd">info@rasel.work.gd</a>
	</li>
	<li class="linkedin">
		<span class="icon"><LinkedInIcon /></span>
		<a
			href="https://www.linkedin.com/in/rasel597/"
			target="_blank"
			rel="noopener noreferrer"
		>
			LinkedIn Profile
		</a>
	</li>
	<li class="website">
		<span class="icon"><InternetIcon /></span>
		<a href="https://rasel.is-a.dev" target="_blank" rel="noopener noreferrer"> rasel.is-a.dev </a>
	</li>
	<li class="github">
		<span class="icon"><GitHubIcon /></span>
		<a href="https://github.com/raselshikdar" target="_blank" rel="noopener noreferrer">
			GitHub Profile
		</a>
	</li>
	<li class="languages">
		<span class="icon"><ChatIcon /></span>
		<span>Bengali, English</span>
	</li>
</ul>

<style lang="scss">
	.resume-contact {
		list-style: none;
		padding: 0;
		margin-left: auto;
		margin-right: auto;

		display: grid;
		grid-gap: 10px;
		grid-template-columns: 1fr 1fr;

		grid-template-areas:
			'email email'
			'website website'
			'location languages'
			'birthday experience'
			'github linkedin';

		li {
			display: flex;
			align-items: center;
			margin: 0;

			.icon {
				margin-right: 10px;
				color: var(--color--primary);
				:global(svg) {
					width: 24px;
					height: 24px;
				}
			}

			a {
				text-decoration: none;
				color: var(--color--text);
				border-bottom: 1px dotted var(--color--primary);
				padding-bottom: 2px;

				&:hover {
					color: var(--color--primary);
					border-bottom-style: solid;
				}
			}

			&.birthday {
				grid-area: birthday;
			}
			&.location {
				grid-area: location;
			}
			&.experience {
				grid-area: experience;
			}
			&.email {
				grid-area: email;
				margin: 0 auto;
			}
			&.linkedin {
				grid-area: linkedin;
			}
			&.website {
				grid-area: website;
				display: none;
			}
			&.github {
				grid-area: github;
			}
			&.languages {
				grid-area: languages;
			}
		}

		@media (min-width: 768px), print {
			margin-left: 0;
			margin-right: 0;

			grid-gap: 5px;
			grid-template-columns: 1fr 1fr;

			grid-template-areas:
				'location github'
				'birthday linkedin'
				'experience email'
				'languages website';

			li {
				&.email {
					margin: 0;
				}
				&.website {
					display: flex;
				}
			}
		}

		// Print-specific styles
		@media print {
			grid-template-areas:
				'location languages'
				'birthday email'
				'experience website';

			.linkedin,
			.github {
				display: none;
			}

			a {
				border: none !important;
			}
		}
	}
</style>
