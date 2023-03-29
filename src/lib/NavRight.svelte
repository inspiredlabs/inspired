<script>
	import { goto } from '$app/navigation';
	import { modalOpen, searchStore } from '$lib/stores';
	import SearchInput from "./SearchInput.svelte"
</script>

<!-- learn: gold standard: file:/ / /Users/scottphillips/Documents/GitHub/static/support/src-november-2021/november/index.html -->

<nav class="w-20 w-30-m w-30-l pl2 fixed z-0 mt0 pa0 ma0 top-0 white right-0 overflow-y overflow-x-hidden h-100 vh-100 overflow-y-scroll touch-scrolling">
	<ul class="list source-sans fw3 pl0 pl2-ns pl1-m pl4-l fs-5vmin fs-6vmin-ns fs-4vmax-m fs-8vmin-l lh-5vh pt5">
		<li class="fl w-100 ttn">

			<form class="bb bw1 b--light-gray w-90 w-70-ns w-90-m w-70-l relative ma0 pb2">
				<button value="clear" class="absolute right-0 ma0 pa0 pt2 bn z-1 bg-transparent pointer"
				on:click={() => $searchStore = ''}><span class="input-reset bn bg-transparent charcoal hover-o-100 flex items-center  o-30">×</span>
				</button>
				<SearchInput />
			</form>

		<li class="fl w-100">
			<button class="source-sans fw3 pointer bn bg-transparent charcoal transition hover-o-100 o-60 pl0" on:click={() => $searchStore = 'Development'}>
				<small class="db dn-ns dn-m dn-l">Development</small>
				<span class="dn db-ns db-m db-l">Development</span>
			</button>
		</li>
		<li class="fl w-100">
			<button class="source-sans fw3 pointer bn bg-transparent charcoal transition hover-o-100 o-60 pl0" on:click={() => $searchStore = 'Animation'}>
				<small class="db dn-ns dn-m dn-l">Animation</small>
				<span class="dn db-ns db-m db-l">Animation</span>
		</button>
		</li>
		<li class="fl w-100">
			<button class="source-sans fw3 pointer bn bg-transparent charcoal transition hover-o-100 o-60 pl0" on:click={() => $searchStore = 'Graphics'}>
				<small class="db dn-ns dn-m dn-l">Graphics</small>
				<span class="dn db-ns db-m db-l">Graphics</span>
			</button>
		</li>
		<li class="fl w-100">
			<button class="source-sans fw3 pointer bn bg-transparent charcoal transition hover-o-100 o-60 pl0"
			on:keypress={ () => $modalOpen = true }
			on:click={ () => $modalOpen = true }
			>
				<!-- usage: toggle: on:click={ () => $modalOpen === true ? $modalOpen = false : $modalOpen = true } -->
				<small class="db dn-ns dn-m dn-l">Portfolio</small>
				<span class="dn db-ns db-m db-l">Portfolio</span>
			</button>
		</li>
		<li class="fl w-100">
			<button class="source-sans fw3 pointer bn bg-transparent charcoal transition hover-o-100 o-60 pl0" on:keypress={ () => goto('#contact') } on:click={ () => goto('#contact') }>
				<small class="db dn-ns dn-m dn-l">Contact</small>
				<span class="dn db-ns db-m db-l">Contact</span>
			</button>
		</li>
		<!-- <li class="fl w-100">
			<a
			class="link source-sans fw3 pointer charcoal transition hover-o-100 o-60 pl0" href="#contact">
				<small class="db dn-ns dn-m dn-l">Contact</small>
				<span class="dn db-ns db-m db-l">Contact</span>
			</a>
		</li> -->
	</ul>
</nav>

<style>
	:global(:focus) {
		outline: 0.5rem auto cyan;
  	outline: 0.5rem auto -webkit-focus-ring-color;
	}

</style>