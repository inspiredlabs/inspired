<script>
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';

	// NProgress css //import 'nprogress/nprogress.css';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.01,
    showSpinner: false
	});

	$: {
		if ($navigating) { NProgress.start() }
		if (!$navigating) { NProgress.done() }
	}
</script>

<style>
:root {
--color: linear-gradient(90deg, transparent 0%, var(--accent) 100%);
--height: 2px;
--accent: #383838; /*cyan*/
}
/* Make clicks pass-through */
:global(#nprogress) {
	pointer-events: none;
}

:global(#nprogress .bar) {
	background: var(--color);

	position: fixed;
	z-index: 1031;
	top: 0;
	left: 0;

	width: 100%;
	height: var(--height);
}

/* Fancy blur effect */
:global(#nprogress .peg) {
	display: block;
	position: absolute;
	right: 0px;
	width: 100px;
	height: 100%;
	box-shadow: 0 0 calc( 5 * var(--height)) var(--color), 0 0 calc( 2 * var(--height)) var(--color);
	opacity: 1.0;

	-webkit-transform: rotate(3deg) translate(0px, -4px);
			-ms-transform: rotate(3deg) translate(0px, -4px);
					transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
:global(#nprogress .spinner) {
	display: block;
	position: fixed;
	z-index: 1031;
	top: calc( 8 * var(--height));
	right: calc( 8 * var(--height));
}

:global(#nprogress .spinner-icon) {
	width: calc( 9 * var(--height));
	height: calc( 9 * var(--height));
	box-sizing: border-box;

	border: solid var(--height) transparent;
	border-top-color: var(--color);
	border-left-color: var(--color);
	border-radius: 50%;

	-webkit-animation: nprogress-spinner 400ms linear infinite;
					animation: nprogress-spinner 400ms linear infinite;
}

:global(.nprogress-custom-parent) {
	overflow: hidden;
	position: relative;
}
:global(.nprogress-custom-parent #nprogress .spinner),
:global(.nprogress-custom-parent #nprogress .bar) {
	position: absolute;
}

@-webkit-keyframes nprogress-spinner {
	0%   { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
	0%   { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>