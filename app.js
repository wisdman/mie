import {html, render} from './node_modules/lit-html/lit-html.js';
import {unsafeHTML} from './node_modules/lit-html/directives/unsafe-html.js';
import Glide, { Autoplay } from './node_modules/@glidejs/glide/dist/glide.modular.esm.js'


// Define a template
const detailTemplate = (content) => html`
		<div class="container detail-container">
			<h1>${content.title}</h1>
			<div class="row">
				<div class="detail-image column"><img width="640px" src="${content.image}" /></div>
				<div class="detail-text column">
					${unsafeHTML(content.text)}
				</div>
			</div>
		</div>
	`;
const videoTemplate = (src) => html`<video autoplay="true" muted="muted" loop="true" class="fit-fill" src="${src}"></video>`;

const carouselTemplate = (slides) => html`
	<div class="slider-container">
		<div class="glide">
		  <div data-glide-el="track" class="glide__track">
		    <ul class="glide__slides">
		      ${slides.map((i) => html`<li class="glide__slide"><img src="${i}" /><div class="mie_bg" style="background-image:url('${i}')"></div></li>`)}
		    </ul>
		  </div>
		</div>
	</div>
	`;
 
async function getData(url) {
	let response = await fetch(url);
	if (response.ok) { // если HTTP-статус в диапазоне 200-299
	  // получаем тело ответа (см. про этот метод ниже)
	  let json = await response.json();
	  return json;
	} else {
	  console.log("Ошибка HTTP: " + response.status);
	}
}

let params = new URLSearchParams(window.location.search);
console.log(params.get("detail"));
const detailId = params.get("detail");
if(detailId && typeof detailId !== 'undefined') {
	let res  = getData('buildings.json');
	res.then((content) => {
		const descr = content[detailId-1];
		if(typeof descr !== 'undefined') {
			render(detailTemplate(descr), document.body);
		}
	});
}
const video = params.get("video");
if(video && typeof video !== 'undefined') {
	render(videoTemplate(video), document.body);
}
const carousel = params.get("carousel");
if(carousel && typeof carousel !== 'undefined') {
	const images = getData('photos.json');
	images.then((val) => {
		console.log(val);
		render(carouselTemplate(val), document.body);
		new Glide('.glide', {
			type: 'carousel',
			autoplay: 4000,
			hoverpause: false
		}).mount({ Autoplay });
	});

}

