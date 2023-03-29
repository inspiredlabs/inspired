<script>
	import { yCorrect, searchStore } from '$lib/stores.js'
	import ListItem from '$lib/ListItem.svelte';
	import { projects } from "$routes/projects"
	import Contact from '$lib/Contact.svelte'
	import { modalOpen } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	let isOpen = true;

	const openModal = () => {
		document.body.style.overflow = 'hidden'
		document.body.style.top = -$yCorrect + 'px';
		isOpen = true;
	};
	const closeModal = () => {
		document.body.style.overflow = ''
		document.body.style.top = '';
		window.scrollTo(0, $yCorrect);
		isOpen = false;
	};

	$: isOpen = $modalOpen;

</script>

<!-- <svelte:body style={ isOpen ? 'position:fixed; ' : '' } /> -->

<Modal { isOpen } { closeModal } />

<ul class="list pl0 w-100 vh-100">
	{#each projects as row, project }
	<!-- usage: <ListItem /> passes JSON array properties using the spread operator as component props. The `revealed` prop is a boolean value that depends on `$searchStore`, if its falsy, or if any value in the JSON array includes the value of `$searchStore`, then `revealed` is true. -->
	<ListItem {project} {...row} revealed={!$searchStore || Object.values(row).some(value => String(value).toLowerCase().includes($searchStore.toLowerCase()))} />
	{/each}
	<Contact />

	<!-- note: <code class="bg-green">usage: {[at]html JSON.stringify ( tags, 2, null )}</code> -->
</ul>
