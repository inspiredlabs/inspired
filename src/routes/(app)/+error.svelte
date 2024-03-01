<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<section class="pa4 mb5 flex flex-column items-start w-100 ba br4 ba b--light-pink bg-washed-red shadow-5">
	<h1>{$page.status}</h1>
	<p>{$page.error?.message}</p>
</section>
