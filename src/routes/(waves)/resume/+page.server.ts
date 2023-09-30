import { getWorkExperience, yearsOfExperience } from '$lib/data/work-experiences/api';

export async function load() {
	const workExperience = await getWorkExperience();

	return {
		yearsOfExperience,
		experienceEntries: workExperience
	};
}
