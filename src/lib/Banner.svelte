<script>
	import viewport from '$lib/intersectionObserver.js'
	let seen = false;
</script>


<header
use:viewport|threshold={0.5}
on:enterViewport={() => seen = false }
on:exitViewport={() => seen = true }
style="height:200vh">
	<section class="absolute shadow-5 vh-100 w-100 z-1 left-0 top-0 cover banner">
		<div class="flex vh-100 w-100 white">
			<div class="flex flex-column flex-grow-1">
				<h1 class="fs-3vmin flex-auto mv3 tc ts1-dark-gray">&#9656;InspiredLabs</h1>
				<!-- debug: `scaling higlight` -->
				<div class="flex flex-column flex-auto tc lh-title pa0 mt6 mb0">
					<h2 class="fs-8vmin ts1-dark-gray ma0 pa0">Customer Experience Tech<span class="dn dib-l ">nology</span></h2>
					<h3 class="db ma0 pa0">
						<span class="tc i georgia f5 f3-l fw3 o-80 fs-7vmax lh-6vh ts1-dark-gray">Where were you during the <u>revolution</u>?</span>
					</h3>
				</div>
			</div>
		</div>
	</section>
	<div class="ma0 top-0 absolute pt0" style="position: sticky">
		<slot />
	</div>
</header>


<style>
	*, *::before, *::after{ -moz-box-sizing: border-box; box-sizing: border-box }

html, body{
  margin: 0px;
  padding: 0px;
}

video { object-fit: cover }

.banner {
  background-color: black;
  background-image: url('https://inspiredlabs.co.uk/images/00-banner.webp');
  background-repeat: no-repeat;
  background-position: center center;
}

.measure-custom-l { max-width: 40rem }

.f-headline {
	font-size: 7.594rem; /* ~120px Perfect Fifth: https://type-scale.com /&font=Noto%20Sans */
}

@media screen and (min-width: 30em) {
  .f-headline-ns {
    font-size: 7.594rem;
  }
}

@media screen and (min-width: 30em) and (max-width: 60em) {
  .f-headline-m {
    font-size: 7.594rem;
  }
}

@media screen and (min-width: 60em) {
  .f-headline-l {
    font-size: 7.594rem;
  }
}

@media (max-height: 12em) {

	.highlight { color:silver }
	/* .fs-30 { font-size: 30%; } */

	.scaling {
		font-size: 33%; /* Research your naming convention for scaling f-XXX-33. */
		/* font-size: 5vmin; */
		/* maximum font-size: 100% if screen vh less than reduce font-size */
		/* font-size:  calc(inherit + 11%) from: https://fvsch.com/css-locks//demo3 */
		/* 35vmin */
	}

}

@media (min-height: 12em) and (max-height: 24em) {

	.highlight { color:lime }

	/* .fs-50 { font-size: 50%; } */

	.scaling {
		/* font-size: calc(24px + 1.5vw); */
		/* font-size: 10vh;  unset, initial, inherit */
		/* font-size: 0.1; */ /* Some tweener fallback that doesn't look awful */
		font-size: 44%;
	}

}


@media (min-height: 24em) and (max-height: 48em) {
	.highlight { color:magenta }

	/* .fs-80 { font-size: 80%; } */

	.scaling {
		/* font-size:calc(100% -1.5vw); */
		font-size: 77%;
	}

}

@media (min-height: 48em) and (max-height: 96em) {
	.highlight { color:cyan }
	/* .fs-100 { font-size: 100%; } */

	.scaling {
		font-size: 100%;
		/* font-size:calc(100% -10vh); */
		/* font-size: 5.4vw; */
		/* font-size: max(4vw, 2em, 2rem); *//* min = 2rems, or twice default -from: https://developer.mozilla.org/en-US/docs/Web/CSS/max */
	}

}

/* Syntax specificity problem, how to target vertical breakpoints. */
/* https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity */

.min-h2 { min-height: 2rem; }

/* https://mathiasbynens.be/demo/crazy-class */
.\25vh { color:red}

.min-vh-2 {
	min-height: 2vh;
}

.min-vh-5 {
	min-height: 5vh;
}

.min-vh-10 {
	min-height: 10vh;
}

.min-vh-25 {
	min-height: 25vh;
}

.min-vh-50 {
	min-height: 50vh;
}

.min-vh-75 {
	min-height: 75vh;
}

/* Break these out: https://tachyons-tldr.now.sh/#/tools */
.min-h1 { min-height: 1rem; }
.min-h2 { min-height: 2rem; }
.min-h3 { min-height: 4rem; }
.min-h4 { min-height: 8rem; }
.min-h5 { min-height: 16rem; }

.lh-0		 { line-height:0 }
.lh-2vh  { line-height:2vh; }
.lh-4vh  { line-height:4vh; }
.lh-6vh  { line-height:6vh; }
.lh-8vh  { line-height:8vh; }
.lh-10vh { line-height:10vh; }
.lh-12vh { line-height:12vh; }
.lh-14vh { line-height:14vh; }
.lh-16vh { line-height:16vh; }
.lh-18vh { line-height:18vh; }
.lh-20vh { line-height:20vh; }

.fs-3vmax { font-size: 3vmax; }
.fs-5vmax { font-size: 5vmax; }
.fs-8vmax { font-size: 8vmax; }
.fs-10vmax { font-size: 10vmax; }
.fs-12vmax { font-size: 12vmax; }
.fs-14vmax { font-size: 14vmax; }

.fs-3vmin { font-size: 3vmin; }
.fs-5vmin { font-size: 5vmin; }
.fs-8vmin { font-size: 8vmin; }
.fs-10vmin { font-size: 10vmin; }
.fs-12vmin { font-size: 12vmin; }
.fs-14vmin { font-size: 14vmin; }

/* Align flexbox: https://codepen.io/pxforti/pen/GypQzG*/
/* scale font using "vh" "without media query" */
.scale { font-size: calc(1rem + 1vmin); }
</style>