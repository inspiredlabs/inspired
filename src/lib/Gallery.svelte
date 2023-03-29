<script>
	// from: svelte.dev/repl/2d8c50325a614e0988761474f8e863aa?version=3.46.4
	import { dockStore, activeIndexStore } from '$lib/stores.js';
	import { debounce } from '$lib/debounce.js';
	import { projects } from "$routes/projects.js";
	const items = projects.flatMap(project => project.graphics);

	import { onMount } from 'svelte';

	let i;

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
					activeIndex = children.indexOf(entry.target);
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

	$: scrollActiveIntoView($activeIndexStore);

	function scrollActiveIntoView(index) {
		if (container) {
			container.children[index].scrollIntoView({
				//behavior: 'smooth',
				block: 'end',
				inline: 'nearest',
				scrollMode: 'if-needed'
			});
		}
	}

	function handleClick(i) {
  	container.style.scrollBehavior = 'smooth';
  	$activeIndexStore = i;
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
</script>

<svelte:window on:keyup={arrowKeys}/>

<div class="ma0 pa0 backface-hidden system vh-50">

	<div
		class="overflow-hidden snap-x-mandatory flex overflow-x-auto vh-100 w-100 tc "
		use:trackIntersect bind:this={container}
	>
	{#each items as {title, description, src, tint}, i}
		<div class="w-100 snap-start grid flex-shrink-0 no-select
		h-100 bg-custom bg-center vh-100 mw-100 {tint}"
		style="background-image: url('{src}')"
		>
			<!-- usage: <img src={src} alt="{title}" /> -->
			<!-- usage: <div style="text-align: center">
				{#if key}
				<kbd>{@html key === ' ' ? 'Space' : key}</kbd>
				{:else}
				<p>Focus here and press arrows:</p>
				{/if}
			</div> -->
		</div>
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
	class="bottom-0 w-100 z-3 fixed pt6 mr-auto ml-auto flex flex-wrap items-center justify-center transition translateY-custom {$dockStore ? 'o-100' : 'o-0' }"
	style="{nonStore ? 'opacity:1;-webkit-transform: translateY(0);transform: translateY(0);' : '' } ">
	<button
	on:keyup
	on:click={ () => (nonStore = !nonStore) }
	class="bn bg-transparent w-100 h3 ma0 "
	></button>
	<nav class="w-100 bg-transparent bn ma0 pa0 h4 bottom-0
	overflow-hidden snap-x-mandatory flex justify-center overflow-x-auto">

	{#each items as {title, description, src, tint}, i}
		<button
			style="background-size: 100%; background-position: 50%; {i === $activeIndexStore ? 'border: 0.25rem solid rgb(128,128,128)' : ''}; background-image: url('{src}'); max-width:calc(100% / {items.length})"
			class="h4 input-reset pa0 ma0 bg-cover ba bw2 b--transparent link pv1 square inline-flex {tint}"
			on:click="{ () => handleClick(i) }"
			on:focus="{ () => handleClick(i) }"
		></button>
	{/each}
	</nav>
</div>
</div>



<style>

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