<script>
	import { onMount } from 'svelte';
	import { yCorrect, modalOpen, activeIndexStore, searchStore } from '$lib/stores';
	//import SocialMedia from '$lib/SocialMedia.svelte';
	import Thumbnail from '$lib/Thumbnail.svelte';
	import { marked } from 'marked';
	import { urlize } from 'urlize'; // usage: id={urlize(client)}

	import animatedDetails from 'svelte-animated-details';
	//import animatedDetails from "$lib/svelte-animated-details.js";


	
	//import { items } from "$routes/items.js";
	import { projects } from "$routes/(app)/projects.js";
	const mergedItems = projects.flatMap(project => project.graphics);

	export let fragment, animations, background, caption, client, contract, cite, conclude, development, endorsement, graphics, location, revealed, shot, tags, thumbnail, tint;

	// learn: Override function: https://svelte.dev/repl/30d2efe6622f4150a73405b706d58321?version=3.42.5
  const renderer = {
		heading(text, level) {
      return `<h${level}>${text}</h${level}>`
    },
    link(href, title, text) {
			return `<a href=${href} title=${title ? title : href } class='link o-70 inherit hover-o-100 b--moon-gray bb bw1 transition hover-b--black hover-bw2'>${text}</a>` },
    blockquote(text) {
      return `<blockquote class="w-100 pl4 ma0 tr lh-title georgia i fw5 f3 o-80 ">${noWidowsNoOrphans(text)}</blockquote>`
    },
		paragraph(text) {
      return `<p>${text}</p>`
    },
		// strong(text) {
    //   return `<b class="fw5">${text}</b>`
    // }
  };

  marked.use({ renderer });

	function noWidowsNoOrphans(string) {
		let words = string.split(' ');
    let result = words.slice(-2).join('&nbsp;');
    for (let i = words.length - 3; i >= 0; i--) {
        if (i % 2 === 0 && !words[i].endsWith(',')) {
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
		duration = openHeight / 5 * 1; // 3 * 1

		if (urlize(fragment) === 'kel12') {
			open = true;
		} else {
			open = false;
		}

	});

	let y = 0;

	
</script>

<svelte:window bind:scrollY={y} />

<!-- debug: id="{urlize(caption)}" -->
<li class="{ revealed ? 'revealed' : '' }" id="{ urlize(fragment) }">
<details
	class="flex justify-end w-80 w-70-m w-70-l ma0 transition overflow-hidden hover-custom"
	use:animatedDetails={{ duration }}
	bind:clientHeight={ height }
	bind:open={ open }
>
	<summary class="w-100 pointer flex flex-wrap justify-end">

		<!-- BASIC
			<div class="w-100 w-25-l">
			<figure
			class="pa0 ma0 relative
			square
			w-100 
			vh-50-m
			w-100-m
			w-100-l
			cover bg-center {tint}"
			style="background-image: url('{shot}');">
			</figure>
		</div> -->

		<div class="w-100 w-25-l">
			<figure
			class="custom-change
			pa0 ma0 overflow-hidden relative
			w-100 square
			vh-50-m w-100-m aspect-ratio--16x9-m aspect-ratio-m
			w-100-l square cover bg-center">
				<div class="h-100 w-100 db bg-center cover aspect-ratio--object fit-cover {tint}" style="background-image: url('{shot}')"></div>
			</figure>
		</div>

		<header class="w-100 w-75-l mw-custom-l pl3 hover-o-100 tansition flex flex-column self-center pv2">
			<!-- debug: mt0 -->
			<h2 class="f3 f2-l lh-title fw7"><span class="bb bw1 transition hover-b--black hover-bw2 { open ? 'black b--black bw2' : 'b--transparent' }">{@html client}</span></h2>
			
			

			<!-- debug: ma0 -->
			<h3 class="w-100 f4 f3-l lh-title fw6 mt0">{@html contract}&nbsp;<span
				class="fw7"> —&nbsp;{@html location}</span></h3>
				<!-- debug: ma0 -->
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
					class="ttc br-pill f8 ph2 pv1 pointer black hover-bg-black-10 transition { $searchStore === tag ? 'bg-black-30 white' : 'bg-light-gray' }"
					on:keypress={ () =>
						$searchStore === tag ? $searchStore = '' : $searchStore = tag
					? $searchStore = tag : $searchStore = '' }
					on:click={ () =>
						$searchStore === tag ? $searchStore = '' : $searchStore = tag
					? $searchStore = tag : $searchStore = '' }
					>{@html tag }{@html $searchStore === tag ? '<span>&emsp;×</span>' : '' }
				</small>&nbsp;
				{/each}
				<hr class="ba b--black-10 w-100"/>
			</section>

			{#if background}
			<section class="highlight">
				<h4 class="lh-title">{@html caption}</h4>
				{#each background as backstory, i }
					{@html marked(backstory) }
				{/each}
			</section>
			{/if}


			{#if development.length === 0}
			&nbsp;
			{:else}
			<h4 class="{development.length === 0 ? 'dn' : 'dib' } mt3 ttc">
				<span
				on:keypress
				on:click="{ () => $searchStore = $searchStore === 'Development' ? '' : 'Development' }"
				class="br-pill ph3 pv1 pointer gray hover-black hover-bg-black-10 transition { !$searchStore ? 'bg-light-gray' : $searchStore.toLowerCase() === 'development' ? 'bg-black-30 white' : 'bg-light-gray' }">Development{@html $searchStore === 'Development' ? '<span>&emsp;×</span>' : '' }
			</span><span class="fw4">&nbsp;{@html !$searchStore ? '' : $searchStore.toLowerCase() === 'development' ? '' : development.length + ' hidden' }</span></h4>
			<div class="{ !$searchStore || $searchStore.toLowerCase() === 'development' ? '' : 'dn' }">
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
			</div>
			{/if}
			<hr>

			{#if animations}
			<h4 class="{animations.length === 0 ? 'dn' : 'dib' } mt3 ttc">
				<span
				on:keypress
				on:click="{ () => $searchStore = $searchStore === 'Animation' ? '' : 'Animation' }"
				class="br-pill ph3 pv1 pointer gray hover-black hover-bg-black-10 transition { !$searchStore ? 'bg-light-gray' : $searchStore.toLowerCase() === 'animation' ? 'bg-black-30 white' : 'bg-light-gray' }">Animation{@html $searchStore === 'Animation' ? '<span>&emsp;×</span>' : '' }</span><span class="fw4">&nbsp;{@html !$searchStore ? '' : $searchStore.toLowerCase() === 'animation' ? '' : animations.length + ' hidden' }</span></h4>
			<div class="{ !$searchStore || $searchStore.toLowerCase() === 'animation' ? '' : 'dn' }">
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
			</div>
			{/if}
			<hr>

			{#if graphics}
			<h4 class="{graphics.length === 0 ? 'dn' : 'dib' } mt3 ttc">
				<span
				on:keypress
				on:click="{ () => $searchStore = $searchStore === 'Graphics' ? '' : 'Graphics' }"
				class="br-pill ph3 pv1 pointer gray hover-black hover-bg-black-10 transition { !$searchStore ? 'bg-light-gray' : $searchStore.toLowerCase() === 'graphics' ? 'bg-black-30 white' : 'bg-light-gray' }">Graphics{@html $searchStore === 'Graphics' ? '<span>&emsp;×</span>' : '' }</span><span class="fw4">&nbsp;{@html !$searchStore ? '' : $searchStore.toLowerCase() === 'graphics' ? '' : graphics.length + ' hidden' }</span></h4>
			<div class="{ !$searchStore || $searchStore.toLowerCase() === 'graphics' ? '' : 'dn' }">
				<section class="no-clutter grid grid-columns-2 grid-columns-3-l gc3 gr3 w-100">
				{#each mergedItems as { frag, title, description, src, tint }, index}
					{#if title !== undefined && !title.toLowerCase().includes('draft') }
						<a
							href
							class="{ fragment == frag ? '' : 'dn' }
							{index === $activeIndexStore ? 'b--custom' : 'b--transparent'}
							pointer ba bw2"
							on:mouseover={ () => $yCorrect = y }
							on:mouseover={ () => {
								$activeIndexStore = index
								}
							}
							on:click={ () => $modalOpen = true }
							tabindex=0
							on:keypress
							on:focus>
							<figure
								class="square cover bg-center ma0 { tint ? tint : '' }"
								style="background-image: url({src})">
								<figcaption class="flex items-center justify-center hide-child">
									{#if title}
									<small class="square child white w-100 bg-black-90 tc f8 ttu tracked
									flex flex-column items-center justify-center pa3">
										<span class="w-100 ">{@html title}</span>
										<div class="dn dn-ns dn-m db-l w-70">
											{#if description}
												<hr class="ba b--25 w-third o-60 mr-auto ml-auto"/>
												<span>{@html description}</span>
											{/if}
										</div>
									</small>
									{/if}
								</figcaption>
							</figure>
						</a>
						{/if}
					{/each}
				</section>
			</div>
			{/if}



			{#if conclude}
			<section class="highlight pt4">
				<h4>Testimonial</h4>
				<div class="flex justify-end w-100 flex flex-wrap">
					<!-- w-100-ns w-80-m w-90-l -->
					<blockquote class="ma0">
						<!-- flex w-100 -->
						<div class="f4 f3-l">
							<!-- ph0 pr0-ns pr3-l -->
							<p class="
								georgia i fw5
								lh-copy lh-title-l
								ma0 tr o-80">
								{@html noWidowsNoOrphans(conclude) }
							</p>
							<cite class="w-100 mt0 pa0 tr db"><a href={endorsement}
								class=" no-underline ">&#8209;&nbsp;<span class="b link o-70 inherit hover-o-100 b--moon-gray bb bw1 transition hover-b--black pt2 system f7 tracked ttu fs-normal" style="line-height:3px">{@html cite}</span></a></cite>
						</div>
					</blockquote>
					<div class="w-100 white flex justify-end pt2">
						<div class="">
							<!-- w-third w-20-ns w-20-m w-20-l -->
							<img loading="lazy" height="100" width="100" src="{thumbnail}" class="br-100 square no-select" alt="{cite}" style="filter: grayscale(1);"/>
						</div>
					</div>
				</div>
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
	.b--custom { border-color: rgba(128, 128, 128, 0.1) }

	::-webkit-details-marker { display: none }

	li:first-child { padding-top: 8rem }

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
	content: 'View Case…\2003';
	padding-top: 2rem;
	/* padding-bottom: 2rem; */
	font-family: serif;
	font-weight: 600;
	font-style: italic;
	display: block;
	width: 100%;
	text-align: right;
	line-height: 0;
	z-index:1;
	color: silver;
}

/* usage: break this out into media queries? */
/* details > summary header { */
	/* margin-top: -1rem!important */
/* } */
details[open] > summary header:after {
	content: 'Close Case…\2003'
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

.hover-custom figure div {
  /* filter: url(filters.svg#grayscale); Firefox 3.5+ */
  opacity: 0.8;
  filter: gray; /* IE5+ */
  -webkit-filter: brightness(1) contrast(0.8) grayscale(1) saturate(0); /* Webkit Nightlies & Chrome Canary */
  -webkit-transition: transform 15s cubic-bezier(.01,.52,.28,.94), filter var(--dur) cubic-bezier(.01,.52,.28,.94);
	transition: transform 15s cubic-bezier(.01,.52,.28,.94), filter var(--dur) cubic-bezier(.01,.52,.28,.94);
  /* from: https://cubic-bezier.com/#.01,.52,.28,.94 */
}

.hover-custom:hover figure div {
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