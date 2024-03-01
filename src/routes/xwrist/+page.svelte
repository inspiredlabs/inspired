<script>
let checkedA = false;
let checkedB = false;

let checkedC = false;
let checkedD = false;

import pa1 from './T244212-pa.jpeg';
import pa2 from './11092023-pa.jpeg';

import lateral1 from './T244212-laterale.jpeg';
import lateral2 from './11092023-lateral.jpeg';

import pa3 from './T244212-pa.webp';
import pa4 from './11092023-pa.webp';

import lateral3 from './T244212-laterale.webp';
import lateral4 from './11092023-lateral.webp';

import print from './print.jpg';

import '../../app.css'
</script>

<div class="pa0 ma0">
  <header class="bg-sky tc">
    <h1 class="ma0 pv4 dark-slategray">Is surgery + a plate necessary? <b>No.</b><br>
    </h1>
  </header>
  <main class="ml-auto mr-auto measure-wide pv4 lh-title gray">
    <h2 id="scott-phillips">Scott Phillips</h2>

		<ul>
      <li>Age: 43</li>
      <li>DOB: 09/02/1980</li>
      <li>Medical Allergies: latex (visible scarring following dental intervention).</li>
      <li>Other Allergies: sugar, dairy, some wheat</li>
			<li>Build: Athletic</li>
      <li>History: in 2009 Scott recovered from a broken back with no medical intervention – other than hydrothreapy and medication to treat pain/swelling. There were three fractured bones: T1, L1, L2. Scott managed the recovery using vigorous excersise (running), under supervision of his GP, Beaumont Sergery, Oxford. No other breaks.</li>

		</ul>

<hr style="height:0.125rem" class="bn bg-sky " />

<article>
  <h2 id="scott-phillips">Incident</h2>
  <ul>
    <li>Collision: downhill mountain bike </li>
    <li>Date: 24/08/2023</li>
    <li>Details: slowing bike into a tight left curve, fell and hit the ground, injuring right-wrist.</li>
    
    <li>Proceedure: 25/08/2023</li>
    <li>Proceedure detail: plaster cast. First, the bone was pulled back into place to realign and the thumb was set into weighted traction temporarily to compensate impact. At this point, the Dr. declared it was too early to recommend surgery or not.</li>
    <li>Medication: 200mg Ibuprofene, every 8h, only.</li>
    <li>Analgesic: 1000mg Paracetamol every 8h, only.</li>

  </ul>
  <h2 id="terni">Terni Hospital, Assesment <small class="o-40">(recent first)</small></h2>
	<pre>Assesment: 11/09/2023</pre>
  <p>Today <i>Luca Braghiroli, Director, Hand Surgery & Micro Surgery</i> reviewed the X-ray.</p>
	<p>These new X-ray images show progress of two+ weeks in the cast. There is satisfactory prognosis for a complete recovery, even though the distal radius has been broken in three places.</p>
	<p>
		Minimal displacement, ie: it has not "floated away", and is sufficiently positioned to heal without surgery.
	</p>
	<p>	
		The cast is scheduled to be removed: 10:30, 28th Sept. with physiotherapy to follow. </p>
  <pre>Assesment: 31/08/2023</pre>
  <p>RX right wrist:(remaining "arm" not included in today's radiogram). Plaster check of distal metaepiphyseal plurifragmentary fracture of the radius and detachment of the ulnar styloid, modest diasalignment of radial bone fragments persists. Refer to videat orthopedic.</p>
</article>

</main>
<aside class="flex flex-row overflow-hidden">
	<label class="flex flex-column w-50">
		<pre class="f8 f6-m f5-l"><b>{ checkedD ? '11/09' : '31/08' }</b>: { checkedD ? '11092023-lateral.webp' : 'T244212-laterale.webp' }</pre>
		<img class="w-100 no-clutter" src={ checkedD ? lateral4 : lateral3 } alt="X-ray" />
		<input style="visibility: hidden" class="sr-only" type="checkbox" bind:checked={checkedD} />
	</label>
	<label class="flex flex-column w-50">
		<pre class="f8 f6-m f5-l"><b>{ checkedC ? '11/09' : '31/08' }</b>: { checkedC ? '11092023-pa.webp' : 'T244212-pa.webp' }</pre>
		<img class="w-100 no-clutter" src={ checkedC ? pa4 : pa3 } alt="X-ray" />
		<input style="visibility: hidden" class="sr-only" type="checkbox" bind:checked={checkedC} />
	</label>
</aside>

<aside class="flex flex-row overflow-hidden">
	<label class="flex flex-column w-50">
		<pre class="f8 f6-m f5-l"><b>11/09</b>: { checkedB ? '11092023-lateral.jpeg' : '11092023-pa.jpeg' }</pre>
		<img class="w-100 no-clutter" src={ checkedB ? lateral2 : pa2 } alt="X-ray" />
		<input style="visibility: hidden" class="sr-only" type="checkbox" bind:checked={checkedB} />
	</label>
	<label class="flex flex-column w-50">
		<pre class="f8 f6-m f5-l"><b>31/08</b>: { checkedA ? 'T244212-pa.jpeg' : 'T244212-laterale.jpeg' }</pre>
		<img class="w-100 no-clutter" src={ checkedA ? pa1 : lateral1 } alt="X-ray" />
		<input style="visibility: hidden" class="sr-only" type="checkbox" bind:checked={checkedA} />
	</label>
</aside>

</div>

<div class="w-100 mr-auto ml-auto bg-gold">
  <img class="w-50" src={ print } alt="X-ray" />
</div>

<style>
/* TasteOfThe.Me color-scheme */
.bg-sky { background-color: #eff6fa }
.dark-slategray { color: #425c6b }
/* img { width: 100% } */

/* from: css-tricks.com/inclusively-hidden/ */
.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}
</style>