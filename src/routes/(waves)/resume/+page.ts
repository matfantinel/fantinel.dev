import { yearsOfExperience, entries as experienceEntries } from '$lib/data/experience';

export async function load() {
	return {
		yearsOfExperience,
		experienceEntries
	};
}
