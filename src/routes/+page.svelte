<script>
	import { yPosNew, searchStore } from '$lib/stores.js'
	import ListItem from '$lib/ListItem.svelte';
	import { projects } from "$routes/projects"

	import Contact from '$lib/Contact.svelte'


	import { modalOpen } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	let page;

	let isOpen = true;

	const openModal = () => {
		isOpen = true;
		//$modalOpen = true;
		//page.style.backgroundColor = 'red';
		//alert($yPosNew);
	};
	const closeModal = () => {
		isOpen = false;
		//$modalOpen = false;
	};

	$: isOpen = $modalOpen;
</script>

<Modal { isOpen } { closeModal } />

<ul class="list pl0 w-100 vh-100">
	{#each projects as row }
	<!-- usage: <ListItem /> passes JSON array properties using the spread operator as component props. The `revealed` prop is a boolean value that depends on `$searchStore`, if its falsy, or if any value in the JSON array includes the value of `$searchStore`, then `revealed` is true. -->
	<ListItem {...row} revealed={!$searchStore || Object.values(row).some(value => String(value).toLowerCase().includes($searchStore.toLowerCase()))} />
	{/each}
	<Contact />

	<!-- note: <code class="bg-green">usage: {[at]html JSON.stringify ( tags, 2, null )}</code> -->
</ul>
