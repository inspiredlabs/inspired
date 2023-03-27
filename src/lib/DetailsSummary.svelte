<script>
  import animatedDetails from 'svelte-animated-details';
	export let summary;
	export let style;
</script>

<details
	class="overflow-hidden w-100"
	use:animatedDetails
>
	<!-- usage: improve highlight: wch18735.github.io/ -->
	<summary
		class="pv4 pointer flex items-end justify-between {style}"
	>
		<div class="db">{summary}</div>
	</summary>
	<slot />
</details>

<style>
	/* details summary::-webkit-details-marker,
	details summary::marker { display: none; content: '' } */

	details > summary:hover:after {
		opacity: 1;
	}
	details > summary:after {
		opacity: 0; /* 0.3 */
		transition: opacity 0.4s ease;
		font-size: small;
		/* text-transform: uppercase; */
		/* letter-spacing: 2px; */
		content: 'Read more…';
		font-family: serif;
		font-weight: bold;
		font-style: italic;
	}/* \2003 */
	details[open] > summary:after { content: 'Read less…' } /* \2003 */
</style>