<script>
// Preloader.svelte
import { fade } from 'svelte/transition';
import { onMount } from 'svelte';
let nowLoading = true;

onMount(() => {
	nowLoading = false;
});

</script>


{#if nowLoading}
<aside out:fade={{ duration: 300 }}
style="background-color:#f8f8f8"
class="fixed z-1 w-100 vh-100 top-0 gray" >
  <div class="w-100 vh-100 flex items-center justify-center">
   <svg id="loader" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
    <style>
      #loader { animation: spin 1s linear infinite }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    </style>
    <defs>
      <linearGradient id="spin" x1="50%" x2="55%" y1="58%" y2="90%">
        <stop offset="0%" stop-color="currentColor" />
        <stop offset="22%" stop-opacity=".6" stop-color="currentColor" />
        <stop offset="100%" stop-opacity="0" stop-color="currentColor" />
      </linearGradient>
    </defs>
      <g fill="none" transform="translate(0 0.4)">
        <circle cx="24" cy="24" r="24" />
        <path fill="url(#spin)" d="M56 32a2 2 0 1 1-4 0 20 20 0 1 0-20 20 2 2 0 1 1 0 4 24 24 0 1 1 24-24Z" transform="rotate(45 38 18)" />
      </g>
    </svg>
  </div>
</aside>
{/if}