const careerStart = new Date(2014, 8, 22);
export const yearsOfExperience = Math.abs(
	new Date(Date.now() - careerStart.getTime()).getUTCFullYear() - 1970
);

export const entries = [
	// {
	// 	id: 'freelancer',
	// 	title: 'Freelancer',
	// 	jobTitle: 'Front-End Web Developer',
	// 	timeframe: '2022 → Now',
	//   current: true,
	//   location: 'Remote',
	// 	description:
	// 		"As an independent contractor, I've been able to build new innovative projects from scratch putting my development, planning, design and teamwork skills to the test.",
	// 	tags: [
	// 		{
	// 			color: 'primary',
	// 			text: 'Vue'
	// 		},
	// 		{
	// 			color: 'primary',
	// 			text: 'React'
	// 		},
	// 		{
	// 			color: 'primary',
	// 			text: 'Svelte'
	// 		}
	// 	]
	// },
	{
		id: 'agora',
		title: 'Agora',
		jobTitle: 'Lead Front-End Developer',
		timeframe: '2021 → Now',
		current: true,
		location: 'USA, Remote',
		description:
			'Building interfaces to make homeschool curriculum planning painless and easy, with a focus on accessibility.',
		tags: [
			{
				color: 'primary',
				text: 'React'
			},
			{
				color: 'primary',
				text: 'NextJS'
			}
		]
	},
	{
		id: 'logitix',
		title: 'Logitix',
		jobTitle: 'Software Engineer',
		timeframe: '2019 → 2021',
		location: 'USA, Remote',
		description:
			"Working on one of the biggest ticket brokerage management systems in the world, I've built new features, improved existing ones, and made huge boosts to performance.",
		tags: [
			{
				color: 'primary',
				text: 'Vue'
			},
			{
				color: 'primary',
				text: 'AngularJS'
			},
			{
				color: 'secondary',
				text: '.NET'
			},
			{
				color: 'secondary',
				text: 'SQL'
			}
		]
	},
	{
		id: 'sige',
		title: 'SIGE Cloud',
		jobTitle: 'Software Developer',
		timeframe: '2017 → 2019',
		location: 'Brazil',
		description:
			'Built new mobile apps from scratch with Ionic, a simplified desktop ERP with Electron, and modernized the existing Web version by applying the Microfrontends approach.',
		tags: [
			{
				color: 'primary',
				text: 'Angular'
			},
			{
				color: 'primary',
				text: 'Ionic'
			},
			{
				color: 'primary',
				text: 'Electron'
			},
			{
				color: 'secondary',
				text: '.NET'
			},
			{
				color: 'secondary',
				text: 'MongoDB'
			}
		]
	},
	{
		id: 'promob',
		title: 'Promob',
		jobTitle: 'Software Developer',
		timeframe: '2014 → 2017',
		location: 'Brazil',
		description:
			'Developed and maintained an internal web app, adding and adapting features to the business needs. Built several APIs used by other dev teams, and integrated them with 3rd-party services.',
		tags: [
			{
				color: 'primary',
				text: 'JQuery'
			},
			{
				color: 'secondary',
				text: '.NET'
			},
			{
				color: 'secondary',
				text: 'SQL'
			}
		]
	}
];
