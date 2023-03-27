<script>
	export let src;
	export let title;
	export let description;
</script>

<figure
	class="ma0 relative w-100 overflow-hidden bg-black-30 cover bg-center"
	style="background-image: url({src})">
	<figcaption class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center hide-child">
		{#if title}
		<small class="child white w-100 h-100 bg-black-90 tc f8 ttu tracked
		flex items-center justify-center flex-column pa3">
			<span>{@html title}</span>
			<div class="dn dn-ns dn-m db-l w-75">
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
/* learn: https://stackoverflow.com/questions/19068070/how-to-style-a-div-to-be-a-responsive-square/28985475#28985475	*/
figure:before {
  content: "";
  display: block;
  padding-top: 100%;
}
</style>