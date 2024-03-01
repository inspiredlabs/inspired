<script>
	import { activeIndexStore } from '$lib/stores.js';

	import { fade } from 'svelte/transition'; //
	import Gallery from '$lib/Gallery.svelte';
  import { DialogOverlay, DialogContent } from 'svelte-accessible-dialog';
	import { modalOpen } from '$lib/stores';

	export let isOpen;
	export let closeModal;

	$: $modalOpen = isOpen;

</script>

<DialogOverlay {isOpen} onDismiss={ closeModal } style="background-color:#383838">
  <DialogContent
	aria-label="Definition"
	style="overflow:hidden;background-color:#383838;margin:0;padding:0;
	width: 100vw; height: 100vh; min-height: 100vh!important min-width: 100vw!important max-height: 100vh!important max-width: 100vw!important">
	{#if isOpen}
	<div in:fade={{ duration: 222 }} out:fade={{ duration: 222 }} >
		<button
		class="bn transition bg-transparent o-50 charcoal hover-o-100 fr w-10 right-0 top-0 fixed z-max f1 f2-ns f1-m f-headline-l pointer"
		on:click={closeModal}>×
	</button>
		<Gallery />
		</div>
	{/if}
  </DialogContent>
</DialogOverlay>

<style>
:global([data-svelte-dialog-overlay].overlay) {
		margin:0;padding:0;width: 100vw;
		height: 100vh;
		min-height: 100vh!important;
		min-width: 100vw!important;
		max-height: 100vh!important;
		max-width: 100vw!important
  }
</style>