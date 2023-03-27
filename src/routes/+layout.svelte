<script>
  import InspectorGadget from '$lib/InspectorGadget.svelte';
  import Serp from '$lib/Serp.svelte'
	import DetailsSummary from '$lib/DetailsSummary.svelte'
  import NavRight from '$lib/NavRight.svelte'
	import Nprogress from '$lib/Nprogress.svelte';
  import '../app.css'
</script>


<!-- <InspectorGadget>
	<DetailsSummary style="bg-black-10" summary="SERP">
		<Serp />
	</DetailsSummary>

  <DetailsSummary style="bg-black-10" summary="NEW">
		New...
	</DetailsSummary>

</InspectorGadget> -->

<Nprogress />

<main class="w-100 source-sans charcoal lh-copy f4 flex flex-wrap pt6 ">
  <slot />
  <NavRight />
</main>

<style>

@font-face {
  src:
    url('css/SourceSans3VF-Roman.ttf.woff2') format('woff2-variations');
  font-family:'Source Sans Variable';
  font-style: normal;
  font-weight: 100 900;
}

:global(.source-sans) {
  font-family: 'Source Sans Variable', sans-serif; /* Variable */
}

/* note: rethink font weights, no thanks?! */
:global(.source_sans_prolight) { font-weight: 100 }
:global(.source_sans_proregular) { font-weight: 300 }
:global(.source_sans_prosemibold) { font-weight: 500 }
:global(.source_sans_probold) { font-weight: 800 }

:global(html,body) {
  margin:0;
  padding: 0;
}

:root {
  --primary-back: #381c75;
  --primary-back: hsla(259,61%,28%, 1);
  --primary-fore: #f3f3f3;
  --primary-fore: hsla(0,0%,95%, 1);
  --secondary-back: #211046;
  --secondary-back: hsl(259,63%,17%, 1);
  --secondary-fore: #785463;
  --secondary-fore: hsla(335,18%,40%, 1);
  --accent: #383838;
}

:global(.accent) {
  color: var(--accent);
  fill:var(--accent)
}

:global(.hover-bg-accent:hover),
:global(.hover-bg-accent:focus) {
  background-color: var(--accent);
}

:global(.primary-back) {
  color: var(--primary-back);
  fill: var(--primary-back);
}

:global(.bg-primary-back) {
  background-color: var(--primary-back);
}



:global(.bg-secondary-back),
:global(.hover-bg-secondary-fore:hover),
:global(.hover-bg-secondary-fore:focus) {
  background-color: var(--secondary-back);
}

:global(.b--secondary-back) {
  border-color: var(--secondary-back);
}

:global(.b--secondary-fore) {
  border-color: var(--secondary-fore);
}

:global(.bg-primary-fore) {
  background-color: var(--primary-back);
}

:global(.secondary-fore) {
  color: var(--secondary-fore);
}

:global(.antialias) { -webkit-font-smoothing: antialiased }

:global(.bg-transition:hover), :global(.bg-transition:active) {
  transition: background-color 0.4s ease 0s;
  -webkit-transition: background-color 0.4s ease 0s;
}

/************ ADD INTO TACHYON-SHOWER **************/

/* Optimal reading length */
:global(.mw-custom) { max-width: 40rem }

@media screen and (min-width: 30em) {
  :global(.mw-custom-ns) {
    max-width: 40rem
  }
}

@media screen and (min-width: 30em) and (max-width: 60em) {
  :global(.mw-custom-m) {
    max-width: 40rem
  }
}

@media screen and (min-width: 60em) {
  :global(.mw-custom-l) {
    max-width: 40rem
  }
}


/* :global(.hover-shadow-5:hover) { box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2) } */
:global(.hover-bw2:hover),
:global(.hover-bw2:active) {
  border-width: 0.25rem
}
</style>