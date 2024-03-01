import { defineMDSveXConfig as defineConfig } from "mdsvex";
import rehypePlugin from './rehype-renderer.js';
import path from 'path';

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],
  layout: {
    default: path.resolve('./src/routes/showupblowup/layout.svelte'),
  },

  smartypants: {
    dashes: "oldschool",
  },

  remarkPlugins: [],
  rehypePlugins: [rehypePlugin],
});

export default config;
