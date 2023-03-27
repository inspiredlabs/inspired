<script>
	export let src;
	export let title;
	export let description;
</script>

<figure
	class="square cover bg-center ma0"
	style="background-image: url({src})">
	<figcaption class="flex items-center justify-center hide-child">
		{#if title}
		<small class="square child white w-100 bg-black-90 tc f8 ttu tracked
		flex flex-column items-center justify-center pa3">
			<span class="w-100 ">{@html title}</span>
			<div class="dn dn-ns dn-m db-l w-70">
				{#if description}
					<hr class="ba b--25 w-third o-60 mr-auto ml-auto"/>
					<span>{@html description}</span>
				{/if}
			</div>
		</small>
		{/if}
	</figcaption>
</figure>

<style>
.square { aspect-ratio: 1 / 1 }
</style>