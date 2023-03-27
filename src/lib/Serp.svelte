<script>
	// import { marked } from 'marked';
	let text = ``;
	$: count = text.length
</script>

<form class="flex flex-wrap items-end justify-end">
	<label
		for="text"
		class="w-5 code f5"
	>{ count }</label>
	<textarea
	placeholder="SERP is a summary about this page for search results."
	bind:value={text}
	class="w-100 h5 transparent no-resize"
	></textarea>
</form>

<style>
/*  note: this is not yet part of Tachyon Shower */
.no-resize { resize:none }
</style>

<!-- {@html marked(text) } -->