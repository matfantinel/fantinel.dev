import { getWorkExperience, yearsOfExperience } from '$lib/data/work-experience/api';

export async function load() {
	const workExperience = await getWorkExperience();

	return {
		yearsOfExperience,
		experienceEntries: workExperience
	};
}
