<script>
	import Gallery from '$lib/Gallery.svelte';
  import { DialogOverlay, DialogContent } from 'svelte-accessible-dialog';
	import { modalOpen } from '$lib/stores';

	export let isOpen;
	export let closeModal;

	$: $modalOpen = isOpen;

</script>

<DialogOverlay {isOpen} onDismiss={ closeModal } >
  <DialogContent aria-label="Definition">
	<button
		class="bn transition bg-transparent o-10 charcoal hover-o-100 fr w-10 right-0 top-0 fixed z-max f1 f2-ns f1-m f-headline-l pointer"
		on:click={closeModal}>×
	</button>
		<Gallery />
  </DialogContent>
</DialogOverlay>