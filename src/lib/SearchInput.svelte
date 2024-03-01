<script>
	import { searchStore } from './stores'
	let search;
	let key;

	// usage: `<svelte:window on:keydown={autoFocus}/>`
	// learn: svelte.dev/tutorial/svelte-window
	// Event modifiers: https://svelte.dev/tutorial/event-modifiers
	// programatically focus on slash
	function autoFocus(event) {
		key = event.key;
    if ( key === '\\' || key === '/' ) {
			event.preventDefault();
			//search.value = $searchStore;
			search.focus()
			//search.scrollIntoView()
		}
	}

</script>

<form on:submit|preventDefault={() => search = $searchStore}>
	<label for="search" class="sr-only">Search</label>
	<input
		bind:this={search}
		type="search"
		class="highlight source-sans fw3 input-reset bn bg-transparent transition hover-o-100 o-80 flex items-center pa0 pt2 pb2"
		placeholder="Search"
		bind:value={$searchStore}
		aria-describedby="search"
		name="search"
		id="search"
	>
</form>

<style>
	/* learn: geektnt.com/how-to-remove-x-from-search-input-field-on-chrome-and-ie.html */
	input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration { display: none; }

	::placeholder:active,
	::placeholder:focus {
		color: black;
		opacity: 1; /* Firefox */
	}

	:-ms-input-placeholder:active,
	:-ms-input-placeholder:focus { /* Internet Explorer 10-11 */
	color: black;
	}

	::-ms-input-placeholder:active,
	::-ms-input-placeholder:focus	{ /* Microsoft Edge */
		color: black
	}
</style>

<svelte:window on:keydown={autoFocus} />
