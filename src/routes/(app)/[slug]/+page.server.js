import { redirect } from '@sveltejs/kit';

let pathname;

export function load(event) {
	pathname = event.url.pathname;
	if (pathname !== '/' ){
		throw redirect(307, '/');
	}
}

// learn: https://www.youtube.com/watch?v=ieECVME5ZLU
// learn: https://learn.svelte.dev/tutorial/redirects