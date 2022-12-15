export const prerender = true;
// I am enforcing trailing slashes mainly to make sure the data on Plausible remains consistent.
// Plausible weirdly considers /page and /page/ two different pages
// and I'm keeping the slash because most of the data in there in the past has been with the slash.
export const trailingSlash = 'always';