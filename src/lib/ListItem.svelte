<script>
	import { onMount } from 'svelte';
	import { modalOpen, activeIndexStore, searchStore } from '$lib/stores';
	import SocialMedia from '$lib/SocialMedia.svelte';
	import Thumbnail from '$lib/Thumbnail.svelte';
	import { marked } from 'marked'
	import animatedDetails from 'svelte-animated-details';

	export let animations, background, caption, client, contract, content, contents, conclusion, development, graphics, images, location, overview, revealed, shot, tags, tint;

	// on:mouseenter={() => { willChange = true }}
	// on:mouseleave={() => { willChange = false }}

	// learn: Override function: https://svelte.dev/repl/30d2efe6622f4150a73405b706d58321?version=3.42.5
  const renderer = {
		heading(text, level) {
      return `<h${level}>${text}</h${level}>`
    },
    link(href, title, text) {
			return `<a href=${href} title=${title ? title : href } class="link o-70 inherit hover-o-100 b--black bb bw0 transition hover-bw2">${text}</a>` },
    blockquote(text) {
      return `<blockquote class="w-100 pl4 ma0 tr lh-title georgia i fw5 f3 o-80 ">${noWidowsNoOrphans(text)}</blockquote>`
    },
		paragraph(text) {
      return `<p>${noWidowsNoOrphans(text)}</p>`
    }
  };

  marked.use({ renderer });

	function noWidowsNoOrphans(string) {
		let words = string.split(/(?:&nbsp;| )+/);
		let result = words.slice(-2).join('&nbsp;');
		for (let i = words.length - 3; i >= 0; i--) {
				if (i % 2 === 0) {
						result = words[i] + '&nbsp;' + result;
				} else {
						result = words[i] + ' ' + result;
				}
		}
		return result;
	}

	let open = true;
	let height; // learn: natclark.com/tutorials/svelte-get-dimensions-of-element/
	let openHeight;
	let duration = 999;

	onMount(() => {
		openHeight = height;
		duration = openHeight / 3 * 1;
		setTimeout(() => {
			open = false;
		}, 1);
	});

</script>

<!-- debug: id="{urlize(caption)}" -->
<li class=" { revealed ? 'revealed' : '' }">
<details
	class="flex justify-end w-80 w-70-m w-70-l ma0 transition overflow-hidden hover-custom"
	use:animatedDetails={{ duration }}
	bind:clientHeight={ height }
	bind:open={ open }
>
	<summary class="w-100 pointer flex flex-wrap justify-end">
		<div class="w-100 w-25-l">
			<!-- bg-black -->
			<!-- h3  aspect-ratio--16x9-m aspect-ratio--1x1-l -->
			<figure
			class="custom-change
			pa0 ma0 overflow-hidden relative aspect-ratio
			vh-50 w-100 aspect-ratio--16x9
			h1-l w-100-l aspect-ratio--1x1-l">
			<!-- pt7 pt3-l  {tint} -->
				<img src="{shot}" alt="Thumb" class="w-100 db bg-center cover aspect-ratio--object fit-cover" /></figure>
		</div>
		<header class="w-100 w-75-l mw-custom-l pl3 o-80 hover-o-100 tansition flex flex-column self-center mt0 pv2">
			<h2 class="w-100 f2 lh-title fw7 ma0">{@html caption}</h2>
			<h3 class="w-100 f3 lh-title fw6 ma0">{@html client}&nbsp;<span class="fw7"> —&nbsp;{@html location}</span></h3>
			<h4 class="w-100 f4-ns mt0-ns lh-title fw4 ma0">{@html contract}</h4>
			<!-- <h2 class="w-100 f2 lh-solid fw7 ma0">{@html caption}</h2>
			<h3 class="w-100 f3 lh-title fw6 ma0">{@html client}&nbsp;<span class="fw7"> —&nbsp;{@html location}</span></h3>
			<h4 class="w-100 f4-ns mt0-ns source-sans fw4 ma0">{@html contract}</h4> -->
				<!-- note: <code class="bg-green">usage: {[at]html JSON.stringify ( tags, 2, null )}</code> -->
				<!-- <p class="f5 mt0-ns fw4">{@html overview}</p> -->
				<!-- <h4 class="f4-ns mt0-ns source-sans fw4">{@html overview}</h4> -->
		</header>
	</summary>
	<article class="w-100 flex flex-wrap items-center justify-end pb6">
		<main class="w-100 w-75-l mw-custom-l pl3">

			<section>
				{#each tags as tag}
				<small
				class="ttc br-pill f8 ph2 pv1 pointer gray hover-black hover-bg-black-10 transition { $searchStore === tag ? 'bg-black-30 white' : 'bg-light-gray' }"
					on:keypress={ () =>
						$searchStore === tag ? $searchStore = '' : $searchStore = tag
					? $searchStore = tag : $searchStore = '' }
					on:click={ () =>
						$searchStore === tag ? $searchStore = '' : $searchStore = tag
					? $searchStore = tag : $searchStore = '' }
					>{@html tag }</small>&emsp;
				{/each}
				<hr class="ba b--black-10 w-100"/>
			</section>

			<!-- {#if contents}
			<section class="highlight">
				{#each contents as content, i }
					{@html marked(content) }
				{/each}
			</section>
			{/if} -->

			{#if background}
			<section class="highlight">
				<h4 class="">Background</h4>
				{#each background as backstory, i }
					{@html marked(backstory) }
				{/each}
			</section>
			{/if}

			{#if graphics}
			<aside class="bg-yellow">
			<h4 class="w-100 pt4">Graphics</h4>
				{#each graphics as {title, src, description, link}, i }
					<span>{title}</span>
					<span>{description}</span>
					<hr>
				{/each}
			</aside>
			{/if}

			<span
				class="b red underline"
				on:mouseover={ () => $activeIndexStore = 2 }
				on:click={ () => $modalOpen = true }
				on:keypress
				on:focus>culpa qui, {$modalOpen}</span>

			{#if development}
			<h4 class="w-100 pt4">Development</h4>
			<section class="no-clutter grid grid-columns-2 grid-columns-3-l gc3 gr3 w-100">
				{#each development as {title, src, description, link}, i }
				{#if title !== undefined && !title.toLowerCase().includes('draft') }
					<a
					href="{!link ? src : link}"
					class="link ">
						<Thumbnail {title} {src} {description} />
					</a>
				{/if}
				{/each}
			</section>
			{/if}

			{#if animations}
			<h4 class="w-100 pt4">Animation</h4>
			<section class="no-clutter grid grid-columns-2 grid-columns-3-l gc3 gr3 w-100">
				{#each animations as {title, src, description, link}, i }
				{#if title !== undefined && !title.toLowerCase().includes('draft') }
					<a
					href="{!link ? src : link}"
					class="link ">
						<Thumbnail {title} {src} {description} />
					</a>
				{/if}
				{/each}
			</section>
			{/if}

			{#if graphics}
			<h4 class="w-100 pt4">Graphic Design</h4>
			<section class="no-clutter grid grid-columns-2 grid-columns-3-l gc3 gr3 w-100">
				{#each graphics as {title, src, description, link}, i }
				{#if title !== undefined && !title.toLowerCase().includes('draft') }
					<a
					href="{!link ? src : link}"
					class="link ">
						<Thumbnail {title} {src} {description} />
					</a>
				{/if}
				{/each}
			</section>
			{/if}

		<!--
			{#if graphics}
			<div class="w-100 w-third-l flex flex-column self-start">
				<h4>Graphic Design</h4>
				{#each graphics as graphic, i }
					{@html marked(graphic) }
				{/each}
			</div>
			{/if}
			<section class="highlight pt4 flex">
				{#if development}
				<div class="w-100 w-third-l mr2 flex flex-column self-start">
					<h4>Development</h4>
					{#each development as dev, i }
						{@html marked(dev) }
					{/each}
				</div>
				{/if}
				{#if animations}
				<div class="w-100 w-third-l mr2 flex flex-column self-start">
					<h4>Animation</h4>
					{#each animations as animation, i }
						{@html marked(animation) }
					{/each}
				</div>
				{/if}
				{#if graphics}
				<div class="w-100 w-third-l flex flex-column self-start">
					<h4>Graphic Design</h4>
					{#each graphics as graphic, i }
						{@html marked(graphic) }
					{/each}
				</div>
				{/if}
			</section>
			-->

			{#if conclusion}
			<section class="highlight pt4">
				<h4>Conclusion</h4>
				{#each conclusion as conclude, i }
					{@html marked(conclude) }
				{/each}
			</section>
			{/if}


			<!-- <section>
				<SocialMedia />
			</section> -->

		</main>
	</article>

</details>
</li>

<style>

	::-webkit-details-marker { display: none }

	li {
		visibility: hidden;
		opacity:0.1;
		max-height: 0;
		overflow: hidden;
		transition: max-height 666ms 0s ease, opacity 558ms 108ms ease;
	}
	.revealed {
		opacity:1;
		max-height: 9999px;
		visibility: visible;
	}

.hover-fw6:hover { font-weight: 600 }

.b--custom-angle {
	border-image: linear-gradient(45deg, transparent, cyan) 1;
}


:root {
	--winter-hazel: hsl(53.79, 33.72%, 66.27%, var(--alpha));
	--malachite: hsl(174.2, 100%, 26.5%, var(--alpha));
	--silver-tree: hsl(146, 65%, 62%, var(--alpha));
	--apple-green: hsl(73.5, 100%, 35.7%, var(--alpha));
	--dur: 3s
}

.bg-winter-hazel { background-color: var(--winter-hazel); }

/* details summary::-webkit-details-marker, details summary::marker { display: none; content: '' } */

details > summary header:hover:after {
	opacity: 1;
}
details > summary header:after {
	opacity: 0; /* 0.3 */
	transition: opacity calc(var(--dur)/3) ease;
	letter-spacing: -0.8px;
	content: 'Read more…\2003';
	padding-top: 2rem;
	/*
	padding-bottom: 2rem;
	*/
	font-family: serif;
	font-weight: 600;
	font-style: italic;
	display: block;
	width: 100%;
	text-align: right;
	line-height: 0;
	z-index:99999;
	color: silver;
}

/* usage: break this out into media queries? */
details > summary header {
	/* margin-top: -1rem!important */
}
details[open] > summary header:after {
	content: 'Read less…\2003'
}


details[open] > summary div figure img {
	opacity: 1;
  filter: none;
  -webkit-filter: none;
  -webkit-transform: scale(1);
          transform: scale(1);
}

/* usage: cover, contain, etc */
.fit-cover { object-fit: cover }

.hover-custom figure img {
  /* filter: url(filters.svg#grayscale); Firefox 3.5+ */
  opacity: 0.8;
  filter: gray; /* IE5+ */
  -webkit-filter: brightness(1) contrast(0.8) grayscale(1) saturate(0); /* Webkit Nightlies & Chrome Canary */
  -webkit-transition: transform 15s cubic-bezier(.01,.52,.28,.94), filter var(--dur) cubic-bezier(.01,.52,.28,.94);
	transition: transform 15s cubic-bezier(.01,.52,.28,.94), filter var(--dur) cubic-bezier(.01,.52,.28,.94);
  /* from: https://cubic-bezier.com/#.01,.52,.28,.94 */
}

.hover-custom:hover figure img {
  opacity: 1;
  filter: none;
  -webkit-filter: none;
  /* usage: layout: https://codepen.io/ckschmieder/pen/Nrjwpv */
	/* -webkit-filter: brightness(1.4) contrast(1) grayscale(0) saturate(1.66); */
  -webkit-transform: scale(1.08);
          transform: scale(1.08);
}

/* usage: let willChange = false; */
/* learn: css-tricks.com/almanac/properties/w/will-change/ */
.custom-change { will-change: -webkit-transform, transform, -webkit-filter, filter, opacity }
</style>