<template>
  <div id="app">
    <city-map :year="year" :epoch="epoch" :yearMaps="mapsArray" @change="onChange"></city-map>
    <pointers :pointers="locations" :transform="transform"></pointers>
    <!-- <div class="epochSlderContainer"><el-slider v-model="epoch" :min="0" :max="10" :step="1" :show-tooltip="false"></el-slider></div> -->
    <!-- <div class="yearsSlderContainer"><el-slider
      v-model="year"
      show-stops
      :marks="yearMarks"
      :max="3"
      :show-tooltip="false">
    </el-slider></div> -->

    <timeline v-model="year" :marks="yearMarks"></timeline>
     <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import CityMap from './components/CityMap.vue'
import Pointers from './components/Pointers.vue'
import Timeline from './components/Timeline.vue'

export default {
  name: 'App',
  components: {
    CityMap,
    Pointers,
    Timeline
  },
  data: () => { return {
    epoch: 5,
    year: 0,
    yearMarks: [
      1780,
      1900,
      1910,
      1947,
      // 50: {
      //   style: {
      //     color: '#1989FA'
      //   },
      //   label: this.$createElement('strong', '50%')
      // }
    ],
    points: {},
    mapsArray: [
      {
        year: "1780",
        image: "1780.jpg",
        transform: "left:-403.528px;top: -443.317px;transform:rotate(85deg) scale(0.18); "
      },
      {
        year: "1900",
        image: "1900.jpg",
        transform: "transform: rotate(-5deg) scale(0.45); left:191.883px;top: -392.277px;"
      },
      {
        year: "1910",
        image: "1910.jpg",
        transform: "transform: rotate(85deg) scale(0.86);"
      },
      {
        year: "1947",
        image: "1947.jpg",
        transform: "transform: rotate(6deg) scale(0.65); left: -1078px; top: -1728px;"
      }
    ],
    // [x,y,zoom]
    transform: [0,0,1],
    locations: [
        {
            "name": "Здание 1",
            "image": "static/photos/photo1.jpg",
            "description": '<p>Правило альтернанса вызывает мифологический  эпитет, об этом свидетельствуют краткость и завершенность формы, бессюжетность, своеобразие тематического развертывания. Размер традиционен. Иными словами, женское окончание редуцирует глубокий ритмический рисунок. Возможно денотативное тождество языковых единиц при их сигнификативном различии, например, категория текста прочно выбирает размер, что нельзя сказать о нередко манерных эпитетах. Заимствование, основываясь на парадоксальном совмещении исключающих друг друга принципов характерности и поэтичности, кумулятивно. Орнаментальный сказ, согласно традиционным представлениям, существенно отталкивает скрытый смысл.</p><p>Абстрактное высказывание фонетически иллюстрирует диссонансный коммунальный модернизм. Женское окончание отталкивает дольник. Олицетворение лабильно.</p><p>Рифма, не учитывая количества слогов, стоящих между ударениями, представляет собой культурный стиль. Подтекст изменяем. Женское окончание абсурдно отталкивает амфибрахий, первым образцом которого принято считать книгу А.Бертрана "Гаспар из тьмы". Генеративная поэтика наблюдаема. Чтение - процесс активный, напряженный, однако  басня редуцирует речевой акт. Модальность высказывания просветляет деструктивный одиннадцатисложник.</p>',
            "coord": [200, 200],
            "delta": [0,0],
            "scale": 1,
            "year": 1920
        },
        {
            "name": "Здание 2",
            "image": "static/photos/photo2.jpg",
            "description": "some description",
            "coord": [300, 300],
            "delta": [0,0],
            "scale": 1,
            "year": 1950
        },
        {
            "name": "Здание 3",
            "image": "static/photos/photo3.jpg",
            "description": "some description",
            "coord": [100, 300],
            "delta": [0,0],
            "scale": 1,
            "year": 1850
        }
    ],
    centerDialogVisible: false
  }},
  methods: {
    onChange: function(val) {
      this.transform = val
    }
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  font-family: lato;
  touch-action: none;

  user-select: none;
}
* {
  user-select: inherit;
}
  .epochSlderContainer {
    position: fixed;
    top: 50px;
    right: 50px;
    width: 400px;
  }

  .yearsSlderContainer {
    position: fixed;
    bottom: 50px;
    right: 100px;
    left: 100px;

    padding-left: 80px;
    padding-right: 80px;
    border-radius: 3px;

      background-image: -moz-linear-gradient( 90deg, #504d48 0%, #b4ada3 100%) !important;
  background-image: -webkit-linear-gradient( 90deg, #504d48 0%, #b4ada3 100%) !important;
  }

.el-slider__runway {
  height: 44px !important;
  margin: 0 !important;
  background-color: transparent !important;
}

.el-slider__bar {
  background-color: transparent !important;
}

.el-slider__marks-text {
  color: #fff !important;
  font-size: 36px !important;
  margin-top: 0 !important;
  z-index: 2010;
  line-height: 36px !important;
}

.el-slider__button-wrapper {
  width: 110px !important;
  height: 69px !important;
  z-index: 2100 !important;

  position: absolute;
    box-sizing: border-box;
    width: 120px;
    height: 70px;
    top: -10px;
    left: 0;
    background: rgb(36 41 46 / 0.3);
    backdrop-filter: blur(1px) sepia(30%);
    border: 5px solid rgb(22 21 20 / 1);
    border-radius: 3px;
    transform-origin: 0 0;
    --left: 0px;
    transform: translateX(var(--left));
}

.el-slider__button {
  opacity: 0;
}
.el-slider__stop {
  opacity: 0 !important;
}


/**********************************/
/*********** Typography ***********/
/**********************************/

html {font-size: 26px !important;} /*26px*/

body {
  background-color: white;
  font-family: 'Lato', sans-serif !important;
  /*font-weight: 400;*/
  line-height: 1.5;
  color: #333;
  text-rendering: geometricPrecision;
  /*-webkit-font-smoothing: subpixel-antialiased;*/
  /*-webkit-text-stroke: 0.45px rgba(0, 0, 0, 0.1);*/
  -moz-text-stroke: 0.45px rgba(0, 0, 0, 0.1);
  font-weight: bold;

  /*text-shadow: 0px 0px 3px rgba(0,0,0,0.5);*/
}

p {margin-bottom: 1.15rem; margin-top: 0;}

h1, h2, h3, h4, h5 {
  /*margin: 2.75rem 0 1.05rem;*/
  margin: 0;
  padding: 0;
  font-family: 'latomedium', sans-serif;
  font-weight: 400;
  line-height: 1.15;
}

/*h1 {
  margin-top: 0;
  font-size: 11.089em;
}

h2 {font-size: 6.854em;}*/

h1 {font-size: 4.236em; font-family: 'latoblack'; line-height: 1; letter-spacing: 0.02em; }

h2 {font-size: 2.618em; font-family: 'latoblack'; line-height: 1; letter-spacing: 0.02em; }

h3,
.text_large {font-size: 42px;}

small, .text_small {font-size: 0.618em;}

.subtitle {
  font-family: 'latolight';
}

strong,
.strong {
  font-family: 'Lato Bold', sans-serif;
  font-weight: normal;
}

.el-dialog {
  background-color: #b4ada3 !important;
  color: #fff !important;
  padding: 60px 100px;
}
.el-dialog__body {
  font-size: 26px !important;
  color: #fff !important;
}
.el-dialog__title {
  font-size: 4.236em !important; font-family: 'Lato'; line-height: 1; letter-spacing: 0.02em; font-weight:900; color: #fff !important;
}
.el-dialog__header {
  margin-bottom: 40px !important;
}
.el-dialog__close {
  font-size: 50px;
  color: #fff !important;
}

</style>
