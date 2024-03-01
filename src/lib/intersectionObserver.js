// from: https://svelte.dev/repl/c2207e71cc8941d684fd74190892bd64?version=3.58.0
let intersectionObserver;

function ensureIntersectionObserver(threshold) {
	if (intersectionObserver) return;

  intersectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach(entry => {
				const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport';
				entry.target.dispatchEvent(new CustomEvent(eventName));
			});
		},
    { threshold: threshold }
	);
}

export default function viewport(node, options) {
	// Check if the `options` is defined with a threshold property. Use `options.threshold` otherwise use `0.9`

	const threshold = options && options.threshold !== undefined ? options.threshold : 0.1;

  const intersectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach(entry => {
				const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport';
				entry.target.dispatchEvent(new CustomEvent(eventName));
			});
		},
    { threshold: threshold }
	);

	intersectionObserver.observe(node);

	return {
		destroy() {
			intersectionObserver.unobserve(node);
		}
	}
}
