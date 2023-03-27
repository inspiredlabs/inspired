<script>
	import { draggable } from '@neodrag/svelte';
</script>

<aside use:draggable class="grab z-max w5 pa2 fixed">
	<slot></slot>
</aside>


<style>
	aside {
		-webkit-touch-callout:none;
		-ms-touch-action:none; touch-action:none;
		user-select: none;
		/* cursor: move; */
		background: rgba(255, 255, 0, 0.8);
	}
</style>