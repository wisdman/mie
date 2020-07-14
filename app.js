import {html, render} from './node_modules/lit-html/lit-html.js';
import {unsafeHTML} from './node_modules/lit-html/directives/unsafe-html.js';
import Glide, { Autoplay } from './node_modules/@glidejs/glide/dist/glide.modular.esm.js'

//document.querySelector("html").style.zoom = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);

// Define a template
const detailTemplate = (content) => html`
		<div class="container detail-container">
			<h1>${content.title}</h1>
			<div class="row">
				<div class="detail-image column"><img src="${content.image}" class="animated zoomIn" /></div>
				<div class="detail-text column">
					${unsafeHTML(content.text)}
				</div>
			</div>
		</div>
	`;
	// <video src="/video/Plotinka_Oct_04.webm" type="video/mp4" autoplay muted loop style="margin-left: -50px;"></video>
	// <img style="margin-left: -50px;" src="${content.image}" class="animated zoomIn" />

const detailTemplates = [
// 1
(content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 16;">${content.title}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 10; align-self: end;" class="subtitle">${content.subtitle}</h3>
			<div class="detail-video-container" style="grid-area: 6 / 1 / span 20 / span 20;">
				
				<video src="${content.image}" type="video/mp4" autoplay muted loop style="margin-left: -300px;"></video>
			</div>
			<div class="row detail-text" style="grid-area: 7 / 13 / span 10 / span 5;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`,
// 2
(content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 10;">${content.title}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 10; align-self: end;" class="subtitle">${content.subtitle}</h3>
			<div class="detail-video-container" style="grid-area: 7 / 1 / span 20 / span 20;">
				
				<video src="${content.image}" type="video/mp4" autoplay muted loop style="margin-left: -300px;"></video>
			</div>
			<div class="row detail-text" style="grid-area: 9 / 13 / span 10 / span 5;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`,
// 3
(content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 10;">${content.title}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 10; align-self: end;" class="subtitle">${content.subtitle}</h3>
			<div class="detail-video-container" style="grid-area: 8 / 1 / span 20 / span 15;">
				
				<video src="${content.image}" type="video/mp4" autoplay muted loop style="margin-left: -200px;"></video>
			</div>
			<div class="row detail-text" style="grid-area: 8 / 13 / span 10 / span 5;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`,
// 4
(content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 8;">${content.title}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 8; align-self: end;" class="subtitle">${content.subtitle}</h3>
			<div class="detail-video-container" style="grid-area: 9 / 1 / span 10 / span 13;">
				
				<video src="${content.image}" type="video/mp4" autoplay muted loop style="margin-left: -70px;"></video>
			</div>
			<div class="lead text_large" style="grid-area: 16 / 4 / span 2 / span 8;">${unsafeHTML(content.lead)}</div>
			<div class="row detail-text" style="grid-area: 4 / 12 / span 10 / span 6;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`,
// 5
(content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 10;">${content.title}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 10; align-self: end;" class="subtitle">${content.subtitle}</h3>
			<div class="detail-video-container" style="grid-area: 7 / 1 / span 20 / span 20;">
				
				<video src="${content.image}" type="video/mp4" autoplay muted loop style="margin-left: -300px;"></video>
			</div>
			<div class="row detail-text" style="grid-area: 8 / 13 / span 10 / span 5;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`,
// 6
(content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 8;">${content.title}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 10; align-self: end; transform: translateY(140px);" class="subtitle">${content.subtitle}</h3>
			<div class="detail-video-container" style="grid-area: 7 / 1 / span 20 / span 15;">
				
				<video src="${content.image}" type="video/mp4" autoplay muted loop style="margin-left: -200px;"></video>
			</div>
			<div class="lead text_large" style="grid-area: 16 / 4 / span 2 / span 8;">${unsafeHTML(content.lead)}</div>
			<div class="row detail-text" style="grid-area: 4 / 12 / span 10 / span 6;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`,
// 7
(content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 8;">${content.title}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 10; align-self: end; transform: translateY(140px);" class="subtitle">${content.subtitle}</h3>
			<div class="detail-video-container" style="grid-area: 8 / 1 / span 20 / span 15;">
				
				<video src="${content.image}" type="video/mp4" autoplay muted loop style="margin-left: -200px;"></video>
			</div>
			<div class="lead text_large" style="grid-area: 16 / 4 / span 2 / span 8;">${unsafeHTML(content.lead)}</div>
			<div class="row detail-text" style="grid-area: 4 / 12 / span 10 / span 6;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`,
// 8
(content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 8;">${unsafeHTML(content.title)}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 10; align-self: end; transform: translateY(140px);" class="subtitle">${content.subtitle}</h3>
			<div class="detail-video-container" style="grid-area: 8 / 1 / span 20 / span 15;">
				
				<video src="${content.image}" type="video/mp4" autoplay muted loop style="margin-left: -200px;"></video>
			</div>
			<div class="lead text_large" style="grid-area: 16 / 4 / span 2 / span 8;">${unsafeHTML(content.lead)}</div>
			<div class="row detail-text" style="grid-area: 4 / 13 / span 10 / span 5;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`,
// 9
(content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 6;">${content.title}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 10; align-self: end;" class="subtitle">${content.subtitle}</h3>
			<div class="detail-video-container" style="grid-area: 7 / 1 / span 20 / span 16;">
				
				<video src="${content.image}" type="video/mp4" autoplay muted loop style="margin-left: -200px;"></video>
			</div>
			<div class="lead text_large" style="grid-area: 16 / 4 / span 2 / span 8;">${unsafeHTML(content.lead)}</div>
			<div class="row detail-text" style="grid-area: 4 / 13 / span 10 / span 5;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`,
// 10
(content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 15;">${content.title}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 8; align-self: end;" class="subtitle">${unsafeHTML(content.subtitle)}</h3>
			<div class="detail-video-container" style="grid-area: 8 / 1 / span 20 / span 17;">
				
				<video src="${content.image}" type="video/mp4" autoplay muted loop style="margin-left: -250px;"></video>
			</div>
			<div class="row detail-text" style="grid-area: 6 / 13 / span 10 / span 5;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`,
// 11
(content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 10;">${content.title}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 10; align-self: end;" class="subtitle">${content.subtitle}</h3>
			<div class="detail-video-container" style="grid-area: 6 / 1 / span 20 / span 20;">
				
				<video src="${content.image}" type="video/mp4" autoplay muted loop style="margin-left: -400px;"></video>
			</div>
			<div class="row detail-text" style="grid-area: 8 / 13 / span 10 / span 5;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`,				
]	
	const detailTemplate2 = (content) => html`
		<div class="container detail-container golden-grid">
			<h2 style="grid-area: 4 / 4 / span 2 / span 10;">${content.title}</h2>
			<h3 style="grid-area: 5 / 4 / span 1 / span 10; align-self: end;" class="subtitle">${content.subtitle}</h3>
			<div class="detail-video-container" style="grid-area: 6 / 1 / span 20 / span 20;">
				
				<video src="/video/Plotinka_Oct_04.webm" type="video/mp4" autoplay muted loop style="margin-left: -300px;"></video>
			</div>
			<div class="row detail-text" style="grid-area: 9 / 13 / span 10 / span 5;">
				${unsafeHTML(content.text)}
			</div>
		</div>
	`;
const videoTemplate = (src) => html`<video autoplay="true" muted="muted" loop="true" class="fit-fill" src="${src}"></video>`;

const carouselTemplate = (slides) => html`
	<div class="slider-container">
		<div class="glide">
		  <div data-glide-el="track" class="glide__track">
		    <ul class="glide__slides">
		      ${slides.map((i) => html`<li class="glide__slide"><img src="${i}" /></li>`)}
		    </ul>
		  </div>
		</div>
	</div>
	`;

const indexList = (items) => html`
	    <ol>
	      ${items.map((item, index) => html`<li><a href="/detail.html?detail=${index + 1}">${unsafeHTML(item.title)}</li>`)}
	    </ol>
	`;	


async function getIndex() {
	let res  = getData('buildings.json');
	res.then((content) => {
		if(typeof content !== 'undefined') {
			render(indexList(content), document.body);
		}
	});
}

//getIndex();
 
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
			render(detailTemplates[detailId-1](descr), document.body);
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
			autoplay: 5000,
			hoverpause: false,
			animationDuration: 2000
		}).mount({ Autoplay });
	});

}
