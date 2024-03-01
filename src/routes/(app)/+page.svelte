<script>
//import Banner from '$lib/Banner.svelte'
import { yStore, yCorrect, searchStore, activeIndexStore } from '$lib/stores.js'
import ListItem from '$lib/ListItem.svelte';
import { projects } from "$routes/(app)//projects"
import Contact from '$lib/Contact.svelte';


import { modalOpen } from '$lib/stores';
import Modal from '$lib/Modal.svelte';

export const myVar = '';

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



//import { page } from '$app/stores';
// import Preloader from '$lib/Preloader.svelte';
</script>

<!-- import { page } from '$app/stores';
<code class="w-100 bg-gold">usage: {@html JSON.stringify ( $page.data, 2, null )}</code> -->
<!-- <section class="pa4 mb5 flex flex-column items-start w-100 ba br4 ba b--light-pink bg-washed-red shadow-5">
	<h1>{$page.status}</h1>
	<p>{$page.error?.message}</p>
</section> -->

<!-- <Preloader /> -->

<Modal { isOpen } { closeModal } />

<!-- fix: `style` attr is req. for z-fighting issue -->
<ul
	class="relative list ma0 pl0 w-100 " 
	style="display: { $modalOpen ? 'none' : 'initial' }"
>
	{#each projects as row, project }
	<!-- usage: <ListItem /> passes JSON array properties using the spread operator as component props. The `revealed` prop is a boolean value that depends on `$searchStore`, if its falsy, or if any value in the JSON array includes the value of `$searchStore`, then `revealed` is true. -->	
	<ListItem {project} {...row} revealed={!$searchStore || Object.values(row).some(value => String(value).toLowerCase().includes($searchStore.toLowerCase()))} />
	{/each}

	<!-- note: <code class="bg-green">usage: {[at]html JSON.stringify ( tags, 2, null )}</code> -->
	<Contact />
</ul>

<svelte:head>

<!-- <title>Inspired Labs is Scott Phillips' portfolio. He is a Interaction Designer with an entreprenurial background helping business leverage technology</title> -->
<!-- <meta name="description" content="Scott Phillips creates win-win conditions with a focus on customer experience."> -->
<!-- <title data-chars="72" >Inspired Labs, a subscription service improving your customer experience</title>
<meta data-chars="148" name="description" content="Design can save you time & money, while meeting customer goals. Scott Phillips improves businessed with Design & Technology on a subscription basis."> -->

<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		"name": "Inspired Labs",
		"image": "https://inspiredlabs.co.uk/images/scott-phillips.webp",
		"@id": "https://inspiredlabs.co.uk/",
		"url": "https://inspiredlabs.co.uk/",
		"telephone": "+393515820898",
		"priceRange": "£3000 - £128000",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "Littlegate Street",
			"addressLocality": "Oxford",
			"addressRegion": "Oxfordshire",
			"postalCode": "OX11RL",
			"addressCountry": "GB"
		},
		"geo": {
			"@type": "GeoCoordinates",
			"latitude": "51.748917",
			"longitude": "-1.259864,21z"
		},
		"hasMap": "https://www.google.com/maps/@51.748917,-1.259864,21z",
		"openingHours": "Mo, Tu, We, Th, Fr, Sa 08:00-18:00 Su 10:00-16:00",
		"description": "Scott Phillips. Designer &amp; Developer. Customer Experience Consultant.\t\nScott is a particularly talented designer, Tanguy Fautré.",
		"review": {
			"@type": "Review",
			"reviewBody": "Scott helped us reinvent and improve the interface of our entire website; he has also revolutionized the whole way of communicating with our clients. He is one of the most effective among all people I've ever worked with! He his fast, precise, motivated and very competent. I've found his enthusiasm and dedication both inspiring and motivating. He understands complex issues even when outside of his direct area of expertise and is able to present creative solutions to complex problems and communicate the benefits to everyone. He was always able to successfully complete any tasks with favorable results despite deadline pressure. Definitely worth recommending.",
			"author": {
				"@type": "Organization",
				"name": "National Geographic Expeditions",
				"sameAs": "https://it.linkedin.com/in/stefano-murrau-8882b614b"
			}
		},
		"review": {
			"@type": "Review",
			"reviewBody": "Working with Scott was one of the most enriching and easiest experiences of my life. I thought having such a beautiful, professional website was out of our reach… but honestly, the best thing was finding Scott to help me achieve the goal of taking our company to another level",
			"author": {
				"@type": "Person",
				"name": "Lina Bustamante",
				"sameAs": "https://www.trustpilot.com/review/inspiredlabs.co.uk"
			}
		},
		"review": {
			"@type": "Review",
			"reviewBody": "Scott fully understands design, how things flow & the way the message is conveyed to the user",
			"author": {
				"@type": "Person",
				"name": "Chris Sinclair, Director, 3Si",
				"sameAs": "https://uk.linkedin.com/in/chrissinclaireuuk"
			}
		},
		"review": {
			"@type": "Review",
			"reviewBody": "Scott is is easy to work with, taking the brief for my concept and turned it into an impressive, workable solution. I really can't ask for more!",
			"author": {
				"@type": "Person",
				"name": "David Lomas, Content Marketer, UK",
				"sameAs": "https://www.trustpilot.com/review/inspiredlabs.co.uk"
			}
		},
		"review": {
			"@type": "Review",
			"reviewBody": "Scott was hired to produce a series of custom webapps as a designer, programmer and writer. With his vision and analytical ability he contributed enormously and intelligently to our Renewable Energy Park.",
			"author": {
				"@type": "Person",
				"name": "Alessandro Ronca",
				"sameAs": "https://alessandroronca.netlify.app/"
			}
		},
		"review": {
			"@type": "Review",
			"reviewBody": "Scott has an outstanding work ethic",
			"author": {
				"@type": "Person",
				"name": "Nina Brown",
				"sameAs": "https://uk.linkedin.com/in/nina-brown123"
			}
		},
		"review": {
			"@type": "Review",
			"reviewBody": "Scott has an outstanding work ethic",
			"author": {
				"@type": "Person",
				"name": "Nina Brown",
				"sameAs": "https://uk.linkedin.com/in/nina-brown123"
			}
		},
		"review": {
			"@type": "Review",
			"reviewBody": "Scott is a particularly talented designer",
			"author": {
				"@type": "Person",
				"name": "Tanguy Fautré. Programmer, Aris Technologies, Oxford UK",
				"sameAs": "https://uk.linkedin.com/in/tanguyfautre/"
			}
		},
		"review": {
			"@type": "Review",
			"reviewBody": "…a cut above the rest",
			"author": {
				"@type": "Organization",
				"name": "nPower Booleans",
				"sameAs": "https://www.npowersoftware.com/"
			}
		},
		"review": {
			"@type": "Review",
			"reviewBody": "I trust Scott's judgement to perform complex revisions over shoots for important clients",
			"author": {
				"@type": "Person",
				"name": "Seb Smith",
				"sameAs": "http://www.sebsmith.com/"
			}
		},
		"review": {
			"@type": "Review",
			"reviewBody": "Scott displayed energy, resource­fulness & an eye for the commercial factor",
			"author": {
				"@type": "Person",
				"name": "Andrew Buchanan",
				"sameAs": "https://www.facebook.com/vaultarch/"
			}
		},
		"review": {
			"@type": "Review",
			"reviewBody": "Scott improved our family company: I used to think apps were out of reach for small businesses like ours… especially tailored to our customers.",
		"reviewRating": {
				"@type": "Rating",
				"ratingValue": "5",
				"bestRating": "5"
			},
			"author": {
				"@type": "Person",
				"name": "Mel Miliotis",
				"sameAs": "https://uk.linkedin.com/in/mel-miliotis-80a64813a"
			}
		},
		"sameAs": [
			"https://twitter.com/inspiredlabs",
			"https://instagram.com/inspiredlabs",
			"https://linkedin.com/in/inspiredlabs",
			"https://github.com/inspiredlabs",
			"https://codepen.io/inspiredlabs",
			"https://vimeo.com/inspiredlabs",
			"https://stackoverflow.com/users/3429622/urbanaut",
			"https://about.me/alanscottphillips",
			"https://en.gravatar.com/urbanaut",
			"https://bento.me/inspiredlabs"
		]
	}
</script>

<!-- Facebook BANNER -->
<meta property="og:url" content="https://inspiredlabs.co.uk/#contact">
<meta property="og:type" content="website">
<meta property="og:title" content="Inspired Labs, is a Design & Development agency transforming Customer Experience">
<meta property="og:description" content="Design can save you time & money, while meeting customer goals. Scott Phillips can help you improve your business on a subscription basis.">
<meta property="og:image" content="https://inspiredlabs.co.uk/images/inspiredlabs-banner.webp">

<!-- Twitter BANNER -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="inspiredlabs.co.uk">
<meta property="twitter:url" content="https://inspiredlabs.co.uk/#contact">
<meta name="twitter:title" content="Inspired Labs, is a Design & Development agency transforming Customer Experience">
<meta name="twitter:description" content="Design can save you time & money, while meeting customer goals. Scott Phillips can help you improve your business on a subscription basis.">
<meta name="twitter:image" content="https://inspiredlabs.co.uk/images/inspiredlabs-banner.webp">

</svelte:head>