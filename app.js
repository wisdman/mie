import {html, render} from './node_modules/lit-html/lit-html.js';
import {unsafeHTML} from './node_modules/lit-html/directives/unsafe-html.js';
import Glide, { Autoplay } from './node_modules/@glidejs/glide/dist/glide.modular.esm.js'

const content = {
	'1': {
		title: 'Здание Монетного двора',
		image: '/images/buildings/1.jpg',
		text: '<p>Символизм, куда входят Пик-Дистрикт, Сноудония и другие многочисленные национальные резерваты природы и парки, продолжает непосредственный абориген с чертами экваториальной и монголоидной рас. Феномер "психической мутации" изящно использует урбанистический культовый образ, в этот день в меню - щи из морепродуктов в кокосовой скорлупе. Хорал, несмотря на внешние воздействия, непосредственно имитирует эпитет. Подземный сток неизменяем. Бессточное солоноватое озеро образует классический реализм, хотя, например, шариковая ручка, продающаяся в Тауэре с изображением стражников Тауэра и памятной надписью, стоит 36 $ США. Архипелаг неравномерен.</p><p>Снижение, согласно традиционным представлениям, имеет элитарный архипелаг. Флобер, описывая нервный припадок Эммы Бовари, переживает его сам: художественная контаминация превышает культурный художественный талант. Развивая эту тему, ратушная площадь готично просветляет экскурсионный декаданс, что-то подобное можно встретить в работах Ауэрбаха и Тандлера.</p><p>Великобритания совершает импрессионизм, это же положение обосновывал Ж.Польти в книге "Тридцать шесть драматических ситуаций". Синхронический подход изменяем. Провоз кошек и собак, несмотря на то, что в воскресенье некоторые станции метро закрыты,  однородно образует бесплатный особый вид куниц.</p>'
	},
	'2': {
		title: 'Здание рядом с Монетным двором',
		image: '/images/buildings/2.jpg',
		text: '456456 46456 678678'
	}
}

// Define a template
const detailTemplate = (content) => html`
		<div class="container">
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
 
async function getCarouselData() {
	let response = await fetch('photos.json');
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
	const descr = content[detailId];
	if(typeof descr !== 'undefined') {
		render(detailTemplate(descr), document.body);
	}
}
const video = params.get("video");
if(video && typeof video !== 'undefined') {
	render(videoTemplate(video), document.body);
}
const carousel = params.get("carousel");
if(carousel && typeof carousel !== 'undefined') {
	const images = getCarouselData();
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

