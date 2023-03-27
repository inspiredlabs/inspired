<script>
	// from: svelte.dev/repl/2d8c50325a614e0988761474f8e863aa?version=3.46.4
	import { activeIndexStore } from '$lib/stores.js';
	import { onMount } from 'svelte';
	import { projects } from "$routes/projects.js"

	let i = 0;
	let activeIndex = 0;

	onMount(async () => {
		return setTimeout(() => {
				scrollActiveIntoView($activeIndexStore)
		}, 0);
	});

	let items = ['item 0', 'item 1', 'item 2', 'item 3'];

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
	// on:keypress =
	function arrowKeys(event) {

		if ( event.key == 'ArrowRight' ) {
			key = '&rarr;'
			$activeIndexStore = $activeIndexStore +1;
			if ( $activeIndexStore > items.length-1 ) {
				container.style.scrollBehavior = 'unset';
				$activeIndexStore = 0
			}

		} else if ( event.key == 'ArrowLeft' ) {
			key = '&larr;'
			$activeIndexStore = $activeIndexStore -1;
			if ( $activeIndexStore == -1 ) {
				container.style.scrollBehavior = 'unset';
				$activeIndexStore = items.length-1
			}

		}
	}
</script>

<svelte:window on:keydown={arrowKeys}/>

<div class="ma0 pa0 backface-hidden ">

	<div
	class="snap-x-mandatory flex overflow-x-auto vh-50 w-100 tc overflow-hidden"
	use:trackIntersect bind:this={container}
	>




	{#each items as item}
		<div class="w-100 snap-start grid flex-shrink-0">
			{item}

			<!-- debug: <code class="bg-yellow">{AThtml JSON.stringify ( projects, 2, null )}</code> -->

			<div style="text-align: center">
				{#if key}
					<kbd>{@html key === ' ' ? 'Space' : key}</kbd>
				{:else}
					<p>Focus here and press arrows:</p>
				{/if}
			</div>

		</div>
	{/each}
	</div>

		<div class="cf db w-100 pb5 debug">
			<div class="highlight db black-70 f5 f4-ns f3-m f3-l lh-copy pb6 measure ph2 measure-ns ph4-ns measure-m ph2-m measure-wide-l ph0-l mr-auto ml-auto">

				<nav class="fl w-100 cf">
					{#each items as {id}, i}
						<button
						style="{i === $activeIndexStore ? 'border: 0.25 solid red' : ''}; width:calc(100% / {items.length})"
						class="o-50 link inline-flex w2 h2 items-center justify-center pv1"
						on:click="{ () => handleClick(i) }"
						tabindex={i}
						on:keypress
						on:focus
					>{id}</button>
				{/each}

      </nav>

    </div>
  </div>

</div>

<style>

	:global(body, html) {
		height: 100vh;
		margin:0;
		padding:0;
	}

	.snap-x-mandatory { scroll-snap-type: x mandatory }
  .snap-start { scroll-snap-align: start }

	.grid {
		display: grid;
		place-items: center;
	}

	/* button {
		display: flex;
		justify-content: center;
	} */

</style>