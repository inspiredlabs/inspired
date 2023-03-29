// learn: youtube.com/watch?v=gZS-tGD2_VY
// most basic example: svelte.dev/tutorial/writable-stores
import {writable} from 'svelte/store'; // readable, derived
import { browser } from '$app/environment'; // LEARN: `browser` is required in SvelteKit youtube.com/watch?v=gZS-tGD2_VY

// most basic example: svelte.dev/tutorial/writable-stores
// LEARN: `browser` is required in SvelteKit youtube.com/watch?v=gZS-tGD2_VY
// consider: youtube.com/watch?v=6uNwXEyIGI4

export const searchStore = writable(''); // consider: youtube.com/watch?v=6uNwXEyIGI4

// working: svelte.dev/repl/35171c0621ce426e83bec021d3ddf60d
export const activeIndexStore = writable(0);
export const dockStore = writable(false);
export const modalOpen = writable(false);
export const yCorrect = writable(0);
export const yPosNew = writable(0);


