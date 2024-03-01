<script>
	// from: svelte.dev/repl/2d8c50325a614e0988761474f8e863aa?version=3.46.4
	import { dockStore, activeIndexStore } from '$lib/stores.js';
	import { debounce } from '$lib/debounce.js';
	import { projects } from "$routes/(app)/projects.js";
	const items = projects.flatMap(project => project.graphics);

	import { onMount } from 'svelte';

	let index;

	onMount(async () => {
		return setTimeout(() => {
				scrollActiveIntoView($activeIndexStore)
		}, 0);
	});

	let container;

	function trackIntersect(node) {
		const children = [...node.children];

		const handleIntersect = (entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// activeIndex
					$activeIndexStore = children.indexOf(entry.target);
				}
			})
		}
		const observer = new IntersectionObserver(handleIntersect, {
			root: node,
			rootMargin: '0px',
			threshold: 1
		});

		children.forEach(c => observer.observe(c));
	}

	function scrollActiveIntoView(index) {
		if (container) {
			container.children[index].scrollIntoView({
				behavior: 'smooth', // instant
				block: 'end',
				inline: 'nearest',
				scrollMode: 'if-needed'
			});
		}
	}

	$: scrollActiveIntoView($activeIndexStore);

	function handleClick(index) {
  	//container.style.scrollBehavior = 'smooth';
  	$activeIndexStore = index;
		$activeIndexStore = $activeIndexStore
	}

	let key;
	let pressed = false;

	const arrowKeys = debounce(event => {
		if (event && !pressed) {
			pressed = true;

			if ( event.key == 'ArrowRight' ) {
			key = '&rarr;'
			container.style.scrollBehavior = 'smooth';
			$activeIndexStore = $activeIndexStore +1;
			if ( $activeIndexStore > items.length-1 ) {
				container.style.scrollBehavior = 'unset';
				$activeIndexStore = 0
			}
		} else if ( event.key == 'ArrowLeft' ) {
			key = '&larr;'
			container.style.scrollBehavior = 'smooth';
			$activeIndexStore = $activeIndexStore -1;
			if ( $activeIndexStore == -1 ) {
				container.style.scrollBehavior = 'unset';
				$activeIndexStore = items.length-1
			}
		}
			pressed = false;
		}
	}, 222);


	$: activeIndex = $activeIndexStore;

	let nonStore = false;









///////////////   SVG loupe   ///////////////
import { distanceXstore, distanceYstore, distanceLinear, coords, bgWidth, bgHeight } from '$lib/stores';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

const size = tweened(0, {
	duration: 400,
	easing: cubicOut
});

let loupe = 133;

let clientWidth;
let clientHeight;

$: $bgWidth = clientWidth;
$: $bgHeight = clientHeight;

let slope = 0.1;
let intercept = 0.5;

let xPos = (($coords.x / $bgWidth) * 100);
let yPos = (($coords.y / $bgHeight) * 100);





let c1 = {
	x: 1, // c1.x
	y: 1, // c1.y
	r: 30 // c1.r
};

let c2 = {
	x: 0, // c1.x
	y: 0, // c1.y
	r: 30 // c1.r
};

let distanceX = c2.x - c1.x;
let distanceY = c2.y - c1.y;

let resMultiplierWidth = 0
let resMultiplierHeight = 0

// usage: github.com/inspiredlabs/instantwebapp.com
onMount( () => {
  // do...
  c2.x = (innerWidth * 0.5),
  c2.y = (innerHeight * 0.5)

  if ($bgWidth > 1024) {
    resMultiplierWidth = 0.25;
    resMultiplierHeight = 0.01;
  } else {
    resMultiplierWidth = 0.15;
    resMultiplierHeight = 0.05;
  }
});

let squared = 0;

function handleMove(event) {
  const touch = event.touches ? event.touches[0] : event;
  coords.set({ x: event.clientX, y: event.clientY });
  c1.x = $coords.x,
  c1.y = $coords.y,
  distanceX = (c2.x - c1.x),
  distanceY = (c2.y - c1.y),
  size.set(loupe),
  squared = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
}

$: $distanceLinear = squared;

$: $distanceXstore = distanceX;
$: $distanceYstore = distanceY;

// only valid loupe images
// usage: `loupeSrc.includes(src)`
let loupeSrc = [
	'./images/rank-colourscheme.webp',
	'./images/tasteofthebusinesscard.webp',
	'./images/locality.webp',
	'./images/marketing-material-01.webp',
	'./images/marketing-material-07.webp']; 
</script>

<svelte:window on:keyup={arrowKeys}/>

<div class="ma0 pa0 backface-hidden system">
	<!-- debug vh-50 || vh-100 -->

	<div class="overflow-y-hidden snap-x-mandatory flex overflow-x-auto vh-100 w-100 tc shadow-5" use:trackIntersect bind:this={container} >
	{#each items as {title, description, src, tint, zoom}, index}
	
		
		<section
			oncontextmenu="return false"
			role="presentation"
			class="w-100 snap-start {tint}"
			style="background-image: url('{src}'); height:100vh"
			on:blur={(e) => { size.set(0) }}
			on:mouseout={(e) => { size.set(0) }}
		>
		{#if zoom }
		<aside>
			<div
				bind:clientWidth={clientWidth}
				bind:clientHeight={clientHeight}
				class="background {tint}"
				style="--size: {$size}; --x: {$coords.x}; --y: {$coords.y}; background-image: url({src});
				background-size: 200%;
				background-position:
					{($coords.x / $bgWidth) *
						(100 - ($distanceXstore * resMultiplierWidth))
					}%
					{($coords.y / $bgHeight) *
						(100 - ($distanceYstore * resMultiplierHeight))
					}%;
				clip-path: circle( calc( var(--size) * 1px) at calc( var(--x) * 1px) calc( var(--y) * 1px) )">
			</div>
			<svg
				oncontextmenu="return false"
				role="presentation"
				on:mousemove={ handleMove }
				on:touchmove={ handleMove }
				on:blur={(e) => { size.set(0) }}
				on:mouseout={(e) => { size.set(0) }}
				on:mousemove={(e) => { size.set(loupe) }}
				on:mousemove={(e) => { coords.set({ x: e.clientX, y: e.clientY }); }}
				style="height: calc( 100% - calc({loupe}px * 0.125) )"
				>
			</svg>
		</aside>
		{/if}


		</section>
	{/each}
	</div>

	<!-- debug: translateY-custom o-0 hover-o-100 -->



<div
	aria-haspopup="true"
	aria-expanded={$dockStore}
	on:blur={ () => $dockStore = false }
	on:focus={ () => $dockStore = true }
	on:mouseleave={ () => $dockStore = false}
	on:mouseenter={ () => $dockStore = true }
	class="bottom-0 w-100 z-3 fixed mr-auto ml-auto flex flex-wrap items-center transition translateY-custom {$dockStore ? 'o-100' : 'o-0' }"
	style="{nonStore ? 'opacity:1;-webkit-transform: translateY(0);transform: translateY(0);' : '' } ">
	<!-- debug: pt6 -->
	<button
	on:keyup={ () => (nonStore = !nonStore) }
	on:click={ () => (nonStore = !nonStore) }
	class="bn bg-transparent w-100 h2 h3-l ma0 "
	></button>

	<nav class="w-100 bg-transparent bn ma0 pa0 h3 h4-l bottom-0
	overflow-hidden snap-x-mandatory flex overflow-x-scroll">

	{#each items as {title, description, src, tint}, index}
		<button
			style="{index === $activeIndexStore ? 'border: 0.25rem solid rgb(128,128,128)' : ''}; background-image: url('{src}');"
			class="h3 h4-l input-reset pa0 ma0 bg-center contain ba bw2 b--transparent link pv1 square inline-flex {tint}"
			on:click="{ () => handleClick(index) }"
			on:focus="{ () => handleClick(index) }"
		></button>
		<!-- debug: bg-cover max-width:calc(100% / {items.length}) -->
	{/each}
	</nav>
</div>
</div>



<style>
/* mobile zoom */
@media (pointer: coarse) {
	aside { display: none }
  figure { background-size: cover }
}
/* @media (pointer: fine) { } */

svg {
    /* border: 2px solid cyan; */
		position: absolute;
    min-width: 100%;
		width:100%;
		left: 0;
		top: 0;
		cursor: none;
	}

section {
  height: var(--loupe);
  min-width: 100%;
	width: 100vw;
  /* usage: `{imgUrl}` background-image: var(-\-bg-url); */
	background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
	padding:0;
	margin:0;
}

aside {
  position: relative;
  z-index: 0;
  height: 100%;
  width: 100%;
}

.background:before {
  content: '';
  width: 100%;
  height: 100%;
  display: block;
  clip-path: circle( calc(var(--size) * 1px) at calc(var(--x) * 1px) calc(var(--y) * 1px) );
  background: radial-gradient(transparent 68%, black);
  background-size:
  calc( calc(var(--size) * 1px) * 2)
  calc( calc(var(--size) * 1px) * 2);/* calc(var(--size) * 1px) calc(var(--size) * 1px) */
  background-position: 
  calc( calc(var(--x) * 1px) - calc(var(--size) * 1px))
  calc( calc(var(--y) * 1px) - calc(var(--size) * 1px))
}

.background {
  clip-path: circle( calc(var(--size) * 1px) at calc(var(--x) * 1px) calc(var(--y) * 1px) );
  /* pointer-events:none; */
  height: 100%;
  width: 100%;
/* min-height: 330px; */
  /* usage: `{imgUrl}` background-image: var(-\-bg-url); */
  background-size: var(--bg-size);
	/* the relationship between 166% and -16% offset */
	background-position: center;
  background-repeat: no-repeat;
	padding:0;
	margin:0;
	/* position:absolute;
	cursor:none; */
}

:root {
  --loupe: 95vh;
	--bg-zoom: calc( calc(var(--bg-size) / 10 ) + 10%);
	--bg-size: 100%;
	/* usage: `{imgUrl}` -\-bg-url: url("./images/3si-sales.jpg") */
	}
/* 	https://www.inspiredlabs.co.uk/images/profile.webp */


.translateY-custom {
	-webkit-transition: all .8s cubic-bezier(.3, 0, .02, 1);
	-webkit-transform: translateY(6%);
	transition: all .8s cubic-bezier(.3, 0, .02, 1);
	transform: translateY(6%);
}

.translateY-custom:hover {
	-webkit-transform: translateY(0);
	transform: translateY(0);
}



.bg-platinum { background-color: #e5e4e2 }
.bg-palladium { background-color: rgb(246,246,246) }
.bg-abyss { background-color: rgb(02,0,30) }
.bg-obsidian { background-color: rgb(26,26,26) }
/* .bg-chinese-black { background-color: #383838 } */


@media (orientation: portrait) {
  .bg-custom {
		background-size: 55vh;
		background-position: 50%
	}
}

@media (orientation: landscape) {
  .bg-custom {
		background-size: 55vw;
		background-position: 50%
	}
}

	:global(body, html) {
		height: 100vh;
		width: 100vw;
		margin:0;
		padding:0
	}

	/* .scroll-behavior: smooth */
	.snap-x-mandatory { scroll-snap-type: x mandatory }
  .snap-start { scroll-snap-align: start }

	.grid {
		display: grid;
		place-items: center
	}

	/* button {
		display: flex;
		justify-content: center;
	} */

</style>
