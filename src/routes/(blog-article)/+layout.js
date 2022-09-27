import { error } from '@sveltejs/kit';


export async function load({ fetch, url }) {
	const jsonUrl = url.pathname.replace(/\/\s*$/, "") + '.json';
	const res = await fetch(jsonUrl);

	if (res.ok) {
		return {
			post: await res.json()
		};
	}

	throw error(500, `Could not load ${jsonUrl}`);
}
