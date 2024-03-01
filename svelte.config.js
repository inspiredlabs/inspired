import { vitePreprocess } from '@sveltejs/kit/vite';
// import vercel from '@sveltejs/adapter-vercel';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import mdsvexConfig from './mdsvex.config.js';
import { mdsvex } from 'mdsvex';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors & this: youtube.com/watch?v=jHSwChkx3TQ

	preprocess: [
		preprocess(),
		vitePreprocess(),
		mdsvex({
			// MUST be here twice:
			extensions: ['.svx', '.md'],
			mdsvexConfig
		}),
	],
	// MUST be here twice:
	extensions: ['.svelte', '.svx', '.md'],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		//adapter: vercel(),
		adapter: adapter(),
		alias: {
			$routes: path.resolve('./src/routes'),
			$lib: path.resolve('./src/lib'),
			$src: path.resolve('./src/')
    },

	},

	// plugin options
  vitePlugin: {
    exclude: [],
    // experimental options
		experimental: {
      inspector: {
        toggleKeyCombo: 'meta-shift',
        holdMode: false,
        showToggleButton: 'never', //always
        //toggleButtonPos: 'bottom-left'
      }
    },

		// use `markdown.md` files:
		assetsInclude: ['**/*.md']
  }

};

export default config;
