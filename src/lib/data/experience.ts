import type { ExperienceEntry } from "$lib/utils/types";

const careerStart = new Date(2014, 8, 22);
export const yearsOfExperience = Math.abs(
	new Date(Date.now() - careerStart.getTime()).getUTCFullYear() - 1970
);

export const entries = [
	{
		companySlug: 'usefulgroup',
		company: 'Useful Group',
		jobTitle: 'Front-End Developer',
		timeframe: '2023 → Now',
		current: true,
		location: 'USA, Remote',
		description:
			'Building pleasant and useful websites to take our clients’ missions forward, using WordPress and the know-how to do things the best way.',
		tags: [
			{
				color: 'primary',
				label: 'WordPress'
			},
			{
				color: 'primary',
				label: 'Atomic Design'
			}
		]
	},
	{
		companySlug: 'agora',
		company: 'Agora',
		jobTitle: 'Front-End Developer',
		timeframe: '2021 → Now',
		current: true,
		location: 'USA, Remote',
		description:
			'Building interfaces to make homeschool curriculum planning painless and easy, with a focus on accessibility.',
		tags: [
			{
				color: 'primary',
				label: 'React'
			},
			{
				color: 'primary',
				label: 'NextJS'
			}
		]
	},
	{
		companySlug: 'logitix',
		company: 'Logitix',
		jobTitle: 'Software Developer',
		timeframe: '2019 → 2021',
		location: 'USA, Remote',
		description:
			"Working on one of the biggest ticket brokerage management systems in the world, I've built new features, improved existing ones, and made huge boosts to performance.",
		tags: [
			{
				color: 'primary',
				label: 'Vue'
			},
			{
				color: 'primary',
				label: 'AngularJS'
			},
			{
				color: 'secondary',
				label: '.NET'
			},
			{
				color: 'secondary',
				label: 'SQL'
			}
		]
	},
	{
		companySlug: 'sige',
		company: 'SIGE Cloud',
		jobTitle: 'Software Developer',
		timeframe: '2017 → 2019',
		location: 'Brazil',
		description:
			'Built new mobile apps from scratch with Ionic, a simplified desktop ERP with Electron, and modernized the existing Web version by applying the Microfrontends approach.',
		tags: [
			{
				color: 'primary',
				label: 'Angular'
			},
			{
				color: 'primary',
				label: 'Ionic'
			},
			{
				color: 'primary',
				label: 'Electron'
			},
			{
				color: 'secondary',
				label: '.NET'
			},
			{
				color: 'secondary',
				label: 'MongoDB'
			}
		]
	},
	{
		companySlug: 'promob',
		company: 'Promob',
		jobTitle: 'Software Developer',
		timeframe: '2014 → 2017',
		location: 'Brazil',
		description:
			'Developed and maintained an internal web app, adding and adapting features to the business needs. Built several APIs used by other dev teams, and integrated them with 3rd-party services.',
		tags: [
			{
				color: 'primary',
				label: 'JQuery'
			},
			{
				color: 'secondary',
				label: '.NET'
			},
			{
				color: 'secondary',
				label: 'SQL'
			}
		]
	}
] as ExperienceEntry[];
