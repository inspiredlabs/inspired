// rehype-renderer.js
// debug: const visit = require('unist-util-visit');
import {visit} from 'unist-util-visit';

// rehype-renderer.js
function rehypePlugin() {
  return (tree) => {
    visit(tree, 'h1', node => {
      node.properties.style = 'color:red';
    });
  };
}

export default rehypePlugin;
